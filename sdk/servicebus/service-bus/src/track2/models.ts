// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ServiceBusMessage } from "../serviceBusMessage";
import { TokenCredential } from "@azure/core-amqp";
import { OperationOptions } from '@azure/core-auth';

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
  id: string | undefined;
  /**
   * A shared instance that allows multiple sessions to share the same underlying AMQP
   * connection.
   *
   * A single instance should be created for your application and passed to each
   * ReceiverClient you create that processes a session.
   */
  connections: SessionConnections;
}

export function isSession(possibleSession: Session | any) : possibleSession is Session {
  return (possibleSession as Session).connections && typeof (possibleSession as Session).connections === "object";
}

// TODO: make this an actual interface that's not just in terms of what's
// on ServiceBusMessage. There's no reason to advertise that it's actually
// a concrete class (or is there?)
// the "action" methods here are on the context object instead.
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
  complete(m: ReceivedMessage): Promise<void>;
  abandon(m: ReceivedMessage): Promise<void>;
  defer(m: ReceivedMessage): Promise<void>;
  deadLetter(m: ReceivedMessage): Promise<void>;
}

/**
 * The general message handler interface (used for streamMessages).
 */
export interface MessageHandlers<ContextT> {
  processMessage(message: ReceivedMessage, context: ContextT): Promise<void>;
  processError(err: Error): Promise<void>;
}

/**
 * Indicates the object should be close()'d.This is typically used with
 */
export interface Closeable {
  close(): Promise<void>;
}

export interface MessageAndContext<ContextT> {
  message: ReceivedMessage;
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
 * Authentication methods for queues.
 * TODO: consider inlining inside constructors
 */
export type QueueAuth =
  | {
      /**
       * A connection string that points to a service bus (ie: does not contain an EntityName value).
       */
      connectionString: string;
      /**
       * The name of the queue to connect to.
       */
      queueName: string;
    }
  | {
      /**
       * A connection string that points to a queue (contains EntityName=<queue-name>).
       */
      queueConnectionString: string;
    }
  | {
      tokenCredential: TokenCredential;
      host: string;
      queueName: string;
    };

export function isQueueAuth(
  possibleQueueAuth: QueueAuth | SubscriptionAuth
): possibleQueueAuth is QueueAuth {
  const queueAuth = possibleQueueAuth as any;
  return queueAuth.queueName != null || queueAuth.queueConnectionString != null;
}

/**
 * Authentication methods for subscriptions.
 * TODO: consider inlining inside constructors
 */
export type SubscriptionAuth =
  | {
      connectionString: string;
      topicName: string;
      subscriptionName: string;
    }
  | {
      topicConnectionString: string;
      subscriptionName: string;
    }
  | {
      tokenCredential: TokenCredential;
      host: string;
      topicName: string;
      subscriptionName: string;
    };


export interface ReceiveBatchOptions extends OperationOptions {

}

export interface IterateMessagesOptions extends OperationOptions {

}

export interface StreamMessagesOptions extends OperationOptions ,MessageHandlerOptions {
}

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