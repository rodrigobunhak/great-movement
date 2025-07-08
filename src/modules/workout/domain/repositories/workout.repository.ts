import { Id } from "src/modules/@shared/vos/id.vo";
import { Workout } from "../entities/workout/workout.entity";

export interface WorkoutRepository {
  create(workout: Workout): Promise<void>;
  findById(id: Id): Promise<Workout | null>;
  save(workout: Workout): Promise<void>;
}
