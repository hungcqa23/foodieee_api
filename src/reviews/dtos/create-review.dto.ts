import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsInt()
  rating: number;

  @IsNotEmpty()
  @IsInt()
  user: number;

  @IsNotEmpty()
  @IsInt()
  course: number;
}
