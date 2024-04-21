import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  EmailRequest,
  LoginRequest,
  RegisterRequest,
  UserResponse,
} from 'src/users/users.model';
import { UserValidation } from 'src/users/users.validation';
import { Logger } from 'winston';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async register(rawReq: RegisterRequest): Promise<UserResponse> {
    this.logger.info(`UserService.login(${JSON.stringify(rawReq)})`);
    const validatedReq: RegisterRequest = this.validationService.validate(
      UserValidation.REGISTER,
      rawReq,
    );

    const totalUserWithSameEmail = await this.prismaService.user.count({
      where: { email: validatedReq.email },
    });

    // user already exists
    if (totalUserWithSameEmail != 0) {
      throw new HttpException('Email is already registered', 400);
    }

    // Hash password
    validatedReq.password = await bcrypt.hash(validatedReq.password, 10);

    const user = await this.prismaService.user.create({
      data: { ...validatedReq, token: uuid() },
    });

    return {
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      token: user.token,
    };
  }

  async login(rawReq: LoginRequest): Promise<UserResponse> {
    this.logger.info(`UserService.login(${JSON.stringify(rawReq)})`);
    const validatedReq: LoginRequest = this.validationService.validate(
      UserValidation.LOGIN,
      rawReq,
    );

    let user = await this.prismaService.user.findUnique({
      where: { email: validatedReq.email },
    });

    // User doesn't exist
    if (!user) {
      throw new HttpException('Username or password is invalid', 401);
    }

    const isPasswordValid = await bcrypt.compare(
      validatedReq.password,
      user.password,
    );
    // Wrong password
    if (!isPasswordValid) {
      throw new HttpException('Username or password is invalid', 401);
    }

    user = await this.prismaService.user.update({
      where: { email: validatedReq.email },
      data: { token: uuid() },
    });

    return {
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      token: user.token,
    };
  }

  async getUser(user: User): Promise<UserResponse> {
    return {
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
    };
  }

  async deleteUserByEmail(rawReq: EmailRequest): Promise<UserResponse> {
    this.logger.info(`UserService.deleteUser(${JSON.stringify(rawReq)})`);
    const validatedReq: EmailRequest = this.validationService.validate(
      UserValidation.EMAIL,
      rawReq,
    );
    const user = await this.prismaService.user.delete({
      where: {
        email: validatedReq.email,
      },
    });

    return {
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
    };
  }
}
