import { IsOptional, IsString, IsNumber, IsDateString, Min } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  height?: number; // cm

  @IsOptional()
  @IsNumber()
  @Min(0)
  weight?: number; // kg

  @IsOptional()
  @IsDateString()
  birthDate?: string;
}
