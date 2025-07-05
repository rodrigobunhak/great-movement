import { Execution } from "../entities/execution/execution.entity";

export class GetExercisePerformanceHistoryUseCase {
  constructor(private readonly executionRepository: ExecutionRepository) {}

  public execute(input: Input): Output {
    const executions = this.executionRepository.findByExerciseId(input.exerciseId);

    if (executions.length === 0) {
      return {
        maxWeight: 0,
        best1RM: 0,
        totalVolume: 0,
        history: [],
      };
    }

    const maxWeight = Math.max(...executions.map(e => e.weight));
    const best1RM = Math.max(...executions.map(e => e.oneRepMax));
    const totalVolume = executions.reduce((acc, e) => acc + e.volume, 0);

    const history = executions.map(e => ({
      date: e.completedAt!,
      weight: e.weight,
      reps: e.repetitionAmount,
      oneRepMax: e.oneRepMax,
    }));

    return {
      maxWeight,
      best1RM,
      totalVolume,
      history,
    };
  }
}

type Input = {
  exerciseId: string;
}

type Output = {
  maxWeight: number;
  best1RM: number;
  totalVolume: number;
  history: {
    date: Date;
    weight: number;
    reps: number;
    oneRepMax: number;
  }[];
}

interface ExecutionRepository {
  findByExerciseId(exerciseId: string): Execution[];
}
