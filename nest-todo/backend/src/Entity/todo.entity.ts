import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { userEntity } from "./user.entity";

@Entity()
export class TodoEntity{
    //auto generated id for todo
    @PrimaryGeneratedColumn()
    id:number;
    //title of type string
    @Column()
    title:string;
    //description type string
    @Column()
    description:string;
    //status an enum of multiple strings 1 must be chosen of those strings
    @Column()
    status:todoStatue;
    //similar to status
    @Column()
    priority:priority;
    @Column({ default: () => "CURRENT_TIMESTAMP" })
    dueDate: Date;
    
  @Column({ default: () => "CURRENT_TIMESTAMP" })//getcurrent time and add it to the todo
  createdOn: Date; 
  //to check time taken 
  @Column({ nullable: true })
  timeTaken: number;

    //many todos for a single user which is why many to one is used
    @ManyToOne(() => userEntity, (users) => users.todos)
    user: userEntity
    //user id to get the id into the todo db
@Column()
userId:number
}
//3 types open in progress and complete
export enum todoStatue{
    OPEN="OPEN",INPROGRESS="INPROGRESS",COMPLETE="COMPLETE"
}
//high low medium
export enum priority{
    HIGH="HIGH", MEDIUM="MEDIUM",LOW="LOW"
}