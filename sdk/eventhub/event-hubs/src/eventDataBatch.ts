// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventData, toAmqpMessage } from "./eventData";
import { ConnectionContext } from "./connectionContext";
import { AmqpMessage } from "@azure/core-amqp";
import { message } from "rhea-promise";

/**
 * A class representing a batch of events which can be passed to the `send` method of a `EventConsumer` instance.
 * This batch is ensured to be under the maximum message size supported by Azure Event Hubs service.
 *
 * Use the `tryAdd` function on the EventDataBatch to add events in a batch.
 * @class
 */
export class EventDataBatch {
  /**
   * @property Describes the amqp connection context for the Client.
   */
  private _context: ConnectionContext;
  /**
   * @property Total length of events.
   */
  private _eventsLength: number;
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
  private _size: number;
  /**
   * @property Encoded amqp messages.
   */
  private _encodedMessages: Buffer[] = [];
  /**
   * @property Encoded batch message.
   */
  private _batchMessage: Buffer | undefined;

  /**
   * @constructor
   * @internal
   * @ignore
   */
  constructor(context: ConnectionContext, maxSizeInBytes: number, partitionKey?: string) {
    this._context = context;
    this._maxSizeInBytes = maxSizeInBytes;
    this._partitionKey = partitionKey;
    this._size = 0;
    this._eventsLength = 0;
  }

  /**
   * @property The partitionKey set during `EventDataBatch` creation. This value is hashed to produce a partition assignment when the consumer is created without a `partitionId`
   * @readonly
   */
  get partitionKey(): string | undefined {
    return this._partitionKey;
  }

  /**
   * @property Size of a batch of events.
   * @readonly
   */
  get size(): number | undefined {
    return this._size;
  }

   /**
   * @property Encoded batch message.
   * @readonly
   */
  get batchMessage(): Buffer | undefined {
    return this._batchMessage;
  }

  /**
   * Tries to add an event data to the batch if permitted by the batch's size limit.
   * @param eventData  An individual event data object.
   * @returns A boolean value indicating if the event data has been added to the batch or not.
   */
  public tryAdd(eventData: EventData): boolean {
    const currentSize = this.getEventBatchSize(eventData);
    if (currentSize > this._maxSizeInBytes) {
      return false;
    }
    this._eventsLength++;
    this._size = currentSize;
    return true;
  }

  /**
   * Provides total batch size.
   * @param eventData  An individual event data object.
   * @returns number
   */
  private getEventBatchSize(event: EventData): number {
    // Convert EventData to AmqpMessage.
    const amqpMessage = toAmqpMessage(event, this._partitionKey);
    amqpMessage.body = this._context.dataTransformer.encode(event.body);

    // Encode every amqp message and then convert every encoded message to amqp data section
    this._encodedMessages[this._eventsLength] = message.encode(amqpMessage);

    const batchMessage: AmqpMessage = {
      body: message.data_sections(this._encodedMessages)
    };

    if (amqpMessage.message_annotations) {
      batchMessage.message_annotations = amqpMessage.message_annotations;
    }

    const encodedBatchMessage = message.encode(batchMessage);

    // this.encodedBatchMessage will be used for final send operation
    if (encodedBatchMessage.length < this._maxSizeInBytes) {
      this._batchMessage = encodedBatchMessage;
    } else {
      this._encodedMessages.pop();
    }
    return encodedBatchMessage.length;
  }
}
