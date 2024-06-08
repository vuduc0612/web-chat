import { Module } from '@nestjs/common';
import { UserController } from '@/modules/user/user.controller';
import { UserService } from '@/modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/user/entity/user.entity';
import { Conversation } from '@modules/conversation/entity/conversation.entity';
import { Message } from '@modules/message/entity/message.entity';
import { ConversationParticipant } from '@modules/conversation-participant/entity/conversation-participant.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Conversation, Message, ConversationParticipant])
  ],
  controllers: [UserController],
  providers: [UserService],
  
})
export class UserModule {}
