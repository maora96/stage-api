import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ProcessService } from './process.service';
import { EditProcessDTO } from './dtos/edit-process.dto';
import { CreateProcessDTO } from './dtos/create-process.dto';
import { EditProcessesDTO } from './dtos/edit-processes.dto';

@Controller('process')
export class ProcessController {
    constructor(private processService: ProcessService) { }
    

    @Get('/:id')
    async getOne(@Param('id') id: string) {
        const content = await this.processService.getOne(id);
        return { result: content };
    }

    @Get()
    async getMany() {
        const content = await this.processService.getMany();
        return { result: content };
    }

    @Post()
    async create(@Body() body: CreateProcessDTO) {
        const content = await this.processService.create(body);

        return { result: content };
    }

    @Patch(':id')
    async edit(@Param('id') id: string, @Body() body: EditProcessDTO) {
        const content = await this.processService.edit(id, body);

        return { result: content };
    }

    @Patch('/subprocesses/:id')
    async editSubprocesses(@Param('id') id: string, @Body() body: EditProcessesDTO) {
        const { processesIds } = body;
        const content = await this.processService.editProcesses(id, processesIds);

        return content;
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const content = await this.processService.delete(id);

        return { result: content };
    }
}
