// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as log from "./log";
import { ConnectionContext } from "./connectionContext";
import { ClientEntityContext } from "./clientEntityContext";
import { AmqpError, generate_uuid } from "rhea-promise";

/**
 * Describes the base class for a client.
 * @abstract
 * @class Client
 */
export abstract class Client {
  /**
   * @property {string} name The name of the entity (queue, topic, subscription, etc.)
   */
  name: string;
  /**
   * @property {string} id A unique identifier for the client. It is usually a combination of
   * the name and a Guid.
   */
  id: string;
  /**
   * @property {ClientEntityContext} _context Describes the amqp connection context for the QueueClient.
   */
  protected _context: ClientEntityContext;

  /**
   * Instantiates a client pointing to the ServiceBus entity given by this configuration.
   *
   * @constructor
   * @param {string} name The entity name.
   * @param {ConnectionContext} context The connection context to create the QueueClient.
   * @param {TokenProvider} [tokenProvider] The token provider that provides the token for authentication.
   * Default value: SasTokenProvider.
   */
  constructor(name: string, context: ConnectionContext) {
    this.name = name;
    this.id = `${name}/${generate_uuid()}`;
    this._context = ClientEntityContext.create(name, context);
  }

  /**
   * Closes the client. This is an abstract method.
   */
  abstract async close(): Promise<void>;

  /**
   * Will reconnect the client if neccessary.
   * @ignore
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

  /**
   * Provides the current type of the Client.
   * @return {string} The entity type.
   */
  protected get _type(): string {
    let result = "Client";
    if ((this as any).constructor && (this as any).constructor.name) {
      result = (this as any).constructor.name;
    }
    return result;
  }
}
