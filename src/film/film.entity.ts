import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'release_date', type: 'date' })
  releaseDate: Date;

  @Column({ name: 'ticket_price', type: 'decimal', precision: 8, scale: 2 })
  ticketPrice: number;

  @Column()
  country: string;

  @Column()
  genre: string;

  @Column()
  photo: string;

  @Column({ name: 'avg_rating' })
  avgRating: number;

  @Column({ name: 'user_id' })
  userId: number;
}
