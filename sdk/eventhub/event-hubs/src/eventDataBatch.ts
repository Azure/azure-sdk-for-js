// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventData, toAmqpMessage } from "./eventData";
import { ConnectionContext } from "./connectionContext";
import { AmqpMessage } from "@azure/core-amqp";
import { message } from "rhea-promise";
import { throwTypeErrorIfParameterMissing } from "./util/error";
import { Span, SpanContext } from "@opentelemetry/types";
import { instrumentEventData, TRACEPARENT_PROPERTY } from "./diagnostics/instrumentEventData";
import { createMessageSpan } from "./diagnostics/messageSpan";

/**
 * Checks if the provided eventDataBatch is an instance of `EventDataBatch`.
 * @param eventDataBatch The instance of `EventDataBatch` to verify.
 * @internal
 * @ignore
 */
export function isEventDataBatch(eventDataBatch: any): eventDataBatch is EventDataBatch {
  return (
    eventDataBatch &&
    typeof eventDataBatch.tryAdd === "function" &&
    typeof eventDataBatch.count === "number" &&
    typeof eventDataBatch.sizeInBytes === "number"
  );
}

/**
 * The set of options to configure the behavior of `tryAdd`.
 * - `parentSpan` : The `Span` or `SpanContext` to use as the `parent` of the span created while calling this operation.
 */
export interface TryAddOptions {
  /**
   * The `Span` or `SpanContext` to use as the `parent` of any spans created while adding events.
   */
  parentSpan?: Span | SpanContext;
}

/**
 * A interface representing a batch of events which can be passed to the `send` method of a `EventProducer` instance.
 * This batch is ensured to be under the maximum message size supported by Azure Event Hubs service.
 *
 * Use `createBatch()` method on the `EventHubProducer` to create an instance of `EventDataBatch`
 * instead of using `new EventDataBatch()`. You can specify an upper limit for the size of the batch
 * via options when calling `createBatch()`.
 *
 * Use the `tryAdd` function on the EventDataBatch to add events to the batch. This method will return
 * `false` after the upper limit is reached, therefore check the result before calling `tryAdd()` again.
 */
export interface EventDataBatch {
  /**
   * The partitionKey set during `EventDataBatch` creation. This value is hashed to
   * produce a partition assignment when the producer is created without a `partitionId`
   * If this value is set then partitionId can not be set.
   * @readonly
   */
  readonly partitionKey?: string;

  /**
   * The partitionId set during `EventDataBatch` creation. 
   * If this value is set then partitionKey can not be set.
   * @readonly
   */
  readonly partitionId?: string;  

  /**
   * Size of the `EventDataBatch` instance after the events added to it have been
   * encoded into a single AMQP message.
   * @readonly
   */
  readonly sizeInBytes: number;

  /**
   * Number of events in the `EventDataBatch` instance.
   * @readonly
   */
  readonly count: number;

  /**
   * The maximum size of the batch, in bytes.
   * @readonly.
   */
  readonly maxSizeInBytes: number;

 /**
   * Tries to add an event data to the batch if permitted by the batch's size limit.
   * **NOTE**: Always remember to check the return value of this method, before calling it again
   * for the next event.
   *
   * @param eventData  An individual event data object.
   * @returns A boolean value indicating if the event data has been added to the batch or not.
   */
  tryAdd(eventData: EventData, options?: TryAddOptions): boolean;
  
  /**
   * Represents the single AMQP message which is the result of encoding all the events
   * added into the `EventDataBatch` instance.
   *
   * This is not meant for the user to use directly.
   *
   * When the `EventDataBatch` instance is passed to the `send()` method on the `EventHubProducer`,
   * this single batched AMQP message is what gets sent over the wire to the service.
   * @readonly
   * @internal
   * @ignore
   */
  readonly batchMessage: Buffer | undefined;

    /**
   * Gets the "message" span contexts that were created when adding events to the batch.
   * @internal
   * @ignore
   */
  readonly _messageSpanContexts: SpanContext[];
}

/**
 * A class representing a batch of events which can be passed to the `send` method of a `EventProducer` instance.
 * This batch is ensured to be under the maximum message size supported by Azure Event Hubs service.
 *
 * Use `createBatch()` method on the `EventHubProducer` to create an instance of `EventDataBatch`
 * instead of using `new EventDataBatch()`. You can specify an upper limit for the size of the batch
 * via options when calling `createBatch()`.
 *
 * Use the `tryAdd` function on the EventDataBatch to add events to the batch. This method will return
 * `false` after the upper limit is reached, therefore check the result before calling `tryAdd()` again.
 * @class
 * @internal
 * @ignore
 */
export class EventDataBatchImpl implements EventDataBatch {
  /**
   * @property Describes the amqp connection context for the Client.
   */
  private _context: ConnectionContext;
  /**
   * @property A value that is hashed to produce a partition assignment.
   * It guarantees that messages with the same partitionKey end up in the same partition.
   * Specifying this will throw an error if the producer was created using a `paritionId`.
   */
  private _partitionKey?: string;
  /**
   * @property The maximum size allowed for the batch.
   */
  private _maxSizeInBytes: number;
  /**
   * @property Current size of the batch in bytes.
   */
  private _sizeInBytes: number;
  /**
   * @property Encoded amqp messages.
   */
  private _encodedMessages: Buffer[] = [];
  /**
   * @property Number of events in the batch.
   */
  private _count: number;
  /**
   * @property Encoded batch message.
   */
  private _batchMessage: Buffer | undefined;
  /**
   * List of 'message' span contexts.
   */
  private _spanContexts: SpanContext[] = [];

  /**
   * EventDataBatch should not be constructed using `new EventDataBatch()`
   * Use the `createBatch()` method on your `EventHubProducer` instead.
   * @constructor
   * @internal
   * @ignore
   */
  constructor(context: ConnectionContext, maxSizeInBytes: number, partitionKey?: string, private _partitionId?: string) {
    this._context = context;
    this._maxSizeInBytes = maxSizeInBytes;
    this._partitionKey = partitionKey;
    this._sizeInBytes = 0;
    this._count = 0;
  }

  /**
   * @property The maximum size of the batch, in bytes.
   * @readonly
   */
  get maxSizeInBytes(): number {
    return this._maxSizeInBytes;
  }

  /**
   * @property The partitionKey set during `EventDataBatch` creation. This value is hashed to
   * produce a partition assignment when the producer is created without a `partitionId`
   * @readonly
   */
  get partitionKey(): string | undefined {
    return this._partitionKey;
  }
  
  /**
   * The partitionId set during `EventDataBatch` creation. 
   * If this value is set then partitionKey can not be set.
   * @readonly
   */
  get partitionId(): string | undefined {
    return this._partitionId;
  }

  /**
   * @property Size of the `EventDataBatch` instance after the events added to it have been
   * encoded into a single AMQP message.
   * @readonly
   */
  get sizeInBytes(): number {
    return this._sizeInBytes;
  }

  /**
   * @property Number of events in the `EventDataBatch` instance.
   * @readonly
   */
  get count(): number {
    return this._count;
  }

  /**
   * @property Represents the single AMQP message which is the result of encoding all the events
   * added into the `EventDataBatch` instance.
   *
   * This is not meant for the user to use directly.
   *
   * When the `EventDataBatch` instance is passed to the `send()` method on the `EventHubProducer`,
   * this single batched AMQP message is what gets sent over the wire to the service.
   * @readonly
   */
  get batchMessage(): Buffer | undefined {
    return this._batchMessage;
  }

  /**
   * Gets the "message" span contexts that were created when adding events to the batch.
   * @internal
   * @ignore
   */
  get _messageSpanContexts(): SpanContext[] {
    return this._spanContexts;
  }

  /**
   * Tries to add an event data to the batch if permitted by the batch's size limit.
   * **NOTE**: Always remember to check the return value of this method, before calling it again
   * for the next event.
   *
   * @param eventData  An individual event data object.
   * @returns A boolean value indicating if the event data has been added to the batch or not.
   */
  public tryAdd(eventData: EventData, options: TryAddOptions = {}): boolean {
    throwTypeErrorIfParameterMissing(this._context.connectionId, "tryAdd", "eventData", eventData);

    // check if the event has already been instrumented
    const previouslyInstrumented = Boolean(
      eventData.properties && eventData.properties[TRACEPARENT_PROPERTY]
    );
    if (!previouslyInstrumented) {
      const messageSpan = createMessageSpan(options.parentSpan);
      eventData = instrumentEventData(eventData, messageSpan);
      this._spanContexts.push(messageSpan.context());
      messageSpan.end();
    }
    // Convert EventData to AmqpMessage.
    const amqpMessage = toAmqpMessage(eventData, this._partitionKey);
    amqpMessage.body = this._context.dataTransformer.encode(eventData.body);

    // Encode every amqp message and then convert every encoded message to amqp data section
    this._encodedMessages.push(message.encode(amqpMessage));

    const batchMessage: AmqpMessage = {
      body: message.data_sections(this._encodedMessages)
    };

    if (amqpMessage.message_annotations) {
      batchMessage.message_annotations = amqpMessage.message_annotations;
    }

    const encodedBatchMessage = message.encode(batchMessage);
    const currentSize = encodedBatchMessage.length;

    // this._batchMessage will be used for final send operation
    if (currentSize > this._maxSizeInBytes) {
      this._encodedMessages.pop();
      if (
        !previouslyInstrumented &&
        Boolean(eventData.properties && eventData.properties[TRACEPARENT_PROPERTY])
      ) {
        this._spanContexts.pop();
      }
      return false;
    }
    this._batchMessage = encodedBatchMessage;
    this._sizeInBytes = currentSize;
    this._count++;
    return true;
  }
}
