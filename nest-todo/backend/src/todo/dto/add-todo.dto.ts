import { IsEmpty, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { User } from "src/auth/schemas/user.schema";
import { priority, status } from "src/schemas/todo.schema";

export class addTododto{
    @IsNotEmpty()
    @IsString()
    readonly title:string;
    @IsNotEmpty()
    @IsString()
    readonly description:string;
    @IsNotEmpty()
    @IsEnum(priority,{message:"please enter a valid priority"})
    readonly priority:priority;
    @IsNotEmpty()
    @IsEnum(status,{message:"please enter a valid status"})
    readonly status:status;
   
    @IsEmpty({ message: 'You cannot pass user id' })
    readonly user: User;

}