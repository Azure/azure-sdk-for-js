// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import uuid from "uuid/v4";
import { logger, logErrorStackTrace } from "./log";
import {
  Receiver,
  OnAmqpEvent,
  EventContext,
  ReceiverOptions as RheaReceiverOptions,
  types
} from "rhea-promise";
import { delay, translate, Constants, MessagingError } from "@azure/core-amqp";
import { ReceivedEventData, EventDataInternal, fromAmqpMessage } from "./eventData";
import { EventHubConsumerOptions } from "./impl/eventHubClient";
import { ConnectionContext } from "./connectionContext";
import { LinkEntity } from "./linkEntity";
import { EventPosition, getEventPositionFilter } from "./eventPosition";
import { AbortSignalLike, AbortError } from "@azure/abort-controller";

/**
 * @ignore
 */
interface CreateReceiverOptions {
  onMessage: OnAmqpEvent;
  onError: OnAmqpEvent;
  onClose: OnAmqpEvent;
  onSessionError: OnAmqpEvent;
  onSessionClose: OnAmqpEvent;
  newName?: boolean;
  eventPosition?: EventPosition;
}

/**
 * A set of information about the last enqueued event of a partition, as observed by the consumer as
 * events are received from the Event Hubs service
 * @interface LastEnqueuedEventProperties
 */
export interface LastEnqueuedEventProperties {
  /**
   * @property The sequence number of the event that was last enqueued into the Event Hub partition from which
   * this event was received.
   */
  sequenceNumber?: number;
  /**
   * @property The date and time, in UTC, that the last event was enqueued into the Event Hub partition from
   * which this event was received.
   */
  enqueuedOn?: Date;
  /**
   * @property The offset of the event that was last enqueued into the Event Hub partition from which
   * this event was received.
   */
  offset?: string;
  /**
   * @property The date and time, in UTC, that the last event was retrieved from the Event Hub partition.
   */
  retrievedOn?: Date;
}

/**
 * Describes the message handler signature.
 * @internal
 * @ignore
 */
export type OnMessage = (eventData: ReceivedEventData) => void;

/**
 * Describes the error handler signature.
 * @internal
 * @ignore
 */
export type OnError = (error: MessagingError | Error) => void;

/**
 * Describes the abort handler signature.
 * @internal
 * @ignore
 */
export type OnAbort = () => void;

/**
 * Describes the EventHubReceiver that will receive event data from EventHub.
 * @class EventHubReceiver
 * @internal
 * @ignore
 */
export class EventHubReceiver extends LinkEntity {
  /**
   * @property consumerGroup The EventHub consumer group from which the receiver will
   * receive messages. (Default: "default").
   */
  consumerGroup: string;
  /**
   * @property runtimeInfo The receiver runtime info.
   */
  runtimeInfo: LastEnqueuedEventProperties;
  /**
   * @property [ownerLevel] The Receiver ownerLevel.
   */
  ownerLevel?: number;
  /**
   * @property eventPosition The event position in the partition at which to start receiving messages.
   */
  eventPosition: EventPosition;
  /**
   * @property [options] Optional properties that can be set while creating
   * the EventHubConsumer.
   */
  options: EventHubConsumerOptions;
  /**
   * @property [_receiver] The RHEA AMQP-based receiver link.
   * @private
   */
  private _receiver?: Receiver;
  /**
   * @property _onMessage The message handler provided by the batching or streaming flavors of receive operations on the `EventHubConsumer`
   * @private
   */
  private _onMessage?: OnMessage;
  /**
   * @property _OnError The error handler provided by the batching or streaming flavors of receive operations on the `EventHubConsumer`
   * @private
   */
  private _onError?: OnError;
  /**
   * @property _onAbort The abort handler provided by the batching or streaming flavors of receive operations on the `EventHubConsumer`
   * @private
   */
  private _onAbort?: OnAbort;
  /**
   * @property _abortSignal An implementation of the `AbortSignalLike` interface to signal cancelling a receiver operation.
   * @private
   */
  private _abortSignal?: AbortSignalLike;
  /**
   * @property _checkpoint The sequence number of the most recently received AMQP message.
   * @private
   */
  private _checkpoint: number = -1;
  /**
   * @property _internalQueue A queue of events that were received from the AMQP link but not consumed externally by `EventHubConsumer`
   * @private
   */
  private _internalQueue: ReceivedEventData[] = [];
  /**
   * @property _usingInternalQueue Indicates that events in the internal queue are being processed to be consumed by `EventHubConsumer`
   * @private
   */
  private _usingInternalQueue: boolean = false;
  /**
   * @property _isReceivingMessages Indicates if messages are being received from this receiver.
   * @private
   */
  private _isReceivingMessages: boolean = false;
  /**
   * @property _isStreaming Indicated if messages are being received in streaming mode.
   * @private
   */
  private _isStreaming: boolean = false;

  /**
   * @property Returns sequenceNumber of the last event received from the service. This will not match the
   * last event received by `EventHubConsumer` when the `_internalQueue` is not empty
   * @readonly
   */
  get checkpoint(): number {
    return this._checkpoint;
  }

  /**
   * @property Indicates if messages are being received from this receiver.
   * @readonly
   */
  get isReceivingMessages(): boolean {
    return this._isReceivingMessages;
  }

  /**
   * Instantiates a receiver that can be used to receive events over an AMQP receiver link in
   * either batching or streaming mode.
   * @ignore
   * @constructor
   * @param context        The connection context corresponding to the EventHubClient instance
   * @param consumerGroup  The consumer group from which the receiver should receive events from.
   * @param partitionId    The Partition ID from which to receive.
   * @param eventPosition  The position in the stream from where to start receiving events.
   * @param [options]      Receiver options.
   */
  constructor(
    context: ConnectionContext,
    consumerGroup: string,
    partitionId: string,
    eventPosition: EventPosition,
    options: EventHubConsumerOptions = {}
  ) {
    super(context, {
      partitionId: partitionId,
      name: context.config.getReceiverAddress(partitionId, consumerGroup)
    });
    this.consumerGroup = consumerGroup;
    this.address = context.config.getReceiverAddress(partitionId, this.consumerGroup);
    this.audience = context.config.getReceiverAudience(partitionId, this.consumerGroup);
    this.ownerLevel = options.ownerLevel;
    this.eventPosition = eventPosition;
    this.options = options;
    this.runtimeInfo = {};
  }

  private _onAmqpMessage(context: EventContext): void {
    if (!context.message) {
      return;
    }

    const data: EventDataInternal = fromAmqpMessage(context.message);
    const receivedEventData: ReceivedEventData = {
      body: this._context.dataTransformer.decode(context.message.body),
      properties: data.properties,
      offset: data.offset!,
      sequenceNumber: data.sequenceNumber!,
      enqueuedTimeUtc: data.enqueuedTimeUtc!,
      partitionKey: data.partitionKey!,
      systemProperties: data.systemProperties
    };

    this._checkpoint = receivedEventData.sequenceNumber;

    if (this.options.trackLastEnqueuedEventProperties && data) {
      this.runtimeInfo.sequenceNumber = data.lastSequenceNumber;
      this.runtimeInfo.enqueuedOn = data.lastEnqueuedTime;
      this.runtimeInfo.offset = data.lastEnqueuedOffset;
      this.runtimeInfo.retrievedOn = data.retrievalTime;
    }

    // Add to internal queue if
    // - There are no listeners, we are probably getting events due to pending credits
    // - Or Events from internal queue are being processed, so add to it to ensure order of processing is retained
    if (!this._onMessage || this._usingInternalQueue) {
      this._internalQueue.push(receivedEventData);
    } else {
      if (this._isStreaming) {
        this._addCredit(1);
      }
      this._onMessage(receivedEventData);
    }
  }

  private _onAmqpError(context: EventContext): void {
    const rheaReceiver = this._receiver || context.receiver;
    const amqpError = rheaReceiver && rheaReceiver.error;
    logger.verbose(
      "[%s] 'receiver_error' event occurred on the receiver '%s' with address '%s'. " +
        "The associated error is: %O",
      this._context.connectionId,
      this.name,
      this.address,
      amqpError
    );

    if (this._onError && amqpError) {
      const error = translate(amqpError);
      logErrorStackTrace(error);
      this._onError(error);
    }
  }

  private _onAmqpSessionError(context: EventContext): void {
    const sessionError = context.session && context.session.error;
    logger.verbose(
      "[%s] 'session_error' event occurred on the session of receiver '%s' with address '%s'. " +
        "The associated error is: %O",
      this._context.connectionId,
      this.name,
      this.address,
      sessionError
    );

    if (this._onError && sessionError) {
      const error = translate(sessionError);
      logErrorStackTrace(error);
      this._onError(error);
    }
  }

  private async _onAmqpClose(context: EventContext): Promise<void> {
    const rheaReceiver = this._receiver || context.receiver;
    logger.verbose(
      "[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s'. " +
        "Value for isItselfClosed on the receiver is: '%s' " +
        "Value for isConnecting on the session is: '%s'.",
      this._context.connectionId,
      this.name,
      this.address,
      rheaReceiver ? rheaReceiver.isItselfClosed().toString() : undefined,
      this.isConnecting
    );
    if (rheaReceiver && !this.isConnecting) {
      // Call close to clean up timers & other resources
      await rheaReceiver.close().catch((err) => {
        logger.verbose(
          "[%s] Error when closing receiver [%s] after 'receiver_close' event: %O",
          this._context.connectionId,
          this.name,
          err
        );
      });
    }
  }

  private async _onAmqpSessionClose(context: EventContext): Promise<void> {
    const rheaReceiver = this._receiver || context.receiver;
    logger.verbose(
      "[%s] 'session_close' event occurred on the session of receiver '%s' with address '%s'. " +
        "Value for isSessionItselfClosed on the session is: '%s' " +
        "Value for isConnecting on the session is: '%s'.",
      this._context.connectionId,
      this.name,
      this.address,
      rheaReceiver ? rheaReceiver.isSessionItselfClosed().toString() : undefined,
      this.isConnecting
    );
    if (rheaReceiver && !this.isConnecting) {
      // Call close to clean up timers & other resources
      await rheaReceiver.close().catch((err) => {
        logger.verbose(
          "[%s] Error when closing receiver [%s] after 'session_close' event: %O",
          this._context.connectionId,
          this.name,
          err
        );
      });
    }
  }

  async abort(): Promise<void> {
    const desc: string =
      `[${this._context.connectionId}] The receive operation on the Receiver "${this.name}" with ` +
      `address "${this.address}" has been cancelled by the user.`;
    // Cancellation is user-intended, so log to info instead of warning.
    logger.info(desc);
    if (this._onError) {
      const error = new AbortError("The receive operation has been cancelled by the user.");
      this._onError(error);
    }
    this.clearHandlers();
    await this.close();
  }

  /**
   * Clears the user-provided handlers and updates the receiving messages flag.
   * @ignore
   */
  clearHandlers(): void {
    if (this._abortSignal && this._onAbort) {
      this._abortSignal.removeEventListener("abort", this._onAbort);
    }

    this._abortSignal = undefined;
    this._onAbort = undefined;
    this._onError = undefined;
    this._onMessage = undefined;
    this._isReceivingMessages = false;
    this._isStreaming = false;
  }

  /**
   * Closes the underlying AMQP receiver.
   * @ignore
   * @returns
   */
  async close(): Promise<void> {
    this.clearHandlers();

    if (!this._receiver) {
      return;
    }

    const receiverLink = this._receiver;
    this._deleteFromCache();
    await this._closeLink(receiverLink);
  }

  /**
   * Determines whether the AMQP receiver link is open. If open then returns true else returns false.
   * @ignore
   * @returns boolean
   */
  isOpen(): boolean {
    const result = Boolean(this._receiver && this._receiver.isOpen());
    logger.verbose(
      "[%s] Receiver '%s' with address '%s' is open? -> %s",
      this._context.connectionId,
      this.name,
      this.address,
      result
    );
    return result;
  }

  /**
   * Registers the user's onMessage and onError handlers.
   * Sends buffered events from the queue before adding additional credits to the AMQP link.
   * @ignore
   */
  registerHandlers(
    onMessage: OnMessage,
    onError: OnError,
    maximumCreditCount: number,
    isStreaming: boolean,
    abortSignal?: AbortSignalLike,
    onAbort?: OnAbort
  ): void {
    this._abortSignal = abortSignal;
    this._onAbort = onAbort;
    this._onError = onError;
    this._onMessage = onMessage;
    this._isStreaming = isStreaming;
    // indicate that messages are being received.
    this._isReceivingMessages = true;

    this._useInternalQueue(onMessage, abortSignal)
      .then(async (processedEventCount) => {
        if (this._onMessage !== onMessage) {
          // the original handler has been removed, so no further action required.
          return;
        }

        // check if more messages are required
        if (!isStreaming && maximumCreditCount - processedEventCount <= 0) {
          return;
        }

        if (!this.isOpen()) {
          try {
            await this.initialize();
            if (abortSignal && abortSignal.aborted) {
              await this.abort();
            }
          } catch (err) {
            return this._onError === onError && onError(err);
          }
        } else {
          logger.verbose(
            "[%s] Receiver link already present, hence reusing it.",
            this._context.connectionId
          );
        }
        // add credits
        const existingCredits = this._receiver ? this._receiver.credit : 0;
        const prcoessedEventCountToExclude = isStreaming ? 0 : processedEventCount;
        const creditsToAdd = Math.max(
          maximumCreditCount - (existingCredits + prcoessedEventCountToExclude),
          0
        );
        this._addCredit(creditsToAdd);
      })
      .catch((err) => {
        // something really unexpected happened, so attempt to call user's error handler
        if (this._onError === onError) {
          onError(err);
        }
      });
  }

  private _addCredit(credit: number): void {
    if (this._receiver) {
      this._receiver.addCredit(credit);
    }
  }

  private _deleteFromCache(): void {
    this._receiver = undefined;
    delete this._context.receivers[this.name];
    logger.verbose(
      "[%s] Deleted the receiver '%s' from the client cache.",
      this._context.connectionId,
      this.name
    );
  }

  private async _useInternalQueue(
    onMessage: OnMessage,
    abortSignal?: AbortSignalLike
  ): Promise<number> {
    let processedMessagesCount = 0;
    // allow the event loop to process any blocking code outside
    // this code path before sending any events.
    await delay(0);
    this._usingInternalQueue = true;
    while (this._internalQueue.length) {
      if (!this._onMessage) {
        break;
      }

      if (abortSignal && abortSignal.aborted) {
        break;
      }

      // These will not be equal if clearHandlers and registerHandlers were called
      // in the same tick of the event loop. If onMessage isn't the currently active
      // handler, it should stop getting messages from the queue.
      if (this._onMessage !== onMessage) {
        break;
      }
      const eventData = this._internalQueue.splice(0, 1)[0];
      processedMessagesCount++;
      onMessage(eventData);
      // allow the event loop to process any blocking code outside
      // this code path before sending the next event.
      await delay(0);
    }
    this._usingInternalQueue = false;
    return processedMessagesCount;
  }

  /**
   * Creates a new AMQP receiver under a new AMQP session.
   * @ignore
   * @returns
   */
  async initialize(): Promise<void> {
    try {
      if (!this.isOpen() && !this.isConnecting) {
        this.isConnecting = true;
        await this._negotiateClaim();

        const receiverOptions: CreateReceiverOptions = {
          onClose: (context: EventContext) => this._onAmqpClose(context),
          onError: (context: EventContext) => this._onAmqpError(context),
          onMessage: (context: EventContext) => this._onAmqpMessage(context),
          onSessionClose: (context: EventContext) => this._onAmqpSessionClose(context),
          onSessionError: (context: EventContext) => this._onAmqpSessionError(context)
        };
        if (this.checkpoint > -1) {
          receiverOptions.eventPosition = { sequenceNumber: this.checkpoint };
        }
        const options = this._createReceiverOptions(receiverOptions);

        logger.verbose(
          "[%s] Trying to create receiver '%s' with options %O",
          this._context.connectionId,
          this.name,
          options
        );
        this._receiver = await this._context.connection.createReceiver(options);
        this.isConnecting = false;
        logger.verbose(
          "[%s] Receiver '%s' created with receiver options: %O",
          this._context.connectionId,
          this.name,
          options
        );
        // store the underlying link in a cache
        this._context.receivers[this.name] = this;

        await this._ensureTokenRenewal();
      } else {
        logger.verbose(
          "[%s] The receiver '%s' with address '%s' is open -> %s and is connecting " +
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
      const error = translate(err);
      logger.warning(
        "[%s] An error occured while creating the receiver '%s': %O",
        this._context.connectionId,
        this.name,
        error
      );
      logErrorStackTrace(err);
      throw error;
    }
  }

  /**
   * Creates the options that need to be specified while creating an AMQP receiver link.
   * @ignore
   */
  private _createReceiverOptions(options: CreateReceiverOptions): RheaReceiverOptions {
    if (options.newName) this.name = uuid();
    const rcvrOptions: RheaReceiverOptions = {
      name: this.name,
      autoaccept: true,
      source: {
        address: this.address
      },
      credit_window: 0,
      onMessage: options.onMessage || ((context: EventContext) => this._onAmqpMessage(context)),
      onError: options.onError || ((context: EventContext) => this._onAmqpError(context)),
      onClose: options.onClose || ((context: EventContext) => this._onAmqpClose(context)),
      onSessionError:
        options.onSessionError || ((context: EventContext) => this._onAmqpSessionError(context)),
      onSessionClose:
        options.onSessionClose || ((context: EventContext) => this._onAmqpSessionClose(context))
    };

    if (typeof this.ownerLevel === "number") {
      rcvrOptions.properties = {
        [Constants.attachEpoch]: types.wrap_long(this.ownerLevel)
      };
    }

    if (this.options.trackLastEnqueuedEventProperties) {
      rcvrOptions.desired_capabilities = Constants.enableReceiverRuntimeMetricName;
    }

    const eventPosition = options.eventPosition || this.eventPosition;
    if (eventPosition) {
      // Set filter on the receiver if event position is specified.
      const filterClause = getEventPositionFilter(eventPosition);
      if (filterClause) {
        (rcvrOptions.source as any).filter = {
          "apache.org:selector-filter:string": types.wrap_described(filterClause, 0x468c00000004)
        };
      }
    }
    return rcvrOptions;
  }
}
