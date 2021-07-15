import {DynamicModule, Module} from '@nestjs/common';
import {ScheduleModule} from "@nestjs/schedule";
import {JwtAuthSyncService} from "./jwtauthsync.service";
import {HttpModule} from "@nestjs/axios";
import {JwtModule} from "@nestjs/jwt";


@Module({
    imports: [
        ScheduleModule.forRoot(),
        HttpModule,
        JwtModule.register({}),
    ]
})
export class JwtauthsyncModule {

    static forRoot(): DynamicModule {

        return {
            module: JwtauthsyncModule,
            providers: [JwtAuthSyncService],
            exports: [JwtAuthSyncService]
        }

    }

    async fetchData() {
        console.log("hejhej")
    }
}
