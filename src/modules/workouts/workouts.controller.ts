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
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { AddExerciseDto } from './dto/add-exercise.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutsService: WorkoutsService) {}

  @Get()
  findAll(@Query('programId') programId?: string) {
    return this.workoutsService.findAll(programId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateWorkoutDto) {
    return this.workoutsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWorkoutDto) {
    return this.workoutsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutsService.remove(id);
  }

  // GET /workouts/:id/exercises — liste des exercices d'une séance
  @Get(':id/exercises')
  getExercises(@Param('id') id: string) {
    return this.workoutsService.getExercises(id);
  }

  // POST /workouts/:id/exercises — ajouter un exercice à une séance
  @Post(':id/exercises')
  addExercise(@Param('id') id: string, @Body() dto: AddExerciseDto) {
    return this.workoutsService.addExercise(id, dto);
  }

  // PATCH /workouts/:id/exercises/:exerciseId — modifier les métriques d'un exercice dans la séance
  @Patch(':id/exercises/:exerciseId')
  updateExercise(
    @Param('id') id: string,
    @Param('exerciseId') exerciseId: string,
    @Body() dto: AddExerciseDto,
  ) {
    return this.workoutsService.updateExercise(id, exerciseId, dto);
  }

  // DELETE /workouts/:id/exercises/:exerciseId — retirer un exercice d'une séance
  @Delete(':id/exercises/:exerciseId')
  removeExercise(@Param('id') id: string, @Param('exerciseId') exerciseId: string) {
    return this.workoutsService.removeExercise(id, exerciseId);
  }
}
