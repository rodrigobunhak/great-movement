import { NotFoundException } from "@nestjs/common";
import { WorkoutRepository } from "../../domain/repositories/workout.repository";
import { ExerciseRepository } from "src/modules/exercise/domain/repositories/exercise.repository";
import { Id } from "src/modules/@shared/vos/id.vo";
import { ExerciseWorkout } from "../../domain/entities/exerciseWorkout/exercise-workout.entity";

export class createExerciseWorkoutUsecase {
  constructor(
    private readonly workoutRepository: WorkoutRepository,
    private readonly exerciseRepository: ExerciseRepository,
  ) {}
  
  public async execute(input: Input): Promise<Output> {
    const workout = await this.workoutRepository.findById(new Id(input.workoutId));
    if (!workout) throw new NotFoundException('Workout not found');
    const exercise = await this.exerciseRepository.findById(new Id(input.exerciseId));
    if (!exercise) throw new NotFoundException('Exercise not found');
    const exerciseWorkout = ExerciseWorkout.create({ exerciseId: exercise.id });
    input.excutions.forEach(execution => {
      exerciseWorkout.addExecution(execution.weight, execution.repetition);
    });
    workout.addExerciseWorkout(exerciseWorkout);
    await this.workoutRepository.save(workout);
    return {
      exerciseName: exercise.name,
      executions: exerciseWorkout.executions.map((execution) => ({
        weight: execution.weightAmount,
        repetition: execution.repetitionAmount,
      }))
    }
  }
}

type Input = {
  workoutId: string,
  exerciseId: string,
  excutions: {
    weight: number,
    repetition: number,
  }[]
}

type Output = {
  exerciseName: string,
  executions: {
    weight: number,
    repetition: number,
  }[]
}
