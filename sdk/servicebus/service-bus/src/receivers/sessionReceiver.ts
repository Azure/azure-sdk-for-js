// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ConnectionContext } from "../connectionContext";
import { MessageHandlers, ReceiveMessagesOptions, ServiceBusReceivedMessage } from "..";
import { PeekMessagesOptions, GetMessageIteratorOptions, SubscribeOptions } from "../models";
import { MessageSession } from "../session/messageSession";
import {
  getAlreadyReceivingErrorMsg,
  getReceiverClosedErrorMsg,
  InvalidMaxMessageCountError,
  throwErrorIfConnectionClosed,
  throwTypeErrorIfParameterMissing,
  throwTypeErrorIfParameterNotLong,
  throwErrorIfInvalidOperationOnMessage,
  throwTypeErrorIfParameterTypeMismatch,
} from "../util/errors";
import { OnError, OnMessage } from "../core/messageReceiver";
import {
  abandonMessage,
  assertValidMessageHandlers,
  completeMessage,
  deadLetterMessage,
  deferMessage,
  getMessageIterator,
  wrapProcessErrorHandler,
} from "./receiverCommon";
import { defaultMaxTimeAfterFirstMessageForBatchingMs, ServiceBusReceiver } from "./receiver";
import Long from "long";
import { ServiceBusMessageImpl, DeadLetterOptions } from "../serviceBusMessage";
import {
  Constants,
  RetryConfig,
  RetryOperationType,
  RetryOptions,
  retry,
  ErrorNameConditionMapper,
} from "@azure/core-amqp";
import { OperationOptionsBase, trace } from "../modelsToBeSharedWithEventHubs";
import { AmqpError } from "rhea-promise";
import { createProcessingSpan } from "../diagnostics/instrumentServiceBusMessage";
import { receiverLogger as logger } from "../log";
import { translateServiceBusError } from "../serviceBusError";

/**
 *A receiver that handles sessions, including renewing the session lock.
 */
export interface ServiceBusSessionReceiver extends ServiceBusReceiver {
  /**
   * The session ID.
   */
  readonly sessionId: string;

  /**
   * The time in UTC until which the session is locked.
   * Every time `renewSessionLock()` is called, this time gets updated to current time plus the lock
   * duration as specified during the Queue/Subscription creation.
   *
   * Will return undefined until a AMQP receiver link has been successfully set up for the session.
   *
   * @readonly
   */
  readonly sessionLockedUntilUtc: Date;

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
   * Renews the lock on the session.
   */
  renewSessionLock(options?: OperationOptionsBase): Promise<Date>;

  /**
   * Gets the state of the Session. For more on session states, see
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-sessions#message-session-state | Session State}
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns The state of that session
   * @throws Error if the underlying connection or receiver is closed.
   * @throws `ServiceBusError` if the service returns an error while retrieving session state.
   */
  getSessionState(options?: OperationOptionsBase): Promise<any>;

  /**
   * Sets the state on the Session. For more on session states, see
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-sessions#message-session-state | Session State}
   * @param state - The state that needs to be set.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws `ServiceBusError` if the service returns an error while setting the session state.
   *
   */
  setSessionState(state: any, options?: OperationOptionsBase): Promise<void>;
}

/**
 * @internal
 */
export class ServiceBusSessionReceiverImpl implements ServiceBusSessionReceiver {
  public sessionId: string;

  /**
   * Denotes if close() was called on this receiver
   */
  private _isClosed: boolean = false;

  private _createProcessingSpan: typeof createProcessingSpan;

  private get logPrefix(): string {
    return `[${this._context.connectionId}|session:${this.entityPath}]`;
  }

  /**
   * @internal
   * @throws Error if the underlying connection is closed.
   * @throws Error if an open receiver is already existing for given sessionId.
   */
  constructor(
    private _messageSession: MessageSession,
    private _context: ConnectionContext,
    public entityPath: string,
    public receiveMode: "peekLock" | "receiveAndDelete",
    private _retryOptions: RetryOptions = {}
  ) {
    throwErrorIfConnectionClosed(_context);
    this.sessionId = _messageSession.sessionId;
    this._createProcessingSpan = createProcessingSpan;
  }

  private _throwIfReceiverOrConnectionClosed(): void {
    throwErrorIfConnectionClosed(this._context);
    if (this.isClosed) {
      if (this._isClosed) {
        const errorMessage = getReceiverClosedErrorMsg(this.entityPath, this.sessionId);
        const error = new Error(errorMessage);
        logger.logError(error, `${this.logPrefix} already closed`);
        throw error;
      }
      const amqpError: AmqpError = {
        condition: ErrorNameConditionMapper.SessionLockLostError,
        description: `The session lock has expired on the session with id ${this.sessionId}`,
      };
      throw translateServiceBusError(amqpError);
    }
  }

  private _throwIfAlreadyReceiving(): void {
    if (this._isReceivingMessages()) {
      const errorMessage = getAlreadyReceivingErrorMsg(this.entityPath, this.sessionId);
      const error = new Error(errorMessage);
      logger.logError(error, `${this.logPrefix} is already receiving.`);
      throw error;
    }
  }

  public get isClosed(): boolean {
    return (
      this._isClosed ||
      !this._context.messageSessions[this._messageSession.name] ||
      !this._messageSession.isOpen()
    );
  }

  /**
   * The time in UTC until which the session is locked.
   * Every time `renewSessionLock()` is called, this time gets updated to current time plus the lock
   * duration as specified during the Queue/Subscription creation.
   *
   * When the lock on the session expires
   * - The current receiver can no longer be used to receive more messages.
   * Create a new receiver using `ServiceBusClient.acceptSession()` or `ServiceBusClient.acceptNextSession()`.
   * - Messages that were received in `peekLock` mode with this receiver but not yet settled
   * will land back in the Queue/Subscription with their delivery count incremented.
   *
   * @readonly
   */
  public get sessionLockedUntilUtc(): Date {
    return this._messageSession.sessionLockedUntilUtc;
  }

  /**
   * Renews the lock on the session for the duration as specified during the Queue/Subscription
   * creation. You can check the `sessionLockedUntilUtc` property for the time when the lock expires.
   *
   * When the lock on the session expires
   * - The current receiver can no longer be used to receive mode messages.
   * Create a new receiver using `ServiceBusClient.acceptSession()` or `ServiceBusClient.acceptNextSession()`.
   * - Messages that were received in `peekLock` mode with this receiver but not yet settled
   * will land back in the Queue/Subscription with their delivery count incremented.
   *
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns New lock token expiry date and time in UTC format.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws `ServiceBusError` if the service returns an error while renewing session lock.
   */
  async renewSessionLock(options?: OperationOptionsBase): Promise<Date> {
    this._throwIfReceiverOrConnectionClosed();
    const renewSessionLockOperationPromise = async (): Promise<Date> => {
      this._messageSession!.sessionLockedUntilUtc = await this._context
        .getManagementClient(this.entityPath)
        .renewSessionLock(this.sessionId, {
          ...options,
          associatedLinkName: this._messageSession.name,
          requestName: "renewSessionLock",
          timeoutInMs: this._retryOptions.timeoutInMs,
        });
      return this._messageSession!.sessionLockedUntilUtc!;
    };
    const config: RetryConfig<Date> = {
      operation: renewSessionLockOperationPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal,
    };
    return retry<Date>(config);
  }

  /**
   * Sets the state on the Session. For more on session states, see
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-sessions#message-session-state | Session State}
   * @param state - The state that needs to be set.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws `ServiceBusError` if the service returns an error while setting the session state.
   */
  async setSessionState(state: unknown, options: OperationOptionsBase = {}): Promise<void> {
    this._throwIfReceiverOrConnectionClosed();

    const setSessionStateOperationPromise = async (): Promise<void> => {
      await this._context
        .getManagementClient(this.entityPath)
        .setSessionState(this.sessionId!, state, {
          ...options,
          associatedLinkName: this._messageSession.name,
          requestName: "setState",
          timeoutInMs: this._retryOptions.timeoutInMs,
        });
      return;
    };
    const config: RetryConfig<void> = {
      operation: setSessionStateOperationPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal,
    };
    return retry<void>(config);
  }

  /**
   * Gets the state of the Session. For more on session states, see
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-sessions#message-session-state | Session State}
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns The state of that session
   * @throws Error if the underlying connection or receiver is closed.
   * @throws `ServiceBusError` if the service returns an error while retrieving session state.
   */
  async getSessionState(options: OperationOptionsBase = {}): Promise<any> {
    this._throwIfReceiverOrConnectionClosed();

    const getSessionStateOperationPromise = async (): Promise<any> => {
      return this._context.getManagementClient(this.entityPath).getSessionState(this.sessionId, {
        ...options,
        associatedLinkName: this._messageSession.name,
        requestName: "getState",
        timeoutInMs: this._retryOptions.timeoutInMs,
      });
    };
    const config: RetryConfig<any> = {
      operation: getSessionStateOperationPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal,
    };
    return retry<any>(config);
  }

  async peekMessages(
    maxMessageCount: number,
    options: PeekMessagesOptions = {}
  ): Promise<ServiceBusReceivedMessage[]> {
    this._throwIfReceiverOrConnectionClosed();

    const managementRequestOptions = {
      ...options,
      associatedLinkName: this._messageSession.name,
      requestName: "peekMessages",
      timeoutInMs: this._retryOptions?.timeoutInMs,
    };
    const peekOperationPromise = async (): Promise<ServiceBusReceivedMessage[]> => {
      if (options.fromSequenceNumber) {
        return this._context
          .getManagementClient(this.entityPath)
          .peekBySequenceNumber(
            options.fromSequenceNumber,
            maxMessageCount,
            this.sessionId,
            options.omitMessageBody,
            managementRequestOptions
          );
      } else {
        return this._context
          .getManagementClient(this.entityPath)
          .peekMessagesBySession(
            this.sessionId,
            maxMessageCount,
            options.omitMessageBody,
            managementRequestOptions
          );
      }
    };

    const config: RetryConfig<ServiceBusReceivedMessage[]> = {
      operation: peekOperationPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal,
    };
    return retry<ServiceBusReceivedMessage[]>(config);
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
    const receiveDeferredMessagesOperationPromise = async (): Promise<
      ServiceBusReceivedMessage[]
    > => {
      const deferredMessages = await this._context
        .getManagementClient(this.entityPath)
        .receiveDeferredMessages(deferredSequenceNumbers, this.receiveMode, this.sessionId, {
          ...options,
          associatedLinkName: this._messageSession.name,
          requestName: "receiveDeferredMessages",
          timeoutInMs: this._retryOptions.timeoutInMs,
        });
      return deferredMessages;
    };
    const config: RetryConfig<ServiceBusReceivedMessage[]> = {
      operation: receiveDeferredMessagesOperationPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal,
    };
    return retry<ServiceBusReceivedMessage[]>(config);
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

    const receiveBatchOperationPromise = async (): Promise<ServiceBusReceivedMessage[]> => {
      const receivedMessages = await this._messageSession!.receiveMessages(
        maxMessageCount,
        options?.maxWaitTimeInMs ?? Constants.defaultOperationTimeoutInMs,
        defaultMaxTimeAfterFirstMessageForBatchingMs,
        options ?? {}
      );

      return receivedMessages;
    };
    const config: RetryConfig<ServiceBusReceivedMessage[]> = {
      operation: receiveBatchOperationPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.receiveMessage,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal,
    };
    return retry<ServiceBusReceivedMessage[]>(config).catch((err) => {
      throw translateServiceBusError(err);
    });
  }

  subscribe(
    handlers: MessageHandlers,
    options?: SubscribeOptions
  ): {
    close(): Promise<void>;
  } {
    // TODO - receiverOptions for subscribe??
    assertValidMessageHandlers(handlers);

    options = options ?? {};

    const processError = wrapProcessErrorHandler(handlers);

    this._registerMessageHandler(
      async (message: ServiceBusMessageImpl) => {
        const span = this._createProcessingSpan(message, this, this._context.config, options);
        return trace(() => handlers.processMessage(message), span);
      },
      processError,
      options
    );

    return {
      close: async (): Promise<void> => {
        return this._messageSession?.receiverHelper.suspend();
      },
    };
  }

  /**
   * Registers handlers to deal with the incoming stream of messages over an AMQP receiver link
   * from a Queue/Subscription.
   * To stop receiving messages, call `close()` on the SessionReceiver.
   *
   * Throws an error if there is another receive operation in progress on the same receiver. If you
   * are not sure whether there is another receive operation running, check the `isReceivingMessages`
   * property on the receiver.
   *
   * @param onMessage - Handler for processing each incoming message.
   * @param onError - Handler for any error that occurs while receiving or processing messages.
   * @param options - Options to control whether messages should be automatically completed
   * or if the lock on the session should be automatically renewed. You can control the
   * maximum number of messages that should be concurrently processed. You can
   * also provide a timeout in milliseconds to denote the amount of time to wait for a new message
   * before closing the receiver.
   *
   * @throws Error if the underlying connection or receiver is closed.
   * @throws Error if the receiver is already in state of receiving messages.
   * @throws `ServiceBusError` if the service returns an error while receiving messages. These are bubbled up to be handled by user provided `onError` handler.
   */
  private _registerMessageHandler(
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

    try {
      this._messageSession.subscribe(onMessage, onError, options);
    } catch (err: any) {
      onError({
        error: err,
        errorSource: "receive",
        entityPath: this.entityPath,
        fullyQualifiedNamespace: this._context.config.host,
      });
    }
  }

  getMessageIterator(
    options?: GetMessageIteratorOptions
  ): AsyncIterableIterator<ServiceBusReceivedMessage> {
    return getMessageIterator(this, options);
  }

  async completeMessage(message: ServiceBusReceivedMessage): Promise<void> {
    this._throwIfReceiverOrConnectionClosed();
    throwErrorIfInvalidOperationOnMessage(message, this.receiveMode, this._context.connectionId);
    const msgImpl = message as ServiceBusMessageImpl;
    return completeMessage(msgImpl, this._context, this.entityPath, this._retryOptions);
  }

  async abandonMessage(
    message: ServiceBusReceivedMessage,
    propertiesToModify?: { [key: string]: number | boolean | string | Date | null }
  ): Promise<void> {
    this._throwIfReceiverOrConnectionClosed();
    throwErrorIfInvalidOperationOnMessage(message, this.receiveMode, this._context.connectionId);
    const msgImpl = message as ServiceBusMessageImpl;
    return abandonMessage(
      msgImpl,
      this._context,
      this.entityPath,
      propertiesToModify,
      this._retryOptions
    );
  }

  async deferMessage(
    message: ServiceBusReceivedMessage,
    propertiesToModify?: { [key: string]: number | boolean | string | Date | null }
  ): Promise<void> {
    this._throwIfReceiverOrConnectionClosed();
    throwErrorIfInvalidOperationOnMessage(message, this.receiveMode, this._context.connectionId);
    const msgImpl = message as ServiceBusMessageImpl;
    return deferMessage(
      msgImpl,
      this._context,
      this.entityPath,
      propertiesToModify,
      this._retryOptions
    );
  }

  async deadLetterMessage(
    message: ServiceBusReceivedMessage,
    options?: DeadLetterOptions & { [key: string]: number | boolean | string | Date | null }
  ): Promise<void> {
    this._throwIfReceiverOrConnectionClosed();
    throwErrorIfInvalidOperationOnMessage(message, this.receiveMode, this._context.connectionId);
    const msgImpl = message as ServiceBusMessageImpl;
    return deadLetterMessage(msgImpl, this._context, this.entityPath, options, this._retryOptions);
  }

  async renewMessageLock(): Promise<Date> {
    throw new Error("Renewing message lock is an invalid operation when working with sessions.");
  }

  async close(): Promise<void> {
    try {
      await this._messageSession.close();
    } catch (err: any) {
      logger.logError(
        err,
        "%s An error occurred while closing the SessionReceiver for session %s",
        this.logPrefix,
        this.sessionId
      );
      throw err;
    } finally {
      this._isClosed = true;
    }
  }

  /**
   * Indicates whether the receiver is currently receiving messages or not.
   * When this returns true, new `registerMessageHandler()` or `receiveMessages()` calls cannot be made.
   */
  private _isReceivingMessages(): boolean {
    return this._messageSession ? this._messageSession.isReceivingMessages : false;
  }
}
