import { Exercise } from "../exercise/exercise.entity";

// Entidade Execution
export class Execution {
  private readonly _id: string; // Converter para um VO de id
  private readonly _exerciseId: string; // Converter para um VO de id
  private _weight: number;
  private _repetitionAmount: number;
  private _status = 'not_started'; // Converter para um enum
  private _startedAt?: Date;
  private _completedAt?: Date;

  private constructor(
    id: string,
    exerciseId: string,
    weight: number,
    repetitionAmount: number,
    status: string,
    startedAt?: Date,
    completedAt?: Date,
  ) {
    this._id = id;
    this._exerciseId = exerciseId;
    this._weight = weight;
    this._repetitionAmount = repetitionAmount;
    this._status = status;
    this._startedAt = startedAt;
    this._completedAt = completedAt;
  }

  static create(
    exercise: Exercise,
    initialWeight: number,
    initialRepetition: number,
  ): Execution {
    const id = '123';
    return new Execution(id, exercise.id, initialWeight, initialRepetition, 'not_started', undefined, undefined);
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get exerciseId(): string {
    return this._exerciseId;
  }

  get status(): string {
    return this._status;
  }

  get startedAt(): Date | undefined {
    return this._startedAt;
  }

  get completedAt(): Date | undefined {
    return this._completedAt;
  }

  get volume(): number {
    return this._weight * this._repetitionAmount;
  }

  get weight(): number {
    return this._weight;
  }

  get repetitionAmount(): number {
    return this._repetitionAmount;
  }

  get oneRepMax(): number {
    if (this._repetitionAmount === 1) return this._weight;
    // Epley formula for 1RM estimation
    return this._weight * (1 + (this._repetitionAmount / 30));
  }

  // Métodos de negócio
  start(): void {
    if (this._status !== 'not_started') {
      throw new Error('Execução já foi iniciada');
    }
    this._startedAt = new Date();
    this._status = 'in_progress';
  }

  finish(): void {
    if (this._status !== 'in_progress') {
      throw new Error('Execução não foi iniciada');
    }
    this._completedAt = new Date();
    this._status = 'completed';
  }

  setWeight(weight: number): void {
    if (weight <= 0) {
      throw new Error('Quantidade não permitida');
    }
    this._weight = weight;
  }

  updateRepetitionAmount(amount: number): void {
    if (amount <= 0) {
      throw new Error('Quantidade não permitida');
    }
    this._repetitionAmount = amount;
  }
}