import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [UsersModule, AuthModule, ConfigModule.forRoot(),
        // MongooseModule.forRoot('mongodb+srv://dbUser:' + process.env.DB_PASS + '@cluster0.bkeza.mongodb.net/auth?retryWrites=true&w=majority'),
        MongooseModule.forRoot('mongodb://dbUser:' + process.env.DB_PASS + '@cluster0-shard-00-00.bkeza.mongodb.net:27017,cluster0-shard-00-01.bkeza.mongodb.net:27017,cluster0-shard-00-02.bkeza.mongodb.net:27017/auth?ssl=true&replicaSet=atlas-fdeltu-shard-0&authSource=admin&retryWrites=true&w=majority'),
    ],
})


export class AppModule {
}
