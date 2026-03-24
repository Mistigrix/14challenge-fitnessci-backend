# Foroci — Backend API

> **Foro** = force / courage en malinké. Représente la détermination et l'effort physique dans l'entraînement.

API REST pour une application de fitness — gestion de programmes, séances, exercices et suivi des métriques utilisateur.

---

## Stack technique

| Technologie | Rôle |
|---|---|
| [NestJS](https://nestjs.com) | Framework Node.js |
| [Prisma](https://www.prisma.io) | ORM & migrations |
| PostgreSQL | Base de données |
| JWT + Passport | Authentification |
| class-validator | Validation des DTOs |
| @nestjs/swagger | Documentation OpenAPI |
| Docker | Conteneurisation |

---

## Prérequis

- Node.js >= 22
- npm >= 10
- PostgreSQL (ou accès à une instance Prisma Postgres)
- Docker (optionnel, pour le déploiement)

---

## Installation

```bash
npm install
```

Créer un fichier `.env` à la racine :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/foroci"
JWT_SECRET="your-secret-key"
PORT=3000
```

---

## Démarrage

```bash
# Développement (watch mode)
npm run start:dev

# Production
npm run build
npm run start:prod
```

---

## Base de données

```bash
# Créer et appliquer les migrations
npx prisma migrate dev --name init

# Générer le client Prisma
npx prisma generate

# Peupler la base avec des données de départ
npx prisma db seed

# Ouvrir Prisma Studio (GUI)
npx prisma studio
```

---

## Docker

```bash
# Build de l'image
docker build -t foroci-backend .

# Lancer le conteneur
docker run -p 3000:3000 --env-file .env foroci-backend
```

---

## Documentation API

| URL | Description |
|---|---|
| `GET /api/docs` | Swagger UI interactif |
| `GET /api/docs/json` | Spec OpenAPI au format JSON |
| `GET /api/docs/yaml` | Spec OpenAPI au format YAML |

---

## Endpoints

Tous les endpoints (sauf auth) nécessitent un header `Authorization: Bearer <token>`.

### Auth

| Méthode | Route | Description |
|---|---|---|
| POST | `/api/v1/auth/register` | Créer un compte |
| POST | `/api/v1/auth/login` | Connexion — retourne un JWT |

### Users

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/v1/users/me` | Profil de l'utilisateur connecté |
| PATCH | `/api/v1/users/me` | Mise à jour du profil / onboarding (taille, poids…) |
| GET | `/api/v1/users/me/programs` | Programmes auxquels l'utilisateur est inscrit |

### Programs

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/v1/programs` | Lister tous les programmes |
| POST | `/api/v1/programs` | Créer un programme |
| GET | `/api/v1/programs/:id` | Détail d'un programme |
| PATCH | `/api/v1/programs/:id` | Modifier un programme |
| DELETE | `/api/v1/programs/:id` | Supprimer un programme |
| GET | `/api/v1/programs/:id/workouts` | Séances d'un programme (ordonnées) |
| POST | `/api/v1/programs/:id/enroll` | S'inscrire à un programme |
| DELETE | `/api/v1/programs/:id/enroll` | Se désinscrire d'un programme |

### Workouts (Séances)

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/v1/workouts` | Lister les séances (filtre `?programId=`) |
| POST | `/api/v1/workouts` | Créer une séance |
| GET | `/api/v1/workouts/:id` | Détail d'une séance avec ses exercices |
| PATCH | `/api/v1/workouts/:id` | Modifier une séance |
| DELETE | `/api/v1/workouts/:id` | Supprimer une séance |
| GET | `/api/v1/workouts/:id/exercises` | Exercices d'une séance (avec métriques) |
| POST | `/api/v1/workouts/:id/exercises` | Ajouter un exercice à une séance |
| PATCH | `/api/v1/workouts/:id/exercises/:exerciseId` | Modifier les métriques d'un exercice dans la séance |
| DELETE | `/api/v1/workouts/:id/exercises/:exerciseId` | Retirer un exercice d'une séance |

### Exercises

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/v1/exercises` | Lister les exercices (filtres `?category=` `?type=`) |
| POST | `/api/v1/exercises` | Créer un exercice |
| GET | `/api/v1/exercises/:id` | Détail d'un exercice |
| PATCH | `/api/v1/exercises/:id` | Modifier un exercice |
| DELETE | `/api/v1/exercises/:id` | Supprimer un exercice |

### Metrics

| Méthode | Route | Description |
|---|---|---|
| POST | `/api/v1/metrics/weight` | Enregistrer une mesure de poids |
| GET | `/api/v1/metrics/weight` | Historique du poids |
| POST | `/api/v1/metrics/exercise-logs` | Logger une performance d'exercice |
| GET | `/api/v1/metrics/exercise-logs` | Historique des performances (filtre `?exerciseId=`) |
| GET | `/api/v1/metrics/calendar` | Calendrier des séances (filtres `?from=` `?to=`) |

---

## Modèle de données

```
User
 ├── UserMetric[]       — historique du poids
 ├── ExerciseLog[]      — performances par exercice
 └── UserProgram[]      — programmes suivis

Program
 └── Workout[]          — séances ordonnées
      └── WorkoutExercise[]  — liaison avec métriques propres à la séance
           └── Exercise       — nom, catégorie, type (REPS | DURATION)
```

La table `WorkoutExercise` porte les métriques **spécifiques à la séance** : un même exercice peut avoir 10 répétitions en séance 1 et 30 en séance 8, permettant la **surcharge progressive**.

---

## Données de seed

Le seed fourni crée 3 programmes avec surcharge progressive et 23 exercices :

| Programme | Difficulté | Séances |
|---|---|---|
| Full Body Débutant | BEGINNER | 4 |
| PPL Intermédiaire | INTERMEDIATE | 6 |
| Cardio & Mobilité | BEGINNER | 3 |

---

## Variables d'environnement

| Variable | Description | Défaut |
|---|---|---|
| `DATABASE_URL` | URL de connexion PostgreSQL | — |
| `JWT_SECRET` | Clé secrète pour signer les JWT | `foroci-secret-change-in-prod` |
| `PORT` | Port d'écoute du serveur | `3000` |
