import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateAnimalDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  image_url: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsDateString()
  birth: Date;
}
