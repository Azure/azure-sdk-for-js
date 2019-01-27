// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import { ConnectionContext } from "./connectionContext";
import { Client } from "./client";
import { Sender } from "./sender";

/**
 * Describes the TopicClient that is used to interact with a ServiceBus Topic.
 * @class TopicClient
 */
export class TopicClient extends Client {
  /**
   * Instantiates a client pointing to the ServiceBus Topic given by this configuration.
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
   * Gets a Sender by establishing an AMQP session and an AMQP sender link on the session.
   * This Sender can be used to send messages, schedule messages to be sent at a later time
   * and cancel such scheduled messages.
   */
  getSender(): Sender {
    return new Sender(this._context);
  }
}
