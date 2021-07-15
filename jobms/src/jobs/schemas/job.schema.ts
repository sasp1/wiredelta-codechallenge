import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";


export type JobDocument = Job & Document;

@Schema({
    timestamps: true
})
export class Job {
    @Prop({required: true})
    title: string;

    @Prop()
    description: string;

    @Prop()
    can_user_bring_boat: boolean;

    @Prop()
    price: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, required: false, ref: "Boat"})
    boat_id: string;

}

export const JobSchema = SchemaFactory.createForClass(Job);
