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
import { ReceiverEvents, Receiver } from "rhea-promise";
import { delay } from "@azure/amqp-common";

/**
 * Describes the options passed to `registerMessageHandler` method when receiving messages from a
 * Queue/Subscription which does not have sessions enabled.
 */
export interface MessageHandlerOptions {
  /**
   * @property Indicates whether the `complete()` method on the message should automatically be
   * called by the sdk after the user provided onMessage handler has been executed.
   * Calling `complete()` on a message removes it from the Queue/Subscription.
   * - **Default**: `true`.
   */
  autoComplete?: boolean;
  /**
   * @property The maximum duration in seconds until which the lock on the message will be renewed
   * by the sdk automatically. This auto renewal stops once the message is settled or once the user
   * provided onMessage handler completes ite execution.
   *
   * - **Default**: `300` seconds (5 minutes).
   * - **To disable autolock renewal**, set this to `0`.
   */
  maxMessageAutoRenewLockDurationInSeconds?: number;
  /**
   * @property The maximum number of concurrent calls that the sdk can make to the user's message
   * handler. Once this limit has been reached, further messages will not be received until atleast
   * one of the calls to the user's message handler has completed.
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
   * Unregisters this streaming receiver, removing it's callbacks
   * and draining any credits that we requested.
   *
   * @param timeoutMs The maximum amount of time to wait for the drain to complete.
   */
  async drainAndUnregisterHandlers(timeoutMs: number): Promise<void> {
    const receiver = this._receiver;

    if (receiver == null) {
      return;
    }

    log.receiver(
      "[%s] Stopping streaming receiver for entity '%s'.",
      this._context.namespace.connectionId,
      this._context.entityPath
    );

    // drain this receiver - once it's fully drained
    // we can kill all the other methods
    const ret = await Promise.race([this._drainReceiver(receiver), delay(timeoutMs, "timedout")]);

    if (ret === "timedout") {
      const msg = `Failed to drain receiver within ${timeoutMs} milliseconds, can't safely close message handler.`;
      log.error(`[${this._context.namespace.connectionId}] ${msg}`);
      throw new Error(msg);
    }

    // succesfully drain()'d - we should receive no further messages
    // or errors related this receiver so we can remove the handlers.
    this._onMessage = async () => {};
    this._onError = () => {};

    // TODO: I don't think I need to do this - it'll just get replaced
    // on the next registerMessageHandler() they do on this client.
    // this._context.streamingReceiver = undefined;
  }

  private _drainReceiver(receiver: Receiver): Promise<void> {
    let isDrainedResolve: () => void;
    const isDrainedPromise = new Promise<void>((res, rej) => {
      isDrainedResolve = res;
    });

    const onDrain = () => {
      receiver.removeListener(ReceiverEvents.receiverDrained, onDrain);
      isDrainedResolve();
    };

    receiver.addListener(ReceiverEvents.receiverDrained, onDrain);

    // TODO: do I need to explicitly "erase" my credits or is this enough to make that happen?
    receiver.drain = true;
    receiver.addCredit(1);

    return isDrainedPromise;
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
    if (options.autoComplete == null) options.autoComplete = true;
    const sReceiver = new StreamingReceiver(context, options);
    await sReceiver._init();
    context.streamingReceiver = sReceiver;
    return sReceiver;
  }
}
