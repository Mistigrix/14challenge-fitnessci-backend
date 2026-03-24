import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from 'src/utils/prisma';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ExerciseCategory, ExerciseType } from '@prisma/client';

@Injectable()
export class ExercisesService {

  findAll(category?: ExerciseCategory, type?: ExerciseType) {
    return prisma.exercise.findMany({
      where: {
        ...(category && { category }),
        ...(type && { type }),
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const exercise = await prisma.exercise.findUnique({ where: { id } });
    if (!exercise) throw new NotFoundException('Exercise not found');
    return exercise;
  }

  create(dto: CreateExerciseDto) {
    return prisma.exercise.create({ data: dto });
  }

  async update(id: string, dto: UpdateExerciseDto) {
    await this.findOne(id);
    return prisma.exercise.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return prisma.exercise.delete({ where: { id } });
  }
}
