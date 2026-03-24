import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { AddExerciseDto } from './dto/add-exercise.dto';
import { prisma } from 'src/utils/prisma';

@Injectable()
export class WorkoutsService {

  findAll(programId?: string) {
    return prisma.workout.findMany({
      where: programId ? { programId } : undefined,
      include: { _count: { select: { exercises: true } } },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const workout = await prisma.workout.findUnique({
      where: { id },
      include: {
        exercises: {
          include: { exercise: true },
          orderBy: { order: 'asc' },
        },
      },
    });
    if (!workout) throw new NotFoundException('Workout not found');
    return workout;
  }

  create(dto: CreateWorkoutDto) {
    return prisma.workout.create({ data: dto });
  }

  async update(id: string, dto: UpdateWorkoutDto) {
    await this.findOne(id);
    return prisma.workout.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return prisma.workout.delete({ where: { id } });
  }

  async getExercises(workoutId: string) {
    await this.findOne(workoutId);
    return prisma.workoutExercise.findMany({
      where: { workoutId },
      include: { exercise: true },
      orderBy: { order: 'asc' },
    });
  }

  async addExercise(workoutId: string, dto: AddExerciseDto) {
    await this.findOne(workoutId);
    return prisma.workoutExercise.create({
      data: {
        workoutId,
        exerciseId: dto.exerciseId,
        sets: dto.sets,
        reps: dto.reps,
        duration: dto.duration,
        calories: dto.calories,
        order: dto.order ?? 0,
      },
      include: { exercise: true },
    });
  }

  async updateExercise(workoutId: string, exerciseId: string, dto: Partial<AddExerciseDto>) {
    return prisma.workoutExercise.update({
      where: { workoutId_exerciseId: { workoutId, exerciseId } },
      data: {
        sets: dto.sets,
        reps: dto.reps,
        duration: dto.duration,
        calories: dto.calories,
        order: dto.order,
      },
      include: { exercise: true },
    });
  }

  async removeExercise(workoutId: string, exerciseId: string) {
    return prisma.workoutExercise.delete({
      where: { workoutId_exerciseId: { workoutId, exerciseId } },
    });
  }
}
