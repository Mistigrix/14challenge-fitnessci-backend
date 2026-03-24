import { IsNumber, IsOptional, IsDateString, Min } from 'class-validator';

export class CreateWeightMetricDto {
  @IsNumber()
  @Min(0)
  weight: number; // kg

  @IsOptional()
  @IsDateString()
  date?: string;
}
