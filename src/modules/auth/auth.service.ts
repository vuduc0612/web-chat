import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { User } from '../user/entity/user.entity';
import { Auth, Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
@Injectable()
export class AuthService {
    constructor(private configService: ConfigService,
        private jwt: JwtService,
        @InjectRepository(User) 
        private userRepository: Repository<User>,
        private mailService: MailerService,
        @InjectQueue('email-queue') 
        private readonly emailQueue: Queue,
    ) { }

    async signUp(dto: AuthDto) {
        const user = await this.userRepository.findOneBy({email: dto.email });
        if (!user) {
            const hashedPassword = await argon.hash(dto.password);
            const newUser = new User({email: dto.email, password: hashedPassword});
            const confirmationCode = Math.random().toString(36).substring(2, 15);
            newUser.confirmationCode = confirmationCode;
            newUser.isActive = false;
            const result = await this.emailQueue.add('register',{
                from:`No Reply <${this.configService.getOrThrow('MAIL_USER')}>`,
                to: dto.email,
                subject: 'welcome to my web chat',
                body: `<b>Thank you for signing up. Please confirm your account by clicking on the following link: 
                <a href="http://localhost:3003/auth/confirm/${confirmationCode}">Confirm Account</a></b>`,
            }, {removeOnComplete: true});
            // await this.mailService.sendMail({
            //     from:`No Reply <${this.configService.getOrThrow('MAIL_USER')}>`, 
            //     to: dto.email,
            //     subject: 'Welcome to our platform',
            //     html: `<b>Thank you for signing up. Please confirm your account by clicking on the following link: 
            // <a href="http://localhost:3000/auth/confirm/${confirmationCode}">Confirm Account</a></b>`,
            // });
            if (!result) {
                throw new ForbiddenException('Error sending email');
            }
            await this.userRepository.save(newUser);
            return {
                msg: 'User created successfully, please check your email to confirm your account'
            }
        }
        else {
            throw new ForbiddenException('User already exists');
        }
    }

    async confirmAccount(confirmationCode: string) {
        const user = await this.userRepository.findOneBy({ confirmationCode: confirmationCode });
    
        if (!user) {
            throw new NotFoundException('Confirmation code not found');
        }
    
        user.isActive = true;
        user.confirmationCode = null;
    
        await this.userRepository.save(user);
    
        return this.signToken(user.id, user.email);
    }

    async signIn(dto: AuthDto) {
        const user = await this.userRepository.findOneBy({email: dto.email });
        if(!user) {
            throw new ForbiddenException('User not found');
        }
        const isPasswordValid = await argon.verify(user.password, dto.password);
        if(!isPasswordValid) {
            throw new ForbiddenException('Invalid password');
        }
        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string) {
        const payload = {
            sub: userId,
            email: email,
        }
        const secret = this.configService.get("JWT_SECRET");
        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '20m',
                secret: secret,
            }
        );
        return {
            access_token: token
        };
    }
}
