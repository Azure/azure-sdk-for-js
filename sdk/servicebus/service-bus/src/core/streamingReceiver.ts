// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MessageReceiver, OnAmqpEventAsPromise, ReceiveOptions } from "./messageReceiver";
import { ConnectionContext } from "../connectionContext";

import { ReceiverHelper } from "./receiverHelper";

import { throwErrorIfConnectionClosed } from "../util/errors";
import {
  RetryOperationType,
  MessagingError,
  RetryOptions,
  ConditionErrorNameMapper,
} from "@azure/core-amqp";
import { OperationOptionsBase, trace } from "../modelsToBeSharedWithEventHubs";
import { receiverLogger as logger } from "../log";
import { AmqpError, EventContext, OnAmqpEvent } from "rhea-promise";
import { ServiceBusMessageImpl } from "../serviceBusMessage";
import { translateServiceBusError } from "../serviceBusError";
import { abandonMessage, completeMessage, retryForever } from "../receivers/receiverCommon";
import { ReceiverHandlers } from "./shared";
import {
  InternalMessageHandlers,
  InternalProcessErrorArgs,
  MessageHandlers,
  ProcessErrorArgs,
  SubscribeOptions,
} from "../models";
import { createProcessingSpan } from "../diagnostics/instrumentServiceBusMessage";
import { AbortError } from "@azure/abort-controller";

/**
 * @internal
 */
export interface StreamingReceiverInitArgs
  extends ReceiveOptions,
    Pick<OperationOptionsBase, "abortSignal"> {
  messageHandlers: MessageHandlers;
}

/**
 * @internal
 * Describes the streaming receiver where the user can receive the message
 * by providing handler functions.
 */
export class StreamingReceiver extends MessageReceiver {
  /**
   * The maximum number of messages that should be
   * processed concurrently while in streaming mode. Once this limit has been reached, more
   * messages will not be received until the user's message handler has completed processing current message.
   * Default: 1
   */
  maxConcurrentCalls: number = 1;

  /**
   * Indicates whether the receiver is already actively
   * running `onDetached`.
   * This is expected to be true while the receiver attempts
   * to bring its link back up due to a retryable issue.
   */
  private _isDetaching: boolean = false;
  /**
   *Retry policy options that determine the mode, number of retries, retry interval etc.
   */
  private _retryOptions: RetryOptions;

  private _receiverHelper: ReceiverHelper;

  /**
   * The user's message handlers, wrapped so any thrown exceptions are properly logged
   * or forwarded to the user's processError handler.
   */
  private _messageHandlers: () => Required<InternalMessageHandlers> = () => {
    throw new Error("messageHandlers are not set.");
  };

  /**
   * The subscribe(options) passed when the subscribe call originally happened. Stored
   * so _subscribeImpl() can re-use them later if we have to restart our subscription
   * when detach/reattaching.
   */
  private _subscribeOptions: SubscribeOptions | undefined;

  /**
   * Used so we can stub out retry in tests.
   */
  private _retryForeverFn: typeof retryForever = retryForever;

  /**
   * The message handler that will be set as the handler on the
   * underlying rhea receiver for the "receiver_close" event.
   */
  private _onAmqpClose: OnAmqpEventAsPromise;

  /**
   * The message handler that will be set as the handler on
   * the underlying rhea receiver's session for the "session_close" event.
   */
  private _onSessionClose: OnAmqpEventAsPromise;

  /**
   * The message handler that will be set as the handler on
   * the underlying rhea receiver's session for the "session_error" event.
   */
  private _onSessionError: OnAmqpEvent;
  /**
   * The message handler that will be set as the handler on the
   * underlying rhea receiver for the "receiver_error" event.
   */
  private _onAmqpError: OnAmqpEvent;

  /**
   * The message handler that will be set as the handler on the
   * underlying rhea receiver for the "message" event.
   */
  protected _onAmqpMessage: OnAmqpEventAsPromise;

  /**
   * Whether we are currently subscribed (or subscribing) for receiving messages.
   * (this is irrespective of receiver state, etc... - it's just a simple flag to prevent
   * multiple subscribe() calls from happening on this instance)
   */
  public get isSubscribeActive(): boolean {
    return !this._receiverHelper.isSuspended();
  }

  /**
   * Instantiate a new Streaming receiver for receiving messages with handlers.
   *
   * @param connectionContext - The client entity context.
   * @param options - Options for how you'd like to connect.
   */
  constructor(connectionContext: ConnectionContext, entityPath: string, options: ReceiveOptions) {
    super(connectionContext, entityPath, "streaming", options);

    if (typeof options?.maxConcurrentCalls === "number" && options?.maxConcurrentCalls > 0) {
      this.maxConcurrentCalls = options.maxConcurrentCalls;
    }

    this._retryOptions = options?.retryOptions || {};

    this._receiverHelper = new ReceiverHelper(() => ({
      receiver: this.link,
      logPrefix: this.logPrefix,
    }));

    this._onAmqpClose = async (context: EventContext) => {
      const receiverError = context.receiver && context.receiver.error;
      const receiver = this.link || context.receiver!;

      logger.logError(
        receiverError,
        `${this.logPrefix} 'receiver_close' event occurred. The associated error is`
      );

      this._lockRenewer?.stopAll(this);

      if (receiver && !receiver.isItselfClosed()) {
        await this.onDetached(receiverError);
      } else {
        logger.verbose(
          "%s 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
            "because the sdk initiated it. Hence not calling detached from the _onAmqpClose" +
            "() handler.",
          this.logPrefix,
          this.name,
          this.address
        );
      }
    };

    this._onSessionClose = async (context: EventContext) => {
      const receiver = this.link || context.receiver!;
      const sessionError = context.session && context.session.error;

      logger.logError(
        sessionError,
        `${this.logPrefix} 'session_close' event occurred. The associated error is`
      );

      this._lockRenewer?.stopAll(this);

      if (receiver && !receiver.isSessionItselfClosed()) {
        await this.onDetached(sessionError);
      } else {
        logger.verbose(
          "%s 'session_close' event occurred on the session of receiver '%s' with address " +
            "'%s' because the sdk initiated it. Hence not calling detached from the _onSessionClose" +
            "() handler.",
          this.logPrefix,
          this.name,
          this.address
        );
      }
    };

    this._onAmqpError = (context: EventContext) => {
      const receiverError = context.receiver && context.receiver.error;
      if (receiverError) {
        const sbError = translateServiceBusError(receiverError) as MessagingError;
        logger.logError(
          sbError,
          `${this.logPrefix} 'receiver_error' event occurred. The associated error is`
        );
        this._messageHandlers().processError({
          error: sbError,
          errorSource: "receive",
          entityPath: this.entityPath,
          fullyQualifiedNamespace: this._context.config.host,
        });
      }
    };

    this._onSessionError = (context: EventContext) => {
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        const sbError = translateServiceBusError(sessionError) as MessagingError;
        logger.logError(
          sbError,
          `${this.logPrefix} 'session_error' event occurred. The associated error is`
        );
        this._messageHandlers().processError({
          error: sbError,
          errorSource: "receive",
          entityPath: this.entityPath,
          fullyQualifiedNamespace: this._context.config.host,
        });
      }
    };

    this._onAmqpMessage = async (context: EventContext) => {
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

      const bMessage: ServiceBusMessageImpl = new ServiceBusMessageImpl(
        context.message!,
        context.delivery!,
        true,
        this.receiveMode,
        options.skipParsingBodyAsJson ?? false
      );

      this._lockRenewer?.start(this, bMessage, (err) => {
        this._messageHandlers().processError({
          error: err,
          errorSource: "renewLock",
          entityPath: this.entityPath,
          fullyQualifiedNamespace: this._context.config.host,
        });
      });

      try {
        await this._messageHandlers().processMessage(bMessage);
      } catch (err) {
        logger.logError(
          err,
          "%s An error occurred while running user's message handler for the message " +
            "with id '%s' on the receiver '%s'",
          this.logPrefix,
          bMessage.messageId,
          this.name
        );

        // Do not want renewLock to happen unnecessarily, while abandoning the message. Hence,
        // doing this here. Otherwise, this should be done in finally.
        this._lockRenewer?.stop(this, bMessage);
        const error = translateServiceBusError(err) as MessagingError;
        // Nothing much to do if user's message handler throws. Let us try abandoning the message.
        if (
          !bMessage.delivery.remote_settled &&
          error.code !== ConditionErrorNameMapper["com.microsoft:message-lock-lost"] &&
          this.receiveMode === "peekLock" &&
          this.isOpen() // only try to abandon the messages if the connection is still open
        ) {
          try {
            logger.logError(
              error,
              "%s Abandoning the message with id '%s' on the receiver '%s' since " +
                "an error occured: %O.",
              this.logPrefix,
              bMessage.messageId,
              this.name,
              error
            );
            await abandonMessage(
              bMessage,
              this._context,
              entityPath,
              undefined,
              this._retryOptions
            );
          } catch (abandonError) {
            const translatedError = translateServiceBusError(abandonError);
            logger.logError(
              translatedError,
              "%s An error occurred while abandoning the message with id '%s' on the " +
                "receiver '%s'",
              this.logPrefix,
              bMessage.messageId,
              this.name
            );
            this._messageHandlers().processError({
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
          this._receiverHelper.addCredit(1);
        } catch (err) {
          // if we're aborting out of the receive operation we don't need to report it (the user already
          // knows the link is being torn down or stopped)
          if (err.name !== "AbortError") {
            logger.logError(
              err,
              `[${this.logPrefix}] Failed to add credit after receiving message`
            );
            await this._reportInternalError(err);
          }
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
            "%s Auto completing the message with id '%s' on " + "the receiver.",
            this.logPrefix,
            bMessage.messageId
          );
          await completeMessage(bMessage, this._context, entityPath, this._retryOptions);
        } catch (completeError) {
          const translatedError = translateServiceBusError(completeError);
          logger.logError(
            translatedError,
            "%s An error occurred while completing the message with id '%s' on the " +
              "receiver '%s'",
            this.logPrefix,
            bMessage.messageId,
            this.name
          );
          this._messageHandlers().processError({
            error: translatedError,
            errorSource: "complete",
            entityPath: this.entityPath,
            fullyQualifiedNamespace: this._context.config.host,
          });
        }
      }
    };
  }

  private _reportInternalError(error: Error): Promise<void> {
    const messageHandlers = this._messageHandlers();

    if (messageHandlers.forwardInternalErrors) {
      const errorArgs: InternalProcessErrorArgs = {
        error,
        entityPath: this.entityPath,
        errorSource: "internal",
        fullyQualifiedNamespace: this._context.config.host,
      };

      return messageHandlers.processError(errorArgs as ProcessErrorArgs);
    }

    return Promise.resolve();
  }

  private _getHandlers(): ReceiverHandlers {
    return {
      onMessage: (context: EventContext) =>
        this._onAmqpMessage(context).catch((err) => this._reportInternalError(err)),
      onClose: (context: EventContext) =>
        this._onAmqpClose(context).catch((err) => this._reportInternalError(err)),
      onSessionClose: (context: EventContext) =>
        this._onSessionClose(context).catch((err) => this._reportInternalError(err)),
      onError: this._onAmqpError,
      onSessionError: this._onSessionError,
    };
  }

  async stopReceivingMessages(): Promise<void> {
    await this._receiverHelper.suspend();

    if (this._subscribeCallPromise) {
      await this._subscribeCallPromise;
    }
  }

  async close(): Promise<void> {
    await this._receiverHelper.suspend();
    return super.close();
  }

  private _subscribeCallPromise: Promise<void> | undefined;

  /**
   * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session.
   *
   * Any errors thrown by this function will also be sent to the messageHandlers.processError function
   * _and_ thrown, ultimately from this method.
   *
   * NOTE: This function retries _infinitely_ until success! It is completely up to the user to break
   * out of this retry cycle otherwise by:
   * 1. closing the receiver
   * 2. Calling `close` on the subscription instance they received when they initially called subscribe().
   * 3. aborting the abortSignal they passed in when calling subscribe (this also applies to initialization calls in onDetach)
   *
   * @param onMessage - The message handler to receive servicebus messages.
   * @param onError - The error handler to receive an error that occurs while receivin messages.
   */
  async subscribe(
    messageHandlers: InternalMessageHandlers,
    subscribeOptions: SubscribeOptions | undefined
  ): Promise<void> {
    // these options and message handlers will be re-used if/when onDetach is called.
    this._subscribeOptions = subscribeOptions;
    this._setMessageHandlers(messageHandlers, subscribeOptions);

    let promiseResolve: (() => void) | undefined;
    this._subscribeCallPromise = new Promise((resolve) => {
      promiseResolve = resolve;
    });

    try {
      this._receiverHelper.resume();
      return await this._subscribeImpl("subscribe");
    } catch (err) {
      // callers aren't going to be in a good position to forward this error properly
      // so we do it here.
      await this._messageHandlers().processError({
        entityPath: this.entityPath,
        fullyQualifiedNamespace: this._context.config.host,
        errorSource: "receive",
        error: err,
      });

      throw err;
    } finally {
      promiseResolve?.();
      this._subscribeCallPromise = undefined;
    }
  }

  /**
   * Wraps the individual message handlers with tracing and proper error handling
   * and assigns them to `this._messageHandlers`
   *
   * @param userHandlers - The user's message handlers
   * @param operationOptions - The subscribe(options)
   */
  private _setMessageHandlers(
    userHandlers: InternalMessageHandlers,
    operationOptions: OperationOptionsBase | undefined
  ): void {
    const messageHandlers = {
      processError: async (args: ProcessErrorArgs) => {
        try {
          args.error = translateServiceBusError(args.error);
          await userHandlers.processError(args);
        } catch (err) {
          await this._reportInternalError(err);
          logger.logError(err, `An error was thrown from the user's processError handler`);
        }
      },
      processMessage: async (message: ServiceBusMessageImpl) => {
        try {
          const span = createProcessingSpan(message, this, this._context.config, operationOptions);
          return await trace(() => userHandlers.processMessage(message), span);
        } catch (err) {
          this._messageHandlers().processError({
            error: err,
            errorSource: "processMessageCallback",
            entityPath: this.entityPath,
            fullyQualifiedNamespace: this._context.config.host,
          });
          throw err;
        }
      },
      postInitialize: async () => {
        if (!userHandlers.postInitialize) {
          return;
        }

        return userHandlers.postInitialize().catch((err) =>
          this._messageHandlers().processError({
            error: err,
            errorSource: "processMessageCallback",
            entityPath: this.entityPath,
            fullyQualifiedNamespace: this._context.config.host,
          })
        );
      },
      preInitialize: async () => {
        if (!userHandlers.preInitialize) {
          return;
        }

        return userHandlers.preInitialize().catch((err) =>
          this._messageHandlers().processError({
            error: err,
            errorSource: "processMessageCallback",
            entityPath: this.entityPath,
            fullyQualifiedNamespace: this._context.config.host,
          })
        );
      },
      forwardInternalErrors: userHandlers.forwardInternalErrors ?? false,
    };

    this._messageHandlers = () => messageHandlers;
  }

  /**
   * Subscribes using the already assigned `this._messageHandlers` and `this._subscribeOptions`
   *
   * @returns A promise that will resolve when a link is created and we successfully add credits to it.
   */
  private async _subscribeImpl(caller: "detach" | "subscribe"): Promise<void> {
    try {
      // we don't expect to ever get an error from retryForever but bugs
      // do happen.
      return await this._retryForeverFn({
        retryConfig: {
          connectionId: this._context.connection.id,
          operationType: RetryOperationType.receiverLink,
          abortSignal: this._subscribeOptions?.abortSignal,
          retryOptions: this._retryOptions,
          operation: () => this._initAndAddCreditOperation(caller),
        },
        onError: (err) =>
          this._messageHandlers().processError({
            error: err,
            errorSource: "receive",
            entityPath: this.entityPath,
            fullyQualifiedNamespace: this._context.config.host,
          }),
        logPrefix: this.logPrefix,
        logger,
      });
    } catch (err) {
      try {
        await this._receiverHelper.suspend();
      } catch (error) {
        logger.logError(error, `${this.logPrefix} receiver.suspend threw an error`);
      }

      throw err;
    }
  }

  /**
   * Initializes the link and adds credits. If any of these operations fail any created link will
   * be closed.
   *
   * @param caller - The caller which dictates whether or not we create a new name for our created link.
   * @param catchAndReportError - A function and reports an error but does not throw it.
   */
  private async _initAndAddCreditOperation(caller: "detach" | "subscribe"): Promise<void> {
    if (this._receiverHelper.isSuspended()) {
      // user has suspended us while we were initializing
      // the connection. Abort this attempt - if they attempt
      // resubscribe we'll just reinitialize.
      // This checks should happen before throwErrorIfConnectionClosed(); otherwise
      // we won't be able to break out of the retry-for-ever loops when user suspend us.
      throw new AbortError("Receiver was suspended during initialization.");
    }

    throwErrorIfConnectionClosed(this._context);

    await this._messageHandlers().preInitialize();

    if (this._receiverHelper.isSuspended()) {
      // Need to check again as user can suspend us in preInitialize()
      throw new AbortError("Receiver was suspended during initialization.");
    }
    await this._init(
      this._createReceiverOptions(caller === "detach", this._getHandlers()),
      this._subscribeOptions?.abortSignal
    );

    try {
      await this._messageHandlers().postInitialize();
      this._receiverHelper.addCredit(this.maxConcurrentCalls);
    } catch (err) {
      try {
        await this.closeLink();
      } catch (error) {
        await this._messageHandlers().processError({
          error,
          errorSource: "receive",
          entityPath: this.entityPath,
          fullyQualifiedNamespace: this._context.config.host,
        });
      }
      throw err;
    }
  }

  /**
   * Will reconnect the receiver link if necessary.
   * @param receiverError - The receiver error or connection error, if any.
   */
  async onDetached(receiverError?: AmqpError | Error): Promise<void> {
    try {
      logger.verbose(`${this.logPrefix} onDetached: reinitializing link.`);

      // User explicitly called `close` on the receiver, so link is already closed
      // and we can exit early.
      if (this.wasClosedPermanently) {
        logger.verbose(
          `${this.logPrefix} onDetached: link has been closed permanently, not reinitializing. `
        );
        return;
      }

      // Prevent multiple onDetached invocations from running concurrently.
      if (this._isDetaching) {
        // This can happen when the network connection goes down for some amount of time.
        // The first connection `disconnect` will trigger `onDetached` and attempt to retry
        // creating the connection/receiver link.
        // While those retry attempts fail (until the network connection comes back up),
        // we'll continue to see connection `disconnect` errors.
        // These should be ignored until the already running `onDetached` completes
        // its retry attempts or errors.
        logger.verbose(
          `${this.logPrefix} onDetached: Call to detached on streaming receiver '${this.name}' is already in progress.`
        );
        return;
      }

      this._isDetaching = true;

      const translatedError = receiverError
        ? translateServiceBusError(receiverError)
        : receiverError;
      logger.logError(
        translatedError,
        `${this.logPrefix} onDetached: Reinitializing receiver because of error`
      );

      // Clears the token renewal timer. Closes the link and its session if they are open.
      // Removes the link and its session if they are present in rhea's cache.
      await this.closeLink();
    } catch (err) {
      logger.verbose(
        `${this.logPrefix} onDetached: Encountered an error when closing the previous link: `,
        err
      );
    }

    try {
      await this._subscribeImpl("detach");
    } finally {
      this._isDetaching = false;
    }
  }

  protected removeLinkFromContext(): void {
    delete this._context.messageReceivers[this.name];
  }
}
