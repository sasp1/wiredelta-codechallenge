import {IsBoolean, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class CreateCompanyDto {

    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    logo_image_url: string;

    @IsString()
    @Length(10)
    cvr: string;

    @IsOptional()
    @IsBoolean()
    is_paid: boolean;

    @IsOptional()
    @IsBoolean()
    is_enabled: boolean;

    @IsOptional()
    @IsBoolean()
    is_visible: boolean;

    @IsNotEmpty()
    jwt: string
}
