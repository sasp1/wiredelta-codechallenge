import {Prop} from "@nestjs/mongoose";
import {IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString} from "class-validator";

export class CreateJobDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsBoolean()
    can_user_bring_boat: boolean;

    @IsOptional()
    @IsPositive()
    price: number;

    @IsOptional()
    @IsString()
    boat_id: string;

    @IsArray()
    companies: string[]

    @IsNotEmpty()
    jwt: string

}
