// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { logErrorStackTrace, logger } from "./log";
import { ConnectionContext } from "./connectionContext";
import { EventHubConsumerOptions } from "./impl/eventHubClient";
import { EventHubReceiver, LastEnqueuedEventProperties } from "./eventHubReceiver";
import { ReceivedEventData } from "./eventData";
import { RetryConfig, RetryOperationType, RetryOptions, retry } from "@azure/core-amqp";
import { AbortError, AbortSignalLike } from "@azure/abort-controller";
import { throwErrorIfConnectionClosed } from "./util/error";
import { EventPosition } from "./eventPosition";
import "@azure/core-asynciterator-polyfill";

/**
 * A consumer is responsible for reading `EventData` from a specific Event Hub partition
 * in the context of a specific consumer group.
 * To create a consumer use the `createConsumer()` method on your `EventHubClient`.
 *
 * You can pass the below in the `options` when creating a consumer.
 * - `ownerLevel`  : A number indicating that the consumer intends to be an exclusive consumer of events resulting in other
 * consumers to fail if their `ownerLevel` is lower or doesn't exist.
 * - `retryOptions`: The retry options used to govern retry attempts when an issue is encountered while receiving events.
 *
 * Multiple consumers are allowed on the same partition in a consumer group.
 * If there is a need to have an exclusive consumer for a partition in a consumer group,
 * then specify the `ownerLevel` in the `options`.
 * Exclusive consumers were previously referred to as "Epoch Receivers".
 *
 * The consumer can be used to receive messages in a batch using `receiveBatch()` or by registering handlers
 * by using `receive()` or via an async iterable got by using `getEventIterator()`
 * @class
 * @ignore
 * @internal
 */
export class EventHubConsumer {
  private _baseConsumer?: EventHubReceiver;
  /**
   * @property Describes the amqp connection context for the QueueClient.
   */
  private _context: ConnectionContext;
  /**
   * @property Denotes if close() was called on this receiver
   */
  private _isClosed: boolean = false;
  /**
   * @property The set of options to configure the behavior of an EventHubConsumer.
   */
  private _receiverOptions: EventHubConsumerOptions;
  /**
   * @property The set of retry options to configure the receiveBatch operation.
   */
  private _retryOptions: RetryOptions;
  /**
   * @property A set of information about the last enqueued event of a partition.
   */
  private _lastEnqueuedEventProperties: LastEnqueuedEventProperties;

  /**
   * @property The last enqueued event information. This property will only
   * be enabled when `trackLastEnqueuedEventProperties` option is set to true in the
   * `client.createConsumer()` method.
   * @readonly
   */
  public get lastEnqueuedEventProperties(): LastEnqueuedEventProperties {
    return this._lastEnqueuedEventProperties;
  }

  /**
   * @property Returns `true` if the consumer is closed. This can happen either because the consumer
   * itself has been closed or the client that created it has been closed.
   * @readonly
   */
  public get isClosed(): boolean {
    return this._isClosed || this._context.wasConnectionCloseCalled;
  }

  /**
   * Indicates whether the consumer is currently receiving messages or not.
   * When this returns true, new `receive()` or `receiveBatch()` calls cannot be made.
   */
  get isReceivingMessages(): boolean {
    return Boolean(this._baseConsumer && this._baseConsumer.isReceivingMessages);
  }

  /**
   * EventHubConsumer should not be constructed using `new EventHubConsumer()`
   * Use the `createConsumer()` method on your `EventHubClient` instead.
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
    this._lastEnqueuedEventProperties = {};
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
   * Returns a promise that resolves to an array of events received from the service.
   *
   * @param maxMessageCount The maximum number of messages to receive.
   * @param maxWaitTimeInSeconds The maximum amount of time to wait to build up the requested message count;
   * If not provided, it defaults to 60 seconds.
   * @param abortSignal An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @returns Promise<ReceivedEventData[]>.
   * @throws AbortError if the operation is cancelled via the abortSignal.
   * @throws MessagingError if an error is encountered while receiving a message.
   * @throws Error if the underlying connection or receiver has been closed.
   * Create a new EventHubConsumer using the EventHubClient createConsumer method.
   * @throws Error if the receiver is already receiving messages.
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
          // Cancellation is intentional so logging to 'info'.
          logger.info(desc);
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

        logger.verbose(
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
            if (
              this._receiverOptions.trackLastEnqueuedEventProperties &&
              this._baseConsumer &&
              this._baseConsumer.runtimeInfo
            ) {
              this._lastEnqueuedEventProperties = this._baseConsumer.runtimeInfo;
            }
            // resolve the operation's promise after the requested
            // number of events are received.
            if (receivedEvents.length === maxMessageCount) {
              logger.info(
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
          logger.verbose(
            msg,
            this._context.connectionId,
            maxWaitTimeInSeconds,
            this._baseConsumer && this._baseConsumer.name
          );

          // resolve the operation's promise after the requested
          // max number of seconds have passed.
          timer = setTimeout(() => {
            logger.info(
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
      operation: retrieveEvents,
      operationType: RetryOperationType.receiveMessage,
      abortSignal: abortSignal,
      retryOptions: retryOptions
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
   * @throws Error if the underlying connection encounters an error while closing.
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
      logger.warning(`[${this._context.connectionId}] %O`, error);
      logErrorStackTrace(error);
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
      logger.error(`[${this._context.connectionId}] %O`, error);
      logErrorStackTrace(error);
      throw error;
    }
  }
}
