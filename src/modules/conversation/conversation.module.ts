import { Module } from '@nestjs/common';
import { ConversationController } from '@/modules/conversation/conversation.controller';
import { ConversationService } from '@/modules/conversation/conversation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from '@modules/conversation/entity/conversation.entity';
import { User } from '@/modules/user/entity/user.entity';
import { ConversationParticipant } from '../conversation-participant/entity/conversation-participant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, User, ConversationParticipant])
  ],
  controllers: [ConversationController],
  providers: [ConversationService]
})
export class ConversationModule {}
