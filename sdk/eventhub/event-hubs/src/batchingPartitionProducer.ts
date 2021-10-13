// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AmqpAnnotatedMessage, delay } from "@azure/core-amqp";
import {
  EventData,
  EventDataBatch,
  EventHubBufferedProducerClientOptions,
  EventHubProducerClient,
  OperationOptions
} from "./index";
import { AwaitableQueue } from "./impl/awaitableQueue";
import { isDefined, isObjectWithProperties } from "./util/typeGuards";
import { AbortSignalLike } from "@azure/abort-controller";
import { getPromiseParts } from "./util/getPromiseParts";

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
    isFlushing: false
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
    producer
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
      this._startPublishLoop().catch(() => {
        /* TODO: Log error */
      });
    }
  }

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

  private async _startPublishLoop() {
    let batch: EventDataBatch | undefined = await this._createBatch();
    let futureEvent = this._eventQueue.shift();
    while (!this._loopAbortSignal.aborted) {
      try {
        if (!isDefined(batch)) {
          batch = await this._createBatch();
        }
        const timeSinceLastBatchCreation = Date.now() - this._lastBatchCreationTime;
        const maximumTimeToWaitForEvent = batch.count
          ? Math.max(this._maxWaitTimeInMs - timeSinceLastBatchCreation, 0)
          : this._maxWaitTimeInMs;

        const event = await Promise.race([futureEvent, delay<void>(maximumTimeToWaitForEvent)]);

        if (!event) {
          // We didn't receive an event within the allotted time.
          // Send the existing batch if it has events in it.
          if (batch.count) {
            await this._producer.sendBatch(batch);
            this._reportSuccess();
            batch = await this._createBatch();
          }
          continue;
        } else {
          // We received an event, so get a promise for the next one.
          futureEvent = this._eventQueue.shift();
        }

        const didAdd = batch.tryAdd(event);
        if (didAdd) {
          this._batchedEvents.push(event);
        }

        if (didAdd && batch.count >= this._maxBufferSize) {
          await this._producer.sendBatch(batch);
          this._reportSuccess();
          batch = await this._createBatch();
        } else if (!didAdd && batch.count) {
          // If the event wasn't able to be added and the current
          // batch isn't empty, attempt to send the current batch
          // and add the event to a new batch.
          await this._producer.sendBatch(batch);
          this._reportSuccess();
          batch = await this._createBatch();
        }

        if (!didAdd && !batch.tryAdd(event)) {
          this._reportFailure(new Error("Placeholder for max message size exceeded"), event);
        } else if (!didAdd) {
          this._batchedEvents.push(event);
        }
      } catch (err) {
        if (!isObjectWithProperties(err, ["name"]) || err.name !== "AbortError") {
          this._reportFailure(err);
          batch = undefined;
          this._batchedEvents = [];
        }
      }
    }
  }

  private async _createBatch(): Promise<EventDataBatch> {
    this._lastBatchCreationTime = Date.now();
    this._batchedEvents = [];
    const batch = await this._producer.createBatch({
      partitionId: this._partitionId
    });
    this._incrementReadiness();
    return batch;
  }

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

  private _reportSuccess() {
    this._bufferCount = this._bufferCount - this._batchedEvents.length;
    this._updateFlushState();
    this._onSendEventsSuccessHandler?.({
      events: this._batchedEvents,
      partitionId: this._partitionId
    }).catch(() => {
      /* TODO: Log error */
    });
  }

  private _reportFailure(err: any, event?: EventData | AmqpAnnotatedMessage) {
    this._bufferCount = this._bufferCount - (event ? 1 : this._batchedEvents.length);
    this._updateFlushState();
    this._onSendEventsErrorHandler({
      error: err,
      events: event ? [event] : this._batchedEvents,
      partitionId: this._partitionId
    }).catch(() => {
      /* TODO: Log error */
    });
  }

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
