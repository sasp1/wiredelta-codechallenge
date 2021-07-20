import {Controller} from '@nestjs/common';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {JobsService} from './jobs.service';
import {CreateJobDto} from './dto/create-job.dto';
import {UpdateJobProposalDto} from './dto/update-job-proposal.dto';
import {JwtAuthSyncService} from "sasp11-jwt-auth-sync";
import {CreateJobProposalDto} from "./dto/create-job-proposal.dto";
import {GetJobProposalsDto} from "./dto/get-job-proposals.dto";
import {GetJobsDto} from "./dto/get-jobs.dto";

@Controller()
export class JobsController {
    constructor(private readonly jobsService: JobsService,
                private readonly jwtAuthService: JwtAuthSyncService) {
    }

    @MessagePattern('create-job')
    createJob(@Payload() createJobDto: CreateJobDto) {
        this.jwtAuthService.authorize(createJobDto.jwt);
        return this.jobsService.createJob(createJobDto);
    }

    @MessagePattern('create-job-proposal')
    createJobProposal(@Payload() createJobProposalDto: CreateJobProposalDto) {
        this.jwtAuthService.authorizeAsCompanyOwner(createJobProposalDto.jwt);
        return this.jobsService.createJobProposal(createJobProposalDto);
    }

    @MessagePattern("get-job-proposals")
    getJobProposals(@Payload() getJobProposals: GetJobProposalsDto) {
        if (getJobProposals.jobId) {
            this.jwtAuthService.authorize(getJobProposals.jwt);
            return this.jobsService.getJobProposalsForJob(getJobProposals);
        } else if (getJobProposals.companyId) {
            this.jwtAuthService.authorizeAsCompanyOwner(getJobProposals.jwt);
            return this.jobsService.getJobProposalsForCompany(getJobProposals);
        }
        this.jwtAuthService.authorizeAsAdmin(getJobProposals.jwt);
        return this.jobsService.getAllJobProposals()
    }

    @MessagePattern('findAllJobs')
    findAll() {
        return this.jobsService.findAll();
    }

    @MessagePattern("get-jobs")
    async getJobs(@Payload() getJobsForCompanyDto: GetJobsDto) {
        console.log(getJobsForCompanyDto)
        console.log(getJobsForCompanyDto)
        if (getJobsForCompanyDto.companyId) {
            this.jwtAuthService.authorizeAsCompanyOwner(getJobsForCompanyDto.jwt);
            return this.jobsService.getJobsForCompany(getJobsForCompanyDto);
        }
        this.jwtAuthService.authorizeAsAdmin(getJobsForCompanyDto.jwt);
        return this.jobsService.getAllJobs();
    }

    @MessagePattern("update-job-proposal")
    updateJobProposal(@Payload() dto : UpdateJobProposalDto){
        this.jwtAuthService.authorize(dto.jwt);
        return this.jobsService.updateJobProposal(dto);
    }

    @MessagePattern('findOneJob')
    findOne(@Payload() id: number) {
        return this.jobsService.findOne(id);
    }

    @MessagePattern('removeJob')
    remove(@Payload() id: number) {
        return this.jobsService.remove(id);
    }
}
