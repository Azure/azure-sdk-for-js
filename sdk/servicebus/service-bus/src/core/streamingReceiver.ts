// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  MessageReceiver,
  OnAmqpEventAsPromise,
  OnError,
  OnMessage,
  ReceiveOptions
} from "./messageReceiver";
import { ConnectionContext } from "../connectionContext";

import { ReceiverHelper } from "./receiverHelper";

import { throwErrorIfConnectionClosed } from "../util/errors";
import {
  RetryOperationType,
  RetryConfig,
  retry,
  MessagingError,
  RetryOptions,
  ConditionErrorNameMapper
} from "@azure/core-amqp";
import { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";
import { receiverLogger as logger } from "../log";
import { AmqpError, EventContext, OnAmqpEvent } from "rhea-promise";
import { ServiceBusMessageImpl } from "../serviceBusMessage";
import { AbortSignalLike } from "@azure/abort-controller";
import { translateServiceBusError } from "../serviceBusError";
import { abandonMessage, completeMessage } from "../receivers/shared";
import { ReceiverHandlers } from "./shared";

/**
 * @internal
 */
export interface StreamingReceiverInitArgs
  extends ReceiveOptions,
    Pick<OperationOptionsBase, "abortSignal"> {
  onError: OnError;
}

/**
 * @internal
 * Describes the streaming receiver where the user can receive the message
 * by providing handler functions.
 * @class StreamingReceiver
 * @extends MessageReceiver
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
   * Used so we can stub out retry in tests.
   */
  private _retry: typeof retry;

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
   * Whether we are currently registered for receiving messages.
   */
  public get isReceivingMessages(): boolean {
    // for the streaming receiver so long as we can receive messages then we
    // _are_ receiving messages - there's no in-between state like there is
    // with BatchingReceiver.
    return this._receiverHelper.canReceiveMessages();
  }

  /**
   * Instantiate a new Streaming receiver for receiving messages with handlers.
   *
   * @constructor
   * @param context                      The client entity context.
   * @param [options]                         Options for how you'd like to connect.
   */
  constructor(context: ConnectionContext, entityPath: string, options: ReceiveOptions) {
    super(context, entityPath, "streaming", options);

    if (typeof options?.maxConcurrentCalls === "number" && options?.maxConcurrentCalls > 0) {
      this.maxConcurrentCalls = options.maxConcurrentCalls;
    }

    this._retryOptions = options?.retryOptions || {};
    this._retry = retry;

    this._receiverHelper = new ReceiverHelper(() => ({
      receiver: this.link,
      logPrefix: this.logPrefix
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
        this.receiveMode
      );

      this._lockRenewer?.start(this, bMessage, (err) => {
        if (this._onError) {
          this._onError({
            error: err,
            errorSource: "renewLock",
            entityPath: this.entityPath,
            fullyQualifiedNamespace: this._context.config.host
          });
        }
      });

      try {
        await this._onMessage(bMessage);
      } catch (err) {
        logger.logError(
          err,
          "%s An error occurred while running user's message handler for the message " +
            "with id '%s' on the receiver '%s'",
          this.logPrefix,
          bMessage.messageId,
          this.name
        );
        this._onError!({
          error: err,
          errorSource: "processMessageCallback",
          entityPath: this.entityPath,
          fullyQualifiedNamespace: this._context.config.host
        });

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
            await abandonMessage(bMessage, this._context, entityPath);
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
            this._onError!({
              error: translatedError,
              errorSource: "abandon",
              entityPath: this.entityPath,
              fullyQualifiedNamespace: this._context.config.host
            });
          }
        }
        return;
      } finally {
        this._receiverHelper.addCredit(1);
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
          await completeMessage(bMessage, this._context, entityPath);
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
          this._onError!({
            error: translatedError,
            errorSource: "complete",
            entityPath: this.entityPath,
            fullyQualifiedNamespace: this._context.config.host
          });
        }
      }
    };
  }

  private _getHandlers(): ReceiverHandlers {
    return {
      onMessage: (context: EventContext) =>
        this._onAmqpMessage(context).catch(() => {
          /* */
        }),
      onClose: (context: EventContext) =>
        this._onAmqpClose(context).catch(() => {
          /* */
        }),
      onSessionClose: (context: EventContext) =>
        this._onSessionClose(context).catch(() => {
          /* */
        }),
      onError: this._onAmqpError,
      onSessionError: this._onSessionError
    };
  }

  async stopReceivingMessages(): Promise<void> {
    await this._receiverHelper.suspend();
  }

  /**
   * Initializes the link. This method will retry infinitely until a connection is established.
   *
   * The retries are broken up into cycles. For each cycle we do a set of retries, using the user's
   * configured retryOptions. If that retry call fails we will report the error and then go into a
   * new cycle, repeating the retries the same as before.
   *
   * It is completely up to the user to break out of this retry cycle in their error handler by either:
   * 1. closing the receiver
   * 2. Calling `close` on the subscription instance they received when they initially called subscribe().
   * 3. aborting the abortSignal they passed in when calling subscribe (this does not apply in onDetached, however)
   */
  async init(
    args: { useNewName: boolean; connectionId: string; onError: OnError } & Pick<
      OperationOptionsBase,
      "abortSignal"
    >
  ) {
    let numRetryCycles = 0;

    while (true) {
      ++numRetryCycles;

      const config: RetryConfig<void> = {
        operation: () => this._initOnce(args),
        connectionId: args.connectionId,
        operationType: RetryOperationType.receiverLink,
        // even though we're going to loop infinitely we allow them to control the pattern we use on each
        // retry run. This lets them toggle things like exponential retries, etc..
        retryOptions: this._retryOptions,
        abortSignal: args.abortSignal
      };

      try {
        await this._retry<void>(config);
        break;
      } catch (err) {
        // we only report the error here - this avoids spamming the user with too many
        // redundant reports of errors while still providing them incremental status on failures.
        args.onError({
          errorSource: "receive",
          entityPath: this.entityPath,
          fullyQualifiedNamespace: this._context.config.host,
          error: err
        });

        // if the user aborts the operation we're immediately done.
        if (err.name === "AbortError") {
          throw err;
        }

        logger.logError(
          err,
          `${this.logPrefix} Error thrown in retry cycle ${numRetryCycles}, restarting retry cycle with retry options`,
          this._retryOptions
        );

        continue;
      }
    }
  }

  private async _initOnce(args: {
    useNewName: boolean;
    abortSignal?: AbortSignalLike;
  }): Promise<void> {
    const options = this._createReceiverOptions(args.useNewName, this._getHandlers());
    await this._init(options, args.abortSignal);

    // this might seem odd but in reality this entire class is like one big function call that
    // results in a receive(). Once we're being initialized we should consider ourselves the
    // "owner" of the receiver and that it's now being locked into being the actual receiver.
    this._receiverHelper.resume();
  }

  /**
   * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session.
   *
   * @param onMessage The message handler to receive servicebus messages.
   * @param onError The error handler to receive an error that occurs while receivin messages.
   */
  subscribe(onMessage: OnMessage, onError: OnError): void {
    throwErrorIfConnectionClosed(this._context);

    this._onMessage = onMessage;
    this._onError = onError;

    this._receiverHelper.addCredit(this.maxConcurrentCalls);
  }

  /**
   * Will reconnect the receiver link if necessary.
   * @param receiverError - The receiver error or connection error, if any.
   * @returns {Promise<void>} Promise<void>.
   */
  async onDetached(receiverError?: AmqpError | Error): Promise<void> {
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

    const translatedError = receiverError ? translateServiceBusError(receiverError) : receiverError;
    logger.logError(
      translatedError,
      `${this.logPrefix} onDetached: Reinitializing receiver because of error`
    );

    try {
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
      await this.init({
        // provide a new name to the link while re-connecting it. This ensures that
        // the service does not send an error stating that the link is still open.
        useNewName: true,
        connectionId: this._context.connectionId,
        onError: (args) => this._onError && this._onError(args)
      });

      this._receiverHelper.addCredit(this.maxConcurrentCalls);
      logger.verbose(
        `${this.logPrefix} onDetached: link has been reestablished, added ${this.maxConcurrentCalls} credits.`
      );
    } finally {
      this._isDetaching = false;
    }
  }
}
