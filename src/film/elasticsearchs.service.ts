import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
// import { Film } from './film.entity';
import { FilmDto } from './dto/film.dto';

@Injectable()
export class ElasticsearchsService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  
  async searchIndexData(query: string): Promise<any> {
    console.log('uuuuuuuu',query);
    const body = await this.elasticsearchService.search({
      index: '_all', // Use '_all' to search across all indices
      body: {
        query: {
          multi_match: {
            query: query,
            fields: ['name', 'description']
          }
        }
      }
    });
    console.log('sss',body);

    return body.hits.hits.map(hit => hit._source);
  }
  
  async getAllIndexData(): Promise<any> {
    const body = await this.elasticsearchService.search({
      index: '_all', // Use '_all' to search across all indices
      body: {
        query: {
          match_all: {} // Match all documents
        }
      }
    });

    return body.hits.hits.map(hit => hit);
  }
  
  async createFilm(index: string, film: FilmDto) {
    return this.elasticsearchService.index({
      index,
      body: film,
    });
  }

  async getFilm(index: string, id: string) {
    return this.elasticsearchService.get({
      index,
      id,
    });
  }

  async updateFilm(index: string, id: string, film: Partial<FilmDto>) {
    return this.elasticsearchService.update({
      index,
      id,
      body: {
        doc: film,
      },
    });
  }

  async deleteFilm(index: string, id: string) {
    return this.elasticsearchService.delete({
      index,
      id,
    });
  }
}
