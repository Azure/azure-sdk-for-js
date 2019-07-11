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
   * @property [prefetchCount] The number of messages that the receiver can fetch/receive
   * initially. Defaults to 0.
   */
  prefetchCount: number = 0;
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
   * @property _userDefinedOnMessage The message handler provided by the user that will be wrapped
   * inside _onAmqpMessage.
   * @private
   */
  private _userDefinedOnMessage?: OnMessage;
  /**
   * @property _userDefinedOnError The error handler provided by the user that will be wrapped
   * inside _onAmqpError.
   * @private
   */
  private _userDefinedOnError?: OnError;

  private _checkpoint: number = -1;

  private internalQueue: ReceivedEventData[] = [];
  private _isDrainingQueue: boolean = false;
  private _isReceivingMessages: boolean = false;

  /**
   * @property Returns sequenceNumber of the last event received.
   * @readonly
   */
  get checkpoint(): number {
    return this._checkpoint;
  }

  get isReceivingMessages(): boolean {
    return this._isReceivingMessages;
  }

  /**
   * Instantiate a new receiver from the AMQP `Receiver`. Used by `EventHubClient`.
   * @ignore
   * @constructor
   * @param client                            The EventHub client.
   * @param consumerGroup  The consumer group from which the receiver should receive events from.
   * @param partitionId                               Partition ID from which to receive.
   * @param eventPosition The position in the stream from where to start receiving events.
   * @param [options]                         Receiver options.
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

    // automatically add credit if there is a listener
    if (this._hasActiveListeners() && !this._isDrainingQueue) {
      this._addCredit(Math.max(this.prefetchCount - this._existingCredits(), 1));
    }

    if (this._userDefinedOnMessage && !this._isDrainingQueue) {
      this._userDefinedOnMessage(receivedEventData);
    } else {
      this.internalQueue.push(receivedEventData);
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

    const error = translate(amqpError);
    log.error(
      "[%s] An error occurred for Receiver '%s': %O.",
      this._context.connectionId,
      this.name,
      error
    );

    if (!amqpReceiver.isItselfClosed() && this._userDefinedOnError) {
      log.error(
        "[%s] Since the user did not close the receiver " +
          "we let the user know about it by calling the user's error handler.",
        this._context.connectionId
      );
      this._userDefinedOnError(error);
    } else {
      log.error(
        "[%s] Tthe receiver was closed by the user." +
          "Hence not notifying the user's error handler.",
        this._context.connectionId
      );
    }
  }

  private async _onAmqpSessionClose(context: EventContext): Promise<void> {
    const amqpReceiver = this._receiver || context.receiver;
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

    if (!this.isConnecting) {
      log.error(
        "[%s] 'session_close' event occurred on the session of receiver '%s' with " +
          "address '%s' and the sdk did not initiate this. Hence calling detached from the " +
          "_onAmqpSessionClose() handler.",
        this._context.connectionId,
        this.name,
        this.address
      );
      // session close event not initiated by SDK, so calling detached handler.
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

  private _onAmqpSessionError(context: EventContext): void {
    const amqpReceiver = this._receiver || context.receiver;
    const sessionError = context.session && context.session.error;

    if (!sessionError) {
      return;
    }

    const error = translate(sessionError);
    log.error(
      "[%s] An error occurred on the session for Receiver '%s': %O.",
      this._context.connectionId,
      this.name,
      error
    );
    if (amqpReceiver && !amqpReceiver.isSessionItselfClosed() && !error.retryable) {
      if (this._userDefinedOnError) {
        log.error(
          "[%s] Since the user did not close the receiver and the session error is not " +
            "retryable, we let the user know about it by calling the user's error handler.",
          this._context.connectionId
        );
        this._userDefinedOnError(error);
      }
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
    if (typeof this._userDefinedOnError === "function") {
      const error = new AbortError("The receive operation has been cancelled by the user.");
      this._userDefinedOnError(error);
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
    this._userDefinedOnError = undefined;
    this._userDefinedOnMessage = undefined;
    this._isReceivingMessages = false;
  }

  /**
   * Closes the underlying AMQP receiver.
   * @ignore
   * @returns
   */
  async close(): Promise<void> {
    if (!this._receiver) {
      return;
    }

    this.clearHandlers();
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
    const result: boolean = Boolean(this._receiver && this._receiver.isOpen());
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
   * @param onMessage
   * @param onError
   * @param abortSignal
   * @ignore
   */
  registerHandlers(onMessage: OnMessage, onError?: OnError, abortSignal?: AbortSignalLike): void {
    if (typeof onMessage !== "function") {
      // throw error
    }
    if (onError && typeof onError !== "function") {
      // throw error
    }

    this._userDefinedOnError = onError;
    this._userDefinedOnMessage = onMessage;

    // indicate that messages are being received.
    this._isReceivingMessages = true;

    this._drainAndAddCredits(onMessage, abortSignal);
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

  private async _drainAndAddCredits(
    onMessage: OnMessage,
    abortSignal?: AbortSignalLike
  ): Promise<void> {
    await delay(0);
    this._isDrainingQueue = true;
    while (this.internalQueue.length) {
      if (!this._hasActiveListeners()) {
        this._isDrainingQueue = false;
        return;
      }

      if (abortSignal && abortSignal.aborted) {
        this._isDrainingQueue = false;
        return;
      }

      if (this._userDefinedOnMessage !== onMessage) {
        this._isDrainingQueue = false;
        return;
      }
      const eventData = this.internalQueue.splice(0, 1)[0];
      onMessage(eventData);
      // allow the event loop to process any blocking code outside
      // this code path before sending the next event.
      await delay(0);
    }
    this._isDrainingQueue = false;

    if (this._hasActiveListeners()) {
      // register the onMessage handler to stop
      // sending events to the queue.

      if (this.isOpen()) {
        // add credits to start receiving events from the service.
        this._addCredit(this.prefetchCount || 1);
      }
    }
  }

  private _existingCredits(): number {
    if (this._receiver) {
      return this._receiver.credit;
    }
    return 0;
  }

  private _hasActiveListeners(): boolean {
    return typeof this._userDefinedOnMessage === "function";
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
        if (this._hasActiveListeners()) {
          // add at least 1 credit when the user has a registered handler
          this._addCredit(this.prefetchCount || 1);
        }
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
      credit_window: this.prefetchCount,
      onMessage: options.onMessage || ((context: EventContext) => this._onAmqpMessage(context)),
      onError: options.onError || ((context: EventContext) => this._onAmqpError(context)),
      onClose: options.onClose || ((context: EventContext) => this._onAmqpClose(context)),
      onSessionError:
        options.onSessionError || ((context: EventContext) => this._onAmqpSessionError(context)),
      onSessionClose:
        options.onSessionClose || ((context: EventContext) => this._onAmqpSessionClose(context))
    };

    if (typeof this.ownerLevel === "number") {
      if (!rcvrOptions.properties)
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
