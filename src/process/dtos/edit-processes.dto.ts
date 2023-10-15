import { IsArray } from 'class-validator';

export class EditProcessesDTO {
  @IsArray()
  processesIds: string[];
}