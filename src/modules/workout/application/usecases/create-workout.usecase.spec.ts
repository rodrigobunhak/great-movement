import { createWorkoutUsecase } from './create-workout.usecase';
import { WorkoutRepository } from '../../domain/repositories/workout.repository';
import { Workout } from '../../domain/entities/workout/workout.entity';

describe('createWorkoutUsecase', () => {
  it('should create a workout', () => {
    const workoutRepository: jest.Mocked<WorkoutRepository> = {
      create: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    };
    const usecase = new createWorkoutUsecase(workoutRepository);
    const input = {
      workoutName: 'test workout',
      workoutDescription: 'test description',
    };
    const output = usecase.execute(input);
    expect(workoutRepository.create).toHaveBeenCalledTimes(1);
    expect(workoutRepository.create).toHaveBeenCalledWith(expect.any(Workout));
    expect(output.workoutName).toBe(input.workoutName);
    expect(output.workoutId).toBeDefined();
  });
});
