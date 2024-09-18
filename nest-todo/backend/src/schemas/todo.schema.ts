import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";
@Schema({
timestamps:true
})
export class todo{
@Prop()
title: string;
@Prop()
description: string;
@Prop()
priority: priority;
@Prop()
status: status;
@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
user: User;
}
export enum priority{
    HIGH ='HIGH',
    MEDIUM='MEDIUM',
    LOW='LOW',
}
export enum status{
    COMPLETE ='COMPLETE',
    INPROGRESS='INPROGRESS',
    FAIL='FAIL',
}
export const TodoSchema=SchemaFactory.createForClass(todo);