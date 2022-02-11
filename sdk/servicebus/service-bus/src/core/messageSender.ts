// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { senderLogger as logger } from "../log";
import {
  AmqpError,
  AwaitableSender,
  AwaitableSenderOptions,
  EventContext,
  OnAmqpEvent,
  message as RheaMessageUtil,
} from "rhea-promise";
import {
  Constants,
  ErrorNameConditionMapper,
  MessagingError,
  RetryConfig,
  RetryOperationType,
  RetryOptions,
  delay,
  retry,
  AmqpAnnotatedMessage,
} from "@azure/core-amqp";
import { ServiceBusMessage, toRheaMessage } from "../serviceBusMessage";
import { ConnectionContext } from "../connectionContext";
import { LinkEntity } from "./linkEntity";
import { getUniqueName, waitForTimeoutOrAbortOrResolve } from "../util/utils";
import { throwErrorIfConnectionClosed } from "../util/errors";
import { ServiceBusMessageBatch, ServiceBusMessageBatchImpl } from "../serviceBusMessageBatch";
import { CreateMessageBatchOptions } from "../models";
import { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";
import { AbortSignalLike } from "@azure/abort-controller";
import { ServiceBusError, translateServiceBusError } from "../serviceBusError";
import { isDefined } from "../util/typeGuards";
import { defaultDataTransformer } from "../dataTransformer";

/**
 * @internal
 * Describes the MessageSender that will send messages to ServiceBus.
 */
export class MessageSender extends LinkEntity<AwaitableSender> {
  /**
   * The handler function to handle errors that happen on the
   * underlying sender.
   * @readonly
   */
  private readonly _onAmqpError: OnAmqpEvent;
  /**
   * The handler function to handle "sender_close" event
   * that happens on the underlying sender.
   * @readonly
   */
  private readonly _onAmqpClose: OnAmqpEvent;
  /**
   * The message handler that will be set as the handler on
   * the underlying rhea sender's session for the "session_error" event.
   */
  private _onSessionError: OnAmqpEvent;
  /**
   * The message handler that will be set as the handler on
   * the underlying rhea sender's session for the "session_close" event.
   */
  private _onSessionClose: OnAmqpEvent;
  private _retryOptions: RetryOptions;

  constructor(
    connectionContext: ConnectionContext,
    entityPath: string,
    retryOptions: RetryOptions
  ) {
    super(entityPath, entityPath, connectionContext, "sender", logger, {
      address: entityPath,
      audience: `${connectionContext.config.endpoint}${entityPath}`,
    });
    this._retryOptions = retryOptions;
    this._onAmqpError = (context: EventContext) => {
      const senderError = context.sender && context.sender.error;
      logger.logError(
        senderError,
        "%s 'sender_error' event occurred on the sender '%s' with address '%s'. " +
          "The associated error",
        this.logPrefix,
        this.name,
        this.address
      );
      // TODO: Consider rejecting promise in trySendBatch() or createBatch()
    };

    this._onSessionError = (context: EventContext) => {
      const sessionError = context.session && context.session.error;
      logger.logError(
        sessionError,
        "%s 'session_error' event occurred on the session of sender '%s' with address '%s'. " +
          "The associated error",
        this.logPrefix,
        this.name,
        this.address
      );
      // TODO: Consider rejecting promise in trySendBatch() or createBatch()
    };

    this._onAmqpClose = async (context: EventContext) => {
      const senderError = context.sender && context.sender.error;

      logger.logError(
        senderError,
        `${this.logPrefix} 'sender_close' event occurred. The associated error is`
      );

      await this.onDetached().catch((err) => {
        logger.logError(
          err,
          `${this.logPrefix} error when closing sender after 'sender_close' event`
        );
      });
    };

    this._onSessionClose = async (context: EventContext) => {
      const sessionError = context.session && context.session.error;

      logger.logError(
        sessionError,
        `${this.logPrefix} 'session_close' event occurred. The associated error is`
      );

      await this.onDetached().catch((err) => {
        logger.logError(
          err,
          `${this.logPrefix} error when closing sender after 'session_close' event`
        );
      });
    };
  }

  private _createSenderOptions(newName?: boolean): AwaitableSenderOptions {
    if (newName) this.name = getUniqueName(this.baseName);
    const srOptions: AwaitableSenderOptions = {
      name: this.name,
      target: {
        address: this.address,
      },
      onError: this._onAmqpError,
      onClose: this._onAmqpClose,
      onSessionError: this._onSessionError,
      onSessionClose: this._onSessionClose,
    };
    logger.verbose(`${this.logPrefix} Creating sender with options: %O`, srOptions);
    return srOptions;
  }

  /**
   * Tries to send the message to ServiceBus if there is enough credit to send them
   * and the circular buffer has available space to settle the message after sending them.
   *
   * We have implemented a synchronous send over here in the sense that we shall be waiting
   * for the message to be accepted or rejected and accordingly resolve or reject the promise.
   *
   * @param encodedMessage - The encoded message to be sent to ServiceBus.
   * @param sendBatch - Boolean indicating whether the encoded message represents a batch of messages or not
   */
  private _trySend(
    encodedMessage: Buffer,
    sendBatch: boolean,
    options: OperationOptionsBase | undefined
  ): Promise<void> {
    const abortSignal = options?.abortSignal;
    const timeoutInMs = !isDefined(this._retryOptions.timeoutInMs)
      ? Constants.defaultOperationTimeoutInMs
      : this._retryOptions.timeoutInMs;

    const sendEventPromise = async (): Promise<void> => {
      const initStartTime = Date.now();
      if (!this.isOpen()) {
        try {
          await waitForTimeoutOrAbortOrResolve({
            actionFn: () => this.open(undefined, options?.abortSignal),
            abortSignal: options?.abortSignal,
            timeoutMs: timeoutInMs,
            timeoutMessage:
              `[${this._context.connectionId}] Sender "${this.name}" ` +
              `with address "${this.address}", was not able to send the message right now, due ` +
              `to operation timeout.`,
          });
        } catch (err) {
          const translatedError = translateServiceBusError(err);
          logger.logError(
            translatedError,
            "%s An error occurred while creating the sender",
            this.logPrefix,
            this.name
          );
          throw translatedError;
        }
      }

      const timeTakenByInit = Date.now() - initStartTime;

      logger.verbose(
        "%s Sender '%s', credit: %d available: %d",
        this.logPrefix,
        this.name,
        this.link?.credit,
        this.link?.session?.outgoing?.available()
      );

      let waitTimeForSendable = 1000;
      if (!this.link?.sendable() && timeoutInMs - timeTakenByInit > waitTimeForSendable) {
        logger.verbose(
          "%s Sender '%s', waiting for 1 second for sender to become sendable",
          this.logPrefix,
          this.name
        );

        await delay(waitTimeForSendable);

        logger.verbose(
          "%s Sender '%s' after waiting for a second, credit: %d available: %d",
          this.logPrefix,
          this.name,
          this.link?.credit,
          this.link?.session?.outgoing?.available()
        );
      } else {
        waitTimeForSendable = 0;
      }

      if (!this.link?.sendable()) {
        // let us retry to send the message after some time.
        const msg =
          `[${this.logPrefix}] Sender "${this.name}", ` +
          `cannot send the message right now. Please try later.`;
        logger.warning(msg);
        const amqpError: AmqpError = {
          condition: ErrorNameConditionMapper.SenderBusyError,
          description: msg,
        };
        throw translateServiceBusError(amqpError);
      }

      if (timeoutInMs <= timeTakenByInit + waitTimeForSendable) {
        const desc: string =
          `${this.logPrefix} Sender "${this.name}" ` +
          `with address "${this.address}", was not able to send the message right now, due ` +
          `to operation timeout.`;
        logger.warning(desc);
        const e: AmqpError = {
          condition: ErrorNameConditionMapper.ServiceUnavailableError,
          description: desc,
        };
        throw translateServiceBusError(e);
      }

      try {
        const delivery = await this.link!.send(encodedMessage, {
          format: sendBatch ? 0x80013700 : 0,
          timeoutInSeconds: (timeoutInMs - timeTakenByInit - waitTimeForSendable) / 1000,
          abortSignal,
        });
        logger.verbose(
          "%s Sender '%s', sent message with delivery id: %d",
          this.logPrefix,
          this.name,
          delivery.id
        );
      } catch (error) {
        const translatedError = translateServiceBusError(error.innerError || error);
        logger.logError(
          translatedError,
          `${this.logPrefix} An error occurred while sending the message`
        );
        throw translatedError;
      }
    };
    const config: RetryConfig<void> = {
      operation: sendEventPromise,
      connectionId: this._context.connectionId!,
      operationType: RetryOperationType.sendMessage,
      retryOptions: this._retryOptions,
      abortSignal: abortSignal,
    };

    return retry<void>(config);
  }

  protected createRheaLink(options: AwaitableSenderOptions): Promise<AwaitableSender> {
    return this._context.connection.createAwaitableSender(options);
  }

  /**
   * Initializes the sender session on the connection.
   */
  public async open(
    options?: AwaitableSenderOptions,
    abortSignal?: AbortSignalLike
  ): Promise<void> {
    try {
      if (!options) {
        options = this._createSenderOptions();
      }
      await this.initLink(options, abortSignal);
    } catch (err) {
      const translatedError = translateServiceBusError(err);
      logger.logError(
        translatedError,
        `${this.logPrefix} An error occurred while creating the sender`
      );
      // Fix the unhelpful error messages for the OperationTimeoutError that comes from `rhea-promise`.
      if ((translatedError as MessagingError).code === "OperationTimeoutError") {
        translatedError.message =
          "Failed to create a sender within allocated time and retry attempts.";
      }
      throw translatedError;
    }
  }

  /**
   * Closes the rhea link.
   * To be called when connection is disconnected, onAmqpClose and onSessionClose events.
   */
  async onDetached(): Promise<void> {
    // Clears the token renewal timer. Closes the link and its session if they are open.
    // Removes the link and its session if they are present in rhea's cache.
    await this.closeLink();
  }

  /**
   * Determines whether the AMQP sender link is open. If open then returns true else returns false.
   */
  isOpen(): boolean {
    const result: boolean = this.link == null ? false : this.link.isOpen();
    logger.verbose(
      "%s Sender '%s' with address '%s' is open? -> %s",
      this.logPrefix,
      this.name,
      this.address,
      result
    );
    return result;
  }

  /**
   * Sends the given message, with the given options on this link
   *
   * @param data - Message to send. Will be sent as UTF8-encoded JSON string.
   */
  async send(
    data: ServiceBusMessage | AmqpAnnotatedMessage,
    options?: OperationOptionsBase
  ): Promise<void> {
    throwErrorIfConnectionClosed(this._context);
    try {
      const amqpMessage = toRheaMessage(data, defaultDataTransformer);

      // TODO: this body of logic is really similar to what's in sendMessages. Unify what we can.
      const encodedMessage = RheaMessageUtil.encode(amqpMessage);
      logger.verbose("%s Sender '%s', trying to send message: %O", this.logPrefix, this.name, data);
      return await this._trySend(encodedMessage, false, options);
    } catch (err) {
      logger.logError(
        err,
        "%s An error occurred while sending the message: %O\nError",
        this.logPrefix,
        data
      );
      throw err;
    }
  }

  /**
   * Returns maximum message size on the AMQP sender link.
   *
   * Options to configure the `createBatch` method on the `Sender`.
   * - `maxSizeInBytes`: The upper limit for the size of batch.
   *
   * Example usage:
   * ```js
   * {
   *     retryOptions: { maxRetries: 5; timeoutInMs: 10 }
   * }
   * ```
   */
  async getMaxMessageSize(
    options: {
      retryOptions?: RetryOptions;
    } & Pick<OperationOptionsBase, "abortSignal"> = {}
  ): Promise<number> {
    const retryOptions = options.retryOptions || {};
    if (this.isOpen()) {
      return this.link!.maxMessageSize;
    }

    const config: RetryConfig<number> = {
      operation: async () => {
        await this.open(undefined, options?.abortSignal);

        if (this.link) {
          return this.link.maxMessageSize;
        }

        throw new ServiceBusError(
          "Link failed to initialize, cannot get max message size.",
          "GeneralError"
        );
      },
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.senderLink,
      retryOptions: retryOptions,
      abortSignal: options?.abortSignal,
    };

    return retry(config);
  }

  async createBatch(options?: CreateMessageBatchOptions): Promise<ServiceBusMessageBatch> {
    throwErrorIfConnectionClosed(this._context);
    let maxMessageSize = await this.getMaxMessageSize({
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal,
    });
    if (options?.maxSizeInBytes) {
      if (options.maxSizeInBytes > maxMessageSize!) {
        const error = new Error(
          `Max message size (${options.maxSizeInBytes} bytes) is greater than maximum message size (${maxMessageSize} bytes) on the AMQP sender link.`
        );
        throw error;
      }
      maxMessageSize = options.maxSizeInBytes;
    }
    return new ServiceBusMessageBatchImpl(this._context, maxMessageSize!);
  }

  async sendBatch(
    batchMessage: ServiceBusMessageBatch,
    options?: OperationOptionsBase
  ): Promise<void> {
    throwErrorIfConnectionClosed(this._context);
    try {
      logger.verbose(
        "%s Sender '%s', sending encoded batch message.",
        this.logPrefix,
        this.name,
        batchMessage
      );
      return await this._trySend(batchMessage._generateMessage(), true, options);
    } catch (err) {
      logger.logError(
        err,
        "%s Sender '%s': An error occurred while sending the messages: %O\nError",
        this.logPrefix,
        this.name,
        batchMessage
      );
      throw err;
    }
  }

  static create(
    context: ConnectionContext,
    entityPath: string,
    retryOptions: RetryOptions
  ): MessageSender {
    throwErrorIfConnectionClosed(context);

    const sbSender = new MessageSender(context, entityPath, retryOptions);
    context.senders[sbSender.name] = sbSender;
    return sbSender;
  }

  protected removeLinkFromContext(): void {
    delete this._context.senders[this.name];
  }
}
