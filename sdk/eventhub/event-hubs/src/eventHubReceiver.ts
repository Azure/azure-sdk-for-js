import {
  AmqpError,
  EventContext,
  OnAmqpEvent,
  Receiver,
  ReceiverOptions as RheaReceiverOptions,
  types
} from "rhea-promise";
import uuid from "uuid/v4";
import { LinkEntity } from "./linkEntity";
import * as log from "./log";
import { EventPosition, getEventPositionFilter } from "./eventPosition";
import { ConnectionContext } from "./connectionContext";
import { EventHubConsumerOptions } from "./eventHubClient";
import { EventDataInternal, fromAmqpMessage, ReceivedEventData } from "./eventData";
import {
  translate,
  RetryConfig,
  Constants,
  RetryOperationType,
  retry,
  MessagingError,
  delay
} from "@azure/core-amqp";
import { AbortError, AbortSignalLike } from "@azure/abort-controller";

/**
 * Describes the message handler signature.
 */
export type OnMessage = (eventData: ReceivedEventData) => void;

/**
 * Describes the error handler signature.
 */
export type OnError = (error: MessagingError | Error) => void;

/**
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
 * Describes the EventHubReceiver that will receive event data from EventHub.
 * @class EventHubReceiver
 * @internal
 * @ignore
 */
export class EventHubReceiver extends LinkEntity {
  consumerGroup: string;
  eventPosition: EventPosition;
  ownerLevel?: number;
  prefetchCount: number = 0;
  receiverRuntimeMetricEnabled: boolean = false;
  runtimeInfo: ReceiverRuntimeInfo;
  private _amqpReceiver?: Receiver;
  private _checkpoint: number = -1;
  private internalQueue: ReceivedEventData[] = [];
  private _isDrainingQueue: boolean = false;
  private _isReceivingMessages: boolean = false;
  private _userDefinedOnMessage?: OnMessage;
  private _userDefinedOnError?: OnError;

  private addCredit(credit: number): void {
    if (this._amqpReceiver) {
      this._amqpReceiver.addCredit(credit);
    }
  }

  private existingCredits(): number {
    if (this._amqpReceiver) {
      return this._amqpReceiver.credit;
    }
    return 0;
  }

  private createAmqpReceiverOptions(options: CreateReceiverOptions): RheaReceiverOptions {
    if (options.newName) {
      this.name = uuid();
    }

    const receiverOptions: RheaReceiverOptions = {
      autoaccept: true,
      credit_window: this.prefetchCount,
      name: this.name,
      onClose: options.onClose || ((context: EventContext) => this._onAmqpClose(context)),
      onError: options.onError || ((context: EventContext) => this._onAmqpError(context)),
      onMessage: options.onMessage || ((context: EventContext) => this._onAmqpMessage(context)),
      onSessionClose:
        options.onSessionClose || ((context: EventContext) => this._onAmqpSessionClose(context)),
      onSessionError:
        options.onSessionError || ((context: EventContext) => this._onAmqpSessionError(context)),
      source: {
        address: this.address
      }
    };

    if (typeof this.ownerLevel === "number") {
      receiverOptions.properties = {
        [Constants.attachEpoch]: types.wrap_long(this.ownerLevel)
      };
    }

    if (this.receiverRuntimeMetricEnabled) {
      receiverOptions.desired_capabilities = Constants.enableReceiverRuntimeMetricName;
    }

    const eventPosition = options.eventPosition || this.eventPosition;
    if (eventPosition) {
      const filterClause = getEventPositionFilter(eventPosition);
      (receiverOptions.source as any).filter = {
        "apache.org:selector-filter:string": types.wrap_described(filterClause, 0x468c00000004)
      };
    }

    return receiverOptions;
  }

  private deleteFromCache(): void {
    this._amqpReceiver = void 0;
    delete this._context.receivers[this.name];
    log.error(
      "[%s] Deleted the receiver '%s' from the client cache.",
      this._context.connectionId,
      this.name
    );
  }

  private async drainAndAddCredits(
    onMessage: OnMessage,
    abortSignal?: AbortSignalLike
  ): Promise<void> {
    await delay(0);
    this._isDrainingQueue = true;
    while (this.internalQueue.length) {
      if (!this.hasActiveListeners()) {
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

    if (this.hasActiveListeners()) {
      // register the onMessage handler to stop
      // sending events to the queue.

      if (this.isOpen()) {
        // add credits to start receiving events from the service.
        this.addCredit(this.prefetchCount || 1);
      }
    }
  }

  private hasActiveListeners(): boolean {
    return typeof this._userDefinedOnMessage === "function";
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
    if (this.hasActiveListeners() && !this._isDrainingQueue) {
      this.addCredit(Math.max(this.prefetchCount - this.existingCredits(), 1));
    }

    if (this._userDefinedOnMessage && !this._isDrainingQueue) {
      this._userDefinedOnMessage(receivedEventData);
    } else {
      this.internalQueue.push(receivedEventData);
    }
  }

  private _onAmqpError(context: EventContext): void {
    const amqpReceiver = this._amqpReceiver || context.receiver;
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
    const amqpReceiver = this._amqpReceiver || context.receiver;
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
    const amqpReceiver = this._amqpReceiver || context.receiver;
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
    const amqpReceiver = this._amqpReceiver || context.receiver;
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

  get checkpoint(): number {
    return this._checkpoint;
  }

  get bufferedEventCount(): number {
    return this.internalQueue.length;
  }

  get isReceivingMessages(): boolean {
    return this._isReceivingMessages;
  }

  getBufferedEvents(count?: number): ReceivedEventData[] {
    let queue = this.internalQueue;
    if (typeof count === "undefined" || count === null) {
      this.internalQueue = [];
    } else {
      queue = queue.splice(0, Math.min(queue.length, count));
    }

    return queue;
  }

  constructor(
    context: ConnectionContext,
    consumerGroup: string,
    partitionId: string,
    eventPosition: EventPosition,
    options: EventHubConsumerOptions = {}
  ) {
    super(context, {
      partitionId,
      name: context.config.getReceiverAddress(partitionId, consumerGroup)
    });
    this.address = context.config.getReceiverAddress(partitionId, consumerGroup);
    this.audience = context.config.getReceiverAudience(partitionId, consumerGroup);
    this.consumerGroup = consumerGroup;
    this.eventPosition = eventPosition;
    this.ownerLevel = options.ownerLevel;
    this.runtimeInfo = {};
  }

  async close(): Promise<void> {
    if (!this._amqpReceiver) {
      return;
    }

    this.clearHandlers();
    // store amqpReceiver in local variable since deleteFromCache removes it.
    const receiverLink = this._amqpReceiver;
    this.deleteFromCache();
    await this._closeLink(receiverLink);
  }

  isOpen(): boolean {
    const result: boolean = Boolean(this._amqpReceiver && this._amqpReceiver.isOpen());
    // log error
    return result;
  }

  async onDetached(amqpError?: AmqpError | Error): Promise<void> {
    // this method will attempt to reconnect the receiver link
    try {
      const amqpReceiver = this._amqpReceiver;
      const wasCloseInitiated = amqpReceiver && amqpReceiver.isItselfClosed();

      // remove the link if present
      await this._closeLink(amqpReceiver);

      // only attempt to recreate a link if the client did not initiate the close
      let shouldReopen = false;
      if (amqpError && !wasCloseInitiated) {
        // if there was an error and it is retryable, recreate the link
        const error = translate(amqpError);
        if (error.retryable) {
          shouldReopen = true;
          // log error
        } else {
          // log error
        }
      } else if (!wasCloseInitiated) {
        // there wasn't an error, and the client didn't initialize the close; recreate the link
        shouldReopen = true;
        // log error
      } else {
        // log error
      }

      if (!shouldReopen) {
        // clean up abort signal listener
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
      // todo
      const initOptions = this.createAmqpReceiverOptions(receiverOptions);

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
      // log error
    }
  }

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

    this.drainAndAddCredits(onMessage, abortSignal);
  }

  clearHandlers(): void {
    this._userDefinedOnError = undefined;
    this._userDefinedOnMessage = undefined;
    this._isReceivingMessages = false;
  }

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
          options = this.createAmqpReceiverOptions(receiverOptions);
        }

        log.error(
          "[%s] Trying to create receiver '%s' with options %O",
          this._context.connectionId,
          this.name,
          options
        );
        this._amqpReceiver = await this._context.connection.createReceiver(options);
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
        if (this.hasActiveListeners()) {
          // add at least 1 credit
          this.addCredit(this.prefetchCount || 1);
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
}
