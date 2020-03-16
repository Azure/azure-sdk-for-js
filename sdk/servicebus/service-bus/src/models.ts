// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ReceivedMessage } from "./serviceBusMessage";
import { OperationOptions } from "@azure/core-auth";

/**
 * An opaque class, used internally to manage AMQP connections for sessions.
 */
// TODO: should probably implement Closeable so the user can just shut down all
// connections when their app is done processing.
export class SessionConnections {}

/**
 * Information needed to target a session.
 */
export interface Session {
  /**
   * The ID of a session to target or `undefined` to pick an session that is not currently
   * owned.
   */
  id?: string;
  /**
   * A shared instance that allows multiple sessions to share the same underlying AMQP
   * connection.
   *
   * A single instance should be created for your application and passed to each
   * ReceiverClient you create that processes a session.
   */
  connections?: SessionConnections;
  /**
   * @property The maximum duration in seconds
   * until which, the lock on the session will be renewed automatically by the sdk.
   * - **Default**: `300` seconds (5 minutes).
   * - **To disable autolock renewal**, set this to `0`.
   */
  maxSessionAutoRenewLockDurationInSeconds?: number;
}

export function isSession(possibleSession: Session | any): possibleSession is Session {
  return possibleSession != null;
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
  processMessage(message: ReceivedMessage): Promise<void>;
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
 * Options when receiving a batch of messages from Service Bus.
 */
export interface ReceiveBatchOptions extends OperationOptions {}

/**
 * Options when getting an iterable iterator from Service Bus.
 */
export interface GetMessageIteratorOptions extends OperationOptions {}

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
export interface GetSessionReceiverOptions extends OperationOptions {
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
