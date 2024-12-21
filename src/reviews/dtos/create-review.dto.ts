import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsInt()
  rating: number;

  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsInt()
  course: number;
}
