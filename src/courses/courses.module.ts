import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/courses/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [CoursesService],
  exports: [CoursesService, TypeOrmModule],
  controllers: [CoursesController]
})
export class CoursesModule {}
