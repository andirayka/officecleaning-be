import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  EmailRequest,
  LoginRequest,
  RegisterRequest,
  UpdateUserRequest,
  UserResponse,
} from 'src/users/users.dto';
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

  async findOne(rawReq: EmailRequest): Promise<UserResponse> {
    this.logger.debug(`UserService.findOne(${JSON.stringify(rawReq)})`);
    const validatedReq: EmailRequest = this.validationService.validate(
      UserValidation.EMAIL,
      rawReq,
    );

    const user = await this.prismaService.user.findUnique({
      where: { email: validatedReq.email },
    });
    // User doesn't exist
    if (!user) {
      throw new HttpException('Username or password is invalid', 401);
    }

    return {
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
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

  async update(user: User, rawReq: UpdateUserRequest): Promise<UserResponse> {
    this.logger.debug(
      `UserService.update( ${JSON.stringify(user)} , ${JSON.stringify(rawReq)} )`,
    );

    const validatedReq: UpdateUserRequest = this.validationService.validate(
      UserValidation.UPDATE,
      rawReq,
    );

    for (const prop in validatedReq) {
      if (prop !== 'password') {
        user[prop] = validatedReq[prop];
      } else {
        user.password = await bcrypt.hash(validatedReq.password, 10);
      }
    }

    return {
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
    };
  }

  async deleteUserByEmail(rawReq: EmailRequest): Promise<UserResponse> {
    this.logger.debug(`UserService.deleteUser(${JSON.stringify(rawReq)})`);
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
