import {HttpException, Inject, Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {ClientProxy} from "@nestjs/microservices";
import {RuntimeException} from "@nestjs/core/errors/exceptions/runtime.exception";
import {catchError} from "rxjs";

@Injectable()
export class UsersService {
    constructor(private readonly httpService: HttpService,
                @Inject('USER_MS') private readonly clientProxy: ClientProxy) {
    }

    async create(user) {
        let res;
        await this.httpService.post("http://auth-ms:3000/users/", user)
            .pipe(
                catchError(e => {
                    throw new HttpException(e.response.data, e.response.status);
                }),
            ).toPromise();
        res = await this.clientProxy.send("create-user", user).toPromise();
        if (!res) throw new RuntimeException("User object not returned and error not thrown")

        return res;
    }
}
