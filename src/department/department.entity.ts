import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToMany,
    JoinColumn,
    JoinTable,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { EditDepartmentDTO } from './dtos/edit-department.dto';
import { Process } from 'src/process/process.entity';

@Entity({ name: 'departments' })
export class Department {
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

    edit(editDepartmentDTO: EditDepartmentDTO) {
        this.name = editDepartmentDTO.name ?? this.name;
        this.description = editDepartmentDTO.description ?? this.description;
        this.cover = editDepartmentDTO.cover ?? this.cover;
    }

    addProcess(process: Process) {
        if (this.processes.length === 0) {
            this.processes = [process];
        } else {
            const existingProcessesIds = this.processes.map((process: Process) => process.id);

            if (!existingProcessesIds.includes(process.id)) {
                this.processes.push(process);
            }
        }
    }

}