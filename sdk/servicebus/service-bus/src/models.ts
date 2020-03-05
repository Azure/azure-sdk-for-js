// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ServiceBusMessage, DeadLetterOptions } from "./serviceBusMessage";
import { OperationOptions } from "@azure/core-auth";

/**
 * A message that has been received via  ServiceBusReceiver.
 */
export type ReceivedMessage = Omit<
  ServiceBusMessage,
  | "complete"
  | "abandon"
  | "defer"
  | "deadletter"
  // Um..am I doing something odd here or is this a normal thing to exclude?
  | "prototype"
>;

/**
 * A context with methods to settle (ie, complete, abandon, etc..)
 * messages. This context is only available when you open a Receiver in "PeekLock"
 * mode.
 */
export interface ContextWithSettlement {
  /**
   * Removes the message from Service Bus.
   * @returns Promise<void>.
   */
  complete(message: ReceivedMessage): Promise<void>;

  /**
   * The lock held on the message by the receiver is let go, making the message available again in
   * Service Bus for another receive operation.
   * @param propertiesToModify The properties of the message to modify while abandoning the message.
   *
   * @return Promise<void>.
   */
  abandon(message: ReceivedMessage, propertiesToModify?: { [key: string]: any }): Promise<void>;

  /**
   * Defers the processing of the message. Save the `sequenceNumber` of the message, in order to
   * receive it message again in the future using the `receiveDeferredMessage` method.
   * @param propertiesToModify The properties of the message to modify while deferring the message
   *
   * @returns Promise<void>
   */
  defer(message: ReceivedMessage, propertiesToModify?: { [key: string]: any }): Promise<void>;

  /**
   * Moves the message to the deadletter sub-queue. To receive a
   * deadlettered message, create a new ServiceBusReceiver client
   * using the path for the deadletter sub-queue.
   *
   * @param options The DeadLetter options that can be provided while
   * rejecting the message.
   *
   * @returns Promise<void>
   */
  deadLetter(message: ReceivedMessage, options?: DeadLetterOptions): Promise<void>;
}

/**
 * The general message handler interface (used for streamMessages).
 */
export interface MessageHandlers<ContextT> {
  /**
   * Handler that processes messages from service bus.
   *
   * @param message A message received from Service Bus.
   * @param context A context that can be used to settle messages when in peekLock mode.
   */
  processMessage(message: ReceivedMessage, context: ContextT): Promise<void>;
  /**
   * Handler that processes errors that occur during receiving.
   * @param err An error from Service Bus.
   */
  processError(err: Error): Promise<void>;
}

/**
 * Used when an object must be explicitly closed to release resources.
 */
export interface Closeable {
  /**
   * Close the object, releasing any resources.
   */
  close(): Promise<void>;
}

/**
 * A message along with an associated context.
 */
export interface MessageAndContext<ContextT> {
  /**
   * A message received from service bus.
   */
  message: ReceivedMessage;
  /**
   * A context used to settle messages, when applicable.
   */
  context: ContextT;
}

/**
 * An iterator that can also contain a context for settling messages.
 */
export type MessageIterator<ContextT> = AsyncIterable<MessageAndContext<ContextT>>;

/**
 * Type that converts PeekLock/ReceiveAndDelete into the proper Context type
 */
export type ContextType<LockModeT> = LockModeT extends "peekLock"
  ? ContextWithSettlement
  : LockModeT extends "receiveAndDelete"
  ? {}
  : never;

/**
 * Options when receiving a batch of messages from Service Bus.
 */
export interface ReceiveBatchOptions extends OperationOptions {}

/**
 * Options when getting an iterable iterator from Service Bus.
 */
export interface IterateMessagesOptions extends OperationOptions {}

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
export interface CreateSessionReceiverOptions {
  /**
   * @property The maximum duration in seconds
   * until which, the lock on the session will be renewed automatically by the sdk.
   * - **Default**: `300` seconds (5 minutes).
   * - **To disable autolock renewal**, set this to `0`.
   */
  maxSessionAutoRenewLockDurationInSeconds?: number;
}
