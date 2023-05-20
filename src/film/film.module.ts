import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './film.entity';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { jwtConfig } from '../config'
import { ElasticsearchsService } from './elasticsearchs.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200', // Elasticsearch server URL
      auth: {
        username: 'elastic', // Replace with your Elasticsearch username
        password: '+e=IuqgePicu0kZWIsjm', // Replace with your Elasticsearch password
      },
      // Add any additional configuration options if needed
    }),
    JwtModule.register(jwtConfig),
    TypeOrmModule.forFeature([Film])],
  controllers: [FilmController],
  providers: [FilmService,ElasticsearchsService],
})
export class FilmModule {}
