import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateReviewDto } from 'src/reviews/dtos/create-review.dto';
import { ReviewsService } from 'src/reviews/reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post()
  public async createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createReviewDto);
  }

  @Get('/:courseId')
  public async getReviewsByPostId(@Param('courseId') courseId: number) {
    const data = await this.reviewService.getReviewsByCourseId(courseId);

    return {
      status: 'success',
      data
    };
  }
}
