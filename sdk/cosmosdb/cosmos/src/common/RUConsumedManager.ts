// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import semaphore from "semaphore";

/**
 * @hidden
 * @hidden
 * Specifies Net RUConsumed
 */
export class RUConsumedManager {
  private ruConsumed: number = 0;
  private semaphore: any;

  constructor() {
    this.semaphore = semaphore(1);
  }

  getRUConsumed(): Promise<number> {
    return new Promise((resolve) => {
      this.semaphore.take(() => {
        resolve(this.ruConsumed);
        this.semaphore.leave();
      });
    });
  }

  setRUConsumed(newValue: number): void {
    this.semaphore.take(() => {
      this.ruConsumed = newValue;
      this.semaphore.leave();
    });
  }

  addToRUConsumed(value: number): void {
    this.semaphore.take(() => {
      this.ruConsumed += value;
      this.semaphore.leave();
    });
  }
}
