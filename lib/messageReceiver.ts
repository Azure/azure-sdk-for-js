// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as log from "./log";
import { LinkEntity } from "./linkEntity";
import { ClientEntityContext } from "./clientEntityContext";
import {
  translate, Constants, MessagingError, retry, RetryOperationType, RetryConfig
} from "@azure/amqp-common";
import { Receiver, OnAmqpEvent, EventContext, ReceiverOptions, AmqpError } from "rhea-promise";
import { Message } from "./message";
import { getUniqueName } from "./util/utils";

/**
 * @interface CreateReceiverOptions
 * @ignore
 */
interface CreateReceiverOptions {
  onMessage: OnAmqpEvent;
  onError: OnAmqpEvent;
  onClose: OnAmqpEvent;
  onSessionError: OnAmqpEvent;
  onSessionClose: OnAmqpEvent;
  newName?: boolean;
}

/**
 * The mode in which messages should be received
 */
export enum ReceiveMode {
  /**
   * Peek the message and lock it until it is settled or times out.
   * @type {Number}
   */
  peekLock = 1,

  /**
   * Remove the message from the service bus upon delivery.
   * @type {Number}
   */
  receiveAndDelete = 2
}

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
   * @property {OnAmqpEvent} _onAmqpClose The message handler that will be set as the handler on the
   * underlying rhea receiver for the "receiver_close" event.
   * @protected
   */
  protected _onAmqpClose: OnAmqpEvent;
  /**
   * @property {OnAmqpEvent} _onSessionError The message handler that will be set as the handler on
   * the underlying rhea receiver's session for the "session_error" event.
   * @protected
   */
  protected _onSessionError: OnAmqpEvent;
  /**
   * @property {OnAmqpEvent} _onSessionClose The message handler that will be set as the handler on
   * the underlying rhea receiver's session for the "session_close" event.
   * @protected
   */
  protected _onSessionClose: OnAmqpEvent;
  /**
   * @property {OnMessage} _onMessage The message handler that will be set as the handler on the
   * underlying rhea receiver for the "receiver_error" event.
   * @protected
   */
  protected _onAmqpError: OnAmqpEvent;

  constructor(context: ClientEntityContext, receiverType: ReceiverType, options?: ReceiveOptions) {
    super(context.entityPath, context, {
      address: context.entityPath,
      audience: `${context.namespace.config.endpoint}${context.entityPath}`
    });
    if (!options) options = {};
    this.receiverType = receiverType;

    this.maxConcurrentCalls = options.maxConcurrentCalls != undefined ?
      options.maxConcurrentCalls : 1;
    this.autoComplete = !!options.autoComplete;
    this.receiveMode = options.receiveMode || ReceiveMode.peekLock;
    this._onAmqpMessage = async (context: EventContext) => {
      const connectionId = this._context.namespace.connectionId;
      const bMessage: Message = new Message(context.message!, context.delivery!);
      try {
        bMessage.body = this._context.namespace.dataTransformer.decode(context.message!.body);
        await this._onMessage!(bMessage);
        if (this.autoComplete) {
          log[this.receiverType]("[%s] Auto completing the message with id '%s' on the receiver '%s'.",
            connectionId, bMessage.messageId, this.name);
          bMessage.complete();
        }
      } catch (err) {
        log.error("[%s] Abandoning the message with id '%s' on the receiver '%s' since an error " +
          "occured: %O.", connectionId, bMessage.messageId, this.name);
        bMessage.abandon();
      }
    };

    this._onAmqpError = (context: EventContext) => {
      const connectionId = this._context.namespace.connectionId;
      const receiver = this._receiver || context.receiver!;
      const receiverError = context.receiver && context.receiver.error;
      if (receiverError) {
        const sbError = translate(receiverError);
        log.error("[%s] An error occurred for Receiver '%s': %O.", connectionId, this.name, sbError);
        if (!sbError.retryable) {
          if (receiver && !receiver.isClosed()) {
            log.error("[%s] Since the user did not close the receiver and the error is not " +
              "retryable, we let the user know about it by calling the user's error handler.",
              connectionId);
            this._onError!(sbError);
          } else {
            log.error("[%s] The received error is not retryable. However, the receiver was " +
              "closed by the user. Hence not notifying the user's error handler.",
              connectionId);
          }
        } else {
          log.error("[%s] Since received error is retryable, we will NOT notify the user's " +
            "error handler.", connectionId);
        }
      }
    };

    this._onSessionError = (context: EventContext) => {
      const connectionId = this._context.namespace.connectionId;
      const receiver = this._receiver || context.receiver!;
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        const sbError = translate(sessionError);
        log.error("[%s] An error occurred on the session for Receiver '%s': %O.",
          connectionId, this.name, sbError);
        if (receiver && !receiver.isSessionClosed() && !sbError.retryable) {
          log.error("[%s] Since the user did not close the receiver and the session error is not " +
            "retryable, we let the user know about it by calling the user's error handler.",
            connectionId);
          this._onError!(sbError);
        }
      }
    };

    this._onAmqpClose = async (context: EventContext) => {
      const connectionId = this._context.namespace.connectionId;
      const receiverError = context.receiver && context.receiver.error;
      const receiver = this._receiver || context.receiver!;
      if (receiverError) {
        log.error("[%s] 'receiver_close' event occurred for receiver '%s' with address '%s'. " +
          "The associated error is: %O", connectionId, this.name,
          this.address, receiverError);
      }
      if (receiver && !receiver.isClosed()) {
        if (!this.isConnecting) {
          log.error("[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
            "and the sdk did not initiate this. The receiver is not reconnecting. Hence, calling " +
            "detached from the _onAmqpClose() handler.", connectionId, this.name,
            this.address);
          await this.detached(receiverError);
        } else {
          log.error("[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
            "and the sdk did not initate this. Moreover the receiver is already re-connecting. " +
            "Hence not calling detached from the _onAmqpClose() handler.",
            connectionId, this.name, this.address);
        }
      } else {
        log.error("[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
          "because the sdk initiated it. Hence not calling detached from the _onAmqpClose" +
          "() handler.", connectionId, this.name, this.address);
      }
    };

    this._onSessionClose = async (context: EventContext) => {
      const connectionId = this._context.namespace.connectionId;
      const receiver = this._receiver || context.receiver!;
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        log.error("[%s] 'session_close' event occurred for receiver '%s' with address '%s'. " +
          "The associated error is: %O", connectionId, this.name,
          this.address, sessionError);
      }

      if (receiver && !receiver.isSessionClosed()) {
        if (!this.isConnecting) {
          log.error("[%s] 'session_close' event occurred on the session of receiver '%s' with " +
            "address '%s' and the sdk did not initiate this. Hence calling detached from the " +
            "_onSessionClose() handler.", connectionId, this.name, this.address);
          await this.detached(sessionError);
        } else {
          log.error("[%s] 'session_close' event occurred on the session of receiver '%s' with " +
            "address '%s' and the sdk did not initiate this. Moreover the receiver is already " +
            "re-connecting. Hence not calling detached from the _onSessionClose() handler.",
            connectionId, this.name, this.address);
        }
      } else {
        log.error("[%s] 'session_close' event occurred on the session of receiver '%s' with address " +
          "'%s' because the sdk initiated it. Hence not calling detached from the _onSessionClose" +
          "() handler.", connectionId, this.name, this.address);
      }
    };
  }

  /**
   * Will reconnect the receiver link if necessary.
   * @ignore
   * @param {AmqpError | Error} [receiverError] The receiver error if any.
   * @returns {Promise<void>} Promise<void>.
   */
  async detached(receiverError?: AmqpError | Error): Promise<void> {
    const connectionId = this._context.namespace.connectionId;
    try {
      const wasCloseInitiated = this._receiver && this._receiver.isClosed();
      // Clears the token renewal timer. Closes the link and its session if they are open.
      // Removes the link and its session if they are present in rhea's cache.
      await this._closeLink(this._receiver);
      // For session_close and receiver_close this should attempt to reopen
      // only when the receiver(sdk) did not initiate the close) OR
      // if an error is present and the error is retryable.
      let shouldReopen = false;
      if (receiverError && !wasCloseInitiated) {
        const translatedError = translate(receiverError);
        if (translatedError.retryable) {
          shouldReopen = true;
          log.error("[%s] close() method of Receiver '%s' with address '%s' was not called. There " +
            "was an accompanying error and it is retryable. This is a candidate for re-establishing " +
            "the receiver link.", connectionId, this.name, this.address);
        } else {
          log.error("[%s] close() method of Receiver '%s' with address '%s' was not called. There " +
            "was an accompanying error and it is NOT retryable. Hence NOT re-establishing " +
            "the receiver link.", connectionId, this.name, this.address);
        }
      } else if (!wasCloseInitiated) {
        shouldReopen = true;
        log.error("[%s] close() method of Receiver '%s' with address '%s' was not called. " +
          "There was no accompanying error as well. This is a candidate for re-establishing " +
          "the receiver link.", connectionId, this.name, this.address);
      } else {
        const state: any = {
          wasCloseInitiated: wasCloseInitiated,
          receiverError: receiverError,
          _receiver: this._receiver
        };
        log.error("[%s] Something is busted. State of Receiver '%s' with address '%s' is: %O",
          connectionId, this.name, this.address, state);
      }
      if (shouldReopen) {
        const rcvrOptions: CreateReceiverOptions = {
          onMessage: this._onAmqpMessage,
          onError: this._onAmqpError,
          onClose: this._onAmqpClose,
          onSessionError: this._onSessionError,
          onSessionClose: this._onSessionClose,
          newName: true // provide a new name to the link while re-connecting it. This ensures that
          // the service does not send an error stating that the link is still open.
        };
        const options: ReceiverOptions = this._createReceiverOptions(rcvrOptions);
        // shall retry forever at an interval of 15 seconds if the error is a retryable error
        // else bail out when the error is not retryable or the oepration succeeds.
        const config: RetryConfig<void> = {
          operation: () => this._init(options),
          connectionId: connectionId,
          operationType: RetryOperationType.receiverLink,
          times: Constants.defaultConnectionRetryAttempts,
          delayInSeconds: 15
        };
        await retry<void>(config);
      }
    } catch (err) {
      log.error("[%s] An error occurred while processing detached() of Receiver '%s': %O ",
        connectionId, this.name, this.address, err);
    }
  }

  /**
   * Closes the underlying AMQP receiver.
   * @return {Promise<void>} Promise<void>.
   */
  async close(): Promise<void> {
    if (this._receiver) {
      const receiverLink = this._receiver;
      this._deleteFromCache();
      await this._closeLink(receiverLink);
    }
  }

  /**
   * Determines whether the AMQP receiver link is open. If open then returns true else returns false.
   * @ignore
   * @return {boolean} boolean
   */
  isOpen(): boolean {
    const result: boolean = this._receiver! && this._receiver!.isOpen();
    log.error("[%s] Receiver '%s' with address '%s' is open? -> %s",
      this._context.namespace.connectionId, this.name, this.address, result);
    return result;
  }

  protected _deleteFromCache(): void {
    this._receiver = undefined;
    if (this.receiverType === ReceiverType.streaming) {
      this._context.streamingReceiver = undefined;
    } else if (this.receiverType === ReceiverType.batching) {
      this._context.batchingReceiver = undefined;
    }
    log.error("[%s] Deleted the receiver '%s' from the client cache.",
      this._context.namespace.connectionId, this.name);
  }

  /**
   * Creates a new AMQP receiver under a new AMQP session.
   * @protected
   *
   * @returns {Promise<void>} Promise<void>.
   */
  protected async _init(options?: ReceiverOptions): Promise<void> {
    const connectionId = this._context.namespace.connectionId;
    try {
      if (!this.isOpen() && !this.isConnecting) {
        log.error("[%s] The receiver '%s' with address '%s' is not open and is not currently " +
          "establishing itself. Hence let's try to connect.", connectionId, this.name, this.address);
        this.isConnecting = true;
        await this._negotiateClaim();
        if (!options) {
          options = this._createReceiverOptions({
            onMessage: this._onAmqpMessage,
            onError: this._onAmqpError,
            onClose: this._onAmqpClose,
            onSessionError: this._onSessionError,
            onSessionClose: this._onSessionClose,
          });
        }
        log.error("[%s] Trying to create receiver '%s' with options %O",
          connectionId, this.name, options);

        this._receiver = await this._context.namespace.connection.createReceiver(options);
        this.isConnecting = false;
        log.error("[%s] Receiver '%s' with address '%s' has established itself.",
          connectionId, this.name, this.address);
        log[this.receiverType]("Promise to create the receiver resolved. " +
          "Created receiver with name: ", this.name);
        log[this.receiverType]("[%s] Receiver '%s' created with receiver options: %O",
          connectionId, this.name, options);
        // It is possible for someone to close the receiver and then start it again.
        // Thus make sure that the receiver is present in the client cache.
        if (this.receiverType === ReceiverType.streaming && !this._context.streamingReceiver) {
          this._context.streamingReceiver = this as any;
        } else if (this.receiverType === ReceiverType.batching && !this._context.batchingReceiver) {
          this._context.batchingReceiver = this as any;
        }
        await this._ensureTokenRenewal();
      } else {
        log.error("[%s] The receiver '%s' with address '%s' is open -> %s and is connecting " +
          "-> %s. Hence not reconnecting.", connectionId, this.name, this.address,
          this.isOpen(), this.isConnecting);
      }
    } catch (err) {
      this.isConnecting = false;
      err = translate(err);
      log.error("[%s] An error occured while creating the receiver '%s': %O",
        this._context.namespace.connectionId, this.name, err);
      throw err;
    }
  }

  /**
   * Creates the options that need to be specified while creating an AMQP receiver link.
   * @ignore
   */
  protected _createReceiverOptions(options: CreateReceiverOptions): ReceiverOptions {
    if (options.newName) this.name = getUniqueName(this._context.entityPath);
    const rcvrOptions: ReceiverOptions = {
      name: this.name,
      autoaccept: false,
      // receiveAndDelete -> first(0), peekLock -> second (1)
      rcv_settle_mode: this.receiveMode === ReceiveMode.receiveAndDelete ? 0 : 1,
      // receiveAndDelete -> settled (1), peekLock -> unsettled (0)
      snd_settle_mode: this.receiveMode === ReceiveMode.receiveAndDelete ? 1 : 0,
      source: {
        address: this.address
      },
      credit_window: this.maxConcurrentCalls,
      onMessage: options.onMessage || this._onAmqpMessage,
      onError: options.onError || this._onAmqpError,
      onClose: options.onClose || this._onAmqpClose,
      onSessionError: options.onSessionError || this._onSessionError,
      onSessionClose: options.onSessionClose || this._onSessionClose
    };
    return rcvrOptions;
  }
}
