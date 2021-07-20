import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {CreateJobDto} from './dto/create-job.dto';
import {UpdateJobProposalDto} from './dto/update-job-proposal.dto';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Job, JobDocument} from "./schemas/job.schema";
import {JobInvite, JobInviteDocument} from "./schemas/jobInvite.schema";
import {ClientProxy} from "@nestjs/microservices";
import {CreateJobProposalDto} from "./dto/create-job-proposal.dto";
import {JobProposal, JobProposalDocument} from "./schemas/jobProposal.schema";
import {GetJobProposalsDto} from "./dto/get-job-proposals.dto";
import {GetJobsDto} from "./dto/get-jobs.dto";

@Injectable()
export class JobsService {
    constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>,
                @InjectModel(JobInvite.name) private jobInviteModel: Model<JobInviteDocument>,
                @InjectModel(JobProposal.name) private jobProposalModel: Model<JobProposalDocument>,
                @Inject('USER_MS') private readonly clientProxy: ClientProxy) {
    }

    async createJob(createJobDto: CreateJobDto) {
        const job = new this.jobModel(createJobDto);
        console.log(job);
        // Find each company
        if (createJobDto.companies.length > 0) {
            // Create job invite for each company
            for (let i = 0; i < createJobDto.companies.length; i++) {
                const jobInvite = new this.jobInviteModel({
                    job_id: job.id,
                    company_id: createJobDto.companies[i]
                });

                await jobInvite.save();
            }
        } else {
            // Create job invite for all companies
            // Get all companies
            const companies = await this.clientProxy.send("find-all-companies", {jwt: createJobDto.jwt}).toPromise();
            for (let i = 0; i < companies.length; i++) {
                const jobInvite = new this.jobInviteModel({
                    job_id: job.id,
                    company_id: companies[i]
                });

                await jobInvite.save();
            }
        }

        return job.save();
    }

    createJobProposal(createJobProposalDto: CreateJobProposalDto) {
        console.log(createJobProposalDto);
        const jobProposal = new this.jobProposalModel(createJobProposalDto);
        jobProposal.dateTime = new Date;
        return jobProposal.save();
    }

    findAll() {
        return `This action returns all jobs`;
    }

    findOne(id: number) {
        return `This action returns a #${id} job`;
    }

    update(id: number, updateJobDto: UpdateJobProposalDto) {
        return `This action updates a #${id} job`;
    }

    remove(id: number) {
        return `This action removes a #${id} job`;
    }


    async getAllJobs() {
        return this.jobModel.find();
    }

    async getJobsForCompany(getJobsForCompanyDto: GetJobsDto) {

        const companies = new Set();
        const jobs = await this.jobModel.find();

        // console.log(jobs.map(job => job.id));

        const jobInvites = await this.jobInviteModel.find({
            company_id: getJobsForCompanyDto.companyId,
            job_id: {
                $in: jobs.map(job => job.id)
            },
        }).populate("job_id");


        return jobInvites.map(job => job.job_id);
    }

    getJobProposalsForJob(getJobProposalsDto: GetJobProposalsDto) {
        if (getJobProposalsDto.status)
            return this.jobProposalModel.find({job_id: getJobProposalsDto.jobId, status: getJobProposalsDto.status});

        return this.jobProposalModel.find({
            company_id: getJobProposalsDto.companyId
        });
    }

    getAllJobProposals() {
        return this.jobProposalModel.find();
    }

    getJobProposalsForCompany(getJobProposalsDto: GetJobProposalsDto) {
        if (getJobProposalsDto.status)
            return this.jobProposalModel.find({
                company_id: getJobProposalsDto.companyId,
                status: getJobProposalsDto.status
            });
        return this.jobProposalModel.find({
            company_id: getJobProposalsDto.companyId
        });
    }

    async updateJobProposal(dto: UpdateJobProposalDto) {
        const jobProposal = await this.jobProposalModel.findById(dto.id);
        if (!jobProposal) throw new NotFoundException("Job proposal not found");

        jobProposal.status = dto.status;
        return jobProposal.save();

    }
}
