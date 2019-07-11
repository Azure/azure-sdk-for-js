// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventData, toAmqpMessage } from "./eventData";
import { ConnectionContext } from "./connectionContext";
import { AmqpMessage } from "@azure/core-amqp";
import { messageProperties, message } from "rhea-promise";

/**
 * A helper class for creating a batch of events; taking into account the max size limit, so that the `EventDataBatch`
 * can be passed to the Send method of the `Sender` to send the `EventData` objects as a batch messages.
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
   * @property Array of event data objects.
   */
  events: EventData[] = [];
  /**
   * @property A value that is hashed to produce a partition assignment.
   * It guarantees that messages with the same partitionKey end up in the same partition.
   * Specifying this will throw an error if the producer was created using a `paritionId`.
   */
  partitionKey?: string | undefined;
  /**
   * @property The maximum size allowed for the batch.
   */
  private readonly maxSize: number;
  /**
   * @property Current size of the batch in bytes.
   */
  currentSize: number;
  /**
   * @property Array of amqp message objects.
   */
  private messages: AmqpMessage[] = [];

  /**
   * @constructor
   * @internal
   * @ignore
   */
  constructor(context: ConnectionContext, maxSizeInBytes: number, partitionKey: string) {
    this._context = context;
    this.maxSize = maxSizeInBytes;
    this.partitionKey = partitionKey;
    this.currentSize = 0;
  }

  /**
   * Tries to add an event data to the batch if permitted by the batch's size limit.
   * @param eventData  An individual event data object.
   * @returns A boolean value indicating if the event data has been added to the batch or not.
   */
  public tryAdd(eventData: EventData): boolean {
    const size = this.getTotalEventBatchSize(eventData);
    if (size > this.maxSize) {
      return false;
    }
    this.events.push(eventData);
    this.currentSize = size;
    return true;
  }

  /**
   * Provides total batch size.
   * @param eventData  An individual event data object.
   * @returns number
   */
  private getTotalEventBatchSize(event: EventData): number {
    // Convert EventData to AmqpMessage.
    const amqpMessage = toAmqpMessage(event, this.partitionKey!);
    amqpMessage.body = this._context.dataTransformer.encode(event.body);
    this.messages[this.events.length] = amqpMessage;
    // Encode every amqp message and then convert every encoded message to amqp data section
    const batchMessage: AmqpMessage = {
      body: message.data_sections(this.messages.map(message.encode))
    };

    // Set message_annotations, application_properties and properties of the first message as
    // that of the envelope (batch message).
    if (this.messages[0].message_annotations) {
      batchMessage.message_annotations = this.messages[0].message_annotations;
    }
    if (this.messages[0].application_properties) {
      batchMessage.application_properties = this.messages[0].application_properties;
    }
    for (const prop of messageProperties) {
      if ((this.messages[0] as any)[prop]) {
        (batchMessage as any)[prop] = (this.messages[0] as any)[prop];
      }
    }

    const encodedBatchMessage = message.encode(batchMessage);
    return encodedBatchMessage.byteLength;
  }
}
