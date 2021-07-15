import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {JobsModule} from './jobs/jobs.module';
import {CompaniesModule} from './companies/companies.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        JobsModule,
        CompaniesModule
    ],
})
export class AppModule {
}
