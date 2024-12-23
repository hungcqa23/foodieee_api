import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { UsersService } from '../../users/users.service';
import { TokenPayLoad } from '../interfaces/token.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.headers?.authorization.split(' ')[1];
        }
      ]),
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET')
    });
  }
  async validate(tokenPayload: TokenPayLoad) {
    const user = await this.usersService.getUserById(tokenPayload.sub);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
