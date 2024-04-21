import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { WebResponse } from 'src/common/common.model';
import {
  EmailRequest,
  LoginRequest,
  RegisterRequest,
  UserResponse,
} from 'src/users/users.model';

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
