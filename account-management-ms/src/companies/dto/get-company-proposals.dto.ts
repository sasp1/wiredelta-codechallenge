import {IsBoolean, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class GetCompanyProposalsDto {

    @IsString()
    @IsOptional()
    companyId: string;

    @IsNotEmpty()
    jwt: string

    @IsString()
    @IsOptional()
    status: string
}
