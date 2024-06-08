import { Conversation } from "@/modules/conversation/entity/conversation.entity";
import { User } from "@/modules/user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    createdAt: Date;

    @ManyToOne(() => User, user => user.messages)
    user: User;

    @ManyToOne(() => Conversation, conversation => conversation.messages)
    conversation: Conversation;

    constructor(partial: Partial<Message>) {
        Object.assign(this, partial);
    }

}