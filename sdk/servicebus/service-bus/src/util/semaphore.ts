// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @internal
 * A simple Semaphore
 */
export class Semaphore {
  /**
   * The number of concurrent calls that can be made.
   */
  limit: number;
  private _queue: ((value?: void | PromiseLike<void> | undefined) => void)[] = [];
  private _used: number = 0;
  constructor(limit: number) {
    if (typeof limit !== "number") {
      throw new TypeError(`Expected limit to be a number, got ${typeof limit}`);
    }

    if (limit < 1) {
      throw new Error("limit cannot be less than 1");
    }
    this.limit = limit;
  }

  /**
   * Acquires a lock from the semaphore, returns a Promise that resolves when the caller holds
   * a lock.
   */
  acquire(): Promise<void> {
    if (this._used < this.limit) {
      this._used += 1;
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      this._queue.push(resolve);
    });
  }

  /**
   * Releases a lock back to the semaphore.
   */
  release(): void {
    if (this._queue.length) {
      const item = this._queue.shift();
      if (item) {
        item();
      }
    } else {
      this._used -= 1;
    }
  }

  /**
   * Aquires a lock from the semaphore and then execute the fn. If the fn returns a Promise,
   * wait for that promise to settle and then release the lock back to the semaphore.
   * @param fn - The function that needs to be executed in the ciritical region.
   * @returns A Promise that will settle with the return value of fn.
   */
  use<T>(fn: () => T | PromiseLike<T>): Promise<T> {
    return this.acquire()
      .then(fn)
      .then((val) => {
        this.release();
        return val;
      })
      .catch((err) => {
        this.release();
        throw err;
      });
  }

  /**
   * Provides the number of locks currently held.
   */
  currentLockCount(): number {
    return this._used;
  }

  /**
   * Provides the number of tasks waiting to acquire a lock.
   */
  awaitedTaskCount(): number {
    return this._queue.length;
  }
}
