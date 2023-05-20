import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingDto } from './dto/rating.dto';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get()
  getAllRatings() {
    return this.ratingService.getAllRatings();
  }

  @Get(':id')
  getRatingById(@Param('id') id: number) {
    return this.ratingService.getRatingById(id,-2,-2);
  }

  @Post()
  createRating(@Body() ratingDto: RatingDto) {
    return this.ratingService.createRating(ratingDto);
  }

  @Put(':id')
  updateRating(@Param('id') id: number, @Body() ratingDto: RatingDto) {
    return this.ratingService.updateRating(id, ratingDto);
  }

  @Delete(':id')
  deleteRating(@Param('id') id: number, @Body() ratingDto: RatingDto) {
    return this.ratingService.deleteRating(id,ratingDto.token,ratingDto.userId,ratingDto.filmId);
  }
}
