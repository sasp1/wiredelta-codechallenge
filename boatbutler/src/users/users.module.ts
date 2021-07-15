import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {HttpModule} from "@nestjs/axios";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [HttpModule, ClientsModule.register([
        {
            name: 'USER_MS',
            transport: Transport.REDIS,
            options: {
                url: 'redis://redis:6379',
            }
        },
    ])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {
}
