import { Module } from '@nestjs/common';
import {JwtauthsyncModule, JwtAuthSyncService} from "sasp11-jwt-auth-sync";

@Module({
    imports: [JwtauthsyncModule.forRoot()],
    providers: [JwtAuthSyncService],
    exports: [JwtAuthSyncService]
})
export class JwtModule {}
