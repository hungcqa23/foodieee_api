import { Strategy } from 'passport-local';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      usernameField: 'email'
    });
  }

  public async validate(email: string, password: string): Promise<User> {
    const user = await this.usersService.getAuthenticatedUser(email, password);

    return user;
  }
}
