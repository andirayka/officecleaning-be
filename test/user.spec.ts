import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { test_email } from 'helpers/constants';

describe('UserController', () => {
  let app: INestApplication;
  let logger: Logger;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
  });

  describe('POST /users/register', () => {
    it('Should be rejected if request is invalid', async () => {
      const res = await request(app.getHttpServer())
        .post('/users/register')
        .send({
          email: '',
          name: '',
          phoneNumber: '',
          password: '',
          role: '',
        });

      logger.info(res.body);

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });

    it('Should be able to register', async () => {
      const res = await request(app.getHttpServer())
        .post('/users/register')
        .send({
          email: test_email,
          name: 'Wahyudi',
          phoneNumber: '089123456789',
          password: 'password',
          role: 'CLIENT',
        });

      logger.info(res.body);

      expect(res.status).toBe(200);
      expect(res.body.data.email).toBe(test_email);
    });

    it('Should be rejected if username already exists', async () => {
      const res = await request(app.getHttpServer())
        .post('/users/register')
        .send({
          email: test_email,
          name: 'Wahyudi',
          phoneNumber: '089123456789',
          password: 'password',
          role: 'CLIENT',
        });

      logger.info(res.body);

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });

    it('Should delete registered user', async () => {
      const res = await request(app.getHttpServer())
        .delete('/users/delete-user-by-email')
        .send({ email: test_email });

      logger.info(res.body);

      expect(res.status).toBe(200);
      expect(res.body.data.email).toBe(test_email);
    });
  });
});
