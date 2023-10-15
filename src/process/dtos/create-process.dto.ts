import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';

  
  export class CreateProcessDTO {
    @IsString({ message: 'name must be a string.' })
    @IsNotEmpty()
    name: string;
  
    @IsString({ message: 'description must be a string.' })
    @IsNotEmpty()
    description: string;

    cover: string | null;
  }