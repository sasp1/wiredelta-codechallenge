import { Controller } from '@nestjs/common';
import {Ctx, MessagePattern, Payload, RedisContext} from "@nestjs/microservices";
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @MessagePattern("create-user")
    createUser(@Payload() data: CreateUserDto, @Ctx() context: RedisContext) {
        return this.usersService.createUser(data);
    }
}
