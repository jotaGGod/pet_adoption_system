import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

/**
 * Data Transfer Object for creating an animal.
 */
export class CreateAnimalDto {
  @ApiProperty({ description: 'Name of the animal', example: 'Chico' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({ description: 'Description of the animal', example: 'branco da cara preta' })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({ description: 'Image URL of the animal', example: 'https://example.com/images/pug.jpg' })
  @IsNotEmpty({ message: 'Image URL is required' })
  @IsString({ message: 'Image URL must be a string' })
  image_url: string;

  @ApiProperty({ description: 'Category of the animal', example: 'dog' })
  @IsNotEmpty({ message: 'Category is required' })
  @IsString({ message: 'Category must be a string' })
  category: string;

  @ApiProperty({ description: 'Birth date of the animal', example: '2022-08-15T00:00:00.000Z' })
  @IsNotEmpty({ message: 'Birth date is required' })
  @IsDateString({}, { message: 'Birth date must be a valid date' })
  birth: Date;
}
