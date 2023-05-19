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

  async getFilmById(id: number) {
    return this.filmRepository.findOne({where: {id}});
  }

  
  // async testing(token: string){
  //   return {"abc":this.jwtService.verify(token)};
  // }

  async createFilm(filmDto: FilmDto) {
    console.log('aaa',filmDto)
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
    const film = await this.getFilmById(id);
    if (!film) {
      throw new Error('Film not found');
    }

    const updatedFilm = { ...film, ...filmDto };
    return this.filmRepository.save(updatedFilm);
  }

  async deleteFilm(id: number) {
    const film = await this.getFilmById(id);
    if (!film) {
      throw new Error('Film not found');
    }

    return this.filmRepository.remove(film);
  }
}
