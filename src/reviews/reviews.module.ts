import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { CoursesModule } from 'src/courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/reviews/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), CoursesModule],
  providers: [ReviewsService],
  controllers: [ReviewsController]
})
export class ReviewsModule {}
