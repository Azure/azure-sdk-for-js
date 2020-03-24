// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Custom error class, to specify expected errors on PerfStress tests.
 */
export class PerfStressTestError extends Error {
  constructor(message?: string) {
    // 'Error' breaks prototype chain here
    super(message);
    // Restores prototype chain:
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
