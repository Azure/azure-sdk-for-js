// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AmqpError,
  AwaitableSender,
  AwaitableSenderOptions,
  EventContext,
  OnAmqpEvent,
  Message as RheaMessage,
  message,
  types,
} from "rhea-promise";
import {
  ErrorNameConditionMapper,
  RetryConfig,
  RetryOperationType,
  RetryOptions,
  defaultCancellableLock,
  delay,
  retry,
  translate,
} from "@azure/core-amqp";
import {
  commitIdempotentSequenceNumbers,
  EventData,
  EventDataInternal,
  populateIdempotentMessageAnnotations,
  rollbackIdempotentSequenceNumbers,
  toRheaMessage,
} from "./eventData";
import { EventDataBatch, EventDataBatchImpl, isEventDataBatch } from "./eventDataBatch";
import { logErrorStackTrace, logger } from "./log";
import { AbortSignalLike } from "@azure/abort-controller";
import { ConnectionContext } from "./connectionContext";
import { EventHubProducerOptions, IdempotentLinkProperties } from "./models/private";
import { SendOptions } from "./models/public";
import { PartitionPublishingOptions, PartitionPublishingProperties } from "./models/private";
import { LinkEntity } from "./linkEntity";
import { getRetryAttemptTimeoutInMs } from "./util/retries";
import {
  idempotentProducerAmqpPropertyNames,
  PENDING_PUBLISH_SEQ_NUM_SYMBOL,
} from "./util/constants";
import { isDefined } from "./util/typeGuards";
import { translateError } from "./util/error";
import { v4 as uuid } from "uuid";

/**
 * @internal
 */
export interface EventHubSenderOptions {
  /**
   * Indicates whether or not the sender should enable idempotent publishing to Event Hub partitions.
   */
  enableIdempotentProducer: boolean;
  /**
   * The EventHub partition id to which the sender wants to send the event data.
   */
  partitionId?: string;
  /**
   * The set of options that can be specified to influence publishing behavior
   * specific to a partition.
   */
  partitionPublishingOptions?: PartitionPublishingOptions;
}

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
   * Indicates whether the sender is configured for idempotent publishing.
   */
  private _isIdempotentProducer: boolean;
  /**
   * Indicates whether the sender has an in-flight send while idempotent
   * publishing is enabled.
   */
  private _hasPendingSend?: boolean;
  /**
   * A local copy of the PartitionPublishingProperties that can be mutated to
   * keep track of the lastSequenceNumber used.
   */
  private _localPublishingProperties?: PartitionPublishingProperties;
  /**
   * The user-provided set of options that can be specified to influence
   * publishing behavior specific to a partition.
   */
  private _userProvidedPublishingOptions?: PartitionPublishingOptions;

  /**
   * Creates a new EventHubSender instance.
   * @param context - The connection context.
   * @param options - Options used to configure the EventHubSender.
   */
  constructor(
    context: ConnectionContext,
    { partitionId, enableIdempotentProducer, partitionPublishingOptions }: EventHubSenderOptions
  ) {
    super(context, {
      name: context.config.getSenderAddress(partitionId),
      partitionId: partitionId,
    });
    this.address = context.config.getSenderAddress(partitionId);
    this.audience = context.config.getSenderAudience(partitionId);
    this._isIdempotentProducer = enableIdempotentProducer;
    this._userProvidedPublishingOptions = partitionPublishingOptions;

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
   * @returns boolean
   */
  isOpen(): boolean {
    const result = Boolean(this._sender && this._sender.isOpen());
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
    const sender = await this._getLink(options);

    return sender.maxMessageSize;
  }

  /**
   * Get the information about the state of publishing for a partition as observed by the `EventHubSender`.
   * This data can always be read, but will only be populated with information relevant to the active features
   * for the producer client.
   */
  async getPartitionPublishingProperties(
    options: {
      retryOptions?: RetryOptions;
      abortSignal?: AbortSignalLike;
    } = {}
  ): Promise<PartitionPublishingProperties> {
    if (this._localPublishingProperties) {
      // Send a copy of the properties so it can't be mutated downstream.
      return { ...this._localPublishingProperties };
    }

    const properties: PartitionPublishingProperties = {
      isIdempotentPublishingEnabled: this._isIdempotentProducer,
      partitionId: this.partitionId ?? "",
    };

    if (this._isIdempotentProducer) {
      this._sender = await this._getLink(options);
      // await this._createLinkIfNotOpen(options);
      if (!this._sender) {
        // createLinkIfNotOpen should throw if `this._sender` can't be created, but just in case it gets
        // deleted while setting up token refreshing, make sure it exists.
        throw new Error(
          `Failed to retrieve partition publishing properties for partition "${this.partitionId}".`
        );
      }

      const {
        [idempotentProducerAmqpPropertyNames.epoch]: ownerLevel,
        [idempotentProducerAmqpPropertyNames.producerId]: producerGroupId,
        [idempotentProducerAmqpPropertyNames.producerSequenceNumber]: lastPublishedSequenceNumber,
      } = this._sender.properties ?? {};

      properties.ownerLevel = parseInt(ownerLevel, 10);
      properties.producerGroupId = parseInt(producerGroupId, 10);
      properties.lastPublishedSequenceNumber = parseInt(lastPublishedSequenceNumber, 10);
    }

    this._localPublishingProperties = properties;

    // Send a copy of the properties so it can't be mutated downstream.
    return { ...properties };
  }

  /**
   * Send a batch of EventData to the EventHub. The "message_annotations",
   * "application_properties" and "properties" of the first message will be set as that
   * of the envelope (batch message).
   * @param events -  An array of EventData objects to be sent in a Batch message.
   * @param options - Options to control the way the events are batched along with request options
   */
  async send(
    events: EventData[] | EventDataBatch,
    options?: SendOptions &
      EventHubProducerOptions & { tracingProperties?: Array<EventData["properties"]> }
  ): Promise<void> {
    try {
      logger.info(
        "[%s] Sender '%s', trying to send EventData[].",
        this._context.connectionId,
        this.name
      );
      if (this._isIdempotentProducer && this._hasPendingSend) {
        throw new Error(
          `There can only be 1 "sendBatch" call in-flight per partition while "enableIdempotentPartitions" is set to true.`
        );
      }

      const eventCount = isEventDataBatch(events) ? events.count : events.length;
      if (eventCount === 0) {
        logger.info(`[${this._context.connectionId}] No events were passed to sendBatch.`);
        return;
      }

      if (this._isIdempotentProducer) {
        this._hasPendingSend = true;
      }

      logger.info(
        "[%s] Sender '%s', sending encoded batch message.",
        this._context.connectionId,
        this.name
      );
      await this._trySendBatch(events, options);
      if (this._isIdempotentProducer) {
        commitIdempotentSequenceNumbers(events);
        if (this._localPublishingProperties) {
          const { lastPublishedSequenceNumber = 0 } = this._localPublishingProperties;
          // Increment the lastPublishedSequenceNumber based on the number of events published.
          this._localPublishingProperties.lastPublishedSequenceNumber =
            lastPublishedSequenceNumber + eventCount;
        }
      }
      return;
    } catch (err) {
      rollbackIdempotentSequenceNumbers(events);
      logger.warning(
        `An error occurred while sending the batch message ${err?.name}: ${err?.message}`
      );
      logErrorStackTrace(err);
      throw err;
    } finally {
      if (this._isIdempotentProducer) {
        this._hasPendingSend = false;
      }
    }
  }

  /**
   * @param sender - The rhea sender that contains the idempotent producer properties.
   */
  private _populateLocalPublishingProperties(sender: AwaitableSender): void {
    const {
      [idempotentProducerAmqpPropertyNames.epoch]: ownerLevel,
      [idempotentProducerAmqpPropertyNames.producerId]: producerGroupId,
      [idempotentProducerAmqpPropertyNames.producerSequenceNumber]: lastPublishedSequenceNumber,
    } = sender.properties ?? {};

    this._localPublishingProperties = {
      isIdempotentPublishingEnabled: this._isIdempotentProducer,
      partitionId: this.partitionId ?? "",
      lastPublishedSequenceNumber,
      ownerLevel,
      producerGroupId,
    };
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

  private _createSenderOptions(newName?: boolean): AwaitableSenderOptions {
    if (newName) this.name = `${uuid()}`;
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

    if (this._isIdempotentProducer) {
      srOptions.desired_capabilities = idempotentProducerAmqpPropertyNames.capability;
      const idempotentProperties = generateIdempotentLinkProperties(
        this._userProvidedPublishingOptions,
        this._localPublishingProperties
      );
      srOptions.properties = idempotentProperties;
    }
    logger.verbose("Creating sender with options: %O", srOptions);
    return srOptions;
  }

  /**
   * Tries to send the message to EventHub if there is enough credit to send them
   * and the circular buffer has available space to settle the message after sending them.
   *
   * We have implemented a synchronous send over here in the sense that we shall be waiting
   * for the message to be accepted or rejected and accordingly resolve or reject the promise.
   * @param rheaMessage - The message to be sent to EventHub.
   * @returns Promise<void>
   */
  private async _trySendBatch(
    events: EventData[] | EventDataBatch,
    options: SendOptions &
      EventHubProducerOptions & {
        /**
         * Tracing properties that are associated with EventData.
         */
        tracingProperties?: Array<EventData["properties"]>;
      } = {}
  ): Promise<void> {
    const abortSignal: AbortSignalLike | undefined = options.abortSignal;
    const retryOptions = options.retryOptions || {};
    const timeoutInMs = getRetryAttemptTimeoutInMs(retryOptions);
    retryOptions.timeoutInMs = timeoutInMs;

    const sendEventPromise = async (): Promise<void> => {
      const initStartTime = Date.now();
      // TODO: (jeremymeng) A or B
      // variant A:
      const sender = await this._getLink(options);
      // variant B
      // await this._createLinkIfNotOpen(options);
      const publishingProps = await this.getPartitionPublishingProperties(options);
      const timeTakenByInit = Date.now() - initStartTime;

      logger.verbose(
        "[%s] Sender '%s', credit: %d available: %d",
        this._context.connectionId,
        this.name,
        sender.credit,
        sender.session.outgoing.available()
      );

      let waitTimeForSendable = 1000;
      if (!sender.sendable() && timeoutInMs - timeTakenByInit > waitTimeForSendable) {
        logger.verbose(
          "%s Sender '%s', waiting for 1 second for sender to become sendable",
          this._context.connectionId,
          this.name
        );

        await delay(waitTimeForSendable);

        logger.verbose(
          "%s Sender '%s' after waiting for a second, credit: %d available: %d",
          this._context.connectionId,
          this.name,
          sender.credit,
          sender.session?.outgoing?.available()
        );
      } else {
        waitTimeForSendable = 0;
      }

      if (!sender.sendable()) {
        // let us retry to send the message after some time.
        const msg =
          `[${this._context.connectionId}] Sender "${this.name}", ` +
          `cannot send the message right now. Please try later.`;
        logger.warning(msg);
        const amqpError: AmqpError = {
          condition: ErrorNameConditionMapper.SenderBusyError,
          description: msg,
        };
        throw translate(amqpError);
      }

      logger.verbose(
        "[%s] Sender '%s', sending message with id '%s'.",
        this._context.connectionId,
        this.name
      );
      if (timeoutInMs <= timeTakenByInit + waitTimeForSendable) {
        const desc: string =
          `${this._context.connectionId} Sender "${this.name}" ` +
          `with address "${this.address}", was not able to send the message right now, due ` +
          `to operation timeout.`;
        logger.warning(desc);
        const e: AmqpError = {
          condition: ErrorNameConditionMapper.ServiceUnavailableError,
          description: desc,
        };
        throw translate(e);
      }

      try {
        const encodedMessage = transformEventsForSend(events, publishingProps, options);
        const delivery = await sender.send(encodedMessage, {
          format: 0x80013700,
          timeoutInSeconds: (timeoutInMs - timeTakenByInit - waitTimeForSendable) / 1000,
          abortSignal,
        });
        logger.info(
          "[%s] Sender '%s', sent message with delivery id: %d",
          this._context.connectionId,
          this.name,
          delivery.id
        );
      } catch (err) {
        const error = err.innerError || err;
        const translatedError = translateError(error);
        throw translatedError;
      }
    };

    const config: RetryConfig<void> = {
      operation: sendEventPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.sendMessage,
      abortSignal: abortSignal,
      retryOptions: retryOptions,
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

  private async _getLink(
    options: {
      retryOptions?: RetryOptions;
      abortSignal?: AbortSignalLike;
    } = {}
  ): Promise<AwaitableSender> {
    if (this.isOpen() && this._sender) {
      return this._sender;
    }
    const retryOptions = options.retryOptions || {};
    const timeoutInMs = getRetryAttemptTimeoutInMs(retryOptions);
    retryOptions.timeoutInMs = timeoutInMs;
    const senderOptions = this._createSenderOptions();

    const startTime = Date.now();
    const createLinkPromise = async (): Promise<AwaitableSender> => {
      return defaultCancellableLock.acquire(
        this.senderLock,
        () => {
          const taskStartTime = Date.now();
          const taskTimeoutInMs = timeoutInMs - (taskStartTime - startTime);
          return this._init({
            ...senderOptions,
            abortSignal: options.abortSignal,
            timeoutInMs: taskTimeoutInMs,
          });
        },
        { abortSignal: options.abortSignal, timeoutInMs: timeoutInMs }
      );
    };

    const config: RetryConfig<AwaitableSender> = {
      operation: createLinkPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.senderLink,
      abortSignal: options.abortSignal,
      retryOptions: retryOptions,
    };

    try {
      return await retry<AwaitableSender>(config);
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
   * Should only be called from _createLinkIfNotOpen
   */
  private async _init(
    options: AwaitableSenderOptions & {
      abortSignal: AbortSignalLike | undefined;
      timeoutInMs: number;
    }
  ): Promise<AwaitableSender> {
    try {
      if (!this.isOpen() || !this._sender) {
        // Wait for the connectionContext to be ready to open the link.
        await this._context.readyToOpenLink();
        await this._negotiateClaim({
          setTokenRenewal: false,
          abortSignal: options.abortSignal,
          timeoutInMs: options.timeoutInMs,
        });

        logger.verbose(
          "[%s] Trying to create sender '%s'...",
          this._context.connectionId,
          this.name
        );

        const sender = await this._context.connection.createAwaitableSender(options);
        sender.setMaxListeners(1000);
        this._sender = sender;
        this._populateLocalPublishingProperties(this._sender);
        this.isConnecting = false;
        logger.verbose(
          "[%s] Sender '%s' created with sender options: %O",
          this._context.connectionId,
          this.name,
          options
        );

        // It is possible for someone to close the sender and then start it again.
        // Thus make sure that the sender is present in the client cache.
        if (!this._context.senders[this.name]) this._context.senders[this.name] = this;
        this._ensureTokenRenewal();
        return sender;
      } else {
        logger.verbose(
          "[%s] The sender '%s' with address '%s' is open -> %s. Hence not reconnecting.",
          this._context.connectionId,
          this.name,
          this.address,
          this.isOpen()
        );
        return this._sender;
      }
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
   * Creates a new sender to the given event hub, and optionally to a given partition if it is
   * not present in the context or returns the one present in the context.
   * @hidden
   * @param options - Options used to configure the EventHubSender.
   */
  static create(context: ConnectionContext, options: EventHubSenderOptions): EventHubSender {
    const ehSender: EventHubSender = new EventHubSender(context, options);
    if (!context.senders[ehSender.name]) {
      context.senders[ehSender.name] = ehSender;
    }
    return context.senders[ehSender.name];
  }
}

/**
 * Generates the link properties for an indemopotent sender given
 * based on the user-provided and locally-cached publishing options.
 *
 * Note: The set of idempotent properties a user specifies at EventHubProducerClient instantiation-time
 * is slightly different than what the service returns and the EventHubSender keeps track of locally.
 *
 * The difference is that the user specifies the `startingSequenceNumber`, whereas the local options
 * (those returned by getPartitionPublishingProperties) specifies `lastPublishedSequenceNumber`.
 *
 * These _can_ be the same, but the user is technically free to set any `startingSequenceNumber` they want.
 * @internal
 */
export function generateIdempotentLinkProperties(
  userProvidedPublishingOptions: PartitionPublishingOptions | undefined,
  localPublishingOptions: PartitionPublishingProperties | undefined
): IdempotentLinkProperties | Record<string, never> {
  let ownerLevel: number | undefined;
  let producerGroupId: number | undefined;
  let sequenceNumber: number | undefined;

  // Prefer local publishing options since this is the up-to-date state of the sender.
  // Only use user-provided publishing options the first time we create the link.
  if (localPublishingOptions) {
    ownerLevel = localPublishingOptions.ownerLevel;
    producerGroupId = localPublishingOptions.producerGroupId;
    sequenceNumber = localPublishingOptions.lastPublishedSequenceNumber;
  } else if (userProvidedPublishingOptions) {
    ownerLevel = userProvidedPublishingOptions.ownerLevel;
    producerGroupId = userProvidedPublishingOptions.producerGroupId;
    sequenceNumber = userProvidedPublishingOptions.startingSequenceNumber;
  } else {
    // If we don't have any properties at all, send an empty object.
    // This will cause the service to generate a new producer-id for our client.
    return {};
  }

  // The service requires that if ANY_ of these properties are defined,
  // they _ALL_ have to be defined.
  // If we don't have one of the required values, use `null` and the
  // service will provide it.
  const idempotentLinkProperties: IdempotentLinkProperties = {
    [idempotentProducerAmqpPropertyNames.epoch]: isDefined(ownerLevel)
      ? types.wrap_short(ownerLevel)
      : null,
    [idempotentProducerAmqpPropertyNames.producerId]: isDefined(producerGroupId)
      ? types.wrap_long(producerGroupId)
      : null,
    [idempotentProducerAmqpPropertyNames.producerSequenceNumber]: isDefined(sequenceNumber)
      ? types.wrap_int(sequenceNumber)
      : null,
  };

  return idempotentLinkProperties;
}

/**
 * Encodes a list or batch of events into a single binary message that can be sent to the service.
 *
 * Prior to encoding, any special properties not specified by the user, such as tracing or idempotent
 * properties, are assigned to the list or batch of events as needed.
 *
 * @internal
 * @param events - Events to transform for sending to the service.
 * @param publishingProps - Describes the current publishing state for the partition.
 * @param options - Options used to configure this function.
 */
export function transformEventsForSend(
  events: EventData[] | EventDataBatch,
  publishingProps: PartitionPublishingProperties,
  options: SendOptions & {
    /**
     * A list containing the `Diagnostic-Id` tracing property that is associated with each EventData.
     * The index of tracingProperties corresponds to the same index in `events` when `events` is EventData[].
     */
    tracingProperties?: Array<EventData["properties"]>;
  } = {}
): Buffer {
  if (isEventDataBatch(events)) {
    return (events as EventDataBatchImpl)._generateMessage(publishingProps);
  } else {
    const eventCount = events.length;
    // convert events to rhea messages
    const rheaMessages: RheaMessage[] = [];
    const tracingProperties = options.tracingProperties ?? [];
    for (let i = 0; i < eventCount; i++) {
      const originalEvent = events[i];
      const tracingProperty = tracingProperties[i];
      // Create a copy of the user's event so we can add the tracing property.
      const event: EventData = {
        ...originalEvent,
        properties: { ...originalEvent.properties, ...tracingProperty },
      };
      const rheaMessage = toRheaMessage(event, options.partitionKey);

      // populate idempotent message annotations
      const { lastPublishedSequenceNumber = 0 } = publishingProps;
      const startingSequenceNumber = lastPublishedSequenceNumber + 1;
      const pendingPublishSequenceNumber = startingSequenceNumber + i;
      populateIdempotentMessageAnnotations(rheaMessage, {
        ...publishingProps,
        publishSequenceNumber: pendingPublishSequenceNumber,
      });

      if (publishingProps.isIdempotentPublishingEnabled) {
        // Set pending seq number on user's event.
        (originalEvent as EventDataInternal)[PENDING_PUBLISH_SEQ_NUM_SYMBOL] =
          pendingPublishSequenceNumber;
      }

      rheaMessages.push(rheaMessage);
    }

    // Encode every amqp message and then convert every encoded message to amqp data section
    const batchMessage: RheaMessage = {
      body: message.data_sections(rheaMessages.map(message.encode)),
    };

    // Set message_annotations of the first message as
    // that of the envelope (batch message).
    if (rheaMessages[0].message_annotations) {
      batchMessage.message_annotations = { ...rheaMessages[0].message_annotations };
    }

    // Finally encode the envelope (batch message).
    return message.encode(batchMessage);
  }
}
