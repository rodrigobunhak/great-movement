import { Workout } from "../entities/workout/workout.entity";

export class startWorkoutUsecase {
  constructor(private readonly workoutRepository: WorkoutRepository) {}

  public execute(input: Input): void {
    const workout = this.workoutRepository.findById(input.workoutId);
    if (!workout) throw new Error('Workout not found');
    workout.start();
    this.workoutRepository.update(workout);
  }
}

type Input = {
  workoutId: string,
}

interface WorkoutRepository {
    findById(id: string): Workout | undefined;
    update(workout: Workout): void;
}
