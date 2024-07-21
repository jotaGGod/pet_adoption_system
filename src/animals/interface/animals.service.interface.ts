import { CreateAnimalDto } from '../dto/create.animal.dto';
import { AnimalEntity } from '../entities/animal.entity';

export interface IAnimalsService {
  create(animalData: CreateAnimalDto): Promise<CreateAnimalDto>;
  findAll(): Promise<AnimalEntity[]>;
  updateStatus(id: string): Promise<AnimalEntity | null>;
}
