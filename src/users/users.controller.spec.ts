import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

describe('UsersController', () => {
  let app: INestApplication;
  let logger: Logger;
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<UsersController>(UsersController);
    logger = app.get(WINSTON_MODULE_PROVIDER);
  });

  describe('POST /users', () => {
    it('should be rejected if request is invalid', async () => {
      const res = await request(app.getHttpServer()).post('/api/users').send({
        username: '',
        password: '',
        name: '',
      });
    });
  });
});
