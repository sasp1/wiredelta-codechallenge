import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [ClientsModule.register([
    {
      name: 'ACCOUNT_MS',
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
