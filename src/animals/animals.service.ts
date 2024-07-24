import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateAnimalDto } from './dto/create.animal.dto';
import { IAnimalsService } from './interface/animals.service.interface';
import { AnimalEntity } from './entities/animal.entity';

/**
 * Service for managing animals.
 */
@Injectable()
export class AnimalsService implements IAnimalsService {
  constructor(private prisma: PrismaService) {}
  /**
   * Calculates the age of the animal based on its birth date.
   * @param birth - The birth date of the animal.
   * @returns The age of the animal in years.
   */
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
  /**
   * Creates a new animal record in the database.
   * @param body - The details of the animal to be created.
   * @returns The created animal record.
   * @throws InternalServerErrorException if there is an error during creation.
   */
  async create(body: CreateAnimalDto): Promise<CreateAnimalDto> {
    try {
      const { name, description, image_url, category, birth } = body;
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
    } catch (error) {
      throw new InternalServerErrorException('Error while creating an animal register');
    }
  }
  /**
   * Retrieves all animal records from the database.
   * @returns An array of all animals.
   */
  async findAll(): Promise<AnimalEntity[]> {
    return this.prisma.animals.findMany();
  }
  /**
   * Updates the availability status of an animal by its ID.
   * @param id - The ID of the animal to update.
   * @returns The updated animal record, or null if not found.
   * @throws NotFoundException if the animal is not found.
   */
  async updateStatus(id: string): Promise<AnimalEntity | null> {
    try {
      return this.prisma.animals.update({
        where: { id },
        data: { is_available: false },
      });
    } catch (error) {
      throw new NotFoundException('Animal not found');
    }
  }
}
