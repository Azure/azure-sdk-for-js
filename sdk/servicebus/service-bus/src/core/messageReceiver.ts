// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Constants,
  ErrorNameConditionMapper,
  MessagingError,
  RetryOptions,
  translate
} from "@azure/core-amqp";
import { AmqpError, EventContext, OnAmqpEvent, Receiver, ReceiverOptions } from "rhea-promise";
import { logger } from "../log";
import { LinkEntity, ReceiverType } from "./linkEntity";
import { ConnectionContext } from "../connectionContext";
import { DispositionType, InternalReceiveMode, ServiceBusMessageImpl } from "../serviceBusMessage";
import { getUniqueName } from "../util/utils";
import { MessageHandlerOptions } from "../models";
import { DispositionStatusOptions } from "./managementClient";
import { AbortSignalLike } from "@azure/core-http";
import { onMessageSettled, DeferredPromiseAndTimer } from "./shared";
import { logError } from "../util/errors";
import { AutoLockRenewer } from "./lockRenewer";

/**
 * @internal
 * @ignore
 */
export type ReceiverHandlers = Pick<
  ReceiverOptions,
  "onMessage" | "onError" | "onClose" | "onSessionError" | "onSessionClose"
>;

/**
 * @internal
 * @ignore
 */
export interface OnAmqpEventAsPromise extends OnAmqpEvent {
  (context: EventContext): Promise<void>;
}

/**
 * @internal
 * @ignore
 */
export interface ReceiveOptions extends MessageHandlerOptions {
  /**
   * @property {number} [receiveMode] The mode in which messages should be received.
   * Default: ReceiveMode.peekLock
   */
  receiveMode?: InternalReceiveMode;
  /**
   * Retry policy options that determine the mode, number of retries, retry interval etc.
   */
  retryOptions?: RetryOptions;
}

/**
 * Describes the signature of the message handler passed to `registerMessageHandler` method.
 * @internal
 * @ignore
 */
export interface OnMessage {
  /**
   * Handler for processing each incoming message.
   */
  (message: ServiceBusMessageImpl): Promise<void>;
}

/**
 * Describes the signature of the error handler passed to `registerMessageHandler` method.
 *
 * @internal
 * @ignore
 */
export interface OnError {
  /**
   * Handler for any error that occurs while receiving or processing messages.
   */
  (error: MessagingError | Error): void;
}

/**
 * @internal
 * @ignore
 * Describes the MessageReceiver that will receive messages from ServiceBus.
 * @class MessageReceiver
 */
export abstract class MessageReceiver extends LinkEntity<Receiver> {
  /**
   * @property {string} receiverType The type of receiver: "batching" or "streaming".
   */
  receiverType: ReceiverType;
  /**
   * @property {number} [receiveMode] The mode in which messages should be received.
   * Default: ReceiveMode.peekLock
   */
  receiveMode: InternalReceiveMode;
  /**
   * @property {boolean} autoComplete Indicates whether `Message.complete()` should be called
   * automatically after the message processing is complete while receiving messages with handlers.
   * Default: false.
   */
  autoComplete: boolean;
  /**
   * @property {Map<number, Promise<any>>} _deliveryDispositionMap Maintains a map of deliveries that
   * are being actively disposed. It acts as a store for correlating the responses received for
   * active dispositions.
   */
  protected _deliveryDispositionMap: Map<number, DeferredPromiseAndTimer> = new Map<
    number,
    DeferredPromiseAndTimer
  >();
  /**
   * @property {OnMessage} _onMessage The message handler provided by the user that will be wrapped
   * inside _onAmqpMessage.
   */
  protected _onMessage!: OnMessage;
  /**
   * @property {OnMessage} _onError The error handler provided by the user that will be wrapped
   * inside _onAmqpError.
   */
  protected _onError?: OnError;
  private _autolockRenewer: AutoLockRenewer | undefined;

  constructor(
    context: ConnectionContext,
    entityPath: string,
    receiverType: ReceiverType,
    options?: Omit<ReceiveOptions, "maxConcurrentCalls">
  ) {
    super(entityPath, context, receiverType, {
      address: entityPath,
      audience: `${context.config.endpoint}${entityPath}`
    });

    if (!options) options = {};
    this.receiverType = receiverType;
    this.receiveMode = options.receiveMode || InternalReceiveMode.peekLock;

    // If explicitly set to false then autoComplete is false else true (default).
    this.autoComplete = options.autoComplete === false ? options.autoComplete : true;

    this._autolockRenewer = AutoLockRenewer.create(this, this._context, options);

    this._clearMessageLockRenewTimer = (messageId: string) => {
      if (this._messageRenewLockTimers.has(messageId)) {
        clearTimeout(this._messageRenewLockTimers.get(messageId) as NodeJS.Timer);
        logger.verbose(
          "[%s] Cleared the message renew lock timer for message with id '%s'.",
          this._context.connectionId,
          messageId
        );
        this._messageRenewLockTimers.delete(messageId);
      }
    };
    this._clearAllMessageLockRenewTimers = () => {
      logger.verbose(
        "[%s] Clearing message renew lock timers for all the active messages.",
        this._context.connectionId
      );
      for (const messageId of this._messageRenewLockTimers.keys()) {
        this._clearMessageLockRenewTimer(messageId);
      }
    };
  }

  /**
   * Creates the options that need to be specified while creating an AMQP receiver link.
   */
  protected _createReceiverOptions(
    useNewName: boolean,
    handlers: ReceiverHandlers
  ): ReceiverOptions {
    const rcvrOptions: ReceiverOptions = {
      name: useNewName ? getUniqueName(this.entityPath) : this.name,
      autoaccept: this.receiveMode === InternalReceiveMode.receiveAndDelete ? true : false,
      // receiveAndDelete -> first(0), peekLock -> second (1)
      rcv_settle_mode: this.receiveMode === InternalReceiveMode.receiveAndDelete ? 0 : 1,
      // receiveAndDelete -> settled (1), peekLock -> unsettled (0)
      snd_settle_mode: this.receiveMode === InternalReceiveMode.receiveAndDelete ? 1 : 0,
      source: {
        address: this.address
      },
      credit_window: 0,
      onSettled: (context) => {
        return onMessageSettled(
          this._context.connection.id,
          context.delivery,
          this._deliveryDispositionMap
        );
      },
      ...handlers
    };

    return rcvrOptions;
  }

  /**
   * Creates a new AMQP receiver under a new AMQP session.
   *
   * @returns {Promise<void>} Promise<void>.
   */
  protected async _init(options: ReceiverOptions, abortSignal?: AbortSignalLike): Promise<void> {
    try {
      await this.initLink(options, abortSignal);

      // It is possible for someone to close the receiver and then start it again.
      // Thus make sure that the receiver is present in the client cache.
      this._context.messageReceivers[this.name] = this as any;
    } catch (err) {
      err = translate(err);
      logError(
        err,
        "[%s] An error occured while creating the receiver '%s': %O",
        this._context.connectionId,
        this.name,
        err
      );

      // Fix the unhelpful error messages for the OperationTimeoutError that comes from `rhea-promise`.
      if ((err as MessagingError).code === "OperationTimeoutError") {
        err.message = "Failed to create a receiver within allocated time and retry attempts.";
      }

      throw err;
    }
  }

  protected createRheaLink(
    options: ReceiverOptions,
    _abortSignal?: AbortSignalLike
  ): Promise<Receiver> {
    return this._context.connection.createReceiver(options);
  }

  /**
   * React to receiver being detached due to given error.
   * You may want to set up retries to recover the broken link and/or report error to user.
   * @param error The error accompanying the receiver/session error or connection disconnected events
   * @param causedByDisconnect Indicator of whether the error is caused by the connection disconnecting.
   * In this case, the receiver/session error events do not get fired.
   */
  abstract async onDetached(error?: AmqpError | Error, causedByDisconnect?: boolean): Promise<void>;

  /**
   * Clears lock renewal timers on all active messages, clears token remewal for current receiver,
   * removes current MessageReceiver instance from cache, and closes the underlying AMQP receiver.
   * @return {Promise<void>} Promise<void>.
   */
  async close(): Promise<void> {
    this._clearAllMessageLockRenewTimers();
    await super.close();
  }

  /**
   * Settles the message with the specified disposition.
   * @param message The ServiceBus Message that needs to be settled.
   * @param operation The disposition type.
   * @param options Optional parameters that can be provided while disposing the message.
   */
  async settleMessage(
    message: ServiceBusMessageImpl,
    operation: DispositionType,
    options?: DispositionStatusOptions
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!options) options = {};
      if (operation.match(/^(complete|abandon|defer|deadletter)$/) == null) {
        return reject(new Error(`operation: '${operation}' is not a valid operation.`));
      }
      this._clearMessageLockRenewTimer(message.messageId as string);
      const delivery = message.delivery;
      const timer = setTimeout(() => {
        this._deliveryDispositionMap.delete(delivery.id);

        logger.verbose(
          "[%s] Disposition for delivery id: %d, did not complete in %d milliseconds. " +
            "Hence rejecting the promise with timeout error.",
          this._context.connectionId,
          delivery.id,
          Constants.defaultOperationTimeoutInMs
        );

        const e: AmqpError = {
          condition: ErrorNameConditionMapper.ServiceUnavailableError,
          description:
            "Operation to settle the message has timed out. The disposition of the " +
            "message may or may not be successful"
        };
        return reject(translate(e));
      }, Constants.defaultOperationTimeoutInMs);
      this._deliveryDispositionMap.set(delivery.id, {
        resolve: resolve,
        reject: reject,
        timer: timer
      });
      if (operation === DispositionType.complete) {
        delivery.accept();
      } else if (operation === DispositionType.abandon) {
        const params: any = {
          undeliverable_here: false
        };
        if (options.propertiesToModify) params.message_annotations = options.propertiesToModify;
        delivery.modified(params);
      } else if (operation === DispositionType.defer) {
        const params: any = {
          undeliverable_here: true
        };
        if (options.propertiesToModify) params.message_annotations = options.propertiesToModify;
        delivery.modified(params);
      } else if (operation === DispositionType.deadletter) {
        const error: AmqpError = {
          condition: Constants.deadLetterName,
          info: {
            ...options.propertiesToModify,
            DeadLetterReason: options.deadLetterReason,
            DeadLetterErrorDescription: options.deadLetterDescription
          }
        };
        delivery.reject(error);
      }
    });
  }
}
