import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;
  
  @Column({ name: 'film_id' })
  filmId: number;

  @Column({ name: 'user_id' })
  userId: number;
}
