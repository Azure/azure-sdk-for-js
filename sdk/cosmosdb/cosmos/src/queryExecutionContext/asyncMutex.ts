// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * A simple non-reentrant async mutex for mutual exclusion.
 * Uses a FIFO queue of waiters to guarantee ordering.
 * @hidden
 */
export class AsyncMutex {
  private _locked = false;
  private _disposed = false;
  private _waitQueue: { resolve: () => void; reject: (err: Error) => void }[] = [];

  /**
   * Acquires the mutex. If the mutex is already held, the caller will wait
   * until it is released. Throws if the mutex has been disposed.
   */
  async acquire(): Promise<void> {
    if (this._disposed) {
      throw new Error("Cannot acquire a disposed mutex");
    }
    if (!this._locked) {
      this._locked = true;
      return;
    }
    return new Promise<void>((resolve, reject) => {
      this._waitQueue.push({ resolve, reject });
    });
  }

  /**
   * Releases the mutex. If there are waiters queued, the next one is granted
   * ownership immediately (the mutex stays locked).
   */
  release(): void {
    if (!this._locked) {
      return;
    }
    if (this._waitQueue.length > 0) {
      const next = this._waitQueue.shift()!;
      next.resolve();
    } else {
      this._locked = false;
    }
  }

  /**
   * Disposes the mutex, rejecting all pending acquirers so they don't hang forever.
   * Future acquire() calls will throw immediately.
   */
  dispose(): void {
    this._disposed = true;
    const err = new Error("Mutex disposed while waiting to acquire");
    while (this._waitQueue.length > 0) {
      const waiter = this._waitQueue.shift()!;
      waiter.reject(err);
    }
    this._locked = false;
  }
}
