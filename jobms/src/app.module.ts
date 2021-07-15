import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {JobsModule} from './jobs/jobs.module';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import { JwtModule } from './jwt/jwt.module';

@Module({
    imports: [ConfigModule.forRoot(),
        JobsModule,
        MongooseModule.forRoot('mongodb+srv://dbUser:' + process.env.DB_PASS + '@cluster0.bkeza.mongodb.net/jobManagement?retryWrites=true&w=majority'),
        JwtModule],
    controllers: [AppController],

    providers: [AppService],

})
export class AppModule {
}
