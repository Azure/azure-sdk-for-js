// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventData } from "./eventData";
import { EventHubSender } from "./eventHubSender";
import { EventHubProducerOptions, SendOptions } from "./eventHubClient";
import { ConnectionContext } from "./connectionContext";
import * as log from "./log";
import { throwErrorIfConnectionClosed, throwTypeErrorIfParameterMissing } from "./util/error";

/**
 * A producer responsible for transmitting `EventData` to a specific Event Hub.
 * Depending on the options specified at creation, the producer may be created to allow event data
 * to be automatically routed to an available partition or specific to a partition.
 *
 * Allowing automatic routing of partitions is recommended when:
 *  - The sending of events needs to be highly available.
 *  - The event data should be evenly distributed among all available partitions.
 *
 * If no partition is specified, the following rules are used for automatically selecting one:
 *  1. Distribute the events equally amongst all available partitions using a round-robin approach.
 *  2. If a partition becomes unavailable, the Event Hubs service will automatically detect it and forward the message to another available partition.
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
   */
  constructor(context: ConnectionContext, options?: EventHubProducerOptions) {
    this._context = context;
    this._senderOptions = options || {};
    const partitionId =
      this._senderOptions.partitionId != undefined ? String(this._senderOptions.partitionId) : undefined;
    this._eventHubSender = EventHubSender.create(this._context, partitionId);
  }

  /**
   * Send an individual or set of event data to the associated Event Hub.
   *
   * @param eventData  An individual event data or array of event data objects to send.
   * @param options The set of options where you can specifiy the partition to send the message to along with controlling the send
   * request via retry options, log level and abort signal.
   *
   * @returns Promise<void>
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   * @throws {MessagingError} Thrown if an error is encountered while sending a message.
   * @throws {TypeError} Thrown if a required parameter is missing.
   * @throws {Error} Thrown if the underlying connection or sender has been closed.
   * @throws {Error} Thrown if a partitionKey is provided when the producer was created with a partitionId.
   * Create a new producer using the EventHubClient createProducer method.
   */
  async send(eventData: EventData | EventData[], options?: SendOptions): Promise<void> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfParameterMissing(this._context.connectionId, "eventData", eventData);
    if (!Array.isArray(eventData)) {
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
