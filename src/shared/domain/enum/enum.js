export class Enum {
  static build(constants) {
    return {
      ...constants,
      keys: () => Object.keys(constants),
      values: () => Object.values(constants),
    };
  }
}
