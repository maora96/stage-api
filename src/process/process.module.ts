import { Module } from '@nestjs/common';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Process } from './process.entity';
import { Department } from 'src/department/department.entity';

@Module({
    controllers: [ProcessController],
    providers: [ProcessService],
    imports: [TypeOrmModule.forFeature([Process, Department])],
  })
export class ProcessModule {}
