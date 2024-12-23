import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/common/strategies/jwt-access-token.strategy';
import { JwtRefreshTokenStrategy } from 'src/common/strategies/jwt-refresh-token.strategy';
import { LocalStrategy } from 'src/common/strategies/local.strategy';
import { User } from 'src/users/user.entity';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({})
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    LocalStrategy,
    JwtRefreshTokenStrategy,
    JwtStrategy
  ],
  exports: [UsersService, TypeOrmModule, JwtStrategy]
})
export class UsersModule {}
