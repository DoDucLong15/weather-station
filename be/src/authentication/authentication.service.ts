import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { decryptedText } from 'src/users/helpers/security.helper';
import { UsersService } from 'src/users/users.service';
import { IMAGE_URL } from './constants/auth.constant';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.getUser({
      where: {
        email: email,
      },
    });
    if (!user) throw new BadRequestException('User not found!');
    else if (!(await decryptedText(password, user.encodePassword))) {
      throw new UnauthorizedException();
    }

    const tokens = await this.getTokens(user.email);
    return {
      access_token: tokens.accessToken,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email, 
      image: IMAGE_URL
    };
  }

  async getTokens(email: string) {
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          email
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '1h',
        },
      )
    ]);

    return {
      accessToken
    };
  }
}
