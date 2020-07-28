// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  MessageReceiver,
  OnAmqpEventAsPromise,
  OnError,
  OnMessage,
  ReceiveOptions,
  ReceiverType
} from "./messageReceiver";

import { ClientEntityContext } from "../clientEntityContext";

import { throwErrorIfConnectionClosed } from "../util/errors";
import {
  RetryOperationType,
  RetryConfig,
  retry,
  MessagingError,
  translate,
  RetryOptions
} from "@azure/core-amqp";
import { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";
import * as log from "../log";
import { AmqpError, EventContext, ReceiverOptions } from "rhea-promise";

/**
 * @internal
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
   * Instantiate a new Streaming receiver for receiving messages with handlers.
   *
   * @constructor
   * @param {ClientEntityContext} context                      The client entity context.
   * @param {ReceiveOptions} [options]                         Options for how you'd like to connect.
   */
  constructor(context: ClientEntityContext, options?: ReceiveOptions) {
    super(context, ReceiverType.streaming, options);

    if (typeof options?.maxConcurrentCalls === "number" && options?.maxConcurrentCalls > 0) {
      this.maxConcurrentCalls = options.maxConcurrentCalls;
    }

    this._retryOptions = options?.retryOptions || {};

    this._onAmqpClose = async (context: EventContext) => {
      const connectionId = this._context.namespace.connectionId;
      const receiverError = context.receiver && context.receiver.error;
      const receiver = this._receiver || context.receiver!;
      if (receiverError) {
        log.error(
          "[%s] 'receiver_close' event occurred for receiver '%s' with address '%s'. " +
            "The associated error is: %O",
          connectionId,
          this.name,
          this.address,
          receiverError
        );
      }
      this._clearAllMessageLockRenewTimers();
      if (receiver && !receiver.isItselfClosed()) {
        if (!this.isConnecting) {
          log.error(
            "[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
              "and the sdk did not initiate this. The receiver is not reconnecting. Hence, calling " +
              "detached from the _onAmqpClose() handler.",
            connectionId,
            this.name,
            this.address
          );
          await this.onDetached(receiverError);
        } else {
          log.error(
            "[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
              "and the sdk did not initate this. Moreover the receiver is already re-connecting. " +
              "Hence not calling detached from the _onAmqpClose() handler.",
            connectionId,
            this.name,
            this.address
          );
        }
      } else {
        log.error(
          "[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
            "because the sdk initiated it. Hence not calling detached from the _onAmqpClose" +
            "() handler.",
          connectionId,
          this.name,
          this.address
        );
      }
    };

    this._onSessionClose = async (context: EventContext) => {
      const connectionId = this._context.namespace.connectionId;
      const receiver = this._receiver || context.receiver!;
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        log.error(
          "[%s] 'session_close' event occurred for receiver '%s' with address '%s'. " +
            "The associated error is: %O",
          connectionId,
          this.name,
          this.address,
          sessionError
        );
      }
      this._clearAllMessageLockRenewTimers();
      if (receiver && !receiver.isSessionItselfClosed()) {
        if (!this.isConnecting) {
          log.error(
            "[%s] 'session_close' event occurred on the session of receiver '%s' with " +
              "address '%s' and the sdk did not initiate this. Hence calling detached from the " +
              "_onSessionClose() handler.",
            connectionId,
            this.name,
            this.address
          );
          await this.onDetached(sessionError);
        } else {
          log.error(
            "[%s] 'session_close' event occurred on the session of receiver '%s' with " +
              "address '%s' and the sdk did not initiate this. Moreover the receiver is already " +
              "re-connecting. Hence not calling detached from the _onSessionClose() handler.",
            connectionId,
            this.name,
            this.address
          );
        }
      } else {
        log.error(
          "[%s] 'session_close' event occurred on the session of receiver '%s' with address " +
            "'%s' because the sdk initiated it. Hence not calling detached from the _onSessionClose" +
            "() handler.",
          connectionId,
          this.name,
          this.address
        );
      }
    };
  }

  /**
   * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session.
   *
   * @param {OnMessage} onMessage The message handler to receive servicebus messages.
   * @param {OnError} onError The error handler to receive an error that occurs while receivin messages.
   */
  receive(onMessage: OnMessage, onError: OnError): void {
    throwErrorIfConnectionClosed(this._context.namespace);

    this._onMessage = onMessage;
    this._onError = onError;

    this.receiverHelper.addCredit(this.maxConcurrentCalls);
  }

  /**
   * Will reconnect the receiver link if necessary.
   * @param receiverError The receiver error or connection error, if any.
   * @param connectionDidDisconnect Whether this method is called as a result of a connection disconnect.
   * @returns {Promise<void>} Promise<void>.
   */
  async onDetached(receiverError?: AmqpError | Error, causedByDisconnect?: boolean): Promise<void> {
    const connectionId = this._context.namespace.connectionId;

    // User explicitly called `close` on the receiver, so link is already closed
    // and we can exit early.
    if (this.wasCloseInitiated) {
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
      log.error(
        `[${connectionId}] Call to detached on streaming receiver '${this.name}' is already in progress.`
      );
      return;
    }

    this._isDetaching = true;
    try {
      // Clears the token renewal timer. Closes the link and its session if they are open.
      // Removes the link and its session if they are present in rhea's cache.
      await this._closeLink(this._receiver);

      if (this.receiverType === ReceiverType.batching) {
        log.error(
          "[%s] Receiver '%s' with address '%s' is a Batching Receiver, so we will not be " +
            "re-establishing the receiver link.",
          connectionId,
          this.name,
          this.address
        );
        return;
      }

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
        log.error(
          "[%s] Encountered a non retryable error on the receiver. Cannot recover receiver '%s' with address '%s' encountered error: %O",
          connectionId,
          this.name,
          this.address,
          translatedError
        );
        return;
      }

      // Non-retryable errors that are caused by disconnect
      // haven't had a chance to show up in the user's error handler.
      // Rethrow the error so the surrounding try/catch forwards it appropriately.
      if (!shouldReopen && causedByDisconnect) {
        log.error(
          "[%s] Encountered a non retryable error on the connection. Cannot recover receiver '%s' with address '%s': %O",
          connectionId,
          this.name,
          this.address,
          translatedError
        );
        throw translatedError;
      }

      // provide a new name to the link while re-connecting it. This ensures that
      // the service does not send an error stating that the link is still open.
      const options: ReceiverOptions = this._createReceiverOptions(true);

      // shall retry forever at an interval of 15 seconds if the error is a retryable error
      // else bail out when the error is not retryable or the operation succeeds.
      const config: RetryConfig<void> = {
        operation: () =>
          this._init(options).then(async () => {
            if (this.wasCloseInitiated) {
              log.error(
                "[%s] close() method of Receiver '%s' with address '%s' was called. " +
                  "by the time the receiver finished getting created. Hence, disallowing messages from being received. ",
                connectionId,
                this.name,
                this.address
              );
              await this.close();
            } else {
              if (this._receiver && this.receiverType === ReceiverType.streaming) {
                this.receiverHelper.addCredit(this.maxConcurrentCalls);
              }
            }
            return;
          }),
        connectionId: connectionId,
        operationType: RetryOperationType.receiverLink,
        retryOptions: this._retryOptions,
        connectionHost: this._context.namespace.config.host
      };
      // Attempt to reconnect. If a non-retryable error is encountered,
      // retry will throw and the error will surface to the user's error handler.
      await retry<void>(config);
    } catch (err) {
      log.error(
        "[%s] An error occurred while processing detached() of Receiver '%s': %O ",
        connectionId,
        this.name,
        this.address,
        err
      );
      if (typeof this._onError === "function") {
        log.error(
          "[%s] Unable to automatically reconnect Receiver '%s' with address '%s'.",
          connectionId,
          this.name,
          this.address
        );
        try {
          this._onError(err);
        } catch (err) {
          log.error(
            "[%s] User-code error in error handler called after disconnect: %O",
            connectionId,
            err
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

  /**
   * Creates a streaming receiver.
   * @static
   *
   * @param {ClientEntityContext} context    The connection context.
   * @param {ReceiveOptions} [options]     Receive options.
   * @return {Promise<StreamingReceiver>} A promise that resolves with an instance of StreamingReceiver.
   */
  static async create(
    context: ClientEntityContext,
    options?: ReceiveOptions &
      Pick<OperationOptionsBase, "abortSignal"> & {
        _createStreamingReceiver?: (
          context: ClientEntityContext,
          options?: ReceiveOptions
        ) => StreamingReceiver;
      }
  ): Promise<StreamingReceiver> {
    throwErrorIfConnectionClosed(context.namespace);
    if (!options) options = {};
    if (options.autoComplete == null) options.autoComplete = true;

    let sReceiver: StreamingReceiver;

    if (options?._createStreamingReceiver) {
      sReceiver = options._createStreamingReceiver(context, options);
    } else {
      sReceiver = new StreamingReceiver(context, options);
    }

    const config: RetryConfig<void> = {
      operation: () => {
        return sReceiver._init(undefined, options?.abortSignal);
      },
      connectionId: context.namespace.connectionId,
      operationType: RetryOperationType.receiveMessage,
      retryOptions: options.retryOptions,
      abortSignal: options?.abortSignal
    };
    await retry<void>(config);
    context.streamingReceiver = sReceiver;
    return sReceiver;
  }
}
