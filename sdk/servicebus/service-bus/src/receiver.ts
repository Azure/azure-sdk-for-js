// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import Long from "long";
import * as log from "./log";
import { StreamingReceiver, MessageHandlerOptions } from "./core/streamingReceiver";
import { BatchingReceiver } from "./core/batchingReceiver";
import { ReceiveOptions, OnError, OnMessage } from "./core/messageReceiver";
import { ClientEntityContext } from "./clientEntityContext";
import { ServiceBusMessage, ReceiveMode, ReceivedMessageInfo } from "./serviceBusMessage";
import {
  MessageSession,
  SessionMessageHandlerOptions,
  SessionReceiverOptions
} from "./session/messageSession";
import {
  getAlreadyReceivingErrorMsg,
  getOpenReceiverErrorMsg,
  getReceiverClosedErrorMsg,
  throwErrorIfConnectionClosed,
  throwTypeErrorIfParameterMissing,
  throwTypeErrorIfParameterNotLong,
  throwTypeErrorIfParameterNotLongArray,
  getErrorMessageNotSupportedInReceiveAndDeleteMode
} from "./util/errors";

/**
 * The Receiver class can be used to receive messages in a batch or by registering handlers.
 * Use the `createReceiver` function on the QueueClient or SubscriptionClient to instantiate a Receiver.
 * The Receiver class is an abstraction over the underlying AMQP receiver link.
 * @class Receiver
 */
export class Receiver {
  /**
   * @property Describes the amqp connection context for the QueueClient.
   */
  private _context: ClientEntityContext;
  private _receiveMode: ReceiveMode;
  /**
   * @property {boolean} [_isClosed] Denotes if close() was called on this receiver
   */
  private _isClosed: boolean = false;

  /**
   * @property Denotes receiveMode of this receiver.
   * @readonly
   */
  public get receiveMode(): ReceiveMode {
    return this._receiveMode;
  }

  /**
   * @property Returns `true` if either the receiver or the client that created it has been closed
   * @readonly
   */
  public get isClosed(): boolean {
    return this._isClosed || this._context.isClosed;
  }

  /**
   * @internal
   */
  constructor(context: ClientEntityContext, receiveMode: ReceiveMode) {
    throwErrorIfConnectionClosed(context.namespace);
    this._context = context;

    this._receiveMode =
      receiveMode === ReceiveMode.receiveAndDelete ? receiveMode : ReceiveMode.peekLock;
  }

  /**
   * Registers handlers to deal with the incoming stream of messages over an AMQP receiver link
   * from a Queue/Subscription.
   * To stop receiving messages, call `close()` on the Receiver or set the property
   * `newMessageWaitTimeoutInSeconds` in the options to provide a timeout.
   *
   * @param onMessage - Handler for processing each incoming message.
   * @param onError - Handler for any error that occurs while receiving or processing messages.
   * @param options - Options to control if messages should be automatically completed, and/or have
   * their locks automatically renewed. You can control the maximum number of messages that should
   * be concurrently processed. You can also provide a timeout in seconds to denote the
   * amount of time to wait for a new message before closing the receiver.
   *
   * @returns void
   */
  registerMessageHandler(
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
      receiveMode: this._receiveMode
    })
      .then(async (sReceiver) => {
        if (!sReceiver) {
          return;
        }
        if (!this.isClosed) {
          return sReceiver.receive(onMessage, onError);
        } else {
          await sReceiver.close();
        }
      })
      .catch((err) => {
        onError(err);
      });
  }

  /**
   * Returns a promise that resolves to an array of messages based on given count and timeout over
   * an AMQP receiver link from a Queue/Subscription.
   *
   * @param maxMessageCount      The maximum number of messages to receive from Queue/Subscription.
   * @param idleTimeoutInSeconds The maximum wait time in seconds for which the Receiver
   * should wait to receive the first message. If no message is received by this time,
   * the returned promise gets resolved to an empty array.
   * - **Default**: `60` seconds.
   * @returns Promise<ServiceBusMessage[]> A promise that resolves with an array of Message objects.
   */
  async receiveMessages(
    maxMessageCount: number,
    idleTimeoutInSeconds?: number
  ): Promise<ServiceBusMessage[]> {
    this._throwIfReceiverOrConnectionClosed();
    this._throwIfAlreadyReceiving();

    if (!this._context.batchingReceiver || !this._context.batchingReceiver.isOpen()) {
      const options: ReceiveOptions = {
        maxConcurrentCalls: 0,
        receiveMode: this._receiveMode,
        newMessageWaitTimeoutInSeconds: 1
      };
      this._context.batchingReceiver = BatchingReceiver.create(this._context, options);
    }

    return this._context.batchingReceiver.receive(maxMessageCount, idleTimeoutInSeconds);
  }

  /**
   * Gets an async iterator over messages from the receiver.
   * While iterating, you will get `undefined` instead of a message, if the iterator is not able to
   * fetch a new message in over a minute.
   */
  async *getMessageIterator(): AsyncIterableIterator<ServiceBusMessage> {
    while (true) {
      const currentBatch = await this.receiveMessages(1);
      yield currentBatch[0];
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
   */
  async renewMessageLock(lockTokenOrMessage: string | ServiceBusMessage): Promise<Date> {
    this._throwIfReceiverOrConnectionClosed();
    if (this._receiveMode !== ReceiveMode.peekLock) {
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

    let receiverName;
    if (this._context.batchingReceiver) {
      receiverName = this._context.batchingReceiver.name;
    } else if (this._context.streamingReceiver) {
      receiverName = this._context.streamingReceiver.name;
    }

    const lockedUntilUtc = await this._context.managementClient!.renewLock(lockToken, receiverName);

    return lockedUntilUtc;
  }

  /**
   * Returns a promise that resolves to a deferred message identified by the given `sequenceNumber`.
   * @param sequenceNumber The sequence number of the message that needs to be received.
   * @returns Promise<ServiceBusMessage | undefined>
   * - Returns `Message` identified by sequence number.
   * - Returns `undefined` if no such message is found.
   * - Throws an error if the message has not been deferred.
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
      this._receiveMode
    );
    return messages[0];
  }

  /**
   * Returns a promise that resolves to an array of deferred messages identified by given `sequenceNumbers`.
   * @param sequenceNumbers An array of sequence numbers for the messages that need to be received.
   * @returns Promise<ServiceBusMessage[]>
   * - Returns a list of messages identified by the given sequenceNumbers.
   * - Returns an empty list if no messages are found.
   * - Throws an error if the messages have not been deferred.
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
      this._receiveMode
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
    } finally {
      this._isClosed = true;
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
}

/**
 * The SessionReceiver class can be used to receive messages from a session enabled Queue or
 * Subscription in a batch or by registering handlers.
 * Use the `createReceiver` function on the QueueClient or SubscriptionClient to instantiate a
 * SessionReceiver.
 * The SessionReceiver class is an abstraction over the underlying AMQP receiver link.
 * @class SessionReceiver
 */
export class SessionReceiver {
  /**
   * @property {ClientEntityContext} _context Describes the amqp connection context for the QueueClient.
   */

  private _context: ClientEntityContext;
  private _receiveMode: ReceiveMode;
  private _messageSession: MessageSession | undefined;
  private _sessionOptions: SessionReceiverOptions;
  /**
   * @property {boolean} [_isClosed] Denotes if close() was called on this receiver
   */
  private _isClosed: boolean = false;
  private _sessionId: string | undefined;

  /**
   * @property Denotes receiveMode of this receiver.
   * @readonly
   */
  public get receiveMode(): ReceiveMode {
    return this._receiveMode;
  }

  /**
   * @property Returns `true` if either the receiver or the client that created it has been closed
   * @readonly
   */
  public get isClosed(): boolean {
    return (
      this._isClosed || (this.sessionId ? !this._context.messageSessions[this.sessionId] : false)
    );
  }

  /**
   * @property The sessionId for the message session.
   * Will return undefined until a AMQP receiver link has been successfully set up for the session.
   * @readonly
   */
  public get sessionId(): string | undefined {
    return this._sessionId;
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
   * @internal
   */
  constructor(
    context: ClientEntityContext,
    receiveMode: ReceiveMode,
    sessionOptions: SessionReceiverOptions
  ) {
    throwErrorIfConnectionClosed(context.namespace);
    this._context = context;
    this._receiveMode =
      receiveMode === ReceiveMode.receiveAndDelete ? receiveMode : ReceiveMode.peekLock;
    this._sessionOptions = sessionOptions;

    if (sessionOptions.sessionId) {
      sessionOptions.sessionId = String(sessionOptions.sessionId);

      // Check if receiver for given session already exists
      if (
        this._context.messageSessions[sessionOptions.sessionId] &&
        this._context.messageSessions[sessionOptions.sessionId].isOpen()
      ) {
        const errorMessage = getOpenReceiverErrorMsg(
          this._context.clientType,
          this._context.entityPath,
          sessionOptions.sessionId
        );
        const error = new Error(errorMessage);
        log.error(`[${this._context.namespace.connectionId}] %O`, error);
        throw error;
      }
    }
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
   */
  async renewSessionLock(): Promise<Date> {
    this._throwIfReceiverOrConnectionClosed();
    await this._createMessageSessionIfDoesntExist();

    this._messageSession!.sessionLockedUntilUtc = await this._context.managementClient!.renewSessionLock(
      this.sessionId!,
      this._messageSession!.name
    );
    return this._messageSession!.sessionLockedUntilUtc!;
  }

  /**
   * Sets the state on the Session. For more on session states, see
   * {@link https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sessions#message-session-state Session State}
   * @param state The state that needs to be set.
   */
  async setState(state: any): Promise<void> {
    this._throwIfReceiverOrConnectionClosed();
    await this._createMessageSessionIfDoesntExist();
    return this._context.managementClient!.setSessionState(
      this.sessionId!,
      state,
      this._messageSession!.name
    );
  }

  /**
   * Gets the state of the Session. For more on session states, see
   * {@link https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sessions#message-session-state Session State}
   * @returns Promise<any> The state of that session
   */
  async getState(): Promise<any> {
    this._throwIfReceiverOrConnectionClosed();
    await this._createMessageSessionIfDoesntExist();
    return this._context.managementClient!.getSessionState(
      this.sessionId!,
      this._messageSession!.name
    );
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
   */
  async peek(maxMessageCount?: number): Promise<ReceivedMessageInfo[]> {
    this._throwIfReceiverOrConnectionClosed();
    await this._createMessageSessionIfDoesntExist();
    return this._context.managementClient!.peekMessagesBySession(
      this.sessionId!,
      this._messageSession!.name,
      maxMessageCount
    );
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
   */
  async peekBySequenceNumber(
    fromSequenceNumber: Long,
    maxMessageCount?: number
  ): Promise<ReceivedMessageInfo[]> {
    this._throwIfReceiverOrConnectionClosed();
    await this._createMessageSessionIfDoesntExist();
    return this._context.managementClient!.peekBySequenceNumber(
      fromSequenceNumber,
      maxMessageCount,
      this.sessionId,
      this._messageSession!.name
    );
  }

  /**
   * Returns a promise that resolves to a deferred message identified by the given `sequenceNumber`.
   * @param sequenceNumber The sequence number of the message that needs to be received.
   * @returns Promise<ServiceBusMessage | undefined>
   * - Returns `Message` identified by sequence number.
   * - Returns `undefined` if no such message is found.
   * - Throws an error if the message has not been deferred.
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

    await this._createMessageSessionIfDoesntExist();
    const messages = await this._context.managementClient!.receiveDeferredMessages(
      [sequenceNumber],
      this._receiveMode,
      this.sessionId
    );
    return messages[0];
  }

  /**
   * Returns a promise that resolves to an array of deferred messages identified by given `sequenceNumbers`.
   * @param sequenceNumbers An array of sequence numbers for the messages that need to be received.
   * @returns Promise<ServiceBusMessage[]>
   * - Returns a list of messages identified by the given sequenceNumbers.
   * - Returns an empty list if no messages are found.
   * - Throws an error if the messages have not been deferred.
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

    await this._createMessageSessionIfDoesntExist();
    return this._context.managementClient!.receiveDeferredMessages(
      sequenceNumbers,
      this._receiveMode,
      this.sessionId
    );
  }

  /**
   * Returns a promise that resolves to an array of messages based on given count and timeout over
   * an AMQP receiver link from a Queue/Subscription.
   *
   * @param maxMessageCount      The maximum number of messages to receive from Queue/Subscription.
   * @param maxWaitTimeInSeconds The maximum wait time in seconds for which the Receiver
   * should wait to receive the first message. If no message is received by this time,
   * the returned promise gets resolved to an empty array.
   * - **Default**: `60` seconds.
   * @returns Promise<ServiceBusMessage[]> A promise that resolves with an array of Message objects.
   */
  async receiveMessages(
    maxMessageCount: number,
    maxWaitTimeInSeconds?: number
  ): Promise<ServiceBusMessage[]> {
    this._throwIfReceiverOrConnectionClosed();
    this._throwIfAlreadyReceiving();
    await this._createMessageSessionIfDoesntExist();
    return this._messageSession!.receiveMessages(maxMessageCount, maxWaitTimeInSeconds);
  }

  /**
   * Registers handlers to deal with the incoming stream of messages over an AMQP receiver link
   * from a Queue/Subscription.
   * To stop receiving messages, call `close()` on the SessionReceiver or set the property
   * `newMessageWaitTimeoutInSeconds` in the options to provide a timeout.
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
   */
  registerMessageHandler(
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

    this._createMessageSessionIfDoesntExist()
      .then(async () => {
        if (!this._messageSession) {
          return;
        }
        if (!this._isClosed) {
          this._messageSession.receive(onMessage, onError, options);
        } else {
          await this._messageSession.close();
        }
      })
      .catch((err) => {
        onError(err);
      });
  }

  /**
   * Gets an async iterator over messages from the receiver.
   * While iterating, you will get `undefined` instead of a message, if the iterator is not able to
   * fetch a new message in over a minute.
   */
  async *getMessageIterator(): AsyncIterableIterator<ServiceBusMessage> {
    while (true) {
      const currentBatch = await this.receiveMessages(1);
      yield currentBatch[0];
    }
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

  private async _createMessageSessionIfDoesntExist(): Promise<void> {
    if (this._messageSession) {
      return;
    }
    this._context.isSessionEnabled = true;
    this._messageSession = await MessageSession.create(this._context, {
      sessionId: this._sessionOptions.sessionId,
      maxSessionAutoRenewLockDurationInSeconds: this._sessionOptions
        .maxSessionAutoRenewLockDurationInSeconds,
      receiveMode: this._receiveMode
    });
    // By this point, we should have a valid sessionId on the messageSession
    // If not, the receiver cannot be used, so throw error.
    if (!this._messageSession.sessionId) {
      const error = new Error("Something went wrong. Cannot lock a session.");
      log.error(`[${this._context.namespace.connectionId}] %O`, error);
      throw error;
    }
    this._sessionId = this._messageSession.sessionId;
    delete this._context.expiredMessageSessions[this._messageSession.sessionId];
  }

  private _throwIfAlreadyReceiving(): void {
    if (this.isReceivingMessages()) {
      const errorMessage = getAlreadyReceivingErrorMsg(this._context.entityPath, this.sessionId);
      const error = new Error(errorMessage);
      log.error(`[${this._context.namespace.connectionId}] %O`, error);
      throw error;
    }
  }
}
