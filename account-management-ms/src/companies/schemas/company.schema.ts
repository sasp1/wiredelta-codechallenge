import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";


export type CompanyDocument = Company & Document;

@Schema({
    timestamps: true
})
export class Company {

    @Prop({required: true})
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user_id: string;

    @Prop()
    logo_image_url: string;

    @Prop({maxLength: 10, minLength: 10})
    cvr: string;

    @Prop()
    is_paid: boolean;
    @Prop()
    is_enabled: boolean;
    @Prop()
    is_visible: boolean;

}

export const CompanySchema = SchemaFactory.createForClass(Company);
