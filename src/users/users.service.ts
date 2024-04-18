import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  LoginRequest,
  RegisterRequest,
  UserResponse,
} from 'src/users/users.model';
import { UserValidation } from 'src/users/users.validation';
import { Logger } from 'winston';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async register(req: RegisterRequest): Promise<UserResponse> {
    this.logger.info(`UserService.login(${JSON.stringify(req)})`);
    const registerReq: RegisterRequest = this.validationService.validate(
      UserValidation.REGISTER,
      req,
    );

    const totalUserWithSameEmail = await this.prismaService.user.count({
      where: {
        email: registerReq.email,
      },
    });

    // user already exists
    if (totalUserWithSameEmail != 0) {
      throw new HttpException('Email is already registered', 400);
    }

    // Hash password
    registerReq.password = await bcrypt.hash(registerReq.password, 10);

    const user = await this.prismaService.user.create({
      data: registerReq,
    });

    return {
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };
  }

  // async login(req: LoginRequest): Promise<UserResponse> {
  //   this.logger.info(`UserService.login(${JSON.stringify(req)})`);
  //   const loginReq: LoginRequest = this.validationService.validate(
  //     UserValidation.LOGIN,
  //     req,
  //   );

  //   const user = await this.prismaService.user.findUnique({
  //     where: {
  //       email: loginReq.email,
  //     },
  //   });

  //   // User doesn't exist
  //   if (!user) {
  //     throw new HttpException('Username or password is invalid', 401);
  //   }

  //   const isPasswordValid = await bcryp;
  // }
}
