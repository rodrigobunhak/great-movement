import { Execution } from "../execution/execution.entity.ts";
import { Exercise } from "../exercise/exercise.entity.ts";

export class ExerciseWorkout {
  private constructor(
    private readonly id: string, // Converter para um VO de id
    private readonly exerciseId: string, // Converter para um VO de id
    private executions: Execution[],
  ) {}

  static create(
    exercise: Exercise,
    executions: Execution[],
  ): ExerciseWorkout {
    const id = '123';
    return new ExerciseWorkout(id, exercise.getId(), executions);
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getExecutions(): Execution[] {
    return this.executions;
  }

  getTotalVolume(): string {
    const total = this.executions.reduce((total, execution) => {
      return total + execution.getVolume();
    }, 0);
    return `Volume total: ${total} Kg`;
  }
}