import { Workout } from "../entities/workout/workout.entity";

export class createWorkoutUsecase {
  constructor(private readonly workoutRepository: WorkoutRepository) {}
  public execute(input: Input): Output {
    const workout = Workout.create(input.workoutName);
    this.workoutRepository.add(workout);
    return {
      workoutId: workout.getId(),
      workoutName: workout.getName(),
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

interface WorkoutRepository {
  add(workout: Workout): void;
}