import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateAnimalDto } from './dto/create.animal.dto';
import { IAnimalsService } from './interface/animals.service.interface';
import { AnimalEntity } from './entities/animal.entity';

@Injectable()
export class AnimalsService implements IAnimalsService{
  constructor(private prisma: PrismaService) {}
  private calculateAge(birth: Date): number {
    const today = new Date();
    const birthDate = new Date(birth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }
  async create(animalData: CreateAnimalDto): Promise<CreateAnimalDto>{
    try {
      const { name, description, image_url, category, birth } = animalData;
      const age = this.calculateAge(birth);
      return this.prisma.animals.create({
        data: {
          name,
          description,
          image_url,
          category,
          birth,
          age
        }
      });
    }catch (error) {
      throw new InternalServerErrorException('Error while creating an animal register');
    }
  }
  async findAll(): Promise<AnimalEntity[]> {
    return this.prisma.animals.findMany();
  }
  async findByName(name: string): Promise<AnimalEntity[] | null> {
    try {
      return this.prisma.animals.findMany({
        where: { name },
      });
    }catch (error){
      throw new NotFoundException('No animal found');
    }

  }
  async updateStatus(id: string): Promise<AnimalEntity | null> {
    try {
      return this.prisma.animals.update({
        where: { id },
        data: { is_available: false },
      });
    }catch (error){
      throw new NotFoundException('No animal found');
    }
  }
}
