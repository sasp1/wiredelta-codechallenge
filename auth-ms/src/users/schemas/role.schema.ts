



import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema({
    timestamps: true
})
export class Role {
    @Prop({required: true})
    role: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
