import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';
import { TypeCourse } from 'src/courses/course.entity';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(TypeCourse)
  typeCourse: TypeCourse;

  @IsNumber()
  price: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  ingredient: string[];

  @IsOptional()
  @IsString()
  image?: string;
}
