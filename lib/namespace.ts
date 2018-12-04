// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as log from "./log";
import {
  ApplicationTokenCredentials, DeviceTokenCredentials, UserTokenCredentials, MSITokenCredentials
} from "ms-rest-azure";
import { ConnectionContext } from "./connectionContext";
import { QueueClientOptions, QueueClient } from "./queueClient";
import { TopicClient } from "./topicClient";
import {
  ConnectionConfig, DataTransformer, TokenProvider, AadTokenProvider
} from "@azure/amqp-common";
import { SubscriptionClient, SubscriptionClientOptions } from "./subscriptionClient";

/**
 * Describes the base namesapce options.
 * @interface NamespaceOptionsBase
 */
export interface NamespaceOptionsBase {
  /**
   * @property {DataTransformer} [dataTransformer] The data transformer that will be used to encode
   * and decode the sent and received messages respectively. If not provided then we will use the
   * DefaultDataTransformer. The default transformer should handle majority of the cases. This
   * option needs to be used only for specialized scenarios.
   */
  dataTransformer?: DataTransformer;
}

/**
 * Describes the options that can be provided while creating the Namespace.
 * @interface NamespaceOptions
 */
export interface NamespaceOptions extends NamespaceOptionsBase {
  /**
   * @property {TokenProvider} [tokenProvider] - The token provider that provides the token
   * for authentication. Default value: SasTokenProvider.
   */
  tokenProvider?: TokenProvider;
}

/**
 * Describes the Service Bus Namespace and is the entry point for using Queues, Topics and
 * Subscriptions.
 */
export class Namespace {
  /**
   * @property {string} name The namespace name of the service bus.
   */
  name: string;
  /**
   * @property {ConnectionContext} _context Describes the amqp connection context for the Namespace.
   * @private
   */
  private _context: ConnectionContext;

  /**
   * Instantiates a client pointing to the ServiceBus Queue given by this configuration.
   *
   * @constructor
   * @param {ConnectionConfig} config - The connection configuration to create the Namespace.
   * @param {TokenProvider} [tokenProvider] - The token provider that provides the token for
   * authentication. Default value: `SasTokenProvider`.
   */
  constructor(config: ConnectionConfig, options?: NamespaceOptions) {
    if (!options) options = {};
    this.name = config.endpoint;
    this._context = ConnectionContext.create(config, options);
  }

  /**
   * Creates a QueueClient for the given Queue name. It assumes that the queue has already been
   * created.
   * @param {string} queueName The queue name.
   * @param {QueueClientOptions} options The queue client options.
   * @returns QueueClient.
   */
  createQueueClient(queueName: string, options?: QueueClientOptions): QueueClient {
    const client = new QueueClient(queueName, this._context, options);
    this._context.clients[client.id] = client;
    log.ns("Created the QueueClient for Queue: %s", queueName);
    return client;
  }

  /**
   * Creates a TopicClient for the given topic name. It assumes that the topic has already been
   * created.
   * @param {string} topicName The topic name.
   * @returns TopicClient.
   */
  createTopicClient(topicName: string): TopicClient {
    const client = new TopicClient(topicName, this._context);
    this._context.clients[client.id] = client;
    log.ns("Created the TopicClient for Topic: %s", topicName);
    return client;
  }

  /**
   * Creates a SubscriptionClient for the given topic name and subscription.
   * It assumes that the topic has already been created.
   * @param {string} topicName The topic name.
   * @param {string} subscriptionName The subscription name.
   * @param {SubscriptionClientOptions} [options] Optional parameters that can be provided while
   * creating a SubscriptionClient.
   * @returns SubscriptionClient.
   */
  createSubscriptionClient(topicName: string, subscriptionName: string,
    options?: SubscriptionClientOptions): SubscriptionClient {
    const client = new SubscriptionClient(topicName, subscriptionName, this._context, options);
    this._context.clients[client.id] = client;
    log.ns("Created the SubscriptionClient for Topic: %s and Subscription: %s",
      topicName, subscriptionName);
    return client;
  }

  /**
   * Closes the namespace, the AMQP connection and all the entities on this conenction.
   * @returns {Promise<any>}
   */
  async close(): Promise<any> {
    try {
      if (this._context.connection.isOpen()) {
        // Close all the senders.
        for (const id of Object.keys(this._context.clients)) {
          const client = this._context.clients[id];
          await client.close();
        }
        await this._context.cbsSession.close();

        // Close management sessions
        for (const id of Object.keys(this._context.clients)) {
          const client = this._context.clients[id];
          await (client as any)._context.managementClient.close();
        }

        await this._context.connection.close();
        this._context.wasConnectionCloseCalled = true;
        log.ns("Closed the amqp connection '%s' on the client.", this._context.connectionId);
      }
    } catch (err) {
      const msg = `An error occurred while closing the connection ` +
        `"${this._context.connectionId}": ${JSON.stringify(err)}`;
      log.error(msg);
      throw new Error(msg);
    }
  }

  /**
   * Creates a Namespace from connection string.
   * @param {string} connectionString - Connection string of the form
   * 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
   * @param {NamespaceOptions} [options] Options that can be provided during namespace creation.
   * @returns {Namespace} - An instance of the Namespace.
   */
  static createFromConnectionString(connectionString: string, options?: NamespaceOptions): Namespace {
    if (!connectionString || typeof connectionString !== "string") {
      throw new Error("'connectionString' is a required parameter and must be of type: 'string'.");
    }
    const config = ConnectionConfig.create(connectionString);
    return new Namespace(config, options);
  }

  /**
   * Creates a Namespace from a generic token provider.
   * @param {string} host - Fully qualified domain name for Servicebus. Most likely,
   * `<yournamespace>.servicebus.windows.net`.
   * @param {TokenProvider} tokenProvider - Your token provider that implements the TokenProvider interface.
   * @param {NamespaceOptionsBase} options - The options that can be provided during namespace creation.
   * @returns {Namespace} An instance of the Namespace.
   */
  static createFromTokenProvider(
    host: string,
    tokenProvider: TokenProvider,
    options?: NamespaceOptionsBase): Namespace {
    if (!host || (host && typeof host !== "string")) {
      throw new Error("'host' is a required parameter and must be of type: 'string'.");
    }
    if (!tokenProvider || (tokenProvider && typeof tokenProvider !== "object")) {
      throw new Error("'tokenProvider' is a required parameter and must be of type: 'object'.");
    }
    if (!host.endsWith("/")) host += "/";
    const connectionString = `Endpoint=sb://${host};SharedAccessKeyName=defaultKeyName;` +
      `SharedAccessKey=defaultKeyValue`;
    if (!options) options = {};
    const nsOptions: NamespaceOptions = options;
    nsOptions.tokenProvider = tokenProvider;
    return Namespace.createFromConnectionString(connectionString, nsOptions);
  }

  /**
   * Creates a Namespace from AADTokenCredentials.
   * @param {string} host - Fully qualified domain name for ServiceBus.
   * Most likely, {yournamespace}.servicebus.windows.net
   * @param {TokenCredentials} credentials - The AAD Token credentials.
   * It can be one of the following: ApplicationTokenCredentials | UserTokenCredentials |
   * DeviceTokenCredentials | MSITokenCredentials.
   * @param {NamespaceOptionsBase} options - The options that can be provided during namespace creation.
   * @returns {Namespace} An instance of the Namespace.
   */
  static createFromAadTokenCredentials(
    host: string,
    credentials: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials,
    options?: NamespaceOptions): Namespace {
    if (!host || typeof host !== "string") {
      throw new Error("'host' is a required parameter and must be of type: 'string'.");
    }

    if (typeof credentials !== "object") {
      throw new Error("'credentials' is a required parameter and must be an instance of " +
        "ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | " +
        "MSITokenCredentials.");
    }
    const tokenProvider = new AadTokenProvider(credentials);
    return Namespace.createFromTokenProvider(host, tokenProvider, options);
  }

  static getDeadLetterQueuePathForQueue(queueName: string): string {
    return `${queueName}/$DeadLetterQueue`;
  }
}
