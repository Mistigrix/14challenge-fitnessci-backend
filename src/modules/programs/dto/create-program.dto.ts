import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Difficulty } from '@prisma/client';

export class CreateProgramDto {
  @ApiProperty({ example: 'Programme Full Body 8 semaines' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Programme complet pour débutants sur 8 semaines' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: Difficulty, default: Difficulty.BEGINNER })
  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;
}
