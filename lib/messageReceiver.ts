// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as debugModule from "debug";
import { LinkEntity } from "./linkEntity";
import { ClientEntityContext } from "./clientEntityContext";
import { MessagingError, translate } from "./amqp-common";
import { Receiver, OnAmqpEvent, EventContext, ReceiverOptions } from "./rhea-promise";
import { ReceiveMode, Message } from ".";

const debug = debugModule("azure:service-bus:receiver");

export enum ReceiverType {
  batching = "batching",
  streaming = "streaming"
}

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
   * @property {number} [maxConcurrentCalls] The maximum number of messages that should be
   * processed concurrently while in peek lock mode. Once this limit has been reached, more
   * messages will not be received until messages currently being processed have been settled.
   * Default: 1
   */
  maxConcurrentCalls?: number;
  /**
   * @property {boolean} [autoComplete] Indicates whether `Message.complete()` should be called
   * automatically after the message processing is complete while receiving messages with handlers
   * or while messages are received using receiveBatch(). Default: false.
   */
  autoComplete?: boolean;
}

/**
 * Describes the message handler signature.
 */
export type OnMessage = (message: Message) => Promise<void>;

/**
 * Describes the error handler signature.
 */
export type OnError = (error: MessagingError | Error) => void;

/**
 * Describes the MessageReceiver that will receive messages from ServiceBus.
 * @class MessageReceiver
 */
export class MessageReceiver extends LinkEntity {
  /**
   * @property {string} receiverType The type of receiver: "batching" or "streaming".
   */
  receiverType: ReceiverType;
  /**
   * @property {number} [maxConcurrentCalls] The maximum number of messages that should be
   * processed concurrently while in peek lock mode. Once this limit has been reached, more
   * messages will not be received until messages currently being processed have been settled.
   * Default: 1
   */
  maxConcurrentCalls?: number;
  /**
   * @property {number} [receiveMode] The mode in which messages should be received.
   * Default: ReceiveMode.peekLock
   */
  receiveMode: ReceiveMode;
  /**
   * @property {boolean} [autoComplete] Indicates whether `Message.complete()` should be called
   * automatically after the message processing is complete while receiving messages with handlers
   * or while messages are received using receiveBatch(). Default: false.
   */
  autoComplete: boolean;
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

  constructor(context: ClientEntityContext, receiverType: ReceiverType, options?: ReceiveOptions) {
    super(`${context.entityPath}`, context);
    if (!options) options = {};
    this.receiverType = receiverType;
    this.address = `${this._context.entityPath}`;
    this.audience = `${this._context.namespace.config.endpoint}${this._context.entityPath}`;
    this.maxConcurrentCalls = options.maxConcurrentCalls != undefined ?
      options.maxConcurrentCalls : 1;
    this.autoComplete = options.autoComplete != undefined ? options.autoComplete : false;
    this.receiveMode = options.receiveMode || ReceiveMode.peekLock;
    this._onAmqpMessage = async (context: EventContext) => {
      const bMessage = new Message(context.message!, context.delivery!);
      bMessage.body = this._context.namespace.dataTransformer.decode(context.message!.body);
      try {
        await this._onMessage!(bMessage);
        if (this.autoComplete) {
          debug("[%s] Auto completing the message with id '%s' on the receiver '%s'.",
            this._context.namespace.connectionId, bMessage.messageId, this.id);
          bMessage.complete();
        }
      } catch (err) {
        debug("[%s] Abandoning the message with id '%s' on the receiver '%s' since an error " +
          "occured: %O.",
          this._context.namespace.connectionId, bMessage.messageId, this.id);
        bMessage.abandon();
      }
    };

    this._onAmqpError = (context: EventContext) => {
      const sbError = translate(context.receiver!.error!);
      // TODO: Should we retry before calling user's error method?
      debug("[%s] An error occurred for Receiver '%s': %O.",
        this._context.namespace.connectionId, this.id, sbError);
      this._onError!(sbError);
    };
  }

  /**
   * Determines whether the AMQP receiver link is open. If open then returns true else returns false.
   * @returns {boolean} boolean
   */
  isOpen(): boolean {
    return this._receiver! && this._receiver!.isOpen();
  }

  /**
   * Closes the underlying AMQP receiver.
   * @return {Promise<void>} Promise<void>.
   */
  async close(): Promise<void> {
    if (this._receiver) {
      try {
        await this._receiver.close();
        debug("[%s] Deleted the receiver '%s' from the client entity context.",
          this._context.namespace.connectionId, this.id);
        this._receiver = undefined;
        clearTimeout(this._tokenRenewalTimer as NodeJS.Timer);
        debug("[%s] Receiver '%s', has been closed.",
          this._context.namespace.connectionId, this.id);
      } catch (err) {
        debug("An error occurred while closing the receiver %s %O", this.id, translate(err));
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
      if (!this.isOpen()) {
        await this._negotiateClaim();
        if (!onAmqpMessage) {
          onAmqpMessage = this._onAmqpMessage;
        }
        if (!onAmqpError) {
          onAmqpError = this._onAmqpError;
        }
        debug("[%s] Trying to create receiver '%s'...",
          this._context.namespace.connectionId, this.id);
        const rcvrOptions = this._createReceiverOptions(onAmqpMessage, onAmqpError);
        this._receiver = await this._context.namespace.connection!.createReceiver(rcvrOptions);
        debug("Promise to create the receiver resolved. Created receiver with name: ", this.id);
        debug("[%s] Receiver '%s' created with receiver options: %O",
          this._context.namespace.connectionId, this.id, rcvrOptions);
        // It is possible for someone to close the receiver and then start it again.
        // Thus make sure that the receiver is present in the client cache.
        if (!this._context.streamingReceiver) this._context.streamingReceiver = this as any;
        await this._ensureTokenRenewal();
      }
    } catch (err) {
      err = translate(err);
      debug("[%s] An error occured while creating the receiver '%s': %O",
        this._context.namespace.connectionId, this.id, err);
      throw err;
    }
  }

  /**
   * Creates the options that need to be specified while creating an AMQP receiver link.
   * @private
   */
  private _createReceiverOptions(onMessage?: OnAmqpEvent, onError?: OnAmqpEvent): ReceiverOptions {
    const rcvrOptions: ReceiverOptions = {
      name: this.id,
      autoaccept: false,
      // receiveAndDelete -> first(0), peekLock -> second (1)
      rcv_settle_mode: this.receiveMode === ReceiveMode.receiveAndDelete ? 0 : 1,
      // receiveAndDelete -> settled (1), peekLock -> unsettled (0)
      snd_settle_mode: this.receiveMode === ReceiveMode.receiveAndDelete ? 1 : 0,
      source: {
        address: this.address
      },
      credit_window: this.maxConcurrentCalls,
      onMessage: onMessage,
      onError: onError
    };
    return rcvrOptions;
  }
}
