import { Test, TestingModule } from '@nestjs/testing';
import { AnimalsController } from '../animals.controller';
import { AnimalEntity } from '../entities/animal.entity';
import { AnimalsService } from '../animals.service';
import { CreateAnimalDto } from '../dto/create.animal.dto';
import { BadRequestException } from '@nestjs/common';

describe('AnimalsController', () => {
  let animalsController: AnimalsController;
  let animalsService: AnimalsService;
  const mockAnimals: AnimalEntity[] = [
    {
      id: "31ecced3-fe0c-4fc5-b629-9f55c12aa36e",
      name: "Chico",
      description: "branco da cara preta",
      image_url: "https://example.com/images/pug.jpg",
      category: "dog",
      birth: new Date('2022-08-15T00:00:00.000Z'),
      age: 1,
      is_available: false
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      name: "Minskin",
      description: "Ager titulus ventosus vivo decumbo apto aureus.",
      image_url: "https://loremflickr.com/640/480?lock=8778773507866624",
      category: "dog",
      birth: new Date("2018-05-15T00:00:00.000Z"),
      age: 6,
      is_available: true
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      name: "Maine Coon",
      description: "Valde agnitio compello crepusculum somnus vinco desparatus contego cribro.",
      image_url: "https://loremflickr.com/640/480?lock=7828483944218624",
      category: "cat",
      birth: new Date("2015-08-20T00:00:00.000Z"),
      age: 9,
      is_available: false
    }
  ];
  const mockUpdateAnimal: AnimalEntity = {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Maine Coon",
    description: "Valde agnitio compello crepusculum somnus vinco desparatus contego cribro.",
    image_url: "https://loremflickr.com/640/480?lock=7828483944218624",
    category: "cat",
    birth: new Date("2015-08-20T00:00:00.000Z"),
    age: 9,
    is_available: false
  }
  const mockCreateAnimal: CreateAnimalDto = {
    name: "Chico",
    description: "branco da cara preta",
    image_url: "https://example.com/images/pug.jpg",
    category: "dog",
    birth: new Date('2022-08-15T00:00:00.000Z')
  };
  const mockAnimalService = {
    create: jest.fn().mockImplementation((body: CreateAnimalDto) => Promise.resolve({ ...mockCreateAnimal, ...body })),
    findAll: jest.fn().mockImplementation(() => Promise.resolve(mockAnimals)),
    updateStatus: jest.fn().mockImplementation((id: string) => Promise.resolve({ ...mockUpdateAnimal, is_available: false })),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalsController],
      providers: [
        {
          provide: AnimalsService,
          useValue: mockAnimalService,
        },
      ],
    }).compile();
    animalsController = module.get<AnimalsController>(AnimalsController);
    animalsService = module.get<AnimalsService>(AnimalsService);
  });
  it('the object should be defined and ready to use after module initialization', () => {
    expect(animalsController).toBeDefined();
  });
  describe('create', () => {
    it('should create a new register of an animal', async () => {
      const body: CreateAnimalDto = {
        name: "Chico",
        description: "branco da cara preta",
        image_url: "https://example.com/images/pug.jpg",
        category: "pug",
        birth: new Date('2022-08-15T00:00:00.000Z')
      };
      const response = await animalsController.create(body);
      expect(response).toEqual({ ...mockCreateAnimal, ...body });
      expect(animalsService.create).toHaveBeenCalledWith(body);
    });
    it('Should not create an animal if the name is not provided', async () => {
      const body: CreateAnimalDto = {
        name: "",
        description: "branco da cara preta",
        image_url: "https://example.com/images/pug.jpg",
        category: "dog",
        birth: new Date('2022-08-15T00:00:00.000Z')
      };
      const errorEmptyName = {
        statusCode: 400,
        error: 'Bad Request',
        message: [
          'name should not be empty',
        ],
      }
      try {
        await animalsController.create(body);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response).toEqual(errorEmptyName);
      }
    });
    it('Should not create an animal if the category is not provided', async () => {
      const body: CreateAnimalDto = {
        name: "Chico",
        description: "branco da cara preta",
        image_url: "https://example.com/images/pug.jpg",
        category: "",
        birth: new Date('2022-08-15T00:00:00.000Z')
      };
      const errorEmptyCategory = {
        statusCode: 400,
        error: 'Bad Request',
        message: [
          'category should not be empty',
        ],
      }
      try {
        await animalsController.create(body);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response).toEqual(errorEmptyCategory);
      }
    });
  });
  describe('findAll', () => {
    it('should return an array of animals', async () => {
      const response = await animalsController.findAll();
      expect(response).toEqual(mockAnimals);
      expect(animalsService.findAll).toHaveBeenCalled();
    });
  });
  describe('update', () => {
    it('should update the status adoption of an animal', async () => {
      const id = "550e8400-e29b-41d4-a716-446655440001";
      const response = await animalsController.update(id);
      expect(response).toEqual({ ...mockUpdateAnimal, is_available: false });
      expect(animalsService.updateStatus).toHaveBeenCalledWith(id);
    });
  });
});
