import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

export async function executeAnimalsSeed() {
  await prisma.animals.createMany({
    data: [
      {
        id: "550e8400-e29b-41d4-a716-446655440000",
        name: faker.animal.cat(),
        description: faker.lorem.sentence(),
        image_url: faker.image.url(),
        category: "dog",
        birth: new Date('2018-05-15T00:00:00Z'),
        age: 6,
        is_available: "available"
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440001",
        name: faker.animal.cat(),
        description: faker.lorem.sentence(),
        image_url: faker.image.url(),
        category: "cat",
        birth: new Date('2015-08-20T00:00:00Z'),
        age: 9,
        is_available: "adopted"
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        name: faker.animal.cat(),
        description: faker.lorem.sentence(),
        image_url: faker.image.url(),
        category: "cat",
        birth: new Date('2019-11-25T00:00:00Z'),
        age: 4,
        is_available: "adopted"
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440003",
        name: faker.animal.cat(),
        description: faker.lorem.sentence(),
        image_url: faker.image.url(),
        category: "cat",
        birth: new Date('2016-02-10T00:00:00Z'),
        age: 8,
        is_available: "available"
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440004",
        name: faker.animal.cat(),
        description: faker.lorem.sentence(),
        image_url: faker.image.url(),
        category: "dog",
        birth: new Date('2020-07-30T00:00:00Z'),
        age: 3,
        is_available: "adopted"
      }
    ],
  });
}
