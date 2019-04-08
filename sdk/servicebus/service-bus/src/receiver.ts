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
  throwErrorIfConnectionClosed,
  getReceiverClosedErrorMsg,
  getAlreadyRecevingErrorMsg,
  throwTypeErrorIfMissingParameter,
  throwParameterInstanceCheckError,
  getOpenReceiverErrorMsg,
  throwTypeErrorIfParameterTypeMismatch
} from "./util/utils";

/**
 * The Receiver class can be used to receive messages in a batch or by registering handlers.
 * Use the `createReceiver` function on the QueueClient or SubscriptionClient to instantiate a Receiver.
 * The Receiver class is an abstraction over the underlying AMQP receiver link.
 * @class Receiver
 */
export class Receiver {
  /**
   * @property {ClientEntityContext} _context Describes the amqp connection context for the QueueClient.
   */
  private _context: ClientEntityContext;
  private _receiveMode: ReceiveMode;
  private _isClosed: boolean = false;

  /**
   * @property {boolean} [isClosed] Denotes if close() was called on this receiver.
   * @readonly
   */
  public get isClosed(): boolean {
    return this._isClosed;
  }

  /**
   * @internal
   */
  constructor(context: ClientEntityContext, receiveMode: ReceiveMode) {
    throwErrorIfConnectionClosed(context.namespace);
    this._context = context;

    this._receiveMode = receiveMode;
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
    if (!onMessage || typeof onMessage !== "function") {
      throw new TypeError("'onMessage' is a required parameter and must be of type 'function'.");
    }
    if (!onError || typeof onError !== "function") {
      throw new TypeError("'onError' is a required parameter and must be of type 'function'.");
    }
    const sReceiver = StreamingReceiver.create(this._context, {
      ...options,
      receiveMode: this._receiveMode
    });
    this._context.streamingReceiver = sReceiver;
    return sReceiver.receive(onMessage, onError);
  }

  /**
   * Returns a batch of messages based on given count and timeout over an AMQP receiver link
   * from a Queue/Subscription.
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
      try {
        this._context.batchingReceiver = BatchingReceiver.create(this._context, options);
      } catch (err) {
        log.error(
          "[%s] An error occurred while creating the Batching Receiver for '%s':\n %O",
          this._context.namespace.connectionId,
          this._context.entityPath,
          err
        );
        throw err;
      }
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
   * Renews the lock on the message.
   *
   * When a message is received in `PeekLock` mode, the message is locked on the server for this
   * receiver instance for a duration as specified during the Queue/Subscription creation
   * (LockDuration). If processing of the message requires longer than this duration, the
   * lock needs to be renewed. For each renewal, it resets the time the message is locked by the
   * LockDuration set on the Entity.
   *
   * @param lockToken - Lock token of the message.
   * @returns Promise<Date> - New lock token expiry date and time in UTC format.
   */
  async renewLock(lockTokenOrMessage: string | ServiceBusMessage): Promise<Date> {
    this._throwIfReceiverOrConnectionClosed();
    throwTypeErrorIfMissingParameter(
      this._context.namespace.connectionId,
      "lockTokenOrMessage",
      lockTokenOrMessage
    );

    if (this._receiveMode !== ReceiveMode.peekLock) {
      const error = new Error(
        `The "renewLock" operation is only supported in "PeekLock" receive mode.`
      );
      log.error(`[${this._context.namespace.connectionId}] ${error}`);
      throw error;
    }

    if (typeof lockTokenOrMessage === "string") {
      return this._context.managementClient!.renewLock(lockTokenOrMessage);
    }

    if (typeof lockTokenOrMessage.lockToken === "string") {
      return this._context
        .managementClient!.renewLock(lockTokenOrMessage.lockToken)
        .then((lockedUntilUtc) => {
          lockTokenOrMessage.lockedUntilUtc = lockedUntilUtc;
          return lockedUntilUtc;
        });
    }

    const error = new TypeError(
      `The parameter "lockTokenOrMessage" does not have a valid lockToken property`
    );
    log.error(`[${this._context.namespace.connectionId}] ${error}`);
    throw error;
  }

  /**
   * Receives a deferred message identified by the given `sequenceNumber`.
   * @param sequenceNumber The sequence number of the message that will be received.
   * @returns Promise<ServiceBusMessage | undefined>
   * - Returns `Message` identified by sequence number.
   * - Returns `undefined` if no such message is found.
   * - Throws an error if the message has not been deferred.
   */
  async receiveDeferredMessage(sequenceNumber: Long): Promise<ServiceBusMessage | undefined> {
    this._throwIfReceiverOrConnectionClosed();
    throwTypeErrorIfMissingParameter(
      this._context.namespace.connectionId,
      "sequenceNumber",
      sequenceNumber
    );
    if (!Long.isLong(sequenceNumber)) {
      throwParameterInstanceCheckError(
        this._context.namespace.connectionId,
        "sequenceNumber",
        "Long"
      );
    }

    if (this._receiveMode !== ReceiveMode.peekLock) {
      throw new Error(
        `The "receiveDeferredMessage" operation is only supported in "PeekLock" receive mode.`
      );
    }

    return this._context.managementClient!.receiveDeferredMessage(
      sequenceNumber,
      this._receiveMode
    );
  }

  /**
   * Receives a list of deferred messages identified by given `sequenceNumbers`.
   * @param sequenceNumbers A list containing the sequence numbers to receive.
   * @returns Promise<ServiceBusMessage[]>
   * - Returns a list of messages identified by the given sequenceNumbers.
   * - Returns an empty list if no messages are found.
   * - Throws an error if the messages have not been deferred.
   */
  async receiveDeferredMessages(sequenceNumbers: Long[]): Promise<ServiceBusMessage[]> {
    this._throwIfReceiverOrConnectionClosed();
    throwTypeErrorIfMissingParameter(
      this._context.namespace.connectionId,
      "sequenceNumbers",
      sequenceNumbers
    );
    if (!Array.isArray(sequenceNumbers) || sequenceNumbers.some((item) => !Long.isLong(item))) {
      const error = new TypeError(
        `The parameter "sequenceNumbers" should be an array of items of type "Long"`
      );
      log.error(`[${this._context.namespace.connectionId}] ${error}`);
      throw error;
    }

    if (this._receiveMode !== ReceiveMode.peekLock) {
      throw new Error(
        `The "receiveDeferredMessages" operation is only supported in "PeekLock" receive mode.`
      );
    }
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
      this._isClosed = true;
    } catch (err) {
      err = err instanceof Error ? err : new Error(JSON.stringify(err));
      log.error(
        `An error occurred while closing the receiver for "${this._context.entityPath}":\n${err}`
      );
      throw err;
    }
  }

  /**
   * Indicates whether the receiver is currently receiving messages or not.
   * When this returns true, registerMessageHandler() or receiveMessages() calls cannot be made.
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
      const error = new Error(getAlreadyRecevingErrorMsg(this._context.entityPath));
      log.error(`[${this._context.namespace.connectionId}] ${error}`);
      throw error;
    }
  }

  private _throwIfReceiverOrConnectionClosed(): void {
    throwErrorIfConnectionClosed(this._context.namespace);
    if (this.isClosed) {
      const errorMessage = getReceiverClosedErrorMsg(
        this._context.entityPath,
        this._context.clientType
      );
      log.error(`[${this._context.namespace.connectionId}] ${errorMessage}`);
      throw new Error(errorMessage);
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
   * @property {boolean} [isClosed] Denotes if close() was called on this receiver.
   * @readonly
   */
  public get isClosed(): boolean {
    return this.sessionId ? !this._context.messageSessions[this.sessionId] : false;
  }

  /**
   * @property {string} [sessionId] The sessionId for the message session.
   * @readonly
   */
  public get sessionId(): string | undefined {
    return (
      (this._messageSession && this._messageSession.sessionId) || this._sessionOptions.sessionId
    );
  }

  /**
   * @property {Date} [sessionLockedUntilUtc] The time in UTC until which the session is locked.
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
    this._receiveMode = receiveMode;
    this._sessionOptions = sessionOptions;

    if (sessionOptions.sessionId) {
      if (typeof sessionOptions.sessionId !== "string") {
        const error = `The "sessionId" property on the "sessionOptions" parameter should be of type string`;
        log.error(`[${this._context.namespace.connectionId}] ${error}`);
        throw error;
      }
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
        log.error(`[${this._context.namespace.connectionId}] ${errorMessage}`);
        throw new Error(errorMessage);
      }
    }
  }

  /**
   * Renews the lock for the Session.
   * @returns Promise<Date> New lock token expiry date and time in UTC format.
   */
  async renewLock(): Promise<Date> {
    this._throwIfReceiverOrConnectionClosed();
    await this._createMessageSessionIfDoesntExist();
    this._messageSession!.sessionLockedUntilUtc = await this._context.managementClient!.renewSessionLock(
      this.sessionId!
    );
    return this._messageSession!.sessionLockedUntilUtc;
  }

  /**
   * Sets the state of the MessageSession.
   * @param state The state that needs to be set.
   */
  async setState(state: any): Promise<void> {
    this._throwIfReceiverOrConnectionClosed();
    await this._createMessageSessionIfDoesntExist();
    return this._context.managementClient!.setSessionState(this.sessionId!, state);
  }

  /**
   * Gets the state of the MessageSession.
   * @returns Promise<any> The state of that session
   */
  async getState(): Promise<any> {
    this._throwIfReceiverOrConnectionClosed();
    await this._createMessageSessionIfDoesntExist();
    return this._context.managementClient!.getSessionState(this.sessionId!);
  }

  /**
   * Fetches the next batch of active messages (including deferred but not deadlettered messages) in
   * the current session. The first call to `peek()` fetches the first active message. Each
   * subsequent call fetches the subsequent message.
   *
   * Unlike a `received` message, `peeked` message is a read-only version of the message.
   * It cannot be `Completed/Abandoned/Deferred/Deadlettered`. The lock on it cannot be renewed.
   *
   * @param maxMessageCount The maximum number of messages to peek. Default value `1`.
   * @returns Promise<ReceivedMessageInfo[]>
   */
  async peek(maxMessageCount?: number): Promise<ReceivedMessageInfo[]> {
    this._throwIfReceiverOrConnectionClosed();

    // Type check for maxMessageCount
    if (maxMessageCount !== undefined) {
      throwTypeErrorIfParameterTypeMismatch(
        this._context.namespace.connectionId,
        "maxMessageCount",
        maxMessageCount,
        "number"
      );
    } else {
      maxMessageCount = 1;
    }

    // Peek doesnt need an AMQP receiver link unless no sessionId was given
    if (!this.sessionId) {
      await this._createMessageSessionIfDoesntExist();
    }
    return this._context.managementClient!.peekMessagesBySession(this.sessionId!, maxMessageCount);
  }

  /**
   * Peeks the desired number of active messages (including deferred but not deadlettered messages)
   * from the specified sequence number in the current session.
   *
   * Unlike a `received` message, `peeked` message is a read-only version of the message.
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

    // Type check for fromSequenceNumber
    throwTypeErrorIfMissingParameter(
      this._context.namespace.connectionId,
      "fromSequenceNumber",
      fromSequenceNumber
    );
    if (!Long.isLong(fromSequenceNumber)) {
      throwParameterInstanceCheckError(
        this._context.namespace.connectionId,
        "fromSequenceNumber",
        "Long"
      );
    }

    // Type check for maxMessageCount
    if (maxMessageCount !== undefined) {
      throwTypeErrorIfParameterTypeMismatch(
        this._context.namespace.connectionId,
        "maxMessageCount",
        maxMessageCount,
        "number"
      );
    } else {
      maxMessageCount = 1;
    }

    // Peek doesnt need an AMQP receiver link unless no sessionId was given
    if (!this.sessionId) {
      await this._createMessageSessionIfDoesntExist();
    }
    return this._context.managementClient!.peekBySequenceNumber(fromSequenceNumber, {
      sessionId: this.sessionId!,
      messageCount: maxMessageCount
    });
  }

  /**
   * Receives a deferred message identified by the given `sequenceNumber`.
   * @param sequenceNumber The sequence number of the message that will be received.
   * @returns Promise<ServiceBusMessage | undefined>
   * - Returns `Message` identified by sequence number.
   * - Returns `undefined` if no such message is found.
   * - Throws an error if the message has not been deferred.
   */
  async receiveDeferredMessage(sequenceNumber: Long): Promise<ServiceBusMessage | undefined> {
    this._throwIfReceiverOrConnectionClosed();
    throwTypeErrorIfMissingParameter(
      this._context.namespace.connectionId,
      "sequenceNumber",
      sequenceNumber
    );
    if (!Long.isLong(sequenceNumber)) {
      throwParameterInstanceCheckError(
        this._context.namespace.connectionId,
        "sequenceNumber",
        "Long"
      );
    }

    if (this._receiveMode !== ReceiveMode.peekLock) {
      throw new Error(
        `The "receiveDeferredMessage" operation is only supported in "PeekLock" receive mode.`
      );
    }
    // receiveDeferredMessage doesnt need an AMQP receiver link unless no sessionId was given
    if (!this.sessionId) {
      await this._createMessageSessionIfDoesntExist();
    }
    return this._context.managementClient!.receiveDeferredMessage(
      sequenceNumber,
      this._receiveMode,
      this.sessionId
    );
  }

  /**
   * Receives a list of deferred messages identified by given `sequenceNumbers`.
   * @param sequenceNumbers A list containing the sequence numbers to receive.
   * @returns Promise<ServiceBusMessage[]>
   * - Returns a list of messages identified by the given sequenceNumbers.
   * - Returns an empty list if no messages are found.
   * - Throws an error if the messages have not been deferred.
   */
  async receiveDeferredMessages(sequenceNumbers: Long[]): Promise<ServiceBusMessage[]> {
    this._throwIfReceiverOrConnectionClosed();
    throwTypeErrorIfMissingParameter(
      this._context.namespace.connectionId,
      "sequenceNumbers",
      sequenceNumbers
    );
    if (!Array.isArray(sequenceNumbers) || sequenceNumbers.some((item) => !Long.isLong(item))) {
      const error = new TypeError(
        `The parameter "sequenceNumbers" should be an array of items of type "Long"`
      );
      log.error(`[${this._context.namespace.connectionId}] ${error}`);
      throw error;
    }

    if (this._receiveMode !== ReceiveMode.peekLock) {
      throw new Error(
        `The "receiveDeferredMessages" operation is only supported in "PeekLock" receive mode.`
      );
    }
    // receiveDeferredMessage doesnt need an AMQP receiver link unless no sessionId was given
    if (!this.sessionId) {
      await this._createMessageSessionIfDoesntExist();
    }
    return this._context.managementClient!.receiveDeferredMessages(
      sequenceNumbers,
      this._receiveMode,
      this.sessionId
    );
  }

  /**
   * Returns a batch of messages based on given count and timeout over an AMQP receiver link
   * from a Queue/Subscription.
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
    if (typeof onMessage !== "function") {
      throw new TypeError("'onMessage' is a required parameter and must be of type 'function'.");
    }
    if (typeof onError !== "function") {
      throw new TypeError("'onError' is a required parameter and must be of type 'function'.");
    }
    this._createMessageSessionIfDoesntExist()
      .then(() => {
        this._messageSession!.receive(onMessage, onError, options);
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
      }
    } catch (err) {
      err = err instanceof Error ? err : new Error(JSON.stringify(err));
      log.error(
        `An error occurred while closing the receiver for session "${this.sessionId}" in "${
          this._context.entityPath
        }":\n${err}`
      );
      throw err;
    }
  }

  /**
   * Indicates whether the receiver is currently receiving messages or not.
   * When this returns true, registerMessageHandler() or receiveMessages() calls cannot be made.
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
        this.sessionId!
      );
      log.error(`[${this._context.namespace.connectionId}] ${errorMessage}`);
      throw new Error(errorMessage);
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
      throw new Error("Something went wrong. Cannot lock a session.");
    }
    delete this._context.expiredMessageSessions[this._messageSession.sessionId];
  }

  private _throwIfAlreadyReceiving(): void {
    if (this.isReceivingMessages()) {
      const error = new Error(getAlreadyRecevingErrorMsg(this._context.entityPath, this.sessionId));
      log.error(`[${this._context.namespace.connectionId}] ${error}`);
      throw error;
    }
  }
}
