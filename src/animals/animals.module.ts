import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [AnimalsController],
  providers: [AnimalsService, PrismaService],
})
export class AnimalsModule {}
