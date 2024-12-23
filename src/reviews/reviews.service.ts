import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/courses/course.entity';
import { CreateReviewDto } from 'src/reviews/dtos/create-review.dto';
import { Review } from 'src/reviews/review.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}
  public async createReview(user: User, createReviewDto: CreateReviewDto) {
    const course = await this.courseRepository.findOneBy({
      id: createReviewDto.course
    });
    if (!course) throw new HttpException('Course not found', 404);

    const foundReview = await this.reviewRepository.findOne({
      where: { user: { id: user.id }, course: { id: course.id } },
      relations: ['user', 'course'] // Ensure relations are loaded
    });
    if (foundReview) throw new HttpException('Review already exists', 409);

    const review = this.reviewRepository.create({
      ...createReviewDto,
      user,
      course
    });

    return await this.reviewRepository.save(review);
  }

  public async getReviewsByCourseId(courseId: number) {
    const course = await this.courseRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new HttpException('Course not found', 404);
    }
    const data = await this.reviewRepository.find({
      where: { course: { id: courseId } },
      relations: ['user', 'course']
    });
    if (!data) {
      throw new HttpException('Reviews not found', 404);
    }

    return data;
  }

  public async deleteReview(reviewId: number) {
    const review = await this.reviewRepository.findOneBy({ id: reviewId });
    if (!review) {
      throw new HttpException('Review not found', 404);
    }
    return await this.reviewRepository.remove(review);
  }
}
