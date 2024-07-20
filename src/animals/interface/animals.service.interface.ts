import { CreateAnimalDto } from '../dto/create.animal.dto';
import { AnimalEntity } from '../entities/animal.entity';
import { UpdateAnimalStatusDto } from '../dto/update.animal.status.dto';

export interface IAnimalsService {
  create(animalData: CreateAnimalDto): Promise<CreateAnimalDto>;
  findAll(): Promise<AnimalEntity[]>;
  findByName(id: string): Promise<AnimalEntity[] | null>;
  updateStatus(id: string): Promise<AnimalEntity | null>;
}