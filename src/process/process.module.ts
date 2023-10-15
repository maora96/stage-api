import { Module } from '@nestjs/common';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Process } from './process.entity';

@Module({
    controllers: [ProcessController],
    providers: [ProcessService],
    imports: [TypeOrmModule.forFeature([Process])],
  })
export class ProcessModule {}
