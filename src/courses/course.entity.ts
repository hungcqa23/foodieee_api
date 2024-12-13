import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TypeCourse {
  MAIN_COURSE = 'main_course',
  APPETIZER = 'appetizer',
  DRINK = 'drink',
  DESSERT = 'dessert'
}

@Entity()
export class Course {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column({ unique: true, nullable: true })
  slug: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: TypeCourse,
    default: TypeCourse.MAIN_COURSE
  })
  typeCourse: string;

  @Column()
  price: number;

  @Column()
  ingredient: string[];

  @Column({ nullable: true })
  image: string;
}
