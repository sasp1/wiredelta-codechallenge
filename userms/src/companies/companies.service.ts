import {Inject, Injectable} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Company, CompanyDocument} from "./schemas/company.schema";
import {GetCompanyProposalsDto} from "./dto/get-company-proposals.dto";
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class CompaniesService {
  constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
              @Inject('REDIS') private readonly clientProxy: ClientProxy) {
  }


  create(createCompanyDto: CreateCompanyDto, userId: string) {
    const company = new this.companyModel({...createCompanyDto, user_id: userId});
    return company.save();
  }

  findAll() {
    return this.companyModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }

  getCompanyProposals(getCompanyProposalsDto: GetCompanyProposalsDto) {
    return this.clientProxy.send("get-job-proposals", getCompanyProposalsDto);
  }
}
