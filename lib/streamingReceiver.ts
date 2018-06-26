
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as debugModule from "debug";
import { Constants } from "./amqp-common";
import { MessageReceiver, ReceiveOptions, OnMessage, OnError, ReceiverType } from "./messageReceiver";
import { ClientEntityContext } from "./clientEntityContext";
import { ReceiverEvents } from "./rhea-promise";
const debug = debugModule("azure:service-bus:receiverstreaming");

export class ReceiveHandler {
  /**
   * @property {string} name The Receiver handler name.
   * @readonly
   */
  readonly name: string;

  /**
   * @property {MessageReceiver} _receiver  The underlying Message Receiver.
   * @private
   */
  private _receiver: MessageReceiver;

  /**
   * Creates an instance of the ReceiveHandler.
   * @constructor
   * @param {EventHubReceiver} receiver The underlying Message Receiver.
   */
  constructor(receiver: MessageReceiver) {
    this._receiver = receiver;
    this.name = receiver ? receiver.id : "ReceiveHandler";
  }

  /**
   * @property {string} [address] The address of the underlying receiver.
   * @readonly
   */
  get address(): string | undefined {
    return this._receiver ? this._receiver.address : undefined;
  }

  /**
   * Stops the underlying EventHubReceiver from receiving more messages.
   * @return {Promise<void>} Promise<void>
   */
  async stop(): Promise<void> {
    if (this._receiver) {
      await this._receiver.close();
    }
  }
}

export interface MessageHandlerOptions {
  /**
   * @property {boolean} [autoComplete] Indicates whether `Message.complete()` should be called
   * automatically after the message processing is complete while receiving messages with handlers
   * or while messages are received using receiveBatch(). Default: true.
   */
  autoComplete?: boolean;
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
  }

  /**
   * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session.
   *
   * @param {OnMessage} onMessage The message handler to receive event data objects.
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
    if (!this.isOpen()) {
      this._init().catch((err) => {
        this._onError!(err);
      });
    } else {
      // It is possible that the receiver link has been established due to a previous receive() call. If that
      // is the case then add message and error event handlers to the receiver. When the receiver will be closed
      // these handlers will be automatically removed.
      debug("[%s] Receiver link is already present for '%s' due to previous receive() calls. " +
        "Hence reusing it and attaching message and error handlers.",
        this._context.namespace.connectionId, this.id);
      this._receiver!.registerHandler(ReceiverEvents.message, this._onAmqpMessage);
      this._receiver!.registerHandler(ReceiverEvents.receiverError, this._onAmqpError);
      this._receiver!.setCreditWindow(Constants.defaultPrefetchCount);
      this._receiver!.addCredit(Constants.defaultPrefetchCount);
      debug("[%s] Receiver '%s', set the prefetch count to 1000 and " +
        "providing a credit of the same amount.",
        this._context.namespace.connectionId, this.id);
    }
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
