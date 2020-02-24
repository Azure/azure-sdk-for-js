import { SendableMessageInfo, toAmqpMessage } from "./serviceBusMessage";
import { throwTypeErrorIfParameterMissing } from "./util/errors";
import { ClientEntityContext } from "./clientEntityContext";
import { message as RheaMessageUtil, messageProperties } from "rhea-promise";
import { AmqpMessage } from "@azure/core-amqp";

export interface SendableMessageInfoBatch {
  /**
   * A value that is hashed and used by the Azure Event Hubs service to determine the partition to
   * which the events are sent. Use the `createBatch()` method on the `EventHubProducerClient` to
   * set the partitionKey.
   * @readonly
   * @internal
   * @ignore
   */
  readonly partitionKey?: string;

  /**
   * Id of the partition to which the batch of events are sent. Use the `createBatch()` method on
   * the `EventHubProducerClient` to set the partitionId.
   * @readonly
   * @internal
   * @ignore
   */
  readonly partitionId?: string;

  /**
   * Size of the batch in bytes after the events added to it have been encoded into a single AMQP
   * message.
   * @readonly
   */
  readonly sizeInBytes: number;

  /**
   * Number of events added to the batch.
   * @readonly
   */
  readonly count: number;

  /**
   * The maximum size of the batch, in bytes. The `tryAdd` function on the batch will return `false`
   * if the event being added causes the size of the batch to exceed this limit. Use the `createBatch()` method on
   * the `EventHubProducerClient` to set the maxSizeInBytes.
   * @readonly.
   */
  readonly maxSizeInBytes: number;

  /**
   * Adds an event to the batch if permitted by the batch's size limit.
   * **NOTE**: Always remember to check the return value of this method, before calling it again
   * for the next event.
   *
   * @param eventData  An individual event data object.
   * @returns A boolean value indicating if the event data has been added to the batch or not.
   */
  tryAdd(message: SendableMessageInfo): boolean;

  /**
   * The AMQP message containing encoded events that were added to the batch.
   * Used internally by the `sendBatch()` method on the `EventHubProducerClient`.
   * This is not meant for the user to use directly.
   *
   * @readonly
   * @internal
   * @ignore
   */
  readonly _message: Buffer | undefined;
}

/**
 * An internal class representing a batch of events which can be used to send events to Event Hub.
 *
 * @class
 * @internal
 * @ignore
 */
export class SendableMessageInfoBatchImpl implements SendableMessageInfoBatch {
  /**
   * @property Describes the amqp connection context for the Client.
   */
  private _context: ClientEntityContext;
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
   * EventDataBatch should not be constructed using `new EventDataBatch()`
   * Use the `createBatch()` method on your `EventHubProducer` instead.
   * @constructor
   * @internal
   * @ignore
   */
  constructor(context: ClientEntityContext, maxSizeInBytes: number) {
    this._context = context;
    this._maxSizeInBytes = maxSizeInBytes;
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
  get _message(): Buffer | undefined {
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
  public tryAdd(message: SendableMessageInfo): boolean {
    throwTypeErrorIfParameterMissing(this._context.namespace.connectionId, "tryAdd", "message");

    // Convert EventData to AmqpMessage.
    const amqpMessage = toAmqpMessage(message);
    amqpMessage.body = this._context.namespace.dataTransformer.encode(message.body);

    // Encode every amqp message and then convert every encoded message to amqp data section
    this._encodedMessages.push(RheaMessageUtil.encode(amqpMessage));

    const batchMessage: AmqpMessage = {
      body: RheaMessageUtil.data_sections(this._encodedMessages)
    };

    if (amqpMessage.message_annotations) {
      batchMessage.message_annotations = amqpMessage.message_annotations;
    }
    if (amqpMessage.application_properties) {
      batchMessage.application_properties = amqpMessage.application_properties;
    }
    for (const prop of messageProperties) {
      if ((amqpMessage as any)[prop]) {
        (batchMessage as any)[prop] = (amqpMessage as any)[prop];
      }
    }

    const encodedBatchMessage = RheaMessageUtil.encode(batchMessage);
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
