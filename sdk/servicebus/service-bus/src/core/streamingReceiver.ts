// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  MessageReceiver,
  OnAmqpEventAsPromise,
  OnError,
  OnMessage,
  ReceiveOptions,
  ReceiverHandlers
} from "./messageReceiver";
import { ConnectionContext } from "../connectionContext";

import { ReceiverHelper } from "./receiverHelper";

import { throwErrorIfConnectionClosed } from "../util/errors";
import {
  RetryOperationType,
  RetryConfig,
  retry,
  MessagingError,
  translate,
  RetryOptions,
  ConditionErrorNameMapper
} from "@azure/core-amqp";
import { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";
import { receiverLogger as logger } from "../log";
import { AmqpError, EventContext, isAmqpError, OnAmqpEvent } from "rhea-promise";
import { ServiceBusMessageImpl } from "../serviceBusMessage";
import { AbortSignalLike } from "@azure/abort-controller";

/**
 * @internal
 * @ignore
 */
export interface CreateStreamingReceiverOptions
  extends ReceiveOptions,
    Pick<OperationOptionsBase, "abortSignal"> {
  /**
   * Used for mocking/stubbing in tests.
   */
  _createStreamingReceiverStubForTests?: (
    context: ConnectionContext,
    options?: ReceiveOptions
  ) => StreamingReceiver;
  cachedStreamingReceiver?: StreamingReceiver;
}

/**
 * @internal
 * @ignore
 * Describes the streaming receiver where the user can receive the message
 * by providing handler functions.
 * @class StreamingReceiver
 * @extends MessageReceiver
 */
export class StreamingReceiver extends MessageReceiver {
  /**
   * @property {number} [maxConcurrentCalls] The maximum number of messages that should be
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
   * @property {OnAmqpEventAsPromise} _onAmqpClose The message handler that will be set as the handler on the
   * underlying rhea receiver for the "receiver_close" event.
   */
  private _onAmqpClose: OnAmqpEventAsPromise;

  /**
   * @property {OnAmqpEventAsPromise} _onSessionClose The message handler that will be set as the handler on
   * the underlying rhea receiver's session for the "session_close" event.
   */
  private _onSessionClose: OnAmqpEventAsPromise;

  /**
   * @property {OnAmqpEvent} _onSessionError The message handler that will be set as the handler on
   * the underlying rhea receiver's session for the "session_error" event.
   */
  private _onSessionError: OnAmqpEvent;
  /**
   * @property {OnAmqpEvent} _onAmqpError The message handler that will be set as the handler on the
   * underlying rhea receiver for the "receiver_error" event.
   */
  private _onAmqpError: OnAmqpEvent;

  /**
   * @property {OnAmqpEventAsPromise} _onAmqpMessage The message handler that will be set as the handler on the
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
   * @param {ClientEntityContext} context                      The client entity context.
   * @param {ReceiveOptions} [options]                         Options for how you'd like to connect.
   */
  constructor(context: ConnectionContext, entityPath: string, options: ReceiveOptions) {
    super(context, entityPath, "streaming", options);

    if (typeof options?.maxConcurrentCalls === "number" && options?.maxConcurrentCalls > 0) {
      this.maxConcurrentCalls = options.maxConcurrentCalls;
    }

    this._retryOptions = options?.retryOptions || {};
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
      const receiver = this.link || context.receiver!;
      const receiverError = context.receiver && context.receiver.error;
      if (receiverError) {
        const sbError = translate(receiverError) as MessagingError;
        logger.logError(sbError, `${this.logPrefix} An error occurred for Receiver`);
        if (!sbError.retryable) {
          if (receiver && !receiver.isItselfClosed()) {
            logger.verbose(
              "%s Since the user did not close the receiver and the error is not " +
                "retryable, we let the user know about it by calling the user's error handler.",
              this.logPrefix
            );
            this._onError!(sbError);
          } else {
            logger.verbose(
              "%s The received error is not retryable. However, the receiver was " +
                "closed by the user. Hence not notifying the user's error handler.",
              this.logPrefix
            );
          }
        } else {
          logger.verbose(
            "%s Since received error is retryable, we will NOT notify the user's " +
              "error handler.",
            this.logPrefix
          );
        }
      }
    };

    this._onSessionError = (context: EventContext) => {
      const receiver = this.link || context.receiver!;
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        const sbError = translate(sessionError) as MessagingError;
        logger.logError(
          sbError,
          "%s An error occurred on the session for Receiver '%s'",
          this.logPrefix,
          this.name
        );
        if (receiver && !receiver.isSessionItselfClosed() && !sbError.retryable) {
          logger.verbose(
            "%s Since the user did not close the receiver and the session error is not " +
              "retryable, we let the user know about it by calling the user's error handler.",
            this.logPrefix
          );
          this._onError!(sbError);
        }
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
        this._context,
        this.entityPath,
        context.message!,
        context.delivery!,
        true,
        this.receiveMode
      );

      this._lockRenewer?.start(this, bMessage, (err) => {
        if (this._onError) {
          this._onError(err);
        }
      });

      try {
        await this._onMessage(bMessage);
      } catch (err) {
        // This ensures we call users' error handler when users' message handler throws.
        if (!isAmqpError(err)) {
          logger.logError(
            err,
            "%s An error occurred while running user's message handler for the message " +
              "with id '%s' on the receiver '%s'",
            this.logPrefix,
            bMessage.messageId,
            this.name
          );
          this._onError!(err);
        }

        // Do not want renewLock to happen unnecessarily, while abandoning the message. Hence,
        // doing this here. Otherwise, this should be done in finally.
        this._lockRenewer?.stop(this, bMessage);
        const error = translate(err) as MessagingError;
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
            await bMessage.abandon();
          } catch (abandonError) {
            const translatedError = translate(abandonError);
            logger.logError(
              translatedError,
              "%s An error occurred while abandoning the message with id '%s' on the " +
                "receiver '%s'",
              this.logPrefix,
              bMessage.messageId,
              this.name
            );
            this._onError!(translatedError);
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
          await bMessage.complete();
        } catch (completeError) {
          const translatedError = translate(completeError);
          logger.logError(
            translatedError,
            "%s An error occurred while completing the message with id '%s' on the " +
              "receiver '%s'",
            this.logPrefix,
            bMessage.messageId,
            this.name
          );
          this._onError!(translatedError);
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

  async init(useNewName: boolean, abortSignal?: AbortSignalLike): Promise<void> {
    const options = this._createReceiverOptions(useNewName, this._getHandlers());
    await this._init(options, abortSignal);

    // this might seem odd but in reality this entire class is like one big function call that
    // results in a receive(). Once we're being initialized we should consider ourselves the
    // "owner" of the receiver and that it's now being locked into being the actual receiver.
    this._receiverHelper.resume();
  }

  /**
   * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session.
   *
   * @param {OnMessage} onMessage The message handler to receive servicebus messages.
   * @param {OnError} onError The error handler to receive an error that occurs while receivin messages.
   */
  subscribe(onMessage: OnMessage, onError: OnError): void {
    throwErrorIfConnectionClosed(this._context);

    this._onMessage = onMessage;
    this._onError = onError;

    this._receiverHelper.addCredit(this.maxConcurrentCalls);
  }

  /**
   * Will reconnect the receiver link if necessary.
   * @param receiverError The receiver error or connection error, if any.
   * @param connectionDidDisconnect Whether this method is called as a result of a connection disconnect.
   * @returns {Promise<void>} Promise<void>.
   */
  async onDetached(receiverError?: AmqpError | Error, causedByDisconnect?: boolean): Promise<void> {
    logger.verbose(`${this.logPrefix} Detaching.`);

    const connectionId = this._context.connectionId;

    // User explicitly called `close` on the receiver, so link is already closed
    // and we can exit early.
    if (this.wasClosedPermanently) {
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
        `${this.logPrefix} Call to detached on streaming receiver '${this.name}' is already in progress.`
      );
      return;
    }

    this._isDetaching = true;

    try {
      // Clears the token renewal timer. Closes the link and its session if they are open.
      // Removes the link and its session if they are present in rhea's cache.
      await this.closeLink();

      const translatedError = receiverError ? translate(receiverError) : receiverError;

      // Track-1
      //   - We should only attempt to reopen if either no error was present,
      //     or the error is considered retryable.
      // Track-2
      //  Reopen
      //   - If no error was present
      //   - If the error is a MessagingError and is considered retryable
      //   - Any non MessagingError because such errors do not get
      //     translated by `@azure/core-amqp` to a MessagingError
      //   - More details here - https://github.com/Azure/azure-sdk-for-js/pull/8580#discussion_r417087030
      const shouldReopen =
        translatedError instanceof MessagingError ? translatedError.retryable : true;

      // Non-retryable errors that aren't caused by disconnect
      // will have already been forwarded to the user's error handler.
      // Swallow the error and return quickly.
      if (!shouldReopen && !causedByDisconnect) {
        logger.logError(
          translatedError,
          "%s Encountered a non retryable error on the receiver. Cannot recover receiver. encountered error",
          this.logPrefix,
          this.name,
          this.address
        );
        return;
      }

      // Non-retryable errors that are caused by disconnect
      // haven't had a chance to show up in the user's error handler.
      // Rethrow the error so the surrounding try/catch forwards it appropriately.
      if (!shouldReopen && causedByDisconnect) {
        logger.logError(
          translatedError,
          "%s Encountered a non retryable error on the connection. Cannot recover receiver.",
          this.logPrefix,
          this.name,
          this.address
        );
        throw translatedError;
      }

      // shall retry forever at an interval of 15 seconds if the error is a retryable error
      // else bail out when the error is not retryable or the operation succeeds.
      const config: RetryConfig<void> = {
        operation: () =>
          this.init(
            // provide a new name to the link while re-connecting it. This ensures that
            // the service does not send an error stating that the link is still open.
            true
          ).then(() => {
            this._receiverHelper.addCredit(this.maxConcurrentCalls);
            return;
          }),
        connectionId: connectionId,
        operationType: RetryOperationType.receiverLink,
        retryOptions: this._retryOptions,
        connectionHost: this._context.config.host
      };
      // Attempt to reconnect. If a non-retryable error is encountered,
      // retry will throw and the error will surface to the user's error handler.
      await retry<void>(config);
    } catch (err) {
      logger.logError(
        err,
        "%s An error occurred while processing detached()",
        this.logPrefix,
        this.name,
        this.address
      );
      if (typeof this._onError === "function") {
        logger.verbose(`${this.logPrefix} Unable to automatically reconnect`);
        try {
          this._onError(err);
        } catch (err) {
          logger.logError(
            err,
            `${this.logPrefix} User-code error in error handler called after disconnect`
          );
        } finally {
          // Once the user's error handler has been called,
          // close the receiver to prevent future messages/errors from being received.
          // Swallow errors from the close rather than forwarding to user's error handler
          // to prevent a never ending loop.
          await this.close().catch(() => {});
        }
      }
    } finally {
      this._isDetaching = false;
    }
  }

  static async create(
    context: ConnectionContext,
    entityPath: string,
    options: CreateStreamingReceiverOptions
  ): Promise<StreamingReceiver> {
    throwErrorIfConnectionClosed(context);
    if (options.autoComplete == null) options.autoComplete = true;

    let sReceiver: StreamingReceiver;

    if (options.cachedStreamingReceiver) {
      sReceiver = options.cachedStreamingReceiver;
    } else if (options?._createStreamingReceiverStubForTests) {
      sReceiver = options._createStreamingReceiverStubForTests(context, options);
    } else {
      sReceiver = new StreamingReceiver(context, entityPath, options);
    }

    const config: RetryConfig<void> = {
      operation: () => {
        return sReceiver.init(false, options?.abortSignal);
      },
      connectionId: context.connectionId,
      operationType: RetryOperationType.receiveMessage,
      retryOptions: options.retryOptions,
      abortSignal: options?.abortSignal
    };
    await retry<void>(config);
    context.messageReceivers[sReceiver.name] = sReceiver;
    return sReceiver;
  }
}
