import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";


export type JobInviteDocument = JobInvite & Document;

@Schema({
    timestamps: true
})
export class JobInvite {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true })
    job_id: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true })
    company_id: string;
}

export const JobInviteSchema = SchemaFactory.createForClass(JobInvite);
