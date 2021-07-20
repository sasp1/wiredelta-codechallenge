import {IsEmail, IsNotEmpty, Length} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string
}
