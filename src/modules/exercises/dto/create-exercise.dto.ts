import { ExerciseCategory, ExerciseType } from '@prisma/client';
import { IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  name: string;

  @IsEnum(ExerciseCategory)
  category: ExerciseCategory;

  @IsEnum(ExerciseType)
  type: ExerciseType;

  @IsOptional()
  @IsString()
  description?: string;
}
