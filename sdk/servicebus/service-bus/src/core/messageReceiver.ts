// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Constants,
  ErrorNameConditionMapper,
  MessagingError,
  RetryOptions,
} from "@azure/core-amqp";
import { AmqpError, EventContext, OnAmqpEvent, Receiver, ReceiverOptions } from "rhea-promise";
import { receiverLogger as logger } from "../log";
import { LinkEntity, ReceiverType } from "./linkEntity";
import { ConnectionContext } from "../connectionContext";
import { DispositionType, ServiceBusMessageImpl } from "../serviceBusMessage";
import { getUniqueName } from "../util/utils";
import { ProcessErrorArgs, ReceiveMode, SubscribeOptions } from "../models";
import { DispositionStatusOptions } from "./managementClient";
import { AbortSignalLike } from "@azure/abort-controller";
import {
  onMessageSettled,
  DeferredPromiseAndTimer,
  ReceiverHandlers,
  createReceiverOptions,
} from "./shared";
import { LockRenewer } from "./autoLockRenewer";
import { translateServiceBusError } from "../serviceBusError";

/**
 * @internal
 */
export interface OnAmqpEventAsPromise extends OnAmqpEvent {
  (context: EventContext): Promise<void>;
}

/**
 * @internal
 */
export interface ReceiveOptions extends SubscribeOptions {
  /**
   * The mode in which messages should be received.
   */
  receiveMode: ReceiveMode;
  /**
   * Retry policy options that determine the mode, number of retries, retry interval etc.
   */
  retryOptions?: RetryOptions;

  /**
   * A LockAutoRenewer that will automatically renew locks based on user specified interval.
   * This will be set if the user has chosen peekLock mode _and_ they've set a positive
   * maxAutoRenewLockDurationInMs value when they created their receiver.
   */
  lockRenewer: LockRenewer | undefined;
  /**
   * Option to disable the client from running JSON.parse() on the message body when receiving the message.
   * Not applicable if the message was sent with AMQP body type value or sequence. Use this option when you
   * prefer to work directly with the bytes present in the message body than have the client attempt to parse it.
   */
  skipParsingBodyAsJson: boolean;
}

/**
 * Describes the signature of the message handler passed to `registerMessageHandler` method.
 * @internal
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
 */
export interface OnError {
  /**
   * Handler for any error that occurs while receiving or processing messages.
   *
   * NOTE: if this signature changes make sure you reflect those same changes in the
   * `OnErrorNoContext` definition below.
   */
  (args: ProcessErrorArgs): void;
}

/**
 * An onError method but without the context property. Used when wrapping OnError
 * with an implicit ProcessErrorContext. Used by LockRenewer.
 *
 * @internal
 */
export interface OnErrorNoContext {
  (error: MessagingError | Error): void;
}

/**
 * @internal
 * Describes the MessageReceiver that will receive messages from ServiceBus.
 */
export abstract class MessageReceiver extends LinkEntity<Receiver> {
  /**
   * The type of receiver: "batching" or "streaming".
   */
  receiverType: ReceiverType;
  /**
   * The mode in which messages should be received.
   * Default: ReceiveMode.peekLock
   */
  receiveMode: ReceiveMode;
  /**
   * Indicates whether `Message.complete()` should be called
   * automatically after the message processing is complete while receiving messages with handlers.
   * Default: false.
   */
  autoComplete: boolean;
  /**
   * Maintains a map of deliveries that
   * are being actively disposed. It acts as a store for correlating the responses received for
   * active dispositions.
   */
  protected _deliveryDispositionMap: Map<number, DeferredPromiseAndTimer> = new Map<
    number,
    DeferredPromiseAndTimer
  >();

  /**
   * A lock renewer that handles message lock auto-renewal. This is undefined unless the user
   * has activated autolock renewal via ReceiveOptions. A single auto lock renewer is shared
   * for all links for a `ServiceBusReceiver` instance.
   */
  protected _lockRenewer: LockRenewer | undefined;

  constructor(
    context: ConnectionContext,
    entityPath: string,
    receiverType: ReceiverType,
    options: Omit<ReceiveOptions, "maxConcurrentCalls">
  ) {
    super(entityPath, entityPath, context, receiverType, logger, {
      address: entityPath,
      audience: `${context.config.endpoint}${entityPath}`,
    });

    this.receiverType = receiverType;
    this.receiveMode = options.receiveMode || "peekLock";

    // If explicitly set to false then autoComplete is false else true (default).
    this.autoComplete =
      options.autoCompleteMessages === false ? options.autoCompleteMessages : true;
    this._lockRenewer = options.lockRenewer;
  }

  /**
   * Creates the options that need to be specified while creating an AMQP receiver link.
   */
  protected _createReceiverOptions(
    useNewName: boolean,
    handlers: ReceiverHandlers
  ): ReceiverOptions {
    const rcvrOptions: ReceiverOptions = createReceiverOptions(
      useNewName ? getUniqueName(this.baseName) : this.name,
      this.receiveMode,
      {
        address: this.address,
      },
      {
        onSettled: (context: EventContext) => {
          return onMessageSettled(this.logPrefix, context.delivery, this._deliveryDispositionMap);
        },
        ...handlers,
      }
    );

    return rcvrOptions;
  }

  /**
   * Creates a new AMQP receiver under a new AMQP session.
   */
  protected async _init(options: ReceiverOptions, abortSignal?: AbortSignalLike): Promise<void> {
    try {
      await this.initLink(options, abortSignal);

      // It is possible for someone to close the receiver and then start it again.
      // Thus make sure that the receiver is present in the client cache.
      this._context.messageReceivers[this.name] = this as any;
    } catch (err) {
      const translatedError = translateServiceBusError(err);
      logger.logError(
        translatedError,
        "%s An error occured while creating the receiver",
        this.logPrefix
      );

      // Fix the unhelpful error messages for the OperationTimeoutError that comes from `rhea-promise`.
      if ((translatedError as MessagingError).code === "OperationTimeoutError") {
        translatedError.message =
          "Failed to create a receiver within allocated time and retry attempts.";
      }

      throw translatedError;
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
   * @param error - The error accompanying the receiver/session error or connection disconnected events
   */
  abstract onDetached(error?: AmqpError | Error): Promise<void>;

  /**
   * Clears lock renewal timers on all active messages, clears token remewal for current receiver,
   * removes current MessageReceiver instance from cache, and closes the underlying AMQP receiver.
   * @returns Promise<void>.
   */
  async close(): Promise<void> {
    this._lockRenewer?.stopAll(this);
    await super.close();
  }

  /**
   * Settles the message with the specified disposition.
   * @param message - The ServiceBus Message that needs to be settled.
   * @param operation - The disposition type.
   * @param options - Optional parameters that can be provided while disposing the message.
   */
  async settleMessage(
    message: ServiceBusMessageImpl,
    operation: DispositionType,
    options: DispositionStatusOptions
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (operation.match(/^(complete|abandon|defer|deadletter)$/) == null) {
        return reject(new Error(`operation: '${operation}' is not a valid operation.`));
      }
      this._lockRenewer?.stop(this, message);
      const delivery = message.delivery;
      const timer = setTimeout(() => {
        this._deliveryDispositionMap.delete(delivery.id);

        logger.verbose(
          "%s Disposition for delivery id: %d, did not complete in %d milliseconds. " +
            "Hence rejecting the promise with timeout error.",
          this.logPrefix,
          delivery.id,
          Constants.defaultOperationTimeoutInMs
        );

        const e: AmqpError = {
          condition: ErrorNameConditionMapper.ServiceUnavailableError,
          description:
            "Operation to settle the message has timed out. The disposition of the " +
            "message may or may not be successful",
        };
        return reject(translateServiceBusError(e));
      }, options.retryOptions?.timeoutInMs ?? Constants.defaultOperationTimeoutInMs);
      this._deliveryDispositionMap.set(delivery.id, {
        resolve: resolve,
        reject: reject,
        timer: timer,
      });
      if (operation === DispositionType.complete) {
        delivery.accept();
      } else if (operation === DispositionType.abandon) {
        const params: any = {
          undeliverable_here: false,
        };
        if (options.propertiesToModify) params.message_annotations = options.propertiesToModify;
        delivery.modified(params);
      } else if (operation === DispositionType.defer) {
        const params: any = {
          undeliverable_here: true,
        };
        if (options.propertiesToModify) params.message_annotations = options.propertiesToModify;
        delivery.modified(params);
      } else if (operation === DispositionType.deadletter) {
        const error: AmqpError = {
          condition: Constants.deadLetterName,
          info: {
            ...options.propertiesToModify,
            DeadLetterReason: options.deadLetterReason,
            DeadLetterErrorDescription: options.deadLetterDescription,
          },
        };
        delivery.reject(error);
      }
    });
  }
}
