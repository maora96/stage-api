import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDTO } from './dtos/create-department.dto';
import { EditDepartmentDTO } from './dtos/edit-department.dto';
import { Process } from 'src/process/process.entity';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department)
        private departmentsRepository: Repository<Department>,
        @InjectRepository(Process)
        private processesRepository: Repository<Process>,
      ) {}

    
      async getMany() {
        return this.departmentsRepository.find();
      }
    
    
      async getOne(id: string) {
        const department = await this.departmentsRepository.findOne({
          where: { id }, relations: ['processes']
        });

        
        if (!department) {
          throw new NotFoundException('Department not found');
        }

        const processes = await this.departmentsRepository.find();

        
    
        return department;
      }
    
    
      create(createDepartmentDTO: CreateDepartmentDTO) {
        const {
          name,
          description,
          cover,
         
        } = createDepartmentDTO;
        const department = new Department(
          name,
          description,
          cover,
        );
    
        return this.departmentsRepository.save(department);
      }
    
      async edit(id: string, editDepartmentDTO: EditDepartmentDTO) {
        const department = await this.departmentsRepository.findOne({
          where: { id },
        });
    
        if (!department) {
          throw new NotFoundException('Department not found');
        }
    
        department.edit(editDepartmentDTO);
    
        return this.departmentsRepository.save(department);
      }
    
      async delete(id: string) {
        const department = await this.departmentsRepository.findOne({
          where: { id },
        });
    
        if (!department) {
          throw new NotFoundException('Department not found');
        }
        return this.departmentsRepository.remove(department);
      }
    
}
