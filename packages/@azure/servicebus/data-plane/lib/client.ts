// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import { ConnectionContext } from "./connectionContext";
import { ClientEntityContext } from "./clientEntityContext";
import { AmqpError, generate_uuid } from "rhea-promise";
import { throwErrorIfConnectionClosed } from "./util/utils";

/**
 * Describes the abstract base class for QueueClient, TopicClient and SubscriptionClient
 * @abstract
 * @class Client
 */
export abstract class Client {
  /**
   * @property {string} The entitypath for the Service Bus entity for which this client is created.
   * @readonly
   */
  get entityPath(): string {
    return this._entityPath;
  }
  /**
   * @property {string} A unique identifier for the client.
   * @readonly
   */
  get id(): string {
    return this._id;
  }
  /**
   * @property {boolean} _isClosed Denotes if close() was called on this client.
   */
  protected _isClosed: boolean = false;
  /**
   * @property {ClientEntityContext} _context Describes the amqp connection context for the QueueClient.
   */
  protected _context: ClientEntityContext;
  /**
   * @property {string} name The entitypath for the Service Bus entity for which this client is created.
   * For queues and topics, the entitypath is the same as their name. For subscription, its a
   * combination of the topic name and the subscription name
   */
  private _entityPath: string;
  /**
   * @property {string} id A unique identifier for the client. It is usually a combination of
   * the entityPath and a Guid.
   */
  private _id: string;

  /**
   * Instantiates a client pointing to the ServiceBus entity given by this configuration.
   *
   * @constructor
   * @internal
   * @param {string} name The entity name.
   * @param {ConnectionContext} context The connection context to create the QueueClient.
   * @param {TokenProvider} [tokenProvider] The token provider that provides the token for authentication.
   * Default value: SasTokenProvider.
   */
  constructor(entityPath: string, context: ConnectionContext) {
    throwErrorIfConnectionClosed(context);
    this._entityPath = entityPath;
    this._id = `${entityPath}/${generate_uuid()}`;
    this._context = ClientEntityContext.create(entityPath, context);
  }

  /**
   * Closes the client. This is an abstract method.
   */
  abstract async close(): Promise<void>;

  /**
   * Will reconnect the client if neccessary.
   * @internal
   * @param error Error if any
   */
  async detached(error?: AmqpError | Error): Promise<void> {
    try {
      await this._context.detached(error);
    } catch (err) {
      log.error(
        "[%s] [%s] An error occurred while reconnecting the client: %O.",
        this._context.namespace.connectionId,
        this.id,
        err
      );
    }
  }
}
