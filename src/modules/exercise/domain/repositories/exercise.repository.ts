import { Id } from "../../../@shared/vos/id.vo";
import { Exercise } from "../entities/exercise/exercise.entity";

export interface ExerciseRepository {
  create(exercise: Exercise): Promise<void>;
  findById(id: Id): Promise<Exercise | null>;
  save(exercise: Exercise): Promise<void>;
}
