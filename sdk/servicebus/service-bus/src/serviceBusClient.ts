// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import {
  ApplicationTokenCredentials,
  DeviceTokenCredentials,
  UserTokenCredentials,
  MSITokenCredentials
} from "@azure/ms-rest-nodeauth";
import { ConnectionContext } from "./connectionContext";
import { QueueClient } from "./queueClient";
import { TopicClient } from "./topicClient";
import {
  ConnectionConfig,
  DataTransformer,
  TokenProvider,
  AadTokenProvider,
  SasTokenProvider
} from "@azure/amqp-common";
import { SubscriptionClient } from "./subscriptionClient";

/**
 * Describes the options that can be provided while creating the ServiceBusClient.
 * @interface ServiceBusClientOptions
 */
export interface ServiceBusClientOptions {
  /**
   * @property {DataTransformer} [dataTransformer] The data transformer that will be used to encode
   * and decode the sent and received messages respectively. If not provided then we will use the
   * DefaultDataTransformer. The default transformer should handle majority of the cases. This
   * option needs to be used only for specialized scenarios.
   */
  dataTransformer?: DataTransformer;
}

/**
 * Describes the client that allows interacting with a Service Bus instance.
 * Holds the AMQP connection to the Service Bus Namespace and is the entry point for using Queues,
 * Topics and Subscriptions.
 */
export class ServiceBusClient {
  /**
   * @property {string} name The namespace name of the Service Bus instance.
   */
  readonly name: string;
  /**
   * @property {ConnectionContext} _context Describes the amqp connection context for the Namespace.
   * @private
   */
  private _context: ConnectionContext;

  /**
   * Instantiates a ServiceBusClient to interact with a Service Bus Namespace.
   *
   * @constructor
   * @param {ConnectionConfig} config - The connection configuration needed to connect to the
   * Service Bus Namespace.
   * @param {TokenProvider} [tokenProvider] - The token provider that provides the token for
   * authentication.
   * @param {ServiceBusClientOptions} - Options to control ways to interact with the Service Bus
   * Namespace.
   */
  private constructor(
    config: ConnectionConfig,
    tokenProvider: TokenProvider,
    options?: ServiceBusClientOptions
  ) {
    if (!options) options = {};
    this.name = config.endpoint;
    this._context = ConnectionContext.create(config, tokenProvider, options);
  }

  /**
   * Creates a QueueClient for an existing Service Bus Queue.
   * @param {string} queueName The queue name.
   * @returns QueueClient.
   */
  createQueueClient(queueName: string): QueueClient {
    const client = new QueueClient(queueName, this._context);
    this._context.clients[client.id] = client;
    log.ns("Created the QueueClient for Queue: %s", queueName);
    return client;
  }

  /**
   * Creates a TopicClient for an existing Service Bus Topic.
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
   * Creates a SubscriptionClient for an existing Service Bus Subscription.
   * @param {string} topicName The topic name.
   * @param {string} subscriptionName The subscription name.
   * @returns SubscriptionClient.
   */
  createSubscriptionClient(topicName: string, subscriptionName: string): SubscriptionClient {
    const client = new SubscriptionClient(topicName, subscriptionName, this._context);
    this._context.clients[client.id] = client;
    log.ns(
      "Created the SubscriptionClient for Topic: %s and Subscription: %s",
      topicName,
      subscriptionName
    );
    return client;
  }

  /**
   * Closes the AMQP connection created by this ServiceBusClient along with AMQP links for
   * sender/receivers created by the queue/topic/subscription clients created by this
   * ServiceBusClient.
   * Once closed,
   * - the clients created by this ServiceBusClient cannot be used to send/receive messages anymore.
   * - this ServiceBusClient cannot be used to create any new queues/topics/subscriptions clients.
   * @returns {Promise<any>}
   */
  async close(): Promise<any> {
    try {
      if (this._context.connection.isOpen()) {
        log.ns("Closing the amqp connection '%s' on the client.", this._context.connectionId);

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
      err = err instanceof Error ? err : new Error(JSON.stringify(err));
      log.error(
        `An error occurred while closing the connection "${this._context.connectionId}":\n${err}`
      );
      throw err;
    }
  }

  /**
   * Creates a ServiceBusClient for the Service Bus Namespace represented in the given connection
   * string.
   * @param {string} connectionString - Connection string of the form
   * 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
   * @param {ServiceBusClientOptions} [options] Options to control ways to interact with the
   * Service Bus Namespace.
   * @returns {ServiceBusClient}
   */
  static createFromConnectionString(
    connectionString: string,
    options?: ServiceBusClientOptions
  ): ServiceBusClient {
    const config = ConnectionConfig.create(connectionString);
    ConnectionConfig.validate(config);
    const tokenProvider = new SasTokenProvider(
      config.endpoint,
      config.sharedAccessKeyName,
      config.sharedAccessKey
    );
    return new ServiceBusClient(config, tokenProvider, options);
  }

  /**
   * Creates a ServiceBusClient for the Service Bus Namespace represented by the given host using
   * the given TokenProvider.
   * @param {string} host - Fully qualified domain name for Servicebus. Most likely,
   * `<yournamespace>.servicebus.windows.net`.
   * @param {TokenProvider} tokenProvider - Your token provider that implements the TokenProvider interface.
   * @param {ServiceBusClientOptions} options - Options to control ways to interact with the
   * Service Bus Namespace.
   * @returns {ServiceBusClient}
   */
  static createFromTokenProvider(
    host: string,
    tokenProvider: TokenProvider,
    options?: ServiceBusClientOptions
  ): ServiceBusClient {
    host = String(host);
    if (!tokenProvider) {
      throw new TypeError('Missing parameter "tokenProvider"');
    }
    if (!host.endsWith("/")) host += "/";
    const connectionString =
      `Endpoint=sb://${host};SharedAccessKeyName=defaultKeyName;` +
      `SharedAccessKey=defaultKeyValue`;
    const config = ConnectionConfig.create(connectionString);
    ConnectionConfig.validate(config);
    return new ServiceBusClient(config, tokenProvider, options);
  }

  /**
   * Creates a ServiceBusClient for the Service Bus Namespace represented by the given host using
   * the TokenCredentials generated by the `ms-rest-azure` library.
   * @param {string} host - Fully qualified domain name for ServiceBus.
   * Most likely, {yournamespace}.servicebus.windows.net
   * @param {ServiceClientCredentials} credentials - The Token credentials as implemented in the
   * `ms-rest-azure` library. It can be one of the following:
   *  - ApplicationTokenCredentials
   *  - UserTokenCredentials
   *  - DeviceTokenCredentials
   *  - MSITokenCredentials.
   * @param {ServiceBusClientOptions} options - Options to control ways to interact with the
   * Service Bus Namespace.
   * @returns {ServiceBusClient}
   */
  static createFromAadTokenCredentials(
    host: string,
    credentials:
      | ApplicationTokenCredentials
      | UserTokenCredentials
      | DeviceTokenCredentials
      | MSITokenCredentials,
    options?: ServiceBusClientOptions
  ): ServiceBusClient {
    host = String(host);
    const tokenProvider = new AadTokenProvider(credentials);
    return ServiceBusClient.createFromTokenProvider(host, tokenProvider, options);
  }
}
