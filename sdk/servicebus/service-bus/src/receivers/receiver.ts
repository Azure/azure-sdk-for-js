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
  InvalidMaxMessageCountError,
  throwErrorIfConnectionClosed,
  throwTypeErrorIfParameterMissing,
  throwTypeErrorIfParameterNotLong,
  throwErrorIfInvalidOperationOnMessage,
  throwTypeErrorIfParameterTypeMismatch
} from "../util/errors";
import { OnError, OnMessage, ReceiveOptions } from "../core/messageReceiver";
import { StreamingReceiverInitArgs, StreamingReceiver } from "../core/streamingReceiver";
import { BatchingReceiver } from "../core/batchingReceiver";
import {
  abandonMessage,
  assertValidMessageHandlers,
  completeMessage,
  deadLetterMessage,
  deferMessage,
  getMessageIterator,
  wrapProcessErrorHandler
} from "./shared";
import Long from "long";
import { ServiceBusMessageImpl, DeadLetterOptions } from "../serviceBusMessage";
import { Constants, RetryConfig, RetryOperationType, retry } from "@azure/core-amqp";
import "@azure/core-asynciterator-polyfill";
import { LockRenewer } from "../core/autoLockRenewer";
import { createProcessingSpan } from "../diagnostics/instrumentServiceBusMessage";
import { receiverLogger as logger } from "../log";
import { translateServiceBusError } from "../serviceBusError";
import { ServiceBusClientOptions } from "../constructorHelpers";
import { getOperationOptionsBase } from "../util/utils";

/**
 * A receiver that does not handle sessions.
 */
export interface ServiceBusReceiver {
  /**
   * Streams messages to message handlers.
   * @param handlers - A handler that gets called for messages and errors.
   * @param options - Options for subscribe.
   * @returns An object that can be closed, sending any remaining messages to `handlers` and
   * stopping new messages from arriving.
   */
  subscribe(
    handlers: MessageHandlers,
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
   * @param options - A set of options to control the receive operation.
   * - `maxWaitTimeInMs`: The time to wait to receive the message in each iteration.
   * - `abortSignal`: The signal to use to abort the ongoing operation.
   *
   * @throws Error if the underlying connection, client or receiver is closed.
   * @throws Error if current receiver is already in state of receiving messages.
   * @throws `ServiceBusError` if the service returns an error while receiving messages.
   */
  getMessageIterator(
    options?: GetMessageIteratorOptions
  ): AsyncIterableIterator<ServiceBusReceivedMessage>;

  /**
   * Returns a promise that resolves to an array of messages received from Service Bus.
   *
   * @param maxMessageCount - The maximum number of messages to receive.
   * @param options - A set of options to control the receive operation.
   * - `maxWaitTimeInMs`: The maximum time to wait for the first message before returning an empty array if no messages are available.
   * - `abortSignal`: The signal to use to abort the ongoing operation.
   * @returns Promise<ServiceBusReceivedMessage[]> A promise that resolves with an array of messages.
   * @throws Error if the underlying connection, client or receiver is closed.
   * @throws Error if current receiver is already in state of receiving messages.
   * @throws `ServiceBusError` if the service returns an error while receiving messages.
   */
  receiveMessages(
    maxMessageCount: number,
    options?: ReceiveMessagesOptions
  ): Promise<ServiceBusReceivedMessage[]>;

  /**
   * Returns a promise that resolves to an array of deferred messages identified by given `sequenceNumbers`.
   * @param sequenceNumbers - The sequence number or an array of sequence numbers for the messages that need to be received.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns {Promise<ServiceBusMessage[]>}
   * - Returns a list of messages identified by the given sequenceNumbers.
   * - Returns an empty list if no messages are found.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws `ServiceBusError` if the service returns an error while receiving deferred messages.
   */
  receiveDeferredMessages(
    sequenceNumbers: Long | Long[],
    options?: OperationOptionsBase
  ): Promise<ServiceBusReceivedMessage[]>;

  /**
   * Peek the next batch of active messages (including deferred but not deadlettered messages) on the
   * queue or subscription without modifying them.
   * - The first call to `peekMessages()` fetches the first active message. Each subsequent call fetches the
   * subsequent message.
   * - Unlike a "received" message, "peeked" message is a read-only version of the message.
   * It cannot be `Completed/Abandoned/Deferred/Deadlettered`.
   * @param maxMessageCount - The maximum number of messages to peek.
   * @param options - Options that allow to specify the maximum number of messages to peek,
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
   * The receive mode used to create the receiver.
   */
  receiveMode: "peekLock" | "receiveAndDelete";
  /**
   * Returns `true` if either the receiver or the client that created it has been closed.
   * @readonly
   */
  isClosed: boolean;
  /**
   * Closes the receiver.
   * Once closed, the receiver cannot be used for any further operations.
   * Use the `createReceiver()` method on the ServiceBusClient to create a new Receiver.
   */
  close(): Promise<void>;
  /**
   * Removes the message from Service Bus.
   *
   * @throws Error with name `SessionLockLostError` (for messages from a Queue/Subscription with sessions enabled)
   * if the AMQP link with which the message was received is no longer alive. This can
   * happen either because the lock on the session expired or the receiver was explicitly closed by
   * the user or the AMQP link is closed by the library due to network loss or service error.
   * @throws Error with name `MessageLockLostError` (for messages from a Queue/Subscription with sessions not enabled)
   * if the lock on the message has expired or the AMQP link with which the message was received is
   * no longer alive. The latter can happen if the receiver was explicitly closed by the user or the
   * AMQP link got closed by the library due to network loss or service error.
   * @throws Error if the message is already settled.
   * property on the message if you are not sure whether the message is settled.
   * @throws Error if used in `receiveAndDelete` mode because all messages received in this mode
   * are pre-settled. To avoid this error, update your code to not settle a message which is received
   * in this mode.
   * @throws Error with name `ServiceUnavailableError` if Service Bus does not acknowledge the request to settle
   * the message in time. The message may or may not have been settled successfully.
   *
   * @returns Promise<void>.
   */
  completeMessage(
    message: ServiceBusReceivedMessage,
    options?: OperationOptionsBase
  ): Promise<void>;
  /**
   * The lock held on the message by the receiver is let go, making the message available again in
   * Service Bus for another receive operation.
   *
   * @throws `ServiceBusError` with the code `SessionLockLost` (for messages from a Queue/Subscription with sessions enabled)
   * if the AMQP link with which the message was received is no longer alive. This can
   * happen either because the lock on the session expired or the receiver was explicitly closed by
   * the user or the AMQP link is closed by the library due to network loss or service error.
   * @throws `ServiceBusError` with the code `MessageLockLost` (for messages from a Queue/Subscription with sessions not enabled)
   * if the lock on the message has expired or the AMQP link with which the message was received is
   * no longer alive. The latter can happen if the receiver was explicitly closed by the user or the
   * AMQP link got closed by the library due to network loss or service error.
   * @throws Error if the message is already settled.
   * property on the message if you are not sure whether the message is settled.
   * @throws Error if used in `receiveAndDelete` mode because all messages received in this mode
   * are pre-settled. To avoid this error, update your code to not settle a message which is received
   * in this mode.
   * @throws `ServiceBusError` with the code `ServiceTimeout` if Service Bus does not acknowledge the request to settle
   * the message in time. The message may or may not have been settled successfully.
   *
   * @param propertiesToModify - The properties of the message to modify while abandoning the message.
   *
   * @returns Promise<void>.
   */
  abandonMessage(
    message: ServiceBusReceivedMessage,
    propertiesToModify?: { [key: string]: any },
    options?: OperationOptionsBase
  ): Promise<void>;
  /**
   * Defers the processing of the message. Save the `sequenceNumber` of the message, in order to
   * receive it message again in the future using the `receiveDeferredMessage` method.
   *
   * @throws `ServiceBusError` with the code `SessionLockLost` (for messages from a Queue/Subscription with sessions enabled)
   * if the AMQP link with which the message was received is no longer alive. This can
   * happen either because the lock on the session expired or the receiver was explicitly closed by
   * the user or the AMQP link is closed by the library due to network loss or service error.
   * @throws `ServiceBusError` with the code `MessageLockLost` (for messages from a Queue/Subscription with sessions not enabled)
   * if the lock on the message has expired or the AMQP link with which the message was received is
   * no longer alive. The latter can happen if the receiver was explicitly closed by the user or the
   * AMQP link got closed by the library due to network loss or service error.
   * @throws Error if the message is already settled.
   * property on the message if you are not sure whether the message is settled.
   * @throws Error if used in `receiveAndDelete` mode because all messages received in this mode
   * are pre-settled. To avoid this error, update your code to not settle a message which is received
   * in this mode.
   * @throws `ServiceBusError` with the code `ServiceTimeout` if Service Bus does not acknowledge the request to settle
   * the message in time. The message may or may not have been settled successfully.
   *
   * @param propertiesToModify - The properties of the message to modify while deferring the message
   *
   * @returns Promise<void>
   */
  deferMessage(
    message: ServiceBusReceivedMessage,
    propertiesToModify?: { [key: string]: any },
    options?: OperationOptionsBase
  ): Promise<void>;
  /**
   * Moves the message to the deadletter sub-queue. To receive a deadletted message, create a new
   * QueueClient/SubscriptionClient using the path for the deadletter sub-queue.
   *
   * @throws `ServiceBusError` with the code `SessionLockLost` (for messages from a Queue/Subscription with sessions enabled)
   * if the AMQP link with which the message was received is no longer alive. This can
   * happen either because the lock on the session expired or the receiver was explicitly closed by
   * the user or the AMQP link is closed by the library due to network loss or service error.
   * @throws `ServiceBusError` with the code `MessageLockLost` (for messages from a Queue/Subscription with sessions not enabled)
   * if the lock on the message has expired or the AMQP link with which the message was received is
   * no longer alive. The latter can happen if the receiver was explicitly closed by the user or the
   * AMQP link got closed by the library due to network loss or service error.
   * @throws Error if the message is already settled.
   * property on the message if you are not sure whether the message is settled.
   * @throws Error if used in `receiveAndDelete` mode because all messages received in this mode
   * are pre-settled. To avoid this error, update your code to not settle a message which is received
   * in this mode.
   * @throws `ServiceBusError` with the code `ServiceTimeout` if Service Bus does not acknowledge the request to settle
   * the message in time. The message may or may not have been settled successfully.
   *
   * @param options - The DeadLetter options that can be provided while
   * rejecting the message.
   *
   * @returns Promise<void>
   */
  deadLetterMessage(
    message: ServiceBusReceivedMessage,
    options?: DeadLetterOptions & { [key: string]: any }
  ): Promise<void>;
  /**
   * Renews the lock on the message for the duration as specified during the Queue/Subscription
   * creation.
   * - Check the `lockedUntilUtc` property on the message for the time when the lock expires.
   * - If a message is not settled (using either `complete()`, `defer()` or `deadletter()`,
   * before its lock expires, then the message lands back in the Queue/Subscription for the next
   * receive operation.
   *
   * @returns Promise<Date> - New lock token expiry date and time in UTC format.
   * @throws Error if the underlying connection, client or receiver is closed.
   * @throws ServiceBusError if the service returns an error while renewing message lock.
   */
  renewMessageLock(
    message: ServiceBusReceivedMessage,
    options?: OperationOptionsBase
  ): Promise<Date>;
}

/**
 * @internal
 */
export class ServiceBusReceiverImpl implements ServiceBusReceiver {
  private _clientOptions: ServiceBusClientOptions;
  /**
   * Denotes if close() was called on this receiver
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
    clientOptions: ServiceBusClientOptions = {}
  ) {
    throwErrorIfConnectionClosed(_context);
    this._clientOptions = clientOptions;
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
   * @throws ServiceBusError if the service returns an error while receiving messages. These are bubbled up to be handled by user provided `onError` handler.
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

    this._createStreamingReceiver({
      ...getOperationOptionsBase(this._clientOptions),
      ...options,
      receiveMode: this.receiveMode,
      retryOptions: this._clientOptions.retryOptions,
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

  private async _createStreamingReceiver(
    options: StreamingReceiverInitArgs
  ): Promise<StreamingReceiver> {
    throwErrorIfConnectionClosed(this._context);
    if (options.autoCompleteMessages == null) options.autoCompleteMessages = true;

    // When the user "stops" a streaming receiver (via the returned instance from 'subscribe' we just suspend
    // it, leaving the link open). This allows users to stop the flow of messages but still be able to settle messages
    // since the link itself hasn't been shut down.
    //
    // Users can, if they want, restart their subscription (since we've got a link already established).
    // So you'll have an instance here if the user has done:
    // 1. const subscription = receiver.subscribe()
    // 2. subscription.stop()
    // 3. receiver.subscribe()
    this._streamingReceiver =
      this._streamingReceiver ??
      new StreamingReceiver(this._context, this.entityPath, {
        ...getOperationOptionsBase(this._clientOptions),
        ...options
      });

    // this ensures that if the outer service bus client is closed that  this receiver is cleaned up.
    // this mostly affects us if we're in the middle of init() - the connection (and receiver) are not yet
    // open but we do need to close the receiver to exit the init() loop.
    this._context.messageReceivers[this._streamingReceiver.name] = this._streamingReceiver;

    await this._streamingReceiver.init({
      connectionId: this._context.connectionId,
      useNewName: false,
      ...getOperationOptionsBase(this._clientOptions),
      ...options
    });

    return this._streamingReceiver;
  }

  async receiveMessages(
    maxMessageCount: number,
    options?: ReceiveMessagesOptions
  ): Promise<ServiceBusReceivedMessage[]> {
    this._throwIfReceiverOrConnectionClosed();
    this._throwIfAlreadyReceiving();
    throwTypeErrorIfParameterMissing(
      this._context.connectionId,
      "maxMessageCount",
      maxMessageCount
    );
    throwTypeErrorIfParameterTypeMismatch(
      this._context.connectionId,
      "maxMessageCount",
      maxMessageCount,
      "number"
    );

    if (isNaN(maxMessageCount) || maxMessageCount < 1) {
      throw new TypeError(InvalidMaxMessageCountError);
    }

    const receiveMessages = async () => {
      if (!this._batchingReceiver || !this._context.messageReceivers[this._batchingReceiver.name]) {
        const options: ReceiveOptions = {
          maxConcurrentCalls: 0,
          receiveMode: this.receiveMode,
          lockRenewer: this._lockRenewer
        };
        this._batchingReceiver = this._createBatchingReceiver(this._context, this.entityPath, {
          ...getOperationOptionsBase(this._clientOptions),
          ...options
        });
      }

      const receivedMessages = await this._batchingReceiver.receive(
        maxMessageCount,
        options?.maxWaitTimeInMs ?? Constants.defaultOperationTimeoutInMs,
        defaultMaxTimeAfterFirstMessageForBatchingMs,
        options ?? {}
      );

      return receivedMessages;
    };
    const config: RetryConfig<ServiceBusReceivedMessage[]> = {
      connectionHost: this._context.config.host,
      connectionId: this._context.connectionId,
      operation: receiveMessages,
      operationType: RetryOperationType.receiveMessage,
      abortSignal: options?.abortSignal,
      retryOptions: this._clientOptions.retryOptions
    };
    return retry<ServiceBusReceivedMessage[]>(config).catch((err) => {
      throw translateServiceBusError(err);
    });
  }

  getMessageIterator(
    options?: GetMessageIteratorOptions
  ): AsyncIterableIterator<ServiceBusReceivedMessage> {
    return getMessageIterator(this, {
      ...getOperationOptionsBase(this._clientOptions),
      ...options
    });
  }

  async receiveDeferredMessages(
    sequenceNumbers: Long | Long[],
    options: OperationOptionsBase = {}
  ): Promise<ServiceBusReceivedMessage[]> {
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
          ...getOperationOptionsBase(this._clientOptions),
          ...options,
          associatedLinkName: this._getAssociatedReceiverName(),
          requestName: "receiveDeferredMessages",
          timeoutInMs: this._clientOptions.retryOptions?.timeoutInMs
        });
      return deferredMessages;
    };
    const config: RetryConfig<ServiceBusReceivedMessage[]> = {
      operation: receiveDeferredMessagesOperationPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._clientOptions.retryOptions,
      abortSignal: options?.abortSignal
    };
    return retry<ServiceBusReceivedMessage[]>(config);
  }

  // ManagementClient methods # Begin

  async peekMessages(
    maxMessageCount: number,
    options: PeekMessagesOptions = {}
  ): Promise<ServiceBusReceivedMessage[]> {
    this._throwIfReceiverOrConnectionClosed();

    const managementRequestOptions = {
      ...getOperationOptionsBase(this._clientOptions),
      ...options,
      associatedLinkName: this._getAssociatedReceiverName(),
      requestName: "peekMessages",
      timeoutInMs: this._clientOptions.retryOptions?.timeoutInMs
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
      retryOptions: this._clientOptions.retryOptions,
      abortSignal: options?.abortSignal
    };
    return retry<ServiceBusReceivedMessage[]>(config);
  }

  subscribe(
    handlers: MessageHandlers,
    options?: SubscribeOptions
  ): {
    close(): Promise<void>;
  } {
    assertValidMessageHandlers(handlers);
    options = options ?? {};

    const processError = wrapProcessErrorHandler(handlers);

    const internalMessageHandlers = handlers as InternalMessageHandlers;

    this._registerMessageHandler(
      async () => {
        if (internalMessageHandlers?.processInitialize) {
          await internalMessageHandlers.processInitialize();
        }
      },
      async (message: ServiceBusMessageImpl) => {
        const span = this._createProcessingSpan(message, this, this._context.config, options);
        return trace(() => handlers.processMessage(message), span);
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

  async completeMessage(
    message: ServiceBusReceivedMessage,
    options?: OperationOptionsBase
  ): Promise<void> {
    this._throwIfReceiverOrConnectionClosed();
    throwErrorIfInvalidOperationOnMessage(message, this.receiveMode, this._context.connectionId);
    const msgImpl = message as ServiceBusMessageImpl;
    return completeMessage(msgImpl, this._context, this.entityPath, {
      ...getOperationOptionsBase(this._clientOptions),
      ...options
    });
  }

  async abandonMessage(
    message: ServiceBusReceivedMessage,
    propertiesToModify?: { [key: string]: any },
    options?: OperationOptionsBase
  ): Promise<void> {
    this._throwIfReceiverOrConnectionClosed();
    throwErrorIfInvalidOperationOnMessage(message, this.receiveMode, this._context.connectionId);
    const msgImpl = message as ServiceBusMessageImpl;
    return abandonMessage(msgImpl, this._context, this.entityPath, propertiesToModify, {
      ...getOperationOptionsBase(this._clientOptions),
      ...options
    });
  }

  async deferMessage(
    message: ServiceBusReceivedMessage,
    propertiesToModify?: { [key: string]: any },
    options?: OperationOptionsBase
  ): Promise<void> {
    this._throwIfReceiverOrConnectionClosed();
    throwErrorIfInvalidOperationOnMessage(message, this.receiveMode, this._context.connectionId);
    const msgImpl = message as ServiceBusMessageImpl;
    return deferMessage(msgImpl, this._context, this.entityPath, propertiesToModify, {
      ...getOperationOptionsBase(this._clientOptions),
      ...options
    });
  }

  async deadLetterMessage(
    message: ServiceBusReceivedMessage,
    properties?: DeadLetterOptions & { [key: string]: any },
    operationOptions?: OperationOptionsBase
  ): Promise<void> {
    this._throwIfReceiverOrConnectionClosed();
    throwErrorIfInvalidOperationOnMessage(message, this.receiveMode, this._context.connectionId);
    const msgImpl = message as ServiceBusMessageImpl;
    return deadLetterMessage(msgImpl, this._context, this.entityPath, properties, {
      ...getOperationOptionsBase(this._clientOptions),
      ...operationOptions
    });
  }

  async renewMessageLock(
    message: ServiceBusReceivedMessage,
    operationOptions: OperationOptionsBase = {}
  ): Promise<Date> {
    this._throwIfReceiverOrConnectionClosed();
    throwErrorIfInvalidOperationOnMessage(message, this.receiveMode, this._context.connectionId);

    const msgImpl = message as ServiceBusMessageImpl;

    let associatedLinkName: string | undefined;
    if (msgImpl.delivery.link) {
      const associatedReceiver = this._context.getReceiverFromCache(msgImpl.delivery.link.name);
      associatedLinkName = associatedReceiver?.name;
    }
    return this._context
      .getManagementClient(this.entityPath)
      .renewLock(message.lockToken!, {
        associatedLinkName,
        ...getOperationOptionsBase(this._clientOptions),
        ...operationOptions
      })
      .then((lockedUntil) => {
        message.lockedUntilUtc = lockedUntil;
        return lockedUntil;
      });
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
    return BatchingReceiver.create(context, entityPath, {
      ...getOperationOptionsBase(this._clientOptions),
      ...options
    });
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
 */
export const defaultMaxTimeAfterFirstMessageForBatchingMs = 1000;
