import { IsString, IsOptional, IsNumber, IsDateString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExerciseLogDto {
  @ApiProperty({ example: 'clx1abc2def3ghi4', description: 'ID de l\'exercice réalisé' })
  @IsString()
  exerciseId: string;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  sets?: number;

  @ApiPropertyOptional({ example: 12, description: 'Répétitions réalisées (type REPS)' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  reps?: number;

  @ApiPropertyOptional({ example: 60, description: 'Durée réalisée en secondes (type DURATION)' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  duration?: number;

  @ApiPropertyOptional({ example: 45 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  calories?: number;

  @ApiPropertyOptional({ example: '2026-03-24', description: 'Date de la séance, défaut = maintenant' })
  @IsOptional()
  @IsDateString()
  date?: string;
}
