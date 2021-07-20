import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Company, CompanySchema} from "./schemas/company.schema";
import {JwtModule} from "../jwt/jwt.module";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [MongooseModule.forFeature([{name: Company.name, schema: CompanySchema}]),
    JwtModule,
    ClientsModule.register([
      {
        name: 'REDIS',
        transport: Transport.REDIS,
        options: {
          url: 'redis://redis:6379',
        }
      },
    ])],
  controllers: [CompaniesController],
  providers: [CompaniesService]
})
export class CompaniesModule {}
