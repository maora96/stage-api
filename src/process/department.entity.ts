import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'departments' })
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  constructor(
    name: string,
    createdAt?: Date | null,
    id?: string,
  ) {
    this.id = id ?? uuid();
    this.name = name;
    this.createdAt = createdAt ?? new Date();
  }

}