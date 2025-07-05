
import { randomUUID } from "crypto";

export class Id {
  private readonly id: string;

  constructor(id?: string) {
    this.id = id || randomUUID();
  }

  get value() {
    return this.id;
  }
}
