import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';
import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UpdateJobProposalDto {

  @IsOptional()
  @IsString()
  status: string

  @IsNotEmpty()
  id: string

  @IsNotEmpty()
  jwt: string;

  @IsNotEmpty()
  jobId: string;

}
