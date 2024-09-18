import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TodoEntity } from "./todo.entity";

@Entity('users')
export class userEntity {
  // Auto-generated user ID for a user
  @PrimaryGeneratedColumn()
  id: number;

  // Email column
  @Column()
  email: string;

  // Password column for the user
  @Column()
  password: string;

  // Salt column for password hashing
  @Column()
  salt: string;

  // One-to-Many relationship with TodoEntity
  @OneToMany(() => TodoEntity, (todo) => todo.user)
  todos: TodoEntity[];
}