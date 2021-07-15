import {HttpException, Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {catchError} from "rxjs";

@Injectable()
export class AuthService {
    constructor(
        private readonly httpService: HttpService) {
    }

    async login(loginInfo) {
        // try {
        const res = await this.httpService.post("http://auth-ms:3000/auth/login", loginInfo)
            .pipe(catchError(e => {
                throw new HttpException(e.response.data, e.response.status);
            }))
            .toPromise();
        return res.data;
        // } catch (e) {
        //     if (e.response && e.response.status === 401) {
        //         throw new UnauthorizedException(e.response.data.message)
        //     }
        //     throw e;
        // }
    }
}
