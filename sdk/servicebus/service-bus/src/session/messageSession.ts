// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Constants, ErrorNameConditionMapper, MessagingError, translate } from "@azure/core-amqp";
import {
  AmqpError,
  EventContext,
  isAmqpError,
  OnAmqpEvent,
  Receiver,
  ReceiverEvents,
  ReceiverOptions
} from "rhea-promise";
import { ConnectionContext } from "../connectionContext";
import { LinkEntity } from "../core/linkEntity";
import { DispositionStatusOptions } from "../core/managementClient";
import { OnAmqpEventAsPromise, OnError, OnMessage } from "../core/messageReceiver";
import * as log from "../log";
import { DispositionType, InternalReceiveMode, ServiceBusMessageImpl } from "../serviceBusMessage";
import { throwErrorIfConnectionClosed } from "../util/errors";
import { calculateRenewAfterDuration, convertTicksToDate } from "../util/utils";
import { BatchingReceiverLite, MinimalReceiver } from "../core/batchingReceiver";
import { onMessageSettled, DeferredPromiseAndTimer } from "../core/shared";
import { AbortSignalLike } from "@azure/abort-controller";
import { ReceiverHelper } from "../core/receiverHelper";
import { CreateSessionReceiverOptions, MessageHandlerOptionsBase } from "../models";

/**
 * Describes the options that need to be provided while creating a message session receiver link.
 * @internal
 * @ignore
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
 * @internal
 * @ignore
 * Describes all the options that can be set while instantiating a MessageSession object.
 */
export type MessageSessionOptions = Pick<
  CreateSessionReceiverOptions<"receiveAndDelete">,
  "sessionId" | "maxAutoRenewLockDurationInMs" | "abortSignal"
> & {
  receiveMode?: InternalReceiveMode;
};

/**
 * @internal
 * @ignore
 * Describes the receiver for a Message Session.
 */
export class MessageSession extends LinkEntity<Receiver> {
  /**
   * @property {Date} [sessionLockedUntilUtc] Provides the duration until which the session is locked.
   */
  sessionLockedUntilUtc!: Date;
  /**
   * @property {string} [providedSessionId] The sessionId provided in the MessageSessionOptions. Empty string is valid sessionId.
   */
  private providedSessionId?: string;
  /**
   * @property {string} [sessionId] The sessionId for the message session. Empty string is valid sessionId.
   */
  sessionId!: string;
  /**
   * @property {number} [maxConcurrentSessions] The maximum number of concurrent sessions that the
   * client should initiate.
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
  receiveMode: InternalReceiveMode;
  /**
   * @property {boolean} autoComplete Indicates whether `Message.complete()` should be called
   * automatically after the message processing is complete while receiving messages with handlers.
   * Default: false.
   */
  autoComplete: boolean;
  /**
   * @property {number} maxAutoRenewDurationInMs The maximum duration within which the
   * lock will be renewed automatically. This value should be greater than the longest message
   * lock duration; for example, the `lockDuration` property on the received message.
   *
   * Default: `300 * 1000` (5 minutes);
   */
  maxAutoRenewDurationInMs: number;
  /**
   * @property {boolean} autoRenewLock Should lock renewal happen automatically.
   */
  autoRenewLock: boolean;
  /**
   * Denotes if we are currently receiving messages
   */
  get isReceivingMessages(): boolean {
    return this._batchingReceiverLite.isReceivingMessages || this._isReceivingMessagesForSubscriber;
  }

  private _batchingReceiverLite: BatchingReceiverLite;
  private _isReceivingMessagesForSubscriber: boolean;

  /**
   * @property {Map<number, Promise<any>>} _deliveryDispositionMap Maintains a map of deliveries that
   * are being actively disposed. It acts as a store for correlating the responses received for
   * active dispositions.
   */
  private _deliveryDispositionMap: Map<number, DeferredPromiseAndTimer> = new Map<
    number,
    DeferredPromiseAndTimer
  >();
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

  private _totalAutoLockRenewDuration: number;

  public get receiverHelper(): ReceiverHelper {
    return this._receiverHelper;
  }
  private _receiverHelper: ReceiverHelper;

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
      const connectionId = this._context.connectionId;
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
          this.sessionLockedUntilUtc = await this._context
            .getManagementClient(this._entityPath)
            .renewSessionLock(this.sessionId, {
              associatedLinkName: this.name,
              timeoutInMs: 10000
            });
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
            this._context.connectionId,
            this.sessionId,
            this.name,
            err
          );
        }
      }, nextRenewalTimeout);
      log.messageSession(
        "[%s] MessageSession '%s' with name '%s', has next session lock renewal " +
          "in %d milliseconds @(%s).",
        this._context.connectionId,
        this.sessionId,
        this.name,
        nextRenewalTimeout,
        new Date(Date.now() + nextRenewalTimeout).toString()
      );
    }
  }

  protected createRheaLink(
    options: ReceiverOptions,
    _abortSignal?: AbortSignalLike
  ): Promise<Receiver> {
    return this._context.connection.createReceiver(options);
  }

  /**
   * Creates a new AMQP receiver under a new AMQP session.
   */
  private async _init(abortSignal?: AbortSignalLike): Promise<void> {
    const connectionId = this._context.connectionId;
    try {
      const options = this._createMessageSessionOptions();
      await this.initLink(options, abortSignal);

      if (this.link == null) {
        throw new Error("INTERNAL ERROR: failed to create receiver but without an error.");
      }

      const receivedSessionId =
        this.link.source &&
        this.link.source.filter &&
        this.link.source.filter[Constants.sessionFilterName];

      let errorMessage: string = "";

      if (this.providedSessionId == null && receivedSessionId == null) {
        // Ideally this code path should never be reached as `MessageSession.createReceiver()` should fail instead
        // TODO: https://github.com/Azure/azure-sdk-for-js/issues/9775 to figure out why this code path indeed gets hit.
        errorMessage = `Failed to create a receiver. No unlocked sessions available.`;
      } else if (this.providedSessionId != null && receivedSessionId !== this.providedSessionId) {
        // This code path is reached if the session is already locked by another receiver.
        // TODO: Check why the service would not throw an error or just timeout instead of giving a misleading successful receiver
        errorMessage = `Failed to create a receiver for the requested session '${this.providedSessionId}'. It may be locked by another receiver.`;
      }

      if (errorMessage) {
        const error = translate({
          description: errorMessage,
          condition: ErrorNameConditionMapper.SessionCannotBeLockedError
        });
        log.error("[%s] %O", this._context.connectionId, error);
        throw error;
      }
      if (this.providedSessionId == null) this.sessionId = receivedSessionId;
      this.sessionLockedUntilUtc = convertTicksToDate(
        this.link.properties["com.microsoft:locked-until-utc"]
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
      if (!this._context.messageSessions[this.name]) {
        this._context.messageSessions[this.name] = this;
      }
      this._totalAutoLockRenewDuration = Date.now() + this.maxAutoRenewDurationInMs;
      this._ensureSessionLockRenewal();
    } catch (err) {
      const errObj = translate(err);
      log.error(
        "[%s] An error occured while creating the receiver '%s': %O",
        this._context.connectionId,
        this.name,
        errObj
      );

      // Fix the unhelpful error messages for the OperationTimeoutError that comes from `rhea-promise`.
      if ((errObj as MessagingError).code === "OperationTimeoutError") {
        if (this.providedSessionId) {
          errObj.message = `Failed to create a receiver for the requested session '${this.providedSessionId}' within allocated time and retry attempts.`;
        } else {
          errObj.message = "Failed to create a receiver within allocated time and retry attempts.";
        }
      }
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
      rcv_settle_mode: this.receiveMode === InternalReceiveMode.receiveAndDelete ? 0 : 1,
      // receiveAndDelete -> settled (1), peekLock -> unsettled (0)
      snd_settle_mode: this.receiveMode === InternalReceiveMode.receiveAndDelete ? 1 : 0,
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

  constructor(
    context: ConnectionContext,
    private _entityPath: string,
    options?: MessageSessionOptions
  ) {
    super(_entityPath, context, "ms", {
      address: _entityPath,
      audience: `${context.config.endpoint}${_entityPath}`
    });
    this._receiverHelper = new ReceiverHelper(() => this.link);
    if (!options) options = { sessionId: undefined };
    this.autoComplete = false;
    this.providedSessionId = options.sessionId;
    if (this.providedSessionId != undefined) this.sessionId = this.providedSessionId;
    this.receiveMode = options.receiveMode || InternalReceiveMode.peekLock;
    this.maxAutoRenewDurationInMs =
      options.maxAutoRenewLockDurationInMs != null
        ? options.maxAutoRenewLockDurationInMs
        : 300 * 1000;
    this._totalAutoLockRenewDuration = Date.now() + this.maxAutoRenewDurationInMs;
    this.autoRenewLock =
      this.maxAutoRenewDurationInMs > 0 && this.receiveMode === InternalReceiveMode.peekLock;

    this._isReceivingMessagesForSubscriber = false;
    this._batchingReceiverLite = new BatchingReceiverLite(
      context,
      _entityPath,
      async (_abortSignal?: AbortSignalLike): Promise<MinimalReceiver> => {
        return this.link!;
      },
      this.receiveMode
    );

    // setting all the handlers
    this._onSettled = (context: EventContext) => {
      const connectionId = this._context.connectionId;
      const delivery = context.delivery;

      onMessageSettled(connectionId, delivery, this._deliveryDispositionMap);
    };

    this._notifyError = (error: MessagingError | Error) => {
      if (this._onError) {
        this._onError(error);
        log.error(
          "[%s] Notified the user's error handler about the error received by the " +
            "Receiver '%s'.",
          this._context.connectionId,
          this.name
        );
      }
    };

    this._onAmqpError = (context: EventContext) => {
      const connectionId = this._context.connectionId;
      const receiverError = context.receiver && context.receiver.error;
      if (receiverError) {
        const sbError = translate(receiverError) as MessagingError;
        if (sbError.code === "SessionLockLostError") {
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
      const connectionId = this._context.connectionId;
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
      const connectionId = this._context.connectionId;
      const receiverError = context.receiver && context.receiver.error;
      const receiver = this.link || context.receiver!;
      if (receiverError) {
        const sbError = translate(receiverError) as MessagingError;
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
          "[%s] 'receiver_close' event occurred on the receiver '%s' for sessionId '%s' " +
            "because the sdk initiated it. Hence no need to gracefully close the receiver",
          connectionId,
          this.name,
          this.sessionId
        );
      }
    };

    this._onSessionClose = async (context: EventContext) => {
      const connectionId = this._context.connectionId;
      const receiver = this.link || context.receiver!;
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
   */
  async close(): Promise<void> {
    try {
      this._isReceivingMessagesForSubscriber = false;
      if (this._sessionLockRenewalTimer) clearTimeout(this._sessionLockRenewalTimer);
      log.messageSession(
        "[%s] Cleared the timers for 'no new message received' task and " +
          "'session lock renewal' task.",
        this._context.connectionId
      );

      await super.close();

      await this._batchingReceiverLite.close();
    } catch (err) {
      log.error(
        "[%s] An error occurred while closing the message session with id '%s': %O.",
        this._context.connectionId,
        this.sessionId,
        err
      );
    }
  }

  /**
   * Determines whether the AMQP receiver link is open. If open then returns true else returns false.
   */
  isOpen(): boolean {
    const result: boolean = this.link! && this.link!.isOpen();
    log.messageSession(
      "[%s] Receiver '%s' for sessionId '%s' is open? -> %s",
      this._context.connectionId,
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
   * `newMessageWaitTimeoutInMs` in the options to provide a timeout.
   *
   * @param onMessage - Handler for processing each incoming message.
   * @param onError - Handler for any error that occurs while receiving or processing messages.
   * @param options - Options to control whether messages should be automatically completed. You can
   * also provide a timeout in milliseconds to denote the amount of time to wait for a new message
   * before closing the receiver.
   *
   * @returns void
   */
  subscribe(onMessage: OnMessage, onError: OnError, options?: MessageHandlerOptionsBase): void {
    if (!options) options = {};
    this._isReceivingMessagesForSubscriber = true;
    if (typeof options.maxConcurrentCalls === "number" && options.maxConcurrentCalls > 0) {
      this.maxConcurrentCalls = options.maxConcurrentCalls;
    }

    // If explicitly set to false then autoComplete is false else true (default).
    this.autoComplete = options.autoComplete === false ? options.autoComplete : true;
    this._onMessage = onMessage;
    this._onError = onError;
    const connectionId = this._context.connectionId;

    if (this.link && this.link.isOpen()) {
      const onSessionMessage = async (context: EventContext): Promise<void> => {
        // If the receiver got closed in PeekLock mode, avoid processing the message as we
        // cannot settle the message.
        if (
          this.receiveMode === InternalReceiveMode.peekLock &&
          (!this.link || !this.link.isOpen())
        ) {
          log.error(
            "[%s] Not calling the user's message handler for the current message " +
              "as the receiver '%s' is closed",
            connectionId,
            this.name
          );
          return;
        }

        const bMessage = new ServiceBusMessageImpl(
          this._context,
          this._entityPath,
          context.message!,
          context.delivery!,
          true,
          this.receiveMode
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
            this.receiveMode === InternalReceiveMode.peekLock &&
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
          this.receiverHelper.addCredit(1);
        }

        // If we've made it this far, then user's message handler completed fine. Let us try
        // completing the message.
        if (
          this.autoComplete &&
          this.receiveMode === InternalReceiveMode.peekLock &&
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
      this.link.on(ReceiverEvents.message, onSessionMessage);
      // adding credit
      this.receiverHelper.addCredit(this.maxConcurrentCalls);
    } else {
      this._isReceivingMessagesForSubscriber = false;
      const msg =
        `MessageSession with sessionId '${this.sessionId}' and name '${this.name}' ` +
        `has either not been created or is not open.`;
      log.error("[%s] %s", this._context.connectionId, msg);
      this._notifyError(new Error(msg));
    }
  }

  /**
   * Returns a batch of messages based on given count and timeout over an AMQP receiver link
   * from a Queue/Subscription.
   *
   * @param maxMessageCount      The maximum number of messages to receive from Queue/Subscription.
   * @param maxWaitTimeInMs The total wait time in milliseconds until which the receiver will attempt to receive specified number of messages.
   * If this time elapses before the `maxMessageCount` is reached, then messages collected till then will be returned to the user.
   * @returns Promise<ServiceBusMessage[]> A promise that resolves with an array of Message objects.
   */
  async receiveMessages(
    maxMessageCount: number,
    maxWaitTimeInMs: number,
    maxTimeAfterFirstMessageInMs: number,
    userAbortSignal?: AbortSignalLike
  ): Promise<ServiceBusMessageImpl[]> {
    try {
      return await this._batchingReceiverLite.receiveMessages({
        maxMessageCount,
        maxWaitTimeInMs,
        maxTimeAfterFirstMessageInMs,
        userAbortSignal
      });
    } catch (error) {
      log.error(
        "[%s] Receiver '%s': Rejecting receiveMessages() with error %O: ",
        this._context.connectionId,
        this.name,
        error
      );
      throw error;
    }
  }

  /**
   * Settles the message with the specified disposition.
   * @param message The ServiceBus Message that needs to be settled.
   * @param operation The disposition type.
   * @param options Optional parameters that can be provided while disposing the message.
   */
  async settleMessage(
    message: ServiceBusMessageImpl,
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
          this._context.connectionId,
          delivery.id,
          Constants.defaultOperationTimeoutInMs
        );

        const e: AmqpError = {
          condition: ErrorNameConditionMapper.ServiceUnavailableError,
          description:
            "Operation to settle the message has timed out. The disposition of the " +
            "message may or may not be successful"
        };
        return reject(translate(e));
      }, Constants.defaultOperationTimeoutInMs);
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
    context: ConnectionContext,
    entityPath: string,
    options?: MessageSessionOptions
  ): Promise<MessageSession> {
    throwErrorIfConnectionClosed(context);
    const messageSession = new MessageSession(context, entityPath, options);
    await messageSession._init(options?.abortSignal);
    return messageSession;
  }
}
