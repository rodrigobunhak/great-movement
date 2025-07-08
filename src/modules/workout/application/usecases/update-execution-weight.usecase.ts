import { Execution } from "../../domain/entities/execution/execution.entity";

export class UpdateExecutionWeightUseCase {
  constructor(private readonly executionRepository: ExecutionRepository) {}

  public execute(input: Input): Output {
    const execution = this.executionRepository.getById(input.executionId);
    execution.updateWeightAmount(input.weight);
    this.executionRepository.update(execution);
    return {
      executionId: execution.id.value,
      weight: execution.weightAmount,
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
