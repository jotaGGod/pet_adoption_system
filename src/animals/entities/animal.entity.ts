import { ApiProperty } from '@nestjs/swagger';
/**
 * Represents an animal in the system.
 */
export class AnimalEntity {
  @ApiProperty({
    description: 'The unique identifier of the animal',
    example: '31ecced3-fe0c-4fc5-b629-9f55c12aa36e'
  })
  id: string;

  @ApiProperty({
    description: 'The name of the animal',
    example: 'Chico'
  })
  name: string;

  @ApiProperty({
    description: 'The description of the animal',
    example: 'branco da cara preta'
  })
  description: string;

  @ApiProperty({
    description: 'The URL of the animal\'s image',
    example: 'https://example.com/images/pug.jpg'
  })
  image_url: string;

  @ApiProperty({
    description: 'The category of the animal',
    example: 'dog'
  })
  category: string;

  @ApiProperty({
    description: 'The birth date of the animal',
    example: '2022-08-15T00:00:00.000Z'
  })
  birth: Date;

  @ApiProperty({
    description: 'The age of the animal',
    example: 1
  })
  age: number;

  @ApiProperty({
    description: 'Availability status of the animal',
    example: false
  })
  is_available: boolean;
}
