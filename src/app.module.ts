// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/users.module';
import { FilmModule } from './film/film.module';
import { CommentModule } from './comment/comment.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Replace with your database type
      host: 'localhost', // Replace with your database host
      port: 3306, // Replace with your database port
      username: 'root', // Replace with your database username
      password: 'root', // Replace with your database password
      database: 'your_database', // Replace with your database name
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    CommentModule,
    RatingModule,
    FilmModule,
  ],
})
export class AppModule {}
