import { NotFoundException } from "@nestjs/common";
import { WorkoutRepository } from "../../domain/repositories/workout.repository";
import { Id } from "src/modules/@shared/vos/id.vo";

export class finishExecutionUsecase {
  constructor(
    private readonly workoutRepository: WorkoutRepository,
  ) {}
  
  public async execute(input: Input): Promise<void> {
    const workout = await this.workoutRepository.findById(new Id(input.workoutId));
    if (!workout) throw new NotFoundException('Workout not found');
    const exercise = workout.exerciseWorkouts.find((exerciseWorkout) => exerciseWorkout.id === new Id(input.exerciseWorkoutId));
    if (!exercise) throw new NotFoundException('Exercise not found');
    const execution = exercise.executions.find((execution) => execution.id === new Id(input.executionId));
    if (!execution) throw new NotFoundException('Execution not found');
    execution.finish();
    await this.workoutRepository.save(workout);
  }
}

type Input = {
  workoutId: string,
  exerciseWorkoutId: string,
  executionId: string,
}
