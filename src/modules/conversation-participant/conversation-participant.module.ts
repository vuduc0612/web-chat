import { Module } from '@nestjs/common';
import { ConversationParticipantController } from './conversation-participant.controller';
import { ConversationParticipantService } from './conversation-participant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/user/entity/user.entity';
import { Conversation } from '@modules/conversation/entity/conversation.entity';
import { ConversationParticipant } from '@modules/conversation-participant/entity/conversation-participant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Conversation, ConversationParticipant])
  ],
  controllers: [ConversationParticipantController],
  providers: [ConversationParticipantService]
})
export class ConversationParticipantModule {}
