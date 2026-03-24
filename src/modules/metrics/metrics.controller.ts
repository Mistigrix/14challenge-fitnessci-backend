import { Controller, Get, Post, Body, Query, UseGuards, Request } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { CreateWeightMetricDto } from './dto/create-weight-metric.dto';
import { CreateExerciseLogDto } from './dto/create-exercise-log.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('metrics')
export class MetricsController {
  constructor(private metricsService: MetricsService) {}

  // ─── Poids ────────────────────────────────────────────────────────────────

  @Post('weight')
  addWeight(@Request() req, @Body() dto: CreateWeightMetricDto) {
    return this.metricsService.addWeight(req.user.id, dto);
  }

  @Get('weight')
  getWeightHistory(@Request() req) {
    return this.metricsService.getWeightHistory(req.user.id);
  }

  // ─── Exercices ────────────────────────────────────────────────────────────

  @Post('exercise-logs')
  addExerciseLog(@Request() req, @Body() dto: CreateExerciseLogDto) {
    return this.metricsService.addExerciseLog(req.user.id, dto);
  }

  @Get('exercise-logs')
  getExerciseLogs(@Request() req, @Query('exerciseId') exerciseId?: string) {
    return this.metricsService.getExerciseLogs(req.user.id, exerciseId);
  }

  // ─── Calendrier ──────────────────────────────────────────────────────────

  @Get('calendar')
  getCalendar(
    @Request() req,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.metricsService.getCalendar(req.user.id, from, to);
  }
}
