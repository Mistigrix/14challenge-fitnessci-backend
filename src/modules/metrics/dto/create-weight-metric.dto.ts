import { IsNumber, IsOptional, IsDateString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWeightMetricDto {
  @ApiProperty({ example: 74.5, description: 'Poids en kg' })
  @IsNumber()
  @Min(0)
  weight: number;

  @ApiPropertyOptional({ example: '2026-03-24', description: 'Date de la mesure (ISO 8601), défaut = maintenant' })
  @IsOptional()
  @IsDateString()
  date?: string;
}
