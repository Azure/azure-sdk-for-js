// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventData } from "./eventData";
import { EventHubSender } from "./eventHubSender";
import { BatchingOptions, RequestOptions } from "./eventHubClient";
import { ConnectionContext } from "./connectionContext";

/**
 * The Sender class can be used to send messages.
 * Use the `createSender` function on the EventHubClient to instantiate a Sender.
 * The Sender class is an abstraction over the underlying AMQP sender link.
 * @class Sender
 */
export class Sender {
  /**
   * @property Describes the amqp connection context for the Client.
   */
  private _context: ConnectionContext;
  /**
   * @property Denotes if close() was called on this sender
   */
  private _isClosed: boolean = false;

  private _requestOptions: RequestOptions;

  private _eventHubSender: EventHubSender;

  /**
   * @property Returns `true` if either the sender or the client that created it has been closed
   * @readonly
   */
  public get isClosed(): boolean {
    return this._isClosed;
  }

  /**
   * @internal
   */
  constructor(context: ConnectionContext, partitionId?: string | number, options?: RequestOptions) {
    this._context = context;
    this._requestOptions = options || {};
    this._eventHubSender = EventHubSender.create(this._context, partitionId);
  }

  /**
   * Send a batch of EventData to the EventHub using the options provided.
   *
   * @param events  An array of EventData objects to be sent in a Batch message.
   * @param options Options where you can specifiy the partition to send the message to along with controlling the send
   * request via retry options, log level and cancellation token.
   *
   * @return {Promise<void>} Promise<void>
   */
  async send(events: EventData[], options?: BatchingOptions): Promise<void> {
    if (!Array.isArray(events)) {
      events = [events];
    }
    return this._eventHubSender.send(events, { ...this._requestOptions, ...options });
  }

  /**
   * Closes the underlying AMQP sender link.
   * Once closed, the sender cannot be used for any further operations.
   * Use the `createSender` function on the QueueClient or TopicClient to instantiate a new Sender
   *
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    this._isClosed = true;
  }
}
