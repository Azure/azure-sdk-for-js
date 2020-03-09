// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  MessageHandlers,
  SubscribeOptions,
  GetMessageIteratorOptions,
  ReceiveBatchOptions,
  ReceivedMessage,
  MessageHandlerOptions
} from "../models";
import { OperationOptions } from "@azure/core-auth";
import { ServiceBusMessage, RuleDescription, CorrelationFilter } from "..";
import { ClientEntityContext } from "../clientEntityContext";
import {
  throwErrorIfConnectionClosed,
  getAlreadyReceivingErrorMsg,
  getReceiverClosedErrorMsg,
  throwTypeErrorIfParameterMissing,
  getErrorMessageNotSupportedInReceiveAndDeleteMode,
  throwTypeErrorIfParameterNotLong,
  throwTypeErrorIfParameterNotLongArray,
  throwErrorIfClientOrConnectionClosed
} from "../util/errors";
import * as log from "../log";
import { OnMessage, OnError, ReceiveOptions } from "../core/messageReceiver";
import { StreamingReceiver } from "../core/streamingReceiver";
import { BatchingReceiver } from "../core/batchingReceiver";
import {
  getSubscriptionRules,
  removeSubscriptionRule,
  addSubscriptionRule,
  settlementContext
} from "./shared";
import { convertToInternalReceiveMode } from "../constructorHelpers";

/**
 * A receiver client that does not handle sessions.
 */
export interface Receiver<ContextT> {
  /**
   * Streams messages to message handlers.
   * @param handler A handler that gets called for messages and errors.
   * @param options Options for subscribe.
   */
  subscribe(handler: MessageHandlers<ContextT>, options?: SubscribeOptions): void;

  /**
   * Returns an iterator that can be used to receive messages from Service Bus.
   * @param options Options for getMessageIterator.
   */
  getMessageIterator(
    options?: GetMessageIteratorOptions
  ): AsyncIterableIterator<{ message: ReceivedMessage; context: ContextT }>;

  /**
   * Receives, at most, `maxMessages` worth of messages.
   * @param maxMessages The maximum number of messages to accept.
   * @param maxWaitTimeInSeconds The maximum time to wait, in seconds, for messages to arrive.
   * @param options Options for receiveBatch.
   */
  receiveBatch(
    maxMessages: number,
    maxWaitTimeInSeconds?: number,
    options?: ReceiveBatchOptions
  ): Promise<{ messages: ReceivedMessage[]; context: ContextT }>;

  // TODO: should probably be on the ContextT
  renewMessageLock(lockTokenOrMessage: string | ReceivedMessage): Promise<Date>;

  receiveDeferredMessage(
    sequenceNumber: Long,
    options?: OperationOptions
  ): Promise<ServiceBusMessage | undefined>;
  receiveDeferredMessages(
    sequenceNumbers: Long[],
    options?: OperationOptions
  ): Promise<ServiceBusMessage[]>;
  isReceivingMessages(): boolean;
  getDeadLetterPath(): string;

  // TODO: not sure these need to be on the interface
  entityType: "queue" | "subscription";
  entityPath: string;
  receiveMode: "peekLock" | "receiveAndDelete";

  /**
   * Closes the client.
   */
  close(): Promise<void>;

  /**
   * Methods related to service bus diagnostics.
   */
  diagnostics: {
    /**
     * Peek within a queue or subscription.
     * NOTE: this method does not respect message locks or increment delivery count
     * for messages.
     * @param maxMessageCount The maximum number of messages to retrieve.
     */
    peek(maxMessageCount?: number): Promise<ReceivedMessage[]>;

    /**
     * Peek within a queue or subscription, starting with a specific sequence number.
     * NOTE: this method does not respect message locks or increment delivery count
     * for messages.
     * @param fromSequenceNumber The sequence number to start peeking from (inclusive).
     * @param maxMessageCount The maximum number of messages to retrieve.
     */
    peekBySequenceNumber(
      fromSequenceNumber: Long,
      maxMessageCount?: number
    ): Promise<ReceivedMessage[]>;
  };
}

/**
 * The Receiver class can be used to receive messages in a batch or by registering handlers.
 * Use the `createReceiver` function on the QueueClient or SubscriptionClient to instantiate a Receiver.
 * The Receiver class is an abstraction over the underlying AMQP receiver link.
 * @class Receiver
 * @internal
 * @ignore
 */
export class ReceiverImpl<ContextT> implements Receiver<ContextT> {
  /**
   * @property Describes the amqp connection context for the QueueClient.
   */
  private _context: ClientEntityContext;
  /**
   * @property {boolean} [_isClosed] Denotes if close() was called on this receiver
   */
  private _isClosed: boolean = false;

  public entityPath: string;

  public diagnostics: {
    peek(maxMessageCount?: number): Promise<ReceivedMessage[]>;
    peekBySequenceNumber(
      fromSequenceNumber: Long,
      maxMessageCount?: number
    ): Promise<ReceivedMessage[]>;
  };

  /**
   * @throws Error if the underlying connection is closed.
   */
  constructor(
    context: ClientEntityContext,
    public receiveMode: "peekLock" | "receiveAndDelete",
    public entityType: "queue" | "subscription"
  ) {
    throwErrorIfConnectionClosed(context.namespace);
    this.entityPath = context.entityPath;
    this._context = context;
    this.diagnostics = {
      peek: (maxMessageCount) => this._peek(maxMessageCount),
      peekBySequenceNumber: (fromSequenceNumber, maxMessageCount) =>
        this._peekBySequenceNumber(fromSequenceNumber, maxMessageCount)
    };
  }

  private _throwIfAlreadyReceiving(): void {
    if (this.isReceivingMessages()) {
      const errorMessage = getAlreadyReceivingErrorMsg(this._context.entityPath);
      const error = new Error(errorMessage);
      log.error(`[${this._context.namespace.connectionId}] %O`, error);
      throw error;
    }
  }

  private _throwIfReceiverOrConnectionClosed(): void {
    throwErrorIfConnectionClosed(this._context.namespace);
    if (this.isClosed) {
      const errorMessage = getReceiverClosedErrorMsg(
        this._context.entityPath,
        this._context.clientType,
        this._context.isClosed
      );
      const error = new Error(errorMessage);
      log.error(`[${this._context.namespace.connectionId}] %O`, error);
      throw error;
    }
  }

  getDeadLetterPath(): string {
    return `${this.entityPath}/$DeadLetterQueue`;
  }

  /**
   * @property Returns `true` if the receiver is closed. This can happen either because the receiver
   * itself has been closed or the client that created it has been closed.
   * @readonly
   */
  public get isClosed(): boolean {
    return this._isClosed || this._context.isClosed;
  }

  /**
   * Registers handlers to deal with the incoming stream of messages over an AMQP receiver link
   * from a Queue/Subscription.
   * To stop receiving messages, call `close()` on the Receiver.
   *
   * Throws an error if there is another receive operation in progress on the same receiver. If you
   * are not sure whether there is another receive operation running, check the `isReceivingMessages`
   * property on the receiver.
   *
   * @param onMessage - Handler for processing each incoming message.
   * @param onError - Handler for any error that occurs while receiving or processing messages.
   * @param options - Options to control if messages should be automatically completed, and/or have
   * their locks automatically renewed. You can control the maximum number of messages that should
   * be concurrently processed. You can also provide a timeout in seconds to denote the
   * amount of time to wait for a new message before closing the receiver.
   *
   * @returns void
   * @throws Error if the underlying connection or receiver is closed.
   * @throws Error if current receiver is already in state of receiving messages.
   * @throws MessagingError if the service returns an error while receiving messages. These are bubbled up to be handled by user provided `onError` handler.
   */
  private _registerMessageHandler(
    onMessage: OnMessage,
    onError: OnError,
    options?: MessageHandlerOptions
  ): void {
    this._throwIfReceiverOrConnectionClosed();
    this._throwIfAlreadyReceiving();
    const connId = this._context.namespace.connectionId;
    throwTypeErrorIfParameterMissing(connId, "onMessage", onMessage);
    throwTypeErrorIfParameterMissing(connId, "onError", onError);
    if (typeof onMessage !== "function") {
      throw new TypeError("The parameter 'onMessage' must be of type 'function'.");
    }
    if (typeof onError !== "function") {
      throw new TypeError("The parameter 'onError' must be of type 'function'.");
    }

    StreamingReceiver.create(this._context, {
      ...options,
      receiveMode: convertToInternalReceiveMode(this.receiveMode)
    })
      .then(async (sReceiver) => {
        if (!sReceiver) {
          return;
        }
        if (!this.isClosed) {
          sReceiver.receive(onMessage, onError);
        } else {
          await sReceiver.close();
        }
        return;
      })
      .catch((err) => {
        onError(err);
      });
  }

  /**
   * Returns a promise that resolves to an array of messages based on given count and timeout over
   * an AMQP receiver link from a Queue/Subscription.
   *
   * Throws an error if there is another receive operation in progress on the same receiver. If you
   * are not sure whether there is another receive operation running, check the `isReceivingMessages`
   * property on the receiver.
   *
   * @param maxMessageCount      The maximum number of messages to receive from Queue/Subscription.
   * @param maxWaitTimeInSeconds The total wait time in seconds until which the receiver will attempt to receive specified number of messages.
   * If this time elapses before the `maxMessageCount` is reached, then messages collected till then will be returned to the user.
   * - **Default**: `60` seconds.
   * @returns Promise<ServiceBusMessage[]> A promise that resolves with an array of Message objects.
   * @throws Error if the underlying connection, client or receiver is closed.
   * @throws Error if current receiver is already in state of receiving messages.
   * @throws MessagingError if the service returns an error while receiving messages.
   */
  async receiveBatch(
    maxMessageCount: number,
    maxWaitTimeInSeconds?: number,
    options?: ReceiveBatchOptions
  ): Promise<{ messages: ReceivedMessage[]; context: ContextT }> {
    this._throwIfReceiverOrConnectionClosed();
    this._throwIfAlreadyReceiving();

    if (!this._context.batchingReceiver || !this._context.batchingReceiver.isOpen()) {
      const options: ReceiveOptions = {
        maxConcurrentCalls: 0,
        receiveMode: convertToInternalReceiveMode(this.receiveMode)
      };
      this._context.batchingReceiver = BatchingReceiver.create(this._context, options);
    }

    const messages = await this._context.batchingReceiver.receive(
      maxMessageCount,
      maxWaitTimeInSeconds
    );

    return {
      messages,
      context: this.getContext()
    };
  }

  /**
   * Gets an async iterator over messages from the receiver.
   *
   * Throws an error if there is another receive operation in progress on the same receiver. If you
   * are not sure whether there is another receive operation running, check the `isReceivingMessages`
   * property on the receiver.
   *
   * If the iterator is not able to fetch a new message in over a minute, `undefined` will be returned.
   * @throws Error if the underlying connection, client or receiver is closed.
   * @throws Error if current receiver is already in state of receiving messages.
   * @throws MessagingError if the service returns an error while receiving messages.
   */
  async *getMessageIterator(
    options?: GetMessageIteratorOptions
  ): AsyncIterableIterator<{
    message: ReceivedMessage;
    context: ContextT;
  }> {
    while (true) {
      const { messages, context } = await this.receiveBatch(1);

      yield {
        message: messages[0],
        context
      };
    }
  }

  /**
   * Renews the lock on the message for the duration as specified during the Queue/Subscription
   * creation.
   * - Check the `lockedUntilUtc` property on the message for the time when the lock expires.
   * - If a message is not settled (using either `complete()`, `defer()` or `deadletter()`,
   * before its lock expires, then the message lands back in the Queue/Subscription for the next
   * receive operation.
   *
   * @param lockTokenOrMessage - The `lockToken` property of the message or the message itself.
   * @returns Promise<Date> - New lock token expiry date and time in UTC format.
   * @throws Error if the underlying connection, client or receiver is closed.
   * @throws MessagingError if the service returns an error while renewing message lock.
   */
  async renewMessageLock(lockTokenOrMessage: string | ReceivedMessage): Promise<Date> {
    this._throwIfReceiverOrConnectionClosed();
    if (this.receiveMode !== "peekLock") {
      throw new Error(getErrorMessageNotSupportedInReceiveAndDeleteMode("renew the message lock"));
    }
    throwTypeErrorIfParameterMissing(
      this._context.namespace.connectionId,
      "lockTokenOrMessage",
      lockTokenOrMessage
    );

    const lockToken =
      lockTokenOrMessage instanceof ServiceBusMessage
        ? String(lockTokenOrMessage.lockToken)
        : String(lockTokenOrMessage);

    const lockedUntilUtc = await this._context.managementClient!.renewLock(lockToken);

    return lockedUntilUtc;
  }

  /**
   * Returns a promise that resolves to a deferred message identified by the given `sequenceNumber`.
   * @param sequenceNumber The sequence number of the message that needs to be received.
   * @returns Promise<ServiceBusMessage | undefined>
   * - Returns `Message` identified by sequence number.
   * - Returns `undefined` if no such message is found.
   * @throws Error if the underlying connection, client or receiver is closed.
   * @throws MessagingError if the service returns an error while receiving deferred message.
   */
  async receiveDeferredMessage(sequenceNumber: Long): Promise<ServiceBusMessage | undefined> {
    this._throwIfReceiverOrConnectionClosed();
    throwTypeErrorIfParameterMissing(
      this._context.namespace.connectionId,
      "sequenceNumber",
      sequenceNumber
    );
    throwTypeErrorIfParameterNotLong(
      this._context.namespace.connectionId,
      "sequenceNumber",
      sequenceNumber
    );

    const messages = await this._context.managementClient!.receiveDeferredMessages(
      [sequenceNumber],
      convertToInternalReceiveMode(this.receiveMode)
    );
    return messages[0];
  }

  /**
   * Returns a promise that resolves to an array of deferred messages identified by given `sequenceNumbers`.
   * @param sequenceNumbers An array of sequence numbers for the messages that need to be received.
   * @returns Promise<ServiceBusMessage[]>
   * - Returns a list of messages identified by the given sequenceNumbers.
   * - Returns an empty list if no messages are found.
   * @throws Error if the underlying connection, client or receiver is closed.
   * @throws MessagingError if the service returns an error while receiving deferred messages.
   */
  async receiveDeferredMessages(sequenceNumbers: Long[]): Promise<ServiceBusMessage[]> {
    this._throwIfReceiverOrConnectionClosed();
    throwTypeErrorIfParameterMissing(
      this._context.namespace.connectionId,
      "sequenceNumbers",
      sequenceNumbers
    );
    if (!Array.isArray(sequenceNumbers)) {
      sequenceNumbers = [sequenceNumbers];
    }
    throwTypeErrorIfParameterNotLongArray(
      this._context.namespace.connectionId,
      "sequenceNumbers",
      sequenceNumbers
    );

    return this._context.managementClient!.receiveDeferredMessages(
      sequenceNumbers,
      convertToInternalReceiveMode(this.receiveMode)
    );
  }

  // ManagementClient methods # Begin

  private async _peek(maxMessageCount?: number): Promise<ReceivedMessage[]> {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this._context.entityPath,
      this._context.isClosed
    );

    const internalMessages = await this._context.managementClient!.peek(maxMessageCount);
    return internalMessages.map((m) => m as ReceivedMessage);
  }

  private async _peekBySequenceNumber(
    fromSequenceNumber: Long,
    maxMessageCount?: number
  ): Promise<ReceivedMessage[]> {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this._context.entityPath,
      this._context.isClosed
    );

    const internalMessages = await this._context.managementClient!.peekBySequenceNumber(
      fromSequenceNumber,
      maxMessageCount
    );
    return internalMessages.map((m) => m as ReceivedMessage);
  }

  subscribe(handlers: MessageHandlers<ContextT>, options?: SubscribeOptions): void {
    this._registerMessageHandler(
      async (message: ServiceBusMessage) => {
        return handlers.processMessage(message, this.getContext());
      },
      (err: Error) => {
        // TODO: not async internally yet.
        handlers.processError(err);
      }
    );
  }

  // #region topic-filters

  getRules(entityPath: string): Promise<RuleDescription[]> {
    return getSubscriptionRules(this._context, entityPath);
  }

  removeRule(entityPath: string, ruleName: string): Promise<void> {
    return removeSubscriptionRule(this._context, entityPath, ruleName);
  }

  addRule(
    entityPath: string,
    ruleName: string,
    filter: boolean | string | CorrelationFilter,
    sqlRuleActionExpression?: string
  ): Promise<void> {
    return addSubscriptionRule(
      this._context,
      entityPath,
      ruleName,
      filter,
      sqlRuleActionExpression
    );
  }

  // #endregion

  /**
   * Closes the underlying AMQP receiver link.
   * Once closed, the receiver cannot be used for any further operations.
   * Use the `createReceiver` function on the QueueClient or SubscriptionClient to instantiate
   * a new Receiver
   *
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    try {
      this._isClosed = true;
      if (this._context.namespace.connection && this._context.namespace.connection.isOpen()) {
        // Close the streaming receiver.
        if (this._context.streamingReceiver) {
          await this._context.streamingReceiver.close();
        }

        // Close the batching receiver.
        if (this._context.batchingReceiver) {
          await this._context.batchingReceiver.close();
        }

        // Make sure that we clear the map of deferred messages
        this._context.requestResponseLockedMessages.clear();
      }
    } catch (err) {
      log.error(
        "[%s] An error occurred while closing the Receiver for %s: %O",
        this._context.namespace.connectionId,
        this._context.entityPath,
        err
      );
      throw err;
    }
  }

  /**
   * Indicates whether the receiver is currently receiving messages or not.
   * When this returns true, new `registerMessageHandler()` or `receiveMessages()` calls cannot be made.
   */
  isReceivingMessages(): boolean {
    if (this._context.streamingReceiver && this._context.streamingReceiver.isOpen()) {
      return true;
    }
    if (
      this._context.batchingReceiver &&
      this._context.batchingReceiver.isOpen() &&
      this._context.batchingReceiver.isReceivingMessages
    ) {
      return true;
    }
    return false;
  }

  private getContext(): ContextT {
    return this.receiveMode === "peekLock"
      ? ((settlementContext as any) as ContextT)
      : ({} as ContextT);
  }
}
