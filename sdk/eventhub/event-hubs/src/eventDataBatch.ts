import { EventData, toAmqpMessage } from "./eventData";
import { ConnectionContext } from "./connectionContext";
import { AmqpMessage } from "@azure/core-amqp";
import { messageProperties, message } from "rhea-promise";

/**
 * A helper class for creating a batch of events; taking into account the max size limit, so that the `EventDataBatch`
 * can be passed to the Send method of the `Sender` to send the batch messages.
 * an `EventHubProducer`.
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
   * @property The maximum size limit for the batch.
   */
  private readonly maxSizeLimit: number = 4 * 1024 * 1024;
  /**
   * @property The maximum size allowed for the batch.
   */
  private readonly maxSize: number;
  /**
   * @property Current size of the batch in bytes.
   */
   currentSize: number;

  /**
   * @constructor
   * @internal
   * @ignore
   */
  constructor(context: ConnectionContext, maxSizeInBytes: number, partitionKey: string) {
    this._context = context;
    this.maxSize = Math.min(maxSizeInBytes, this.maxSizeLimit);
    this.partitionKey = partitionKey;
    this.currentSize = 0;
  }

  /**
   * Tries to add an event data to the batch if permitted by the batch's size limit.
   * @param eventData  An individual event data object.
   * @returns A boolean value indicating if the event data has been added to the batch or not.
   */
  public tryAdd(eventData: EventData): boolean {
   const size = this.getEventSizeForBatch(eventData);
    if (this.currentSize + size > this.maxSize) {
      return false;
    }
    this.events.push(eventData);
    this.currentSize += size;
    return true;
  }

  private getEventSizeForBatch(events: EventData): number {
    const messages: AmqpMessage[] = [];
    // Convert EventData to AmqpMessage.
      const amqpMessage = toAmqpMessage(events, this.partitionKey!);
      amqpMessage.body = this._context.dataTransformer.encode(events.body);
      messages[0] = amqpMessage;
    // Encode every amqp message and then convert every encoded message to amqp data section
    const batchMessage: AmqpMessage = {
      body: message.data_sections(messages.map(message.encode))
    };
    
    if(this.events.length === 0){
    // Set message_annotations, application_properties and properties of the first message as
    // that of the envelope (batch message).
    if (messages[0].message_annotations) {
      batchMessage.message_annotations = messages[0].message_annotations;
    }
    if (messages[0].application_properties) {
      batchMessage.application_properties = messages[0].application_properties;
    }
    for (const prop of messageProperties) {
      if ((messages[0] as any)[prop]) {
        (batchMessage as any)[prop] = (messages[0] as any)[prop];
      }
    }
  }
    const encodedBatchMessage = message.encode(batchMessage);
    return encodedBatchMessage.byteLength;
}
}
