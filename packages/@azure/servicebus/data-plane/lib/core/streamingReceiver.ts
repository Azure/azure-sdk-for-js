// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Constants } from "@azure/amqp-common";
import { ReceiverEvents } from "rhea-promise";
import {
  MessageReceiver,
  ReceiveOptions,
  OnMessage,
  OnError,
  ReceiverType
} from "./messageReceiver";
import { ReceiveMode } from "../serviceBusMessage";
import { ClientEntityContext } from "../clientEntityContext";

import * as log from "../log";

/**
 * Describes the receive handler object that is returned from the receive() method with handlers is
 * called. The ReceiveHandler is used to stop receiving more messages.
 * @class ReceiveHandler
 */
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
   * @param {MessageReceiver} receiver The underlying Message Receiver.
   */
  constructor(receiver: MessageReceiver) {
    this._receiver = receiver;
    this.name = receiver ? receiver.name : "ReceiveHandler";
  }

  /**
   * @property {string} [address] The address of the underlying receiver.
   * @readonly
   */
  get address(): string | undefined {
    return this._receiver ? this._receiver.address : undefined;
  }

  /**
   * @property {boolean} isReceiverOpen Indicates whether the receiver is connected/open.
   * `true` - is open; `false` otherwise.
   * @readonly
   */
  get isReceiverOpen(): boolean {
    return this._receiver ? this._receiver.isOpen() : false;
  }

  /**
   * @property {boolean} [autoComplete] Indicates whether `Message.complete()` should be called
   * automatically after the message processing is complete while receiving messages with handlers
   * or while messages are received using receiveBatch(). Default: false.
   */
  get autoComplete(): boolean {
    return this._receiver.autoComplete;
  }

  /**
   * @property {number} [receiveMode] The mode in which messages should be received.
   * Default: ReceiveMode.peekLock
   */
  get receiveMode(): ReceiveMode {
    return this._receiver.receiveMode;
  }

  /**
   * Stops the underlying MessageReceiver from receiving more messages.
   * @return {Promise<void>} Promise<void>
   */
  async stop(): Promise<void> {
    if (this._receiver) {
      try {
        await this._receiver.close();
      } catch (err) {
        log.error(
          "An error occurred while stopping the receiver '%s' with address '%s': %O",
          this._receiver.name,
          this._receiver.address,
          err
        );
      }
    }
  }
}

export interface MessageHandlerOptions {
  /**
   * @property {boolean} [autoComplete] Indicates whether `Message.complete()` should be called
   * automatically after the message processing is complete while receiving messages with handlers.
   * - **Default**: `true`.
   */
  autoComplete?: boolean;
  /**
   * @property {number} [maxConcurrentCalls] The maximum number of messages that should be
   * processed concurrently while in peek lock mode. Once this limit has been reached, more
   * messages will not be received until messages currently being processed have been settled.
   * - **Default**: `1` (message at a time).
   */
  maxConcurrentCalls?: number;
  /**
   * @property {number} [maxAutoRenewDurationInSeconds] The maximum duration within which the
   * lock will be renewed automatically. This value should be greater than the longest message
   * lock duration; for example, the `lockDuration` property on the received message.
   * - **Default**: `300` seconds (5 minutes).
   * - **For disabling autolock renewal**, please set `maxAutoRenewDurationInSeconds` to `0`.
   */
  maxAutoRenewDurationInSeconds?: number;
}

/**
 * Describes the streaming receiver where the user can receive the message
 * by providing handler functions.
 * @class StreamingReceiver
 * @extends MessageReceiver
 */
export class StreamingReceiver extends MessageReceiver {
  /**
   * @property {ReceiveHandler} receiveHandler The receive handler associated with this receivever
   * that provides a mechanism to stop receiving messages.
   */
  receiveHandler: ReceiveHandler;
  /**
   * Instantiate a new Streaming receiver for receiving messages with handlers.
   *
   * @constructor
   * @param {ClientEntityContext} context                      The client entity context.
   * @param {ReceiveOptions} [options]                         Options for how you'd like to connect.
   */
  constructor(context: ClientEntityContext, options?: ReceiveOptions) {
    super(context, ReceiverType.streaming, options);
    this.receiveHandler = new ReceiveHandler(this);
  }

  /**
   * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session.
   *
   * @param {OnMessage} onMessage The message handler to receive servicebus messages.
   * @param {OnError} onError The error handler to receive an error that occurs while receivin messages.
   */
  receive(onMessage: OnMessage, onError: OnError): ReceiveHandler {
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
      log.streaming(
        "[%s] Receiver link is already present for '%s' due to previous receive() calls. " +
          "Hence reusing it and attaching message and error handlers.",
        this._context.namespace.connectionId,
        this.name
      );
      this._receiver!.on(ReceiverEvents.message, this._onAmqpMessage);
      this._receiver!.on(ReceiverEvents.receiverError, this._onAmqpError);
      this._receiver!.setCreditWindow(Constants.defaultPrefetchCount);
      this._receiver!.addCredit(Constants.defaultPrefetchCount);
      log.streaming(
        "[%s] Receiver '%s', set the prefetch count to 1000 and " +
          "providing a credit of the same amount.",
        this._context.namespace.connectionId,
        this.name
      );
    }
    return this.receiveHandler;
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
