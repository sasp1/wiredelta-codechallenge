import {IsBoolean, IsNotEmpty, IsOptional, IsString} from "class-validator";


export class GetJobProposalsDto {

    @IsOptional()
    @IsString()
    jobId: string;

    @IsNotEmpty()
    jwt: string

    @IsOptional()
    @IsString()
    companyId: string;

    @IsString()
    @IsOptional()
    status: string
}
