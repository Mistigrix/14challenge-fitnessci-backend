import { Injectable } from '@nestjs/common';
import { prisma } from 'src/utils/prisma';
import { CreateWeightMetricDto } from './dto/create-weight-metric.dto';
import { CreateExerciseLogDto } from './dto/create-exercise-log.dto';

@Injectable()
export class MetricsService {

  addWeight(userId: string, dto: CreateWeightMetricDto) {
    return prisma.userMetric.create({
      data: {
        userId,
        weight: dto.weight,
        date: dto.date ? new Date(dto.date) : undefined,
      },
    });
  }

  getWeightHistory(userId: string) {
    return prisma.userMetric.findMany({
      where: { userId },
      orderBy: { date: 'asc' },
    });
  }

  addExerciseLog(userId: string, dto: CreateExerciseLogDto) {
    return prisma.exerciseLog.create({
      data: {
        userId,
        exerciseId: dto.exerciseId,
        sets: dto.sets,
        reps: dto.reps,
        duration: dto.duration,
        calories: dto.calories,
        date: dto.date ? new Date(dto.date) : undefined,
      },
      include: { exercise: true },
    });
  }

  getExerciseLogs(userId: string, exerciseId?: string) {
    return prisma.exerciseLog.findMany({
      where: {
        userId,
        ...(exerciseId && { exerciseId }),
      },
      include: { exercise: true },
      orderBy: { date: 'desc' },
    });
  }

  // ─── Calendrier ───────────────────────────────────────────────────────────

  async getCalendar(userId: string, from?: string, to?: string) {
    const logs = await prisma.exerciseLog.findMany({
      where: {
        userId,
        date: {
          ...(from && { gte: new Date(from) }),
          ...(to && { lte: new Date(to) }),
        },
      },
      include: { exercise: true },
      orderBy: { date: 'asc' },
    });

    // Regrouper par date
    const calendar: Record<string, typeof logs> = {};
    for (const log of logs) {
      const key = log.date.toISOString().split('T')[0];
      if (!calendar[key]) calendar[key] = [];
      calendar[key].push(log);
    }
    return calendar;
  }
}
