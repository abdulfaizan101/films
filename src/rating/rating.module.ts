import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './rating.entity';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { jwtConfig } from '../config'

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    TypeOrmModule.forFeature([Rating])],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
