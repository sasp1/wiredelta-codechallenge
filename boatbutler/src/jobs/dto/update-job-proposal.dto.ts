import {ApiProperty} from "@nestjs/swagger";

export class UpdateJobProposalDto {

    @ApiProperty({example: "rejected"})
    status: string

    id: string

    jwt: string;

    jobId: string;

}
