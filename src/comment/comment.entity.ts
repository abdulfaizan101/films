import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;
  
  @Column({ name: 'film_id' })
  filmId: number;

  @Column({ name: 'user_id' })
  userId: number;
}
