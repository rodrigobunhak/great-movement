import { Id } from 'src/modules/@shared/vos/id.vo';
import { Workout } from './workout.entity';
import { ExerciseWorkout } from '../exerciseWorkout/exercise-workout.entity';

describe('Workout Entity', () => {
  it('should create a workout', () => {
    const workout = Workout.create({ name: 'test workout' });
    expect(workout).toBeInstanceOf(Workout);
    expect(workout.name).toBe('test workout');
    expect(workout.id).toBeDefined();
  });

  it('should throw an error if name is empty', () => {
    expect(() => Workout.create({ name: '' })).toThrow('Nome do treino é obrigatório');
  });

  it('should update workout name', () => {
    const workout = Workout.create({ name: 'test workout' });
    workout.updateName('new name');
    expect(workout.name).toBe('new name');
  });

  it('should throw an error if updated name is empty', () => {
    const workout = Workout.create({ name: 'test workout' });
    expect(() => workout.updateName('')).toThrow('Nome do treino é obrigatório');
  });

  it('should start a workout', () => {
    const workout = Workout.create({ name: 'test workout' });
    workout.start();
    expect(workout.startedAt).toBeInstanceOf(Date);
  });

  it('should finish a workout', () => {
    const workout = new Workout({
      id: new Id(crypto.randomUUID()),
      name: 'test workout',
      execiseWorkouts: [],
      startedAt: new Date(),
    });
    workout.finish();
    expect(workout.finishedAt).toBeInstanceOf(Date);
  });

  it('should throw an error when finishing a workout that has not been started', () => {
    const workout = Workout.create({ name: 'test workout' });
    expect(() => workout.finish()).toThrow('Workout has not been started yet');
  });

  it('should add an exercise to a workout', () => {
    const workout = Workout.create({ name: 'test workout' });
    const exerciseWorkout = ExerciseWorkout.create({ exerciseId: new Id() });
    exerciseWorkout.addExecution(100, 10);
    workout.addExerciseWorkout(exerciseWorkout);
    expect(workout.exerciseWorkouts).toHaveLength(1);
  });
});
