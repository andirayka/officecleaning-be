import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalGuard } from 'src/auth/guards/local.guard';
import { WebResponse } from 'src/common/common.model';
import { LoginRequest, UserResponse } from 'src/users/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('/login')
  async login(@Body() req: LoginRequest): Promise<WebResponse<UserResponse>> {
    const res = await this.authService.login(req);

    return {
      data: res,
    };
  }
}
