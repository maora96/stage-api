import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { EditProcessDTO } from './dtos/edit-process.dto';
import { Department } from 'src/department/department.entity';

@Entity({ name: 'processes' })
export class Process {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  cover: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @ManyToMany(() => Process)
  @JoinColumn()
  @JoinTable()
  processes: Process[] | null;

  @ManyToMany(() => Department)
  @JoinColumn()
  @JoinTable()
  departments: Department[] | null;

  constructor(
    name: string,
    description: string,
    cover: string | null,
    createdAt?: Date | null,
    id?: string,
  ) {
    this.id = id ?? uuid();
    this.name = name;
    this.description = description;
    this.cover = cover;
    this.createdAt = createdAt ?? new Date();
  }

  edit(editProcessEdit: EditProcessDTO) {
    this.name = editProcessEdit.name ?? this.name;
    this.description = editProcessEdit.description ?? this.description;
    this.cover = editProcessEdit.cover ?? this.cover;
  }

  addProcesses(processes: Process[]) {
    if (this.processes.length === 0) {
      this.processes = processes;
    } else {
      const existingProcessesIds = this.processes.map(
        (process: Process) => process.id,
      );
      for (const process of processes) {
        if (!existingProcessesIds.includes(process.id)) {
          this.processes.push(process);
        }
      }
    }
  }

  addDepartments(departments: Department[]) {
    if (this.departments.length === 0) {
      this.departments = departments;
    } else {
      const existingDepartmentsIds = this.departments.map(
        (department: Department) => department.id,
      );

      for (const department of departments) {
        if (!existingDepartmentsIds.includes(department.id)) {
          this.departments.push(department);
        }
      }
    }
  }
}
