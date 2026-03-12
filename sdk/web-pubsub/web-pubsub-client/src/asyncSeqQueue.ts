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
  // Sequence window:
  // - _oldestUnackedSequenceId: inclusive lower bound kept in _items.
  // - _nextEnqueueSequenceId: exclusive upper bound (next id to assign).
  // - _nextDequeueSequenceId: next id to replay/dequeue in [oldestUnacked, nextEnqueue].
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
    this._resolveWaiters();
    return sequenceId;
  }

  public async dequeue(abortSignal?: AbortSignalLike): Promise<SeqItem<T>> {
    if (this._closed) {
      throw this._closeReason;
    }

    if (abortSignal?.aborted) {
      throw new AbortError("The operation was aborted.");
    }

    const item = this._tryTakeNext();
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
    this._validateSequenceId(expectedSequenceId, "ack");
    const targetSequenceId = expectedSequenceId;
    if (targetSequenceId === this._oldestUnackedSequenceId) {
      return 0;
    }

    const acknowledgedCount = targetSequenceId - this._oldestUnackedSequenceId;
    // _items is anchored at _oldestUnackedSequenceId, so ack is a prefix trim.
    this._items.splice(0, Math.min(acknowledgedCount, this._items.length));
    this._oldestUnackedSequenceId = targetSequenceId;
    if (this._nextDequeueSequenceId < this._oldestUnackedSequenceId) {
      this._nextDequeueSequenceId = this._oldestUnackedSequenceId;
    }

    this._resolveWaiters();
    return acknowledgedCount;
  }

  /**
   * Rewinds dequeue cursor to replay unacked items.
   * @throws if `sequenceId` is outside [oldestUnackedSequenceId, nextEnqueueSequenceId].
   */
  public reset(sequenceId: number): void {
    this._validateSequenceId(sequenceId, "reset");
    this._nextDequeueSequenceId = sequenceId;
    this._resolveWaiters();
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
    this._resolveWaiters();
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

  /**
   * Examples (initialSequenceId = 1):
   * - Initial state: oldest=1, nextDequeue=1, nextEnqueue=1, items=[] -\> no item.
   * - After enqueue seq 1/2/3: oldest=1, nextDequeue=1, items=[1,2,3], itemIndex=0 -\> returns seq 1.
   * - After ack(3): oldest=3, nextDequeue=3, nextEnqueue=4, items=[3], itemIndex=0 -\> returns seq 3.
   */
  private _tryTakeNext(): SeqItem<T> | undefined {
    if (this._paused || this._nextDequeueSequenceId >= this._nextEnqueueSequenceId) {
      return undefined;
    }

    // Since _items[0] is the oldest unacked item, sequenceId maps to array index by offset.
    const itemIndex = this._nextDequeueSequenceId - this._oldestUnackedSequenceId;
    const item = this._items[itemIndex]!;
    this._nextDequeueSequenceId += 1;
    return item;
  }

  private _resolveWaiters(): void {
    if (this._paused) {
      return;
    }

    // Waiters are FIFO; each resolved waiter consumes one sequence item.
    while (this._dequeueWaiters.length > 0) {
      const item = this._tryTakeNext();
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

  private _validateSequenceId(sequenceId: number, operation: "ack" | "reset"): void {
    if (
      sequenceId < this._oldestUnackedSequenceId ||
      sequenceId > this._nextEnqueueSequenceId
    ) {
      throw new Error(
        `Invalid sequence id ${sequenceId} for ${operation}. Expected range [` +
          `${this._oldestUnackedSequenceId}, ${this._nextEnqueueSequenceId}].`,
      );
    }
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
