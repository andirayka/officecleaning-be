import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { WebResponse } from 'src/common/common.model';
import {
  EmailRequest,
  LoginRequest,
  RegisterRequest,
  UpdateUserRequest,
  UserResponse,
} from 'src/users/users.model';
import { Auth } from 'src/common/auth.decorator';
import { User } from '@prisma/client';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @HttpCode(200)
  async register(
    @Body() req: RegisterRequest,
  ): Promise<WebResponse<UserResponse>> {
    const res = await this.usersService.register(req);

    return {
      data: res,
    };
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() req: LoginRequest): Promise<WebResponse<UserResponse>> {
    const res = await this.usersService.login(req);

    return {
      data: res,
    };
  }

  @Get('/get-user')
  @HttpCode(200)
  async getUser(@Auth() user: User): Promise<WebResponse<UserResponse>> {
    const res = await this.usersService.getUser(user);

    return {
      data: res,
    };
  }

  @Patch('/update')
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Body() req: UpdateUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const res = await this.usersService.update(user, req);

    return {
      data: res,
    };
  }

  @Delete('/delete-user-by-email')
  @HttpCode(200)
  async deleteUserByEmail(
    @Body() req: EmailRequest,
  ): Promise<WebResponse<UserResponse>> {
    const res = await this.usersService.deleteUserByEmail(req);

    return {
      data: res,
    };
  }
}
