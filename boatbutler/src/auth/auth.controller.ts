import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginDto} from "./dto/login-dto";
import {ApiProperty, ApiResponse} from "@nestjs/swagger";


export class Hej {
    @ApiProperty()
    access_token: string
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @ApiResponse({
        type: Hej, description: "JWT for authorization"
    })
    @Post("login")
    login(@Body() loginInfo: LoginDto) {
        console.log(loginInfo);
        return this.authService.login(loginInfo);
    }
}

