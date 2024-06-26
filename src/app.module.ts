import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CommonModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
