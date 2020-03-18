import { ServiceBusMessage, toAmqpMessage } from "./serviceBusMessage";
import { throwTypeErrorIfParameterMissing } from "./util/errors";
import { ClientEntityContext } from "./clientEntityContext";
import { message as RheaMessageUtil, messageProperties } from "rhea-promise";
import { AmqpMessage } from "@azure/core-amqp";

/**
 * A batch of messages that you can create using the {@link createBatch} method.
 *
 * @export
 * @interface ServiceBusMessageBatch
 */
export interface ServiceBusMessageBatch {
  /**
   * Size of the batch in bytes after the events added to it have been encoded into a single AMQP
   * message.
   * @readonly
   */
  readonly sizeInBytes: number;

  /**
   * Number of messages added to the batch.
   * @readonly
   */
  readonly count: number;

  /**
   * The maximum size of the batch, in bytes. The `tryAdd` function on the batch will return `false`
   * if the message being added causes the size of the batch to exceed this limit. Use the `createBatch()` method on
   * the `Sender` to set the maxSizeInBytes.
   * @readonly.
   */
  readonly maxSizeInBytes: number;

  /**
   * Adds a message to the batch if permitted by the batch's size limit.
   * **NOTE**: Always remember to check the return value of this method, before calling it again
   * for the next event.
   *
   * @param message  An individual service bus message.
   * @returns A boolean value indicating if the message has been added to the batch or not.
   */
  tryAdd(message: ServiceBusMessage): boolean;

  /**
   * The AMQP message containing encoded events that were added to the batch.
   * Used internally by the `sendBatch()` method on the `Sender`.
   * This is not meant for the user to use directly.
   *
   * @readonly
   * @internal
   * @ignore
   */
  readonly _message: Buffer | undefined;
}

/**
 * An internal class representing a batch of messages which can be used to send messages to Service Bus.
 *
 * @class
 * @internal
 * @ignore
 */
export class ServiceBusMessageBatchImpl implements ServiceBusMessageBatch {
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
   * @property Number of messages in the batch.
   */
  private _count: number;
  /**
   * @property Encoded batch message.
   */
  private _batchMessage: Buffer | undefined;

  /**
   * ServiceBusMessageBatch should not be constructed using `new ServiceBusMessageBatch()`
   * Use the `createBatch()` method on your `Sender` instead.
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
   * @property Size of the `ServiceBusMessageBatch` instance after the messages added to it have been
   * encoded into a single AMQP message.
   * @readonly
   */
  get sizeInBytes(): number {
    return this._sizeInBytes;
  }

  /**
   * @property Number of messages in the `ServiceBusMessageBatch` instance.
   * @readonly
   */
  get count(): number {
    return this._count;
  }

  /**
   * @property Represents the single AMQP message which is the result of encoding all the events
   * added into the `ServiceBusMessageBatch` instance.
   *
   * This is not meant for the user to use directly.
   *
   * When the `ServiceBusMessageBatch` instance is passed to the `sendBatch()` method on the `Sender`,
   * this single batched AMQP message is what gets sent over the wire to the service.
   * @readonly
   */
  get _message(): Buffer | undefined {
    return this._batchMessage;
  }

  /**
   * Tries to add a message to the batch if permitted by the batch's size limit.
   * **NOTE**: Always remember to check the return value of this method, before calling it again
   * for the next message.
   *
   * @param message  An individual service bus message.
   * @returns A boolean value indicating if the message has been added to the batch or not.
   */
  public tryAdd(message: ServiceBusMessage): boolean {
    throwTypeErrorIfParameterMissing(this._context.namespace.connectionId, "tryAdd", "message");

    // Convert ServiceBusMessage to AmqpMessage.
    const amqpMessage = toAmqpMessage(message);
    amqpMessage.body = this._context.namespace.dataTransformer.encode(message.body);

    // Encode every amqp message and then convert every encoded message to amqp data section
    this._encodedMessages.push(RheaMessageUtil.encode(amqpMessage));

    const batchMessage: AmqpMessage = {
      body: RheaMessageUtil.data_sections(this._encodedMessages)
    };

    batchMessage.message_annotations = amqpMessage.message_annotations;
    batchMessage.application_properties = amqpMessage.application_properties;

    for (const prop of messageProperties) {
      (batchMessage as any)[prop] = (amqpMessage as any)[prop];
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
