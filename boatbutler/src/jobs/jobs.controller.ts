import {Body, Controller, Get, Headers, Param, Patch, Post, Query} from '@nestjs/common';
import {JobsService} from "./jobs.service";
import {ApiBearerAuth, ApiParam, ApiQuery} from "@nestjs/swagger";
import {CreateJobDto} from "./dto/create-job.dto";
import {CreateJobProposalDto} from "./dto/create-job-proposal.dto";
import {UpdateJobProposalDto} from "./dto/update-job-proposal.dto";

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {
    }

    @ApiBearerAuth()
    @Post()
    create(@Body() job: CreateJobDto, @Headers() headers) {
        job.jwt = headers.authorization;
        return this.jobsService.create(job);
    }


    @ApiBearerAuth()
    @ApiParam({name: "jobId", example: "60ef3df51fc0ee0167fc2840"})
    @Post(":jobId/proposals")
    createJobProposal(@Body() proposal: CreateJobProposalDto, @Headers() headers, @Param() params) {
        proposal.jwt = headers.authorization;
        proposal.job_id = params.jobId;
        return this.jobsService.createJobProposal(proposal);
    }

    @Get()
    @ApiBearerAuth()
    @ApiQuery({name: "companyId", required: false, example: "60ef3677314d9e001e2c134b"})
    getJobs(@Query("companyId") companyId, @Headers() headers) {
        return this.jobsService.getJobs(companyId, headers.authorization)
    }

    @ApiBearerAuth()
    @ApiParam({name: "id", example: "60ef3677314d9e001e2c134b"})
    @Get(":id/proposals")
    getJobProposals(@Param() params, @Headers() headers) {
        const jobId = params.id;
        return this.jobsService.getJobProposals(jobId, headers.authorization);
    }

    @ApiBearerAuth()
    @ApiParam({name: "jobId", required: true, example: "60ef3677314d9e001e2c134b", description: "Job id"})
    @ApiParam({name: "id", required: true, example: "60ef5eb7e98138004649c7f9", description: "Job proposal id"})
    @Patch(":jobId/proposals/:id")
    updateJobProposal(@Body() jobProposal: UpdateJobProposalDto, @Param() params, @Headers() headers) {
        jobProposal.jwt = headers.authorization;
        jobProposal.id = params.id;
        jobProposal.jobId = params.jobId;
        return this.jobsService.updateJobProposal(jobProposal)
    }

}
