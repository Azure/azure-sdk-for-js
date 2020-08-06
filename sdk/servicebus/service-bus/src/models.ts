// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptionsBase } from "./modelsToBeSharedWithEventHubs";
import { SessionReceiverOptions } from "./session/messageSession";
import Long from "long";
import { AbortSignalLike } from "@azure/abort-controller";

/**
 * The general message handler interface (used for streamMessages).
 */
export interface MessageHandlers<ReceivedMessageT> {
  /**
   * Handler that processes messages from service bus.
   *
   * @param message A message received from Service Bus.
   */
  processMessage(message: ReceivedMessageT): Promise<void>;
  /**
   * Handler that processes errors that occur during receiving.
   * @param err An error from Service Bus.
   */
  processError(err: Error): Promise<void>;
}

/**
 * @internal
 * @ignore
 */
export interface InternalMessageHandlers<ReceivedMessageT>
  extends MessageHandlers<ReceivedMessageT> {
  /**
   * Called when the connection is initialized but before we subscribe to messages or add credits.
   *
   * NOTE: This handler is completely internal and only used for tests.
   */
  processInitialize?: () => Promise<void>;
}

/**
 * Represents the possible receive modes for the receiver.
 */
export type ReceiveMode = "peekLock" | "receiveAndDelete";

/**
 *
 *
 * @interface CreateReceiverOptions
 * @template ReceiveModeT
 */
export interface CreateReceiverOptions<ReceiveModeT extends ReceiveMode> {
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
   * https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
   *
   */
  receiveMode?: ReceiveModeT;
}

/**
 * Options related to wait times.
 */
export interface WaitTimeOptions {
  /**
   * The maximum amount of time to wait for messages to arrive.
   *  **Default**: `60000` milliseconds.
   */
  maxWaitTimeInMs: number;
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
export interface CreateBatchOptions extends OperationOptionsBase {
  /**
   * @property
   * The upper limit for the size of batch. The `tryAdd` function will return `false` after this limit is reached.
   */
  maxSizeInBytes?: number;
}

/**
 * Options when receiving a batch of messages from Service Bus.
 */
export interface ReceiveMessagesOptions extends OperationOptionsBase, WaitTimeOptions {}

/**
 * Options when getting an iterable iterator from Service Bus.
 */
export interface GetMessageIteratorOptions extends OperationOptionsBase, WaitTimeOptions {}

/**
 * Options used when subscribing to a Service Bus queue or subscription.
 */
export interface SubscribeOptions extends OperationOptionsBase, MessageHandlerOptions {}

/**
 * Describes the options passed to `registerMessageHandler` method when receiving messages from a
 * Queue/Subscription which does not have sessions enabled.
 */
export interface MessageHandlerOptions {
  /**
   * @property Indicates whether the `complete()` method on the message should automatically be
   * called by the sdk after the user provided onMessage handler has been executed.
   * Calling `complete()` on a message removes it from the Queue/Subscription.
   * - **Default**: `true`.
   */
  autoComplete?: boolean;
  /**
   * @property The maximum duration in milliseconds until which the lock on the message will be renewed
   * by the sdk automatically. This auto renewal stops once the message is settled or once the user
   * provided onMessage handler completes ite execution.
   *
   * - **Default**: `300 * 1000` milliseconds (5 minutes).
   * - **To disable autolock renewal**, set this to `0`.
   */
  maxMessageAutoRenewLockDurationInMs?: number;
  /**
   * @property The maximum number of concurrent calls that the sdk can make to the user's message
   * handler. Once this limit has been reached, further messages will not be received until at least
   * one of the calls to the user's message handler has completed.
   * - **Default**: `1`.
   */
  maxConcurrentCalls?: number;
}

/**
 * Describes the options passed to the `createSessionReceiver` method when using a Queue/Subscription that
 * has sessions enabled.
 *
 * @export
 * @interface CreateSessionReceiverOptions
 * @extends {CreateReceiverOptions<ReceiveModeT>}
 * @extends {SessionReceiverOptions}
 * @extends {OperationOptionsBase}
 * @template ReceiveModeT
 */
export interface CreateSessionReceiverOptions<ReceiveModeT extends ReceiveMode>
  extends CreateReceiverOptions<ReceiveModeT>,
    SessionReceiverOptions,
    OperationOptionsBase {}

/**
 * Describes the options passed to the `open` method on a `Sender`.
 */
export interface SenderOpenOptions {
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;
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
