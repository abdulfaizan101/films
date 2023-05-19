import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './film.entity';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { jwtConfig } from '../config'

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    TypeOrmModule.forFeature([Film])],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
