// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import { ConnectionContext } from "./connectionContext";
import { EventHubConsumerOptions, RetryOptions } from "./eventHubClient";
import { OnMessage, OnError, EventHubReceiver } from "./eventHubReceiver";
import { ReceivedEventData } from "./eventData";
import {
  RetryConfig,
  Constants,
  RetryOperationType,
  retry,
  MessagingError
} from "@azure/core-amqp";
import { ReceiveHandler } from "./receiveHandler";
import { AbortSignalLike, AbortError } from "@azure/abort-controller";
import { throwErrorIfConnectionClosed } from "./util/error";
import { EventPosition } from "./eventPosition";
import "@azure/core-asynciterator-polyfill";

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

/**
 * A consumer is responsible for reading `EventData` from a specific Event Hub partition
 * in the context of a specific consumer group.
 *
 * Multiple consumers are allowed on the same partition in a consumer group.
 * If there is a need to have an exclusive consumer for a partition in a consumer group,
 * then specify the `ownerLevel` in the `options`.
 * Exclusive consumers were previously referred to as "Epoch Receivers".
 *
 * The consumer can be used to receive messages in a batch or by registering handlers.
 * Use the `createConsumer` function on the EventHubClient to instantiate an EventHubConsumer.
 * @class
 */
export class EventHubConsumer {
  private _baseConsumer?: EventHubReceiver;
  /**
   * @property Describes the amqp connection context for the QueueClient.
   */
  private _context: ConnectionContext;
  /**
   * @property The consumer group from which the receiver should receive events from.
   */
  private _consumerGroup: string;
  /**
   * @property Denotes if close() was called on this receiver
   */
  private _isClosed: boolean = false;
  /**
   * @property The identifier of the Event Hub partition that this consumer is associated with.
   * Events will be read only from this partition.
   */
  private _partitionId: string;
  /**
   * @property The set of options to configure the behavior of an EventHubConsumer.
   */
  private _receiverOptions: EventHubConsumerOptions;
  /**
   * @property The set of retry options to configure the receiveBatch operation.
   */
  private _retryOptions: RetryOptions;

  /**
   * @property Returns `true` if the consumer is closed. This can happen either because the consumer
   * itself has been closed or the client that created it has been closed.
   * @readonly
   */
  public get isClosed(): boolean {
    return this._isClosed || this._context.wasConnectionCloseCalled;
  }

  /**
   * @property The identifier of the Event Hub partition that this consumer is associated with.
   * Events will be read only from this partition.
   * @readonly
   */
  public get partitionId(): string {
    return this._partitionId;
  }

  /**
   * @property The name of the consumer group that this consumer is associated with.
   * Events will be read only in the context of this group.
   * @readonly
   */
  get consumerGroup(): string {
    return this._consumerGroup;
  }

  /**
   * @property The owner level associated with an exclusive consumer; for a non-exclusive consumer, this value will be null or undefined.
   *
   * When provided, the owner level indicates that a consumer is intended to be the exclusive receiver of events for the
   * requested partition and the associated consumer group.
   * When multiple consumers exist for the same partition/consumer group pair, then the ones with lower or no
   * `ownerLevel` will get a `ReceiverDisconnectedError` during the next attempted receive operation.
   * @readonly
   */
  get ownerLevel(): number | undefined {
    return this._receiverOptions.ownerLevel;
  }

  /**
   * Indicates whether the consumer is currently receiving messages or not.
   * When this returns true, new `receive()` or `receiveBatch()` calls cannot be made.
   */
  get isReceivingMessages(): boolean {
    return Boolean(this._baseConsumer && this._baseConsumer.isReceivingMessages);
  }

  /**
   * @constructor
   * @internal
   * @ignore
   */
  constructor(
    context: ConnectionContext,
    consumerGroup: string,
    partitionId: string,
    eventPosition: EventPosition,
    options?: EventHubConsumerOptions
  ) {
    this._context = context;
    this._consumerGroup = consumerGroup;
    this._partitionId = partitionId;
    this._receiverOptions = options || {};
    this._retryOptions = this._receiverOptions.retryOptions || {};
    this._baseConsumer = new EventHubReceiver(
      context,
      consumerGroup,
      partitionId,
      eventPosition,
      options
    );
  }
  /**
   * Starts the consumer by establishing an AMQP session and an AMQP receiver link on the session. Messages will be passed to
   * the provided onMessage handler and error will be passed to the provided onError handler.
   *
   * @param onMessage The message handler to receive event data objects.
   * @param onError The error handler to receive an error that occurs
   * while receiving messages.
   * @param abortSignal An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   * @returns ReceiveHandler - An object that provides a mechanism to stop receiving more messages.
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   * @throws {TypeError} Thrown if a required parameter is missing.
   * @throws {Error} Thrown if the underlying connection or receiver has been closed.
   * Create a new EventHubConsumer using the EventHubClient createConsumer method.
   * @throws {Error} Thrown if the receiver is already receiving messages.
   */
  receive(onMessage: OnMessage, onError: OnError, abortSignal?: AbortSignalLike): ReceiveHandler {
    this._throwIfReceiverOrConnectionClosed();
    this._throwIfAlreadyReceiving();
    const baseConsumer = this._baseConsumer!;

    if (typeof onMessage !== "function") {
      throw new TypeError("The parameter 'onMessage' must be of type 'function'.");
    }
    if (typeof onError !== "function") {
      throw new TypeError("The parameter 'onError' must be of type 'function'.");
    }

    // return immediately if the abortSignal is already aborted.
    if (abortSignal && abortSignal.aborted) {
      onError(new AbortError("The receive operation has been cancelled by the user."));
      // close this receiver when user triggers a cancellation.
      this.close().catch(() => {}); // no-op close error handler
      return new ReceiveHandler(baseConsumer);
    }

    const wrappedOnError = (error: Error) => {
      // ignore retryable errors
      if ((error as MessagingError).retryable) {
        return;
      }

      log.error(
        "[%s] Since the error is not retryable, we let the user know about it by calling the user's error handler.",
        this._context.connectionId
      );

      if (error.name === "AbortError") {
        // close this receiver when user triggers a cancellation.
        this.close().catch(() => {}); // no-op close error handler
      }
      onError(error);
    };

    const onAbort = () => {
      if (this._baseConsumer) {
        this._baseConsumer.abort();
      }
    };

    baseConsumer.registerHandlers(
      onMessage,
      wrappedOnError,
      Constants.defaultPrefetchCount,
      true,
      abortSignal,
      onAbort
    );

    return new ReceiveHandler(baseConsumer);
  }

  /**
   * Returns an async iterable that retrieves events.
   *
   * The async iterable cannot indicate that it is done.
   * When using `for..await..of` to iterate over the events returned
   * by the async iterable, take care to exit the for loop after receiving the
   * desired number of messages, or provide an `AbortSignal` to control when to exit the loop.
   *
   * @param [options] A set of options to apply to an event iterator.
   */
  async *getEventIterator(
    options: EventIteratorOptions = {}
  ): AsyncIterableIterator<ReceivedEventData> {
    const maxMessageCount = 1;
    const maxWaitTimeInSeconds = Constants.defaultOperationTimeoutInSeconds;

    while (true) {
      const currentBatch = await this.receiveBatch(
        maxMessageCount,
        maxWaitTimeInSeconds,
        options.abortSignal
      );
      if (!currentBatch || !currentBatch.length) {
        continue;
      }
      yield currentBatch[0];
    }
  }

  /**
   * Receives a batch of EventData objects from an EventHub partition for a given count and a given max wait time in seconds, whichever
   * happens first. This method can be used directly after creating the consumer object and **MUST NOT** be used along with the `start()` method.
   *
   * @param maxMessageCount The maximum number of messages to receive in this batch. Must be a value greater than 0.
   * @param [maxWaitTimeInSeconds] The maximum amount of time to wait to build up the requested message count for the batch;
   * If not provided, it defaults to 60 seconds.
   * @param abortSignal An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @returns Promise<ReceivedEventData[]>.
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   * @throws {MessagingError} Thrown if an error is encountered while receiving a message.
   * @throws {Error} Thrown if the underlying connection or receiver has been closed.
   * Create a new EventHubConsumer using the EventHubClient createConsumer method.
   * @throws {Error} Thrown if the receiver is already receiving messages.
   */
  async receiveBatch(
    maxMessageCount: number,
    maxWaitTimeInSeconds: number = 60,
    abortSignal?: AbortSignalLike
  ): Promise<ReceivedEventData[]> {
    this._throwIfReceiverOrConnectionClosed();
    this._throwIfAlreadyReceiving();

    // store events across multiple retries
    const receivedEvents: ReceivedEventData[] = [];

    const retrieveEvents = (): Promise<ReceivedEventData[]> => {
      return new Promise(async (resolve, reject) => {
        // if this consumer was closed, _baseConsumer might be undefined.
        // resolve the operation's promise with the events collected thus far in case
        // the promise hasn't already been resolved.
        if (!this._baseConsumer) {
          return resolve(receivedEvents);
        }

        let timer: any;
        const logOnAbort = (): void => {
          const baseConsumer = this._baseConsumer;
          const name = baseConsumer && baseConsumer.name;
          const address = baseConsumer && baseConsumer.address;
          const desc: string =
            `[${this._context.connectionId}] The request operation on the Receiver "${name}" with ` +
            `address "${address}" has been cancelled by the user.`;
          log.error(desc);
        };

        const rejectOnAbort = async (): Promise<void> => {
          logOnAbort();
          try {
            await this.close();
          } finally {
            return reject(new AbortError("The receive operation has been cancelled by the user."));
          }
        };

        // operation has been cancelled, so exit immediately
        if (abortSignal && abortSignal.aborted) {
          return await rejectOnAbort();
        }

        // updates the prefetch count so that the baseConsumer adds
        // the correct number of credits to receive the same number of events.
        const prefetchCount = Math.max(maxMessageCount - receivedEvents.length, 0);
        if (prefetchCount === 0) {
          return resolve(receivedEvents);
        }

        log.batching(
          "[%s] Receiver '%s', setting the prefetch count to %d.",
          this._context.connectionId,
          this._baseConsumer && this._baseConsumer.name,
          prefetchCount
        );

        const cleanUpBeforeReturn = (): void => {
          if (this._baseConsumer) {
            this._baseConsumer.clearHandlers();
          }
          clearTimeout(timer);
        };

        const onAbort = (): void => {
          clearTimeout(timer);
          rejectOnAbort();
        };

        this._baseConsumer.registerHandlers(
          (eventData) => {
            receivedEvents.push(eventData);

            // resolve the operation's promise after the requested
            // number of events are received.
            if (receivedEvents.length === maxMessageCount) {
              log.batching(
                "[%s] Batching Receiver '%s', %d messages received within %d seconds.",
                this._context.connectionId,
                this._baseConsumer && this._baseConsumer.name,
                receivedEvents.length,
                maxWaitTimeInSeconds
              );
              cleanUpBeforeReturn();
              resolve(receivedEvents);
            }
          },
          (err) => {
            cleanUpBeforeReturn();
            if (err.name === "AbortError") {
              rejectOnAbort();
            } else {
              reject(err);
            }
          },
          maxMessageCount - receivedEvents.length,
          false,
          abortSignal,
          onAbort
        );

        const addTimeout = (): void => {
          const msg = "[%s] Setting the wait timer for %d seconds for receiver '%s'.";
          log.batching(
            msg,
            this._context.connectionId,
            maxWaitTimeInSeconds,
            this._baseConsumer && this._baseConsumer.name
          );

          // resolve the operation's promise after the requested
          // max number of seconds have passed.
          timer = setTimeout(() => {
            log.batching(
              "[%s] Batching Receiver '%s', %d messages received when max wait time in seconds %d is over.",
              this._context.connectionId,
              this._baseConsumer && this._baseConsumer.name,
              receivedEvents.length,
              maxWaitTimeInSeconds
            );
            cleanUpBeforeReturn();
            resolve(receivedEvents);
          }, maxWaitTimeInSeconds * 1000);
        };

        addTimeout();
        if (abortSignal && !abortSignal.aborted) {
          abortSignal.addEventListener("abort", onAbort);
        }
      });
    };

    const retryOptions = this._retryOptions;
    const config: RetryConfig<ReceivedEventData[]> = {
      connectionHost: this._context.config.host,
      connectionId: this._context.connectionId,
      delayInSeconds:
        typeof retryOptions.retryInterval === "number" && retryOptions.retryInterval > 0
          ? retryOptions.retryInterval / 1000
          : Constants.defaultDelayBetweenOperationRetriesInSeconds,
      operation: retrieveEvents,
      operationType: RetryOperationType.receiveMessage,
      maxRetries: retryOptions.maxRetries,
      retryPolicy: retryOptions.retryPolicy,
      minExponentialRetryDelayInMs: retryOptions.minExponentialRetryDelayInMs,
      maxExponentialRetryDelayInMs: retryOptions.maxExponentialRetryDelayInMs
    };
    return retry<ReceivedEventData[]>(config);
  }

  /**
   * Closes the underlying AMQP receiver link.
   * Once closed, the consumer cannot be used for any further operations.
   * Use the `createConsumer` function on the EventHubClient to instantiate
   * a new EventHubConsumer.
   *
   * @returns
   * @throws {Error} Thrown if the underlying connection encounters an error while closing.
   */
  async close(): Promise<void> {
    try {
      if (this._context.connection && this._context.connection.isOpen()) {
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

  private _throwIfAlreadyReceiving(): void {
    if (this.isReceivingMessages) {
      const errorMessage = `The EventHubConsumer for "${this._context.config.entityPath}" is already receiving messages.`;
      const error = new Error(errorMessage);
      log.error(`[${this._context.connectionId}] %O`, error);
      throw error;
    }
  }

  private _throwIfReceiverOrConnectionClosed(): void {
    throwErrorIfConnectionClosed(this._context);
    if (!this._baseConsumer || this.isClosed) {
      const errorMessage =
        `The EventHubConsumer for "${this._context.config.entityPath}" has been closed and can no longer be used. ` +
        `Please create a new EventHubConsumer using the "createConsumer" function on the EventHubClient.`;
      const error = new Error(errorMessage);
      log.error(`[${this._context.connectionId}] %O`, error);
      throw error;
    }
  }
}
