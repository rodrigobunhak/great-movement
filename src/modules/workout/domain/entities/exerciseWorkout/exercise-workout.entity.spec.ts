import { Id } from 'src/modules/@shared/vos/id.vo';
import { ExerciseWorkout } from './exercise-workout.entity';
import { Execution } from '../execution/execution.entity';

describe('ExerciseWorkout Entity', () => {
  it('should create an exercise workout', () => {
    const exerciseWorkout = ExerciseWorkout.create({ exerciseId: new Id() });
    expect(exerciseWorkout).toBeInstanceOf(ExerciseWorkout);
    expect(exerciseWorkout.id).toBeDefined();
    expect(exerciseWorkout.exerciseId).toBeDefined();
    expect(exerciseWorkout.executions).toHaveLength(0);
  });

  it('should add an execution to the exercise workout', () => {
    const exerciseWorkout = ExerciseWorkout.create({ exerciseId: new Id() });
    exerciseWorkout.addExecution(100, 10);
    expect(exerciseWorkout.executions).toHaveLength(1);
  });

  it('should remove an execution from the exercise workout', () => {
    const exerciseWorkout = ExerciseWorkout.create({ exerciseId: new Id() });
    exerciseWorkout.addExecution(100, 10);
    const executionToRemove = exerciseWorkout.executions[0];
    exerciseWorkout.removeExecution(executionToRemove.id);
    expect(exerciseWorkout.executions).toHaveLength(0);
  });

  it('should calculate the total volume of the exercise workout', () => {
    const exerciseWorkout = ExerciseWorkout.create({ exerciseId: new Id() });
    exerciseWorkout.addExecution(100, 10);
    exerciseWorkout.addExecution(100, 10);
    expect(exerciseWorkout.getTotalVolume()).toBe(2000);
  });
});
