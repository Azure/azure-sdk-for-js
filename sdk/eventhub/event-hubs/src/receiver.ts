// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import { ConnectionContext } from "./connectionContext";
import { EventHubConsumerOptions } from "./eventHubClient";
import { OnMessage, OnError } from "./eventHubReceiver";
import { ReceivedEventData } from "./eventData";
import { Constants } from "@azure/core-amqp";
import { StreamingReceiver, ReceiveHandler } from "./streamingReceiver";
import { BatchingReceiver } from "./batchingReceiver";
import { AbortSignalLike } from "@azure/abort-controller";
import { throwErrorIfConnectionClosed } from "./util/error";
import { EventPosition } from "./eventPosition";

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
  /**
   * @property Describes the amqp connection context for the QueueClient.
   */
  private _context: ConnectionContext;
  /**
   * @property The consumer group from which the receiver should receive events from.
   */
  private _consumerGroup: string;
  /**
   * @property The event position in the partition at which to start receiving messages.
   */
  private _eventPosition: EventPosition;
  /**
   * @property Denotes if close() was called on this receiver
   */
  private _isClosed: boolean = false;

  private _partitionId: string;
  private _receiverOptions: EventHubConsumerOptions;
  private _streamingReceiver: StreamingReceiver | undefined;
  private _batchingReceiver: BatchingReceiver | undefined;

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
    return this._receiverOptions && this._receiverOptions.ownerLevel;
  }

  /**
   * Indicates whether the consumer is currently receiving messages or not.
   * When this returns true, new `receive()` or `receiveBatch()` calls cannot be made.
   */
  get isReceivingMessages(): boolean {
    if (this._streamingReceiver && this._streamingReceiver.isOpen()) {
      return true;
    }
    if (this._batchingReceiver && this._batchingReceiver.isOpen() && this._batchingReceiver.isReceivingMessages) {
      return true;
    }
    return false;
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
    this._eventPosition = eventPosition;
    this._receiverOptions = options || {};
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
    if (typeof onMessage !== "function") {
      throw new TypeError("The parameter 'onMessage' must be of type 'function'.");
    }
    if (typeof onError !== "function") {
      throw new TypeError("The parameter 'onError' must be of type 'function'.");
    }
    const checkpoint = this.getCheckpoint();
    if (checkpoint) {
      this._eventPosition = EventPosition.fromSequenceNumber(checkpoint);
    }
    this._streamingReceiver = StreamingReceiver.create(
      this._context,
      this.consumerGroup,
      this.partitionId,
      this._eventPosition,
      this._receiverOptions
    );
    this._streamingReceiver.prefetchCount = Constants.defaultPrefetchCount;
    return this._streamingReceiver.receive(onMessage, onError, abortSignal);
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
  async *getEventIterator(options?: EventIteratorOptions): AsyncIterableIterator<ReceivedEventData> {
    if (!options) {
      options = {};
    }

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
    maxWaitTimeInSeconds?: number,
    abortSignal?: AbortSignalLike
  ): Promise<ReceivedEventData[]> {
    this._throwIfReceiverOrConnectionClosed();
    this._throwIfAlreadyReceiving();
    const checkpoint = this.getCheckpoint();
    if (checkpoint) {
      this._eventPosition = EventPosition.fromSequenceNumber(checkpoint);
    }
    if (!this._batchingReceiver || !this._batchingReceiver.isOpen()) {
      this._batchingReceiver = BatchingReceiver.create(
        this._context,
        this.consumerGroup,
        this.partitionId,
        this._eventPosition,
        this._receiverOptions
      );
    } else if (this._batchingReceiver.checkpoint < checkpoint!) {
      await this._batchingReceiver.close();
      this._batchingReceiver = BatchingReceiver.create(
        this._context,
        this.consumerGroup,
        this.partitionId,
        this._eventPosition,
        this._receiverOptions
      );
    }

    let result: ReceivedEventData[] = [];
    try {
      result = await this._batchingReceiver.receive(
        maxMessageCount,
        maxWaitTimeInSeconds,
        this._receiverOptions.retryOptions,
        abortSignal
      );
      if (result.length < maxMessageCount) {
        // we are now re-using the same receiver link between multiple calls to receiveBatch() or the iterator on the receiver.
        // This can result in the receiver link having pending credits if a receiveBatch() call asking for m events returned n events where n < m.
        // Since Event Hubs doesnt support the drain feature yet, this can result in the receiver link receiving events when the user is not expecting it to.
        // Hence closing the link when result.length < maxMessageCount
        await this._batchingReceiver.close();
      }
    } catch (err) {
      log.error(
        "[%s] Receiver '%s', an error occurred while receiving %d messages for %d max time:\n %O",
        this._context.connectionId,
        this._batchingReceiver.name,
        maxMessageCount,
        maxWaitTimeInSeconds,
        err
      );
      throw err;
    }
    return result;
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
        // Close the streaming receiver.
        if (this._streamingReceiver) {
          await this._streamingReceiver.close();
          this._streamingReceiver = undefined;
        }

        // Close the batching receiver.
        if (this._batchingReceiver) {
          await this._batchingReceiver.close();
          this._batchingReceiver = undefined;
        }
      }
    } catch (err) {
      log.error(
        "[%s] An error occurred while closing the Receiver for %s: %O",
        this._context.connectionId,
        this._context.config.entityPath,
        err
      );
      throw err;
    } finally {
      this._isClosed = true;
    }
  }

  private getCheckpoint(): number | undefined {
    if (!this._streamingReceiver && !this._batchingReceiver) {
      return;
    }
    let lastBatchingReceiverSequenceNum: number = -1;
    let lastStreamingReceiverSequenceNum: number = -1;
    if (this._batchingReceiver) {
      lastBatchingReceiverSequenceNum = this._batchingReceiver.checkpoint;
    }
    if (this._streamingReceiver) {
      lastStreamingReceiverSequenceNum = this._streamingReceiver.checkpoint;
    }

    const checkpoint = Math.max(lastStreamingReceiverSequenceNum, lastBatchingReceiverSequenceNum);
    if (checkpoint === -1) {
      return;
    }
    return checkpoint;
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
    if (this.isClosed) {
      const errorMessage =
        `The EventHubConsumer for "${this._context.config.entityPath}" has been closed and can no longer be used. ` +
        `Please create a new EventHubConsumer using the "createConsumer" function on the EventHubClient.`;
      const error = new Error(errorMessage);
      log.error(`[${this._context.connectionId}] %O`, error);
      throw error;
    }
  }
}
