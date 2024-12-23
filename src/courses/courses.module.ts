import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/courses/course.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), UsersModule],
  providers: [CoursesService],
  exports: [CoursesService, TypeOrmModule],
  controllers: [CoursesController]
})
export class CoursesModule {}
