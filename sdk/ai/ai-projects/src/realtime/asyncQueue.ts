// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

interface PendingRead<T> {
  resolve: (result: IteratorResult<T>) => void;
  reject: (reason: unknown) => void;
}

/** @internal */
export class AsyncQueue<T> implements AsyncIterator<T> {
  private readonly values: T[] = [];
  private readonly pendingReads: PendingRead<T>[] = [];
  private terminalError?: Error;
  private isClosed = false;

  public enqueue(value: T): void {
    if (this.isClosed) {
      return;
    }

    const pendingRead = this.pendingReads.shift();
    if (pendingRead) {
      pendingRead.resolve({ done: false, value });
    } else {
      this.values.push(value);
    }
  }

  public close(): void {
    if (this.isClosed) {
      return;
    }

    this.isClosed = true;
    for (const pendingRead of this.pendingReads.splice(0)) {
      pendingRead.resolve({ done: true, value: undefined });
    }
  }

  public fail(error: Error): void {
    if (this.isClosed) {
      return;
    }

    this.isClosed = true;
    this.terminalError = error;
    for (const pendingRead of this.pendingReads.splice(0)) {
      pendingRead.reject(error);
    }
  }

  public next(): Promise<IteratorResult<T>> {
    const value = this.values.shift();
    if (value !== undefined) {
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
}
