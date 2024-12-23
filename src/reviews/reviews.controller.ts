import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { JwtAccessTokenGuard } from 'src/common/guards/jwt-access-token.guard';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { CreateReviewDto } from 'src/reviews/dtos/create-review.dto';
import { ReviewsService } from 'src/reviews/reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post()
  public async createReview(
    @Req() req: RequestWithUser,
    @Body() createReviewDto: CreateReviewDto
  ) {
    const data = await this.reviewService.createReview(
      req.user,
      createReviewDto
    );

    return {
      status: 'success',
      data
    };
  }

  @Get('/:courseId')
  public async getReviewsByPostId(@Param('courseId') courseId: number) {
    const data = await this.reviewService.getReviewsByCourseId(courseId);

    return {
      status: 'success',
      data
    };
  }

  @Delete('/:reviewId')
  public async deleteReview(@Param('reviewId') reviewId: number) {
    const data = await this.reviewService.deleteReview(reviewId);

    return {
      status: 'success',
      data
    };
  }
}
