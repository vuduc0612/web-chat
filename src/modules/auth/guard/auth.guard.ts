import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "@modules/auth/decorator/public.decorator";
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "@/modules/user/entity/user.entity";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private configService: ConfigService,
        private reflector: Reflector,
        @InjectRepository(User)
        private userRepository: Repository<User>) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return false;
        }

        const [bearer, token] = authHeader.split(' ');

        if (bearer !== 'Bearer' || !token) {
            return false;
        }
        try {
            const decoded = jwt.verify(token, this.configService.get('JWT_SECRET'));

            const user = await this.userRepository.findOneBy({
                email: decoded['email'],
            })
            request.user = user;

            return true;
        } catch {
            return false;
        }
    }
}