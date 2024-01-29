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
        this.semaphore.leave();
        resolve(this.ruConsumed);
      });
    });
  }

  addToRUConsumed(value: number): Promise<void> {
    return new Promise((resolve) => {
      this.semaphore.take(() => {
        this.ruConsumed += value;
        this.semaphore.leave();
        resolve();
      });
    });
  }
}
