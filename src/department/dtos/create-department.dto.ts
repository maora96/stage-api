import {
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';

  
  export class CreateDepartmentDTO {
    @IsString({ message: 'name must be a string.' })
    @IsNotEmpty()
    name: string;
  
    @IsString({ message: 'description must be a string.' })
    @IsNotEmpty()
    description: string;

    @IsString({message: "cover must be a string"})
    @IsOptional()
    cover: string | null;
  }