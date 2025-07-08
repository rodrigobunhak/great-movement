import { Workout } from "../../domain/entities/workout/workout.entity";
import { WorkoutRepository } from "../../domain/repositories/workout.repository";

export class createWorkoutUsecase {
  constructor(
    private workoutRepository: WorkoutRepository
  ) {}
  
  public execute(input: Input): Output {
    const workout = Workout.create({ name: input.workoutName });
    this.workoutRepository.create(workout);
    return {
      workoutId: workout.id.value,
      workoutName: workout.name,
    }
  }
}

type Input = {
  workoutName: string,
  workoutDescription: string,
}

type Output = {
  workoutId: string,
  workoutName: string,
}
