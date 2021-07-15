import {Module} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {JwtauthsyncModule, JwtAuthSyncService} from "sasp11-jwt-auth-sync";
import {MongooseModule} from "@nestjs/mongoose";
import {CompaniesModule} from "./companies/companies.module";
import { JwtModule } from './jwt/jwt.module';

@Module({
    imports: [
        JwtauthsyncModule.forRoot(),
        JwtAuthSyncService,
        ConfigModule.forRoot(),
        MongooseModule.forRoot('mongodb+srv://dbUser:' + process.env.DB_PASS + '@cluster0.bkeza.mongodb.net/accountManagement?retryWrites=true&w=majority'),
        UsersModule,
        CompaniesModule,
        JwtModule],
    exports: [JwtAuthSyncService]
})
export class AppModule {
}
