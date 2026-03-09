// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import { AbortError } from "@azure/abort-controller";

export interface SeqItem<T> {
  sequenceId: number;
  value: T;
}

interface Deferred<T> {
  promise: Promise<T>;
  resolve(value: T): void;
  reject(reason?: unknown): void;
}

interface DequeueWaiter<T> {
  deferred: Deferred<SeqItem<T>>;
  abortSignal?: AbortSignalLike;
  onAbort?: () => void;
}

/**
 * A replayable async queue with sequence ids.
 * - `enqueue` appends a new item and returns its sequence id.
 * - `dequeue` waits until one item is available.
 * - `ack(expectedSequenceId)` removes items with sequence id before `expectedSequenceId`.
 * - `reset(sequenceId)` rewinds dequeue position to replay unacked items.
 */
export class AsyncSeqQueue<T> {
  private readonly _items: SeqItem<T>[] = [];
  private readonly _dequeueWaiters: DequeueWaiter<T>[] = [];
  private _closed = false;
  private _paused = false;
  private _closeReason: unknown;
  private _oldestUnackedSequenceId: number;
  private _nextEnqueueSequenceId: number;
  private _nextDequeueSequenceId: number;

  constructor(initialSequenceId = 1) {
    this._oldestUnackedSequenceId = initialSequenceId;
    this._nextEnqueueSequenceId = initialSequenceId;
    this._nextDequeueSequenceId = initialSequenceId;
    this._closeReason = new Error("Queue is closed.");
  }

  public get oldestUnackedSequenceId(): number {
    return this._oldestUnackedSequenceId;
  }

  public get latestEnqueuedSequenceId(): number {
    return this._nextEnqueueSequenceId - 1;
  }

  public get nextDequeueSequenceId(): number {
    return this._nextDequeueSequenceId;
  }

  public get size(): number {
    return this._items.length;
  }

  public async enqueue(value: T): Promise<number> {
    if (this._closed) {
      throw this._closeReason;
    }

    const sequenceId = this._nextEnqueueSequenceId++;
    this._items.push({ sequenceId, value });
    this._drainDequeueWaiters();
    return sequenceId;
  }

  public async dequeue(abortSignal?: AbortSignalLike): Promise<SeqItem<T>> {
    if (this._closed) {
      throw this._closeReason;
    }

    if (abortSignal?.aborted) {
      throw new AbortError("The operation was aborted.");
    }

    const item = this._takeNextIfAvailableAndActive();
    if (item != null) {
      return item;
    }

    const waiter: DequeueWaiter<T> = {
      deferred: createDeferred<SeqItem<T>>(),
      abortSignal,
    };

    if (abortSignal != null) {
      const onAbort = (): void => {
        this._removeWaiter(waiter);
        waiter.deferred.reject(new AbortError("The operation was aborted."));
      };
      waiter.onAbort = onAbort;
      abortSignal.addEventListener("abort", onAbort);
    }

    this._dequeueWaiters.push(waiter);
    return waiter.deferred.promise;
  }

  /**
   * Marks data as acknowledged.
   * @param expectedSequenceId - The next sequence id expected by the consumer.
   * @returns Number of items removed from the queue.
   */
  public ack(expectedSequenceId: number): number {
    const normalizedExpectedSequenceId = this._normalizeSequenceId(expectedSequenceId);
    if (normalizedExpectedSequenceId === this._oldestUnackedSequenceId) {
      return 0;
    }

    const acknowledgedCount = normalizedExpectedSequenceId - this._oldestUnackedSequenceId;
    this._items.splice(0, Math.min(acknowledgedCount, this._items.length));
    this._oldestUnackedSequenceId = normalizedExpectedSequenceId;
    if (this._nextDequeueSequenceId < this._oldestUnackedSequenceId) {
      this._nextDequeueSequenceId = this._oldestUnackedSequenceId;
    }

    this._drainDequeueWaiters();
    return acknowledgedCount;
  }

  public reset(sequenceId: number): void {
    this._nextDequeueSequenceId = this._normalizeSequenceId(sequenceId);
    this._drainDequeueWaiters();
  }

  public pause(): void {
    if (this._closed) {
      return;
    }

    this._paused = true;
  }

  public resume(): void {
    if (this._closed) {
      return;
    }

    this._paused = false;
    this._drainDequeueWaiters();
  }

  public close(reason?: unknown): void {
    if (this._closed) {
      return;
    }

    this._closed = true;
    this._closeReason = reason ?? this._closeReason;
    while (this._dequeueWaiters.length > 0) {
      const waiter = this._dequeueWaiters.shift()!;
      this._disposeWaiter(waiter);
      waiter.deferred.reject(this._closeReason);
    }
  }

  private _takeNextIfAvailableAndActive(): SeqItem<T> | undefined {
    if (this._paused) {
      return undefined;
    }

    if (this._nextDequeueSequenceId < this._oldestUnackedSequenceId) {
      this._nextDequeueSequenceId = this._oldestUnackedSequenceId;
    }

    if (this._nextDequeueSequenceId >= this._nextEnqueueSequenceId) {
      return undefined;
    }

    const index = this._nextDequeueSequenceId - this._oldestUnackedSequenceId;
    if (index < 0 || index >= this._items.length) {
      return undefined;
    }

    const item = this._items[index];
    if (item.sequenceId !== this._nextDequeueSequenceId) {
      return undefined;
    }

    this._nextDequeueSequenceId += 1;
    return item;
  }

  private _drainDequeueWaiters(): void {
    if (this._paused) {
      return;
    }

    while (this._dequeueWaiters.length > 0) {
      const item = this._takeNextIfAvailableAndActive();
      if (item == null) {
        return;
      }

      const waiter = this._dequeueWaiters.shift()!;
      this._disposeWaiter(waiter);
      waiter.deferred.resolve(item);
    }
  }

  private _disposeWaiter(waiter: DequeueWaiter<T>): void {
    if (waiter.abortSignal != null && waiter.onAbort != null) {
      waiter.abortSignal.removeEventListener("abort", waiter.onAbort);
    }
  }

  private _removeWaiter(waiter: DequeueWaiter<T>): void {
    const index = this._dequeueWaiters.indexOf(waiter);
    if (index >= 0) {
      this._dequeueWaiters.splice(index, 1);
    }
    this._disposeWaiter(waiter);
  }

  private _normalizeSequenceId(sequenceId: number): number {
    if (sequenceId < this._oldestUnackedSequenceId) {
      return this._oldestUnackedSequenceId;
    }

    if (sequenceId > this._nextEnqueueSequenceId) {
      return this._nextEnqueueSequenceId;
    }

    return sequenceId;
  }
}

function createDeferred<T>(): Deferred<T> {
  let resolvePromise!: (value: T) => void;
  let rejectPromise!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });
  return {
    promise,
    resolve: resolvePromise,
    reject: rejectPromise,
  };
}
