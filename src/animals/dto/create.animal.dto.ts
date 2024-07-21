import { IsString, IsDate } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image_url: string;

  @IsString()
  category: string;

  @IsDate()
  birth: Date;
}
