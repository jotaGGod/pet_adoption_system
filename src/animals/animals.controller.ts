import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create.animal.dto';
import { AnimalEntity } from './entities/animal.entity';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateAnimalDto): Promise<CreateAnimalDto>{
    return this.animalsService.create(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<AnimalEntity[]> {
    return this.animalsService.findAll();
  }

  @Put('/update-status/:id')
  @HttpCode(HttpStatus.OK)
  async updateStatus(@Param('id') id: string): Promise<AnimalEntity | null> {
    return this.animalsService.updateStatus(id);
  }
}
