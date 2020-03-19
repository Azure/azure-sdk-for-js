export class PerfStressTestError extends Error {
  constructor(message?: string) {
    // 'Error' breaks prototype chain here
    super(message);
    // Restores prototype chain:
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
