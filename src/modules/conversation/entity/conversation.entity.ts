import { ConversationParticipant } from "@/modules/conversation-participant/entity/conversation-participant.entity";
import { Message } from "@/modules/message/entity/message.entity";
import { User } from "@/modules/user/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Conversation{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    lastMessage: String;

    @ManyToOne(() => User, user => user.conversations)
    user: User;

    @OneToMany(() => Message, message => message.conversation)
    messages: Message[];

    @OneToMany(() => ConversationParticipant, conversationParticipant => conversationParticipant.conversation)
    conversationParticipants: ConversationParticipant[];
    
    constructor(partial: Partial<Conversation>) {
        Object.assign(this, partial);
    }

}