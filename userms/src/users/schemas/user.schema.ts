import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {Document} from "mongoose";


export type UserDocument = User & Document;

@Schema({
    timestamps: true
})
export class User {

    @Prop()
    active: boolean;

    @Prop()
    profile_pic: string;

    @Prop({required: true, type: mongoose.Schema.Types.String})
    name: string;

    @Prop({required: true, type: mongoose.Schema.Types.String})
    email: string;

    @Prop({required: true, type: mongoose.Schema.Types.String})
    role: string

    @Prop()
    phone_number: string

    @Prop()
    address: string

    @Prop()
    zip_code: string

    @Prop()
    city: string
}

export const UserSchema = SchemaFactory.createForClass(User);
