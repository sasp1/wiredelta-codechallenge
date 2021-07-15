import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {UpdateJobProposalDto} from "./dto/update-job-proposal.dto";

@Injectable()
export class JobsService {
    constructor(@Inject('JOBS_MS') private readonly clientProxy: ClientProxy) {
    }


    create(job) {
        return this.clientProxy.send("create-job", job);
    }

    createJobProposal(proposal) {
        return this.clientProxy.send("create-job-proposal", proposal);
    }

    getJobs(companyId, jwt) {
        return this.clientProxy.send("get-jobs", {companyId, jwt})
    }

    getJobProposals(jobId: string, jwt: string) {
        return this.clientProxy.send("get-job-proposals", {jobId, jwt});
    }

    updateJobProposal(jobProposal: UpdateJobProposalDto) {
        return this.clientProxy.send("update-job-proposal", jobProposal);
    }
}
