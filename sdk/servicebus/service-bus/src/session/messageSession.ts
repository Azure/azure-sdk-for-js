// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Constants,
  ErrorNameConditionMapper,
  MessagingError,
  RetryOptions,
  StandardAbortMessage,
} from "@azure/core-amqp";
import {
  AmqpError,
  EventContext,
  OnAmqpEvent,
  Receiver,
  ReceiverEvents,
  ReceiverOptions,
} from "rhea-promise";
import { ConnectionContext } from "../connectionContext";
import { LinkEntity } from "../core/linkEntity";
import { DispositionStatusOptions } from "../core/managementClient";
import { OnAmqpEventAsPromise, OnError, OnMessage } from "../core/messageReceiver";
import { receiverLogger as logger } from "../log";
import { DispositionType, ServiceBusMessageImpl } from "../serviceBusMessage";
import { throwErrorIfConnectionClosed } from "../util/errors";
import { calculateRenewAfterDuration, convertTicksToDate } from "../util/utils";
import { BatchingReceiverLite, MinimalReceiver } from "../core/batchingReceiver";
import { onMessageSettled, DeferredPromiseAndTimer, createReceiverOptions } from "../core/shared";
import { AbortError, AbortSignalLike } from "@azure/abort-controller";
import { ReceiverHelper } from "../core/receiverHelper";
import {
  ServiceBusSessionReceiverOptions,
  ProcessErrorArgs,
  ReceiveMode,
  SubscribeOptions,
} from "../models";
import { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";
import { ServiceBusError, translateServiceBusError } from "../serviceBusError";
import { abandonMessage, completeMessage } from "../receivers/receiverCommon";
import { isDefined } from "../util/typeGuards";

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
 * @internal
 * Describes all the options that can be set while instantiating a MessageSession object.
 */
export type MessageSessionOptions = Pick<
  ServiceBusSessionReceiverOptions,
  "maxAutoLockRenewalDurationInMs" | "abortSignal"
> & {
  receiveMode?: ReceiveMode;
  retryOptions: RetryOptions | undefined;
  skipParsingBodyAsJson: boolean;
};

/**
 * @internal
 * Describes the receiver for a Message Session.
 */
export class MessageSession extends LinkEntity<Receiver> {
  /**
   * Provides the duration until which the session is locked.
   */
  sessionLockedUntilUtc!: Date;
  /**
   * The sessionId for the message session. Empty string is valid sessionId.
   */
  sessionId!: string;
  /**
   * The maximum number of concurrent sessions that the
   * client should initiate.
   * - **Default**: `1`.
   */
  maxConcurrentSessions?: number;
  /**
   * The maximum number of messages that should be
   * processed concurrently in a session while in streaming mode. Once this limit has been reached,
   * more messages will not be received until the user's message handler has completed processing current message.
   * - **Default**: `1` (message in a session at a time).
   */
  maxConcurrentCalls: number = 1;
  /**
   * The mode in which messages should be received.
   * Default: ReceiveMode.peekLock
   */
  receiveMode: ReceiveMode;
  /**
   * Indicates whether `Message.complete()` should be called
   * automatically after the message processing is complete while receiving messages with handlers.
   * Default: false.
   */
  autoComplete: boolean;
  /**
   * The maximum duration within which the
   * lock will be renewed automatically. This value should be greater than the longest message
   * lock duration; for example, the `lockDuration` property on the received message.
   *
   * Default: `300 * 1000` (5 minutes);
   */
  maxAutoRenewDurationInMs: number;
  /**
   * Should lock renewal happen automatically.
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
   * Maintains a map of deliveries that
   * are being actively disposed. It acts as a store for correlating the responses received for
   * active dispositions.
   */
  private _deliveryDispositionMap: Map<number, DeferredPromiseAndTimer> = new Map<
    number,
    DeferredPromiseAndTimer
  >();
  /**
   * The message handler provided by the user that will
   * be wrapped inside _onAmqpMessage.
   */
  private _onMessage!: OnMessage;
  /**
   * The error handler provided by the user that will be wrapped
   * inside _onAmqpError.
   */
  private _onError?: OnError;
  /**
   * If the user provided error handler is present then it will
   * notify the user's error handler about the error.
   */
  private _notifyError: OnError;
  /**
   * The message handler that will be set as the handler on the
   * underlying rhea receiver for the "receiver_close" event.
   */
  private _onAmqpClose: OnAmqpEventAsPromise;
  /**
   * The message handler that will be set as the handler on
   * the underlying rhea receiver's session for the "session_error" event.
   */
  private _onSessionError: OnAmqpEvent;
  /**
   * The message handler that will be set as the handler on
   * the underlying rhea receiver's session for the "session_close" event.
   */
  private _onSessionClose: OnAmqpEventAsPromise;
  /**
   * The message handler that will be set as the handler on the
   * underlying rhea receiver for the "receiver_error" event.
   */
  private _onAmqpError: OnAmqpEvent;
  /**
   * The message handler that will be set as the handler on the
   * underlying rhea receiver for the "settled" event.
   */
  private _onSettled: OnAmqpEvent;
  /**
   * The session lock renewal timer that keeps
   * track of when the MessageSession is due for session lock renewal.
   */
  private _sessionLockRenewalTimer?: NodeJS.Timer;

  private _totalAutoLockRenewDuration: number;

  /**
   * Whether to prevent the client from running JSON.parse() on the message body when receiving the message.
   */
  private skipParsingBodyAsJson: boolean;

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
      const nextRenewalTimeout = calculateRenewAfterDuration(this.sessionLockedUntilUtc!);
      this._sessionLockRenewalTimer = setTimeout(async () => {
        try {
          logger.verbose(
            "%s Attempting to renew the session lock for MessageSession '%s' " + "with name '%s'.",
            this.logPrefix,
            this.sessionId,
            this.name
          );
          this.sessionLockedUntilUtc = await this._context
            .getManagementClient(this.entityPath)
            .renewSessionLock(this.sessionId, {
              associatedLinkName: this.name,
              timeoutInMs: 10000,
            });
          logger.verbose(
            "%s Successfully renewed the session lock for MessageSession '%s' " + "with name '%s'.",
            this.logPrefix,
            this.sessionId,
            this.name
          );
          logger.verbose(
            "%s Calling _ensureSessionLockRenewal() again for MessageSession '%s'.",
            this.logPrefix,
            this.sessionId
          );
          this._ensureSessionLockRenewal();
        } catch (err: any) {
          logger.logError(
            err,
            "%s An error occurred while renewing the session lock for MessageSession '%s'",
            this.logPrefix,
            this.sessionId
          );
        }
      }, nextRenewalTimeout);
      logger.verbose(
        "%s MessageSession '%s' has next session lock renewal in %d milliseconds @(%s).",
        this.logPrefix,
        this.sessionId,
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

      if (this._providedSessionId == null && receivedSessionId == null) {
        // Ideally this code path should never be reached as `MessageSession.createReceiver()` should fail instead
        // TODO: https://github.com/Azure/azure-sdk-for-js/issues/9775 to figure out why this code path indeed gets hit.
        errorMessage = `Failed to create a receiver. No unlocked sessions available.`;
      } else if (this._providedSessionId != null && receivedSessionId !== this._providedSessionId) {
        // This code path is reached if the session is already locked by another receiver.
        // TODO: Check why the service would not throw an error or just timeout instead of giving a misleading successful receiver
        errorMessage = `Failed to create a receiver for the requested session '${this._providedSessionId}'. It may be locked by another receiver.`;
      }

      if (errorMessage) {
        const error = translateServiceBusError({
          description: errorMessage,
          condition: ErrorNameConditionMapper.SessionCannotBeLockedError,
        });
        logger.logError(error, this.logPrefix);
        throw error;
      }
      if (this._providedSessionId == null) this.sessionId = receivedSessionId;
      this.sessionLockedUntilUtc = convertTicksToDate(
        this.link.properties["com.microsoft:locked-until-utc"]
      );
      logger.verbose(
        "%s Session with id '%s' is locked until: '%s'.",
        this.logPrefix,
        this.sessionId,
        this.sessionLockedUntilUtc.toISOString()
      );
      logger.verbose("%s Receiver created with receiver options: %O", this.logPrefix, options);
      if (!this._context.messageSessions[this.name]) {
        this._context.messageSessions[this.name] = this;
      }
      this._totalAutoLockRenewDuration = Date.now() + this.maxAutoRenewDurationInMs;
      this._ensureSessionLockRenewal();
    } catch (err: any) {
      const errObj = translateServiceBusError(err);
      logger.logError(errObj, "%s An error occured while creating the receiver", this.logPrefix);

      // Fix the unhelpful error messages for the OperationTimeoutError that comes from `rhea-promise`.
      if ((errObj as MessagingError).code === "OperationTimeoutError") {
        if (this._providedSessionId) {
          errObj.message = `Failed to create a receiver for the requested session '${this._providedSessionId}' within allocated time and retry attempts.`;
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
    const rcvrOptions: ReceiverOptions = createReceiverOptions(
      this.name,
      this.receiveMode,
      {
        address: this.address,
        filter: { [Constants.sessionFilterName]: this.sessionId },
      },
      {
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
        onSettled: this._onSettled,
      }
    );

    return rcvrOptions;
  }

  private _retryOptions: RetryOptions | undefined;

  /**
   * Constructs a MessageSession instance which lets you receive messages as batches
   * or via callbacks using subscribe.
   *
   * @param _providedSessionId - The sessionId provided by the user. This can be the
   * name of a session ID to open (empty string is also valid) or it can be undefined,
   * to indicate we want the next unlocked non-empty session.
   */
  constructor(
    connectionContext: ConnectionContext,
    entityPath: string,
    private _providedSessionId: string | undefined,
    options: MessageSessionOptions
  ) {
    super(entityPath, entityPath, connectionContext, "session", logger, {
      address: entityPath,
      audience: `${connectionContext.config.endpoint}${entityPath}`,
    });
    this._receiverHelper = new ReceiverHelper(() => ({
      receiver: this.link,
      logPrefix: this.logPrefix,
    }));
    this._retryOptions = options.retryOptions;
    this.autoComplete = false;
    if (isDefined(this._providedSessionId)) this.sessionId = this._providedSessionId;
    this.receiveMode = options.receiveMode || "peekLock";
    this.skipParsingBodyAsJson = options.skipParsingBodyAsJson;
    this.maxAutoRenewDurationInMs =
      options.maxAutoLockRenewalDurationInMs != null
        ? options.maxAutoLockRenewalDurationInMs
        : 300 * 1000;
    this._totalAutoLockRenewDuration = Date.now() + this.maxAutoRenewDurationInMs;
    this.autoRenewLock = this.maxAutoRenewDurationInMs > 0 && this.receiveMode === "peekLock";

    this._isReceivingMessagesForSubscriber = false;
    this._batchingReceiverLite = new BatchingReceiverLite(
      connectionContext,
      entityPath,
      async (_abortSignal?: AbortSignalLike): Promise<MinimalReceiver> => {
        return this.link!;
      },
      this.receiveMode,
      this.skipParsingBodyAsJson
    );

    // setting all the handlers
    this._onSettled = (context: EventContext) => {
      const delivery = context.delivery;

      onMessageSettled(this.logPrefix, delivery, this._deliveryDispositionMap);
    };

    this._notifyError = (args: ProcessErrorArgs) => {
      if (this._onError) {
        this._onError(args);
        logger.verbose(
          "%s Notified the user's error handler about the error received by the Receiver",
          this.logPrefix
        );
      }
    };

    this._onAmqpError = (context: EventContext) => {
      const receiverError = context.receiver && context.receiver.error;
      if (receiverError) {
        const sbError = translateServiceBusError(receiverError) as MessagingError;
        if (sbError.code === "SessionLockLostError") {
          sbError.message = `The session lock has expired on the session with id ${this.sessionId}.`;
        }
        logger.logError(sbError, "%s An error occurred for Receiver", this.logPrefix);
        this._notifyError({
          error: sbError,
          errorSource: "receive",
          entityPath: this.entityPath,
          fullyQualifiedNamespace: this._context.config.host,
        });
      }
    };

    this._onSessionError = (context: EventContext) => {
      const connectionId = this._context.connectionId;
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        const sbError = translateServiceBusError(sessionError);
        logger.logError(
          sbError,
          "[%s] An error occurred on the session for Receiver '%s': %O.",
          connectionId,
          this.name,
          sbError
        );
        this._notifyError({
          error: sbError,
          errorSource: "receive",
          entityPath: this.entityPath,
          fullyQualifiedNamespace: this._context.config.host,
        });
      }
    };

    this._onAmqpClose = async (context: EventContext) => {
      const connectionId = this._context.connectionId;
      const receiverError = context.receiver && context.receiver.error;
      const receiver = this.link || context.receiver!;
      if (receiverError) {
        const sbError = translateServiceBusError(receiverError) as MessagingError;
        logger.logError(
          sbError,
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
        logger.verbose(
          "%s 'receiver_close' event occurred on the receiver for sessionId '%s' " +
            "and the sdk did not initiate this. Hence, let's gracefully close the receiver.",
          this.logPrefix,
          this.sessionId
        );
        try {
          await this.close();
        } catch (err: any) {
          logger.logError(
            err,
            "%s An error occurred while closing the receiver for sessionId '%s'.",
            this.logPrefix,
            this.sessionId
          );
        }
      } else {
        logger.verbose(
          "%s 'receiver_close' event occurred on the receiver for sessionId '%s' " +
            "because the sdk initiated it. Hence no need to gracefully close the receiver",
          this.logPrefix,
          this.sessionId
        );
      }
    };

    this._onSessionClose = async (context: EventContext) => {
      const receiver = this.link || context.receiver!;
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        const sbError = translateServiceBusError(sessionError);
        logger.logError(
          sbError,
          "%s 'session_close' event occurred for receiver for sessionId '%s'. " +
            "The associated error is",
          this.logPrefix,
          this.sessionId
        );
        // no need to notify the user's error handler since rhea guarantees that session_error
        // will always be emitted before session_close.
      }

      if (receiver && !receiver.isSessionItselfClosed()) {
        logger.verbose(
          "%s 'session_close' event occurred on the receiver for sessionId '%s' " +
            "and the sdk did not initiate this. Hence, let's gracefully close the receiver.",
          this.logPrefix,
          this.sessionId
        );
        try {
          await this.close();
        } catch (err: any) {
          logger.logError(
            err,
            "%s An error occurred while closing the receiver for sessionId '%s'",
            this.logPrefix,
            this.sessionId
          );
        }
      } else {
        logger.verbose(
          "%s 'session_close' event occurred on the receiver for sessionId'%s' " +
            "because the sdk initiated it. Hence no need to gracefully close the receiver",
          this.logPrefix,
          this.sessionId
        );
      }
    };
  }

  /**
   * Closes the underlying AMQP receiver link.
   */
  async close(error?: Error | AmqpError): Promise<void> {
    try {
      this._isReceivingMessagesForSubscriber = false;
      if (this._sessionLockRenewalTimer) clearTimeout(this._sessionLockRenewalTimer);
      logger.verbose(
        "%s Cleared the timers for 'no new message received' task and " +
          "'session lock renewal' task.",
        this.logPrefix
      );

      await super.close();

      this._batchingReceiverLite.terminate(error);
    } catch (err: any) {
      logger.logError(
        err,
        "%s An error occurred while closing the message session with id '%s'",
        this.logPrefix,
        this.sessionId
      );
    }
  }

  /**
   * Determines whether the AMQP receiver link is open. If open then returns true else returns false.
   */
  isOpen(): boolean {
    const result: boolean = this.link! && this.link!.isOpen();
    logger.verbose(
      "%s Receiver for sessionId '%s' is open? -> %s",
      this.logPrefix,
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
   */
  public subscribe(onMessage: OnMessage, onError: OnError, options: SubscribeOptions): void {
    this.receiverHelper.resume();
    this._subscribeImpl(onMessage, onError, options);
  }

  private _subscribeImpl(onMessage: OnMessage, onError: OnError, options: SubscribeOptions): void {
    if (!options) options = {};

    if (options.abortSignal?.aborted) {
      throw new AbortError(StandardAbortMessage);
    }

    this._isReceivingMessagesForSubscriber = true;
    if (typeof options.maxConcurrentCalls === "number" && options.maxConcurrentCalls > 0) {
      this.maxConcurrentCalls = options.maxConcurrentCalls;
    }

    // If explicitly set to false then autoComplete is false else true (default).
    this.autoComplete =
      options.autoCompleteMessages === false ? options.autoCompleteMessages : true;
    this._onMessage = onMessage;
    this._onError = onError;

    if (this.link && this.link.isOpen()) {
      const onSessionMessage = async (context: EventContext): Promise<void> => {
        // If the receiver got closed in PeekLock mode, avoid processing the message as we
        // cannot settle the message.
        if (this.receiveMode === "peekLock" && (!this.link || !this.link.isOpen())) {
          logger.verbose(
            "%s Not calling the user's message handler for the current message " +
              "as the receiver is closed",
            this.logPrefix
          );
          return;
        }

        const bMessage = new ServiceBusMessageImpl(
          context.message!,
          context.delivery!,
          true,
          this.receiveMode,
          this.skipParsingBodyAsJson
        );

        try {
          await this._onMessage(bMessage);
        } catch (err: any) {
          logger.logError(
            err,
            "%s An error occurred while running user's message handler for the message " +
              "with id '%s' on the receiver",
            this.logPrefix,
            bMessage.messageId
          );
          this._onError!({
            error: err,
            errorSource: "processMessageCallback",
            entityPath: this.entityPath,
            fullyQualifiedNamespace: this._context.config.host,
          });

          const error = translateServiceBusError(err);
          // Nothing much to do if user's message handler throws. Let us try abandoning the message.
          if (
            !bMessage.delivery.remote_settled &&
            this.receiveMode === "peekLock" &&
            this.isOpen() // only try to abandon the messages if the connection is still open
          ) {
            try {
              logger.logError(
                error,
                "%s Abandoning the message with id '%s' on the receiver since an error occured",
                this.logPrefix,
                bMessage.messageId
              );
              await abandonMessage(
                bMessage,
                this._context,
                this.entityPath,
                undefined,
                this._retryOptions
              );
            } catch (abandonError: any) {
              const translatedError = translateServiceBusError(abandonError);
              logger.logError(
                translatedError,
                "%s An error occurred while abandoning the message with id '%s' on the " +
                  "receiver",
                this.logPrefix,
                bMessage.messageId,
                translatedError
              );
              this._notifyError({
                error: translatedError,
                errorSource: "abandon",
                entityPath: this.entityPath,
                fullyQualifiedNamespace: this._context.config.host,
              });
            }
          }
          return;
        } finally {
          try {
            this.receiverHelper.addCredit(1);
          } catch (err: any) {
            // this isn't something we expect in normal operation - we'd only get here
            // because of a bug in our code.
            this.processCreditError(err);
          }
        }

        // If we've made it this far, then user's message handler completed fine. Let us try
        // completing the message.
        if (
          this.autoComplete &&
          this.receiveMode === "peekLock" &&
          !bMessage.delivery.remote_settled
        ) {
          try {
            logger.verbose(
              "%s Auto completing the message with id '%s' on the receiver.",
              this.logPrefix,
              bMessage.messageId
            );
            await completeMessage(bMessage, this._context, this.entityPath, this._retryOptions);
          } catch (completeError: any) {
            const translatedError = translateServiceBusError(completeError);
            logger.logError(
              translatedError,
              "%s An error occurred while completing the message with id '%s' on the " + "receiver",
              this.logPrefix,
              bMessage.messageId
            );
            this._notifyError({
              error: translatedError,
              errorSource: "complete",
              entityPath: this.entityPath,
              fullyQualifiedNamespace: this._context.config.host,
            });
          }
        }
      };
      // setting the "message" event listener.
      this.link.on(ReceiverEvents.message, onSessionMessage);

      try {
        this.receiverHelper.addCredit(this.maxConcurrentCalls);
      } catch (err: any) {
        // this isn't something we expect in normal operation - we'd only get here
        // because of a bug in our code.
        this.processCreditError(err);
      }
    } else {
      this._isReceivingMessagesForSubscriber = false;
      const msg =
        `MessageSession with sessionId '${this.sessionId}' and name '${this.name}' ` +
        `has either not been created or is not open.`;
      logger.verbose("[%s] %s", this._context.connectionId, msg);
      this._notifyError({
        error: new Error(msg),
        // This is _probably_ the right error code since we require that
        // the message session is created before we even give back the receiver. So it not
        // being open at this point is either:
        //
        // 1. we didn't acquire the lock
        // 2. the connection was broken (we don't reconnect)
        //
        // If any of these becomes untrue you'll probably want to re-evaluate this classification.
        errorSource: "receive",
        entityPath: this.entityPath,
        fullyQualifiedNamespace: this._context.config.host,
      });
    }
  }

  private processCreditError(err: any): void {
    if (err.name === "AbortError") {
      // if we fail to add credits because the user has asked us to stop
      // then this isn't an error - it's normal.
      return;
    }

    logger.logError(err, "Cannot request messages on the receiver");

    const error = new ServiceBusError("Cannot request messages on the receiver", "SessionLockLost");
    error.retryable = false;

    // from the user's perspective this is a fatal link error and they should retry
    // opening the link.
    this._onError!({
      error,
      errorSource: "processMessageCallback",
      entityPath: this.entityPath,
      fullyQualifiedNamespace: this._context.config.host,
    });
  }

  /**
   * Returns a batch of messages based on given count and timeout over an AMQP receiver link
   * from a Queue/Subscription.
   *
   * @param maxMessageCount - The maximum number of messages to receive from Queue/Subscription.
   * @param maxWaitTimeInMs - The total wait time in milliseconds until which the receiver will attempt to receive specified number of messages.
   * If this time elapses before the `maxMessageCount` is reached, then messages collected till then will be returned to the user.
   * @returns A promise that resolves with an array of Message objects.
   */
  async receiveMessages(
    maxMessageCount: number,
    maxWaitTimeInMs: number,
    maxTimeAfterFirstMessageInMs: number,
    options: OperationOptionsBase
  ): Promise<ServiceBusMessageImpl[]> {
    try {
      return await this._batchingReceiverLite.receiveMessages({
        maxMessageCount,
        maxWaitTimeInMs,
        maxTimeAfterFirstMessageInMs,
        ...options,
      });
    } catch (error: any) {
      logger.logError(error, `${this.logPrefix} Rejecting receiveMessages() with error`);
      throw error;
    }
  }

  /**
   * To be called when connection is disconnected to gracefully close ongoing receive request.
   * @param connectionError - The connection error if any.
   */
  async onDetached(connectionError: AmqpError | Error): Promise<void> {
    logger.error(
      translateServiceBusError(connectionError),
      `${this.logPrefix} onDetached: closing link (session receiver will not reconnect)`
    );
    try {
      // Notifying so that the streaming receiver knows about the error
      this._notifyError({
        entityPath: this.entityPath,
        fullyQualifiedNamespace: this._context.config.host,
        error: translateServiceBusError(connectionError),
        errorSource: "receive",
      });
    } catch (error: any) {
      logger.error(
        translateServiceBusError(error),
        `${
          this.logPrefix
        } onDetached: unexpected error seen when tried calling "_notifyError" with ${translateServiceBusError(
          connectionError
        )}`
      );
    }
    await this.close(connectionError);
  }

  /**
   * Settles the message with the specified disposition.
   * @param message - The ServiceBus Message that needs to be settled.
   * @param operation - The disposition type.
   * @param options - Optional parameters that can be provided while disposing the message.
   */
  async settleMessage(
    message: ServiceBusMessageImpl,
    operation: DispositionType,
    options: DispositionStatusOptions
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (operation.match(/^(complete|abandon|defer|deadletter)$/) == null) {
        return reject(new Error(`operation: '${operation}' is not a valid operation.`));
      }
      const delivery = message.delivery;
      const timer = setTimeout(() => {
        this._deliveryDispositionMap.delete(delivery.id);
        logger.verbose(
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
            "message may or may not be successful",
        };
        return reject(translateServiceBusError(e));
      }, Constants.defaultOperationTimeoutInMs);
      this._deliveryDispositionMap.set(delivery.id, {
        resolve: resolve,
        reject: reject,
        timer: timer,
      });
      if (operation === DispositionType.complete) {
        delivery.accept();
      } else if (operation === DispositionType.abandon) {
        const params: any = {
          undeliverable_here: false,
        };
        if (options.propertiesToModify) params.message_annotations = options.propertiesToModify;
        delivery.modified(params);
      } else if (operation === DispositionType.defer) {
        const params: any = {
          undeliverable_here: true,
        };
        if (options.propertiesToModify) params.message_annotations = options.propertiesToModify;
        delivery.modified(params);
      } else if (operation === DispositionType.deadletter) {
        const error: AmqpError = {
          condition: Constants.deadLetterName,
          info: {
            ...options.propertiesToModify,
            DeadLetterReason: options.deadLetterReason,
            DeadLetterErrorDescription: options.deadLetterDescription,
          },
        };
        delivery.reject(error);
      }
    });
  }

  /**
   * Creates a new instance of the MessageSession based on the provided parameters.
   * @param context - The client entity context
   * @param options - Options that can be provided while creating the MessageSession.
   */
  static async create(
    context: ConnectionContext,
    entityPath: string,
    sessionId: string | undefined,
    options: MessageSessionOptions
  ): Promise<MessageSession> {
    throwErrorIfConnectionClosed(context);
    const messageSession = new MessageSession(context, entityPath, sessionId, options);
    await messageSession._init(options?.abortSignal);
    return messageSession;
  }

  protected removeLinkFromContext(): void {
    delete this._context.messageSessions[this.name];
  }
}
