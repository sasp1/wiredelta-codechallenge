import {Body, Controller, Get, Headers, Param, Post, Query} from '@nestjs/common';
import {CompaniesService} from "./companies.service";
import {ApiBearerAuth, ApiParam, ApiQuery} from "@nestjs/swagger";
import {CreateCompanyDto} from "./dto/create-company.dto";

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {
    }


    @ApiBearerAuth()
    @Post()
    create(@Body() company: CreateCompanyDto, @Headers() headers) {
        console.log(headers);
        company.jwt = headers.authorization;
        console.log(company.jwt);
        return this.companiesService.create(company);
    }

    @ApiBearerAuth()
    @ApiParam({name: "id", example: "60ef3677314d9e001e2c134b"})
    @ApiQuery({name: "status", example: "rejected"})
    @Get(":id/proposals")
    getCompanyProposals(@Param() params, @Headers() headers, @Query("status") status) {
        const companyId = params.id;
        return this.companiesService.getCompanyProposals(companyId, status, headers.authorization);
    }
}
