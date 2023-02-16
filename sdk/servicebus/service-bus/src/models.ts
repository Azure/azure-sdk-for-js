// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptionsBase } from "./modelsToBeSharedWithEventHubs";
import Long from "long";
import { ServiceBusReceivedMessage } from "./serviceBusMessage";
import { ServiceBusError } from "./serviceBusError";

/**
 * Arguments to the `processError` callback.
 */
export interface ProcessErrorArgs {
  /**
   * The error.
   */
  error: Error | ServiceBusError;
  /**
   * The operation where the error originated.
   *
   * 'abandon': Errors that occur when if `abandon` is triggered automatically.
   * 'complete': Errors that occur when autoComplete completes a message.
   * 'processMessageCallback': Errors thrown from the user's `processMessage` callback passed to `subscribe`.
   * 'receive': Errors thrown when receiving messages.
   * 'renewLock': Errors thrown when automatic lock renewal fails.
   */
  errorSource: "abandon" | "complete" | "processMessageCallback" | "receive" | "renewLock";
  /**
   * The entity path for the current receiver.
   */
  entityPath: string;
  /**
   * The fully qualified namespace for the Service Bus.
   */
  fullyQualifiedNamespace: string;
  /**
   * The identifier of the client that raised this event.
   */
  identifier: string;
}

/**
 * @internal
 */
export interface InternalProcessErrorArgs extends Omit<ProcessErrorArgs, "errorSource"> {
  /**
   * The operation where the error originated.
   *
   * 'abandon': Errors that occur when if `abandon` is triggered automatically.
   * 'complete': Errors that occur when autoComplete completes a message.
   * 'processMessageCallback': Errors thrown from the user's `processMessage` callback passed to `subscribe`.
   * 'receive': Errors thrown when receiving messages.
   * 'renewLock': Errors thrown when automatic lock renewal fails.
   */
  errorSource: ProcessErrorArgs["errorSource"] | "internal";
}

/**
 * The general message handler interface (used for streamMessages).
 */
export interface MessageHandlers {
  /**
   * Handler that processes messages from service bus.
   *
   * @param message - A message received from Service Bus.
   */
  processMessage(message: ServiceBusReceivedMessage): Promise<void>;
  /**
   * Handler that processes errors that occur during receiving.
   *
   * This handler will be called for any error that occurs in the receiver when
   *   - receiving the message, or
   *   - executing your `processMessage` callback, or
   *   - receiver is completing the message on your behalf after successfully running your `processMessage` callback and `autoCompleteMessages` is enabled
   *   - receiver is abandoning the message on your behalf if running your `processMessage` callback fails and `autoCompleteMessages` is enabled
   *   - receiver is renewing the lock on your behalf due to auto lock renewal feature being enabled
   *
   * Note that when receiving messages in a stream using `subscribe()`, the receiver will automatically retry receiving messages on all errors unless
   * `close()` is called on the subscription. It is completely up to users to decide what errors are considered non-recoverable and to handle them
   * accordingly in this callback.
   * For a list of errors occurs within Service Bus, please refer to https://docs.microsoft.com/javascript/api/\@azure/service-bus/servicebuserror?view=azure-node-latest
   * @param args - The error and additional context to indicate where
   * the error originated.
   */
  processError(args: ProcessErrorArgs): Promise<void>;
}

/**
 * @internal
 */
export interface InternalMessageHandlers extends MessageHandlers {
  /**
   * Called when the connection is initialized but before we've added credits.
   * NOTE: This handler is completely internal and only used for tests.
   */
  postInitialize?: () => Promise<void>;

  /**
   * Called before we actually initialize the link itself.
   * NOTE: This handler is completely internal and only used for tests.
   */
  preInitialize?: () => Promise<void>;

  /**
   * Forwards internal errors that are not normally reported to the customer to `processError`.
   * (defaults to false)
   */
  forwardInternalErrors?: boolean;
}

/**
 * Represents the possible receive modes for the receiver.
 * @internal
 */
export type ReceiveMode = "peekLock" | "receiveAndDelete";

/**
 * Options to use when creating a receiver.
 */
export interface ServiceBusReceiverOptions {
  /**
   * Represents the receive mode for the receiver.
   *
   * In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * In peekLock mode, the receiver has a lock on the message for the duration specified on the
   * queue/subscription.
   *
   * Messages that are not settled within the lock duration will be redelivered as many times as
   * the max delivery count set on the queue/subscription, after which they get sent to a separate
   * dead letter queue.
   *
   * You can settle a message by calling complete(), abandon(), defer() or deadletter() methods on
   * the message.
   *
   * More information about how peekLock and message settlement works here:
   * https://docs.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
   *
   */
  receiveMode?: "peekLock" | "receiveAndDelete";
  /**
   * Represents the sub queue that is applicable for any queue or subscription.
   * Valid values are "deadLetter" and "transferDeadLetter". To learn more about dead letter queues,
   * see https://docs.microsoft.com/azure/service-bus-messaging/service-bus-dead-letter-queues
   */
  subQueueType?: "deadLetter" | "transferDeadLetter";

  /**
   * The maximum duration, in milliseconds, that the lock on the message will be renewed automatically by the client.
   * This auto renewal stops once the message is settled.
   *
   * - **Default**: `300 * 1000` milliseconds (5 minutes).
   * - **To disable autolock renewal**, set this to `0`.
   *
   * **Example:**
   *
   *    If the message lock expires in 2 minutes and your message processing time is 8 minutes...
   *
   *    Set maxAutoLockRenewalDurationInMs to 10 minutes, and the message lock will be automatically renewed for 4 times
   *    (equivalent to having the message locked for 4 times its lock duration by leveraging the lock renewals).
   */
  maxAutoLockRenewalDurationInMs?: number;
  /**
   * Option to disable the client from running JSON.parse() on the message body when receiving the message.
   * Not applicable if the message was sent with AMQP body type value or sequence. Use this option when you
   * prefer to work directly with the bytes present in the message body than have the client attempt to parse it.
   */
  skipParsingBodyAsJson?: boolean;
  /**
   * Whether to skip converting Date type on properties of message annotations
   * or application properties into numbers when receiving the message. By
   * default, properties of Date type is converted into UNIX epoch number for
   * compatibility.
   */
  skipConvertingDate?: boolean;
  /**
   * Sets the name to identify the receiver. This can be used to correlate logs and exceptions.
   * If not specified or empty, a random unique one will be used.
   */
  identifier?: string;
}

/**
 * Options to use when creating a sender.
 */
export interface ServiceBusSenderOptions {
  /**
   * Sets the name to identify the sender. This can be used to correlate logs and exceptions.
   * If not specified or empty, a random unique one will be used.
   */
  identifier?: string;
}

/**
 * Options to configure the `createBatch` method on the `Sender`.
 * - `maxSizeInBytes`: The upper limit for the size of batch.
 *
 * Example usage:
 * ```js
 * {
 *     maxSizeInBytes: 1024 * 1024 // 1 MB
 * }
 * ```
 */
export interface CreateMessageBatchOptions extends OperationOptionsBase {
  /**
   * The upper limit for the size of batch. The `tryAdd` function will return `false` after this limit is reached.
   */
  maxSizeInBytes?: number;
}

/**
 * Options when receiving a batch of messages from Service Bus.
 */
export interface ReceiveMessagesOptions extends OperationOptionsBase {
  /**
   * The maximum amount of time to wait for messages to arrive.
   *  **Default**: `60000` milliseconds.
   */
  maxWaitTimeInMs?: number;
}

/**
 * Options when getting an iterable iterator from Service Bus.
 */
export interface GetMessageIteratorOptions extends OperationOptionsBase {}

/**
 * Options used when subscribing to a Service Bus queue or subscription.
 */
export interface SubscribeOptions extends OperationOptionsBase {
  /**
   * Indicates whether the message should be settled automatically based on the result from the
   * user provided `processMessage` callback.
   *
   * - If an error is thrown from the `processMessage` callback the message will be abandoned
   *   using `receiver.abandonMessage()`. Doing so will make the message available again from the
   *   queue/subscription and the delivery count will be incremented.
   * - If NO error is thrown from `processMessage` the message will be completed
   *   using `receiver.completeMessage()`. Doing so removes the message from the queue/subscription.
   *
   * This option is ignored if messages are received in the `receiveAndDelete` receive mode or if
   * the message is already settled in the user provided message callback.
   *
   * - **Default**: `true`.
   */
  autoCompleteMessages?: boolean;
  /**
   * The maximum number of concurrent calls that the library
   * can make to the user's message handler. Once this limit has been reached, more messages will
   * not be received until atleast one of the calls to the user's message handler has completed.
   * - **Default**: `1`.
   */
  maxConcurrentCalls?: number;
}

/**
 * Describes the options passed to the `acceptSession` and `acceptNextSession` methods
 * when using a Queue/Subscription that has sessions enabled.
 */
export interface ServiceBusSessionReceiverOptions extends OperationOptionsBase {
  /**
   * Represents the receive mode for the receiver.
   *
   * In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * In peekLock mode, the receiver has a lock on the message for the duration specified on the
   * queue/subscription.
   *
   * Messages that are not settled within the lock duration will be redelivered as many times as
   * the max delivery count set on the queue/subscription, after which they get sent to a separate
   * dead letter queue.
   *
   * You can settle a message by calling complete(), abandon(), defer() or deadletter() methods on
   * the message.
   *
   * More information about how peekLock and message settlement works here:
   * https://docs.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
   *
   */
  receiveMode?: "peekLock" | "receiveAndDelete";
  /**
   * The maximum duration, in milliseconds, that the lock on the session will be renewed automatically by the client.
   *
   * - **Default**: `300000` milliseconds (5 minutes).
   * - **To disable autolock renewal**, set this to `0`.
   *
   * **Example:**
   *
   *    If the lock expires in 2 minutes and your processing time is 8 minutes...
   *
   *    Set maxAutoLockRenewalDurationInMs to 10 minutes, and the lock will be automatically renewed about 4 times
   *    (equivalent to having the session locked for 4 times its lock duration by leveraging the lock renewals).
   */
  maxAutoLockRenewalDurationInMs?: number;
  /**
   * Option to disable the client from running JSON.parse() on the message body when receiving the message.
   * Not applicable if the message was sent with AMQP body type value or sequence. Use this option when you
   * prefer to work directly with the bytes present in the message body than have the client attempt to parse it.
   */
  skipParsingBodyAsJson?: boolean;
  /**
   * Whether to skip converting Date type on properties of message annotations
   * or application properties into numbers when receiving the message. By
   * default, properties of Date type is converted into UNIX epoch number for
   * compatibility.
   */
  skipConvertingDate?: boolean;
  /**
   * Sets the name to identify the session receiver. This can be used to correlate logs and exceptions.
   * If not specified or empty, a random unique one will be used.
   */
  identifier?: string;
}

/**
 * Describes the options passed to the `peekMessages` method on a receiver.
 */
export interface PeekMessagesOptions extends OperationOptionsBase {
  /**
   * The sequence number to start peeking messages from (inclusive).
   */
  fromSequenceNumber?: Long;
  /**
   * @beta
   * (Experimental for diagnostic purpose) Specifies whether to omit the body when peeking messages. Default  value `false`.
   */
  omitMessageBody?: boolean;
}
