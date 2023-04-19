// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceBusMessage, toRheaMessage } from "./serviceBusMessage";
import {
  errorInvalidMessageTypeSingle,
  throwIfNotValidServiceBusMessage,
  throwTypeErrorIfParameterMissing,
} from "./util/errors";
import { ConnectionContext } from "./connectionContext";
import {
  MessageAnnotations,
  messageProperties as RheaMessagePropertiesList,
  message as RheaMessageUtil,
  Message as RheaMessage,
} from "rhea-promise";
import { TracingContext } from "@azure/core-tracing";
import { TryAddOptions } from "./modelsToBeSharedWithEventHubs";
import { AmqpAnnotatedMessage } from "@azure/core-amqp";
import { defaultDataTransformer } from "./dataTransformer";
import { instrumentMessage } from "./diagnostics/instrumentServiceBusMessage";

/**
 * @internal
 * The amount of bytes to reserve as overhead for a small message.
 */
const smallMessageOverhead = 5;
/**
 * @internal
 * The amount of bytes to reserve as overhead for a large message.
 */
const largeMessageOverhead = 8;
/**
 * @internal
 * The maximum number of bytes that a message may be to be considered small.
 */
const smallMessageMaxBytes = 255;

/**
 * A batch of messages that you can create using the {@link createBatch} method.
 *
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
   * The maximum size of the batch, in bytes. The `tryAddMessage` function on the batch will return `false`
   * if the message being added causes the size of the batch to exceed this limit. Use the `createMessageBatch()` method on
   * the `Sender` to set the maxSizeInBytes.
   * @readonly
   */
  readonly maxSizeInBytes: number;

  /**
   * Adds a message to the batch if permitted by the batch's size limit.
   * **NOTE**: Always remember to check the return value of this method, before calling it again
   * for the next event.
   *
   * @param message - The message to add to the batch.
   * @returns A boolean value indicating if the message has been added to the batch or not.
   */
  tryAddMessage(
    message: ServiceBusMessage | AmqpAnnotatedMessage,
    options?: TryAddOptions
  ): boolean;

  /**
   * The AMQP message containing encoded events that were added to the batch.
   * Used internally by the `sendBatch()` method on the `Sender`.
   * This is not meant for the user to use directly.
   *
   * @readonly
   * @internal
   * @hidden
   */
  _generateMessage(): Buffer;

  /**
   * Gets the "message" span contexts that were created when adding events to the batch.
   * Used internally by the `sendBatch()` method to set up the right spans in traces if tracing is enabled.
   * @internal
   * @hidden
   */
  readonly _messageSpanContexts: TracingContext[];
}

/**
 * An internal class representing a batch of messages which can be used to send messages to Service Bus.
 *
 * @internal
 */
export class ServiceBusMessageBatchImpl implements ServiceBusMessageBatch {
  /**
   * Current size of the batch in bytes.
   */
  private _sizeInBytes: number;
  /**
   * Encoded amqp messages.
   */
  private _encodedMessages: Buffer[] = [];
  /**
   * List of 'message' span contexts.
   */
  private _spanContexts: TracingContext[] = [];
  /**
   * ServiceBusMessageBatch should not be constructed using `new ServiceBusMessageBatch()`
   * Use the `createBatch()` method on your `Sender` instead.
   * @internal
   * @hidden
   */
  constructor(private _context: ConnectionContext, private _maxSizeInBytes: number) {
    this._sizeInBytes = 0;
    this._batchMessageProperties = {};
  }

  /**
   * The maximum size of the batch, in bytes.
   * @readonly
   */
  get maxSizeInBytes(): number {
    return this._maxSizeInBytes;
  }

  /**
   * Size of the `ServiceBusMessageBatch` instance after the messages added to it have been
   * encoded into a single AMQP message.
   * @readonly
   */
  get sizeInBytes(): number {
    return this._sizeInBytes;
  }

  /**
   * Number of messages in the `ServiceBusMessageBatch` instance.
   * @readonly
   */
  get count(): number {
    return this._encodedMessages.length;
  }

  /**
   * Gets the "message" span contexts that were created when adding messages to the batch.
   * @internal
   * @hidden
   */
  get _messageSpanContexts(): TracingContext[] {
    return this._spanContexts;
  }

  /**
   * Generates an AMQP message that contains the provided encoded messages and annotations.
   *
   * @param encodedMessages - The already encoded messages to include in the AMQP batch.
   * @param annotations - The message annotations to set on the batch.
   * @param applicationProperties - The application properties to set on the batch.
   * @param messageProperties - The message properties to set on the batch.
   */
  private _generateBatch(
    encodedMessages: Buffer[],
    annotations?: MessageAnnotations,
    applicationProperties?: { [key: string]: any },
    messageProperties?: { [key: string]: string }
  ): Buffer {
    const batchEnvelope: RheaMessage = {
      body: RheaMessageUtil.data_sections(encodedMessages),
      message_annotations: annotations,
      application_properties: applicationProperties,
    };
    if (messageProperties) {
      for (const prop of RheaMessagePropertiesList) {
        if ((messageProperties as any)[prop]) {
          (batchEnvelope as any)[prop] = (messageProperties as any)[prop];
        }
      }
    }
    return RheaMessageUtil.encode(batchEnvelope);
  }

  /**
   * Represents the single AMQP message which is the result of encoding all the events
   * added into the `ServiceBusMessageBatch` instance.
   *
   * This is not meant for the user to use directly.
   *
   * When the `ServiceBusMessageBatch` instance is passed to the `sendBatch()` method on the `Sender`,
   * this single batched AMQP message is what gets sent over the wire to the service.
   * @readonly
   */
  _generateMessage(): Buffer {
    return this._generateBatch(
      this._encodedMessages,
      this._batchAnnotations,
      this._batchApplicationProperties,
      this._batchMessageProperties
    );
  }

  /**
   * The message annotations to apply on the batch envelope.
   * This will reflect the message annotations on the first message
   * that was added to the batch.
   */
  private _batchAnnotations?: MessageAnnotations;
  /**
   * The message properties to apply on the batch envelope.
   * This will reflect the message properties on the first message
   * that was added to the batch.
   */
  private _batchMessageProperties?: { [key: string]: string };
  /**
   * The application properties to apply on the batch envelope.
   * This will reflect the application properties on the first message
   * that was added to the batch.
   */
  private _batchApplicationProperties?: { [key: string]: any };

  /**
   * Tries to add a message to the batch if permitted by the batch's size limit.
   * **NOTE**: Always remember to check the return value of this method, before calling it again
   * for the next message.
   *
   * @param originalMessage - An individual service bus message.
   * @returns A boolean value indicating if the message has been added to the batch or not.
   */
  public tryAddMessage(
    originalMessage: ServiceBusMessage | AmqpAnnotatedMessage,
    options: TryAddOptions = {}
  ): boolean {
    throwTypeErrorIfParameterMissing(this._context.connectionId, "message", originalMessage);
    throwIfNotValidServiceBusMessage(originalMessage, errorInvalidMessageTypeSingle);

    const { message, spanContext } = instrumentMessage(
      originalMessage,
      options,
      this._context.config.entityPath!,
      this._context.config.host,
      "publish"
    );

    // Convert ServiceBusMessage to AmqpMessage.
    const amqpMessage = toRheaMessage(message, defaultDataTransformer);

    const encodedMessage = RheaMessageUtil.encode(amqpMessage);
    let currentSize = this._sizeInBytes;

    // The first time an event is added, we need to calculate
    // the overhead of creating an AMQP batch, including the
    // message_annotations, application_properties and message_properties
    // that are taken from the 1st message.
    if (this.count === 0) {
      if (amqpMessage.message_annotations) {
        this._batchAnnotations = amqpMessage.message_annotations;
      }
      if (amqpMessage.application_properties) {
        this._batchApplicationProperties = amqpMessage.application_properties;
      }
      for (const prop of RheaMessagePropertiesList) {
        if ((amqpMessage as any)[prop]) {
          (this._batchMessageProperties as any)[prop] = (amqpMessage as any)[prop];
        }
      }
      // Figure out the overhead of creating a batch by generating an empty batch
      // with the expected batch annotations.
      currentSize += this._generateBatch(
        [],
        this._batchAnnotations,
        this._batchApplicationProperties,
        this._batchMessageProperties
      ).length;
    }

    const messageSize = encodedMessage.length;
    const messageOverhead =
      messageSize <= smallMessageMaxBytes ? smallMessageOverhead : largeMessageOverhead;
    currentSize += messageSize + messageOverhead;
    // Check if the size of the batch exceeds the maximum allowed size
    // once we add the new event to it.
    if (currentSize > this._maxSizeInBytes) {
      return false;
    }

    // The message will fit in the batch, so it is now safe to store it.
    this._encodedMessages.push(encodedMessage);
    if (spanContext) {
      this._spanContexts.push(spanContext);
    }

    this._sizeInBytes = currentSize;
    return true;
  }
}
