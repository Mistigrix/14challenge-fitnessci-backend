import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Difficulty, ExerciseCategory, ExerciseType, PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
// ─── Données exercices ────────────────────────────────────────────────────────

const EXERCISES = [
  // Poitrine
  { name: 'Pompes', category: ExerciseCategory.CHEST, type: ExerciseType.REPS, description: 'Exercice au poids du corps ciblant les pectoraux, triceps et épaules.' },
  { name: 'Pompes diamant', category: ExerciseCategory.CHEST, type: ExerciseType.REPS, description: 'Variante des pompes avec les mains en diamant, focus triceps.' },
  { name: 'Pompes déclinées', category: ExerciseCategory.CHEST, type: ExerciseType.REPS, description: 'Pieds surélevés, cible les pectoraux supérieurs.' },
  { name: 'Développé couché', category: ExerciseCategory.CHEST, type: ExerciseType.REPS, description: 'Exercice de force avec haltères ou barre pour les pectoraux.' },

  // Dos
  { name: 'Tractions', category: ExerciseCategory.BACK, type: ExerciseType.REPS, description: 'Exercice au poids du corps pour le dos et les biceps.' },
  { name: 'Rowing haltères', category: ExerciseCategory.BACK, type: ExerciseType.REPS, description: 'Tirage horizontal unilatéral pour les dorsaux et rhomboïdes.' },
  { name: 'Superman', category: ExerciseCategory.BACK, type: ExerciseType.REPS, description: 'Renforcement des érecteurs du rachis au sol.' },

  // Épaules
  { name: 'Élévations latérales', category: ExerciseCategory.SHOULDERS, type: ExerciseType.REPS, description: 'Isolation des deltoïdes latéraux avec haltères.' },
  { name: 'Développé militaire', category: ExerciseCategory.SHOULDERS, type: ExerciseType.REPS, description: 'Presse verticale pour les épaules et triceps.' },
  { name: 'Élévations frontales', category: ExerciseCategory.SHOULDERS, type: ExerciseType.REPS, description: 'Isolation des deltoïdes antérieurs.' },

  // Bras
  { name: 'Curl biceps', category: ExerciseCategory.ARMS, type: ExerciseType.REPS, description: 'Flexion du coude pour développer les biceps.' },
  { name: 'Dips triceps', category: ExerciseCategory.ARMS, type: ExerciseType.REPS, description: 'Extension du coude sur une chaise ou barre parallèle.' },

  // Jambes
  { name: 'Squats', category: ExerciseCategory.LEGS, type: ExerciseType.REPS, description: 'Exercice de base pour les quadriceps, fessiers et ischio-jambiers.' },
  { name: 'Fentes avant', category: ExerciseCategory.LEGS, type: ExerciseType.REPS, description: 'Travail unilatéral des jambes et de l\'équilibre.' },
  { name: 'Pont fessier', category: ExerciseCategory.LEGS, type: ExerciseType.REPS, description: 'Isolation des fessiers et ischio-jambiers au sol.' },
  { name: 'Mollets debout', category: ExerciseCategory.LEGS, type: ExerciseType.REPS, description: 'Renforcement des mollets (gastrocnémiens et soléaires).' },

  // Abdominaux
  { name: 'Planche', category: ExerciseCategory.ABS, type: ExerciseType.DURATION, description: 'Gainage isométrique complet du tronc.' },
  { name: 'Crunchs', category: ExerciseCategory.ABS, type: ExerciseType.REPS, description: 'Flexion du rachis pour cibler les abdominaux.' },
  { name: 'Mountain climbers', category: ExerciseCategory.ABS, type: ExerciseType.DURATION, description: 'Exercice cardio-gainage combinant abdominaux et cardio.' },
  { name: 'Gainage latéral', category: ExerciseCategory.ABS, type: ExerciseType.DURATION, description: 'Gainage oblique isométrique.' },

  // Cardio
  { name: 'Burpees', category: ExerciseCategory.CARDIO, type: ExerciseType.REPS, description: 'Exercice full body explosif à haute intensité.' },
  { name: 'Jumping jacks', category: ExerciseCategory.CARDIO, type: ExerciseType.DURATION, description: 'Échauffement cardio classique.' },
  { name: 'Corde à sauter', category: ExerciseCategory.CARDIO, type: ExerciseType.DURATION, description: 'Cardio à haute intensité améliorant la coordination.' },
];

// ─── Programme 1 : Full Body Débutant ─────────────────────────────────────────
//  4 séances avec surcharge progressive (reps et durée augmentent)

function buildFullBodyProgram(exerciseMap: Record<string, string>) {
  return {
    name: 'Full Body Débutant',
    description: '4 séances progressives en full body pour les débutants. Idéal pour construire une base solide en force et endurance.',
    difficulty: Difficulty.BEGINNER,
    workouts: [
      {
        name: 'Séance 1 — Découverte',
        description: 'Introduction aux mouvements fondamentaux à intensité modérée.',
        order: 0,
        exercises: [
          { id: exerciseMap['Pompes'],           sets: 3, reps: 10,  calories: 30 },
          { id: exerciseMap['Squats'],           sets: 3, reps: 12,  calories: 35 },
          { id: exerciseMap['Fentes avant'],     sets: 3, reps: 8,   calories: 25 },
          { id: exerciseMap['Planche'],          sets: 3, duration: 20, calories: 15 },
          { id: exerciseMap['Crunchs'],          sets: 3, reps: 15,  calories: 20 },
          { id: exerciseMap['Pont fessier'],     sets: 3, reps: 12,  calories: 20 },
        ],
      },
      {
        name: 'Séance 2 — Consolidation',
        description: 'Augmentation légère du volume.',
        order: 1,
        exercises: [
          { id: exerciseMap['Pompes'],           sets: 3, reps: 13,  calories: 35 },
          { id: exerciseMap['Squats'],           sets: 3, reps: 15,  calories: 40 },
          { id: exerciseMap['Fentes avant'],     sets: 3, reps: 10,  calories: 30 },
          { id: exerciseMap['Planche'],          sets: 3, duration: 30, calories: 18 },
          { id: exerciseMap['Crunchs'],          sets: 3, reps: 18,  calories: 22 },
          { id: exerciseMap['Pont fessier'],     sets: 3, reps: 15,  calories: 22 },
          { id: exerciseMap['Dips triceps'],     sets: 3, reps: 8,   calories: 20 },
        ],
      },
      {
        name: 'Séance 3 — Progression',
        description: 'Volume et intensité en hausse.',
        order: 2,
        exercises: [
          { id: exerciseMap['Pompes'],           sets: 4, reps: 15,  calories: 45 },
          { id: exerciseMap['Pompes diamant'],   sets: 3, reps: 8,   calories: 25 },
          { id: exerciseMap['Squats'],           sets: 4, reps: 18,  calories: 50 },
          { id: exerciseMap['Fentes avant'],     sets: 3, reps: 12,  calories: 35 },
          { id: exerciseMap['Planche'],          sets: 3, duration: 40, calories: 20 },
          { id: exerciseMap['Gainage latéral'],  sets: 2, duration: 30, calories: 12 },
          { id: exerciseMap['Crunchs'],          sets: 3, reps: 20,  calories: 25 },
          { id: exerciseMap['Pont fessier'],     sets: 3, reps: 18,  calories: 25 },
        ],
      },
      {
        name: 'Séance 4 — Performance',
        description: 'Séance finale à haute intensité pour mesurer la progression.',
        order: 3,
        exercises: [
          { id: exerciseMap['Pompes'],           sets: 4, reps: 20,  calories: 55 },
          { id: exerciseMap['Pompes diamant'],   sets: 3, reps: 12,  calories: 30 },
          { id: exerciseMap['Squats'],           sets: 4, reps: 20,  calories: 60 },
          { id: exerciseMap['Fentes avant'],     sets: 4, reps: 14,  calories: 40 },
          { id: exerciseMap['Planche'],          sets: 3, duration: 60, calories: 25 },
          { id: exerciseMap['Gainage latéral'],  sets: 2, duration: 45, calories: 15 },
          { id: exerciseMap['Crunchs'],          sets: 4, reps: 25,  calories: 30 },
          { id: exerciseMap['Pont fessier'],     sets: 4, reps: 20,  calories: 28 },
          { id: exerciseMap['Burpees'],          sets: 3, reps: 10,  calories: 60 },
        ],
      },
    ],
  };
}

// ─── Programme 2 : PPL Intermédiaire ──────────────────────────────────────────
//  6 séances (Push / Pull / Legs × 2 cycles avec surcharge progressive)

function buildPPLProgram(exerciseMap: Record<string, string>) {
  return {
    name: 'PPL Intermédiaire',
    description: 'Programme Push Pull Legs sur 2 cycles de 3 séances. Structure efficace pour développer la force et l\'hypertrophie.',
    difficulty: Difficulty.INTERMEDIATE,
    workouts: [
      {
        name: 'Séance 1 — Push A',
        description: 'Poitrine, épaules et triceps — cycle 1.',
        order: 0,
        exercises: [
          { id: exerciseMap['Développé couché'],     sets: 4, reps: 10, calories: 55 },
          { id: exerciseMap['Pompes déclinées'],     sets: 3, reps: 12, calories: 35 },
          { id: exerciseMap['Développé militaire'],  sets: 3, reps: 10, calories: 40 },
          { id: exerciseMap['Élévations latérales'], sets: 3, reps: 12, calories: 25 },
          { id: exerciseMap['Dips triceps'],         sets: 3, reps: 10, calories: 30 },
          { id: exerciseMap['Pompes diamant'],       sets: 3, reps: 10, calories: 28 },
        ],
      },
      {
        name: 'Séance 2 — Pull A',
        description: 'Dos et biceps — cycle 1.',
        order: 1,
        exercises: [
          { id: exerciseMap['Tractions'],            sets: 4, reps: 6,  calories: 50 },
          { id: exerciseMap['Rowing haltères'],      sets: 4, reps: 10, calories: 45 },
          { id: exerciseMap['Superman'],             sets: 3, reps: 15, calories: 20 },
          { id: exerciseMap['Curl biceps'],          sets: 3, reps: 12, calories: 25 },
          { id: exerciseMap['Élévations frontales'], sets: 3, reps: 12, calories: 22 },
        ],
      },
      {
        name: 'Séance 3 — Legs A',
        description: 'Jambes et abdominaux — cycle 1.',
        order: 2,
        exercises: [
          { id: exerciseMap['Squats'],           sets: 4, reps: 12, calories: 65 },
          { id: exerciseMap['Fentes avant'],     sets: 3, reps: 10, calories: 40 },
          { id: exerciseMap['Pont fessier'],     sets: 4, reps: 15, calories: 35 },
          { id: exerciseMap['Mollets debout'],   sets: 4, reps: 20, calories: 25 },
          { id: exerciseMap['Planche'],          sets: 3, duration: 45, calories: 20 },
          { id: exerciseMap['Mountain climbers'],sets: 3, duration: 30, calories: 30 },
        ],
      },
      {
        name: 'Séance 4 — Push B',
        description: 'Poitrine, épaules et triceps — cycle 2 (surcharge progressive).',
        order: 3,
        exercises: [
          { id: exerciseMap['Développé couché'],     sets: 4, reps: 12, calories: 62 },
          { id: exerciseMap['Pompes déclinées'],     sets: 4, reps: 15, calories: 42 },
          { id: exerciseMap['Développé militaire'],  sets: 4, reps: 12, calories: 48 },
          { id: exerciseMap['Élévations latérales'], sets: 4, reps: 15, calories: 30 },
          { id: exerciseMap['Dips triceps'],         sets: 4, reps: 12, calories: 35 },
          { id: exerciseMap['Pompes diamant'],       sets: 3, reps: 15, calories: 35 },
        ],
      },
      {
        name: 'Séance 5 — Pull B',
        description: 'Dos et biceps — cycle 2 (surcharge progressive).',
        order: 4,
        exercises: [
          { id: exerciseMap['Tractions'],            sets: 4, reps: 8,  calories: 60 },
          { id: exerciseMap['Rowing haltères'],      sets: 4, reps: 12, calories: 52 },
          { id: exerciseMap['Superman'],             sets: 3, reps: 18, calories: 24 },
          { id: exerciseMap['Curl biceps'],          sets: 4, reps: 15, calories: 30 },
          { id: exerciseMap['Élévations frontales'], sets: 3, reps: 15, calories: 26 },
        ],
      },
      {
        name: 'Séance 6 — Legs B',
        description: 'Jambes et abdominaux — cycle 2 (surcharge progressive).',
        order: 5,
        exercises: [
          { id: exerciseMap['Squats'],           sets: 5, reps: 15, calories: 80 },
          { id: exerciseMap['Fentes avant'],     sets: 4, reps: 12, calories: 50 },
          { id: exerciseMap['Pont fessier'],     sets: 4, reps: 20, calories: 42 },
          { id: exerciseMap['Mollets debout'],   sets: 4, reps: 25, calories: 30 },
          { id: exerciseMap['Planche'],          sets: 3, duration: 60, calories: 25 },
          { id: exerciseMap['Mountain climbers'],sets: 3, duration: 45, calories: 40 },
          { id: exerciseMap['Burpees'],          sets: 3, reps: 12, calories: 70 },
        ],
      },
    ],
  };
}

// ─── Programme 3 : Cardio & Mobilité ──────────────────────────────────────────

function buildCardioProgram(exerciseMap: Record<string, string>) {
  return {
    name: 'Cardio & Mobilité',
    description: 'Programme léger axé sur le cardio, la mobilité et la récupération active. Idéal en complément ou pour les jours de repos actif.',
    difficulty: Difficulty.BEGINNER,
    workouts: [
      {
        name: 'Séance 1 — Activation',
        description: 'Réveil musculaire et cardio doux.',
        order: 0,
        exercises: [
          { id: exerciseMap['Jumping jacks'],    sets: 3, duration: 30, calories: 25 },
          { id: exerciseMap['Mountain climbers'],sets: 3, duration: 20, calories: 22 },
          { id: exerciseMap['Planche'],          sets: 3, duration: 20, calories: 15 },
          { id: exerciseMap['Pont fessier'],     sets: 3, reps: 15, calories: 20 },
        ],
      },
      {
        name: 'Séance 2 — Cardio modéré',
        description: 'Intensité modérée maintenue sur la durée.',
        order: 1,
        exercises: [
          { id: exerciseMap['Corde à sauter'],   sets: 4, duration: 60, calories: 80 },
          { id: exerciseMap['Burpees'],          sets: 3, reps: 8,  calories: 55 },
          { id: exerciseMap['Jumping jacks'],    sets: 3, duration: 45, calories: 35 },
          { id: exerciseMap['Mountain climbers'],sets: 3, duration: 30, calories: 30 },
          { id: exerciseMap['Planche'],          sets: 3, duration: 30, calories: 18 },
        ],
      },
      {
        name: 'Séance 3 — Cardio intensif',
        description: 'Haute intensité pour maximiser la dépense calorique.',
        order: 2,
        exercises: [
          { id: exerciseMap['Corde à sauter'],   sets: 5, duration: 60, calories: 100 },
          { id: exerciseMap['Burpees'],          sets: 4, reps: 12, calories: 80 },
          { id: exerciseMap['Mountain climbers'],sets: 4, duration: 45, calories: 50 },
          { id: exerciseMap['Jumping jacks'],    sets: 3, duration: 60, calories: 45 },
          { id: exerciseMap['Gainage latéral'],  sets: 2, duration: 30, calories: 12 },
          { id: exerciseMap['Planche'],          sets: 3, duration: 45, calories: 22 },
        ],
      },
    ],
  };
}

// ─── Seed principal ────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Démarrage du seed...\n');

  // Nettoyage (ordre respectant les FK)
  await prisma.workoutExercise.deleteMany();
  await prisma.workout.deleteMany();
  await prisma.userProgram.deleteMany();
  await prisma.program.deleteMany();
  await prisma.exercise.deleteMany();
  console.log('🗑️  Tables vidées\n');

  // Création des exercices
  const createdExercises = await Promise.all(
    EXERCISES.map((ex) => prisma.exercise.create({ data: ex })),
  );
  console.log(`✅ ${createdExercises.length} exercices créés`);

  // Map name → id pour construire les séances facilement
  const exerciseMap: Record<string, string> = {};
  for (const ex of createdExercises) {
    exerciseMap[ex.name] = ex.id;
  }

  // Création des programmes
  const programs = [
    buildFullBodyProgram(exerciseMap),
    buildPPLProgram(exerciseMap),
    buildCardioProgram(exerciseMap),
  ];

  for (const programData of programs) {
    const { workouts, ...programFields } = programData;

    const program = await prisma.program.create({ data: programFields });

    for (const workoutData of workouts) {
      const { exercises, ...workoutFields } = workoutData;

      const workout = await prisma.workout.create({
        data: { ...workoutFields, programId: program.id },
      });

      await prisma.workoutExercise.createMany({
        data: exercises.map((ex, index) => ({
          workoutId: workout.id,
          exerciseId: ex.id,
          sets: ex.sets,
          reps: 'reps' in ex ? ex.reps : null,
          duration: 'duration' in ex ? ex.duration : null,
          calories: ex.calories,
          order: index,
        })),
      });
    }

    const totalWorkouts = workouts.length;
    const totalExercises = workouts.reduce((acc, w) => acc + w.exercises.length, 0);
    console.log(`✅ Programme "${program.name}" — ${totalWorkouts} séances, ${totalExercises} associations exercices`);
  }

  console.log('\n🎉 Seed terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur seed :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
