
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Users extends BaseEntity {

    
    @PrimaryGeneratedColumn({ type: 'int4' })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable:true })
    role: string;

    @Column({ type: 'varchar', length: 255, nullable:true })
    username: string

    @Column({ type: 'varchar', length: 255, nullable:true })
    password: string

    @Column({ type: 'varchar', length: 255, nullable:true })
    firstname: string

    @Column({ type: 'varchar', length: 255, nullable:true })
    lastname: string

}