import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import { TypeCourse } from 'src/courses/course.entity';

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TypeCourse)
  typeCourse?: TypeCourse;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ingredients?: string[];

  @IsOptional()
  @IsString()
  image?: string;
}
