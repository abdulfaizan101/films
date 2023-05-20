import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './rating.entity';
import { RatingDto } from './dto/rating.dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    private jwtService: JwtService,
  ) {}

  async getAllRatings() {
    return this.ratingRepository.find();
  }

  async getRatingById(id: number, userId: number, filmId: number) {
    if(userId != -2){
      return this.ratingRepository.findOne({where: {id, userId, filmId}});
    }
    return this.ratingRepository.findOne({where: {id}});
  }

  async createRating(ratingDto: RatingDto) {
    try {      
      let data = this.jwtService.verify(ratingDto.token);
      if(data.id){
        const rating = this.ratingRepository.create(ratingDto);
        return this.ratingRepository.save(rating);
      }
      return 'Error';
    } catch (error) {
      return "Token Invalid"      
    }
  }

  async updateRating(id: number, ratingDto: RatingDto) {
    try {      
      let data = this.jwtService.verify(ratingDto.token);
      if(data.id){
        const rating = await this.getRatingById(id,ratingDto.userId, ratingDto.filmId);
        if (!rating) {
          throw new Error('Rating not found');
        }

        const updatedRating = { ...rating, ...ratingDto };
        return this.ratingRepository.save(updatedRating);
      }
      return 'Error';
    } catch (error) {
      return "Token Invalid"      
    }
  }

  async deleteRating(id: number, token: string, userId: number, filmId: number) {
    try {      
      let data = this.jwtService.verify(token);
      if(data.id){
        const rating = await this.getRatingById(id,userId, filmId);
        if (!rating) {
          throw new Error('Rating not found');
        }

        return this.ratingRepository.remove(rating);
      }
      return 'Error';
    } catch (error) {
     return "Token Invalid"      
    }
  }
}
