import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class logindto{
 
    @IsNotEmpty()
    @IsEmail({},{message:"enter a valid email"})
    readonly email:string;
    @IsNotEmpty()
    @IsString()
    readonly password:string;
  
    
}