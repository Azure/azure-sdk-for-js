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
import { translate, RetryConfig, Constants, RetryOperationType, retry, MessagingError, delay } from "@azure/core-amqp";
import { AbortError, AbortSignalLike } from "@azure/abort-controller";

export type OnMessage = (eventData: ReceivedEventData) => void;

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

export class BaseConsumer extends LinkEntity {
  public consumerGroup: string;
  public eventPosition: EventPosition;
  public ownerLevel?: number;
  public prefetchCount: number = 0;
  public receiverRuntimeMetricEnabled: boolean = false;
  public runtimeInfo: ReceiverRuntimeInfo;
  private _amqpReceiver?: Receiver;
  private _checkpoint: number = -1;
  private internalQueue: ReceivedEventData[] = [];
  private _isDrainingQueue: boolean = false;
  private _isReceivingMessages: boolean = false;
  private _userDefinedOnMessage?: OnMessage;
  private _userDefinedOnError?: OnError;

  public get checkpoint(): number {
    return this._checkpoint;
  }

  public get bufferedEventCount(): number {
    return this.internalQueue.length;
  }

  public get isReceivingMessages(): boolean {
    return this._isReceivingMessages;
  }

  public getBufferedEvents(count?: number): ReceivedEventData[] {
    let queue = this.internalQueue;
    if (typeof count === "undefined" || count === null) {
      this.internalQueue = [];
    } else {
      queue = queue.splice(0, Math.min(queue.length, count));
    }

    return queue;
  }

  private addCredit(credit: number) {
    if (this._amqpReceiver) {
      this._amqpReceiver.addCredit(credit);
    }
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

  public async close(): Promise<void> {
    if (!this._amqpReceiver) {
      return;
    }

    this.clearHandlers();
    // store amqpReceiver in local variable since deleteFromCache removes it.
    const receiverLink = this._amqpReceiver;
    this.deleteFromCache();
    await this._closeLink(receiverLink);
  }

  public isOpen(): boolean {
    const result: boolean = Boolean(this._amqpReceiver && this._amqpReceiver.isOpen());
    // log error
    return result;
  }

  public async onDetached(amqpError?: AmqpError | Error): Promise<void> {
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
        onMessage: (context: EventContext) => this.onAmqpMessage(context),
        onError: (context: EventContext) => this.onAmqpError(context),
        onClose: (context: EventContext) => this.onAmqpClose(context),
        onSessionClose: (context: EventContext) => this.onAmqpSessionClose(context),
        onSessionError: (context: EventContext) => this.onAmqpSessionError(context),
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
        times: Constants.defaultConnectionRetryAttempts
      };

      await retry(linkCreationConfig);
    } catch (err) {
      // log error
    }
  }

  public registerHandlers(onMessage: OnMessage, onError?: OnError, abortSignal?: AbortSignalLike) {
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

  public clearHandlers(): void {
    this._userDefinedOnError = undefined;
    this._userDefinedOnMessage = undefined;
    this._isReceivingMessages = false;
  }

  private async drainAndAddCredits(onMessage: OnMessage, abortSignal?: AbortSignalLike) {
    await delay(0);
    this._isDrainingQueue = true;
    while (this.internalQueue.length) {
      if (!this.isReceivingMessages) {
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

    if (this.isReceivingMessages) {
      // register the onMessage handler to stop
      // sending events to the queue.

      if (this.isOpen()) {
        // add credits to start receiving events from the service.
        this.addCredit(this.prefetchCount || 1);
      }
    }
  }

  private createAmqpReceiverOptions(options: CreateReceiverOptions): RheaReceiverOptions {
    if (options.newName) {
      this.name = uuid();
    }

    const receiverOptions: RheaReceiverOptions = {
      autoaccept: true,
      credit_window: this.prefetchCount,
      name: this.name,
      onClose: options.onClose || ((context: EventContext) => this.onAmqpClose(context)),
      onError: options.onError || ((context: EventContext) => this.onAmqpError(context)),
      onMessage: options.onMessage || ((context: EventContext) => this.onAmqpMessage(context)),
      onSessionClose: options.onSessionClose || ((context: EventContext) => this.onAmqpSessionClose(context)),
      onSessionError: options.onSessionError || ((context: EventContext) => this.onAmqpSessionError(context)),
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
    // log error
  }

  public async initialize(options?: RheaReceiverOptions) {
    try {
      if (this.isOpen() || this.isConnecting) {
        // log error
      }
      if (!this.isOpen() && !this.isConnecting) {
        // log error
        // attempt creating a connection
        this.isConnecting = true;
        await this._negotiateClaim();
        if (!options) {
          const receiverOptions: CreateReceiverOptions = {
            onClose: (context: EventContext) => this.onAmqpClose(context),
            onError: (context: EventContext) => this.onAmqpError(context),
            onMessage: (context: EventContext) => this.onAmqpMessage(context),
            onSessionClose: (context: EventContext) => this.onAmqpSessionClose(context),
            onSessionError: (context: EventContext) => this.onAmqpSessionError(context)
          };
          if (this.checkpoint > -1) {
            receiverOptions.eventPosition = EventPosition.fromSequenceNumber(this.checkpoint);
          }
          options = this.createAmqpReceiverOptions(receiverOptions);
        }

        // log error
        this._amqpReceiver = await this._context.connection.createReceiver(options);
        this.isConnecting = false;
        // log error
        // store the underlying link in a cache
        this._context.receivers[this.name] = this as any;

        await this._ensureTokenRenewal();
        if (this.hasActiveListeners()) {
          // add at least 1 credit
          this.addCredit(this.prefetchCount || 1);
        }
      } else {
        // log error
      }
    } catch (err) {
      this.isConnecting = false;
      err = translate(err);
      throw err;
    }
  }

  public async abort(): Promise<void> {
    if (typeof this._userDefinedOnError === "function") {
      const error = new AbortError("The receive operation has been cancelled by the user.");
      this._userDefinedOnError(error);
    }
    this.clearHandlers();
    await this.close();
  }

  private hasActiveListeners(): boolean {
    return typeof this._userDefinedOnMessage === "function";
  }

  private onAmqpMessage(context: EventContext) {
    if (!context.message) {
      return;
    }

    // This method should do 3 things:
    // 1. Convert the AMQP message into an Event Data object
    // 2. Update the internal checkpoint based on the Event Data
    // 3. Either push data to internal queue, or call handler.

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
      log.receiver("[%s] RuntimeInfo of Receiver '%s' is %O", this._context.connectionId, this.name, this.runtimeInfo);
    }

    // automatically add credit if there is a listener
    if (this.hasActiveListeners() && !this._isDrainingQueue) {
      this.addCredit(this.prefetchCount || 1);
    }

    if (this._userDefinedOnMessage && !this._isDrainingQueue) {
      this._userDefinedOnMessage(receivedEventData);
    } else {
      this.internalQueue.push(receivedEventData);
    }
  }

  private onAmqpError(context: EventContext) {
    const amqpReceiver = this._amqpReceiver || context.receiver;
    if (!amqpReceiver) {
      return;
    }

    const amqpError = amqpReceiver.error;
    if (!amqpError) {
      return;
    }

    const error = translate(amqpError);

    if (this._userDefinedOnError) {
      this._userDefinedOnError(error);
    }
  }

  private async onAmqpSessionClose(context: EventContext) {
    const amqpReceiver = this._amqpReceiver || context.receiver;
    const sessionError = context.session && context.session.error;

    if (sessionError) {
      // todo: log error
    }

    if (!amqpReceiver || amqpReceiver.isSessionItselfClosed()) {
      // todo: clean up abort signal and log error
      return;
    }

    if (!this.isConnecting) {
      // todo: log error
      // session close event not initiated by SDK, so calling detached handler.
      await this.onDetached(sessionError);
    } else {
      // todo: log error
    }
  }

  private onAmqpSessionError(context: EventContext) {
    const amqpReceiver = this._amqpReceiver || context.receiver;
    const sessionError = context.session && context.session.error;

    if (!sessionError) {
      return;
    }

    const error = translate(sessionError);
    // log error
    if (amqpReceiver && !amqpReceiver.isSessionItselfClosed() && !error.retryable) {
      // handle retry?

      if (this._userDefinedOnError) {
        this._userDefinedOnError(error);
      }
    }
  }

  private async onAmqpClose(context: EventContext) {
    const amqpReceiver = this._amqpReceiver || context.receiver;
    if (!amqpReceiver || amqpReceiver.isItselfClosed()) {
      // todo: clean abort signal
      return;
    }

    const amqpError = amqpReceiver.error;
    if (amqpError) {
      // log the error
    }

    if (!this.isConnecting) {
      // log error
      await this.onDetached(amqpError);
    } else {
      // todo: log error
    }
  }
}
