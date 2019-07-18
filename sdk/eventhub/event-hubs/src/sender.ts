// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventData } from "./eventData";
import { EventHubSender } from "./eventHubSender";
import { EventHubProducerOptions, SendOptions, BatchOptions } from "./eventHubClient";
import { ConnectionContext } from "./connectionContext";
import * as log from "./log";
import { throwErrorIfConnectionClosed, throwTypeErrorIfParameterMissing } from "./util/error";
import { EventDataBatch } from "./eventDataBatch";

/**
 * A producer responsible for sending `EventData` to a specific Event Hub.
 * If `partitionId` is specified in the `options`, all event data sent using the producer
 * will be sent to the specified partition.
 * Otherwise, they are automatically routed to an available partition by the Event Hubs service.
 *
 * Allowing automatic routing of partitions is recommended when:
 *  - The sending of events needs to be highly available.
 *  - The event data should be evenly distributed among all available partitions.
 *
 * Use the `createProducer` function on the EventHubClient to instantiate an EventHubProducer.
 * @class
 */
export class EventHubProducer {
  /**
   * @property Describes the amqp connection context for the Client.
   */
  private _context: ConnectionContext;
  /**
   * @property Denotes if close() was called on this sender
   */
  private _isClosed: boolean = false;

  private _senderOptions: EventHubProducerOptions;

  private _eventHubSender: EventHubSender | undefined;

  /**
   * @property Returns `true` if either the producer or the client that created it has been closed.
   * @readonly
   */
  public get isClosed(): boolean {
    return this._isClosed || this._context.wasConnectionCloseCalled;
  }

  /**
   * @constructor
   * @internal
   * @ignore
   */
  constructor(context: ConnectionContext, options?: EventHubProducerOptions) {
    this._context = context;
    this._senderOptions = options || {};
    const partitionId =
      this._senderOptions.partitionId != undefined
        ? String(this._senderOptions.partitionId)
        : undefined;
    this._eventHubSender = EventHubSender.create(this._context, partitionId);
  }

  /**
   * Creates an instance of EventDataBatch to which one can add events until the maximum supported size is reached.
   * The batch can be passed to the send method of the EventHubProducer to be sent to Azure Event Hubs
   * @param options  Options to define partition key and max message size.
   * @returns Promise<EventDataBatch>
   */
  async createBatch(options?: BatchOptions): Promise<EventDataBatch> {
    this._throwIfSenderOrConnectionClosed();
    if (!options) {
      options = {};
    }
    // throw an error if partition key and partition id are both defined
    if (
      typeof options.partitionKey === "string" &&
      typeof this._senderOptions.partitionId === "string"
    ) {
      const error = new Error(
        "Creating a batch with partition key is not supported when using producers that were created using a partition id."
      );
      log.error(
        "[%s] Partition key is not supported when using producers that were created using a partition id. %O",
        this._context.connectionId,
        error
      );
      throw error;
    }

    let maxMessageSize = await this._eventHubSender!.getMaxMessageSize();
    if (options.maxMessageSizeInBytes) {
      if (options.maxMessageSizeInBytes > maxMessageSize) {
        const error = new Error(
          `Max message size (${options.maxMessageSizeInBytes} bytes) is greater than maximum message size (${maxMessageSize} bytes) on the AMQP sender link.`
        );
        log.error(
          `[${this._context.connectionId}] Max message size (${options.maxMessageSizeInBytes} bytes) is greater than maximum message size (${maxMessageSize} bytes) on the AMQP sender link. ${error}`
        );
        throw error;
      }
      maxMessageSize = options.maxMessageSizeInBytes;
    }
    return new EventDataBatch(this._context, maxMessageSize, options.partitionKey);
  }

  /**
   * Send a single or an array of events to the associated Event Hub.
   *
   * @param eventData  An individual event data or array of event data objects to send.
   * @param options The set of options that can be specified to influence the way in which
   * events are sent to the associated Event Hub, including an abort signal to cancel the operation.
   *
   * @returns Promise<void>
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   * @throws {MessagingError} Thrown if an error is encountered while sending a message.
   * @throws {TypeError} Thrown if a required parameter is missing.
   * @throws {Error} Thrown if the underlying connection or sender has been closed.
   * @throws {Error} Thrown if a partitionKey is provided when the producer was created with a partitionId.
   * @throws {Error} Thrown if batch was created with partitionKey different than the one provided in the options.
   * Create a new producer using the EventHubClient createProducer method.
   */
  async send(
    eventData: EventData | EventData[] | EventDataBatch,
    options?: SendOptions
  ): Promise<void> {
    this._throwIfSenderOrConnectionClosed();
    if (Array.isArray(eventData) && eventData.length === 0) {
      log.error(`[${this._context.connectionId}] No events to send.`);
      return;
    }
    if (eventData instanceof EventDataBatch && !eventData.batchMessage) {
      log.error(
        `[${this._context.connectionId}] No events to send, use tryAdd() function on the EventDataBatch to add events in a batch.`
      );
      return;
    }
    throwTypeErrorIfParameterMissing(this._context.connectionId, "eventData", eventData);
    if (!Array.isArray(eventData) && !(eventData instanceof EventDataBatch)) {
      eventData = [eventData];
    }
    return this._eventHubSender!.send(eventData, { ...this._senderOptions, ...options });
  }

  /**
   * Closes the underlying AMQP sender link.
   * Once closed, the producer cannot be used for any further operations.
   * Use the `createProducer` function on the EventHubClient to instantiate a new EventHubProducer.
   *
   * @returns
   * @throws {Error} Thrown if the underlying connection encounters an error while closing.
   */
  async close(): Promise<void> {
    try {
      if (this._context.connection && this._context.connection.isOpen() && this._eventHubSender) {
        await this._eventHubSender.close();
        this._eventHubSender = undefined;
      }
      this._isClosed = true;
    } catch (err) {
      log.error(
        "[%s] An error occurred while closing the Sender for %s: %O",
        this._context.connectionId,
        this._context.config.entityPath,
        err
      );
      throw err;
    }
  }

  private _throwIfSenderOrConnectionClosed(): void {
    throwErrorIfConnectionClosed(this._context);
    if (this.isClosed) {
      const errorMessage =
        `The EventHubProducer for "${this._context.config.entityPath}" has been closed and can no longer be used. ` +
        `Please create a new EventHubProducer using the "createProducer" function on the EventHubClient.`;
      const error = new Error(errorMessage);
      log.error(`[${this._context.connectionId}] %O`, error);
      throw error;
    }
  }
}
