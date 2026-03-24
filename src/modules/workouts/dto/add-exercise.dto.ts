import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class AddExerciseDto {
  @IsString()
  exerciseId: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  sets?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  reps?: number; // si type REPS

  @IsOptional()
  @IsNumber()
  @Min(1)
  duration?: number; // en secondes, si type DURATION

  @IsOptional()
  @IsNumber()
  @Min(0)
  calories?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  order?: number;
}
