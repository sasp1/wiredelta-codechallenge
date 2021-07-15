import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Role} from "./role.schema";
import * as mongoose from "mongoose";

export type UserDocument = User & Document;

@Schema({
    timestamps: true
})
export class User {
    @Prop({required: true, unique: true})
    email: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
    role: Role;

    @Prop({required: true, minLength: 6})
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
