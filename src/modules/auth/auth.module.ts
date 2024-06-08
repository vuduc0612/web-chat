import { Module } from '@nestjs/common';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';

import { UserModule } from '@modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/user/entity/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { EmailConsumer } from './consumer/mail.consumer';

@Module({
  imports: [JwtModule,
    TypeOrmModule.forFeature([User]),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.getOrThrow('MAIL_HOST'),
          secure: false,
          auth: {
            user: configService.getOrThrow('MAIL_USER'),
            pass: configService.getOrThrow('MAIL_PASSWORD'),
          },
        }
      }),
      inject: [ConfigService]
    }),
    BullModule.registerQueueAsync({
      name: 'email-queue',
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: 'localhost',//configService.getOrThrow('REDIS_HOST'),
          port: 6379,//configService.getOrThrow('REDIS_PORT')
        },
      }),
      inject: [ConfigService],
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService, EmailConsumer]
})
export class AuthModule { }
