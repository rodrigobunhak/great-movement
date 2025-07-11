import { Id } from "src/modules/@shared/vos/id.vo";

// Entidade Execution
export class Execution {
  private readonly _id: Id;
  private _weightAmount: number;
  private _repetitionAmount: number;
  private _status = 'not_started'; // Converter para um enum
  private _startedAt?: Date;
  private _completedAt?: Date;

  private constructor(props: ExecutionProps) {
    this._id = props.id;
    this._weightAmount = props.weightAmount;
    this._repetitionAmount = props.repetitionAmount;
    this._status = props.status;
    this._startedAt = props.startedAt;
    this._completedAt = props.completedAt;
  }

  static create(props: ExecutionCreateProps): Execution {
    return new Execution({
      id: new Id(),
      weightAmount: props.weightAmount,
      repetitionAmount: props.repetitionAmount,
      status: 'not_started',
    });
  }

  // Getters
  public get id(): Id {
    return this._id;
  }

  public get status(): string {
    return this._status;
  }

  public get startedAt(): Date | undefined {
    return this._startedAt;
  }

  public get completedAt(): Date | undefined {
    return this._completedAt;
  }

  public get weightAmount(): number {
    return this._weightAmount;
  }
  
  public get repetitionAmount(): number {
    return this._repetitionAmount;
  }

  public getVolume(): number {
    return this._weightAmount * this._repetitionAmount;
  }

  public getOneRepMax(): number {
    if (this._repetitionAmount === 1) return this._weightAmount;
    // Epley formula for 1RM estimation
    return this._weightAmount * (1 + (this._repetitionAmount / 30));
  }

  // Métodos de negócio
  public start(): void {
    if (this._status !== 'not_started') {
      throw new Error('Execução já foi iniciada');
    }
    this._startedAt = new Date();
    this._status = 'in_progress';
  }

  public finish(): void {
    if (this._status !== 'in_progress') {
      throw new Error('Execução não foi iniciada');
    }
    this._completedAt = new Date();
    this._status = 'completed';
  }

  public updateWeightAmount(weight: number): void {
    if (weight <= 0) {
      throw new Error('Quantidade não permitida');
    }
    this._weightAmount = weight;
  }

  public updateRepetitionAmount(amount: number): void {
    if (amount <= 0) {
      throw new Error('Quantidade não permitida');
    }
    this._repetitionAmount = amount;
  }

  public toObject() {
    return {
      id: this._id.value,
      weightAmount: this._weightAmount,
      repetitionAmount: this._repetitionAmount,
      status: this._status,
      startedAt: this._startedAt,
      completedAt: this._completedAt,
    };
  }

  public toJSON() {
    return this.toObject();
  }
}

type ExecutionProps = {
  id: Id,
  weightAmount: number,
  repetitionAmount: number,
  status: string,
  startedAt?: Date,
  completedAt?: Date,
}

type ExecutionCreateProps = {
  weightAmount: number,
  repetitionAmount: number,
}
