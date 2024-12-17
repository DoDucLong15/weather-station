import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    UsersModule
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AccessTokenStrategy],
  exports: [AuthenticationService]
})
export class AuthenticationModule {}
