import { Injectable } from '@nestjs/common';
import { prisma } from 'src/utils/prisma';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {

  async getProfile(userId: string) {
    const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
    const { password: _pwd, ...result } = user;
    return result;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...dto,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
      },
    });
    const { password: _pwd, ...result } = user;
    return result;
  }

  async getMyPrograms(userId: string) {
    return prisma.userProgram.findMany({
      where: { userId },
      include: { program: { include: { workouts: true } } },
    });
  }
}
