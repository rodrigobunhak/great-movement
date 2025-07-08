import { Id } from "src/modules/@shared/vos/id.vo";
import { WorkoutRepository } from "../../domain/repositories/workout.repository";

export class startWorkoutUsecase {
  constructor(
    private readonly workoutRepository: WorkoutRepository
  ) {}

  public async execute(input: Input): Promise<void> {
    const workout = await this.workoutRepository.findById(new Id(input.workoutId));
    if (!workout) throw new Error('Workout not found');
    workout.start();
    this.workoutRepository.save(workout);
  }
}

type Input = {
  workoutId: string,
}
