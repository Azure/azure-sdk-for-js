// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AmqpAnnotatedMessage, delay } from "@azure/core-amqp";
import {
  EventData,
  EventDataBatch,
  EventHubBufferedProducerClientOptions,
  EventHubProducerClient,
  OperationOptions,
} from "./index";
import { isDefined, isObjectWithProperties } from "@azure/core-util";
import { AbortSignalLike } from "@azure/abort-controller";
import { AwaitableQueue } from "./impl/awaitableQueue";
import { getPromiseParts } from "./util/getPromiseParts";
import { logger } from "./log";

export interface BatchingPartitionChannelProps {
  loopAbortSignal: AbortSignalLike;
  maxBufferSize: number;
  maxWaitTimeInMs: number;
  partitionId: string;
  producer: EventHubProducerClient;
  /**
   * The handler to call once a batch has successfully published.
   */
  onSendEventsSuccessHandler?: EventHubBufferedProducerClientOptions["onSendEventsSuccessHandler"];
  /**
   * The handler to call when a batch fails to publish.
   */
  onSendEventsErrorHandler: EventHubBufferedProducerClientOptions["onSendEventsErrorHandler"];
}

/**
 * The `BatchingPartitionChannel` is responsible for accepting enqueued events
 * and optimally batching and sending them to an Event Hub.
 * @internal
 */
export class BatchingPartitionChannel {
  private _eventQueue = new AwaitableQueue<EventData | AmqpAnnotatedMessage>();
  private _batchedEvents: Array<EventData | AmqpAnnotatedMessage> = [];
  private _bufferCount: number = 0;
  private _readyQueue: Array<{
    resolve: (value: void) => void;
    reject: (reason?: any) => void;
  }> = [];
  private _flushState:
    | { isFlushing: false }
    | { isFlushing: true; currentPromise: Promise<void>; resolve: () => void } = {
    isFlushing: false,
  };
  private _isRunning: boolean = false;
  private _lastBatchCreationTime: number = 0;
  private _loopAbortSignal: AbortSignalLike;
  private _maxBufferSize: number;
  private _maxWaitTimeInMs: number;
  private _onSendEventsErrorHandler: EventHubBufferedProducerClientOptions["onSendEventsErrorHandler"];
  private _onSendEventsSuccessHandler?: EventHubBufferedProducerClientOptions["onSendEventsSuccessHandler"];

  private _partitionId: string;
  private _producer: EventHubProducerClient;

  constructor({
    loopAbortSignal,
    maxBufferSize,
    maxWaitTimeInMs,
    onSendEventsErrorHandler,
    onSendEventsSuccessHandler,
    partitionId,
    producer,
  }: BatchingPartitionChannelProps) {
    this._loopAbortSignal = loopAbortSignal;
    this._maxBufferSize = maxBufferSize;
    this._maxWaitTimeInMs = maxWaitTimeInMs;
    this._onSendEventsErrorHandler = onSendEventsErrorHandler;
    this._onSendEventsSuccessHandler = onSendEventsSuccessHandler;
    this._partitionId = partitionId;
    this._producer = producer;
  }

  getCurrentBufferedCount(): number {
    return this._bufferCount;
  }

  async enqueueEvent(event: EventData | AmqpAnnotatedMessage): Promise<void> {
    await this._ready();
    this._eventQueue.push(event);
    this._bufferCount++;

    if (!this._isRunning) {
      this._isRunning = true;
      this._startPublishLoop().catch((e) => {
        logger.error(
          `The following error occured during batch creation or sending: ${JSON.stringify(
            e,
            undefined,
            "  "
          )}`
        );
      });
    }
  }

  /**
   * Sets the flush state so that no new events can be enqueued until
   * all the currently buffered events are sent to the Event Hub.
   *
   * Returns a promise that resolves once flushing is complete.
   */
  async flush(_options: OperationOptions = {}): Promise<void> {
    const state = this._flushState;
    if (state.isFlushing) {
      return state.currentPromise;
    }

    if (this.getCurrentBufferedCount() === 0) {
      return Promise.resolve();
    }

    const { promise, resolve } = getPromiseParts<void>();
    this._flushState = { isFlushing: true, currentPromise: promise, resolve };

    return promise;
  }

  /**
   * Returns a promise that resolves once there is room for events to be added
   * to the buffer.
   */
  private _ready(): Promise<void> {
    const currentBufferedCount = this.getCurrentBufferedCount();

    // If the buffer isn't full and we don't have any pending `ready()` calls,
    // then it's safe to return right away.
    if (
      currentBufferedCount < this._maxBufferSize &&
      !this._readyQueue.length &&
      !this._flushState.isFlushing
    ) {
      return Promise.resolve();
    }

    const { promise: readyPromise, reject, resolve } = getPromiseParts<void>();
    this._readyQueue.push({ resolve, reject });

    return readyPromise;
  }

  /**
   * Starts the loop that creates batches and sends them to the Event Hub.
   *
   * The loop will run until the `_loopAbortSignal` is aborted.
   */
  private async _startPublishLoop() {
    let batch: EventDataBatch | undefined;
    let futureEvent = this._eventQueue.shift();
    // `eventToAddToBatch` is used to keep track of an event that has been removed
    // from the queue, but has not yet been added to a batch.
    // This prevents losing an event if a `sendBatch` or `createBatch` call fails
    // before the event is added to a batch.
    let eventToAddToBatch: EventData | AmqpAnnotatedMessage | undefined;
    while (!this._loopAbortSignal.aborted) {
      try {
        if (!isDefined(batch)) {
          batch = await this._createBatch();
        }
        const timeSinceLastBatchCreation = Date.now() - this._lastBatchCreationTime;
        const maximumTimeToWaitForEvent = batch.count
          ? Math.max(this._maxWaitTimeInMs - timeSinceLastBatchCreation, 0)
          : this._maxWaitTimeInMs;

        const event =
          eventToAddToBatch ??
          (await Promise.race([futureEvent, delay<void>(maximumTimeToWaitForEvent)]));

        if (!event) {
          // We didn't receive an event within the allotted time.
          // Send the existing batch if it has events in it.
          if (batch.count) {
            await this._producer.sendBatch(batch);
            this._reportSuccess();
            batch = await this._createBatch();
          }
          continue;
        } else if (!eventToAddToBatch) {
          eventToAddToBatch = event;
          // We received an event, so get a promise for the next one.
          futureEvent = this._eventQueue.shift();
        }

        const didAdd = batch.tryAdd(event);
        if (didAdd) {
          // This event will definitely make it to one of the user-provided handlers
          // since it was added to a batch.
          // Store it so we can return it in a handler later.
          this._batchedEvents.push(event);
          // Clear reference to existing event since it has been added to the batch.
          eventToAddToBatch = undefined;
        }

        if (didAdd && batch.count >= this._maxBufferSize) {
          // Whenever batch.count exceeds the max count of buffered events, send the batch.
          await this._producer.sendBatch(batch);
          this._reportSuccess();
          batch = await this._createBatch();
        } else if (!didAdd && batch.count) {
          // If the event wasn't able to be added and the current batch isn't empty,
          // attempt to send the current batch and add the event to a new batch.
          await this._producer.sendBatch(batch);
          this._reportSuccess();
          batch = await this._createBatch();
        }

        if (!didAdd && !batch.tryAdd(event)) {
          // TODO: Report MaxMesageSizeExceeded error. Mimic service's error.
          this._reportFailure(new Error("Placeholder for max message size exceeded"), event);
        } else if (!didAdd) {
          // Handles the case where the event _was_ successfull added to the new batch.
          this._batchedEvents.push(event);
        }
        // Clear reference to existing event since it has been added to the batch.
        eventToAddToBatch = undefined;
      } catch (err: any) {
        if (!isObjectWithProperties(err, ["name"]) || err.name !== "AbortError") {
          this._reportFailure(err);
          batch = undefined;
          this._batchedEvents = [];
        }
      }
    }
  }

  /**
   * Helper method that returns an `EventDataBatch`.
   * This also has the side effects of
   *  - keeping track of batch creation time: needed for maxWaitTime calculations.
   *  - clearing reference to batched events.
   *  - incrementing the readiness: creating a new batch indicates the buffer
   *    should have room, so we can resolve some pending `ready()` calls.
   */
  private async _createBatch(): Promise<EventDataBatch> {
    this._lastBatchCreationTime = Date.now();
    this._batchedEvents = [];
    const batch = await this._producer.createBatch({
      partitionId: this._partitionId,
    });
    this._incrementReadiness();
    return batch;
  }

  /**
   * This method will resolve as many pending `ready()` calls as it can
   * based on how much space remains in the buffer.
   *
   * If the channel is currently flushing, this is a no-op. This prevents
   * `enqueueEvent` calls from adding the event to the buffer until flushing
   * completes.
   */
  private _incrementReadiness() {
    if (this._flushState.isFlushing) {
      return;
    }
    const currentBufferedCount = this.getCurrentBufferedCount();
    const num = Math.min(this._maxBufferSize - currentBufferedCount, this._readyQueue.length);
    for (let i = 0; i < num; i++) {
      this._readyQueue.shift()?.resolve();
    }
  }

  /**
   * Calls the user-provided `onSendEventsSuccessHandler` with the events
   * that were successfully sent.
   */
  private _reportSuccess() {
    this._bufferCount = this._bufferCount - this._batchedEvents.length;
    this._updateFlushState();
    try {
      this._onSendEventsSuccessHandler?.({
        events: this._batchedEvents,
        partitionId: this._partitionId,
      });
    } catch (e: unknown) {
      logger.error(
        `The following error occurred in the onSendEventsSuccessHandler: ${JSON.stringify(
          e,
          undefined,
          "  "
        )}`
      );
    }
  }

  /**
   * Calls the user-provided `onSendEventsErrorHandler` with an error and the events
   * that were not successfully sent.
   */
  private _reportFailure(err: any, event?: EventData | AmqpAnnotatedMessage) {
    this._bufferCount = this._bufferCount - (event ? 1 : this._batchedEvents.length);
    this._updateFlushState();
    try {
      this._onSendEventsErrorHandler({
        error: err,
        events: event ? [event] : this._batchedEvents,
        partitionId: this._partitionId,
      });
    } catch (e: unknown) {
      logger.error(
        `The following error occurred in the onSendEventsErrorHandler: ${JSON.stringify(
          e,
          undefined,
          "  "
        )}`
      );
    }
  }

  /**
   * Updates the channel's flush state once the size of the
   * event buffer has decreased to 0.
   */
  private _updateFlushState() {
    const state = this._flushState;
    if (!state.isFlushing || this.getCurrentBufferedCount() !== 0) {
      return;
    }

    state.resolve();

    this._flushState = { isFlushing: false };
    this._incrementReadiness();
  }
}
