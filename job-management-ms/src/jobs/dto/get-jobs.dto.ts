import {IsBoolean, IsNotEmpty, IsOptional, IsString} from "class-validator";


export class GetJobsDto {

    @IsOptional()
    @IsString()
    companyId: string;

    @IsNotEmpty()
    jwt: string
}
