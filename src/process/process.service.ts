import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Process } from './process.entity';
import { CreateProcessDTO } from './dtos/create-process.dto';
import { EditProcessDTO } from './dtos/edit-process.dto';

@Injectable()
export class ProcessService {
    constructor(
        @InjectRepository(Process)
        private processesRepository: Repository<Process>
      ) {}

    
      async getMany() {
        return this.processesRepository.find({
            relations: ['processes'],
          });
      }
    
    
      async getOne(id: string) {
        const character = await this.processesRepository.findOne({
          where: { id },
          relations: ['processes'],
        });
    
        if (!character) {
          throw new NotFoundException('Character not found');
        }
    
        return character;
      }
    
    
      create(createProcessDTO: CreateProcessDTO) {
        const {
          name,
          description,
          cover,
          departments
         
        } = createProcessDTO;
        const process = new Process(
          name,
          description,
          cover,
          departments
        );
    
        return this.processesRepository.save(process);
      }
    
      async edit(id: string, editProcessDTO: EditProcessDTO) {
        const process = await this.processesRepository.findOne({
          where: { id },
        });
    
        if (!process) {
          throw new NotFoundException('Process not found');
        }
    
        process.edit(editProcessDTO);
    
        return this.processesRepository.save(process);
      }
    
      async delete(id: string) {
        const process = await this.processesRepository.findOne({
          where: { id },
        });
    
        if (!process) {
          throw new NotFoundException('Process not found');
        }
        return this.processesRepository.remove(process);
      }
    
      async editProcesses(id: string, processesIds: string[]) {
        const process = await this.processesRepository.findOne({
          where: { id },
          relations: ['processes'],
        });
    
        if (!process) {
          throw new NotFoundException('Process not found');
        }
    
        console.log(process)
        console.log(processesIds)
        const subprocesses = await this.processesRepository.find({
          where: { id: In(processesIds) },
        });
    
        if (!subprocesses) {
          throw new NotFoundException('No subprocesses found.');
        }
    
        process.addProcesses(subprocesses);
    
        await this.processesRepository.save(process);
    
        return {
          process,
        };
      }
    
     
}
