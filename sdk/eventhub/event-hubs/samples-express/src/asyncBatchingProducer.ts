/**
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT Licence.  
  
  This sample demonstrates a strategy for creating and sending
  batches of events to Event Hubs.
  
  The AsyncBatchingProducer optimizes for creating the fewest
  number of batches possible while sending events.
  It supports setting thresholds for both the maximum number of
  events allowed per batch, and the maximum amount of time
  between sending batches.
*/

import { AbortController, AbortError, AbortSignalLike } from "@azure/abort-controller";
import { EventData, EventDataBatch, EventHubProducerClient } from "@azure/event-hubs";

export interface AsyncBatchingProducerOptions {
  producer: EventHubProducerClient;
  maxWaitTimeInSeconds: number;
  maxBatchSize?: number;
}

export class AsyncBatchingProducer {
  private _abortController = new AbortController();
  private _lastBatchCreationTime: number = 0;
  private _eventQueue: AwaitableQueue<EventData> = new AwaitableQueue();
  private _maxBatchSize: number;
  private _maxWaitTimeInMs: number;
  private _producer: EventHubProducerClient;

  constructor(options: AsyncBatchingProducerOptions) {
    this._maxBatchSize = options.maxBatchSize ?? Infinity;
    this._maxWaitTimeInMs = options.maxWaitTimeInSeconds * 1000;
    this._producer = options.producer;
  }

  /**
   * Queues up the eventData so it can be sent to Event Hubs.
   */
  public send(eventData: EventData) {
    this._eventQueue.push(eventData);
  }

  /**
   * Stops the `AsyncBatchingProducer` from sending anymore events to Event Hubs.
   */
  public stop() {
    this._abortController.abort();
    return this._producer.close();
  }

  /**
   * Starts sending events to Event Hubs in the order they were received via `send()` calls.
   * This method will run continuously until `stop()` is called.
   */
  async start() {
    const abortSignal = this._abortController.signal;
    let batch = await this._createBatch();
    let futureEvent = this._eventQueue.shift();
    while (!abortSignal.aborted) {
      try {
        const timeSinceLastBatchCreation = Date.now() - this._lastBatchCreationTime;
        // If there aren't any events in the batch, wait the maximum amount of time for an event.
        const maximumTimeToWaitForEvent = batch.count
          ? Math.max(this._maxWaitTimeInMs - timeSinceLastBatchCreation, 0)
          : this._maxWaitTimeInMs;

        // Wait for either the next event, or for the allotted time to pass.
        const event = await Promise.race([
          futureEvent,
          wait(maximumTimeToWaitForEvent, abortSignal)
        ]);

        if (!event) {
          // We didn't receive an event within the allotted time.
          // Send the existing batch if it has events in it.
          if (batch.count) {
            await this._producer.sendBatch(batch, { abortSignal });
            batch = await this._createBatch();
          }
          continue;
        } else {
          // We received an event, so get a promise for the next one.
          futureEvent = this._eventQueue.shift();
        }

        // Attempt to add the event to the existing batch.
        const didAdd = batch.tryAdd(event);

        // If the event was added to the batch and we're now
        // at the max batch size, send the batch.
        if (didAdd && batch.count >= this._maxBatchSize) {
          await this._producer.sendBatch(batch, { abortSignal });
          batch = await this._createBatch();
        } else if (!didAdd && batch.count) {
          // If the event wasn't able to be added and the current
          // batch isn't empty, attempt to send the current batch
          // and add the event to a new batch.
          await this._producer.sendBatch(batch, { abortSignal });
          batch = await this._createBatch();
          // If the event still can't be added to an empty batch, just ignore it.
          batch.tryAdd(event);
        }
      } catch (err: any) {
        // Ignore `AbortError` since that gets thrown when `stop()` is called.
        if (err.name !== "AbortError") {
          console.error(`Encountered error: ${err}`);
        }
      }
    }
  }

  /**
   * Helper method that sets the lastBatchCreationTime and returns a new batch.
   */
  private _createBatch(): Promise<EventDataBatch> {
    this._lastBatchCreationTime = Date.now();
    return this._producer.createBatch();
  }
}

/**
 * This function returns a promise that resolves after the specified amount of time.
 * It also supports cancellation via passing in an `abortSignal`.
 * @param timeInMs - The amount of time in milliseconds the function should wait before resolving.
 * @param abortSignal - Used to support rejecting the promise immediately.
 */
function wait(timeInMs: number, abortSignal: AbortSignalLike): Promise<void> {
  return new Promise((resolve, reject) => {
    // Cancel quickly if the provided abortSignal has already been aborted.
    if (abortSignal.aborted) {
      return reject(new AbortError("The operation was cancelled."));
    }
    // Create an abort event listener that rejects the promise with an AbortError.
    // It also clears the existing setTimeout and removes itself from the abortSignal.
    const abortListener = () => {
      clearTimeout(tid);
      reject(new AbortError("This operation was cancelled."));
      abortSignal.removeEventListener("abort", abortListener);
    };
    // Create the timer that will resolve the promise.
    // It also ensures that abort event listener is removed from the abortSignal.
    const tid = setTimeout(() => {
      abortSignal.removeEventListener("abort", abortListener);
      resolve();
    }, timeInMs);
    // Add an abort listener so that the promise can be rejected if the user cancels their operation.
    abortSignal.addEventListener("abort", abortListener);
  });
}

/**
 * `AwaitableQueue` stores items in the order that they are received.
 *
 * This differs from ordinary Queues in that `shift` returns a Promise for a value.
 * This allows a consumer of the queue to request an item that the queue does not yet have.
 */
class AwaitableQueue<T> {
  private readonly _items: T[];

  private _nextItemResolve?: (item: T) => void;
  private _nextItemPromise?: Promise<T>;

  constructor(items?: T[]) {
    this._items = items ?? [];
  }

  public size(): number {
    return this._items.length;
  }

  /**
   * Returns a Promise that will resolve with the first item in the queue.
   */
  public shift(): Promise<T> {
    if (this._nextItemPromise) {
      return this._nextItemPromise;
    }

    const item = this._items.shift();
    if (typeof item !== "undefined") {
      return Promise.resolve(item);
    }

    this._nextItemPromise = new Promise<T>((resolve) => (this._nextItemResolve = resolve));

    return this._nextItemPromise;
  }

  /**
   * Appends new item to the queue.
   */
  public push(item: T): void {
    if (!this._resolveNextItem(item)) {
      this._items.push(item);
    }
  }

  private _resolveNextItem(item: T) {
    if (!this._nextItemResolve) {
      return false;
    }
    const resolve = this._nextItemResolve;
    this._nextItemResolve = undefined;
    this._nextItemPromise = undefined;
    resolve(item);
    return true;
  }
}
