import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({example: "user@domain.com"})
    email: string

    @ApiProperty({minLength: 6})
    password: string


    @ApiProperty({example: "standard"})
    role: string
}
