import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";


export type JobProposalDocument = JobProposal & Document;

@Schema({
    timestamps: true
})
export class JobProposal {

    @Prop({type: mongoose.Schema.Types.Date, required: true})
    dateTime: Date

    @Prop()
    description: string;

    @Prop()
    negotiable: boolean;

    @Prop({required: true, type: mongoose.Schema.Types.String, default: "pending"})
    status: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true})
    job_id: string

    @Prop({type: mongoose.Schema.Types.ObjectId, required: true, ref: "Company"})
    company_id: string

    @Prop({type: [mongoose.Schema.Types.ObjectId]})
    notifications

    @Prop({type: [mongoose.Schema.Types.ObjectId]})
    conversations

}

export const JobProposalSchema = SchemaFactory.createForClass(JobProposal);
