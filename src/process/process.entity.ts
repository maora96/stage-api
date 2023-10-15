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

  @Column({ type: 'text',  array: true })
  department: string[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;


  @ManyToMany(() => Process)
  @JoinColumn()
  @JoinTable()
  processes: Process[] | null;

  constructor(
    name: string,
    description: string,
    cover: string | null,
    department: string[],
    createdAt?: Date | null,
    id?: string,
  ) {
    this.id = id ?? uuid();
    this.name = name;
    this.description = description;
    this.cover = cover;
    this.department = department;
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
      const existingProcessesIds = this.processes.map((process: Process) => process.id);
      for (const process of processes) {
        if (!existingProcessesIds.includes(process.id)) {
          this.processes.push(process);
        }
      }
    }
  }

}