import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Role, User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  public async findAll(type?: Role) {
    return await this.userRepository.find({
      where: { role: type }
    });
  }

  public async getUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  public async createUser(body: CreateUserDto) {
    return await this.userRepository.save(body);
  }

  public async getAuthenticatedUser(email: string, password: string) {
    const user = await this.getUserByEmail(email);

    if (user.password !== password) {
      throw new HttpException('Invalid credentials', 401);
    }
    return user;
  }

  public async getUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  public async signAccessToken(userId: number, fullName: string) {
    const payload = { sub: userId, fullName };
    // return await this.userRepository.signAccessToken(payload);
    return payload;
  }
}
