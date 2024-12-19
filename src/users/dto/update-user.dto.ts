import { IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  address: string;

  @IsString()
  profileImage: string;
}
