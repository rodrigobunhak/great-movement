import { GetExercisePerformanceHistoryUseCase } from './get-exercise-performance-history.usecase';
import { Execution } from '../entities/execution/execution.entity';

// Mock ExecutionRepository for testing purposes
class MockExecutionRepository {
  private executions: Execution[] = [];

  public findByExerciseId(exerciseId: string): Execution[] {
    return this.executions.filter(e => e.exerciseId === exerciseId);
  }

  // Helper to populate mock data for a test
  public withExecutions(executions: Execution[]): this {
    this.executions = executions;
    return this;
  }
}

// A simple factory to create mock Execution objects for tests
const createMockExecution = (data: {
  exerciseId: string;
  weight: number;
  repetitionAmount: number;
  completedAt: Date;
}): Execution => {
  // We cast to 'any' to bypass private constructor for testing
  const execution = {
    _id: `id_${Math.random()}`,
    _exerciseId: data.exerciseId,
    _weight: data.weight,
    _repetitionAmount: data.repetitionAmount,
    _completedAt: data.completedAt,
    get exerciseId() { return this._exerciseId; },
    get weight() { return this._weight; },
    get repetitionAmount() { return this._repetitionAmount; },
    get completedAt() { return this._completedAt; },
    get volume() { return this._weight * this._repetitionAmount; },
    get oneRepMax() { return this._weight * (1 + this._repetitionAmount / 30); },
  } as any;
  return execution as Execution;
};

describe('GetExercisePerformanceHistoryUseCase', () => {
  let useCase: GetExercisePerformanceHistoryUseCase;
  let mockRepository: MockExecutionRepository;

  beforeEach(() => {
    mockRepository = new MockExecutionRepository();
    // The 'any' cast is used here because the mock repository is compatible with the interface
    useCase = new GetExercisePerformanceHistoryUseCase(mockRepository as any);
  });

  it('should return zero values when no executions are found', () => {
    const result = useCase.execute({ exerciseId: 'exercise-1' });

    expect(result.maxWeight).toBe(0);
    expect(result.best1RM).toBe(0);
    expect(result.totalVolume).toBe(0);
    expect(result.history).toEqual([]);
  });

  it('should calculate performance metrics correctly for a given exercise', () => {
    const exerciseId = 'exercise-1';
    const executions = [
      createMockExecution({ exerciseId, weight: 100, repetitionAmount: 10, completedAt: new Date('2025-06-20') }), // 1RM: 133.33
      createMockExecution({ exerciseId, weight: 110, repetitionAmount: 8, completedAt: new Date('2025-06-22') }),  // 1RM: 138.67
      createMockExecution({ exerciseId, weight: 120, repetitionAmount: 5, completedAt: new Date('2025-06-24') }),  // 1RM: 140.00
      createMockExecution({ exerciseId: 'exercise-2', weight: 90, repetitionAmount: 12, completedAt: new Date() }), // Should be ignored
    ];
    mockRepository.withExecutions(executions);

    const result = useCase.execute({ exerciseId });

    expect(result.maxWeight).toBe(120);
    expect(result.best1RM).toBeCloseTo(140.00);
    expect(result.totalVolume).toBe(100 * 10 + 110 * 8 + 120 * 5); // 1000 + 880 + 600 = 2480
    expect(result.history).toHaveLength(3);
    expect(result.history[2].oneRepMax).toBeCloseTo(140.00);
  });
});
