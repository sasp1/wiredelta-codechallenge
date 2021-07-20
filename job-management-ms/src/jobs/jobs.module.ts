import {Module} from '@nestjs/common';
import {JobsService} from './jobs.service';
import {JobsController} from './jobs.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Job, JobSchema} from "./schemas/job.schema";
import {JobInvite, JobInviteSchema} from "./schemas/jobInvite.schema";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {JwtModule} from "../jwt/jwt.module";
import {JobProposal, JobProposalSchema} from "./schemas/jobProposal.schema";

@Module({
    imports: [MongooseModule.forFeature([
        {name: Job.name, schema: JobSchema},
        {name: JobInvite.name, schema: JobInviteSchema},
        {name: JobProposal.name, schema: JobProposalSchema}

    ]), ClientsModule.register([
        {
            name: 'USER_MS',
            transport: Transport.REDIS,
            options: {
                url: 'redis://redis:6379',
            }
        },
    ]), JwtModule],
    controllers: [JobsController],
    providers: [JobsService]
})
export class JobsModule {
}
