import { Difficulty } from '@prisma/client';
import { IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;
}
