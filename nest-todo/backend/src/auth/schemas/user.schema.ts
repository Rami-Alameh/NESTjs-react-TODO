import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
 timestamps:true   
})
export class User extends Document{
    
    @Prop()
    fName:string
    @Prop()
    lName:string
    @Prop()
    username:string
    @Prop({unique:[true,"email already exists enter a new one please."]})
    email:string
    @Prop()
    password:string
    
}
export const userSchema =SchemaFactory.createForClass(User);