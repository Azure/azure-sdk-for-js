// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventData } from "./eventData";
import { EventHubSender } from "./eventHubSender";
import { BatchingOptions, RequestOptions } from "./eventHubClient";
import { ConnectionContext } from './connectionContext';


/**
 * The Sender class can be used to send messages, schedule messages to be sent at a later time
 * and cancel such scheduled messages.
 * Use the `createSender` function on the QueueClient or TopicClient to instantiate a Sender.
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
  constructor(context: ConnectionContext, options?: RequestOptions) {
    this._context = context;
    this._requestOptions = options || {};
  }
  
    /**
   * Send a batch of EventData to the EventHub using the options provided.
   *
   * @param data  An array of EventData objects to be sent in a Batch message.
   * @param options Options where you can specifiy the partition to send the message to along with controlling the send
   * request via retry options, log level and cancellation token.
   *
   * @return {Promise<void>} Promise<void>
   */
  async send(data: EventData[], options?: BatchingOptions): Promise<void>;
  /**
   * Send a batch of EventData to specified partition of the EventHub using the options provided.
   *
   * @param data  An array of EventData objects to be sent in a Batch message.
   * @param partitionId Partition ID to which the event data needs to be sent.
   *
   * @return Promise<void>
   */
  async send(data: EventData[], partitionId: string, options?: BatchingOptions): Promise<void>;
  async send(
    data: EventData[],
    partitionIdOrOptions?: string | BatchingOptions,
    options?: BatchingOptions
  ): Promise<void> {
    let partitionId: string | undefined;
    if (typeof partitionIdOrOptions === "string") {
      partitionId = partitionIdOrOptions;
    } else {
      options = partitionIdOrOptions;
    }

    if (options) {
      partitionId = options.partitionId;
    }

    const sender = EventHubSender.create(this._context, partitionId);
    return sender.send(data, {...this._requestOptions, ...options});
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
