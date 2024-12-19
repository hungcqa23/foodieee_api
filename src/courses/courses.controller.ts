import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { TypeCourse } from 'src/courses/course.entity';
import { CoursesService } from 'src/courses/courses.service';
import { CreateCourseDto } from 'src/courses/dto/create-course.dto';
import { UpdateCourseDto } from 'src/courses/dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get('')
  public async getAllCourses(@Query('type') type?: TypeCourse) {
    const data = await this.courseService.getAllCourses(type);

    return {
      status: 'success',
      data
    };
  }

  @Post('')
  public async createCourse(@Body() createCourseDto: CreateCourseDto) {
    const data = await this.courseService.createCourse(createCourseDto);

    return {
      status: 'success',
      data
    };
  }

  @Get('/:courseId')
  public async getCourseById(@Param('courseId') courseId: number) {
    const data = await this.courseService.getCourseById(courseId);

    return {
      status: 'success',
      data
    };
  }

  @Patch('/:courseId')
  public async updateCourseById(
    @Param('courseId') courseId: number,
    @Body() updateCourseDto: UpdateCourseDto
  ) {
    const data = await this.courseService.updateCourseById(
      courseId,
      updateCourseDto
    );

    return {
      status: 'success',
      data
    };
  }
}
