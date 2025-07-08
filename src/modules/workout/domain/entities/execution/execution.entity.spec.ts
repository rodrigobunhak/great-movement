import { Execution } from './execution.entity';

describe('Execution Entity', () => {
  it('should create an execution', () => {
    const execution = Execution.create({ weightAmount: 100, repetitionAmount: 10 });
    expect(execution).toBeInstanceOf(Execution);
    expect(execution.weightAmount).toBe(100);
    expect(execution.repetitionAmount).toBe(10);
    expect(execution.status).toBe('not_started');
    expect(execution.id).toBeDefined();
  });

  it('should calculate the volume', () => {
    const execution = Execution.create({ weightAmount: 100, repetitionAmount: 10 });
    expect(execution.getVolume()).toBe(1000);
  });

  it('should calculate the one-rep max', () => {
    const execution = Execution.create({ weightAmount: 100, repetitionAmount: 10 });
    expect(execution.getOneRepMax()).toBeCloseTo(133.33, 2);
  });

  it('should return the weight as one-rep max if repetitions is 1', () => {
    const execution = Execution.create({ weightAmount: 100, repetitionAmount: 1 });
    expect(execution.getOneRepMax()).toBe(100);
  });

  it('should start an execution', () => {
    const execution = Execution.create({ weightAmount: 100, repetitionAmount: 10 });
    execution.start();
    expect(execution.status).toBe('in_progress');
    expect(execution.startedAt).toBeInstanceOf(Date);
  });

  it('should throw an error if starting an already started execution', () => {
    const execution = Execution.create({ weightAmount: 100, repetitionAmount: 10 });
    execution.start();
    expect(() => execution.start()).toThrow('Execução já foi iniciada');
  });

  it('should finish an execution', () => {
    const execution = Execution.create({ weightAmount: 100, repetitionAmount: 10 });
    execution.start();
    execution.finish();
    expect(execution.status).toBe('completed');
    expect(execution.completedAt).toBeInstanceOf(Date);
  });

  it('should throw an error if finishing an execution that has not been started', () => {
    const execution = Execution.create({ weightAmount: 100, repetitionAmount: 10 });
    expect(() => execution.finish()).toThrow('Execução não foi iniciada');
  });

  it('should update the weight amount', () => {
    const execution = Execution.create({ weightAmount: 100, repetitionAmount: 10 });
    execution.updateWeightAmount(120);
    expect(execution.weightAmount).toBe(120);
  });

  it('should throw an error if updating with an invalid weight amount', () => {
    const execution = Execution.create({ weightAmount: 100, repetitionAmount: 10 });
    expect(() => execution.updateWeightAmount(0)).toThrow('Quantidade não permitida');
  });

  it('should update the repetition amount', () => {
    const execution = Execution.create({ weightAmount: 100, repetitionAmount: 10 });
    execution.updateRepetitionAmount(12);
    expect(execution.repetitionAmount).toBe(12);
  });

  it('should throw an error if updating with an invalid repetition amount', () => {
    const execution = Execution.create({ weightAmount: 100, repetitionAmount: 10 });
    expect(() => execution.updateRepetitionAmount(0)).toThrow('Quantidade não permitida');
  });
});
