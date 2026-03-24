import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ExerciseCategory, ExerciseType } from '@prisma/client';

@ApiTags('Exercises')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('exercises')
export class ExercisesController {
  constructor(private exercisesService: ExercisesService) {}

  @Get()
  @ApiOperation({ summary: 'Lister tous les exercices (filtrable par catégorie et type)' })
  @ApiQuery({ name: 'category', required: false, enum: ExerciseCategory })
  @ApiQuery({ name: 'type', required: false, enum: ExerciseType })
  @ApiResponse({ status: 200, description: 'Liste des exercices.' })
  findAll(
    @Query('category') category?: ExerciseCategory,
    @Query('type') type?: ExerciseType,
  ) {
    return this.exercisesService.findAll(category, type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un exercice par ID' })
  @ApiResponse({ status: 200, description: 'Exercice trouvé.' })
  @ApiResponse({ status: 404, description: 'Exercice introuvable.' })
  findOne(@Param('id') id: string) {
    return this.exercisesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un exercice' })
  @ApiResponse({ status: 201, description: 'Exercice créé.' })
  create(@Body() dto: CreateExerciseDto) {
    return this.exercisesService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un exercice' })
  @ApiResponse({ status: 200, description: 'Exercice mis à jour.' })
  @ApiResponse({ status: 404, description: 'Exercice introuvable.' })
  update(@Param('id') id: string, @Body() dto: UpdateExerciseDto) {
    return this.exercisesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un exercice' })
  @ApiResponse({ status: 200, description: 'Exercice supprimé.' })
  @ApiResponse({ status: 404, description: 'Exercice introuvable.' })
  remove(@Param('id') id: string) {
    return this.exercisesService.remove(id);
  }
}
