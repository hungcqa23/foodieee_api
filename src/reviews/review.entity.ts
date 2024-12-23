import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Course } from 'src/courses/course.entity';
import { Max, Min } from 'class-validator';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  @Max(5)
  @Min(1)
  rating: number;

  @ManyToOne(() => User, user => user.reviews)
  user: User;

  @ManyToOne(() => Course, course => course.reviews)
  course: Course;
}
