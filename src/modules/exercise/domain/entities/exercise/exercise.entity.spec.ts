import { Exercise } from './exercise.entity';

describe('Exercise Entity', () => {
  it('should create an exercise', () => {
    const exercise = Exercise.create('test exercise', 'test description', 'test focus area', []);
    expect(exercise).toBeInstanceOf(Exercise);
    expect(exercise.name).toBe('test exercise');
    expect(exercise.description).toBe('test description');
    expect(exercise.focusArea).toBe('test focus area');
    expect(exercise.id).toBeDefined();
    expect(exercise.createdAt).toBeInstanceOf(Date);
  });

  it('should throw an error if name is empty', () => {
    expect(() => Exercise.create('', 'test description', 'test focus area', [])).toThrow('Nome do exercício é obrigatório');
  });

  it('should throw an error if focus area is empty', () => {
    expect(() => Exercise.create('test exercise', 'test description', '', [])).toThrow('Foco do exercício é obrigatório');
  });

  it('should update exercise name', () => {
    const exercise = Exercise.create('test exercise', 'test description', 'test focus area', []);
    exercise.updateName('new name');
    expect(exercise.name).toBe('new name');
  });

  it('should throw an error if updated name is empty', () => {
    const exercise = Exercise.create('test exercise', 'test description', 'test focus area', []);
    expect(() => exercise.updateName('')).toThrow('Nome do exercício é obrigatório');
  });

  it('should update exercise description', () => {
    const exercise = Exercise.create('test exercise', 'test description', 'test focus area', []);
    exercise.updateDescription('new description');
    expect(exercise.description).toBe('new description');
  });

  it('should update exercise focus area', () => {
    const exercise = Exercise.create('test exercise', 'test description', 'test focus area', []);
    exercise.updateFocusArea('new focus area');
    expect(exercise.focusArea).toBe('new focus area');
  });

  it('should throw an error if updated focus area is empty', () => {
    const exercise = Exercise.create('test exercise', 'test description', 'test focus area', []);
    expect(() => exercise.updateFocusArea('')).toThrow('Foco do exercício é obrigatório');
  });
});
