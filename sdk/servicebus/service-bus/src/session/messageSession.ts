// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  translate,
  Constants,
  ErrorNameConditionMapper,
  MessagingError,
  Func
} from "@azure/amqp-common";
import {
  Receiver,
  OnAmqpEvent,
  EventContext,
  ReceiverOptions,
  ReceiverEvents,
  AmqpError,
  isAmqpError
} from "rhea-promise";
import * as log from "../log";
import { OnError, OnAmqpEventAsPromise, PromiseLike, OnMessage } from "../core/messageReceiver";
import { LinkEntity } from "../core/linkEntity";
import { ClientEntityContext } from "../clientEntityContext";
import { convertTicksToDate, calculateRenewAfterDuration } from "../util/utils";
import { throwErrorIfConnectionClosed } from "../util/errors";
import { ServiceBusMessage, DispositionType, ReceiveMode } from "../serviceBusMessage";
import { DispositionStatusOptions } from "../core/managementClient";

/**
 * Enum to denote who is calling the session receiver
 * @internal
 */
export enum SessionCallee {
  standalone = "standalone",
  sessionManager = "sessionManager"
}

/**
 * Describes the options that need to be provided while creating a message session receiver link.
 * @internal
 */
export interface CreateMessageSessionReceiverLinkOptions {
  onClose: OnAmqpEventAsPromise;
  onSessionClose: OnAmqpEventAsPromise;
  onError: OnAmqpEvent;
  onSessionError: OnAmqpEvent;
  onSettled: OnAmqpEvent;
  sessionId?: string;
}

/**
 * Describes the options passed to the `createReceiver` method when using a Queue/Subscription that
 * has sessions enabled.
 */
export interface SessionReceiverOptions {
  /**
   * @property The id of the session from which messages need to be received. If null or undefined is
   * provided, Service Bus chooses a random session from available sessions.
   */
  sessionId: string | undefined;
  /**
   * @property The maximum duration in seconds
   * until which, the lock on the session will be renewed automatically by the sdk.
   * - **Default**: `300` seconds (5 minutes).
   * - **To disable autolock renewal**, set this to `0`.
   */
  maxSessionAutoRenewLockDurationInSeconds?: number;
}

/**
 * Describes the options passed to `registerMessageHandler` method when receiving messages from a
 * Queue/Subscription which has sessions enabled.
 */
export interface SessionMessageHandlerOptions {
  /**
   * @property Indicates whether the `complete()` method on the message should automatically be
   * called by the sdk after the user provided onMessage handler has been executed.
   * Calling `complete()` on a message removes it from the Queue/Subscription.
   * - **Default**: `true`.
   */
  autoComplete?: boolean;
  /**
   * @property The maximum number of concurrent calls that the library
   * can make to the user's message handler. Once this limit has been reached, more messages will
   * not be received until atleast one of the calls to the user's message handler has completed.
   * - **Default**: `1`.
   */
  maxConcurrentCalls?: number;
}
/**
 * @internal
 * Describes the options for creating a Session Manager.
 */
export interface SessionManagerOptions extends SessionMessageHandlerOptions {
  /**
   * @property {number} [maxConcurrentSessions] The maximum number of sessions that the user wants to
   * handle concurrently.
   * - **Default**: `2000`.
   */
  maxConcurrentSessions?: number;
  /**
   * @property The maximum amount of time the receiver will wait to receive a new message. If no new
   * message is received in this time, then the receiver will be closed.
   *
   * If this option is not provided, then receiver link will stay open until manually closed.
   *
   * **Caution**: When setting this value, take into account the time taken to process messages. Once
   * the receiver is closed, operations like complete()/abandon()/defer()/deadletter() cannot be
   * invoked on messages.
   */
  newMessageWaitTimeoutInSeconds?: number;
}

/**
 * @internal
 * Describes all the options that can be set while instantiating a MessageSession object.
 */
export type MessageSessionOptions = SessionManagerOptions &
  SessionReceiverOptions & {
    callee?: SessionCallee;
    receiveMode?: ReceiveMode;
  };

/**
 * @internal
 * Describes the receiver for a Message Session.
 */
export class MessageSession extends LinkEntity {
  /**
   * @property {Date} [sessionLockedUntilUtc] Provides the duration until which the session is locked.
   */
  sessionLockedUntilUtc?: Date;
  /**
   * @property {string} [sessionId] The sessionId for the message session. Empty string is valid sessionId
   */
  sessionId?: string;
  /**
   * @property {number} [maxConcurrentSessions] The maximum number of concurrent sessions that the
   * client should initate.
   * - **Default**: `1`.
   */
  maxConcurrentSessions?: number;
  /**
   * @property {number} [maxConcurrentCalls] The maximum number of messages that should be
   * processed concurrently in a session while in streaming mode. Once this limit has been reached,
   * more messages will not be received until the user's message handler has completed processing current message.
   * - **Default**: `1` (message in a session at a time).
   */
  maxConcurrentCalls: number = 1;
  /**
   * @property {number} [receiveMode] The mode in which messages should be received.
   * Default: ReceiveMode.peekLock
   */
  receiveMode: ReceiveMode;
  /**
   * @property {boolean} autoComplete Indicates whether `Message.complete()` should be called
   * automatically after the message processing is complete while receiving messages with handlers.
   * Default: false.
   */
  autoComplete: boolean;
  /**
   * @property {number} maxAutoRenewDurationInSeconds The maximum duration within which the
   * lock will be renewed automatically. This value should be greater than the longest message
   * lock duration; for example, the `lockDuration` property on the received message.
   *
   * Default: `300` (5 minutes);
   */
  maxAutoRenewDurationInSeconds: number;
  /**
   * @property {number} [newMessageWaitTimeoutInSeconds] The maximum amount of idle time the session
   * reaceiver will wait ater a message has been received. If no messages are received in that
   * time frame then the session will be closed.
   */
  newMessageWaitTimeoutInSeconds?: number;
  /**
   * @property {boolean} autoRenewLock Should lock renewal happen automatically.
   */
  autoRenewLock: boolean;
  /**
   * @property {SessionCallee} callee Describes who instantied the MessageSession. Whether it was
   * called by the SessionManager or it was called standalone.
   * - Default: "standalone"
   */
  callee: SessionCallee;
  /**
   * Denotes if we are currently receiving messages
   */
  isReceivingMessages: boolean;
  /**
   * @property {Receiver} [_receiver] The AMQP receiver link.
   */
  private _receiver?: Receiver;
  /**
   * @property {Map<number, Promise<any>>} _deliveryDispositionMap Maintains a map of deliveries that
   * are being actively disposed. It acts as a store for correlating the responses received for
   * active dispositions.
   */
  private _deliveryDispositionMap: Map<number, PromiseLike> = new Map<number, PromiseLike>();
  /**
   * @property {OnMessage} _onMessage The message handler provided by the user that will
   * be wrapped inside _onAmqpMessage.
   */
  private _onMessage!: OnMessage;
  /**
   * @property {OnError} _onError The error handler provided by the user that will be wrapped
   * inside _onAmqpError.
   */
  private _onError?: OnError;
  /**
   * @property {OnError} _notifyError If the user provided error handler is present then it will
   * notify the user's error handler about the error.
   */
  private _notifyError: OnError;
  /**
   * @property {OnAmqpEventAsPromise} _onAmqpClose The message handler that will be set as the handler on the
   * underlying rhea receiver for the "receiver_close" event.
   */
  private _onAmqpClose: OnAmqpEventAsPromise;
  /**
   * @property {OnAmqpEvent} _onSessionError The message handler that will be set as the handler on
   * the underlying rhea receiver's session for the "session_error" event.
   */
  private _onSessionError: OnAmqpEvent;
  /**
   * @property {OnAmqpEventAsPromise} _onSessionClose The message handler that will be set as the handler on
   * the underlying rhea receiver's session for the "session_close" event.
   */
  private _onSessionClose: OnAmqpEventAsPromise;
  /**
   * @property {OnAmqpEvent} _onAmqpError The message handler that will be set as the handler on the
   * underlying rhea receiver for the "receiver_error" event.
   */
  private _onAmqpError: OnAmqpEvent;
  /**
   * @property {OnAmqpEvent} _onSettled The message handler that will be set as the handler on the
   * underlying rhea receiver for the "settled" event.
   */
  private _onSettled: OnAmqpEvent;
  /**
   * @property {NodeJS.Timer} _sessionLockRenewalTimer The session lock renewal timer that keeps
   * track of when the MessageSession is due for session lock renewal.
   */
  private _sessionLockRenewalTimer?: NodeJS.Timer;
  /**
   * @property {NodeJS.Timer} _newMessageReceivedTimer The new message received timer that keeps
   * track of closing the MessageSession if no message was received in the configured
   * `newMessageWaitTimeoutInSeconds` seconds.
   */
  private _newMessageReceivedTimer?: NodeJS.Timer;

  private _totalAutoLockRenewDuration: number;

  /**
   * Ensures that the session lock is renewed before it expires. The lock will not be renewed for
   * more than the configured totalAutoLockRenewDuration.
   */
  private _ensureSessionLockRenewal(): void {
    if (
      this.autoRenewLock &&
      new Date(this._totalAutoLockRenewDuration) > this.sessionLockedUntilUtc! &&
      Date.now() < this._totalAutoLockRenewDuration &&
      this.isOpen()
    ) {
      const connectionId = this._context.namespace.connectionId;
      const nextRenewalTimeout = calculateRenewAfterDuration(this.sessionLockedUntilUtc!);
      this._sessionLockRenewalTimer = setTimeout(async () => {
        try {
          log.messageSession(
            "[%s] Attempting to renew the session lock for MessageSession '%s' " +
              "with name '%s'.",
            connectionId,
            this.sessionId,
            this.name
          );
          this.sessionLockedUntilUtc = await this._context.managementClient!.renewSessionLock(
            this.sessionId!,
            {
              delayInSeconds: 0,
              timeoutInSeconds: 10,
              times: 4
            }
          );
          log.receiver(
            "[%s] Successfully renewed the session lock for MessageSession '%s' " +
              "with name '%s'.",
            connectionId,
            this.sessionId,
            this.name
          );
          log.receiver(
            "[%s] Calling _ensureSessionLockRenewal() again for MessageSession '%s'.",
            connectionId,
            this.sessionId
          );
          this._ensureSessionLockRenewal();
        } catch (err) {
          log.error(
            "[%s] An error occurred while renewing the session lock for MessageSession " +
              "'%s' with name '%s': %O",
            this._context.namespace.connectionId,
            this.sessionId,
            this.name,
            err
          );
        }
      }, nextRenewalTimeout);
      log.messageSession(
        "[%s] MessageSession '%s' with name '%s', has next session lock renewal " +
          "in %d seconds @(%s).",
        this._context.namespace.connectionId,
        this.sessionId,
        this.name,
        nextRenewalTimeout / 1000,
        new Date(Date.now() + nextRenewalTimeout).toString()
      );
    }
  }

  /**
   * Deletes the MessageSession from the internal cache.
   */
  private _deleteFromCache(): void {
    this._receiver = undefined;
    delete this._context.messageSessions[this.sessionId!];
    log.error(
      "[%s] Deleted the receiver '%s' with sessionId '%s' from the client cache.",
      this._context.namespace.connectionId,
      this.name,
      this.sessionId
    );
  }

  /**
   * Creates a new AMQP receiver under a new AMQP session.
   */
  private async _init(): Promise<void> {
    const connectionId = this._context.namespace.connectionId;
    try {
      if (!this.isOpen() && !this.isConnecting) {
        log.error(
          "[%s] The receiver '%s' with address '%s' is not open and is not currently " +
            "establishing itself. Hence let's try to connect.",
          connectionId,
          this.name,
          this.address
        );
        this.isConnecting = true;
        await this._negotiateClaim();

        const options = this._createMessageSessionOptions();

        log.error(
          "[%s] Trying to create receiver '%s' with options %O",
          connectionId,
          this.name,
          options
        );

        this._receiver = await this._context.namespace.connection.createReceiver(options);
        this.isConnecting = false;
        const receivedSessionId =
          this._receiver.source &&
          this._receiver.source.filter &&
          this._receiver.source.filter[Constants.sessionFilterName];
        let errorMessage: string = "";
        // SB allows a sessionId with empty string value :)
        if (receivedSessionId == null) {
          errorMessage =
            `Received an incorrect sessionId '${receivedSessionId}' while creating ` +
            `the receiver '${this.name}'.`;
        }
        if (this.sessionId != null && receivedSessionId !== this.sessionId) {
          errorMessage =
            `Received sessionId '${receivedSessionId}' does not match the provided ` +
            `sessionId '${this.sessionId}' while creating the receiver '${this.name}'.`;
        }
        if (errorMessage) {
          const error = translate({
            description: errorMessage,
            condition: ErrorNameConditionMapper.SessionCannotBeLockedError
          });
          log.error("[%s] %O", this._context.namespace.connectionId, error);
          throw error;
        }
        if (this.sessionId == null) this.sessionId = receivedSessionId;
        this.sessionLockedUntilUtc = convertTicksToDate(
          this._receiver.properties["com.microsoft:locked-until-utc"]
        );
        log.messageSession(
          "[%s] Session with id '%s' is locked until: '%s'.",
          connectionId,
          this.sessionId,
          this.sessionLockedUntilUtc.toISOString()
        );
        log.error(
          "[%s] Receiver '%s' for sessionId '%s' has established itself.",
          connectionId,
          this.name,
          this.sessionId
        );
        log.messageSession(
          "Promise to create the receiver resolved. " + "Created receiver with name: ",
          this.name
        );
        log.messageSession(
          "[%s] Receiver '%s' created with receiver options: %O",
          connectionId,
          this.name,
          options
        );
        if (!this._context.messageSessions[this.sessionId!]) {
          this._context.messageSessions[this.sessionId!] = this;
        }
        this._totalAutoLockRenewDuration = Date.now() + this.maxAutoRenewDurationInSeconds * 1000;
        await this._ensureTokenRenewal();
        await this._ensureSessionLockRenewal();
      } else {
        log.error(
          "[%s] The receiver '%s' for sessionId '%s' is open -> %s and is connecting " +
            "-> %s. Hence not reconnecting.",
          connectionId,
          this.name,
          this.sessionId,
          this.isOpen(),
          this.isConnecting
        );
      }
    } catch (err) {
      this.isConnecting = false;
      const errObj = translate(err);
      log.error(
        "[%s] An error occured while creating the receiver '%s': %O",
        this._context.namespace.connectionId,
        this.name,
        errObj
      );
      throw errObj;
    }
  }

  /**
   * Creates the options that need to be specified while creating an AMQP receiver link.
   */
  private _createMessageSessionOptions(): ReceiverOptions {
    const rcvrOptions: ReceiverOptions = {
      name: this.name,
      autoaccept: false,
      // receiveAndDelete -> first(0), peekLock -> second (1)
      rcv_settle_mode: this.receiveMode === ReceiveMode.receiveAndDelete ? 0 : 1,
      // receiveAndDelete -> settled (1), peekLock -> unsettled (0)
      snd_settle_mode: this.receiveMode === ReceiveMode.receiveAndDelete ? 1 : 0,
      source: {
        address: this.address,
        filter: {}
      },
      credit_window: 0,
      onClose: (context) =>
        this._onAmqpClose(context).catch(() => {
          /* */
        }),
      onSessionClose: (context) =>
        this._onSessionClose(context).catch(() => {
          /* */
        }),
      onError: this._onAmqpError,
      onSessionError: this._onSessionError,
      onSettled: this._onSettled
    };
    (rcvrOptions.source as any).filter[Constants.sessionFilterName] = this.sessionId;
    return rcvrOptions;
  }

  constructor(context: ClientEntityContext, options?: MessageSessionOptions) {
    super(context.entityPath, context, {
      address: context.entityPath,
      audience: `${context.namespace.config.endpoint}${context.entityPath}`
    });
    this._context.isSessionEnabled = true;
    this.isReceivingMessages = false;
    if (!options) options = { sessionId: undefined };
    this.autoComplete = false;
    this.sessionId = options.sessionId;
    this.receiveMode = options.receiveMode || ReceiveMode.peekLock;
    this.callee = options.callee || SessionCallee.standalone;
    this.maxAutoRenewDurationInSeconds =
      options.maxSessionAutoRenewLockDurationInSeconds != null
        ? options.maxSessionAutoRenewLockDurationInSeconds
        : 300;
    this._totalAutoLockRenewDuration = Date.now() + this.maxAutoRenewDurationInSeconds * 1000;
    this.autoRenewLock =
      this.maxAutoRenewDurationInSeconds > 0 && this.receiveMode === ReceiveMode.peekLock;

    // setting all the handlers
    this._onSettled = (context: EventContext) => {
      const connectionId = this._context.namespace.connectionId;
      const delivery = context.delivery;
      if (delivery) {
        const id = delivery.id;
        const state = delivery.remote_state;
        const settled = delivery.remote_settled;
        log.receiver(
          "[%s] Delivery with id %d, remote_settled: %s, remote_state: %o has been " + "received.",
          connectionId,
          id,
          settled,
          state && state.error ? state.error : state
        );
        if (settled && this._deliveryDispositionMap.has(id)) {
          const promise = this._deliveryDispositionMap.get(id) as PromiseLike;
          clearTimeout(promise.timer);
          log.receiver(
            "[%s] Found the delivery with id %d in the map and cleared the timer.",
            connectionId,
            id
          );
          const deleteResult = this._deliveryDispositionMap.delete(id);
          log.receiver(
            "[%s] Successfully deleted the delivery with id %d from the map.",
            connectionId,
            id,
            deleteResult
          );
          if (state && state.error && (state.error.condition || state.error.description)) {
            const error = translate(state.error);
            return promise.reject(error);
          }

          return promise.resolve();
        }
      }
    };

    this._notifyError = (error: MessagingError | Error) => {
      if (this._onError) {
        this._onError(error);
        log.error(
          "[%s] Notified the user's error handler about the error received by the " +
            "Receiver '%s'.",
          this._context.namespace.connectionId,
          this.name
        );
      }
    };

    this._onAmqpError = (context: EventContext) => {
      const connectionId = this._context.namespace.connectionId;
      const receiverError = context.receiver && context.receiver.error;
      if (receiverError) {
        const sbError = translate(receiverError);
        if (sbError.name === "SessionLockLostError") {
          this._context.expiredMessageSessions[this.sessionId!] = true;
          sbError.message = `The session lock has expired on the session with id ${this.sessionId}.`;
        }
        log.error(
          "[%s] An error occurred for Receiver '%s': %O.",
          connectionId,
          this.name,
          sbError
        );
        this._notifyError(sbError);
      }
    };

    this._onSessionError = (context: EventContext) => {
      const connectionId = this._context.namespace.connectionId;
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        const sbError = translate(sessionError);
        log.error(
          "[%s] An error occurred on the session for Receiver '%s': %O.",
          connectionId,
          this.name,
          sbError
        );
        this._notifyError(sbError);
      }
    };

    this._onAmqpClose = async (context: EventContext) => {
      const connectionId = this._context.namespace.connectionId;
      const receiverError = context.receiver && context.receiver.error;
      const receiver = this._receiver || context.receiver!;
      let isClosedDueToExpiry = false;
      if (receiverError) {
        const sbError = translate(receiverError);
        if (sbError.name === "SessionLockLostError") {
          isClosedDueToExpiry = true;
        }
        log.error(
          "[%s] 'receiver_close' event occurred for receiver '%s' for sessionId '%s'. " +
            "The associated error is: %O",
          connectionId,
          this.name,
          this.sessionId,
          sbError
        );
        // no need to notify the user's error handler since rhea guarantees that receiver_error
        // will always be emitted before receiver_close.
      }
      if (receiver && !receiver.isItselfClosed()) {
        log.error(
          "[%s] 'receiver_close' event occurred on the receiver '%s' for sessionId '%s' " +
            "and the sdk did not initiate this. Hence, let's gracefully close the receiver.",
          connectionId,
          this.name,
          this.sessionId
        );
        try {
          await this.close(isClosedDueToExpiry);
        } catch (err) {
          log.error(
            "[%s] An error occurred while closing the receiver '%s' for sessionId '%s': %O.",
            connectionId,
            this.name,
            this.sessionId,
            err
          );
        }
      } else {
        log.error(
          "[%s] 'receiver_close' event occurred on the receiver '%s' for sessionId '%s' " +
            "because the sdk initiated it. Hence no need to gracefully close the receiver",
          connectionId,
          this.name,
          this.sessionId
        );
      }
    };

    this._onSessionClose = async (context: EventContext) => {
      const connectionId = this._context.namespace.connectionId;
      const receiver = this._receiver || context.receiver!;
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        const sbError = translate(sessionError);
        log.error(
          "[%s] 'session_close' event occurred for receiver '%s' for sessionId '%s'. " +
            "The associated error is: %O",
          connectionId,
          this.name,
          this.sessionId,
          sbError
        );
        // no need to notify the user's error handler since rhea guarantees that session_error
        // will always be emitted before session_close.
      }

      if (receiver && !receiver.isSessionItselfClosed()) {
        log.error(
          "[%s] 'session_close' event occurred on the receiver '%s' for sessionId '%s' " +
            "and the sdk did not initiate this. Hence, let's gracefully close the receiver.",
          connectionId,
          this.name,
          this.sessionId
        );
        try {
          await this.close();
        } catch (err) {
          log.error(
            "[%s] An error occurred while closing the receiver '%s' for sessionId '%s': %O.",
            connectionId,
            this.name,
            this.sessionId,
            err
          );
        }
      } else {
        log.error(
          "[%s] 'session_close' event occurred on the receiver '%s' for sessionId '%s' " +
            "because the sdk initiated it. Hence no need to gracefully close the receiver",
          connectionId,
          this.name,
          this.sessionId
        );
      }
    };
  }

  /**
   * Closes the underlying AMQP receiver link.
   * @param isClosedDueToExpiry Flag that denotes if close is invoked due to session expiring.
   * This is so that the internal map of expired sessions doesn't get cleared when session is
   * closed due to expiry.
   */
  async close(isClosedDueToExpiry?: boolean): Promise<void> {
    try {
      log.messageSession(
        "[%s] Closing the MessageSession '%s' for queue '%s'.",
        this._context.namespace.connectionId,
        this.sessionId,
        this.name
      );

      this.isReceivingMessages = false;
      if (this._newMessageReceivedTimer) clearTimeout(this._newMessageReceivedTimer);
      if (this._sessionLockRenewalTimer) clearTimeout(this._sessionLockRenewalTimer);
      log.messageSession(
        "[%s] Cleared the timers for 'no new message received' task and " +
          "'session lock renewal' task.",
        this._context.namespace.connectionId
      );

      if (!isClosedDueToExpiry) {
        delete this._context.expiredMessageSessions[this.sessionId!];
      }

      if (this._receiver) {
        const receiverLink = this._receiver;
        this._deleteFromCache();
        await this._closeLink(receiverLink);
      }
    } catch (err) {
      log.error(
        "[%s] An error occurred while closing the message session with id '%s': %O.",
        this._context.namespace.connectionId,
        this.sessionId,
        err
      );
    }
  }

  /**
   * Determines whether the AMQP receiver link is open. If open then returns true else returns false.
   */
  isOpen(): boolean {
    const result: boolean = this._receiver! && this._receiver!.isOpen();
    log.messageSession(
      "[%s] Receiver '%s' for sessionId '%s' is open? -> %s",
      this._context.namespace.connectionId,
      this.name,
      this.sessionId,
      result
    );
    return result;
  }

  /**
   * Registers handlers to deal with the incoming stream of messages over an AMQP receiver link
   * from a Queue/Subscription.
   * To stop receiving messages, call `close()` on the SessionReceiver or set the property
   * `newMessageWaitTimeoutInSeconds` in the options to provide a timeout.
   *
   * @param onMessage - Handler for processing each incoming message.
   * @param onError - Handler for any error that occurs while receiving or processing messages.
   * @param options - Options to control whether messages should be automatically completed. You can
   * also provide a timeout in seconds to denote the amount of time to wait for a new message
   * before closing the receiver.
   *
   * @returns void
   */
  receive(onMessage: OnMessage, onError: OnError, options?: SessionMessageHandlerOptions): void {
    if (!options) options = {};
    this.isReceivingMessages = true;
    if (typeof options.maxConcurrentCalls === "number" && options.maxConcurrentCalls > 0) {
      this.maxConcurrentCalls = options.maxConcurrentCalls;
    }

    // If explicitly set to false then autoComplete is false else true (default).
    this.autoComplete = options.autoComplete === false ? options.autoComplete : true;
    this._onMessage = onMessage;
    this._onError = onError;
    const connectionId = this._context.namespace.connectionId;

    /**
     * Resets the timer when a new message is received for Session Manager.
     * It will close the receiver gracefully, if no
     * messages were received for the configured newMessageWaitTimeoutInSeconds
     */
    const resetTimerOnNewMessageReceived = (): void => {
      if (this._newMessageReceivedTimer) clearTimeout(this._newMessageReceivedTimer);
      if (this.newMessageWaitTimeoutInSeconds) {
        this._newMessageReceivedTimer = setTimeout(async () => {
          const msg =
            `MessageSession '${this.sessionId}' with name '${this.name}' did not receive ` +
            `any messages in the last ${this.newMessageWaitTimeoutInSeconds} seconds. Hence closing it.`;
          log.error("[%s] %s", this._context.namespace.connectionId, msg);

          if (this.callee === SessionCallee.sessionManager) {
            // The session manager will not forward this error to user.
            // Instead, this is taken as a indicator to create a new session client for the next session.
            const error = translate({
              condition: "com.microsoft:message-wait-timeout",
              description: msg
            });
            this._notifyError(translate(error));
          }
          await this.close();
        }, this.newMessageWaitTimeoutInSeconds * 1000);
      }
    };

    if (this._receiver && this._receiver.isOpen()) {
      const onSessionMessage = async (context: EventContext): Promise<void> => {
        // If the receiver got closed in PeekLock mode, avoid processing the message as we
        // cannot settle the message.
        if (
          this.receiveMode === ReceiveMode.peekLock &&
          (!this._receiver || !this._receiver.isOpen())
        ) {
          log.error(
            "[%s] Not calling the user's message handler for the current message " +
              "as the receiver '%s' is closed",
            connectionId,
            this.name
          );
          return;
        }

        resetTimerOnNewMessageReceived();
        const bMessage: ServiceBusMessage = new ServiceBusMessage(
          this._context,
          context.message!,
          context.delivery!,
          true
        );
        try {
          await this._onMessage(bMessage);
        } catch (err) {
          // This ensures we call users' error handler when users' message handler throws.
          if (!isAmqpError(err)) {
            log.error(
              "[%s] An error occurred while running user's message handler for the message " +
                "with id '%s' on the receiver '%s': %O",
              connectionId,
              bMessage.messageId,
              this.name,
              err
            );
            this._onError!(err);
          }

          const error = translate(err);
          // Nothing much to do if user's message handler throws. Let us try abandoning the message.
          if (
            !bMessage.delivery.remote_settled &&
            this.receiveMode === ReceiveMode.peekLock &&
            this.isOpen() // only try to abandon the messages if the connection is still open
          ) {
            try {
              log.error(
                "[%s] Abandoning the message with id '%s' on the receiver '%s' since " +
                  "an error occured: %O.",
                connectionId,
                bMessage.messageId,
                this.name,
                error
              );
              await bMessage.abandon();
            } catch (abandonError) {
              const translatedError = translate(abandonError);
              log.error(
                "[%s] An error occurred while abandoning the message with id '%s' on the " +
                  "receiver '%s': %O.",
                connectionId,
                bMessage.messageId,
                this.name,
                translatedError
              );
              this._notifyError(translatedError);
            }
          }
          return;
        } finally {
          if (this._receiver) {
            this._receiver!.addCredit(1);
          }
        }

        // If we've made it this far, then user's message handler completed fine. Let us try
        // completing the message.
        if (
          this.autoComplete &&
          this.receiveMode === ReceiveMode.peekLock &&
          !bMessage.delivery.remote_settled
        ) {
          try {
            log.messageSession(
              "[%s] Auto completing the message with id '%s' on " + "the receiver '%s'.",
              connectionId,
              bMessage.messageId,
              this.name
            );
            await bMessage.complete();
          } catch (completeError) {
            const translatedError = translate(completeError);
            log.error(
              "[%s] An error occurred while completing the message with id '%s' on the " +
                "receiver '%s': %O.",
              connectionId,
              bMessage.messageId,
              this.name,
              translatedError
            );
            this._notifyError(translatedError);
          }
        }
      };
      // setting the "message" event listener.
      this._receiver.on(ReceiverEvents.message, onSessionMessage);
      // adding credit
      this._receiver!.addCredit(this.maxConcurrentCalls);
    } else {
      this.isReceivingMessages = false;
      const msg =
        `MessageSession with sessionId '${this.sessionId}' and name '${this.name}' ` +
        `has either not been created or is not open.`;
      log.error("[%s] %s", this._context.namespace.connectionId, msg);
      this._notifyError(new Error(msg));
    }
  }

  /**
   * Returns a batch of messages based on given count and timeout over an AMQP receiver link
   * from a Queue/Subscription.
   *
   * @param maxMessageCount      The maximum number of messages to receive from Queue/Subscription.
   * @param maxWaitTimeInSeconds The total wait time in seconds until which the receiver will attempt to receive specified number of messages.
   * If this time elapses before the `maxMessageCount` is reached, then messages collected till then will be returned to the user.
   * - **Default**: `60` seconds.
   * @returns Promise<ServiceBusMessage[]> A promise that resolves with an array of Message objects.
   */
  async receiveMessages(
    maxMessageCount: number,
    maxWaitTimeInSeconds?: number
  ): Promise<ServiceBusMessage[]> {
    if (maxWaitTimeInSeconds == null) {
      maxWaitTimeInSeconds = Constants.defaultOperationTimeoutInSeconds;
    }

    const brokeredMessages: ServiceBusMessage[] = [];
    this.isReceivingMessages = true;

    return new Promise<ServiceBusMessage[]>((resolve, reject) => {
      let totalWaitTimer: any;

      const setnewMessageWaitTimeoutInSeconds = (value?: number): void => {
        this.newMessageWaitTimeoutInSeconds = value;
      };

      setnewMessageWaitTimeoutInSeconds(1);

      // Action to be performed on the "receiver_drained" event.
      const onReceiveDrain: OnAmqpEvent = () => {
        this._receiver!.removeListener(ReceiverEvents.receiverDrained, onReceiveDrain);
        this._receiver!.drain = false;

        this.isReceivingMessages = false;

        log.messageSession(
          "[%s] Receiver '%s' drained. Resolving receiveMessages() with %d messages.",
          this._context.namespace.connectionId,
          this.name,
          brokeredMessages.length
        );

        resolve(brokeredMessages);
      };

      // Action to be performed after the max wait time is over.
      const actionAfterWaitTimeout: Func<void, void> = (): void => {
        log.batching(
          "[%s] Batching Receiver '%s'  max wait time in seconds %d over.",
          this._context.namespace.connectionId,
          this.name,
          maxWaitTimeInSeconds
        );
        return finalAction();
      };

      // Action to be performed on the "message" event.
      const onReceiveMessage: OnAmqpEventAsPromise = async (context: EventContext) => {
        resetTimerOnNewMessageReceived();
        try {
          const data: ServiceBusMessage = new ServiceBusMessage(
            this._context,
            context.message!,
            context.delivery!,
            true
          );
          if (brokeredMessages.length < maxMessageCount) {
            brokeredMessages.push(data);
          }
        } catch (err) {
          // Removing listeners, so that the next receiveMessages() call can set them again.
          if (this._receiver) {
            this._receiver.removeListener(ReceiverEvents.message, onReceiveMessage);
            this._receiver.removeListener(ReceiverEvents.receiverDrained, onReceiveDrain);
          }

          log.error(
            "[%s] Receiver '%s' received an error while converting AmqpMessage to ServiceBusMessage:\n%O",
            this._context.namespace.connectionId,
            this.name,
            err
          );
          reject(err instanceof Error ? err : new Error(JSON.stringify(err)));
        }
        if (brokeredMessages.length === maxMessageCount) {
          finalAction();
        }
      };

      this._onError = (error: MessagingError | Error) => {
        this.isReceivingMessages = false;
        // Resetting the newMessageWaitTimeoutInSeconds to undefined since we are done receiving
        // a batch of messages.
        setnewMessageWaitTimeoutInSeconds();
        if (totalWaitTimer) {
          clearTimeout(totalWaitTimer);
        }
        // Removing listeners, so that the next receiveMessages() call can set them again.
        if (this._receiver) {
          this._receiver.removeListener(ReceiverEvents.message, onReceiveMessage);
          this._receiver.removeListener(ReceiverEvents.receiverDrained, onReceiveDrain);
        }
        reject(error);
      };

      // Final action to be performed after maxMessageCount is reached or the maxWaitTime is over.
      const finalAction = (): void => {
        if (this._newMessageReceivedTimer) {
          clearTimeout(this._newMessageReceivedTimer);
        }
        if (totalWaitTimer) {
          clearTimeout(totalWaitTimer);
        }

        // Unsetting the newMessageWaitTimeoutInSeconds to undefined since we are done receiving
        // a batch of messages.
        setnewMessageWaitTimeoutInSeconds();

        // Removing listeners, so that the next receiveMessages() call can set them again.
        if (this._receiver) {
          this._receiver.removeListener(ReceiverEvents.message, onReceiveMessage);
        }

        if (this._receiver && this._receiver.credit > 0) {
          log.messageSession(
            "[%s] Receiver '%s': Draining leftover credits(%d).",
            this._context.namespace.connectionId,
            this.name,
            this._receiver.credit
          );

          // Setting drain must be accompanied by a flow call (aliased to addCredit in this case).
          this._receiver.drain = true;
          this._receiver.addCredit(1);
        } else {
          if (this._receiver) {
            this._receiver.removeListener(ReceiverEvents.receiverDrained, onReceiveDrain);
          }

          this.isReceivingMessages = false;
          log.messageSession(
            "[%s] Receiver '%s': Resolving receiveMessages() with %d messages.",
            this._context.namespace.connectionId,
            this.name,
            brokeredMessages.length
          );
          resolve(brokeredMessages);
        }
      };

      /**
       * Resets the timer when a new message is received. If no messages were received for
       * `newMessageWaitTimeoutInSeconds`, the messages received till now are returned. The
       * receiver link stays open for the next receive call, but doesnt receive messages until then.
       * The new message wait timer mechanism is used only in `peekLock` mode.
       */
      const resetTimerOnNewMessageReceived =
        this.receiveMode === ReceiveMode.peekLock
          ? (): void => {
              if (this._newMessageReceivedTimer) clearTimeout(this._newMessageReceivedTimer);
              if (this.newMessageWaitTimeoutInSeconds) {
                this._newMessageReceivedTimer = setTimeout(async () => {
                  const msg =
                    `MessageSession '${this.sessionId}' with name '${this.name}' did not receive ` +
                    `any messages in the last ${this.newMessageWaitTimeoutInSeconds} seconds. Hence closing it.`;
                  log.error("[%s] %s", this._context.namespace.connectionId, msg);
                  finalAction();
                  if (this.callee === SessionCallee.sessionManager) {
                    await this.close();
                  }
                }, this.newMessageWaitTimeoutInSeconds * 1000);
              }
            }
          : () => {};

      const addCreditAndSetTimer = (reuse?: boolean): void => {
        log.batching(
          "[%s] Receiver '%s', adding credit for receiving %d messages.",
          this._context.namespace.connectionId,
          this.name,
          maxMessageCount
        );
        // By adding credit here, we let the service know that at max we can handle `maxMessageCount`
        // number of messages concurrently. We will return the user an array of messages that can
        // be of size upto maxMessageCount. Then the user needs to accordingly dispose
        // (complete,/abandon/defer/deadletter) the messages from the array.
        this._receiver!.addCredit(maxMessageCount);
        let msg: string = "[%s] Setting the wait timer for %d seconds for receiver '%s'.";
        if (reuse) msg += " Receiver link already present, hence reusing it.";
        log.batching(msg, this._context.namespace.connectionId, maxWaitTimeInSeconds, this.name);
        totalWaitTimer = setTimeout(
          actionAfterWaitTimeout,
          (maxWaitTimeInSeconds as number) * 1000
        );
      };

      if (this.isOpen()) {
        this._receiver!.on(ReceiverEvents.message, onReceiveMessage);
        this._receiver!.on(ReceiverEvents.receiverDrained, onReceiveDrain);
        addCreditAndSetTimer(true);
      } else {
        const msg =
          `MessageSession "${this.name}" with sessionId "${this.sessionId}", ` +
          `is already closed. Hence cannot receive messages in a batch.`;
        log.error("[%s] %s", this._context.namespace.connectionId, msg);
        reject(new Error(msg));
      }
    });
  }

  /**
   * Settles the message with the specified disposition.
   * @param message The ServiceBus Message that needs to be settled.
   * @param operation The disposition type.
   * @param options Optional parameters that can be provided while disposing the message.
   */
  async settleMessage(
    message: ServiceBusMessage,
    operation: DispositionType,
    options?: DispositionStatusOptions
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!options) options = {};
      if (operation.match(/^(complete|abandon|defer|deadletter)$/) == null) {
        return reject(new Error(`operation: '${operation}' is not a valid operation.`));
      }
      const delivery = message.delivery;
      const timer = setTimeout(() => {
        this._deliveryDispositionMap.delete(delivery.id);
        log.receiver(
          "[%s] Disposition for delivery id: %d, did not complete in %d milliseconds. " +
            "Hence rejecting the promise with timeout error",
          this._context.namespace.connectionId,
          delivery.id,
          Constants.defaultOperationTimeoutInSeconds * 1000
        );

        const e: AmqpError = {
          condition: ErrorNameConditionMapper.ServiceUnavailableError,
          description:
            "Operation to settle the message has timed out. The disposition of the " +
            "message may or may not be successful"
        };
        return reject(translate(e));
      }, Constants.defaultOperationTimeoutInSeconds * 1000);
      this._deliveryDispositionMap.set(delivery.id, {
        resolve: resolve,
        reject: reject,
        timer: timer
      });
      if (operation === DispositionType.complete) {
        delivery.accept();
      } else if (operation === DispositionType.abandon) {
        const params: any = {
          undeliverable_here: false
        };
        if (options.propertiesToModify) params.message_annotations = options.propertiesToModify;
        delivery.modified(params);
      } else if (operation === DispositionType.defer) {
        const params: any = {
          undeliverable_here: true
        };
        if (options.propertiesToModify) params.message_annotations = options.propertiesToModify;
        delivery.modified(params);
      } else if (operation === DispositionType.deadletter) {
        const error: AmqpError = {
          condition: Constants.deadLetterName,
          info: {
            ...options.propertiesToModify,
            DeadLetterReason: options.deadLetterReason,
            DeadLetterErrorDescription: options.deadLetterDescription
          }
        };
        delivery.reject(error);
      }
    });
  }

  /**
   * Creates a new instance of the MessageSession based on the provided parameters.
   * @param context The client entity context
   * @param options Options that can be provided while creating the MessageSession.
   */
  static async create(
    context: ClientEntityContext,
    options?: MessageSessionOptions
  ): Promise<MessageSession> {
    throwErrorIfConnectionClosed(context.namespace);
    const messageSession = new MessageSession(context, options);
    await messageSession._init();
    return messageSession;
  }
}
