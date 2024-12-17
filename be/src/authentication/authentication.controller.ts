import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { AccessTokenGuard } from './guard/accessToken.guard';
import { Request } from 'express';

@ApiBearerAuth()
@ApiTags('AuthenticationService')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto): Promise<any> {
    return await this.authenticationService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AccessTokenGuard)
  @Get('infoToken')
  async getInfoToken(@Req() req: Request) {
    return req.user;
  }
}
