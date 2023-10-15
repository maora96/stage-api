import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';

  
  export class CreateProcessDTO {
    @IsString({ message: 'name must be a string.' })
    @IsNotEmpty()
    name: string;
  
    @IsString({ message: 'description must be a string.' })
    @IsNotEmpty()
    description: string;

    @IsString({message: "cover must be a string"})
    @IsOptional()
    cover: string | null;

    @IsNotEmpty()
    @IsArray({ message: 'departments must be an array of strings.' })
    departments: string[];
  }