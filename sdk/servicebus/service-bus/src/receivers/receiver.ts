// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  MessageHandlers,
  SubscribeOptions,
  GetMessageIteratorOptions,
  ReceiveBatchOptions,
  MessageHandlerOptions,
  GetReceiverOptions
} from "../models";
import { OperationOptions } from "../modelsToBeSharedWithEventHubs";
import { ReceivedMessage } from "..";
import { ClientEntityContext } from "../clientEntityContext";
import {
  throwErrorIfConnectionClosed,
  getAlreadyReceivingErrorMsg,
  getReceiverClosedErrorMsg,
  throwTypeErrorIfParameterMissing,
  throwTypeErrorIfParameterNotLong,
  throwTypeErrorIfParameterNotLongArray,
  throwErrorIfClientOrConnectionClosed
} from "../util/errors";
import * as log from "../log";
import { OnMessage, OnError, ReceiveOptions } from "../core/messageReceiver";
import { StreamingReceiver } from "../core/streamingReceiver";
import { BatchingReceiver } from "../core/batchingReceiver";
import { assertValidMessageHandlers, getMessageIterator } from "./shared";
import { convertToInternalReceiveMode } from "../constructorHelpers";
import Long from "long";
import { ServiceBusMessageImpl, ReceivedMessageWithLock } from "../serviceBusMessage";
import { RetryConfig, RetryOperationType, retry, Constants } from "@azure/core-amqp";
import { getRetryAttemptTimeoutInMs } from "../util/utils";

/**
 * A receiver that does not handle sessions.
 */
export interface Receiver<ReceivedMessageT> {
  /**
   * Streams messages to message handlers.
   * @param handlers A handler that gets called for messages and errors.
   * @param options Options for subscribe.
   */
  subscribe(handlers: MessageHandlers<ReceivedMessageT>, options?: SubscribeOptions): void;

  /**
   * Returns an iterator that can be used to receive messages from Service Bus.
   * @param options Options for getMessageIterator.
   */
  getMessageIterator(options?: GetMessageIteratorOptions): AsyncIterableIterator<ReceivedMessageT>;

  /**
   * Receives, at most, `maxMessages` worth of messages.
   * @param maxMessages The maximum number of messages to accept.
   * @param options Options for receiveBatch.
   */
  receiveBatch(maxMessages: number, options?: ReceiveBatchOptions): Promise<ReceivedMessageT[]>;

  /**
   * Returns a promise that resolves to a deferred message identified by the given `sequenceNumber`.
   * @param {Long} sequenceNumber The sequence number of the message that needs to be received.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns {(Promise<ServiceBusMessage | undefined>)}
   * - Returns `Message` identified by sequence number.
   * - Returns `undefined` if no such message is found.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while receiving deferred message.
   */
  receiveDeferredMessage(
    sequenceNumber: Long,
    options?: OperationOptions
  ): Promise<ReceivedMessageT | undefined>;

  /**
   * Returns a promise that resolves to an array of deferred messages identified by given `sequenceNumbers`.
   * @param {Long[]} sequenceNumbers An array of sequence numbers for the messages that need to be received.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns {Promise<ServiceBusMessage[]>}
   * - Returns a list of messages identified by the given sequenceNumbers.
   * - Returns an empty list if no messages are found.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while receiving deferred messages.
   * @memberof SessionReceiver
   */
  receiveDeferredMessages(
    sequenceNumbers: Long[],
    options?: OperationOptions
  ): Promise<ReceivedMessageT[]>;
  /**
   * Indicates whether the receiver is currently receiving messages or not.
   * When this returns true, new `registerMessageHandler()` or `receiveMessages()` calls cannot be made.
   * @returns {boolean}
   * @memberof SessionReceiver
   */
  isReceivingMessages(): boolean;

  // TODO: not sure these need to be on the interface

  /**
   * Path for the client entity.
   *
   * @type {string}
   * @memberof SessionReceiver
   */
  entityPath: string;
  /**
   * ReceiveMode provided to the client.
   *
   * @type {("peekLock" | "receiveAndDelete")}
   * @memberof SessionReceiver
   */
  receiveMode: "peekLock" | "receiveAndDelete";

  /**
   * Closes the receiver.
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
 * @internal
 * @ignore
 */
export class ReceiverImpl<ReceivedMessageT extends ReceivedMessage | ReceivedMessageWithLock>
  implements Receiver<ReceivedMessageT> {
  /**
   * @property Describes the amqp connection context for the QueueClient.
   */
  private _context: ClientEntityContext;
  private _receiverOptions: GetReceiverOptions;
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
    options: GetReceiverOptions
  ) {
    throwErrorIfConnectionClosed(context.namespace);
    this.entityPath = context.entityPath;
    this._context = context;
    this.diagnostics = {
      peek: (maxMessageCount) => this._peek(maxMessageCount),
      peekBySequenceNumber: (fromSequenceNumber, maxMessageCount) =>
        this._peekBySequenceNumber(fromSequenceNumber, maxMessageCount)
    };
    this._receiverOptions = options;
    if (this._receiverOptions.retryOptions) {
      this._receiverOptions.retryOptions.timeoutInMs = getRetryAttemptTimeoutInMs(
        this._receiverOptions.retryOptions
      );
    }
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
        this._context.isClosed
      );
      const error = new Error(errorMessage);
      log.error(`[${this._context.namespace.connectionId}] %O`, error);
      throw error;
    }
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
      receiveMode: convertToInternalReceiveMode(this.receiveMode),
      retryOptions: this._receiverOptions.retryOptions
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
   * The `maxWaitTimeInMs` provided via the options overrides the `timeoutInMs` provided in the `retryOptions`.
   * Throws an error if there is another receive operation in progress on the same receiver. If you
   * are not sure whether there is another receive operation running, check the `isReceivingMessages`
   * property on the receiver.
   *
   * @param maxMessageCount      The maximum number of messages to receive from Queue/Subscription.
   * @returns Promise<ServiceBusMessage[]> A promise that resolves with an array of Message objects.
   * @throws Error if the underlying connection, client or receiver is closed.
   * @throws Error if current receiver is already in state of receiving messages.
   * @throws MessagingError if the service returns an error while receiving messages.
   */
  async receiveBatch(
    maxMessageCount: number,
    options?: ReceiveBatchOptions
  ): Promise<ReceivedMessageT[]> {
    this._throwIfReceiverOrConnectionClosed();
    this._throwIfAlreadyReceiving();

    const receiveMessages = async () => {
      if (!this._context.batchingReceiver || !this._context.batchingReceiver.isOpen()) {
        const options: ReceiveOptions = {
          maxConcurrentCalls: 0,
          receiveMode: convertToInternalReceiveMode(this.receiveMode)
        };
        this._context.batchingReceiver = BatchingReceiver.create(this._context, options);
      }
      const receivedMessages = await this._context.batchingReceiver.receive(
        maxMessageCount,
        options?.maxWaitTimeInMs ?? Constants.defaultOperationTimeoutInMs
      );
      return (receivedMessages as unknown) as ReceivedMessageT[];
    };
    const config: RetryConfig<ReceivedMessageT[]> = {
      connectionHost: this._context.namespace.config.host,
      connectionId: this._context.namespace.connectionId,
      operation: receiveMessages,
      operationType: RetryOperationType.receiveMessage,
      abortSignal: undefined,
      retryOptions: this._receiverOptions.retryOptions
    };
    return retry<ReceivedMessageT[]>(config);
  }

  /**
   * Gets an async iterator over messages from the receiver.
   *
   * The `maxWaitTimeInMs` provided via the options overrides the `timeoutInMs` provided in the `retryOptions`.
   * Throws an error if there is another receive operation in progress on the same receiver. If you
   * are not sure whether there is another receive operation running, check the `isReceivingMessages`
   * property on the receiver.
   *
   * If the iterator is not able to fetch a new message in over a minute, `undefined` will be returned.
   * @throws Error if the underlying connection, client or receiver is closed.
   * @throws Error if current receiver is already in state of receiving messages.
   * @throws MessagingError if the service returns an error while receiving messages.
   */
  getMessageIterator(options?: GetMessageIteratorOptions): AsyncIterableIterator<ReceivedMessageT> {
    return getMessageIterator(this, options);
  }

  /**
   * Returns a promise that resolves to a deferred message identified by the given `sequenceNumber`.
   * @param sequenceNumber The sequence number of the message that needs to be received.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns Promise<ServiceBusMessage | undefined>
   * - Returns `Message` identified by sequence number.
   * - Returns `undefined` if no such message is found.
   * @throws Error if the underlying connection, client or receiver is closed.
   * @throws MessagingError if the service returns an error while receiving deferred message.
   */
  async receiveDeferredMessage(
    sequenceNumber: Long,
    options: OperationOptions = {}
  ): Promise<ReceivedMessageT | undefined> {
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

    const receiveDeferredMessageOperationPromise = async () => {
      const messages = await this._context.managementClient!.receiveDeferredMessages(
        [sequenceNumber],
        convertToInternalReceiveMode(this.receiveMode),
        undefined,
        {
          ...options,
          requestName: "receiveDeferredMessage",
          timeoutInMs: this._receiverOptions.retryOptions?.timeoutInMs
        }
      );
      return (messages[0] as unknown) as ReceivedMessageT;
    };
    const config: RetryConfig<ReceivedMessageT | undefined> = {
      operation: receiveDeferredMessageOperationPromise,
      connectionId: this._context.namespace.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._receiverOptions.retryOptions
    };
    return retry<ReceivedMessageT | undefined>(config);
  }

  /**
   * Returns a promise that resolves to an array of deferred messages identified by given `sequenceNumbers`.
   * @param sequenceNumbers An array of sequence numbers for the messages that need to be received.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns Promise<ServiceBusMessage[]>
   * - Returns a list of messages identified by the given sequenceNumbers.
   * - Returns an empty list if no messages are found.
   * @throws Error if the underlying connection, client or receiver is closed.
   * @throws MessagingError if the service returns an error while receiving deferred messages.
   */
  async receiveDeferredMessages(
    sequenceNumbers: Long[],
    options: OperationOptions = {}
  ): Promise<ReceivedMessageT[]> {
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

    const receiveDeferredMessagesOperationPromise = async () => {
      const deferredMessages = await this._context.managementClient!.receiveDeferredMessages(
        sequenceNumbers,
        convertToInternalReceiveMode(this.receiveMode),
        undefined,
        {
          ...options,
          requestName: "receiveDeferredMessages",
          timeoutInMs: this._receiverOptions.retryOptions?.timeoutInMs
        }
      );
      return (deferredMessages as any) as ReceivedMessageT[];
    };
    const config: RetryConfig<ReceivedMessageT[]> = {
      operation: receiveDeferredMessagesOperationPromise,
      connectionId: this._context.namespace.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._receiverOptions.retryOptions
    };
    return retry<ReceivedMessageT[]>(config);
  }

  // ManagementClient methods # Begin

  private async _peek(
    maxMessageCount?: number,
    options: OperationOptions = {}
  ): Promise<ReceivedMessage[]> {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this._context.entityPath,
      this._context.isClosed
    );

    const peekOperationPromise = async () => {
      const internalMessages = await this._context.managementClient!.peek(maxMessageCount, {
        ...options,
        requestName: "peek",
        timeoutInMs: this._receiverOptions.retryOptions?.timeoutInMs
      });
      return internalMessages.map((m) => m as ReceivedMessage);
    };
    const config: RetryConfig<ReceivedMessage[]> = {
      operation: peekOperationPromise,
      connectionId: this._context.namespace.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._receiverOptions.retryOptions
    };
    return retry<ReceivedMessage[]>(config);
  }

  private async _peekBySequenceNumber(
    fromSequenceNumber: Long,
    maxMessageCount?: number,
    options: OperationOptions = {}
  ): Promise<ReceivedMessage[]> {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this._context.entityPath,
      this._context.isClosed
    );

    const peekBySequenceNumberOperationPromise = async () => {
      const internalMessages = await this._context.managementClient!.peekBySequenceNumber(
        fromSequenceNumber,
        maxMessageCount,
        undefined,
        {
          ...options,
          requestName: "peekBySequenceNumber",
          timeoutInMs: this._receiverOptions.retryOptions?.timeoutInMs
        }
      );
      return internalMessages.map((m) => m as ReceivedMessage);
    };
    const config: RetryConfig<ReceivedMessage[]> = {
      operation: peekBySequenceNumberOperationPromise,
      connectionId: this._context.namespace.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._receiverOptions.retryOptions
    };
    return retry<ReceivedMessage[]>(config);
  }

  subscribe(handlers: MessageHandlers<ReceivedMessageT>, options?: SubscribeOptions): void {
    assertValidMessageHandlers(handlers);

    this._registerMessageHandler(
      async (message: ServiceBusMessageImpl) => {
        return handlers.processMessage((message as any) as ReceivedMessageT);
      },
      (err: Error) => {
        // TODO: not async internally yet.
        handlers.processError(err);
      },
      options
    );
  }

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
}
