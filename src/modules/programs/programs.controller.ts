import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('programs')
export class ProgramsController {
  constructor(private programsService: ProgramsService) {}

  @Get()
  findAll() {
    return this.programsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateProgramDto) {
    return this.programsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProgramDto) {
    return this.programsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programsService.remove(id);
  }

  // GET /programs/:id/workouts — liste des séances d'un programme
  @Get(':id/workouts')
  getWorkouts(@Param('id') id: string) {
    return this.programsService.getWorkouts(id);
  }

  // POST /programs/:id/enroll — s'inscrire à un programme
  @Post(':id/enroll')
  enroll(@Param('id') id: string, @Request() req) {
    return this.programsService.enrollUser(req.user.id, id);
  }

  // Delete /programs/:id/enroll — se désinscrire d'un programme
  @Delete(':id/enroll')
  unenroll(@Param('id') id: string, @Request() req) {
    return this.programsService.unenrollUser(req.user.id, id);
  }
}
