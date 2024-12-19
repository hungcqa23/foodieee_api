import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, TypeCourse } from 'src/courses/course.entity';
import { CreateCourseDto } from 'src/courses/dto/create-course.dto';
import { UpdateCourseDto } from 'src/courses/dto/update-course.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>
  ) {}

  public async getAllCourses(type?: TypeCourse) {
    return await this.courseRepository.find({
      where: { typeCourse: type },
      order: { id: 'ASC' }
    });
  }

  public async getCourseById(id: number) {
    return await this.courseRepository.findOneBy({ id });
  }

  public async createCourse(createCourseDto: CreateCourseDto) {
    return await this.courseRepository.save(createCourseDto);
  }

  public async updateCourseById(id: number, updateCourseDto: UpdateCourseDto) {
    return await this.courseRepository.update(id, updateCourseDto);
  }
}
