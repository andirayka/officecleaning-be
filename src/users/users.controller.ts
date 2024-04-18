import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { WebResponse } from 'src/common/common.model';
import { RegisterRequest, UserResponse } from 'src/users/users.model';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(200)
  async register(
    @Body() req: RegisterRequest,
  ): Promise<WebResponse<UserResponse>> {
    const res = await this.usersService.register(req);

    return {
      data: res,
    };
  }
}
