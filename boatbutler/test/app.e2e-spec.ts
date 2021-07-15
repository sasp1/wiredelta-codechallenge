import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppService} from "../src/app.service";
import {AppController} from "../src/app.controller";

describe('AppController (e2e)', () => {
    let app: INestApplication;

    const mockRedis = {
        send: (val: string, data: number[]) => {
            return {
                toPromise: () => data
            }
        }
    }

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService, {
                provide: "USER_SERVICE",
                useValue: mockRedis
            }]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });
});
