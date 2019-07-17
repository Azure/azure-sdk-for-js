// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import uuid from "uuid/v4";
import * as log from "./log";
import {
  Receiver,
  OnAmqpEvent,
  EventContext,
  ReceiverOptions as RheaReceiverOptions,
  types,
  AmqpError
} from "rhea-promise";
import {
  delay,
  translate,
  Constants,
  MessagingError,
  retry,
  RetryOperationType,
  RetryConfig
} from "@azure/core-amqp";
import { ReceivedEventData, EventDataInternal, fromAmqpMessage } from "./eventData";
import { EventHubConsumerOptions } from "./eventHubClient";
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
 * @internal
 * @ignore
 * Represents the approximate receiver runtime information for a logical partition of an Event Hub.
 * @interface ReceiverRuntimeInfo
 */
export interface ReceiverRuntimeInfo {
  /**
   * @property lastSequenceNumber The logical sequence number of the event.
   */
  lastEnqueuedSequenceNumber?: number;
  /**
   * @property lastEnqueuedTimeUtc The enqueued time of the last event.
   */
  lastEnqueuedTimeUtc?: Date;
  /**
   * @property lastEnqueuedOffset The offset of the last enqueued event.
   */
  lastEnqueuedOffset?: string;
  /**
   * @property retrievalTime The enqueued time of the last event.
   */
  retrievalTime?: Date;
}

/**
 * Describes the message handler signature.
 */
export type OnMessage = (eventData: ReceivedEventData) => void;

/**
 * Describes the error handler signature.
 */
export type OnError = (error: MessagingError | Error) => void;

/**
 * Describes the abort handler signature.
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
  runtimeInfo: ReceiverRuntimeInfo;
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
   * @property receiverRuntimeMetricEnabled Indicates whether receiver runtime metric
   * is enabled. Default: false.
   */
  receiverRuntimeMetricEnabled: boolean = false;
  /**
   * @property [_receiver] The AMQP receiver link.
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
      partitionKey: data.partitionKey!
    };

    this._checkpoint = receivedEventData.sequenceNumber;

    if (this.receiverRuntimeMetricEnabled && data) {
      this.runtimeInfo.lastEnqueuedSequenceNumber = data.lastSequenceNumber;
      this.runtimeInfo.lastEnqueuedTimeUtc = data.lastEnqueuedTime;
      this.runtimeInfo.lastEnqueuedOffset = data.lastEnqueuedOffset;
      this.runtimeInfo.retrievalTime = data.retrievalTime;
      log.receiver(
        "[%s] RuntimeInfo of Receiver '%s' is %O",
        this._context.connectionId,
        this.name,
        this.runtimeInfo
      );
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
    const amqpReceiver = this._receiver || context.receiver;
    if (!amqpReceiver) {
      return;
    }

    const amqpError = amqpReceiver.error;
    if (!amqpError) {
      return;
    }

    if (amqpReceiver.isItselfClosed()) {
      log.error(
        "[%s] The receiver was closed by the user." +
          "Hence not notifying the user's error handler.",
        this._context.connectionId
      );
      return;
    }

    if (this._onError) {
      const error = translate(amqpError);
      log.error(
        "[%s] An error occurred for Receiver '%s': %O.",
        this._context.connectionId,
        this.name,
        error
      );
      log.error(
        "[%s] Since the user did not close the receiver " +
          "we let the user know about it by calling the user's error handler.",
        this._context.connectionId
      );
      this._onError(error);
    }
  }

  private _onAmqpSessionError(context: EventContext): void {
    const amqpReceiver = this._receiver || context.receiver;
    if (!amqpReceiver) {
      return;
    }

    const sessionError = context.session && context.session.error;
    if (!sessionError) {
      return;
    }

    if (amqpReceiver.isSessionItselfClosed()) {
      log.error(
        "[%s] The receiver was closed by the user." +
          "Hence not notifying the user's error handler.",
        this._context.connectionId
      );
      return;
    }

    if (this._onError) {
      const error = translate(sessionError);
      log.error(
        "[%s] An error occurred on the session for Receiver '%s': %O.",
        this._context.connectionId,
        this.name,
        error
      );

      log.error(
        "[%s] Since the user did not close the receiver, " +
          "we let the user know about it by calling the user's error handler.",
        this._context.connectionId
      );
      this._onError(error);
    }
  }

  private async _onAmqpSessionClose(context: EventContext): Promise<void> {
    const amqpReceiver = this._receiver || context.receiver;
    if (!amqpReceiver || amqpReceiver.isSessionItselfClosed()) {
      log.error(
        "[%s] 'session_close' event occurred on the session of receiver '%s' with " +
          "address '%s' and the sdk did not initiate this. Moreover the receiver is already " +
          "re-connecting. Hence not calling detached from the _onAmqpSessionClose() handler.",
        this._context.connectionId,
        this.name,
        this.address
      );
      return;
    }

    const sessionError = context.session && context.session.error;
    if (sessionError) {
      log.error(
        "[%s] 'session_close' event occurred for receiver '%s' with address '%s'. " +
          "The associated error is: %O",
        this._context.connectionId,
        this.name,
        this.address,
        sessionError
      );
    }

    if (!this.isConnecting) {
      log.error(
        "[%s] 'session_close' event occurred on the session of receiver '%s' with " +
          "address '%s' and the sdk did not initiate this. Hence calling detached from the " +
          "_onAmqpSessionClose() handler.",
        this._context.connectionId,
        this.name,
        this.address
      );
      await this.onDetached(sessionError);
    } else {
      log.error(
        "[%s] 'session_close' event occurred on the session of receiver '%s' with " +
          "address '%s' and the sdk did not initiate this. Moreover the receiver is already " +
          "re-connecting. Hence not calling detached from the _onAmqpSessionClose() handler.",
        this._context.connectionId,
        this.name,
        this.address
      );
    }
  }

  private async _onAmqpClose(context: EventContext): Promise<void> {
    const amqpReceiver = this._receiver || context.receiver;
    if (!amqpReceiver || amqpReceiver.isItselfClosed()) {
      log.error(
        "[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
          "because the sdk initiated it. Hence not calling detached from the _onAmqpClose" +
          "() handler.",
        this._context.connectionId,
        this.name,
        this.address
      );
      return;
    }

    const amqpError = amqpReceiver.error;
    if (amqpError) {
      log.error(
        "[%s] 'receiver_close' event occurred for receiver '%s' with address '%s'. " +
          "The associated error is: %O",
        this._context.connectionId,
        this.name,
        this.address,
        amqpError
      );
    }

    if (!this.isConnecting) {
      log.error(
        "[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
          "and the sdk did not initiate this. The receiver is not reconnecting. Hence, calling " +
          "detached from the _onAmqpClose() handler.",
        this._context.connectionId,
        this.name,
        this.address
      );
      await this.onDetached(amqpError);
    } else {
      log.error(
        "[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
          "and the sdk did not initate this. Moreover the receiver is already re-connecting. " +
          "Hence not calling detached from the _onAmqpClose() handler.",
        this._context.connectionId,
        this.name,
        this.address
      );
    }
  }

  async abort(): Promise<void> {
    const desc: string =
      `[${this._context.connectionId}] The receive operation on the Receiver "${this.name}" with ` +
      `address "${this.address}" has been cancelled by the user.`;
    log.error(desc);
    if (this._onError) {
      const error = new AbortError("The receive operation has been cancelled by the user.");
      this._onError(error);
    }
    this.clearHandlers();
    await this.close();
  }

  /**
   * Will reconnect the receiver link if necessary.
   * @ignore
   * @param [receiverError] The receiver error if any.
   * @returns Promise<void>.
   */
  async onDetached(receiverError?: AmqpError | Error): Promise<void> {
    try {
      const amqpReceiver = this._receiver;
      const wasCloseInitiated = amqpReceiver && amqpReceiver.isItselfClosed();
      // Clears the token renewal timer. Closes the link and its session if they are open.
      // Removes the link and its session if they are present in rhea's cache.
      await this._closeLink(amqpReceiver);
      // We should attempt to reopen only when the receiver(sdk) did not initiate the close
      let shouldReopen = false;
      if (receiverError && !wasCloseInitiated) {
        // if there was an error and it is retryable, recreate the link
        const translatedError = translate(receiverError);
        if (translatedError.retryable) {
          shouldReopen = true;
          log.error(
            "[%s] close() method of Receiver '%s' with address '%s' was not called. There " +
              "was an accompanying error and it is retryable. This is a candidate for re-establishing " +
              "the receiver link.",
            this._context.connectionId,
            this.name,
            this.address
          );
        } else {
          log.error(
            "[%s] close() method of Receiver '%s' with address '%s' was not called. There " +
              "was an accompanying error and it is NOT retryable. Hence NOT re-establishing " +
              "the receiver link.",
            this._context.connectionId,
            this.name,
            this.address
          );
        }
      } else if (!wasCloseInitiated) {
        // there wasn't an error, and the client didn't initialize the close; recreate the link
        shouldReopen = true;
        log.error(
          "[%s] close() method of Receiver '%s' with address '%s' was not called. " +
            "There was no accompanying error as well. This is a candidate for re-establishing " +
            "the receiver link.",
          this._context.connectionId,
          this.name,
          this.address
        );
      } else {
        const state: any = {
          wasCloseInitiated: wasCloseInitiated,
          receiverError: receiverError,
          _receiver: this._receiver
        };
        log.error(
          "[%s] Something went wrong. State of Receiver '%s' with address '%s' is: %O",
          this._context.connectionId,
          this.name,
          this.address,
          state
        );
      }

      if (!shouldReopen) {
        return;
      }

      const receiverOptions: CreateReceiverOptions = {
        onMessage: (context: EventContext) => this._onAmqpMessage(context),
        onError: (context: EventContext) => this._onAmqpError(context),
        onClose: (context: EventContext) => this._onAmqpClose(context),
        onSessionClose: (context: EventContext) => this._onAmqpSessionClose(context),
        onSessionError: (context: EventContext) => this._onAmqpSessionError(context),
        newName: true // prevents service from sending an error stating that the link is still open
      };

      if (this.checkpoint > -1) {
        receiverOptions.eventPosition = EventPosition.fromSequenceNumber(this.checkpoint);
      }

      // create RHEA receiver options
      const initOptions = this._createReceiverOptions(receiverOptions);

      // attempt to create the link
      const linkCreationConfig: RetryConfig<void> = {
        connectionId: this._context.connectionId,
        connectionHost: this._context.config.host,
        delayInSeconds: 15,
        operation: () => this.initialize(initOptions),
        operationType: RetryOperationType.receiverLink,
        maxRetries: Constants.defaultMaxRetriesForConnection
      };

      await retry(linkCreationConfig);

      // if the receiver is in streaming mode we need to add credits again.
      if (this._isStreaming) {
        this._addCredit(Constants.defaultPrefetchCount);
      }
    } catch (err) {
      log.error(
        "[%s] An error occurred while processing onDetached() of Receiver '%s' with address " +
          "'%s': %O",
        this._context.connectionId,
        this.name,
        this.address,
        err
      );
    }
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
    log.error(
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
          log.receiver(
            "[%s] Receiver link already present, hence reusing it.",
            this._context.connectionId
          );
        }
        // add credits
        const existingCredits = this._receiver ? this._receiver.credit : 0;
        const minimumDefaultCount = isStreaming ? 1 : 0;
        const creditsToAdd = Math.max(
          maximumCreditCount - (existingCredits + processedEventCount),
          minimumDefaultCount
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
    log.error(
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
  async initialize(options?: RheaReceiverOptions): Promise<void> {
    try {
      if (!this.isOpen() && !this.isConnecting) {
        log.error(
          "[%s] The receiver '%s' with address '%s' is not open and is not currently " +
            "establishing itself. Hence let's try to connect.",
          this._context.connectionId,
          this.name,
          this.address
        );
        // attempt creating a connection
        this.isConnecting = true;
        await this._negotiateClaim();
        if (!options) {
          const receiverOptions: CreateReceiverOptions = {
            onClose: (context: EventContext) => this._onAmqpClose(context),
            onError: (context: EventContext) => this._onAmqpError(context),
            onMessage: (context: EventContext) => this._onAmqpMessage(context),
            onSessionClose: (context: EventContext) => this._onAmqpSessionClose(context),
            onSessionError: (context: EventContext) => this._onAmqpSessionError(context)
          };
          if (this.checkpoint > -1) {
            receiverOptions.eventPosition = EventPosition.fromSequenceNumber(this.checkpoint);
          }
          options = this._createReceiverOptions(receiverOptions);
        }

        log.error(
          "[%s] Trying to create receiver '%s' with options %O",
          this._context.connectionId,
          this.name,
          options
        );
        this._receiver = await this._context.connection.createReceiver(options);
        this.isConnecting = false;
        log.error(
          "[%s] Receiver '%s' with address '%s' has established itself.",
          this._context.connectionId,
          this.name,
          this.address
        );
        log.receiver(
          "Promise to create the receiver resolved. Created receiver with name: ",
          this.name
        );
        log.receiver(
          "[%s] Receiver '%s' created with receiver options: %O",
          this._context.connectionId,
          this.name,
          options
        );
        // store the underlying link in a cache
        this._context.receivers[this.name] = this;

        await this._ensureTokenRenewal();
      } else {
        log.error(
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
      log.error(
        "[%s] An error occured while creating the receiver '%s': %O",
        this._context.connectionId,
        this.name,
        error
      );
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

    if (this.receiverRuntimeMetricEnabled) {
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
