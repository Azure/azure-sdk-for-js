// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

interface PendingRead<T> {
  resolve: (result: IteratorResult<T>) => void;
  reject: (reason: unknown) => void;
}

interface AsyncQueueOptions {
  onOverflow?: (error: Error) => void;
}

/** @internal */
export class AsyncQueue<T> implements AsyncIterator<T> {
  private readonly values: T[] = [];
  private readonly pendingReads: PendingRead<T>[] = [];
  private valueHead = 0;
  private pendingReadHead = 0;
  private terminalError?: Error;
  private isClosed = false;

  /**
   * @param capacity - Maximum number of buffered values before the queue fails with an overflow
   * error. Realtime sessions can produce events faster than the consumer iterates (or the caller
   * may never start iterating), so an unbounded buffer would otherwise grow without limit.
   */
  public constructor(
    private readonly capacity = 10_000,
    private readonly options: AsyncQueueOptions = {},
  ) {}

  public enqueue(value: T): void {
    if (this.isClosed) {
      return;
    }

    const pendingRead = this.takePendingRead();
    if (pendingRead) {
      pendingRead.resolve({ done: false, value });
      return;
    }
    if (this.values.length - this.valueHead >= this.capacity) {
      const error = new Error(
        `The voice-agent event queue exceeded its capacity of ${this.capacity} buffered event(s); the consumer is not iterating events fast enough.`,
      );
      this.fail(error);
      this.options.onOverflow?.(error);
      return;
    }
    this.values.push(value);
  }

  public close(): void {
    if (this.isClosed) {
      return;
    }

    this.isClosed = true;
    for (const pendingRead of this.pendingReads.slice(this.pendingReadHead)) {
      pendingRead.resolve({ done: true, value: undefined });
    }
    this.pendingReads.length = 0;
    this.pendingReadHead = 0;
  }

  public fail(error: Error): void {
    if (this.isClosed) {
      return;
    }

    this.isClosed = true;
    this.terminalError = error;
    for (const pendingRead of this.pendingReads.slice(this.pendingReadHead)) {
      pendingRead.reject(error);
    }
    this.pendingReads.length = 0;
    this.pendingReadHead = 0;
  }

  public next(): Promise<IteratorResult<T>> {
    if (this.valueHead < this.values.length) {
      const value = this.values[this.valueHead++];
      this.compactValues();
      return Promise.resolve({ done: false, value });
    }
    if (this.terminalError) {
      return Promise.reject(this.terminalError);
    }
    if (this.isClosed) {
      return Promise.resolve({ done: true, value: undefined });
    }

    return new Promise<IteratorResult<T>>((resolve, reject) => {
      this.pendingReads.push({ resolve, reject });
    });
  }

  private takePendingRead(): PendingRead<T> | undefined {
    if (this.pendingReadHead >= this.pendingReads.length) {
      return undefined;
    }
    const pendingRead = this.pendingReads[this.pendingReadHead++];
    this.compactPendingReads();
    return pendingRead;
  }

  private compactValues(): void {
    if (this.valueHead > 64 && this.valueHead * 2 >= this.values.length) {
      this.values.splice(0, this.valueHead);
      this.valueHead = 0;
    }
  }

  private compactPendingReads(): void {
    if (this.pendingReadHead > 64 && this.pendingReadHead * 2 >= this.pendingReads.length) {
      this.pendingReads.splice(0, this.pendingReadHead);
      this.pendingReadHead = 0;
    }
  }
}
