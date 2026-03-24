import { IsString, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWorkoutDto {
  @ApiProperty({ example: 'Séance 1 — Haut du corps' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Focus pectoraux et épaules' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'clx1abc2def3ghi4', description: 'ID du programme parent' })
  @IsString()
  programId: string;

  @ApiPropertyOptional({ example: 1, description: 'Position dans le programme (0-based)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  order?: number;
}
