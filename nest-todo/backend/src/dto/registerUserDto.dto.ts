import { IsEmail, IsNotEmpty, MinLength,  } from "class-validator";

export class registerUserDto{
    //checks if the email form is correct and not empty
    @IsNotEmpty()
    @IsEmail()
    email:string;
//sets the password minium length to 5 
    @IsNotEmpty()
@MinLength(5)
     password:string;
}