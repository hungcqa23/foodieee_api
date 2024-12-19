import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Course } from 'src/courses/course.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  rating: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Course)
  @JoinColumn()
  course: Course;
}
