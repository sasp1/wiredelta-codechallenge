import {Injectable, UnauthorizedException} from "@nestjs/common";
import {CronExpression, SchedulerRegistry} from "@nestjs/schedule";
import {CronJob} from "cron";
import {HttpService} from "@nestjs/axios";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthSyncService {
    private jwtPublicKey: string;
    private httpService: HttpService;
    private jwtService: JwtService


    constructor() {
        const scheduler = new SchedulerRegistry()
        this.httpService = new HttpService();
        this.jwtService = new JwtService({});
        const job = new CronJob(CronExpression.EVERY_5_MINUTES, () => this.fetching());
        this.fetching();
        scheduler.addCronJob("id", job);
        job.start();
    }

    authorize(jwt: string) {
        if (!this.jwtPublicKey)
            throw new UnauthorizedException("Invalid public key");

        if (jwt.includes("Bearer"))
            jwt = jwt.replace("Bearer ", "");

        try {
            return this.jwtService.verify(jwt, {
                publicKey: this.jwtPublicKey
            });
        } catch (e) {
            throw new UnauthorizedException(e.message);
        }
    }

    authorizeAsCompanyOwner(jwt: string) {
        const user = this.authorize(jwt);

        console.log(user);
        if (user.role !== "admin" && user.role !== "company_owner") {
            throw new UnauthorizedException("User should be company owner");
        }
        return user;
    }

    authorizeAsAdmin(jwt: string) {
        const user = this.authorize(jwt);

        if (user.role !== "admin") {
            throw new UnauthorizedException("User should be admin");
        }
        return user;
    }

    private async fetching() {
        try {
            const res = await this.httpService.get("http://auth-ms:3000/auth/pub-key").toPromise();
            this.jwtPublicKey = res.data;

        } catch (e) {
            // Trying again after 5 seconds
            await new Promise(f => setTimeout(f, 10000));
            console.log("trying again...");
            const res = await this.httpService.get("http://auth-ms:3000/auth/pub-key").toPromise();
            this.jwtPublicKey = res.data;
        }
    }

}
