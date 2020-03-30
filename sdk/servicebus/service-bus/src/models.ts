// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { OperationOptions } from "@azure/core-auth";
import { RetryOptions } from "@azure/core-amqp";

/**
 * The general message handler interface (used for streamMessages).
 */
export interface MessageHandlers<ReceivedMessageT> {
  /**
   * Handler that processes messages from service bus.
   *
   * @param message A message received from Service Bus.
   * @param context A context that can be used to settle messages when in peekLock mode.
   */
  processMessage(message: ReceivedMessageT): Promise<void>;
  /**
   * Handler that processes errors that occur during receiving.
   * @param err An error from Service Bus.
   */
  processError(err: Error): Promise<void>;
}

/**
 * Options related to wait times.
 */
export interface WaitTimeOptions {
  /**
   * The maximum amount of time to wait for messages to arrive.
   *  **Default**: `60` seconds.
   */
  maxWaitTimeSeconds: number;
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
export interface CreateBatchOptions extends OperationOptions {
  /**
   * @property
   * The upper limit for the size of batch. The `tryAdd` function will return `false` after this limit is reached.
   */
  maxSizeInBytes?: number;
}

/**
 * The set of options to configure the behavior of the underlying operations.
 *
 * @export
 * @interface BaseClientOptions
 */
export interface BaseClientOptions {
  /**
   * Retry policy options that determine the mode, number of retries, retry interval etc.
   *
   * @type {RetryOptions}
   * @memberof BaseClientOptions
   */
  retryOptions?: RetryOptions;
}

/**
 * The set of options to configure the behavior of the sender.
 *
 * @export
 * @interface GetSenderOptions
 */
export interface GetSenderOptions extends BaseClientOptions {}

/**
 * The set of options to configure the behavior of the receiver.
 *
 * @export
 * @interface GetReceiverOptions
 */
export interface GetReceiverOptions extends BaseClientOptions {}

/**
 * The set of options to configure the behavior of the subscriptionRuleManager.
 *
 * @export
 * @interface GetSubscriptionRuleManagerOptions
 */
export interface GetSubscriptionRuleManagerOptions extends BaseClientOptions {}

/**
 * Options when receiving a batch of messages from Service Bus.
 */
export interface ReceiveBatchOptions extends OperationOptions, WaitTimeOptions {}

/**
 * Options when getting an iterable iterator from Service Bus.
 */
export interface GetMessageIteratorOptions extends OperationOptions, WaitTimeOptions {}

/**
 * Options used when subscribing to a Service Bus queue or subscription.
 */
export interface SubscribeOptions extends OperationOptions, MessageHandlerOptions {}

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
   * @property The maximum duration in seconds until which the lock on the message will be renewed
   * by the sdk automatically. This auto renewal stops once the message is settled or once the user
   * provided onMessage handler completes ite execution.
   *
   * - **Default**: `300` seconds (5 minutes).
   * - **To disable autolock renewal**, set this to `0`.
   */
  maxMessageAutoRenewLockDurationInSeconds?: number;
  /**
   * @property The maximum number of concurrent calls that the sdk can make to the user's message
   * handler. Once this limit has been reached, further messages will not be received until atleast
   * one of the calls to the user's message handler has completed.
   * - **Default**: `1`.
   */
  maxConcurrentCalls?: number;
}

/**
 * Describes the options passed to the `createReceiver` method when using a Queue/Subscription that
 * has sessions enabled.
 */
export interface GetSessionReceiverOptions extends GetReceiverOptions, OperationOptions {
  /**
   * @property The maximum duration in seconds
   * until which, the lock on the session will be renewed automatically by the sdk.
   * - **Default**: `300` seconds (5 minutes).
   * - **To disable autolock renewal**, set this to `0`.
   */
  maxSessionAutoRenewLockDurationInSeconds?: number;

  /**
   * The session ID to open. If `undefined` we will connect to the next available
   * unlocked session.
   */
  sessionId?: string;
}
