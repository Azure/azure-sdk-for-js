// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import { ConnectionContext } from "./connectionContext";
import { ReceiverOptions } from "./eventHubClient";
import { OnMessage, OnError } from "./eventHubReceiver";
import { ReceivedEventData } from "./eventData";
import { MessagingError, Constants } from "@azure/amqp-common";
import { StreamingReceiver, ReceiveHandler } from "./streamingReceiver";
import { BatchingReceiver } from "./batchingReceiver";
import { Aborter } from "./aborter";
import { throwErrorIfConnectionClosed } from "./util/error";

/**
 * Options to pass when creating an iterator to iterate over events
 */
export interface EventIteratorOptions {
  /**
   * Number of events to fetch at a time in the background
   */
  prefetchCount?: number;
  /**
   * Cancellation token to cancel the operation
   */
  cancellationToken?: Aborter;
}

/**
 * The Receiver class can be used to receive messages in a batch or by registering handlers.
 * Use the `createReceiver` function on the QueueClient or SubscriptionClient to instantiate a Receiver.
 * The Receiver class is an abstraction over the underlying AMQP receiver link.
 * @class Receiver
 */
export class Receiver {
  /**
   * @property Describes the amqp connection context for the QueueClient.
   */
  private _context: ConnectionContext;
  /**
   * @property {boolean} [_isClosed] Denotes if close() was called on this receiver
   */
  private _isClosed: boolean = false;

  private _partitionId: string;
  private _receiverOptions: ReceiverOptions;
  private _streamingReceiver: StreamingReceiver | undefined;
  private _batchingReceiver: BatchingReceiver | undefined;

  /**
   * @property Returns `true` if the receiver is closed. This can happen either because the receiver
   * itself has been closed or the client that created it has been closed.
   * @readonly
   */
  public get isClosed(): boolean {
    return this._isClosed;
  }

  /**
   * @property Returns `true` if the receiver is closed. This can happen either because the receiver
   * itself has been closed or the client that created it has been closed.
   * @readonly
   */
  public get partitionId(): string {
    return this._partitionId;
  }

  /**
   * @property {string} [consumerGroup] The consumer group from which the handler is receiving
   * events from.
   * @readonly
   */
  get consumerGroup(): string | undefined {
    return this._receiverOptions && this._receiverOptions.consumerGroup;
  }

  /**
   * @property {number} [epoch] The epoch value of the underlying receiver, if present.
   * @readonly
   */
  get exclusiveReceiverPriority(): number | undefined {
    return this._receiverOptions && this._receiverOptions.exclusiveReceiverPriority;
  }

  /**
   * @internal
   */
  constructor(context: ConnectionContext, partitionId: string, options?: ReceiverOptions) {
    this._context = context;
    this._partitionId = partitionId;
    this._receiverOptions = options || {};
  }
  /**
   * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session. Messages will be passed to
   * the provided onMessage handler and error will be passed to the provided onError handler.
   *
   * @param {OnMessage} onMessage                              The message handler to receive event data objects.
   * @param {OnError} onError                                  The error handler to receive an error that occurs
   * while receiving messages.
   * @param {ReceiverOptions} [options]                         Options for how you'd like to receive messages.
   *
   * @returns {ReceiveHandler} ReceiveHandler - An object that provides a mechanism to stop receiving more messages.
   */
  receive(onMessage: OnMessage, onError: OnError, cancellationToken?: Aborter): ReceiveHandler {
    this._throwIfReceiverOrConnectionClosed();
    this._streamingReceiver = StreamingReceiver.create(this._context, this.partitionId, this._receiverOptions);
    this._streamingReceiver.prefetchCount = Constants.defaultPrefetchCount;
    return this._streamingReceiver.receive(onMessage, onError);
  }

  /**
   * Gets an async iterator over events from the receiver.
   */
  async *getEventIterator(options?: EventIteratorOptions): AsyncIterableIterator<ReceivedEventData> {
    if (!options) {
      options = {};
    }
    while (true) {
      const currentBatch = await this.receiveBatch(options.prefetchCount || 1, 60, options.cancellationToken);
      yield currentBatch[0];
    }
  }

  /**
   * Closes the underlying AMQP receiver link.
   * Once closed, the receiver cannot be used for any further operations.
   * Use the `createReceiver` function on the EventHubClient to instantiate
   * a new Receiver
   *
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    try {
      if (this._context.connection && this._context.connection.isOpen()) {
        // Close the streaming receiver.
        if (this._streamingReceiver) {
          await this._streamingReceiver.close();
        }

        // Close the batching receiver.
        if (this._batchingReceiver) {
          await this._batchingReceiver.close();
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

  /**
   * Indicates whether the receiver is currently receiving messages or not.
   * When this returns true, new `registerMessageHandler()` or `receiveMessages()` calls cannot be made.
   */
  isReceivingMessages(): boolean {
    return false;
  }

  /**
   * Receives a batch of EventData objects from an EventHub partition for a given count and a given max wait time in seconds, whichever
   * happens first. This method can be used directly after creating the receiver object and **MUST NOT** be used along with the `start()` method.
   *
   * @param {number} maxMessageCount                           The maximum message count. Must be a value greater than 0.
   * @param {number} [maxWaitTimeInSeconds]                    The maximum wait time in seconds for which the Receiver should wait
   * to receiver the said amount of messages. If not provided, it defaults to 60 seconds.
   * @param {ReceiverOptions} [options]                         Options for how you'd like to receive messages.
   *
   * @returns {Promise<Array<EventData>>} Promise<Array<EventData>>.
   */
  async receiveBatch(
    maxMessageCount: number,
    maxWaitTimeInSeconds?: number,
    cancellationToken?: Aborter
  ): Promise<ReceivedEventData[]> {
    this._throwIfReceiverOrConnectionClosed();
    this._batchingReceiver = BatchingReceiver.create(this._context, this.partitionId, this._receiverOptions);
    let error: MessagingError | undefined;
    let result: ReceivedEventData[] = [];
    try {
      result = await this._batchingReceiver.receive(maxMessageCount, maxWaitTimeInSeconds);
    } catch (err) {
      error = err;
      log.error(
        "[%s] Receiver '%s', an error occurred while receiving %d messages for %d max time:\n %O",
        this._context.connectionId,
        this._batchingReceiver.name,
        maxMessageCount,
        maxWaitTimeInSeconds,
        err
      );
    }
    try {
      await this._batchingReceiver.close();
    } catch (err) {
      // do nothing about it.
    }
    if (error) {
      throw error;
    }
    return result;
  }

  private _throwIfReceiverOrConnectionClosed(): void {
    throwErrorIfConnectionClosed(this._context);
    if (this.isClosed) {
      const errorMessage =
        `The receiver for "${this._context.config.entityPath}" has been closed and can no longer be used. ` +
        `Please create a new receiver using the "createReceiver" function on the EventHubClient.`;
      const error = new Error(errorMessage);
      log.error(`[${this._context.connectionId}] %O`, error);
      throw error;
    }
  }
}
