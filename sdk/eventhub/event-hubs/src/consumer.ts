import { BaseConsumer, OnMessage, OnError } from "./baseReceiver";
import { ConnectionContext } from "./connectionContext";
import { EventPosition } from "./eventPosition";
import { AbortSignalLike, AbortError } from "@azure/abort-controller";
import { ReceiveHandler } from "./receiveHandler";
import { RetryConfig, randomNumberFromInterval, Constants, RetryOperationType, retry } from "@azure/core-amqp";
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
    return this._isClosed || this._connectionContext.wasConnectionCloseCalled;
  }

  public get ownerLevel(): number | undefined {
    return this._consumerOptions && this._consumerOptions.ownerLevel;
  }

  public get isReceivingMessages(): boolean {
    if (this._baseConsumer && this._baseConsumer.isReceivingMessages) {
      return true;
    }

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
    this._baseConsumer = new BaseConsumer(connectionContext, consumerGroup, partitionId, eventPosition, options);
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
    this.throwIfReceiverOrConnectionClosed();
    this.throwIfAlreadyReceiving();

    if (!this._baseConsumer) {
      // what do?
      console.log("what!");
      return [];
    }

    const receivedEvents: ReceivedEventData[] = [];

    const retrieveEvents = (): Promise<ReceivedEventData[]> => {
      return new Promise(async (resolve, reject) => {
        const onAbort = () => {
          clearTimeout(timer);
          this._baseConsumer && this._baseConsumer.abort();
        };

        // operation has been cancelled, so exit immediately
        if (abortSignal) {
          if (abortSignal.aborted) {
            return reject(new AbortError("The receive operation has been cancelled by the user."));
          }
        }

        if (!this._baseConsumer) {
          return resolve(receivedEvents);
        }
        this._baseConsumer.prefetchCount = maxMessageCount - receivedEvents.length;

        const cleanUpBeforeReturn = () => {
          if (this._baseConsumer) {
            this._baseConsumer.clearHandlers();
          }
          if (abortSignal) {
            abortSignal.removeEventListener("abort", onAbort);
          }
          clearTimeout(timer);
        };

        this._baseConsumer.registerHandlers(eventData => {
          receivedEvents.push(eventData);

          if (receivedEvents.length === maxMessageCount) {
            cleanUpBeforeReturn();
            resolve(receivedEvents);
          }
        }, reject);

        let timer: any;
        const addTimeout = () => {
          timer = setTimeout(() => {
            cleanUpBeforeReturn();
            resolve(receivedEvents);
          }, maxWaitTimeInSeconds * 1000);
        };

        if (!this._baseConsumer.isOpen()) {
          try {
            await this._baseConsumer.initialize();
            if (abortSignal && abortSignal.aborted) {
              return this._baseConsumer.abort();
            }
            addTimeout();
          } catch (err) {
            cleanUpBeforeReturn();
            return reject(err);
          }
        } else {
          addTimeout();
        }

        if (abortSignal) {
          abortSignal.addEventListener("abort", onAbort);
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
    this.throwIfReceiverOrConnectionClosed();
    this.throwIfAlreadyReceiving();

    if (!this._baseConsumer) {
      throw new Error("TODO"); // TODO
    }

    if (typeof onMessage !== "function") {
      throw new TypeError("The parameter 'onMessage' must be of type 'function'.");
    }
    if (typeof onError !== "function") {
      throw new TypeError("The parameter 'onError' must be of type 'function'.");
    }

    // return immediately if the abortSignal is already aborted.
    if (abortSignal) {
      if (abortSignal.aborted) {
        onError(new AbortError("The receive operation has been cancelled by the user."));
        return new ReceiveHandler(this._baseConsumer);
      }

      abortSignal.addEventListener("abort", () => {
        this._baseConsumer && this._baseConsumer.abort();
      });
    }

    // TODO: PREFETCH COUNT
    // set the prefetch count to something high
    this._baseConsumer.prefetchCount = Constants.defaultPrefetchCount;
    this._baseConsumer.registerHandlers(onMessage, onError);
    if (!this._baseConsumer.isOpen()) {
      this._baseConsumer
        .initialize()
        .then((): any => {
          if (abortSignal && abortSignal.aborted) {
            if (this._baseConsumer) {
              return this._baseConsumer.close();
            }
          }
        })
        .catch(err => {
          onError(err);
        });
    }

    return new ReceiveHandler(this._baseConsumer);
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
