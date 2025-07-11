import { NotFoundException } from '@nestjs/common';
import { Id } from 'src/modules/@shared/vos/id.vo';
import { Execution } from '../../domain/entities/execution/execution.entity';
import { ExerciseWorkout } from '../../domain/entities/exerciseWorkout/exercise-workout.entity';
import { Workout } from '../../domain/entities/workout/workout.entity';
import { WorkoutRepository } from '../../domain/repositories/workout.repository';
import { finishExecutionUsecase } from './finish-execution.usecase';
import { createWorkoutUsecase } from './create-workout.usecase';

describe('finishExecutionUsecase', () => {
  // const exerciseWorkout = ExerciseWorkout.create({ exerciseId: new Id() });
  // exerciseWorkout.addExecution(100, 12);

  // const workout = Workout.create({ name: 'test workout' });
  // workout.addExerciseWorkout(exerciseWorkout);

  it('should finish an execution', async () => {
    const workout = Workout.create({ name: 'test workout' });
    const exerciseWorkout = ExerciseWorkout.create({ exerciseId: new Id() });
    workout.addExerciseWorkout(exerciseWorkout);
    exerciseWorkout.addExecution(100, 12);
    exerciseWorkout.executions[0].start();
    
    const workoutRepository: jest.Mocked<WorkoutRepository> = {
      create: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    };
    const usecase = new finishExecutionUsecase(workoutRepository);
    workoutRepository.findById.mockResolvedValue(workout);

    const input = {
      workoutId: workout.id.value,
      exerciseWorkoutId: exerciseWorkout.id.value,
      executionId: exerciseWorkout.executions[0].id.value,
    };
    
    const finishSpy = jest.spyOn(exerciseWorkout.executions[0], 'finish');

    await usecase.execute(input);

    expect(workoutRepository.findById).toHaveBeenCalledWith(workout.id);
    expect(finishSpy).toHaveBeenCalledTimes(1);
    expect(workoutRepository.save).toHaveBeenCalledWith(workout);
  });

  // it('should throw an error if workout is not found', async () => {
  //   workoutRepository.findById.mockResolvedValue(null);

  //   const input = {
  //     workoutId: 'invalid-id',
  //     exerciseWorkoutId: exerciseWorkout.id.value,
  //     executionId: exerciseWorkout.executions[0].id.value,
  //   };

  //   await expect(usecase.execute(input)).rejects.toThrow(NotFoundException);
  // });

  // it('should throw an error if exercise workout is not found', async () => {
  //   workoutRepository.findById.mockResolvedValue(workout);

  //   const input = {
  //     workoutId: workout.id.value,
  //     exerciseWorkoutId: 'invalid-id',
  //     executionId: exerciseWorkout.executions[0].id.value,
  //   };

  //   await expect(usecase.execute(input)).rejects.toThrow(NotFoundException);
  // });

  // it('should throw an error if execution is not found', async () => {
  //   workoutRepository.findById.mockResolvedValue(workout);

  //   const input = {
  //     workoutId: workout.id.value,
  //     exerciseWorkoutId: exerciseWorkout.id.value,
  //     executionId: 'invalid-id',
  //   };

  //   await expect(usecase.execute(input)).rejects.toThrow(NotFoundException);
  // });
});
