import { Controller, Get, Post, Body, Query, UseGuards, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { MetricsService } from './metrics.service';
import { CreateWeightMetricDto } from './dto/create-weight-metric.dto';
import { CreateExerciseLogDto } from './dto/create-exercise-log.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Metrics')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('metrics')
export class MetricsController {
  constructor(private metricsService: MetricsService) {}

  @Post('weight')
  @ApiOperation({ summary: 'Enregistrer une mesure de poids' })
  @ApiResponse({ status: 201, description: 'Mesure enregistrée.' })
  addWeight(@Request() req, @Body() dto: CreateWeightMetricDto) {
    return this.metricsService.addWeight(req.user.id, dto);
  }

  @Get('weight')
  @ApiOperation({ summary: 'Historique du poids de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Historique trié par date.' })
  getWeightHistory(@Request() req) {
    return this.metricsService.getWeightHistory(req.user.id);
  }

  @Post('exercise-logs')
  @ApiOperation({ summary: 'Logger une performance d\'exercice' })
  @ApiResponse({ status: 201, description: 'Log enregistré.' })
  addExerciseLog(@Request() req, @Body() dto: CreateExerciseLogDto) {
    return this.metricsService.addExerciseLog(req.user.id, dto);
  }

  @Get('exercise-logs')
  @ApiOperation({ summary: 'Historique des performances (filtrable par exercice)' })
  @ApiQuery({ name: 'exerciseId', required: false, description: 'Filtrer par exercice' })
  @ApiResponse({ status: 200, description: 'Historique des logs.' })
  getExerciseLogs(@Request() req, @Query('exerciseId') exerciseId?: string) {
    return this.metricsService.getExerciseLogs(req.user.id, exerciseId);
  }

  @Get('calendar')
  @ApiOperation({
    summary: 'Calendrier des séances réalisées',
    description: 'Retourne les logs groupés par date (YYYY-MM-DD). Filtrable avec `from` et `to`.',
  })
  @ApiQuery({ name: 'from', required: false, example: '2026-03-01', description: 'Date de début (ISO 8601)' })
  @ApiQuery({ name: 'to', required: false, example: '2026-03-31', description: 'Date de fin (ISO 8601)' })
  @ApiResponse({ status: 200, description: 'Objet { "2026-03-24": [...logs] }' })
  getCalendar(
    @Request() req,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.metricsService.getCalendar(req.user.id, from, to);
  }
}
