import { IsArray } from 'class-validator';

export class EditDepartmentsDTO {
  @IsArray()
  departmentsIds: string[];
}