import { IsDateString, IsNotEmpty } from "class-validator";

export class createTodoDto{
    //makes sure input isnt empty or throws error
    @IsNotEmpty()
    title:string;
    @IsNotEmpty()
    description:string;
    @IsDateString()
  dueDate: string; 
    
}