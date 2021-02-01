import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('articles')
class Articles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;
}

export default Articles;
