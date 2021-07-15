import {ApiProperty} from "@nestjs/swagger";

export class CreateJobProposalDto {

    @ApiProperty()
    description: string;

    @ApiProperty()
    negotiable: boolean;

    @ApiProperty({example: "60ef3677314d9e001e2c134b"})
    company_id: string

    job_id: string

    jwt: string


}
