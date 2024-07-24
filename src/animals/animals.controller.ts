import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create.animal.dto';
import { AnimalEntity } from './entities/animal.entity';

@ApiTags('animals')
@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}
  /**
   * Creates a new animal.
   * @param body - The details of the animal to be created.
   * @returns The created animal.
   */
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateAnimalDto })
  @ApiResponse({ status: 201, description: 'The animal has been successfully created.', type: CreateAnimalDto })
  @ApiResponse({ status: 400, description: 'Bad Request: Invalid input data' })
  async create(@Body() body: CreateAnimalDto): Promise<CreateAnimalDto> {
    return this.animalsService.create(body);
  }
  /**
   * Retrieves all animals.
   * @returns An array of all animals.
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Retrieved all animals.', type: [AnimalEntity] })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Failed to retrieve animals' })
  async findAll(): Promise<AnimalEntity[]> {
    return this.animalsService.findAll();
  }
  /**
   * Updates the availability status of an animal.
   * @param id - The ID of the animal to update.
   * @returns The updated animal, or null if not found.
   */
  @Put('/update-status/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, description: 'ID of the animal to update' })
  @ApiResponse({ status: 200, description: 'The animal status has been updated.', type: AnimalEntity })
  @ApiResponse({ status: 404, description: 'Animal not found' })
  async updateStatus(@Param('id') id: string): Promise<AnimalEntity | null> {
    return this.animalsService.updateStatus(id);
  }
}
