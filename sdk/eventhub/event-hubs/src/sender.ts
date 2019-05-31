// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventData } from "./eventData";
import { EventHubSender } from "./eventHubSender";
import { BatchingOptions, SenderOptions } from "./eventHubClient";
import { ConnectionContext } from "./connectionContext";
import * as log from "./log";
import { throwErrorIfConnectionClosed } from "./util/error";

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

  private _senderOptions: SenderOptions;

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
  constructor(context: ConnectionContext, options?: SenderOptions) {
    this._context = context;
    this._senderOptions = options || {};
    this._eventHubSender = EventHubSender.create(this._context, this._senderOptions.partitionId);
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
    this._throwIfSenderOrConnectionClosed();
    if (!Array.isArray(events)) {
      events = [events];
    }
    return this._eventHubSender.send(events, { ...this._senderOptions, ...options });
  }

  /**
   * Closes the underlying AMQP sender link.
   * Once closed, the sender cannot be used for any further operations.
   * Use the `createSender` function on the EventHubClient to instantiate a new Sender
   *
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    try {
      if (this._context.connection && this._context.connection.isOpen() && this._eventHubSender) {
        await this._eventHubSender.close();
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
        `The sender for "${this._context.config.entityPath}" has been closed and can no longer be used. ` +
        `Please create a new sender using the "createSender" function on the EventHubClient.`;
      const error = new Error(errorMessage);
      log.error(`[${this._context.connectionId}] %O`, error);
      throw error;
    }
  }
}
