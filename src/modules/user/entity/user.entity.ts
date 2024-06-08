import { ConversationParticipant } from "@/modules/conversation-participant/entity/conversation-participant.entity";
import { Conversation } from "@/modules/conversation/entity/conversation.entity";
import { Message } from "@/modules/message/entity/message.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true})
    username: string;

    @Column({ nullable: true})
    fullName: string;

    @Column({ nullable: true })
    avatar: string;

    @Column({ nullable: true })
    birthday: Date;

    @Column({ nullable: true })
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

    @Column({ nullable: true })
    isActive: boolean;

    @Column({ nullable: true })
    confirmationCode: string;

    @OneToMany(() => Conversation, conversation => conversation.user)
    conversations: Conversation[];

    @OneToMany(() => Message, message => message.user)
    messages: Message[];

    @OneToMany(() => ConversationParticipant, conversationParticipant => conversationParticipant.user)
    conversationParticipants: ConversationParticipant[];
    
    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}