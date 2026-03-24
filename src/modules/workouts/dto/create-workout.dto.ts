import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateWorkoutDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  programId: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  order?: number;
}
