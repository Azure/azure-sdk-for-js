// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import semaphore from "semaphore";
/**
 * Semaphores and locks for execution of Bulk.
 * This class controls number of concurrent requests for bulk per partition
 * and helps in blocking requests to a partition upon encountering 410 error.
 * @hidden
 */
export class Limiter {
  // semaphore to control number of concurrent requests for a partition.
  private limiter: semaphore.Semaphore;
  //  flag indicating whether dispatch has been stopped due to 410 error
  private dispatchStopped: boolean = false;
  // read write lock to safely control access to `dispatchStopped` flag
  private readWriteLock: ReadWriteLock;

  constructor(capacity: number) {
    this.limiter = semaphore(capacity);
    this.readWriteLock = new ReadWriteLock();
  }

  /**
   * acquires a slot to execute specified callback
   * @param callback - callback function to take the slot
   */
  take(callback: () => void): void {
    this.limiter.take(() => {
      callback();
    });
  }

  /**
   * @returns number of currently acquired slots
   */
  current(): number {
    return this.limiter.current;
  }

  /**
   * releases the specified number of slots
   * @param number - number of slots to release
   */
  leave(number?: number): void {
    this.limiter.leave(number);
  }

  /**
   * checks if we have encountered 410 error during bulk and stopped dispatch
   * @returns true if dispatch is stopped
   */
  async isStopped(): Promise<boolean> {
    await this.readWriteLock.acquireRead();
    const stopDispatch = this.dispatchStopped;
    this.readWriteLock.releaseRead();
    return stopDispatch;
  }

  /**
   * stops dispatching by setting the `dispatchStopped` flag to `true`.
   */
  async stopDispatch(): Promise<void> {
    await this.readWriteLock.acquireWrite();
    this.dispatchStopped = true;
    this.readWriteLock.releaseWrite();
  }
}

/**
 * ReadWriteLock class to manage read and write locks
 */
export class ReadWriteLock {
  private readers = 0; // Count of active readers
  private writer = false; // Indicates if a writer is active
  private waitingWriters: Array<() => void> = []; // Queue for waiting writers
  private waitingReaders: Array<() => void> = []; // Queue for waiting readers
  private mutex = semaphore(1);

  /**
   * Acquire a shared read lock.
   * Allows multiple readers unless a writer is active or waiting.
   */
  async acquireRead(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.mutex.take(() => {
        try {
          if (!this.writer && this.waitingWriters.length === 0) {
            // No writer active or waiting, proceed immediately
            this.readers++;
            resolve();
          } else {
            // Queue this reader
            this.waitingReaders.push(() => {
              this.readers++;
              resolve();
            });
          }
        } finally {
          this.mutex.leave();
        }
      });
    });
  }

  /**
   * Release a shared read lock.
   */
  releaseRead(): void {
    this.mutex.take(() => {
      try {
        if (this.readers <= 0) {
          throw new Error("Cannot release read lock: No active read lock held.");
        }
        this.readers--;
        if (this.readers === 0) {
          // Process the next writer or queued readers
          this._processNext();
        }
      } finally {
        this.mutex.leave();
      }
    });
  }

  /**
   * Acquire an exclusive write lock.
   * Blocks all readers and writers until the lock is released.
   */
  async acquireWrite(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.mutex.take(() => {
        try {
          if (!this.writer && this.readers === 0) {
            // No active readers or writers, proceed immediately
            this.writer = true;
            resolve();
          } else {
            // Queue this writer
            this.waitingWriters.push(() => {
              this.writer = true;
              resolve();
            });
          }
        } finally {
          this.mutex.leave();
        }
      });
    });
  }

  /**
   * Release an exclusive write lock.
   */
  releaseWrite(): void {
    this.mutex.take(() => {
      try {
        if (!this.writer) {
          this.mutex.leave();
          throw new Error("Cannot release write lock: No active write lock held.");
        }
        this.writer = false;
        // Process the next writer or queued readers
        this._processNext();
      } finally {
        this.mutex.leave();
      }
    });
  }

  /**
   * Internal method to process the next lock request.
   * Prioritizes writers over readers
   */
  private _processNext(): void {
    if (this.waitingWriters.length > 0) {
      // Writers take priority
      const resolveWriter = this.waitingWriters.shift();
      if (resolveWriter) {
        this.writer = true;
        resolveWriter();
      }
    } else if (this.waitingReaders.length > 0) {
      // Allow all queued readers to proceed
      while (this.waitingReaders.length > 0) {
        const resolveReader = this.waitingReaders.shift();
        if (resolveReader) {
          this.readers++;
          resolveReader();
        }
      }
    }
  }
}
