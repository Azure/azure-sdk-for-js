import { BaseConsumer, OnMessage, OnError } from "./baseReceiver";
import { ConnectionContext } from "./connectionContext";
import { EventPosition } from "./eventPosition";
import { AbortSignalLike } from "@azure/abort-controller";
import { ReceiveHandler } from "./receiveHandler";
import { delay, RetryConfig, randomNumberFromInterval, Constants, RetryOperationType, retry } from "@azure/core-amqp";
import { ReceivedEventData } from "./eventData";
import { EventHubConsumerOptions } from "./eventHubClient";
import { throwErrorIfConnectionClosed } from "./util/error";

/**
 * Options to pass when creating an iterator to iterate over events
 */
export interface EventIteratorOptions {
  /**
   * Number of events to fetch at a time in the background
   */
  // prefetchCount?: number;
  /**
   * An implementation of the `AbortSignalLike` interface to signal the `EventIterator` to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

export class Consumer {
  private _baseConsumer?: BaseConsumer;
  private readonly _connectionContext: ConnectionContext;
  private readonly _consumerGroup: string;
  private readonly _consumerOptions: EventHubConsumerOptions;
  private _isClosed: boolean = false;
  private _partitionId: string;

  public get isClosed(): boolean {
    return this._isClosed;
  }

  public get ownerLevel(): number | undefined {
    return this._consumerOptions && this._consumerOptions.ownerLevel;
  }

  public get isReceivingMessages(): boolean {
    if (this._baseConsumer && this._baseConsumer.isReceivingMessages) {
      return true;
    }
    // todo: handle batching case
    return false;
  }

  public get consumerGroup(): string {
    return this._consumerGroup;
  }

  public get partitionId(): string {
    return this._partitionId;
  }

  constructor(
    connectionContext: ConnectionContext,
    consumerGroup: string,
    partitionId: string,
    eventPosition: EventPosition,
    options?: EventHubConsumerOptions
  ) {
    this._connectionContext = connectionContext;
    this._consumerGroup = consumerGroup;
    this._consumerOptions = options || {};
    this._partitionId = partitionId;
    this._baseConsumer = new BaseConsumer(connectionContext, consumerGroup, partitionId, eventPosition);
  }

  public async *getEventIterator(options: EventIteratorOptions = {}): AsyncIterableIterator<ReceivedEventData> {
    const maxMessageCount = 1;
    const maxWaitTimeInSeconds = Constants.defaultOperationTimeoutInSeconds;

    while (true) {
      const currentBatch = await this.receiveBatch(maxMessageCount, maxWaitTimeInSeconds, options.abortSignal);
      if (!currentBatch || !currentBatch.length) {
        continue;
      }
      yield currentBatch[0];
    }
  }

  public async close(): Promise<void> {
    try {
      if (this._connectionContext.connection && this._connectionContext.connection.isOpen()) {
        if (this._baseConsumer) {
          await this._baseConsumer.close();
          this._baseConsumer = void 0;
        }
      }
    } catch (err) {
      throw err;
    } finally {
      this._isClosed = true;
    }
  }

  public async receiveBatch(maxMessageCount: number, maxWaitTimeInSeconds: number = 60, abortSignal?: AbortSignalLike) {
    // check if I am closed
    // check if I am already receiving messages
    this.throwIfReceiverOrConnectionClosed();
    this.throwIfAlreadyReceiving();

    // todo: handle abort signal
    // use buffered events first
    const receivedEvents = this.getBufferedEvents(maxMessageCount);

    if (receivedEvents.length === maxMessageCount) {
      return receivedEvents;
    }

    const retrieveEvents = (): Promise<ReceivedEventData[]> => {
      return new Promise(async (resolve, reject) => {
        if (!this._baseConsumer) {
          return resolve(receivedEvents);
        }
        this._baseConsumer.prefetchCount = maxMessageCount - receivedEvents.length;

        const cleanUpBeforeReturn = () => {
          if (this._baseConsumer) {
            this._baseConsumer.clearErrorHandler();
            this._baseConsumer.clearMessageHandler();
          }
          // todo: clear abort signal
          clearTimeout(timer);
        };

        this._baseConsumer.registerMessageHandler(eventData => {
          receivedEvents.push(eventData);

          if (receivedEvents.length === maxMessageCount) {
            cleanUpBeforeReturn();
            resolve(receivedEvents);
          }
        });

        const timer = setTimeout(() => {
          cleanUpBeforeReturn();
          resolve(receivedEvents);
        }, maxWaitTimeInSeconds * 1000);

        this._baseConsumer.registerErrorHandler(reject);
        if (!this._baseConsumer.isOpen()) {
          await this._baseConsumer.initialize();
        }
      });
    };

    const retryOptions = this._consumerOptions.retryOptions;
    const jitterInSeconds = randomNumberFromInterval(1, 4);
    const times =
      retryOptions && retryOptions.retryCount && retryOptions.retryCount > 0
        ? retryOptions.retryCount
        : Constants.defaultRetryAttempts;
    const delayInSeconds =
      retryOptions && retryOptions.retryInterval && retryOptions.retryInterval > 0
        ? retryOptions.retryInterval / 1000
        : Constants.defaultDelayBetweenOperationRetriesInSeconds;

    const config: RetryConfig<ReceivedEventData[]> = {
      connectionHost: this._connectionContext.config.host,
      connectionId: this._connectionContext.connectionId,
      delayInSeconds: delayInSeconds + jitterInSeconds,
      operation: retrieveEvents,
      operationType: RetryOperationType.receiveMessage,
      times
    };
    return retry<ReceivedEventData[]>(config);
  }

  public receive(onMessage: OnMessage, onError: OnError, abortSignal?: AbortSignalLike) {
    // todo: handle abort signal?

    if (!this._baseConsumer) {
      throw new Error("TODO"); // TODO
    }

    this.drainBufferedEvents(onMessage, abortSignal)
      .then((): any => {
        if (!this._baseConsumer) {
          return;
        }

        this._baseConsumer.registerErrorHandler(onError);
        this._baseConsumer.registerMessageHandler(onMessage);
        if (!this._baseConsumer.isOpen()) {
          return this._baseConsumer.initialize();
        }
      })
      .then(() => {
        // todo: check abortSignal status
        if (abortSignal && abortSignal.aborted) {
        }
      })
      .catch(err => {
        onError(err);
      });

    //todo: allow cancellation of draining the buffer
    return new ReceiveHandler(this._baseConsumer);
  }

  private async drainBufferedEvents(onMessage: OnMessage, abortSignal?: AbortSignalLike, incrementalCount: number = 1) {
    while (this._baseConsumer && this._baseConsumer.bufferedEventCount) {
      // allow synchronous logic to complete so user can do things like stop receiving messages.
      await delay(0);
      if (!this._baseConsumer || (abortSignal && abortSignal.aborted)) {
        return;
      }
      const events = this._baseConsumer.getBufferedEvents(incrementalCount);
      if (events.length) {
        onMessage(events[0]);
      }
    }
  }

  private getBufferedEvents(maxCount: number): ReceivedEventData[] {
    if (!this._baseConsumer || !this._baseConsumer.bufferedEventCount) {
      return [];
    }

    const bufferCount = this._baseConsumer.bufferedEventCount;
    return this._baseConsumer.getBufferedEvents(Math.min(bufferCount, maxCount));
  }

  private throwIfAlreadyReceiving(): void {
    if (this.isReceivingMessages) {
      const errorMessage = `The EventHubConsumer for "${this._connectionContext.config.entityPath}" is already receiving messages.`;
      const error = new Error(errorMessage);
      //log.error(`[${this._connectionContext.connectionId}] %O`, error);
      throw error;
    }
  }

  private throwIfReceiverOrConnectionClosed(): void {
    throwErrorIfConnectionClosed(this._connectionContext);
    if (this.isClosed) {
      const errorMessage =
        `The EventHubConsumer for "${this._connectionContext.config.entityPath}" has been closed and can no longer be used. ` +
        `Please create a new EventHubConsumer using the "createConsumer" function on the EventHubClient.`;
      const error = new Error(errorMessage);
      //log.error(`[${this._connectionContext.connectionId}] %O`, error);
      throw error;
    }
  }
}
