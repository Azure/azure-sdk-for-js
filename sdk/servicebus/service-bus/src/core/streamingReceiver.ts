// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
import { RetryOperationType, RetryConfig, retry, translate } from "@azure/core-amqp";
import { OperationOptions } from "..";
import { checkAndRegisterWithAbortSignal } from "../util/utils";
import { AbortError } from "@azure/abort-controller";
import { openLink } from "../shared/openLink";

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
  constructor(context: ClientEntityContext, openLinkFn: typeof openLink, options?: ReceiveOptions) {
    super(context, ReceiverType.streaming, openLinkFn, options);

    this.resetTimerOnNewMessageReceived = () => {
      if (this._newMessageReceivedTimer) clearTimeout(this._newMessageReceivedTimer);
      if (this.newMessageWaitTimeoutInMs) {
        this._newMessageReceivedTimer = setTimeout(async () => {
          const msg =
            `StreamingReceiver '${this.name}' did not receive any messages in ` +
            `the last ${this.newMessageWaitTimeoutInMs} milliseconds. ` +
            `Hence ending this receive operation.`;
          log.error("[%s] %s", this._context.namespace.connectionId, msg);

          await this.close();
        }, this.newMessageWaitTimeoutInMs);
      }
    };
  }

  /**
   * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session.
   *
   * @param {OnMessage} onMessage The message handler to receive servicebus messages.
   * @param {OnError} onError The error handler to receive an error that occurs while receivin messages.
   * @param abortSignal An abort signal that, when fired, closes this streaming receiver.
   */
  receive(
    onMessage: OnMessage,
    onError: OnError,
    options?: Pick<OperationOptions, "abortSignal">
  ): void {
    throwErrorIfConnectionClosed(this._context.namespace);
    this._onMessage = onMessage;
    this._onError = onError;

    this._cleanupAbortHandler = checkAndRegisterWithAbortSignal(
      () => {
        this.close();
        onError(translate(new AbortError("Receive was cancelled by user.")));
      },
      "Receive was cancelled by user.",
      options?.abortSignal
    );

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
    openLinkFn: typeof openLink,
    options?: ReceiveOptions
  ): Promise<StreamingReceiver> {
    throwErrorIfConnectionClosed(context.namespace);
    if (!options) options = {};
    if (options.autoComplete == null) options.autoComplete = true;
    const sReceiver = new StreamingReceiver(context, openLinkFn, options);

    const config: RetryConfig<void> = {
      operation: () => {
        return sReceiver._init();
      },
      connectionId: context.namespace.connectionId,
      operationType: RetryOperationType.receiveMessage,
      retryOptions: options.retryOptions
    };
    await retry<void>(config);
    context.streamingReceiver = sReceiver;
    return sReceiver;
  }

  close(): Promise<void> {
    if (this._cleanupAbortHandler) {
      this._cleanupAbortHandler();
      this._cleanupAbortHandler = undefined;
    }

    return super.close();
  }

  private _cleanupAbortHandler: undefined | (() => void);
}
