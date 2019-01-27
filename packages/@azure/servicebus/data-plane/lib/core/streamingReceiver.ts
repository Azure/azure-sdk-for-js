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

export interface MessageHandlerOptions {
  /**
   * @property {boolean} [autoComplete] Indicates whether `Message.complete()` should be called
   * automatically after the message processing is complete.
   * - **Default**: `true`.
   */
  autoComplete?: boolean;
  /**
   * @property {number} [maxAutoRenewDurationInSeconds] The maximum duration in seconds until which
   * the lock on the message will be renewed automatically before the message is settled.
   * - **Default**: `300` seconds (5 minutes).
   * - **To disable autolock renewal**, set `maxAutoRenewDurationInSeconds` to `0`.
   */
  maxAutoRenewDurationInSeconds?: number;
  /**
   * @property {number} [maxMessageWaitTimeoutInSeconds] The maximum amount of idle time the
   * receiver will wait after a message has been received. If no messages are received in that
   * time frame then the receiver will be closed.
   */
  maxMessageWaitTimeoutInSeconds?: number;
}

/**
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
      if (this.maxMessageWaitTimeoutInSeconds) {
        this._newMessageReceivedTimer = setTimeout(async () => {
          const msg =
            `StreamingReceiver '${this.name}' did not receive any messages in ` +
            `the last ${this.maxMessageWaitTimeoutInSeconds} seconds. ` +
            `Hence ending this receive operation.`;
          log.error("[%s] %s", this._context.namespace.connectionId, msg);

          // To stop receiving any more messages, drain the credit
          // We do this instead of close() as the receiver link should be open to enable users to
          // settle their messages.
          if (this._receiver) {
            // Setting drain must be accompanied by a flow call (aliased to addCredit in this case).
            this._receiver.drain = true;
            this._receiver.addCredit(1);
          }
        }, this.maxMessageWaitTimeoutInSeconds * 1000);
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
    if (!onMessage || typeof onMessage !== "function") {
      throw new Error("'onMessage' is a required parameter and must be of type 'function'.");
    }
    if (!onError || typeof onError !== "function") {
      throw new Error("'onError' is a required parameter and must be of type 'function'.");
    }
    this._onMessage = onMessage;
    this._onError = onError;
    if (this.isOpen()) {
      const msg =
        `A streaming receiver with id "${this.name}" is active for ` +
        `"${this._context.entityPath}". A new receive() call cannot be made at this time. ` +
        `Either wait for current receiver to complete or create a new receiver.`;
      throw new Error(msg);
    }
    this._init().catch((err) => {
      this._onError!(err);
    });
  }

  /**
   * Creates a streaming receiver.
   * @static
   *
   * @param {ClientEntityContext} context    The connection context.
   * @param {ReceiveOptions} [options]     Receive options.
   * @return {StreamingReceiver} An instance of StreamingReceiver.
   */
  static create(context: ClientEntityContext, options?: ReceiveOptions): StreamingReceiver {
    if (!options) options = {};
    if (options.autoComplete == undefined) options.autoComplete = true;
    const sReceiver = new StreamingReceiver(context, options);
    context.streamingReceiver = sReceiver;
    return sReceiver;
  }
}
