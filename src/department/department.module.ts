import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Process } from 'src/process/process.entity';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService],
  imports: [TypeOrmModule.forFeature([Department, Process])],
})
export class DepartmentModule {}
