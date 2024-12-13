import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { LocalAuthenticationGuard } from 'src/common/guards/local-authentication.guard';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';
import { Role } from 'src/users/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query('type') type?: Role) {
    const data = await this.usersService.findAll(type);

    return {
      status: 'success',
      data
    };
  }

  @Get('/:email')
  async findOneByEmail(@Param('email') email: string) {
    const data = await this.usersService.getUserByEmail(email);
    return {
      status: 'success',
      data
    };
  }

  @Post('')
  async create(@Body() body: CreateUserDto) {
    const data = await this.usersService.createUser(body);
    return data;
  }

  @Post('/login')
  @UseGuards(LocalAuthenticationGuard)
  async login(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    const token = await this.usersService.signAccessToken(
      user.id,
      user.fullName
    );

    res.send({
      status: 'success',
      data: {
        token
      }
    });
  }
}
