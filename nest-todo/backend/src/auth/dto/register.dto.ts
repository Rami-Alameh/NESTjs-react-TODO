import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class registerdto{
    @IsNotEmpty()
    @IsString()
    readonly fName:string;
    @IsNotEmpty()
    @IsString()
    readonly lName:string;
    @IsNotEmpty()
    @IsString()
    readonly username:string;
    @IsNotEmpty()
    @IsEmail({},{message:"enter a valid email"})
    readonly email:string;
    @IsNotEmpty()
    @IsString()
    readonly password:string;
  
    
}