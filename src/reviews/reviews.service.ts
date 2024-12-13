import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/courses/course.entity';
import { CreateReviewDto } from 'src/reviews/dtos/create-review.dto';
import { Review } from 'src/reviews/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ) {}
  public async createReview(createReviewDto: CreateReviewDto) {
    return await this.reviewRepository.save(createReviewDto);
  }

  public async getReviewsByCourseId(courseId: number) {
    const course = await this.courseRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new HttpException('Course not found', 404);
    }
    const data = await this.reviewRepository.findBy({ course });
    if (!data) {
      throw new HttpException('Reviews not found', 404);
    }

    return data;
  }
}
