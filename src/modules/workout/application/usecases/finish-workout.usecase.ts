import { NotFoundException } from "@nestjs/common";
import { WorkoutRepository } from "../../domain/repositories/workout.repository";
import { Id } from "src/modules/@shared/vos/id.vo";

export class finishWorkoutUsecase {
  constructor(
    private workoutRepository: WorkoutRepository,
  ) {}
  
  public async execute(input: Input): Promise<void> {
    const workout = await this.workoutRepository.findById(new Id(input.workoutId));
    if (!workout) throw new NotFoundException('Workout not found');
    workout.finish();
    await this.workoutRepository.save(workout);
  }
}

type Input = {
  workoutId: string,
}
