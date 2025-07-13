import { Id } from "src/modules/@shared/vos/id.vo";
import { ExerciseWorkout } from "../../domain/entities/exerciseWorkout/exercise-workout.entity";
import { Workout } from "../../domain/entities/workout/workout.entity";
import { WorkoutRepository } from "../../domain/repositories/workout.repository";
import { finishWorkoutUsecase } from "./finish-workout.usecase";

describe('finishWorkoutUsecase', () => {
  it('should finish an workout', async () => {
    const workout = Workout.create({ name: 'test workout' });
    const exerciseWorkout = ExerciseWorkout.create({ exerciseId: new Id() });
    workout.addExerciseWorkout(exerciseWorkout);
    exerciseWorkout.addExecution(100, 12);
    workout.start();
    exerciseWorkout.executions[0].start();
    exerciseWorkout.executions[0].finish();

    const workoutRepository: jest.Mocked<WorkoutRepository> = {
      create: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    };
    const usecase = new finishWorkoutUsecase(workoutRepository);
    workoutRepository.findById.mockResolvedValue(workout);
    const input = {
      workoutId: workout.id.value,
    };
    await usecase.execute(input);
    expect(workoutRepository.findById).toHaveBeenCalledWith(workout.id);
    expect(workoutRepository.save).toHaveBeenCalledWith(workout);
  });
});
