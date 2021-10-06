// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AmqpAnnotatedMessage, delay } from "@azure/core-amqp";
import { EventData, EventDataBatch, EventHubProducerClient } from ".";
import { AwaitableQueue } from "./impl/awaitableQueue";

export interface BatchingPartitionChannelProps {
  maxBufferSize: number;
  maxWaitTimeInMs: number;

  partitionId: string;
  producer: EventHubProducerClient;
}

export class BatchingPartitionChannel {
  private _currentBatch?: EventDataBatch;
  private _eventQueue = new AwaitableQueue<EventData | AmqpAnnotatedMessage>();

  private _isRunning: boolean = false;
  private _lastBatchCreationTime: number = 0;
  private _maxBufferSize: number;
  private _maxWaitTimeInMs: number;
  private _partitionId: string;
  private _producer: EventHubProducerClient;

  constructor({
    maxBufferSize,
    maxWaitTimeInMs,
    partitionId,
    producer
  }: BatchingPartitionChannelProps) {
    this._maxBufferSize = maxBufferSize;
    this._maxWaitTimeInMs = maxWaitTimeInMs;
    this._partitionId = partitionId;
    this._producer = producer;
  }

  getCurrentBufferedCount(): number {
    return this._eventQueue.size() + (this._currentBatch?.count ?? 0);
  }

  async enqueueEvent(event: EventData | AmqpAnnotatedMessage): Promise<void> {
    // TODO: Add back-pressure
    this._eventQueue.push(event);

    if (!this._isRunning) {
      this._isRunning = true;
      this._startPublishLoop().catch(() => {
        /* TODO: Log error */
      });
    }
  }

  private async _startPublishLoop() {
    let batch = await this._createBatch();
    let futureEvent = this._eventQueue.shift();
    while (true) {
      try {
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
            batch = await this._createBatch();
          }
          continue;
        } else {
          // We received an event, so get a promise for the next one.
          futureEvent = this._eventQueue.shift();
        }

        const didAdd = batch.tryAdd(event);

        if (didAdd && batch.count >= this._maxBufferSize) {
          await this._producer.sendBatch(batch);
          batch = await this._createBatch();
        } else if (!didAdd && batch.count) {
          // If the event wasn't able to be added and the current
          // batch isn't empty, attempt to send the current batch
          // and add the event to a new batch.
          await this._producer.sendBatch(batch);
          batch = await this._createBatch();
        }

        if (!didAdd && !batch.tryAdd(event)) {
          throw new Error("Placeholder for max message size exceeded");
        }
      } catch (err) {
        // if (err.name !== "AbortError") {
        //   // TODO: Invoke user's error handler
        // }
      }
    }
  }

  private async _createBatch(): Promise<EventDataBatch> {
    this._lastBatchCreationTime = Date.now();
    this._currentBatch = await this._producer.createBatch({ partitionId: this._partitionId });
    return this._currentBatch;
  }
}
