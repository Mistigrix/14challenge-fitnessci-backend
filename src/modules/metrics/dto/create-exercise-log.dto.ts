import { IsString, IsOptional, IsNumber, IsDateString, Min } from 'class-validator';

export class CreateExerciseLogDto {
  @IsString()
  exerciseId: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  sets?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  reps?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  duration?: number; // en secondes

  @IsOptional()
  @IsNumber()
  @Min(0)
  calories?: number;

  @IsOptional()
  @IsDateString()
  date?: string;
}
