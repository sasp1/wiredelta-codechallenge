import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersService} from "../users/users.service";
import {LocalStrategy} from "./local.strategy";
import {JwtStrategy} from "./jwt.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [ConfigModule.forRoot(), UsersModule, PassportModule, JwtModule.register({
        privateKey: process.env.JWT_PRIVATE,
        publicKey: process.env.JWT_PUB,
        signOptions: {expiresIn: '1h', algorithm: "RS256"},
    }),],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {
}
