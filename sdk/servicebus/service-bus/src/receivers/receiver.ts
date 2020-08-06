// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PeekMessagesOptions,
  GetMessageIteratorOptions,
  MessageHandlers,
  ReceiveMessagesOptions,
  SubscribeOptions,
  InternalMessageHandlers
} from "../models";
import { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";
import { ReceivedMessage } from "..";
import { ClientEntityContext } from "../clientEntityContext";
import {
  getAlreadyReceivingErrorMsg,
  getReceiverClosedErrorMsg,
  throwErrorIfConnectionClosed,
  throwTypeErrorIfParameterMissing,
  throwTypeErrorIfParameterNotLong
} from "../util/errors";
import * as log from "../log";
import { OnError, OnMessage, ReceiveOptions } from "../core/messageReceiver";
import { StreamingReceiver } from "../core/streamingReceiver";
import { BatchingReceiver } from "../core/batchingReceiver";
import { assertValidMessageHandlers, getMessageIterator, wrapProcessErrorHandler } from "./shared";
import { convertToInternalReceiveMode } from "../constructorHelpers";
import Long from "long";
import { ReceivedMessageWithLock, ServiceBusMessageImpl } from "../serviceBusMessage";
import { Constants, RetryConfig, RetryOperationType, RetryOptions, retry } from "@azure/core-amqp";
import "@azure/core-asynciterator-polyfill";

/**
 * A receiver that does not handle sessions.
 */
export interface Receiver<ReceivedMessageT> {
  /**
   * Streams messages to message handlers.
   * @param handlers A handler that gets called for messages and errors.
   * @param options Options for subscribe.
   * @returns An object that can be closed, sending any remaining messages to `handlers` and
   * stopping new messages from arriving.
   */
  subscribe(
    handlers: MessageHandlers<ReceivedMessageT>,
    options?: SubscribeOptions
  ): {
    /**
     * Causes the subscriber to stop receiving new messages.
     */
    close(): Promise<void>;
  };

  /**
   * Returns an iterator that can be used to receive messages from Service Bus.
   * If the iterator is not able to fetch a new message in over a minute, `undefined` will be returned.
   *
   * @param options A set of options to control the receive operation.
   * - `maxWaitTimeInMs`: The time to wait to receive the message in each iteration.
   * - `abortSignal`: The signal to use to abort the ongoing operation.
   *
   * @throws Error if the underlying connection, client or receiver is closed.
   * @throws Error if current receiver is already in state of receiving messages.
   * @throws MessagingError if the service returns an error while receiving messages.
   */
  getMessageIterator(options?: GetMessageIteratorOptions): AsyncIterableIterator<ReceivedMessageT>;

  /**
   * Returns a promise that resolves to an array of messages received from Service Bus.
   *
   * @param maxMessageCount The maximum number of messages to receive.
   * @param options A set of options to control the receive operation.
   * - `maxWaitTimeInMs`: The maximum time to wait for the first message before returning an empty array if no messages are available.
   * - `abortSignal`: The signal to use to abort the ongoing operation.
   * @returns Promise<ReceivedMessageT[]> A promise that resolves with an array of messages.
   * @throws Error if the underlying connection, client or receiver is closed.
   * @throws Error if current receiver is already in state of receiving messages.
   * @throws MessagingError if the service returns an error while receiving messages.
   */
  receiveMessages(
    maxMessageCount: number,
    options?: ReceiveMessagesOptions
  ): Promise<ReceivedMessageT[]>;

  /**
   * Returns a promise that resolves to an array of deferred messages identified by given `sequenceNumbers`.
   * @param sequenceNumbers The sequence number or an array of sequence numbers for the messages that need to be received.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns {Promise<ServiceBusMessage[]>}
   * - Returns a list of messages identified by the given sequenceNumbers.
   * - Returns an empty list if no messages are found.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while receiving deferred messages.
   */
  receiveDeferredMessages(
    sequenceNumbers: Long | Long[],
    options?: OperationOptionsBase
  ): Promise<ReceivedMessageT[]>;

  /**
   * Peek the next batch of active messages (including deferred but not deadlettered messages) on the
   * queue or subscription without modifying them.
   * - The first call to `peekMessages()` fetches the first active message. Each subsequent call fetches the
   * subsequent message.
   * - Unlike a "received" message, "peeked" message is a read-only version of the message.
   * It cannot be `Completed/Abandoned/Deferred/Deadlettered`.
   * @param maxMessageCount The maximum number of messages to peek.
   * @param options Options that allow to specify the maximum number of messages to peek,
   * the sequenceNumber to start peeking from or an abortSignal to abort the operation.
   */
  peekMessages(maxMessageCount: number, options?: PeekMessagesOptions): Promise<ReceivedMessage[]>;
  /**
   * Path of the entity for which the receiver has been created.
   */
  entityPath: string;
  /**
   * ReceiveMode provided to the client.
   */
  receiveMode: "peekLock" | "receiveAndDelete";
  /**
   * @property Returns `true` if either the receiver or the client that created it has been closed
   * @readonly
   */
  isClosed: boolean;
  /**
   * Closes the receiver.
   * Once closed, the receiver cannot be used for any further operations.
   * Use the `createReceiver()` method on the ServiceBusClient to create a new Receiver.
   */
  close(): Promise<void>;
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
  private _retryOptions: RetryOptions;
  /**
   * @property {boolean} [_isClosed] Denotes if close() was called on this receiver
   */
  private _isClosed: boolean = false;

  public entityPath: string;

  /**
   * @throws Error if the underlying connection is closed.
   */
  constructor(
    context: ClientEntityContext,
    public receiveMode: "peekLock" | "receiveAndDelete",
    retryOptions: RetryOptions = {}
  ) {
    throwErrorIfConnectionClosed(context.namespace);
    this.entityPath = context.entityPath;
    this._context = context;
    this._retryOptions = retryOptions;
  }

  private _throwIfAlreadyReceiving(): void {
    if (this._isReceivingMessages()) {
      const errorMessage = getAlreadyReceivingErrorMsg(this._context.entityPath);
      const error = new Error(errorMessage);
      log.error(`[${this._context.namespace.connectionId}] %O`, error);
      throw error;
    }
  }

  private _throwIfReceiverOrConnectionClosed(): void {
    throwErrorIfConnectionClosed(this._context.namespace);
    if (this.isClosed) {
      const errorMessage = getReceiverClosedErrorMsg(this._context.entityPath);
      const error = new Error(errorMessage);
      log.error(`[${this._context.namespace.connectionId}] %O`, error);
      throw error;
    }
  }

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
   * be concurrently processed. You can also provide a timeout in milliseconds to denote the
   * amount of time to wait for a new message before closing the receiver.
   *
   * @returns void
   * @throws Error if the underlying connection or receiver is closed.
   * @throws Error if current receiver is already in state of receiving messages.
   * @throws MessagingError if the service returns an error while receiving messages. These are bubbled up to be handled by user provided `onError` handler.
   */
  private _registerMessageHandler(
    onInitialize: () => Promise<void>,
    onMessage: OnMessage,
    onError: OnError,
    options?: SubscribeOptions
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

    this._createStreamingReceiver(this._context, {
      ...options,
      receiveMode: convertToInternalReceiveMode(this.receiveMode),
      retryOptions: this._retryOptions
    })
      .then(async (sReceiver) => {
        if (!sReceiver) {
          return;
        }

        try {
          await onInitialize();
        } catch (err) {
          onError(err);
        }

        if (!this.isClosed) {
          sReceiver.subscribe(onMessage, onError);
        } else {
          await sReceiver.close();
        }
        return;
      })
      .catch((err) => {
        onError(err);
      });
  }

  private _createStreamingReceiver(
    context: ClientEntityContext,
    options?: ReceiveOptions &
      Pick<OperationOptionsBase, "abortSignal"> & {
        createStreamingReceiver?: (
          context: ClientEntityContext,
          options?: ReceiveOptions
        ) => StreamingReceiver;
      }
  ): Promise<StreamingReceiver> {
    return StreamingReceiver.create(context, options);
  }

  async receiveMessages(
    maxMessageCount: number,
    options?: ReceiveMessagesOptions
  ): Promise<ReceivedMessageT[]> {
    this._throwIfReceiverOrConnectionClosed();
    this._throwIfAlreadyReceiving();

    if (maxMessageCount == undefined) {
      maxMessageCount = 1;
    }

    const receiveMessages = async () => {
      if (!this._context.batchingReceiver || !this._context.batchingReceiver.isOpen()) {
        const options: ReceiveOptions = {
          maxConcurrentCalls: 0,
          receiveMode: convertToInternalReceiveMode(this.receiveMode)
        };
        this._context.batchingReceiver = this._createBatchingReceiver(this._context, options);
      }
      const receivedMessages = await this._context.batchingReceiver.receive(
        maxMessageCount,
        options?.maxWaitTimeInMs ?? Constants.defaultOperationTimeoutInMs,
        defaultMaxTimeAfterFirstMessageForBatchingMs,
        options?.abortSignal
      );
      return (receivedMessages as unknown) as ReceivedMessageT[];
    };
    const config: RetryConfig<ReceivedMessageT[]> = {
      connectionHost: this._context.namespace.config.host,
      connectionId: this._context.namespace.connectionId,
      operation: receiveMessages,
      operationType: RetryOperationType.receiveMessage,
      abortSignal: options?.abortSignal,
      retryOptions: this._retryOptions
    };
    return retry<ReceivedMessageT[]>(config);
  }

  getMessageIterator(options?: GetMessageIteratorOptions): AsyncIterableIterator<ReceivedMessageT> {
    return getMessageIterator(this, options);
  }

  async receiveDeferredMessages(
    sequenceNumbers: Long | Long[],
    options: OperationOptionsBase = {}
  ): Promise<ReceivedMessageT[]> {
    this._throwIfReceiverOrConnectionClosed();
    throwTypeErrorIfParameterMissing(
      this._context.namespace.connectionId,
      "sequenceNumbers",
      sequenceNumbers
    );
    throwTypeErrorIfParameterNotLong(
      this._context.namespace.connectionId,
      "sequenceNumbers",
      sequenceNumbers
    );

    const deferredSequenceNumbers = Array.isArray(sequenceNumbers)
      ? sequenceNumbers
      : [sequenceNumbers];
    const receiveDeferredMessagesOperationPromise = async () => {
      const deferredMessages = await this._context.managementClient!.receiveDeferredMessages(
        deferredSequenceNumbers,
        convertToInternalReceiveMode(this.receiveMode),
        undefined,
        {
          ...options,
          requestName: "receiveDeferredMessages",
          timeoutInMs: this._retryOptions.timeoutInMs
        }
      );
      return (deferredMessages as any) as ReceivedMessageT[];
    };
    const config: RetryConfig<ReceivedMessageT[]> = {
      operation: receiveDeferredMessagesOperationPromise,
      connectionId: this._context.namespace.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal
    };
    return retry<ReceivedMessageT[]>(config);
  }

  // ManagementClient methods # Begin

  async peekMessages(
    maxMessageCount: number,
    options: PeekMessagesOptions = {}
  ): Promise<ReceivedMessage[]> {
    this._throwIfReceiverOrConnectionClosed();

    if (maxMessageCount == undefined) {
      maxMessageCount = 1;
    }

    const managementRequestOptions = {
      ...options,
      requestName: "peekMessages",
      timeoutInMs: this._retryOptions?.timeoutInMs
    };
    const peekOperationPromise = async () => {
      if (options.fromSequenceNumber) {
        return await this._context.managementClient!.peekBySequenceNumber(
          options.fromSequenceNumber,
          maxMessageCount,
          undefined,
          managementRequestOptions
        );
      } else {
        return await this._context.managementClient!.peek(
          maxMessageCount,
          managementRequestOptions
        );
      }
    };

    const config: RetryConfig<ReceivedMessage[]> = {
      operation: peekOperationPromise,
      connectionId: this._context.namespace.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal
    };
    return retry<ReceivedMessage[]>(config);
  }

  subscribe(
    handlers: MessageHandlers<ReceivedMessageT>,
    options?: SubscribeOptions
  ): {
    close(): Promise<void>;
  } {
    assertValidMessageHandlers(handlers);

    const processError = wrapProcessErrorHandler(handlers);

    const internalMessageHandlers = handlers as
      | InternalMessageHandlers<ReceivedMessageT>
      | undefined;

    this._registerMessageHandler(
      async () => {
        if (internalMessageHandlers?.processInitialize) {
          await internalMessageHandlers.processInitialize();
        }
      },
      async (message: ServiceBusMessageImpl) => {
        return handlers.processMessage((message as any) as ReceivedMessageT);
      },
      processError,
      options
    );

    return {
      close: async (): Promise<void> => {
        return this._context.streamingReceiver?.stopReceivingMessages();
      }
    };
  }

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
  private _isReceivingMessages(): boolean {
    if (
      this._context.streamingReceiver &&
      this._context.streamingReceiver.isOpen() &&
      this._context.streamingReceiver.isReceivingMessages
    ) {
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

  private _createBatchingReceiver(
    context: ClientEntityContext,
    options?: ReceiveOptions
  ): BatchingReceiver {
    return BatchingReceiver.create(context, options);
  }
}

/**
 * The default time to wait for messages _after_ the first message
 * has been received.
 *
 * This timeout only applies to receiveMessages()
 *
 * @internal
 * @ignore
 */
export const defaultMaxTimeAfterFirstMessageForBatchingMs = 1000;
