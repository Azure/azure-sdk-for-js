// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import { ConnectionContext } from "./connectionContext";
import { Client } from "./client";
import { Sender } from "./sender";
import { throwErrorIfConnectionClosed } from "./util/utils";

/**
 * Describes the client that allows interacting with a Service Bus Topic.
 * Use the `createTopicClient` function on the Namespace object to instantiate a TopicClient
 * @class TopicClient
 */
export class TopicClient extends Client {
  private _currentSender: Sender | undefined;

  /**
   * Constructor for TopicClient.
   * This is not meant for the user to call directly.
   * The user should use the `createTopicClient` on the Namespace instead.
   *
   * @constructor
   * @internal
   * @param name - The topic name.
   * @param context - The connection context to create the TopicClient.
   */
  constructor(name: string, context: ConnectionContext) {
    super(name, context);
  }

  /**
   * Closes the AMQP link for the sender created by this client.
   * Once closed, neither the TopicClient nor its senders can be used for any
   * further operations. Use the `createTopicClient` function on the Namespace object to
   * instantiate a new TopicClient
   *
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    try {
      if (this._context.namespace.connection && this._context.namespace.connection.isOpen()) {
        // Close the sender.
        if (this._currentSender) {
          await this._currentSender.close();
        }

        // Delete the reference in ConnectionContext
        await this._context.clearClientReference(this.id);

        // Mark this client as closed, so that we can show appropriate errors for subsequent usage
        this._isClosed = true;

        log.topicClient("Closed the topic client '%s'.", this.id);
      }
    } catch (err) {
      const msg =
        `An error occurred while closing the topic client ` +
        `"${this.id}": ${JSON.stringify(err)} `;
      log.error(msg);
      throw new Error(msg);
    }
  }

  /**
   * Gets a Sender to be used for sending messages, scheduling messages to be sent at a later time
   * and cancelling such scheduled messages.
   *
   * If the Topic has session enabled Subscriptions, then messages sent without the `sessionId`
   * property will go to the dead letter queue of such subscriptions.
   */
  getSender(): Sender {
    this.throwErrorIfClientOrConnectionClosed();
    if (!this._currentSender || this._currentSender.isClosed) {
      this._currentSender = new Sender(this._context);
    }
    return this._currentSender;
  }

  /**
   * Throws error if given client has been closed
   * @param client
   */
  private throwErrorIfClientOrConnectionClosed(): void {
    throwErrorIfConnectionClosed(this._context.namespace);
    if (this._isClosed) {
      throw new Error("The topicClient has been closed and can no longer be used.");
    }
  }
}
