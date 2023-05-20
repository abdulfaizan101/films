import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmDto } from './dto/film.dto';
import { ElasticsearchsService } from './elasticsearchs.service';

@Controller('films')
export class FilmController {
  constructor(private readonly filmService: FilmService,private readonly elasticsearchService: ElasticsearchsService) {}

  @Get()
  getAllFilms() {
    return this.filmService.getAllFilms();
  }

  @Get(':id')
  getFilmById(@Param('id') id: number) {
    return this.filmService.getFilmById(id,-2);
  }

  @Get('name/:name')
  getElasticFilmByName(@Param('name') name: string ) {
    console.log('eeeeeeeeee',name);
    return this.elasticsearchService.searchIndexData(name) 
  }

  @Post()
  createFilm(@Body() filmDto: FilmDto) {
    let a = this.filmService.createFilm(filmDto);
    this.elasticsearchService.createFilm("test", filmDto);
    
    return this.elasticsearchService.getAllIndexData();
  }

  @Put(':id')
  updateFilm(@Param('id') id: number, @Body() filmDto: FilmDto) {
    return this.filmService.updateFilm(id, filmDto);
  }

  @Delete(':id')
  deleteFilm(@Param('id') id: number, @Param('userId') userId: number, @Param('token') token: string) {
    return this.filmService.deleteFilm(id,token,userId);
  }
}
