import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDTO } from './dtos/create-department.dto';
import { EditDepartmentDTO } from './dtos/edit-department.dto';

@Controller('department')
export class DepartmentController {

    constructor(private departmentService: DepartmentService) { }

    @Get('/:id')
    async getOne(@Param('id') id: string) {
        const content = await this.departmentService.getOne(id);
        return { result: content };
    }

    @Get()
    async getMany() {
        const content = await this.departmentService.getMany();
        return { result: content };
    }

    @Post()
    async create(@Body() body: CreateDepartmentDTO) {
        const content = await this.departmentService.create(body);

        return { result: content };
    }

    @Patch(':id')
    async edit(@Param('id') id: string, @Body() body: EditDepartmentDTO) {
        const content = await this.departmentService.edit(id, body);

        return { result: content };
    }

    
    @Delete(':id')
    async delete(@Param('id') id: string) {
        const content = await this.departmentService.delete(id);

        return { result: content };
    }
}
