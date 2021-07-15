import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class CreateUserDto {

    @IsEmail()
    email: string

    @Length(6)
    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    role: string
}
