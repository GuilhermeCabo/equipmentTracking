import { randomUUID } from 'node:crypto';

export class Uuid {
  static random() {
    const uuid = randomUUID();

    return uuid;
  }
}
