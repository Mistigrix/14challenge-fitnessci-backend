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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Programs')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('programs')
export class ProgramsController {
  constructor(private programsService: ProgramsService) {}

  @Get()
  @ApiOperation({ summary: 'Lister tous les programmes' })
  @ApiResponse({ status: 200, description: 'Liste des programmes.' })
  findAll() {
    return this.programsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un programme avec ses séances' })
  @ApiResponse({ status: 200, description: 'Programme trouvé.' })
  @ApiResponse({ status: 404, description: 'Programme introuvable.' })
  findOne(@Param('id') id: string) {
    return this.programsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un programme' })
  @ApiResponse({ status: 201, description: 'Programme créé.' })
  create(@Body() dto: CreateProgramDto) {
    return this.programsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un programme' })
  @ApiResponse({ status: 200, description: 'Programme mis à jour.' })
  @ApiResponse({ status: 404, description: 'Programme introuvable.' })
  update(@Param('id') id: string, @Body() dto: UpdateProgramDto) {
    return this.programsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un programme' })
  @ApiResponse({ status: 200, description: 'Programme supprimé.' })
  @ApiResponse({ status: 404, description: 'Programme introuvable.' })
  remove(@Param('id') id: string) {
    return this.programsService.remove(id);
  }

  @Get(':id/workouts')
  @ApiOperation({ summary: 'Lister les séances d\'un programme (ordonnées)' })
  @ApiResponse({ status: 200, description: 'Liste des séances.' })
  @ApiResponse({ status: 404, description: 'Programme introuvable.' })
  getWorkouts(@Param('id') id: string) {
    return this.programsService.getWorkouts(id);
  }

  @Post(':id/enroll')
  @ApiOperation({ summary: 'S\'inscrire à un programme' })
  @ApiResponse({ status: 201, description: 'Inscription enregistrée.' })
  enroll(@Param('id') id: string, @Request() req) {
    return this.programsService.enrollUser(req.user.id, id);
  }

  @Delete(':id/enroll')
  @ApiOperation({ summary: 'Se désinscrire d\'un programme' })
  @ApiResponse({ status: 200, description: 'Désinscription effectuée.' })
  unenroll(@Param('id') id: string, @Request() req) {
    return this.programsService.unenrollUser(req.user.id, id);
  }
}
