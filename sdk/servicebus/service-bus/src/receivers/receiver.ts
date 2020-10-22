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
import { OperationOptionsBase, trace } from "../modelsToBeSharedWithEventHubs";
import { ServiceBusReceivedMessage } from "../serviceBusMessage";
import { ConnectionContext } from "../connectionContext";
import {
  getAlreadyReceivingErrorMsg,
  getReceiverClosedErrorMsg,
  throwErrorIfConnectionClosed,
  throwTypeErrorIfParameterMissing,
  throwTypeErrorIfParameterNotLong
} from "../util/errors";
import { OnError, OnMessage, ReceiveOptions } from "../core/messageReceiver";
import { StreamingReceiverInitArgs, StreamingReceiver } from "../core/streamingReceiver";
import { BatchingReceiver } from "../core/batchingReceiver";
import { assertValidMessageHandlers, getMessageIterator, wrapProcessErrorHandler } from "./shared";
import Long from "long";
import { ServiceBusReceivedMessageWithLock, ServiceBusMessageImpl } from "../serviceBusMessage";
import {
  Constants,
  RetryConfig,
  RetryOperationType,
  RetryOptions,
  retry,
  MessagingError
} from "@azure/core-amqp";
import "@azure/core-asynciterator-polyfill";
import { LockRenewer } from "../core/autoLockRenewer";
import { createProcessingSpan } from "../diagnostics/instrumentServiceBusMessage";
import { receiverLogger as logger } from "../log";

/**
 * Service Bus messaging codes.
 */
export type ServiceBusMessagingErrorCodes =
  // Error is thrown when the address is already in use.
  | "AddressAlreadyInUseError"
  // Error is thrown when the store lock is lost.
  | "StoreLockLostError"
  // Error is thrown when a matching subscription is not found.
  | "NoMatchingSubscriptionError"
  // Error is thrown when an attempt is made to access a partition that is not owned by the
  // requesting entity.
  | "PartitionNotOwnedError"
  // Error is thrown when access to publisher has been revoked.
  | "PublisherRevokedError"
  // Error is thrown when an attempt is made to create an entity that already exists.
  | "MessagingEntityAlreadyExistsError"
  // Error is thrown when trying to access/connect to a disabled messaging entity.
  | "MessagingEntityDisabledError"
  // Error is thrown when the lock on the message is lost.
  | "MessageLockLostError"
  // Error is thrown when the lock on the Azure ServiceBus session is lost.
  | "SessionLockLostError"
  // Error is thrown when the Azure ServiceBus session cannot be locked.
  | "SessionCannotBeLockedError"
  // Error is thrown when an internal server error occurred. You may have found a bug?
  | "InternalServerError"
  // Error for signaling general communication errors related to messaging operations.
  | "ServiceCommunicationError"
  // Error is thrown when message is not found.
  | "MessageNotFoundError"
  // Error is thrown when relay is not found.
  | "RelayNotFoundError"
  // Error is thrown when a feature is not implemented yet but the placeholder is present.
  | "NotImplementedError"
  // Error is thrown when an operation is attempted but is not allowed.
  | "InvalidOperationError"
  // Error is thrown the the Azure EventHub/ServiceBus quota has been exceeded.
  // Quotas are reset periodically, this operation will have to wait until then.
  // The messaging entity has reached its maximum allowable size.
  // This can happen if the maximum number of receivers (which is 5) has already
  // been opened on a per-consumer group level.
  | "QuotaExceededError"
  // Error is thrown when the connection parameters are wrong and the server refused the connection.
  | "UnauthorizedError"
  // Error is thrown when the service is unavailable. The operation should be retried.
  | "ServiceUnavailableError"
  // Error is thrown when no new messages are received for the specified time.
  | "MessageWaitTimeout"
  // Error is thrown when an argument has a value that is out of the admissible range.
  | "ArgumentOutOfRangeError"
  // Error is thrown when a condition that should have been met in order to execute an operation was not.
  | "PreconditionFailedError"
  // Error is thrown when data could not be decoded.
  | "DecodeError"
  // Error is thrown when an invalid field was passed in a frame body, and the operation could not proceed.
  | "InvalidFieldError"
  // Error is thrown when the client attempted to work with a server entity to which it
  // has no access because another client is working with it.
  | "ResourceLockedError"
  // Error is thrown when a server entity the client is working with has been deleted.
  | "ResourceDeletedError"
  // Error is thrown when the peer sent a frame that is not permitted in the current state.
  | "IllegalStateError"
  // Error is thrown when the peer cannot send a frame because the smallest encoding of
  // the performative with the currently valid values would be too large to fit within
  // a frame of the agreed maximum frame size.
  | "FrameSizeTooSmallError"
  // Error is thrown when an operator intervened to detach for some reason.
  | "DetachForcedError"
  // Error is thrown when the peer sent more message transfers than currently allowed on the link.
  | "TransferLimitExceededError"
  // Error is thrown when the message sent is too large: the maximum size is 256Kb.
  | "MessageTooLargeError"
  // Error is thrown when the address provided cannot be resolved to a terminus at the current container.
  | "LinkRedirectError"
  // Error is thrown when two or more instances connect to the same partition
  // with different epoch values.
  | "ReceiverDisconnectedError"
  // Error is thrown when the peer violated incoming window for the session.
  | "SessionWindowViolationError"
  // Error is thrown when input was received for a link that was detached with an error.
  | "ErrantLinkError"
  // Error is thrown when an attach was received using a handle that is already in use for an attached link.
  | "HandleInUseError"
  // Error is thrown when a frame (other than attach) was received referencing a handle which is not
  // currently in use of an attached link.
  | "UnattachedHandleError"
  // Error is thrown when an operator intervened to close the connection for some reason.
  | "ConnectionForcedError"
  // Error is thrown when a valid frame header cannot be formed from the incoming byte stream.
  | "FramingError"
  // Error is thrown when the container is no longer available on the current connection.
  | "ConnectionRedirectError"
  // Error is thrown when the server is busy. Callers should wait a while and retry the operation.
  | "ServerBusyError"
  // Error is thrown when an incorrect argument was received.
  | "ArgumentError"
  // Error is thrown when server cancels the operation due to an internal issue.
  | "OperationCancelledError"
  // Error is thrown when the client sender does not have enough link credits to send the message.
  | "SenderBusyError"
  // Error is thrown when a low level system error is thrown by node.js.
  // {@link https://nodejs.org/api/errors.html#errors_class_systemerror}
  | "SystemError";

/**
 * Represents an error from Service Bus.
 */
export interface ServiceBusMessagingError extends MessagingError {
  /**
   * A string label that identifies the error.
   */
  code?: ServiceBusMessagingErrorCodes;
}

/**
 * Determines if an error is a MessagingError
 */
export function isMessagingError(
  error: Error | ServiceBusMessagingError
): error is ServiceBusMessagingError {
  return error.name === "MessagingError";
}

/**
 * A receiver that does not handle sessions.
 */
export interface ServiceBusReceiver<ReceivedMessageT> {
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
   * @throws ServiceBusMessagingError if the service returns an error while receiving messages.
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
   * @throws ServiceBusMessagingError if the service returns an error while receiving messages.
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
   * @throws ServiceBusMessagingError if the service returns an error while receiving deferred messages.
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
  peekMessages(
    maxMessageCount: number,
    options?: PeekMessagesOptions
  ): Promise<ServiceBusReceivedMessage[]>;
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
export class ServiceBusReceiverImpl<
  ReceivedMessageT extends ServiceBusReceivedMessage | ServiceBusReceivedMessageWithLock
> implements ServiceBusReceiver<ReceivedMessageT> {
  private _retryOptions: RetryOptions;
  /**
   * @property {boolean} [_isClosed] Denotes if close() was called on this receiver
   */
  private _isClosed: boolean = false;

  /**
   * Instance of the BatchingReceiver class to use to receive messages in pull mode.
   */
  private _batchingReceiver?: BatchingReceiver;

  /**
   * Instance of the StreamingReceiver class to use to receive messages in push mode.
   */
  private _streamingReceiver?: StreamingReceiver;
  private _lockRenewer: LockRenewer | undefined;

  private _createProcessingSpan: typeof createProcessingSpan;

  private get logPrefix() {
    return `[${this._context.connectionId}|receiver:${this.entityPath}]`;
  }

  /**
   * @throws Error if the underlying connection is closed.
   */
  constructor(
    private _context: ConnectionContext,
    public entityPath: string,
    public receiveMode: "peekLock" | "receiveAndDelete",
    maxAutoRenewLockDurationInMs: number,
    retryOptions: RetryOptions = {}
  ) {
    throwErrorIfConnectionClosed(_context);
    this._retryOptions = retryOptions;
    this._lockRenewer = LockRenewer.create(
      this._context,
      maxAutoRenewLockDurationInMs,
      receiveMode
    );
    this._createProcessingSpan = createProcessingSpan;
  }

  private _throwIfAlreadyReceiving(): void {
    if (this._isReceivingMessages()) {
      const errorMessage = getAlreadyReceivingErrorMsg(this.entityPath);
      const error = new Error(errorMessage);
      logger.logError(error, `${this.logPrefix} is already receiving`);
      throw error;
    }
  }

  private _throwIfReceiverOrConnectionClosed(): void {
    throwErrorIfConnectionClosed(this._context);
    if (this.isClosed) {
      const errorMessage = getReceiverClosedErrorMsg(this.entityPath);
      const error = new Error(errorMessage);
      logger.logError(error, `${this.logPrefix} is closed`);
      throw error;
    }
  }

  public get isClosed(): boolean {
    return this._isClosed || this._context.wasConnectionCloseCalled;
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
   * @throws ServiceBusMessagingError if the service returns an error while receiving messages. These are bubbled up to be handled by user provided `onError` handler.
   */
  private _registerMessageHandler(
    onInitialize: () => Promise<void>,
    onMessage: OnMessage,
    onError: OnError,
    options: SubscribeOptions
  ): void {
    this._throwIfReceiverOrConnectionClosed();
    this._throwIfAlreadyReceiving();
    const connId = this._context.connectionId;
    throwTypeErrorIfParameterMissing(connId, "onMessage", onMessage);
    throwTypeErrorIfParameterMissing(connId, "onError", onError);
    if (typeof onMessage !== "function") {
      throw new TypeError("The parameter 'onMessage' must be of type 'function'.");
    }
    if (typeof onError !== "function") {
      throw new TypeError("The parameter 'onError' must be of type 'function'.");
    }

    this._createStreamingReceiver(this._context, this.entityPath, {
      ...options,
      receiveMode: this.receiveMode,
      retryOptions: this._retryOptions,
      cachedStreamingReceiver: this._streamingReceiver,
      lockRenewer: this._lockRenewer,
      onError
    })
      .then(async (sReceiver) => {
        if (!sReceiver) {
          return;
        }
        this._streamingReceiver = sReceiver;

        try {
          await onInitialize();
        } catch (err) {
          onError({
            error: err,
            errorSource: "receive",
            entityPath: this.entityPath,
            fullyQualifiedNamespace: this._context.config.host
          });
        }

        if (!this.isClosed) {
          sReceiver.subscribe(onMessage, onError);
        } else {
          await sReceiver.close();
        }
        return;
      })
      .catch((err) => {
        // TODO: being a bit broad here but the only errors that should filter out this
        // far are going to be bootstrapping the subscription.
        onError({
          error: err,
          errorSource: "receive",
          entityPath: this.entityPath,
          fullyQualifiedNamespace: this._context.config.host
        });
      });
  }

  private _createStreamingReceiver(
    context: ConnectionContext,
    entityPath: string,
    options: StreamingReceiverInitArgs
  ): Promise<StreamingReceiver> {
    return StreamingReceiver.create(context, entityPath, options);
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
      if (!this._batchingReceiver || !this._context.messageReceivers[this._batchingReceiver.name]) {
        const options: ReceiveOptions = {
          maxConcurrentCalls: 0,
          receiveMode: this.receiveMode,
          lockRenewer: this._lockRenewer
        };
        this._batchingReceiver = this._createBatchingReceiver(
          this._context,
          this.entityPath,
          options
        );
      }

      const receivedMessages = await this._batchingReceiver.receive(
        maxMessageCount,
        options?.maxWaitTimeInMs ?? Constants.defaultOperationTimeoutInMs,
        defaultMaxTimeAfterFirstMessageForBatchingMs,
        options ?? {}
      );

      return (receivedMessages as unknown) as ReceivedMessageT[];
    };
    const config: RetryConfig<ReceivedMessageT[]> = {
      connectionHost: this._context.config.host,
      connectionId: this._context.connectionId,
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
      this._context.connectionId,
      "sequenceNumbers",
      sequenceNumbers
    );
    throwTypeErrorIfParameterNotLong(
      this._context.connectionId,
      "sequenceNumbers",
      sequenceNumbers
    );

    const deferredSequenceNumbers = Array.isArray(sequenceNumbers)
      ? sequenceNumbers
      : [sequenceNumbers];
    const receiveDeferredMessagesOperationPromise = async () => {
      const deferredMessages = await this._context
        .getManagementClient(this.entityPath)
        .receiveDeferredMessages(deferredSequenceNumbers, this.receiveMode, undefined, {
          ...options,
          associatedLinkName: this._getAssociatedReceiverName(),
          requestName: "receiveDeferredMessages",
          timeoutInMs: this._retryOptions.timeoutInMs
        });
      return (deferredMessages as any) as ReceivedMessageT[];
    };
    const config: RetryConfig<ReceivedMessageT[]> = {
      operation: receiveDeferredMessagesOperationPromise,
      connectionId: this._context.connectionId,
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
  ): Promise<ServiceBusReceivedMessage[]> {
    this._throwIfReceiverOrConnectionClosed();

    if (maxMessageCount == undefined) {
      maxMessageCount = 1;
    }

    const managementRequestOptions = {
      ...options,
      associatedLinkName: this._getAssociatedReceiverName(),
      requestName: "peekMessages",
      timeoutInMs: this._retryOptions?.timeoutInMs
    };
    const peekOperationPromise = async () => {
      if (options.fromSequenceNumber) {
        return await this._context
          .getManagementClient(this.entityPath)
          .peekBySequenceNumber(
            options.fromSequenceNumber,
            maxMessageCount,
            undefined,
            managementRequestOptions
          );
      } else {
        return await this._context
          .getManagementClient(this.entityPath)
          .peek(maxMessageCount, managementRequestOptions);
      }
    };

    const config: RetryConfig<ServiceBusReceivedMessage[]> = {
      operation: peekOperationPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal
    };
    return retry<ServiceBusReceivedMessage[]>(config);
  }

  subscribe(
    handlers: MessageHandlers<ReceivedMessageT>,
    options?: SubscribeOptions
  ): {
    close(): Promise<void>;
  } {
    assertValidMessageHandlers(handlers);
    options = options ?? {};

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
        const span = this._createProcessingSpan(message, this, this._context.config, options);
        return trace(() => handlers.processMessage((message as any) as ReceivedMessageT), span);
      },
      processError,
      options
    );

    return {
      close: async (): Promise<void> => {
        return this._streamingReceiver?.stopReceivingMessages();
      }
    };
  }

  async close(): Promise<void> {
    try {
      this._isClosed = true;
      if (this._context.connection && this._context.connection.isOpen()) {
        // Close the streaming receiver.
        if (this._streamingReceiver) {
          await this._streamingReceiver.close();
        }

        // Close the batching receiver.
        if (this._batchingReceiver) {
          await this._batchingReceiver.close();
        }
      }
    } catch (err) {
      logger.logError(err, `${this.logPrefix} An error occurred while closing the Receiver`);
      throw err;
    }
  }

  /**
   * Indicates whether the receiver is currently receiving messages or not.
   * When this returns true, new `registerMessageHandler()` or `receiveMessages()` calls cannot be made.
   */
  private _isReceivingMessages(): boolean {
    if (
      this._streamingReceiver &&
      this._streamingReceiver.isOpen() &&
      this._streamingReceiver.isReceivingMessages
    ) {
      return true;
    }
    if (
      this._batchingReceiver &&
      this._batchingReceiver.isOpen() &&
      this._batchingReceiver.isReceivingMessages
    ) {
      return true;
    }
    return false;
  }

  private _createBatchingReceiver(
    context: ConnectionContext,
    entityPath: string,
    options: ReceiveOptions
  ): BatchingReceiver {
    return BatchingReceiver.create(context, entityPath, options);
  }

  /**
   * Helper function to retrieve any active receiver name, regardless of streaming or
   * batching if it exists. This is used for optimization on the service side
   */
  private _getAssociatedReceiverName(): string | undefined {
    if (this._streamingReceiver && this._streamingReceiver.isOpen()) {
      return this._streamingReceiver.name;
    }
    if (
      this._batchingReceiver &&
      this._batchingReceiver.isOpen() &&
      this._batchingReceiver.isReceivingMessages
    ) {
      return this._batchingReceiver.name;
    }
    return;
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
