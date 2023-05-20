import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './film.entity';
import { FilmDto } from './dto/film.dto';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    private jwtService: JwtService,
  ) {}

  async getAllFilms() {
    return this.filmRepository.find();
  }

  async getFilmById(id: number, userId: number) {
    if(userId != -2){
      return this.filmRepository.findOne({where: {id,userId}});
    }
    return this.filmRepository.findOne({where: {id}});
  }

  async createFilm(filmDto: FilmDto) {
    try {      
      let data = this.jwtService.verify(filmDto.token);
      if(data.id){
        const film = this.filmRepository.create(filmDto);
        return this.filmRepository.save(film);
      }
      return 'Error';
    } catch (error) {
      return "Token Invalid"      
    }
  }

  async updateFilm(id: number, filmDto: FilmDto) {
    try {      
      let data = this.jwtService.verify(filmDto.token);
      if(data.id){
        const film = await this.getFilmById(id,filmDto.userId);
        if (!film) {
          throw new Error('Film not found');
        }
        const updatedFilm = { ...film, ...filmDto };
        return this.filmRepository.save(updatedFilm);
      }
      return 'Error';
    } catch (error) {
      return "someThing went wrong."      
    }
  }

  async deleteFilm(id: number, token: string, userId: number) {
    try {      
      let data = this.jwtService.verify(token);
      if(data.id){
        const film = await this.getFilmById(id,userId);
        if (!film) {
          throw new Error('Film not found');
        }

        return this.filmRepository.remove(film);
      }
      return 'Error';
    } catch (error) {
     return "Token Invalid"      
    }
  }
}
