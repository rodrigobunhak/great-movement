
import { randomUUID } from "crypto";

export class Id {
  private readonly id: string;

  constructor(id?: string) {
    this.id = id || randomUUID();
  }

  get value() {
    return this.id;
  }

  equals(id: Id): boolean {
    return this.id === id.value;
  }
}
