import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { LocalAuthenticationGuard } from 'src/common/guards/local-authentication.guard';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { CreateUserDto } from 'src/users/dto/sign-up.dto';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';
import { Role } from 'src/users/user.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

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

  @Post()
  async create(@Body() body: CreateUserDto) {
    const data = await this.usersService.createUser(body);
    return data;
  }

  @Patch('/current')
  public async updateProfileUser(@Body() body: UpdateUserDto) {
    return await this.usersService.updateProfileUser(
      '9427ca8a-4ee8-42d9-ae85-2aa1b9300512',
      body
    );
  }

  @Get('/:email')
  async findOneByEmail(@Param('email') email: string) {
    const data = await this.usersService.getUserByEmail(email);
    return {
      status: 'success',
      data
    };
  }

  @Post('/sign-up')
  public async signUp(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
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
