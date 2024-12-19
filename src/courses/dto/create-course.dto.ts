import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import { TypeCourse } from 'src/courses/course.entity';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(TypeCourse)
  typeCourse: TypeCourse;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsArray()
  @IsString({ each: true })
  ingredients: string[];

  @IsOptional()
  @IsString()
  image?: string;
}
