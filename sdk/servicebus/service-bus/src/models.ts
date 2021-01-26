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
}

/**
 * The general message handler interface (used for streamMessages).
 */
export interface MessageHandlers {
  /**
   * Handler that processes messages from service bus.
   *
   * @param message A message received from Service Bus.
   */
  processMessage(message: ServiceBusReceivedMessage): Promise<void>;
  /**
   * Handler that processes errors that occur during receiving.
   * @param args The error and additional context to indicate where
   * the error originated.
   */
  processError(args: ProcessErrorArgs): Promise<void>;
}

/**
 * @internal
 * @hidden
 */
export interface InternalMessageHandlers extends MessageHandlers {
  /**
   * Called when the connection is initialized but before we subscribe to messages or add credits.
   *
   * NOTE: This handler is completely internal and only used for tests.
   */
  processInitialize?: () => Promise<void>;
}

/**
 * Represents the possible receive modes for the receiver.
 * @internal
 * @hidden
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
   * The maximum duration in milliseconds until which the lock on the message will be renewed
   * by the sdk automatically. This auto renewal stops once the message is settled.
   *
   * - **Default**: `300 * 1000` milliseconds (5 minutes).
   * - **To disable autolock renewal**, set this to `0`.
   */
  maxAutoLockRenewalDurationInMs?: number;
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
   * @property
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
   * @property Indicates whether the message should be settled using the `completeMessage()`
   * method on the receiver automatically after it executes the user provided message callback.
   * Doing so removes the message from the queue/subscription.
   *
   * This option is ignored if messages are received in the `receiveAndDelete` receive mode or if
   * the message is already settled in the user provided message callback.
   *
   * - **Default**: `true`.
   */
  autoCompleteMessages?: boolean;
  /**
   * @property The maximum number of concurrent calls that the library
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
   * @property The maximum duration in milliseconds
   * until which, the lock on the session will be renewed automatically by the sdk.
   * - **Default**: `300000` milliseconds (5 minutes).
   * - **To disable autolock renewal**, set this to `0`.
   */
  maxAutoLockRenewalDurationInMs?: number;
}

/**
 * Describes the options passed to the `peekMessages` method on a receiver.
 */
export interface PeekMessagesOptions extends OperationOptionsBase {
  /**
   * @property The sequence number to start peeking messages from (inclusive).
   */
  fromSequenceNumber?: Long;
}
