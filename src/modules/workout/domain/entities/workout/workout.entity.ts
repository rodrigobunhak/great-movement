import { Id } from "src/modules/@shared/vos/id.vo";
import { ExerciseWorkout } from "../exerciseWorkout/exercise-workout.entity";

export class Workout {
  private readonly _id: Id;
  private _name: string;
  private _startedAt?: Date;
  private _finishedAt?: Date;
  private _execiseWorkouts: ExerciseWorkout[];

  public constructor(props: WorkoutProps) {
    this._id = props.id;
    this._name = props.name;
    this._startedAt = props.startedAt;
    this._finishedAt = props.finishedAt;
    this._execiseWorkouts = props.execiseWorkouts;
  }

  public static create(props: WorkoutCreateProps): Workout {
    if (!props.name || props.name.trim().length === 0) {
      throw new Error('Nome do treino é obrigatório');
    }
    return new Workout({
      id: new Id(),
      name: props.name.trim(),
      execiseWorkouts: [],
    });
  }

  public get id(): Id {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get startedAt(): Date | undefined {
    return this._startedAt;
  }

  public get finishedAt(): Date | undefined {
    return this._finishedAt;
  }

  public get exerciseWorkouts(): ExerciseWorkout[] {
    return this._execiseWorkouts;
  }

  public toObject() {
    return {
      id: this._id.value,
      name: this._name,
      startedAt: this._startedAt,
      finishedAt: this._finishedAt,
      exerciseWorkouts: this._execiseWorkouts.map(ew => ew.toObject()),
    };
  }

  public toJSON() {
    return this.toObject();
  }

  public updateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Nome do treino é obrigatório');
    }
    this._name = name.trim();
  }

  public start(): void {
    this._startedAt = new Date();
  }

  public finish(): void {
    if (!this._startedAt) throw new Error('Workout has not been started yet');
    this._finishedAt = new Date();
  }

  public addExerciseWorkout(exerciseWorkout: ExerciseWorkout): void {
    this._execiseWorkouts.push(exerciseWorkout);
  }
}

type WorkoutProps = {
  id: Id,
  name: string,
  startedAt?: Date,
  finishedAt?: Date,
  execiseWorkouts: ExerciseWorkout[],
}

type WorkoutCreateProps = {
  name: string,
}