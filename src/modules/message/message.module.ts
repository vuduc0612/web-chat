import { Module } from '@nestjs/common';
import { MessageController } from '@/modules/message/message.controller';
import { MessageService } from '@/modules/message/message.service';
import { User } from '@/modules/user/entity/user.entity';
import { Message } from '@modules/message/entity/message.entity';
import { Conversation } from '@modules/conversation/entity/conversation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, User, Conversation])
  ],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
