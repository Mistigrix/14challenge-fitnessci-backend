import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExerciseCategory, ExerciseType } from '@prisma/client';

export class CreateExerciseDto {
  @ApiProperty({ example: 'Pompes' })
  @IsString()
  name: string;

  @ApiProperty({ enum: ExerciseCategory, example: ExerciseCategory.CHEST })
  @IsEnum(ExerciseCategory)
  category: ExerciseCategory;

  @ApiProperty({
    enum: ExerciseType,
    example: ExerciseType.REPS,
    description: 'REPS = nombre de répétitions, DURATION = durée en secondes',
  })
  @IsEnum(ExerciseType)
  type: ExerciseType;

  @ApiPropertyOptional({ example: 'Exercice de poussée pour les pectoraux' })
  @IsOptional()
  @IsString()
  description?: string;
}
