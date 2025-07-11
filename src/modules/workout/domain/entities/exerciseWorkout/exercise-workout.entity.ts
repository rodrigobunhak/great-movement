import { Id } from "src/modules/@shared/vos/id.vo";
import { Execution } from "../execution/execution.entity";
import { randomUUID } from "crypto";

export class ExerciseWorkout {
  private readonly _id: Id;
  private _exerciseId: Id;
  private _executions: Execution[];
  
  public constructor(props: ExerciseProps) {
    this._id = props.id;
    this._exerciseId = props.exerciseId;
    this._executions = props.executions;
  }

  static create(props: ExerciseCreateProps): ExerciseWorkout {
    return new ExerciseWorkout({
      id: new Id(),
      exerciseId: props.exerciseId,
      executions: [],
    });
  }

  // Getters
  public get id(): Id {
    return this._id;
  }

  public get executions(): Execution[] {
    return this._executions;
  }

  public get exerciseId(): Id {
    return this._exerciseId;
  }

  public getTotalVolume(): number {
    const total = this._executions.reduce((total, execution) => {
      return total + execution.getVolume();
    }, 0);
    return total;
  }

  public addExecution(weight: number, repetition: number): void {
    const execution = Execution.create({ weightAmount: weight, repetitionAmount: repetition });
    this._executions.push(execution);
  }

  public removeExecution(executionId: Id): void {
    this._executions = this._executions.filter(execution => !execution.id.equals(executionId));
  }

  public toObject() {
    return {
      id: this._id.value,
      exerciseId: this._exerciseId.value,
      executions: this._executions.map(e => e.toObject()),
    };
  }

  public toJSON() {
    return this.toObject();
  }
}

type ExerciseProps = {
  id: Id,
  exerciseId: Id,
  executions: Execution[],
}

type ExerciseCreateProps = {
  exerciseId: Id,
}