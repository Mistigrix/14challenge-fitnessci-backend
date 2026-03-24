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
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { AddExerciseDto } from './dto/add-exercise.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Workouts')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutsService: WorkoutsService) {}

  @Get()
  @ApiOperation({ summary: 'Lister les séances (filtrable par programId)' })
  @ApiQuery({ name: 'programId', required: false, description: 'Filtrer par programme' })
  @ApiResponse({ status: 200, description: 'Liste des séances.' })
  findAll(@Query('programId') programId?: string) {
    return this.workoutsService.findAll(programId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une séance avec ses exercices' })
  @ApiResponse({ status: 200, description: 'Séance trouvée.' })
  @ApiResponse({ status: 404, description: 'Séance introuvable.' })
  findOne(@Param('id') id: string) {
    return this.workoutsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une séance dans un programme' })
  @ApiResponse({ status: 201, description: 'Séance créée.' })
  create(@Body() dto: CreateWorkoutDto) {
    return this.workoutsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier une séance' })
  @ApiResponse({ status: 200, description: 'Séance mise à jour.' })
  @ApiResponse({ status: 404, description: 'Séance introuvable.' })
  update(@Param('id') id: string, @Body() dto: UpdateWorkoutDto) {
    return this.workoutsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une séance' })
  @ApiResponse({ status: 200, description: 'Séance supprimée.' })
  @ApiResponse({ status: 404, description: 'Séance introuvable.' })
  remove(@Param('id') id: string) {
    return this.workoutsService.remove(id);
  }

  @Get(':id/exercises')
  @ApiOperation({ summary: 'Lister les exercices d\'une séance (avec métriques spécifiques)' })
  @ApiResponse({ status: 200, description: 'Liste des exercices de la séance.' })
  @ApiResponse({ status: 404, description: 'Séance introuvable.' })
  getExercises(@Param('id') id: string) {
    return this.workoutsService.getExercises(id);
  }

  @Post(':id/exercises')
  @ApiOperation({
    summary: 'Ajouter un exercice à une séance',
    description:
      'Associe un exercice à la séance avec ses métriques propres (reps/durée/calories variables selon la séance).',
  })
  @ApiResponse({ status: 201, description: 'Exercice ajouté à la séance.' })
  @ApiResponse({ status: 404, description: 'Séance introuvable.' })
  addExercise(@Param('id') id: string, @Body() dto: AddExerciseDto) {
    return this.workoutsService.addExercise(id, dto);
  }

  @Patch(':id/exercises/:exerciseId')
  @ApiOperation({ summary: 'Modifier les métriques d\'un exercice dans une séance (reps, durée, calories…)' })
  @ApiResponse({ status: 200, description: 'Métriques mises à jour.' })
  updateExercise(
    @Param('id') id: string,
    @Param('exerciseId') exerciseId: string,
    @Body() dto: AddExerciseDto,
  ) {
    return this.workoutsService.updateExercise(id, exerciseId, dto);
  }

  @Delete(':id/exercises/:exerciseId')
  @ApiOperation({ summary: 'Retirer un exercice d\'une séance' })
  @ApiResponse({ status: 200, description: 'Exercice retiré de la séance.' })
  removeExercise(@Param('id') id: string, @Param('exerciseId') exerciseId: string) {
    return this.workoutsService.removeExercise(id, exerciseId);
  }
}
