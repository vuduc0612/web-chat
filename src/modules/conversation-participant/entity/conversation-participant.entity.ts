import { Conversation } from "@/modules/conversation/entity/conversation.entity";
import { User } from "@/modules/user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ConversationParticipant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.conversationParticipants)
    user: User;

    @ManyToOne(() => Conversation, conversation => conversation.conversationParticipants)
    conversation: Conversation;

    constructor(partial: Partial<ConversationParticipant>) {
        Object.assign(this, partial);
    }
}