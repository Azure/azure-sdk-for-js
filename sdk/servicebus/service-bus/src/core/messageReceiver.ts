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
import * as log from "../log";
import { LinkEntity } from "./linkEntity";
import { ClientEntityContext } from "../clientEntityContext";
import { DispositionType, InternalReceiveMode, ServiceBusMessageImpl } from "../serviceBusMessage";
import { getUniqueName, StandardAbortMessage } from "../util/utils";
import { MessageHandlerOptions } from "../models";
import { DispositionStatusOptions } from "./managementClient";
import { AbortSignalLike } from "@azure/core-http";
import { AbortError } from "@azure/abort-controller";
import { onMessageSettled, DeferredPromiseAndTimer } from "./shared";

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
 */
export interface OnAmqpEventAsPromise extends OnAmqpEvent {
  (context: EventContext): Promise<void>;
}

/**
 * @internal
 * @ignore
 */
export enum ReceiverType {
  batching = "batching",
  streaming = "streaming"
}

/**
 * @internal
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
 * Describes the MessageReceiver that will receive messages from ServiceBus.
 * @class MessageReceiver
 */
export class MessageReceiver extends LinkEntity {
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
   * @property {number} maxAutoRenewDurationInMs The maximum duration within which the
   * lock will be renewed automatically. This value should be greater than the longest message
   * lock duration; for example, the `lockDuration` property on the received message.
   *
   * Default: `300 * 1000` (5 minutes);
   */
  maxAutoRenewDurationInMs: number;
  /**
   * @property {boolean} autoRenewLock Should lock renewal happen automatically.
   */
  autoRenewLock: boolean;
  /**
   * @property {Receiver} [_receiver] The AMQP receiver link.
   */
  protected _receiver?: Receiver;
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
  /**
   * @property {boolean} wasCloseInitiated Denotes if receiver was explicitly closed by user.
   */
  protected wasCloseInitiated?: boolean;
  /**
   * @property {Map<string, Function>} _messageRenewLockTimers Maintains a map of messages for which
   * the lock is automatically renewed.
   */
  protected _messageRenewLockTimers: Map<string, NodeJS.Timer | undefined> = new Map<
    string,
    NodeJS.Timer | undefined
  >();
  /**
   * @property {Function} _clearMessageLockRenewTimer Clears the message lock renew timer for a
   * specific messageId.
   */
  protected _clearMessageLockRenewTimer: (messageId: string) => void;
  /**
   * @property {Function} _clearMessageLockRenewTimer Clears the message lock renew timer for all
   * the active messages.
   */
  protected _clearAllMessageLockRenewTimers: () => void;

  constructor(
    context: ClientEntityContext,
    receiverType: ReceiverType,
    options?: Omit<ReceiveOptions, "maxConcurrentCalls">
  ) {
    super(context.entityPath, context, {
      address: context.entityPath,
      audience: `${context.namespace.config.endpoint}${context.entityPath}`
    });

    if (!options) options = {};
    this.wasCloseInitiated = false;
    this.receiverType = receiverType;
    this.receiveMode = options.receiveMode || InternalReceiveMode.peekLock;

    // If explicitly set to false then autoComplete is false else true (default).
    this.autoComplete = options.autoComplete === false ? options.autoComplete : true;
    this.maxAutoRenewDurationInMs =
      options.maxMessageAutoRenewLockDurationInMs != null
        ? options.maxMessageAutoRenewLockDurationInMs
        : 300 * 1000;
    this.autoRenewLock =
      this.maxAutoRenewDurationInMs > 0 && this.receiveMode === InternalReceiveMode.peekLock;
    this._clearMessageLockRenewTimer = (messageId: string) => {
      if (this._messageRenewLockTimers.has(messageId)) {
        clearTimeout(this._messageRenewLockTimers.get(messageId) as NodeJS.Timer);
        log.receiver(
          "[%s] Cleared the message renew lock timer for message with id '%s'.",
          this._context.namespace.connectionId,
          messageId
        );
        this._messageRenewLockTimers.delete(messageId);
      }
    };
    this._clearAllMessageLockRenewTimers = () => {
      log.receiver(
        "[%s] Clearing message renew lock timers for all the active messages.",
        this._context.namespace.connectionId
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
      name: useNewName ? getUniqueName(this._context.entityPath) : this.name,
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
          this._context.namespace.connection.id,
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
    const checkAborted = (): void => {
      if (abortSignal?.aborted) {
        throw new AbortError(StandardAbortMessage);
      }
    };

    const connectionId = this._context.namespace.connectionId;

    checkAborted();

    try {
      if (!this.isOpen() && !this.isConnecting) {
        if (this.wasCloseInitiated) {
          // in track 1 we'll maintain backwards compatible behavior for the codebase and
          // just treat this as a no-op. There are cases, like in onDetached, where throwing
          // an error here could have unintended consequences.
          return;
        }

        log.error(
          "[%s] The receiver '%s' with address '%s' is not open and is not currently " +
            "establishing itself. Hence let's try to connect.",
          connectionId,
          this.name,
          this.address
        );

        if (options && options.name) {
          this.name = options.name;
        }

        this.isConnecting = true;

        await this._negotiateClaim();
        checkAborted();

        log.error(
          "[%s] Trying to create receiver '%s' with options %O",
          connectionId,
          this.name,
          options
        );

        this._receiver = await this._context.namespace.connection.createReceiver(options);

        this.isConnecting = false;
        checkAborted();

        log.error(
          "[%s] Receiver '%s' with address '%s' has established itself.",
          connectionId,
          this.name,
          this.address
        );
        log[this.receiverType](
          "Promise to create the receiver resolved. " + "Created receiver with name: ",
          this.name
        );
        log[this.receiverType](
          "[%s] Receiver '%s' created with receiver options: %O",
          connectionId,
          this.name,
          options
        );
        // It is possible for someone to close the receiver and then start it again.
        // Thus make sure that the receiver is present in the client cache.
        if (this.receiverType === ReceiverType.streaming && !this._context.streamingReceiver) {
          this._context.streamingReceiver = this as any;
        } else if (this.receiverType === ReceiverType.batching && !this._context.batchingReceiver) {
          this._context.batchingReceiver = this as any;
        }
        this._ensureTokenRenewal();
      } else {
        log.error(
          "[%s] The receiver '%s' with address '%s' is open -> %s and is connecting " +
            "-> %s. Hence not reconnecting.",
          connectionId,
          this.name,
          this.address,
          this.isOpen(),
          this.isConnecting
        );
      }
    } catch (err) {
      this.isConnecting = false;
      err = translate(err);
      log.error(
        "[%s] An error occured while creating the receiver '%s': %O",
        this._context.namespace.connectionId,
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

  protected _deleteFromCache(): void {
    this._receiver = undefined;
    if (this.receiverType === ReceiverType.streaming) {
      this._context.streamingReceiver = undefined;
    } else if (this.receiverType === ReceiverType.batching) {
      this._context.batchingReceiver = undefined;
    }
    log.error(
      "[%s] Deleted the receiver '%s' from the client cache.",
      this._context.namespace.connectionId,
      this.name
    );
  }

  /**
   * Closes the underlying AMQP receiver.
   * @return {Promise<void>} Promise<void>.
   */
  async close(): Promise<void> {
    this.wasCloseInitiated = true;
    log.receiver(
      "[%s] Closing the [%s]Receiver for entity '%s'.",
      this._context.namespace.connectionId,
      this.receiverType,
      this._context.entityPath
    );
    this._clearAllMessageLockRenewTimers();
    if (this._receiver) {
      const receiverLink = this._receiver;
      this._deleteFromCache();
      await this._closeLink(receiverLink);
    }
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

        log.receiver(
          "[%s] Disposition for delivery id: %d, did not complete in %d milliseconds. " +
            "Hence rejecting the promise with timeout error.",
          this._context.namespace.connectionId,
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

  /**
   * Determines whether the AMQP receiver link is open. If open then returns true else returns false.
   * @return {boolean} boolean
   */
  isOpen(): boolean {
    const result: boolean = this._receiver! && this._receiver!.isOpen();
    log.error(
      "[%s] Receiver '%s' with address '%s' is open? -> %s",
      this._context.namespace.connectionId,
      this.name,
      this.address,
      result
    );
    return result;
  }
}
