import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { ProgramsModule } from './modules/programs/programs.module';
import { WorkoutsModule } from './modules/workouts/workouts.module';
import { MetricsModule } from './modules/metrics/metrics.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ExercisesModule,
    ProgramsModule,
    WorkoutsModule,
    MetricsModule,
  ],
})
export class AppModule {}
