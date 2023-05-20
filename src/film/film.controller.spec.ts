import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { Film } from './film.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as request from 'supertest';

describe('FilmController', () => {
  let app: INestApplication;
  let filmService: FilmService;
  let filmRepository: Repository<Film>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [FilmController],
      providers: [
        FilmService,
        {
          provide: getRepositoryToken(Film),
          useClass: Repository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    filmService = moduleFixture.get<FilmService>(FilmService);
    filmRepository = moduleFixture.get<Repository<Film>>(getRepositoryToken(Film));
  });

  afterAll(async () => {
    await app.close();
  });

  // ...

  describe('GET /films', () => {
    it('should return an array of films', async () => {
      const films: Film[] = [
        {
          "id": 7,
          "name": "khof",
          "description": "khan movie",
          "releaseDate": new Date("2020-01-01"),
          "ticketPrice": 122.00,
          "country": "pakistan",
          "genre": "test",
          "photo": "anbc",
          "avgRating": 0,
          "userId": 1
        }
      ];

      jest.spyOn(filmService, 'getFilmById').mockResolvedValue(films as any);

      const response = await request(app.getHttpServer())
        .get('/films')
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(films);
    });
  });

  // ...
});
