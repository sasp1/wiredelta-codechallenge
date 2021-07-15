import {ApiProperty} from "@nestjs/swagger";

export class CreateJobDto {

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    can_user_bring_boat: boolean;

    @ApiProperty({minimum: 1})
    price: number;

    @ApiProperty({example: "60ef3677314d9e001e2c134b"})
    boat_id: string;

    @ApiProperty({example: []})
    companies: string[]

    jwt: string

}
