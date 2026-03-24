import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from 'src/utils/prisma';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsService {

  findAll() {
    return prisma.program.findMany({
      include: { _count: { select: { workouts: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const program = await prisma.program.findUnique({
      where: { id },
      include: { workouts: { orderBy: { order: 'asc' } } },
    });
    if (!program) throw new NotFoundException('Program not found');
    return program;
  }

  create(dto: CreateProgramDto) {
    return prisma.program.create({ data: dto });
  }

  async update(id: string, dto: UpdateProgramDto) {
    await this.findOne(id);
    return prisma.program.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return prisma.program.delete({ where: { id } });
  }

  async getWorkouts(programId: string) {
    await this.findOne(programId);
    return prisma.workout.findMany({
      where: { programId },
      include: { _count: { select: { exercises: true } } },
      orderBy: { order: 'asc' },
    });
  }

  async enrollUser(userId: string, programId: string) {
    await this.findOne(programId);
    return prisma.userProgram.upsert({
      where: { userId_programId: { userId, programId } },
      create: { userId, programId },
      update: { startedAt: new Date() },
    });
  }

  async unenrollUser(userId: string, programId: string) {
    return prisma.userProgram.delete({
      where: { userId_programId: { userId, programId } },
    });
  }
}
