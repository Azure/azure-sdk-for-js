// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 as uuid } from "uuid";
import { logErrorStackTrace, logger } from "./log";
import {
  AmqpError,
  AwaitableSender,
  AwaitableSenderOptions,
  EventContext,
  OnAmqpEvent,
  message,
  Message as RheaMessage
} from "rhea-promise";
import {
  delay,
  ErrorNameConditionMapper,
  RetryConfig,
  RetryOperationType,
  RetryOptions,
  defaultLock,
  retry,
  translate
} from "@azure/core-amqp";
import { EventData, toRheaMessage } from "./eventData";
import { ConnectionContext } from "./connectionContext";
import { LinkEntity } from "./linkEntity";
import { EventHubProducerOptions } from "./models/private";
import { SendOptions } from "./models/public";

import { getRetryAttemptTimeoutInMs } from "./util/retries";
import { AbortSignalLike } from "@azure/abort-controller";
import { EventDataBatch, isEventDataBatch } from "./eventDataBatch";
import { defaultDataTransformer } from "./dataTransformer";
import { waitForTimeoutOrAbortOrResolve } from "./util/timeoutAbortSignalUtils";
/**
 * Describes the EventHubSender that will send event data to EventHub.
 * @internal
 */
export class EventHubSender extends LinkEntity {
  /**
   * The unique lock name per connection that is used to acquire the
   * lock for establishing a sender link by an entity on that connection.
   * @readonly
   */
  readonly senderLock: string = `sender-${uuid()}`;
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
  /**
   * The AMQP sender link.
   */
  private _sender?: AwaitableSender;

  /**
   * Creates a new EventHubSender instance.
   * @hidden
   * @param context - The connection context.
   * @param partitionId - The EventHub partition id to which the sender
   * wants to send the event data.
   */
  constructor(context: ConnectionContext, partitionId?: string) {
    super(context, {
      name: context.config.getSenderAddress(partitionId),
      partitionId: partitionId
    });
    this.address = context.config.getSenderAddress(partitionId);
    this.audience = context.config.getSenderAudience(partitionId);

    this._onAmqpError = (eventContext: EventContext) => {
      const senderError = eventContext.sender && eventContext.sender.error;
      logger.verbose(
        "[%s] 'sender_error' event occurred on the sender '%s' with address '%s'. " +
          "The associated error is: %O",
        this._context.connectionId,
        this.name,
        this.address,
        senderError
      );
      // TODO: Consider rejecting promise in trySendBatch() or createBatch()
    };

    this._onSessionError = (eventContext: EventContext) => {
      const sessionError = eventContext.session && eventContext.session.error;
      logger.verbose(
        "[%s] 'session_error' event occurred on the session of sender '%s' with address '%s'. " +
          "The associated error is: %O",
        this._context.connectionId,
        this.name,
        this.address,
        sessionError
      );
      // TODO: Consider rejecting promise in trySendBatch() or createBatch()
    };

    this._onAmqpClose = async (eventContext: EventContext) => {
      const sender = this._sender || eventContext.sender!;
      logger.verbose(
        "[%s] 'sender_close' event occurred on the sender '%s' with address '%s'. " +
          "Value for isItselfClosed on the receiver is: '%s' " +
          "Value for isConnecting on the session is: '%s'.",
        this._context.connectionId,
        this.name,
        this.address,
        sender ? sender.isItselfClosed().toString() : undefined,
        this.isConnecting
      );
      if (sender && !this.isConnecting) {
        // Call close to clean up timers & other resources
        await sender.close().catch((err) => {
          logger.verbose(
            "[%s] Error when closing sender [%s] after 'sender_close' event: %O",
            this._context.connectionId,
            this.name,
            err
          );
        });
      }
    };

    this._onSessionClose = async (eventContext: EventContext) => {
      const sender = this._sender || eventContext.sender!;
      logger.verbose(
        "[%s] 'session_close' event occurred on the session of sender '%s' with address '%s'. " +
          "Value for isSessionItselfClosed on the session is: '%s' " +
          "Value for isConnecting on the session is: '%s'.",
        this._context.connectionId,
        this.name,
        this.address,
        sender ? sender.isSessionItselfClosed().toString() : undefined,
        this.isConnecting
      );
      if (sender && !this.isConnecting) {
        // Call close to clean up timers & other resources
        await sender.close().catch((err) => {
          logger.verbose(
            "[%s] Error when closing sender [%s] after 'session_close' event: %O",
            this._context.connectionId,
            this.name,
            err
          );
        });
      }
    };
  }

  /**
   * Deletes the sender from the context. Clears the token renewal timer. Closes the sender link.
   * @hidden
   * @returns Promise<void>
   */
  async close(): Promise<void> {
    try {
      if (this._sender) {
        logger.info(
          "[%s] Closing the Sender for the entity '%s'.",
          this._context.connectionId,
          this._context.config.entityPath
        );
        const senderLink = this._sender;
        this._deleteFromCache();
        await this._closeLink(senderLink);
      }
    } catch (err) {
      const msg = `[${this._context.connectionId}] An error occurred while closing sender ${this.name}: ${err?.name}: ${err?.message}`;
      logger.warning(msg);
      logErrorStackTrace(err);
      throw err;
    }
  }

  /**
   * Determines whether the AMQP sender link is open. If open then returns true else returns false.
   * @hidden
   * @returns boolean
   */
  isOpen(): boolean {
    const result: boolean = this._sender! && this._sender!.isOpen();
    logger.verbose(
      "[%s] Sender '%s' with address '%s' is open? -> %s",
      this._context.connectionId,
      this.name,
      this.address,
      result
    );
    return result;
  }
  /**
   * Returns maximum message size on the AMQP sender link.
   * @param abortSignal - An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   * @returns Promise<number>
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  async getMaxMessageSize(
    options: {
      retryOptions?: RetryOptions;
      abortSignal?: AbortSignalLike;
    } = {}
  ): Promise<number> {
    await this._createLinkIfNotOpen(options);

    return this._sender!.maxMessageSize;
  }

  /**
   * Send a batch of EventData to the EventHub. The "message_annotations",
   * "application_properties" and "properties" of the first message will be set as that
   * of the envelope (batch message).
   * @hidden
   * @param events -  An array of EventData objects to be sent in a Batch message.
   * @param options - Options to control the way the events are batched along with request options
   */
  async send(
    events: EventData[] | EventDataBatch,
    options?: SendOptions & EventHubProducerOptions
  ): Promise<void> {
    try {
      logger.info(
        "[%s] Sender '%s', trying to send EventData[].",
        this._context.connectionId,
        this.name
      );

      let encodedBatchMessage: Buffer | undefined;
      if (isEventDataBatch(events)) {
        if (events.count === 0) {
          logger.info(
            `[${this._context.connectionId}] Empty batch was passsed. No events to send.`
          );
          return;
        }
        encodedBatchMessage = events._generateMessage();
      } else {
        if (events.length === 0) {
          logger.info(`[${this._context.connectionId}] Empty array was passed. No events to send.`);
          return;
        }
        const partitionKey = (options && options.partitionKey) || undefined;
        const messages: RheaMessage[] = [];
        // Convert EventData to RheaMessage.
        for (let i = 0; i < events.length; i++) {
          const rheaMessage = toRheaMessage(events[i], partitionKey);
          rheaMessage.body = defaultDataTransformer.encode(events[i].body);
          messages[i] = rheaMessage;
        }
        // Encode every amqp message and then convert every encoded message to amqp data section
        const batchMessage: RheaMessage = {
          body: message.data_sections(messages.map(message.encode))
        };

        // Set message_annotations of the first message as
        // that of the envelope (batch message).
        if (messages[0].message_annotations) {
          batchMessage.message_annotations = messages[0].message_annotations;
        }

        // Finally encode the envelope (batch message).
        encodedBatchMessage = message.encode(batchMessage);
      }
      logger.info(
        "[%s] Sender '%s', sending encoded batch message.",
        this._context.connectionId,
        this.name,
        encodedBatchMessage
      );
      return await this._trySendBatch(encodedBatchMessage, options);
    } catch (err) {
      logger.warning(
        `An error occurred while sending the batch message ${err?.name}: ${err?.message}`
      );
      logErrorStackTrace(err);
      throw err;
    }
  }

  private _deleteFromCache(): void {
    this._sender = undefined;
    delete this._context.senders[this.name];
    logger.verbose(
      "[%s] Deleted the sender '%s' with address '%s' from the client cache.",
      this._context.connectionId,
      this.name,
      this.address
    );
  }

  private _createSenderOptions(timeoutInMs: number, newName?: boolean): AwaitableSenderOptions {
    if (newName) this.name = `${uuid()}`;
    const srOptions: AwaitableSenderOptions = {
      name: this.name,
      target: {
        address: this.address
      },
      onError: this._onAmqpError,
      onClose: this._onAmqpClose,
      onSessionError: this._onSessionError,
      onSessionClose: this._onSessionClose,
      sendTimeoutInSeconds: timeoutInMs / 1000
    };
    logger.verbose("Creating sender with options: %O", srOptions);
    return srOptions;
  }

  /**
   * Tries to send the message to EventHub if there is enough credit to send them
   * and the circular buffer has available space to settle the message after sending them.
   *
   * We have implemented a synchronous send over here in the sense that we shall be waiting
   * for the message to be accepted or rejected and accordingly resolve or reject the promise.
   * @hidden
   * @param rheaMessage - The message to be sent to EventHub.
   * @returns Promise<void>
   */
  private async _trySendBatch(
    rheaMessage: RheaMessage | Buffer,
    options: SendOptions & EventHubProducerOptions = {}
  ): Promise<void> {
    const abortSignal: AbortSignalLike | undefined = options.abortSignal;
    const retryOptions = options.retryOptions || {};
    const timeoutInMs = getRetryAttemptTimeoutInMs(retryOptions);
    retryOptions.timeoutInMs = timeoutInMs;

    const initStartTime = Date.now();
    await this._createLinkIfNotOpen(options);
    const timeTakenByInit = Date.now() - initStartTime;

    const sendEventPromise = async (): Promise<void> => {
      logger.verbose(
        "[%s] Sender '%s', credit: %d available: %d",
        this._context.connectionId,
        this.name,
        this._sender!.credit,
        this._sender!.session.outgoing.available()
      );

      if (!this._sender!.sendable()) {
        logger.verbose(
          "%s Sender '%s', waiting for 1 second for sender to become sendable",
          this._context.connectionId,
          this.name
        );

        await delay(1000);

        logger.verbose(
          "%s Sender '%s' after waiting for a second, credit: %d available: %d",
          this._context.connectionId,
          this.name,
          this._sender!.credit,
          this._sender!.session?.outgoing?.available()
        );
      }

      if (!this._sender!.sendable()) {
        // let us retry to send the message after some time.
        const msg =
          `[${this._context.connectionId}] Sender "${this.name}", ` +
          `cannot send the message right now. Please try later.`;
        logger.warning(msg);
        const amqpError: AmqpError = {
          condition: ErrorNameConditionMapper.SenderBusyError,
          description: msg
        };
        throw translate(amqpError);
      }

      logger.verbose(
        "[%s] Sender '%s', sending message with id '%s'.",
        this._context.connectionId,
        this.name
      );
      if (timeoutInMs <= timeTakenByInit) {
        const desc: string =
          `${this._context.connectionId} Sender "${this.name}" ` +
          `with address "${this.address}", was not able to send the message right now, due ` +
          `to operation timeout.`;
        logger.warning(desc);
        const e: AmqpError = {
          condition: ErrorNameConditionMapper.ServiceUnavailableError,
          description: desc
        };
        throw translate(e);
      }

      this._sender!.sendTimeoutInSeconds = (timeoutInMs - timeTakenByInit) / 1000;
      try {
        const delivery = await this._sender!.send(rheaMessage, undefined, 0x80013700, {
          abortSignal
        });
        logger.info(
          "[%s] Sender '%s', sent message with delivery id: %d",
          this._context.connectionId,
          this.name,
          delivery.id
        );
      } catch (err) {
        throw err.innerError || err;
      }
    };

    const config: RetryConfig<void> = {
      operation: sendEventPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.sendMessage,
      abortSignal: abortSignal,
      retryOptions: retryOptions
    };

    try {
      await retry<void>(config);
    } catch (err) {
      const translatedError = translate(err);
      logger.warning(
        "[%s] Sender '%s', An error occurred while sending the message %s",
        this._context.connectionId,
        this.name,
        `${translatedError?.name}: ${translatedError?.message}`
      );
      logErrorStackTrace(translatedError);
      throw translatedError;
    }
  }

  private async _createLinkIfNotOpen(
    options: {
      retryOptions?: RetryOptions;
      abortSignal?: AbortSignalLike;
    } = {}
  ): Promise<void> {
    if (this.isOpen()) {
      return;
    }
    const retryOptions = options.retryOptions || {};
    const timeoutInMs = getRetryAttemptTimeoutInMs(retryOptions);
    retryOptions.timeoutInMs = timeoutInMs;
    const senderOptions = this._createSenderOptions(timeoutInMs);

    const createLinkPromise = async (): Promise<void> => {
      return waitForTimeoutOrAbortOrResolve({
        actionFn: () => {
          return defaultLock.acquire(this.senderLock, () => {
            return this._init(senderOptions);
          });
        },
        abortSignal: options?.abortSignal,
        timeoutMs: timeoutInMs,
        timeoutMessage:
          `[${this._context.connectionId}] Sender "${this.name}" ` +
          `with address "${this.address}", cannot be created right now, due ` +
          `to operation timeout.`
      });
    };

    const config: RetryConfig<void> = {
      operation: createLinkPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.senderLink,
      abortSignal: options.abortSignal,
      retryOptions: retryOptions
    };

    try {
      await retry<void>(config);
    } catch (err) {
      const translatedError = translate(err);
      logger.warning(
        "[%s] An error occurred while creating the sender %s: %s",
        this._context.connectionId,
        this.name,
        `${translatedError?.name}: ${translatedError?.message}`
      );
      logErrorStackTrace(translatedError);
      throw translatedError;
    }
  }

  /**
   * Initializes the sender session on the connection.
   * @hidden
   */
  private async _init(options: AwaitableSenderOptions): Promise<void> {
    try {
      if (!this.isOpen() && !this.isConnecting) {
        this.isConnecting = true;

        // Wait for the connectionContext to be ready to open the link.
        await this._context.readyToOpenLink();
        await this._negotiateClaim();

        logger.verbose(
          "[%s] Trying to create sender '%s'...",
          this._context.connectionId,
          this.name
        );

        this._sender = await this._context.connection.createAwaitableSender(options);
        this.isConnecting = false;
        logger.verbose(
          "[%s] Sender '%s' created with sender options: %O",
          this._context.connectionId,
          this.name,
          options
        );
        this._sender.setMaxListeners(1000);

        // It is possible for someone to close the sender and then start it again.
        // Thus make sure that the sender is present in the client cache.
        if (!this._context.senders[this.name]) this._context.senders[this.name] = this;
        await this._ensureTokenRenewal();
      } else {
        logger.verbose(
          "[%s] The sender '%s' with address '%s' is open -> %s and is connecting " +
            "-> %s. Hence not reconnecting.",
          this._context.connectionId,
          this.name,
          this.address,
          this.isOpen(),
          this.isConnecting
        );
      }
    } catch (err) {
      this.isConnecting = false;
      const translatedError = translate(err);
      logger.warning(
        "[%s] An error occurred while creating the sender %s: %s",
        this._context.connectionId,
        this.name,
        `${translatedError?.name}: ${translatedError?.message}`
      );
      logErrorStackTrace(translatedError);
      throw translatedError;
    }
  }

  /**
   * Creates a new sender to the given event hub, and optionally to a given partition if it is
   * not present in the context or returns the one present in the context.
   * @hidden
   * @param partitionId - Partition ID to which it will send event data.
   */
  static create(context: ConnectionContext, partitionId?: string): EventHubSender {
    const ehSender: EventHubSender = new EventHubSender(context, partitionId);
    if (!context.senders[ehSender.name]) {
      context.senders[ehSender.name] = ehSender;
    }
    return context.senders[ehSender.name];
  }
}
