import { IsString } from 'class-validator';

export class UpdateAnimalStatusDto {
  @IsString()
  is_available: string;
}
