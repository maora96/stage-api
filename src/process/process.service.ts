import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Process } from './process.entity';
import { CreateProcessDTO } from './dtos/create-process.dto';
import { EditProcessDTO } from './dtos/edit-process.dto';
import { Department } from 'src/department/department.entity';

@Injectable()
export class ProcessService {
  constructor(
    @InjectRepository(Process)
    private processesRepository: Repository<Process>,
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>
  ) { }

  async getMany() {
    return this.processesRepository.find({
      relations: ['processes', 'departments'],
    });
  }

  async getByDepartment(id: string) {
    const process = await this.processesRepository.findOne({
      where: { id },
      relations: ['processes', 'departments'],
    });

    if (!process) {
      throw new NotFoundException('Process not found');
    }

    return process;
  }

  async getOne(id: string) {
    const process = await this.processesRepository.findOne({
      where: { id },
      relations: ['processes', 'departments'],
    });

    if (!process) {
      throw new NotFoundException('Process not found');
    }

    return process;
  }

  create(createProcessDTO: CreateProcessDTO) {
    const {
      name,
      description,
      cover,

    } = createProcessDTO;
    const process = new Process(
      name,
      description,
      cover,
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

  async editDepartments(id: string, departmentsIds: string[]) {
    const process = await this.processesRepository.findOne({
      where: { id },
      relations: ['departments'],
    });

    if (!process) {
      throw new NotFoundException('Process not found');
    }

    const departments = await this.departmentsRepository.find({
      where: { id: In(departmentsIds) }, relations: ['processes']
    });

    if (!departments) {
      throw new NotFoundException('No departments found.');
    }

    process.addDepartments(departments);

    await this.processesRepository.save(process)

    for (const department of departments) {
      department.addProcess(process)
      await this.departmentsRepository.save(department);
    }

    return {
      process,
    };
  }

}
