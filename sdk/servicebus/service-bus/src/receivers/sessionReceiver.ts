// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ClientEntityContext } from "../clientEntityContext";
import {
  SessionReceiverOptions,
  SessionMessageHandlerOptions,
  MessageHandlers,
  SubscribeOptions,
  ReceiveBatchOptions,
  ReceivedMessage
} from "..";

import { GetMessageIteratorOptions, GetReceiverOptions } from "../models";
import { MessageSession } from "../session/messageSession";
import {
  throwErrorIfConnectionClosed,
  getOpenReceiverErrorMsg,
  getReceiverClosedErrorMsg,
  getAlreadyReceivingErrorMsg,
  throwTypeErrorIfParameterMissing,
  throwTypeErrorIfParameterNotLong,
  throwTypeErrorIfParameterNotLongArray
} from "../util/errors";
import * as log from "../log";
import { OnMessage, OnError } from "../core/messageReceiver";
import { assertValidMessageHandlers, getMessageIterator } from "./shared";
import { convertToInternalReceiveMode } from "../constructorHelpers";
import { Receiver } from "./receiver";
import Long from "long";
import { ServiceBusMessageImpl, ReceivedMessageWithLock } from "../serviceBusMessage";
import {
  getRetryAttemptTimeoutInMs,
  RetryConfig,
  RetryOperationType,
  retry,
  Constants
} from "@azure/core-amqp";

/**
 *A receiver that handles sessions, including renewing the session lock.
 */
export interface SessionReceiver<
  ReceivedMessageT extends ReceivedMessage | ReceivedMessageWithLock
> extends Receiver<ReceivedMessageT> {
  /**
   * The session ID.
   * Can be undefined until a AMQP receiver link has been successfully set up for the session
   */
  sessionId: string | undefined;

  /**
   * Methods related to service bus diagnostics.
   */
  diagnostics: {
    /**
     * Peek within a queue or subscription.
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

  /**
   * @property The time in UTC until which the session is locked.
   * Everytime `renewSessionLock()` is called, this time gets updated to current time plus the lock
   * duration as specified during the Queue/Subscription creation.
   *
   * Will return undefined until a AMQP receiver link has been successfully set up for the session.
   *
   * @readonly
   * @memberof SessionReceiver
   */
  sessionLockedUntilUtc: Date | undefined;

  /**
   * Renews the lock on the session.
   */
  renewSessionLock(): Promise<Date>;

  /**
   * Gets the state of the Session. For more on session states, see
   * {@link https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sessions#message-session-state Session State}
   * @returns {Promise<any>} The state of that session
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while retrieving session state.
   */
  getState(): Promise<any>;

  /**
   * Sets the state on the Session. For more on session states, see
   * {@link https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sessions#message-session-state Session State}
   * @param state The state that needs to be set.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while setting the session state.
   *
   * @param {*} state
   * @returns {Promise<void>}
   */
  setState(state: any): Promise<void>;
}

/**
 * @internal
 * @ignore
 */
export class SessionReceiverImpl<ReceivedMessageT extends ReceivedMessage | ReceivedMessageWithLock>
  implements SessionReceiver<ReceivedMessageT> {
  public entityPath: string;
  public sessionId: string | undefined;

  public diagnostics: {
    peek(maxMessageCount?: number): Promise<ReceivedMessage[]>;
    peekBySequenceNumber(
      fromSequenceNumber: Long,
      maxMessageCount?: number
    ): Promise<ReceivedMessage[]>;
  };

  /**
   * @property {ClientEntityContext} _context Describes the amqp connection context for the QueueClient.
   */

  private _context: ClientEntityContext;
  private _receiverOptions: GetReceiverOptions;
  private _messageSession: MessageSession | undefined;
  /**
   * @property {boolean} [_isClosed] Denotes if close() was called on this receiver
   */
  private _isClosed: boolean = false;

  /**
   * @internal
   * @throws Error if the underlying connection is closed.
   * @throws Error if an open receiver is already existing for given sessionId.
   */
  constructor(
    context: ClientEntityContext,
    public receiveMode: "peekLock" | "receiveAndDelete",
    private _sessionOptions: SessionReceiverOptions,
    receiverOptions: GetReceiverOptions
  ) {
    throwErrorIfConnectionClosed(context.namespace);
    this._context = context;
    this.entityPath = this._context.entityPath;
    this._receiverOptions = receiverOptions;
    this.diagnostics = {
      peek: (maxMessageCount) => this._peek(maxMessageCount),
      peekBySequenceNumber: (fromSequenceNumber, maxMessageCount) =>
        this._peekBySequenceNumber(fromSequenceNumber, maxMessageCount)
    };

    if (this._sessionOptions.sessionId) {
      this._sessionOptions.sessionId = String(this._sessionOptions.sessionId);

      // Check if receiver for given session already exists
      if (
        this._context.messageSessions[this._sessionOptions.sessionId] &&
        this._context.messageSessions[this._sessionOptions.sessionId].isOpen()
      ) {
        const errorMessage = getOpenReceiverErrorMsg(
          this._context.clientType,
          this._context.entityPath,
          this._sessionOptions.sessionId
        );
        const error = new Error(errorMessage);
        log.error(`[${this._context.namespace.connectionId}] %O`, error);
        throw error;
      }
    }
  }

  private _throwIfReceiverOrConnectionClosed(): void {
    throwErrorIfConnectionClosed(this._context.namespace);
    if (this.isClosed) {
      const errorMessage = getReceiverClosedErrorMsg(
        this._context.entityPath,
        this._context.clientType,
        this._context.isClosed,
        this.sessionId!
      );
      const error = new Error(errorMessage);
      log.error(`[${this._context.namespace.connectionId}] %O`, error);
      throw error;
    }
  }

  private async _createMessageSessionIfDoesntExist(timeoutInMs: number): Promise<number> {
    const createSessionOperationStartTime = Date.now();

    const actionAfterTimeout = () => {
      const desc: string = `Unable to create the message session in time. Please try again later.`;
      const e: Error = {
        name: "OperationTimeoutError",
        message: desc
      };

      throw e;
    };

    const waitTimer = setTimeout(actionAfterTimeout, timeoutInMs);

    try {
      if (this._messageSession) {
        // Returns the time taken by the createSession operation
        return Date.now() - createSessionOperationStartTime;
      }
      this._context.isSessionEnabled = true;
      this._messageSession = await MessageSession.create(this._context, {
        sessionId: this._sessionOptions.sessionId,
        maxSessionAutoRenewLockDurationInSeconds: this._sessionOptions
          .maxSessionAutoRenewLockDurationInSeconds,
        receiveMode: convertToInternalReceiveMode(this.receiveMode)
      });
      // By this point, we should have a valid sessionId on the messageSession
      // If not, the receiver cannot be used, so throw error.
      if (this._messageSession.sessionId == null) {
        const error = new Error("Something went wrong. Cannot lock a session.");
        log.error(`[${this._context.namespace.connectionId}] %O`, error);
        throw error;
      }
      this.sessionId = this._messageSession.sessionId;
      delete this._context.expiredMessageSessions[this._messageSession.sessionId];
    } catch (err) {
      throw err;
    } finally {
      clearTimeout(waitTimer);
    }
    // Returns the time taken by the createSession operation
    return Date.now() - createSessionOperationStartTime;
  }

  private _throwIfAlreadyReceiving(): void {
    if (this.isReceivingMessages()) {
      const errorMessage = getAlreadyReceivingErrorMsg(this._context.entityPath, this.sessionId);
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
    return (
      this._isClosed || (this.sessionId ? !this._context.messageSessions[this.sessionId] : false)
    );
  }

  /**
   * @property The time in UTC until which the session is locked.
   * Everytime `renewSessionLock()` is called, this time gets updated to current time plus the lock
   * duration as specified during the Queue/Subscription creation.
   *
   * Will return undefined until a AMQP receiver link has been successfully set up for the session.
   *
   * @readonly
   */
  public get sessionLockedUntilUtc(): Date | undefined {
    return this._messageSession ? this._messageSession.sessionLockedUntilUtc : undefined;
  }

  /**
   * Renews the lock on the session for the duration as specified during the Queue/Subscription
   * creation.
   * - Check the `sessionLockedUntilUtc` property on the SessionReceiver for the time when the lock expires.
   * - When the lock on the session expires
   *     - No more messages can be received using this receiver
   *     - If a message is not settled (using either `complete()`, `defer()` or `deadletter()`,
   *   before the session lock expires, then the message lands back in the Queue/Subscription for the next
   *   receive operation.
   *
   * @returns Promise<Date> - New lock token expiry date and time in UTC format.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while renewing session lock.
   */
  async renewSessionLock(): Promise<Date> {
    this._throwIfReceiverOrConnectionClosed();
    await this._createMessageSessionIfDoesntExist(this._receiverOptions.retryOptions?.timeoutInMs!);

    this._messageSession!.sessionLockedUntilUtc = await this._context.managementClient!.renewSessionLock(
      this.sessionId!,
      this._receiverOptions
    );
    return this._messageSession!.sessionLockedUntilUtc!;
  }

  /**
   * Sets the state on the Session. For more on session states, see
   * {@link https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sessions#message-session-state Session State}
   * @param state The state that needs to be set.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while setting the session state.
   */
  async setState(state: any): Promise<void> {
    this._throwIfReceiverOrConnectionClosed();
    await this._createMessageSessionIfDoesntExist(this._receiverOptions.retryOptions?.timeoutInMs!);

    return this._context.managementClient!.setSessionState(
      this.sessionId!,
      state,
      this._receiverOptions
    );
  }

  /**
   * Gets the state of the Session. For more on session states, see
   * {@link https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sessions#message-session-state Session State}
   * @returns Promise<any> The state of that session
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while retrieving session state.
   */
  async getState(): Promise<any> {
    this._throwIfReceiverOrConnectionClosed();
    await this._createMessageSessionIfDoesntExist(this._receiverOptions.retryOptions?.timeoutInMs!);

    return this._context.managementClient!.getSessionState(this.sessionId!, this._receiverOptions);
  }

  /**
   * Fetches the next batch of active messages (including deferred but not deadlettered messages) in
   * the current session.
   * - The first call to `peek()` fetches the first active message. Each subsequent call fetches the
   * subsequent message.
   * - Unlike a `received` message, `peeked` message is a read-only version of the message.
   * It cannot be `Completed/Abandoned/Deferred/Deadlettered`. The lock on it cannot be renewed.
   *
   * @param maxMessageCount The maximum number of messages to peek. Default value `1`.
   * @returns Promise<ReceivedMessageInfo[]>
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while peeking for messages.
   */
  private async _peek(maxMessageCount?: number): Promise<ReceivedMessage[]> {
    this._throwIfReceiverOrConnectionClosed();
    await this._createMessageSessionIfDoesntExist(this._receiverOptions.retryOptions?.timeoutInMs!);

    const internalMessages = await this._context.managementClient!.peekMessagesBySession(
      this.sessionId!,
      maxMessageCount,
      this._receiverOptions
    );
    return internalMessages.map((m) => m as ReceivedMessage);
  }

  /**
   * Peeks the desired number of active messages (including deferred but not deadlettered messages)
   * from the specified sequence number in the current session.
   * - Unlike a `received` message, `peeked` message is a read-only version of the message.
   * It cannot be `Completed/Abandoned/Deferred/Deadlettered`. The lock on it cannot be renewed.
   *
   * @param fromSequenceNumber The sequence number from where to read the message.
   * @param [maxMessageCount] The maximum number of messages to peek. Default value `1`.
   * @returns Promise<ReceivedSBMessage[]>
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while peeking for messages.
   */
  private async _peekBySequenceNumber(
    fromSequenceNumber: Long,
    maxMessageCount?: number
  ): Promise<ReceivedMessage[]> {
    this._throwIfReceiverOrConnectionClosed();
    const retryOptions = this._receiverOptions.retryOptions || {};
    retryOptions.timeoutInMs = getRetryAttemptTimeoutInMs(retryOptions);

    const peekBySequenceNumberOperationPromise = () =>
      new Promise<ReceivedMessage[]>(async (resolve, reject) => {
        try {
          const timeTakenByCreateSession = await this._createMessageSessionIfDoesntExist(
            retryOptions.timeoutInMs!
          );

          const internalMessages = await this._context.managementClient!.peekBySequenceNumber(
            fromSequenceNumber,
            maxMessageCount,
            this.sessionId,
            retryOptions.timeoutInMs! - timeTakenByCreateSession
          );
          resolve(internalMessages.map((m) => m as ReceivedMessage));
        } catch (error) {
          reject(error);
        }
      });
    const config: RetryConfig<ReceivedMessage[]> = {
      operation: peekBySequenceNumberOperationPromise,
      connectionId: this._context.namespace.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: retryOptions
    };
    return retry<ReceivedMessage[]>(config);
  }

  /**
   * Returns a promise that resolves to a deferred message identified by the given `sequenceNumber`.
   * @param sequenceNumber The sequence number of the message that needs to be received.
   * @returns Promise<ServiceBusMessage | undefined>
   * - Returns `Message` identified by sequence number.
   * - Returns `undefined` if no such message is found.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while receiving deferred message.
   */
  async receiveDeferredMessage(sequenceNumber: Long): Promise<ReceivedMessageT | undefined> {
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

    await this._createMessageSessionIfDoesntExist(this._receiverOptions.retryOptions?.timeoutInMs!);

    const messages = await this._context.managementClient!.receiveDeferredMessages(
      [sequenceNumber],
      convertToInternalReceiveMode(this.receiveMode),
      this.sessionId,
      this._receiverOptions
    );
    return (messages[0] as any) as ReceivedMessageT;
  }

  /**
   * Returns a promise that resolves to an array of deferred messages identified by given `sequenceNumbers`.
   * @param sequenceNumbers An array of sequence numbers for the messages that need to be received.
   * @returns Promise<ServiceBusMessage[]>
   * - Returns a list of messages identified by the given sequenceNumbers.
   * - Returns an empty list if no messages are found.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while receiving deferred messages.
   */
  async receiveDeferredMessages(sequenceNumbers: Long[]): Promise<ReceivedMessageT[]> {
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

    await this._createMessageSessionIfDoesntExist(this._receiverOptions.retryOptions?.timeoutInMs!);

    const deferredMessages = await this._context.managementClient!.receiveDeferredMessages(
      sequenceNumbers,
      convertToInternalReceiveMode(this.receiveMode),
      this.sessionId,
      this._receiverOptions
    );

    return (deferredMessages as any) as ReceivedMessageT[];
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
   * @returns Promise<ServiceBusMessage[]> A promise that resolves with an array of Message objects.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws Error if the receiver is already in state of receiving messages.
   * @throws MessagingError if the service returns an error while receiving messages.
   */
  async receiveBatch(
    maxMessageCount: number,
    options?: ReceiveBatchOptions
  ): Promise<ReceivedMessageT[]> {
    this._throwIfReceiverOrConnectionClosed();
    this._throwIfAlreadyReceiving();
    await this._createMessageSessionIfDoesntExist(this._receiverOptions.retryOptions?.timeoutInMs!);

    const receivedMessages = await this._messageSession!.receiveMessages(
      maxMessageCount,
      options?.maxWaitTimeSeconds
      // this._receiverOptions - No need to pass?
    );

    return (receivedMessages as any) as ReceivedMessageT[];
  }

  subscribe(handlers: MessageHandlers<ReceivedMessageT>, options?: SubscribeOptions): void {
    // TODO - receiverOptions for subscribe??
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
   * also provide a timeout in seconds to denote the amount of time to wait for a new message
   * before closing the receiver.
   *
   * @returns void
   * @throws Error if the underlying connection or receiver is closed.
   * @throws Error if the receiver is already in state of receiving messages.
   * @throws MessagingErrormif the service returns an error while receiving messages. These are bubbled up to be handled by user provided `onError` handler.
   */
  private _registerMessageHandler(
    onMessage: OnMessage,
    onError: OnError,
    options?: SessionMessageHandlerOptions
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

    this._createMessageSessionIfDoesntExist(Constants.defaultOperationTimeoutInMs)
      .then(async () => {
        if (!this._messageSession) {
          return;
        }
        if (!this._isClosed) {
          this._messageSession.receive(onMessage, onError, options);
        } else {
          await this._messageSession.close();
        }
        return;
      })
      .catch((err) => {
        onError(err);
      });
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
  getMessageIterator(options?: GetMessageIteratorOptions): AsyncIterableIterator<ReceivedMessageT> {
    return getMessageIterator(this, options);
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
      if (this._messageSession) {
        await this._messageSession.close();
        this._messageSession = undefined;
      }
    } catch (err) {
      log.error(
        "[%s] An error occurred while closing the SessionReceiver for session %s in %s: %O",
        this._context.namespace.connectionId,
        this.sessionId,
        this._context.entityPath,
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
  isReceivingMessages(): boolean {
    return this._messageSession ? this._messageSession.isReceivingMessages : false;
  }
}
