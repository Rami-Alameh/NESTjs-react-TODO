

import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { priority, status } from "src/schemas/todo.schema";

export class updateTododto{
    @IsOptional()
@IsString()
    readonly title:string;
    @IsOptional()
    @IsString()
    readonly description:string;
    @IsOptional()
    @IsEnum(priority,{message:"please enter a valid priority"})
    readonly priority:priority;
    @IsNotEmpty()
    @IsEnum(status,{message:"please enter a valid status"})
    readonly status:status;
}