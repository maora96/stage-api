import {
  IsOptional,
  IsString,
} from 'class-validator';

export class EditDepartmentDTO {
  @IsString({ message: 'name must be a string.' })
  @IsOptional()
  name: string;

  @IsString({ message: 'description must be a string.' })
  @IsOptional()
  description: string;

  @IsOptional()
  cover: string | null;
}