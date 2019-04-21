// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import { ConnectionContext } from "./connectionContext";
import { Client, ClientType } from "./client";
import { Sender } from "./sender";
import {
  getOpenSenderErrorMsg,
  throwErrorIfClientOrConnectionClosed,
  throwErrorIfConnectionClosed
} from "./util/errors";
import { generate_uuid } from "rhea-promise";
import { ClientEntityContext } from "./clientEntityContext";

/**
 * Describes the client that allows interacting with a Service Bus Topic.
 * Use the `createTopicClient` function on the Namespace object to instantiate a TopicClient
 * @class TopicClient
 */
export class TopicClient implements Client {
  /**
   * @property {string} The entitypath for the Service Bus Topic for which this client is created.
   */
  readonly entityPath: string;
  /**
   * @property {string} A unique identifier for the client.
   */
  readonly id: string;
  /**
   * @property {ClientEntityContext} _context Describes the amqp connection context for the QueueClient.
   */
  private _context: ClientEntityContext;

  private _currentSender: Sender | undefined;

  /**
   * Constructor for TopicClient.
   * This is not meant for the user to call directly.
   * The user should use the `createTopicClient` on the Namespace instead.
   *
   * @constructor
   * @internal
   * @param topicName - The topic name.
   * @param context - The connection context to create the TopicClient.
   */
  constructor(topicName: string, context: ConnectionContext) {
    throwErrorIfConnectionClosed(context);
    this.entityPath = String(topicName);
    this.id = `${this.entityPath}/${generate_uuid()}`;
    this._context = ClientEntityContext.create(
      this.entityPath,
      ClientType.TopicClient,
      context,
      this.id
    );
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
        log.topicClient("Closing the topic client '%s'.", this.id);

        // Close the sender.
        if (this._currentSender) {
          await this._currentSender.close();
        }

        await this._context.close();

        // Mark this client as closed, so that we can show appropriate errors for subsequent usage
        this._context.isClosed = true;

        log.topicClient("Closed the topic client '%s'.", this.id);
      }
    } catch (err) {
      log.error(
        "[%s] An error occurred while closing the TopicClient for %s: %O",
        this._context.namespace.connectionId,
        this.id,
        err
      );
      throw err;
    }
  }

  /**
   * Creates a Sender to be used for sending messages, scheduling messages to be sent at a later time
   * and cancelling such scheduled messages.
   * Throws error if an open sender already exists for this TopicClient.
   *
   * If the Topic has session enabled Subscriptions, then messages sent without the `sessionId`
   * property will go to the dead letter queue of such subscriptions.
   */
  createSender(): Sender {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this.entityPath,
      this._context.isClosed
    );
    if (!this._currentSender || this._currentSender.isClosed) {
      this._currentSender = new Sender(this._context);
      return this._currentSender;
    }

    const errorMessage = getOpenSenderErrorMsg("TopicClient", this.entityPath);
    const error = new Error(errorMessage);
    log.error(`[${this._context.namespace.connectionId}] %O`, error);
    throw error;
  }

  /**
   * Returns the corresponding dead letter topic name for the given topic and subscription names.
   * Use this in the `createSubscriptionClient` function of the `ServiceBusClient` instance to
   * receive messages from dead letter queue for given subscription.
   * @param topicName
   * @param subscriptionName
   */
  static getDeadLetterTopicPath(topicName: string, subscriptionName: string): string {
    return `${topicName}/Subscriptions/${subscriptionName}/$DeadLetterQueue`;
  }
}
