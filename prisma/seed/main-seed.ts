import { PrismaClient } from "@prisma/client";
import { executeAnimalsSeed } from './animals-seed';

const prisma = new PrismaClient();

async function main() {
  await executeAnimalsSeed();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
