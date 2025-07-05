import { Execution } from "../entities/execution/execution.entity";

export class UpdateExecutionWeightUseCase {
  constructor(private readonly executionRepository: ExecutionRepository) {}

  public execute(input: Input): Output {
    const execution = this.executionRepository.getById(input.executionId);
    execution.setWeight(input.weight);
    this.executionRepository.update(execution);
    return {
      executionId: execution.getId(),
      weight: execution.getWeight(),
    }
  }
}

type Input = {
  executionId: string,
  weight: number,
}

type Output = {
  executionId: string,
  weight: number,
}

interface ExecutionRepository {
  getById(id: string): Execution;
  update(execution: Execution): void;
}
