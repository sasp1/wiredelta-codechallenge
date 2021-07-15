import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private jwtService: JwtService,
                private configService: ConfigService) {

    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email).populate("role");
        if (!user) throw new UnauthorizedException("Incorrect email or password");
        if (user && await bcrypt.compare(pass, user.password)) {
            const {email, id, role} = user;
            return {email, id, role: role.role};
        }
        return null;
    }

    async login(user: any) {
        const payload = {email: user.email, sub: user.id, role: user.role};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    jwtPubKey() {
        return this.configService.get<string>("JWT_PUB");
    }

}
