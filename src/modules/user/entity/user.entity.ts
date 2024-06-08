import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}