import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class CompaniesService {
    constructor(@Inject('ACCOUNT_MS') private readonly clientProxy: ClientProxy) {
    }



    async create(company) {
        return this.clientProxy.send("create-company", company);
    }

    getCompanyProposals(companyId: string, status: string, jwt) {
        return this.clientProxy.send("get-company-proposals", {companyId: companyId, status, jwt})
    }
}
