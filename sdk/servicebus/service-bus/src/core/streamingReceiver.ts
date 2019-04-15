// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  MessageReceiver,
  ReceiveOptions,
  OnMessage,
  OnError,
  ReceiverType
} from "./messageReceiver";

import { ClientEntityContext } from "../clientEntityContext";

import * as log from "../log";
import { throwErrorIfConnectionClosed } from "../util/errors";

/**
 * Describes the options to control receiving of messages in streaming mode.
 */
export interface MessageHandlerOptions {
  /**
   * @property {boolean} [autoComplete] Indicates whether the message (if not settled by the user)
   * should be automatically completed after the user provided onMessage handler has been executed.
   * Completing a message, removes it from the Queue/Subscription.
   * - **Default**: `true`.
   */
  autoComplete?: boolean;
  /**
   * @property {number} [maxMessageAutoRenewLockDurationInSeconds] The maximum duration in seconds until which
   * the lock on the message will be renewed automatically before the message is settled.
   * - **Default**: `300` seconds (5 minutes).
   * - **To disable autolock renewal**, set `maxMessageAutoRenewLockDurationInSeconds` to `0`.
   */
  maxMessageAutoRenewLockDurationInSeconds?: number;
  /**
   * @property {number} [newMessageWaitTimeoutInSeconds] The maximum amount of time the receiver
   * will wait to receive a new message. If no new message is received in this time, then the
   * receiver will be closed.
   *
   * Caution: When setting this value, take into account the time taken to process messages. Once
   * the receiver is closed, operations like complete()/abandon()/defer()/deadletter() cannot be
   * invoked on messages.
   *
   * If this option is not provided, then receiver link will stay open until manually closed.
   */
  newMessageWaitTimeoutInSeconds?: number;
  /**
   * @property {number} [maxConcurrentCalls] The maximum number of concurrent calls that the library
   * can make to the user's message handler. Once this limit has been reached, more messages will
   * not be received until atleast one of the calls to the user's message handler has completed.
   * - **Default**: `1`.
   */
  maxConcurrentCalls?: number;
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
   * Instantiate a new Streaming receiver for receiving messages with handlers.
   *
   * @constructor
   * @param {ClientEntityContext} context                      The client entity context.
   * @param {ReceiveOptions} [options]                         Options for how you'd like to connect.
   */
  constructor(context: ClientEntityContext, options?: ReceiveOptions) {
    super(context, ReceiverType.streaming, options);

    this.resetTimerOnNewMessageReceived = () => {
      if (this._newMessageReceivedTimer) clearTimeout(this._newMessageReceivedTimer);
      if (this.newMessageWaitTimeoutInSeconds) {
        this._newMessageReceivedTimer = setTimeout(async () => {
          const msg =
            `StreamingReceiver '${this.name}' did not receive any messages in ` +
            `the last ${this.newMessageWaitTimeoutInSeconds} seconds. ` +
            `Hence ending this receive operation.`;
          log.error("[%s] %s", this._context.namespace.connectionId, msg);

          await this.close();
        }, this.newMessageWaitTimeoutInSeconds * 1000);
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

    if (this._receiver) {
      this._receiver.addCredit(this.maxConcurrentCalls);
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
    options?: ReceiveOptions
  ): Promise<StreamingReceiver> {
    throwErrorIfConnectionClosed(context.namespace);
    if (!options) options = {};
    if (options.autoComplete == undefined) options.autoComplete = true;
    const sReceiver = new StreamingReceiver(context, options);
    context.streamingReceiver = sReceiver;
    await sReceiver._init();
    return sReceiver;
  }
}
