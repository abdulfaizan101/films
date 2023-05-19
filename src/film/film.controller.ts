import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmDto } from './dto/film.dto';

@Controller('films')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Get()
  getAllFilms() {
    return this.filmService.getAllFilms();
  }

  @Get(':id')
  getFilmById(@Param('id') id: number) {
    return this.filmService.getFilmById(id);
  }

  @Post()
  createFilm(@Body() filmDto: FilmDto) {
    return this.filmService.createFilm(filmDto);
  }

  @Put(':id')
  updateFilm(@Param('id') id: number, @Body() filmDto: FilmDto) {
    return this.filmService.updateFilm(id, filmDto);
  }

  @Delete(':id')
  deleteFilm(@Param('id') id: number, @Param('token') token: string) {
    return this.filmService.deleteFilm(id,token);
  }
}
