import {IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString} from "class-validator";

export class CreateJobProposalDto {

    @IsNotEmpty()
    description: string;

    @IsBoolean()
    negotiable: boolean;

    @IsNotEmpty()
    company_id: string

    @IsNotEmpty()
    job_id: string

    @IsNotEmpty()
    jwt: string



}
