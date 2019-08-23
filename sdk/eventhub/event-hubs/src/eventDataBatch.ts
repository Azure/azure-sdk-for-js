// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventData, toAmqpMessage } from "./eventData";
import { ConnectionContext } from "./connectionContext";
import { AmqpMessage } from "@azure/core-amqp";
import { message } from "rhea-promise";
import { throwTypeErrorIfParameterMissing } from "./util/error";

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
 */
export class EventDataBatch {
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
  private readonly _maxSizeInBytes: number;
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
   * EventDataBatch should not be constructed using `new EventDataBatch()`
   * Use the `createBatch()` method on your `EventHubProducer` instead.
   * @constructor
   * @internal
   * @ignore
   */
  constructor(context: ConnectionContext, maxSizeInBytes: number, partitionKey?: string) {
    this._context = context;
    this._maxSizeInBytes = maxSizeInBytes;
    this._partitionKey = partitionKey;
    this._sizeInBytes = 0;
    this._count = 0;
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
   * Tries to add an event data to the batch if permitted by the batch's size limit.
   * **NOTE**: Always remember to check the return value of this method, before calling it again
   * for the next event.
   * 
   * @param eventData  An individual event data object.
   * @returns A boolean value indicating if the event data has been added to the batch or not.
   */
  public tryAdd(eventData: EventData): boolean {
    throwTypeErrorIfParameterMissing(this._context.connectionId, "eventData", eventData);
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
      return false;
    }
    this._batchMessage = encodedBatchMessage;
    this._sizeInBytes = currentSize;
    this._count++;
    return true;
  }
}
