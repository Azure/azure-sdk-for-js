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
 * Use the `createTopicClient` function on the ServiceBusClient object to instantiate a TopicClient
 * @class TopicClient
 */
export class TopicClient implements Client {
  /**
   * @readonly
   * @property The path for the Service Bus Topic for which this client is created.
   */
  readonly entityPath: string;
  /**
   * @readonly
   * @property A unique identifier for this client.
   */
  readonly id: string;
  /**
   * @property Describes the amqp connection context for the QueueClient.
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
   * @throws Error if the TopicClient or the underlying connection is closed.
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
   * further operations.
   *
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    try {
      // Close the corresponding client context which will take care of closing all AMQP links
      // associated with this client
      await this._context.close();
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
   *
   * If the Topic has session enabled Subscriptions, then messages sent without the `sessionId`
   * property will go to the dead letter queue of such subscriptions.
   * @throws Error if the TopicClient or the underlying connection is closed.
   * @throws Error if an open sender already exists on the TopicClient.
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
   * @param topicName Name of the topic whose dead letter counterpart's name is being fetched
   * @param subscriptionName Name of the subscription whose dead letter counterpart's name is being fetched
   */
  static getDeadLetterTopicPath(topicName: string, subscriptionName: string): string {
    return `${topicName}/Subscriptions/${subscriptionName}/$DeadLetterQueue`;
  }
}
