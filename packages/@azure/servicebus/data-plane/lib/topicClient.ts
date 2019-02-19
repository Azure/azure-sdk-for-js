// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import { ConnectionContext } from "./connectionContext";
import { Client } from "./client";
import { Sender } from "./sender";
import { throwErrorIfConnectionClosed } from "./util/utils";

/**
 * Describes the client that will maintain an AMQP connection to a ServiceBus Topic.
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
   * @param name - The topic name.
   * @param context - The connection context to create the TopicClient.
   */
  constructor(name: string, context: ConnectionContext) {
    super(name, context);
  }

  /**
   * Closes the AMQP connection to the ServiceBus Topic for this client.
   *
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    try {
      if (this._context.namespace.connection && this._context.namespace.connection.isOpen()) {
        // Close the sender.
        if (this._context.sender) {
          await this._context.sender.close();
        }
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
   * Gets the Sender to be used for sending messages, scheduling messages to be sent at a later time
   * and cancelling such scheduled messages.
   * If the Topic has session enabled Subscriptions, then messages sent without the `sessionId`
   * property will go to the dead letter queue of such subscriptions.
   */
  getSender(): Sender {
    throwErrorIfConnectionClosed(this._context.namespace);
    if (!this._currentSender) {
      this._currentSender = new Sender(this._context);
    }
    return this._currentSender;
  }
}
