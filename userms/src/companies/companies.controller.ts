import {BadRequestException, Controller} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import {JwtAuthSyncService} from "sasp11-jwt-auth-sync";
import {GetCompanyProposalsDto} from "./dto/get-company-proposals.dto";

@Controller()
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService,
              private readonly jwtAuthService: JwtAuthSyncService) {}


  @MessagePattern('create-company')
  create(@Payload() createCompanyDto: CreateCompanyDto) {
    const user = this.jwtAuthService.authorize(createCompanyDto.jwt);
    return this.companiesService.create(createCompanyDto, user.sub);
  }

  @MessagePattern('find-all-companies')
  findAll(@Payload() payload) {
    this.jwtAuthService.authorize(payload.jwt);
    return this.companiesService.findAll();
  }

  @MessagePattern("get-company-proposals")
  getCompanyProposals(@Payload() getCompanyProposalsDto : GetCompanyProposalsDto) {
    if (!getCompanyProposalsDto.companyId) {
      throw new BadRequestException("No companyId provided");
    }

    this.jwtAuthService.authorizeAsCompanyOwner(getCompanyProposalsDto.jwt);
    return this.companiesService.getCompanyProposals(getCompanyProposalsDto);
  }
}
