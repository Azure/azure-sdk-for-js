// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as debugModule from "debug";
import { ClientEntity } from "./clientEntity";
import { ConnectionContext } from "./connectionContext";
import { Constants, MessagingError, translate } from "./amqp-common";
import { Receiver, OnAmqpEvent, EventContext, ReceiverOptions } from "./rhea-promise";
import { ReceiveMode, Message, ReceivedSBMessage } from ".";

const debug = debugModule("azure:service-bus:receiver");

export interface ReceiveOptions {
  /**
   * @property {number} [receiveMode] The mode in which messages should be received.
   * Default: ReceiveMode.peekLock
   */
  receiveMode?: ReceiveMode;
  /**
   * @property {string} [name] The name of the receiver. If not provided then we will set a GUID by default.
   */
  name?: string;
  /**
   * @property {number} [prefetchCount] The upper limit of events this receiver will actively receive
   * regardless of whether a receive operation is pending. Defaults to 1000.
   */
  prefetchCount?: number;
}

/**
 * Describes the message handler signature.
 */
export type OnMessage = (message: Message) => void;

/**
 * Describes the error handler signature.
 */
export type OnError = (error: MessagingError | Error) => void;

/**
 * Describes the MessageReceiver that will receive messages from ServiceBus.
 * @class MessageReceiver
 */
export class MessageReceiver extends ClientEntity {
  /**
   * @property {number} [prefetchCount] The number of messages that the receiver can
   * fetch/receive initially. Defaults to 1000.
   */
  prefetchCount?: number;
  /**
   * @property {number} [receiveMode] The mode in which messages should be received.
   * Default: ReceiveMode.peekLock
   */
  receiveMode: ReceiveMode;
  /**
   * @property {Receiver} [_receiver] The AMQP receiver link.
   * @protected
   */
  protected _receiver?: Receiver;
  /**
   * @property {OnMessage} _onMessage The message handler provided by the user that will be wrapped
   * inside _onAmqpMessage.
   * @protected
   */
  protected _onMessage?: OnMessage;
  /**
   * @property {OnMessage} _onMessage The error handler provided by the user that will be wrapped
   * inside _onAmqpError.
   * @protected
   */
  protected _onError?: OnError;
  /**
   * @property {OnMessage} _onMessage The message handler that will be set as the handler on the
   * underlying rhea receiver for the "message" event.
   * @protected
   */
  protected _onAmqpMessage: OnAmqpEvent;
  /**
   * @property {OnMessage} _onMessage The message handler that will be set as the handler on the
   * underlying rhea receiver for the "receiver_error" event.
   * @protected
   */
  protected _onAmqpError: OnAmqpEvent;

  constructor(context: ConnectionContext, options?: ReceiveOptions) {
    super(context, { name: options ? options.name : undefined });
    if (!options) options = {};
    this.address = `${this._context.config.entityPath}`;
    this.audience = `${this._context.config.endpoint}${this._context.config.entityPath}`;
    this.prefetchCount = options.prefetchCount != undefined ?
      options.prefetchCount : Constants.defaultPrefetchCount;
    this.receiveMode = options.receiveMode || ReceiveMode.peekLock;
    this._onAmqpMessage = (context: EventContext) => {
      const bMessage = ReceivedSBMessage.fromAmqpMessage(context.message!, context.delivery!);
      bMessage.body = this._context.dataTransformer.decode(context.message!.body);
      this._onMessage!(bMessage);
    };

    this._onAmqpError = (context: EventContext) => {
      const sbError = translate(context.receiver!.error!);
      // TODO: Should we retry before calling user's error method?
      debug("[%s] An error occurred for Receiver '%s': %O.",
        this._context.connectionId, this.name, sbError);
      this._onError!(sbError);
    };
  }

  /**
   * Closes the underlying AMQP receiver.
   * @param {boolean} [preserveInContext] Should the receiver be preserved in context.
   * Default value false.
   * @return {Promise<void>} Promise<void>.
   */
  async close(): Promise<void> {
    if (this._receiver) {
      try {
        await this._receiver.close();
        debug("[%s] Deleted the receiver '%s' from the client cache.", this._context.connectionId, this.name);
        this._receiver = undefined;
        clearTimeout(this._tokenRenewalTimer as NodeJS.Timer);
        debug("[%s] Receiver '%s', has been closed.", this._context.connectionId, this.name);
      } catch (err) {
        debug("An error occurred while closing the receiver %s %O", this.name, translate(err));
      }
    }
  }

  /**
   * Creates a new AMQP receiver under a new AMQP session.
   * @protected
   *
   * @returns {Promise<void>} Promise<void>.
   */
  protected async _init(onAmqpMessage?: OnAmqpEvent, onAmqpError?: OnAmqpEvent): Promise<void> {
    try {
      if (!this._isOpen()) {
        await this._negotiateClaim();
        if (!onAmqpMessage) {
          onAmqpMessage = this._onAmqpMessage;
        }
        if (!onAmqpError) {
          onAmqpError = this._onAmqpError;
        }
        debug("[%s] Trying to create receiver '%s'...", this._context.connectionId, this.name);
        const rcvrOptions = this._createReceiverOptions(onAmqpMessage, onAmqpError);
        this._receiver = await this._context.connection!.createReceiver(rcvrOptions);
        debug("Promise to create the receiver resolved. Created receiver with name: ", this.name);
        debug("[%s] Receiver '%s' created with receiver options: %O",
          this._context.connectionId, this.name, rcvrOptions);
        // It is possible for someone to close the receiver and then start it again.
        // Thus make sure that the receiver is present in the client cache.
        if (!this._context.receivers[this.name]) this._context.receivers[this.name] = this;
        await this._ensureTokenRenewal();
      }
    } catch (err) {
      err = translate(err);
      debug("[%s] An error occured while creating the receiver '%s': %O",
        this._context.connectionId, this.name, err);
      throw err;
    }
  }

  /**
   * Determines whether the AMQP receiver link is open. If open then returns true else returns false.
   * @protected
   *
   * @return {boolean} boolean
   */
  protected _isOpen(): boolean {
    return this._receiver! && this._receiver!.isOpen();
  }

  /**
   * Creates the options that need to be specified while creating an AMQP receiver link.
   * @private
   */
  private _createReceiverOptions(onMessage?: OnAmqpEvent, onError?: OnAmqpEvent): ReceiverOptions {
    const rcvrOptions: ReceiverOptions = {
      name: this.name,
      autoaccept: false,
      rcv_settle_mode: this.receiveMode === ReceiveMode.receiveAndDelete ? 0 : 1,
      snd_settle_mode: this.receiveMode === ReceiveMode.receiveAndDelete ? 1 : 0,
      source: {
        address: this.address
      },
      credit_window: this.prefetchCount,
      onMessage: onMessage,
      onError: onError
    };
    return rcvrOptions;
  }
}
