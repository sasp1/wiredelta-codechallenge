import {ApiProperty} from "@nestjs/swagger";

export class CreateCompanyDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    logo_image_url: string;

    @ApiProperty({minLength: 10, maxLength: 10})
    cvr: string;

    @ApiProperty()
    is_paid: boolean;

    @ApiProperty()
    is_enabled: boolean;

    @ApiProperty()
    is_visible: boolean;

    jwt: string
}
