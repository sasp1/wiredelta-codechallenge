import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {

    @ApiProperty({example: "company@owner.dk"})
    email: string;

    @ApiProperty({example: "test-password"})
    password: string;

}
