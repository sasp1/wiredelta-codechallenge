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
        MongooseModule.forRoot('mongodb://dbUser:' + process.env.DB_PASS + '@cluster0-shard-00-00.bkeza.mongodb.net:27017,cluster0-shard-00-01.bkeza.mongodb.net:27017,cluster0-shard-00-02.bkeza.mongodb.net:27017/jobManagement?ssl=true&replicaSet=atlas-fdeltu-shard-0&authSource=admin&retryWrites=true&w=majority'),

        // MongooseModule.forRoot('mongodb+srv://dbUser:' + '@cluster0.bkeza.mongodb.net/jobManagement?retryWrites=true&w=majority'),
        JwtModule],
    controllers: [AppController],

    providers: [AppService],

})
export class AppModule {
}
