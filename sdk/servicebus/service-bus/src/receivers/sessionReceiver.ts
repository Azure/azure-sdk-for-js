// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ConnectionContext } from "../connectionContext";
import {
  MessageHandlers,
  OperationOptions,
  ReceiveMessagesOptions,
  ServiceBusReceivedMessage
} from "..";
import {
  PeekMessagesOptions,
  CreateSessionReceiverOptions,
  GetMessageIteratorOptions,
  MessageHandlerOptionsBase,
  SessionSubscribeOptions,
  ReceiveMode
} from "../models";
import { MessageSession } from "../session/messageSession";
import {
  getAlreadyReceivingErrorMsg,
  getReceiverClosedErrorMsg,
  logError,
  throwErrorIfConnectionClosed,
  throwTypeErrorIfParameterMissing,
  throwTypeErrorIfParameterNotLong
} from "../util/errors";
import { OnError, OnMessage } from "../core/messageReceiver";
import { assertValidMessageHandlers, getMessageIterator, wrapProcessErrorHandler } from "./shared";
import { convertToInternalReceiveMode } from "../constructorHelpers";
import { defaultMaxTimeAfterFirstMessageForBatchingMs, ServiceBusReceiver } from "./receiver";
import Long from "long";
import { ServiceBusReceivedMessageWithLock, ServiceBusMessageImpl } from "../serviceBusMessage";
import {
  Constants,
  RetryConfig,
  RetryOperationType,
  RetryOptions,
  retry,
  ErrorNameConditionMapper,
  translate
} from "@azure/core-amqp";
import { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";
import "@azure/core-asynciterator-polyfill";
import { AmqpError } from "rhea-promise";

/**
 *A receiver that handles sessions, including renewing the session lock.
 */
export interface ServiceBusSessionReceiver<
  ReceivedMessageT extends ServiceBusReceivedMessage | ServiceBusReceivedMessageWithLock
> extends ServiceBusReceiver<ReceivedMessageT> {
  /**
   * The session ID. This field is undefined until `accept` is called on this receiver.
   */
  readonly sessionId: string | undefined;

  /**
   * @property The time in UTC until which the session is locked.
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
   * @param handlers A handler that gets called for messages and errors.
   * @param options Options for subscribe.
   * @returns An object that can be closed, sending any remaining messages to `handlers` and
   * stopping new messages from arriving.
   */
  subscribe(
    handlers: MessageHandlers<ReceivedMessageT>,
    options?: SessionSubscribeOptions
  ): {
    /**
     * Causes the subscriber to stop receiving new messages.
     */
    close(): Promise<void>;
  };

  /**
   * Locks and opens the specified session with this receiver.
   *
   * @param sessionId The id of the session from which messages need to be received. If
   * sessionId is omitted or undefined Service Bus chooses a random session from available sessions.
   */
  accept(
    sessionId: string,
    options?: OperationOptions
  ): Promise<ServiceBusSessionReceiver<ReceivedMessageT>>;
  /**
   * Locks and opens a random session with this receiver.
   *
   * @param options Options bag for passing an abort signal or tracing options.
   */
  accept(options?: OperationOptions): Promise<ServiceBusSessionReceiver<ReceivedMessageT>>;

  /**
   * Renews the lock on the session.
   */
  renewSessionLock(options?: OperationOptionsBase): Promise<Date>;

  /**
   * Gets the state of the Session. For more on session states, see
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-sessions#message-session-state Session State}
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns {Promise<any>} The state of that session
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while retrieving session state.
   */
  getSessionState(options?: OperationOptionsBase): Promise<any>;

  /**
   * Sets the state on the Session. For more on session states, see
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-sessions#message-session-state Session State}
   * @param state The state that needs to be set.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while setting the session state.
   *
   * @param {*} state
   * @returns {Promise<void>}
   */
  setSessionState(state: any, options?: OperationOptionsBase): Promise<void>;
}

/**
 * @internal
 * @ignore
 */
export class ServiceBusSessionReceiverImpl<
  ReceivedMessageT extends ServiceBusReceivedMessage | ServiceBusReceivedMessageWithLock
> implements ServiceBusSessionReceiver<ReceivedMessageT> {
  public sessionId: string | undefined;

  /**
   * @property {boolean} [_isClosed] Denotes if close() was called on this receiver
   */
  private _isClosed: boolean = false;

  private _messageSession: MessageSession | undefined;

  public receiveMode: ReceiveMode;

  /**
   * @internal
   * @throws Error if the underlying connection is closed.
   * @throws Error if an open receiver is already existing for given sessionId.
   */
  constructor(
    private _context: ConnectionContext,
    public entityPath: string,
    private _retryOptions: RetryOptions = {},
    private _messageSessionOptions:
      | CreateSessionReceiverOptions<"peekLock">
      | CreateSessionReceiverOptions<"receiveAndDelete">
      | undefined
  ) {
    throwErrorIfConnectionClosed(_context);

    this.receiveMode = _messageSessionOptions?.receiveMode ?? "peekLock";
  }

  private _getMessageSessionOrThrow(): MessageSession {
    this._throwifClosed();

    if (this._messageSession == null) {
      throw new Error("You must call .accept on this session receiver before using it.");
    }

    return this._messageSession;
  }

  private _throwifClosed() {
    throwErrorIfConnectionClosed(this._context);
    if (this.isClosed) {
      if (this._isClosed) {
        const errorMessage = getReceiverClosedErrorMsg(this.entityPath, this.sessionId);
        const error = new Error(errorMessage);
        logError(error, `[${this._context.connectionId}] %O`, error);
        throw error;
      }
      const amqpError: AmqpError = {
        condition: ErrorNameConditionMapper.SessionLockLostError,
        description: `The session lock has expired on the session with id ${this.sessionId}`
      };
      throw translate(amqpError);
    }
  }

  private _throwIfAlreadyReceiving(): void {
    if (this._isReceivingMessages()) {
      const errorMessage = getAlreadyReceivingErrorMsg(this.entityPath, this.sessionId);
      const error = new Error(errorMessage);
      logError(error, `[${this._context.connectionId}] %O`, error);
      throw error;
    }
  }

  public get isClosed(): boolean {
    if (this._messageSession == null) {
      // TODO: so..it's not closed, the user just has to call .accept() to start it up.
      return false;
    }

    return (
      this._isClosed ||
      !this._context.messageSessions[this._messageSession.name] ||
      !this._messageSession.isOpen()
    );
  }

  /**
   * @property The time in UTC until which the session is locked.
   * Every time `renewSessionLock()` is called, this time gets updated to current time plus the lock
   * duration as specified during the Queue/Subscription creation.
   *
   * When the lock on the session expires
   * - The current receiver can no longer be used to receive more messages.
   * Create a new receiver using the `ServiceBusClient.createSessionReceiver()`.
   * - Messages that were received in `peekLock` mode with this receiver but not yet settled
   * will land back in the Queue/Subscription with their delivery count incremented.
   *
   * @readonly
   */
  public get sessionLockedUntilUtc(): Date {
    const messageSession = this._getMessageSessionOrThrow();
    return messageSession.sessionLockedUntilUtc;
  }

  /**
   * Locks and opens the specified session with this receiver.
   *
   * @param sessionId The id of the session from which messages need to be received. If
   * sessionId is omitted or undefined Service Bus chooses a random session from available sessions.
   */
  async accept(
    sessionId: string,
    options?: OperationOptions
  ): Promise<ServiceBusSessionReceiver<ReceivedMessageT>>;
  /**
   * Locks and opens a random session with this receiver.
   *
   * @param options Options bag for passing an abort signal or tracing options.
   */
  async accept(options?: OperationOptions): Promise<ServiceBusSessionReceiver<ReceivedMessageT>>;
  async accept(
    sessionIdOrOptions1?: string | OperationOptions,
    options2?: OperationOptions
  ): Promise<ServiceBusSessionReceiver<ReceivedMessageT>> {
    if (this.sessionId != null) {
      throw new Error(
        "A session receiver can only accept a single session. You must create a new session receiver to receive from another session."
      );
    }

    const sessionId: string | undefined =
      typeof sessionIdOrOptions1 === "string" ? sessionIdOrOptions1 : undefined;
    const options: OperationOptions | undefined =
      typeof sessionIdOrOptions1 === "string" ? options2 : sessionIdOrOptions1;

    this._messageSession = new MessageSession(this._context, this.entityPath, {
      sessionId: sessionId,
      maxAutoRenewLockDurationInMs: this._messageSessionOptions?.maxAutoRenewLockDurationInMs,
      receiveMode: convertToInternalReceiveMode(this.receiveMode)
    });

    await this._messageSession.init(options?.abortSignal);
    this.sessionId = this._messageSession.sessionId;
    return this;
  }

  /**
   * Renews the lock on the session for the duration as specified during the Queue/Subscription
   * creation. You can check the `sessionLockedUntilUtc` property for the time when the lock expires.
   *
   * When the lock on the session expires
   * - The current receiver can no longer be used to receive mode messages.
   * Create a new receiver using the `ServiceBusClient.createSessionReceiver()`.
   * - Messages that were received in `peekLock` mode with this receiver but not yet settled
   * will land back in the Queue/Subscription with their delivery count incremented.
   *
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns Promise<Date> - New lock token expiry date and time in UTC format.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while renewing session lock.
   */
  async renewSessionLock(options?: OperationOptionsBase): Promise<Date> {
    const messageSession = this._getMessageSessionOrThrow();

    const renewSessionLockOperationPromise = async () => {
      messageSession.sessionLockedUntilUtc = await this._context
        .getManagementClient(this.entityPath)
        .renewSessionLock(messageSession.sessionId, {
          ...options,
          associatedLinkName: messageSession.name,
          requestName: "renewSessionLock",
          timeoutInMs: this._retryOptions.timeoutInMs
        });
      return this._messageSession!.sessionLockedUntilUtc!;
    };
    const config: RetryConfig<Date> = {
      operation: renewSessionLockOperationPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal
    };
    return retry<Date>(config);
  }

  /**
   * Sets the state on the Session. For more on session states, see
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-sessions#message-session-state Session State}
   * @param state The state that needs to be set.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while setting the session state.
   */
  async setSessionState(state: any, options: OperationOptionsBase = {}): Promise<void> {
    const messageSession = this._getMessageSessionOrThrow();

    const setSessionStateOperationPromise = async () => {
      await this._context
        .getManagementClient(this.entityPath)
        .setSessionState(this.sessionId!, state, {
          ...options,
          associatedLinkName: messageSession.name,
          requestName: "setState",
          timeoutInMs: this._retryOptions.timeoutInMs
        });
      return;
    };
    const config: RetryConfig<void> = {
      operation: setSessionStateOperationPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal
    };
    return retry<void>(config);
  }

  /**
   * Gets the state of the Session. For more on session states, see
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-sessions#message-session-state Session State}
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns Promise<any> The state of that session
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while retrieving session state.
   */
  async getSessionState(options: OperationOptionsBase = {}): Promise<any> {
    const messageSession = this._getMessageSessionOrThrow();

    const getSessionStateOperationPromise = async () => {
      return this._context
        .getManagementClient(this.entityPath)
        .getSessionState(messageSession.sessionId, {
          ...options,
          associatedLinkName: messageSession.name,
          requestName: "getState",
          timeoutInMs: this._retryOptions.timeoutInMs
        });
    };
    const config: RetryConfig<any> = {
      operation: getSessionStateOperationPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal
    };
    return retry<any>(config);
  }

  async peekMessages(
    maxMessageCount: number,
    options: PeekMessagesOptions = {}
  ): Promise<ServiceBusReceivedMessage[]> {
    const messageSession = this._getMessageSessionOrThrow();

    if (maxMessageCount == undefined) {
      maxMessageCount = 1;
    }

    const managementRequestOptions = {
      ...options,
      associatedLinkName: messageSession.name,
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
            this.sessionId,
            managementRequestOptions
          );
      } else {
        return await this._context
          .getManagementClient(this.entityPath)
          .peekMessagesBySession(
            messageSession.sessionId,
            maxMessageCount,
            managementRequestOptions
          );
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

  async receiveDeferredMessages(
    sequenceNumbers: Long | Long[],
    options: OperationOptionsBase = {}
  ): Promise<ReceivedMessageT[]> {
    const messageSession = this._getMessageSessionOrThrow();
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
        .receiveDeferredMessages(
          deferredSequenceNumbers,
          messageSession.receiveMode,
          this.sessionId,
          {
            ...options,
            associatedLinkName: messageSession.name,
            requestName: "receiveDeferredMessages",
            timeoutInMs: this._retryOptions.timeoutInMs
          }
        );
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

  async receiveMessages(
    maxMessageCount: number,
    options?: ReceiveMessagesOptions
  ): Promise<ReceivedMessageT[]> {
    const messageSession = this._getMessageSessionOrThrow();
    this._throwIfAlreadyReceiving();

    if (maxMessageCount == undefined) {
      maxMessageCount = 1;
    }

    const receiveBatchOperationPromise = async () => {
      const receivedMessages = await messageSession.receiveMessages(
        maxMessageCount,
        options?.maxWaitTimeInMs ?? Constants.defaultOperationTimeoutInMs,
        defaultMaxTimeAfterFirstMessageForBatchingMs,
        options?.abortSignal
      );

      return (receivedMessages as any) as ReceivedMessageT[];
    };
    const config: RetryConfig<ReceivedMessageT[]> = {
      operation: receiveBatchOperationPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.receiveMessage,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal
    };
    return retry<ReceivedMessageT[]>(config);
  }

  subscribe(
    handlers: MessageHandlers<ReceivedMessageT>,
    options?: SessionSubscribeOptions
  ): {
    close(): Promise<void>;
  } {
    // TODO - receiverOptions for subscribe??
    assertValidMessageHandlers(handlers);

    const processError = wrapProcessErrorHandler(handlers);

    this._registerMessageHandler(
      async (message: ServiceBusMessageImpl) => {
        return handlers.processMessage((message as any) as ReceivedMessageT);
      },
      processError,
      options
    );

    return {
      close: async (): Promise<void> => {
        return this._messageSession?.receiverHelper.suspend();
      }
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
   * @returns void
   * @throws Error if the underlying connection or receiver is closed.
   * @throws Error if the receiver is already in state of receiving messages.
   * @throws MessagingError if the service returns an error while receiving messages. These are bubbled up to be handled by user provided `onError` handler.
   */
  private _registerMessageHandler(
    onMessage: OnMessage,
    onError: OnError,
    options?: MessageHandlerOptionsBase
  ): void {
    const messageSession = this._getMessageSessionOrThrow();
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
      messageSession.subscribe(onMessage, onError, options);
    } catch (err) {
      onError(err);
    }
  }

  getMessageIterator(options?: GetMessageIteratorOptions): AsyncIterableIterator<ReceivedMessageT> {
    return getMessageIterator(this, options);
  }

  async close(): Promise<void> {
    try {
      if (this._messageSession) {
        await this._messageSession.close();
      }
    } catch (err) {
      logError(
        err,
        "[%s] An error occurred while closing the SessionReceiver for session %s in %s: %O",
        this._context.connectionId,
        this.sessionId,
        this.entityPath,
        err
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
