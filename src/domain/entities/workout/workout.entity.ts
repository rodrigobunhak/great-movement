import { Execution } from "../execution/execution.entity.ts";
import { ExerciseWorkout } from "../exerciseWorkout/exercise-workout.entity.ts";

// Entidade Exercise
export class Workout {
  private readonly id: string; // Converter para um VO de id
  private name: string;
  private startedAt?: Date;
  private execiseWorkouts: ExerciseWorkout[];

  public constructor(
    id: string,
    name: string,
    startedAt?: Date,
    execiseWorkouts: ExerciseWorkout[] = [],
  ) {
    this.id = id;
    this.name = name;
    this.startedAt = startedAt;
    this.execiseWorkouts = execiseWorkouts;
  }

  public static create(
    name: string,
  ): Workout {
    if (!name || name.trim().length === 0) {
      throw new Error('Nome do treino é obrigatório');
    }
    const id = '123';
    return new Workout(id, name.trim());
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getStartedAt(): Date | undefined {
    return this.startedAt;
  }

  // Métodos de negócio
  updateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Nome do treino é obrigatório');
    }
    this.name = name.trim();
  }

  start(): void {
    this.startedAt = new Date();
  }

  addExerciseWorkout(exerciseWorkout: ExerciseWorkout): void {
    this.execiseWorkouts.push(exerciseWorkout);
  }
}