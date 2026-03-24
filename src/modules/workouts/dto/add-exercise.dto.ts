import { IsString, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddExerciseDto {
  @ApiProperty({ example: 'clx1abc2def3ghi4', description: 'ID de l\'exercice' })
  @IsString()
  exerciseId: string;

  @ApiPropertyOptional({ example: 3, description: 'Nombre de séries' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  sets?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Nombre de répétitions (si type REPS)',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  reps?: number;

  @ApiPropertyOptional({
    example: 60,
    description: 'Durée en secondes (si type DURATION)',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  duration?: number;

  @ApiPropertyOptional({ example: 50, description: 'Calories estimées' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  calories?: number;

  @ApiPropertyOptional({ example: 0, description: 'Ordre dans la séance (0-based)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  order?: number;
}
