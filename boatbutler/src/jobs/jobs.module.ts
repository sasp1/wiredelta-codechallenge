import {Module} from '@nestjs/common';
import {JobsService} from './jobs.service';
import {JobsController} from './jobs.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [ClientsModule.register([
        {
            name: 'JOBS_MS',
            transport: Transport.REDIS,
            options: {
                url: 'redis://redis:6379',
            }
        },
    ])],
    providers: [JobsService],
    controllers: [JobsController]
})
export class JobsModule {
}
