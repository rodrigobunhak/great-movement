import { Injectable } from "@nestjs/common";
import { WorkoutRepository } from "../domain/repositories/workout.repository";
import { Workout } from "../domain/entities/workout/workout.entity";
import { Id } from "src/modules/@shared/vos/id.vo";

@Injectable()
export class InMemoryWorkoutRepository implements WorkoutRepository {
  private readonly workouts: Workout[] = [];

  async create(workout: Workout): Promise<void> {
    this.workouts.push(workout);
  }

  async findById(id: Id): Promise<Workout | null> {
    const workout = this.workouts.find(w => new Id(w.id.value).equals(id));
    return workout || null;
  }

  async save(workout: Workout): Promise<void> {
    const workoutIndex = this.workouts.findIndex(w => new Id(w.id.value).equals(new Id(workout.id.value)));

    if (workoutIndex >= 0) {
      // If workout exists, update it (replace it in the array)
      this.workouts[workoutIndex] = workout;
    } else {
      // If workout does not exist, create it
      this.workouts.push(workout);
    }
  }
}
