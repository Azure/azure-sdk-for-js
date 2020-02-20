// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import { ConnectionContext } from "./connectionContext";
import { QueueClient } from "./queueClient";
import { TopicClient } from "./topicClient";
import {
  ConnectionConfig,
  DataTransformer,
  TokenCredential,
  SharedKeyCredential,
  isTokenCredential
} from "@azure/core-amqp";
import { SubscriptionClient } from "./subscriptionClient";
import { WebSocketOptions } from "@azure/core-amqp";

/**
 * Describes the options that can be provided while creating the ServiceBusClient.
 * @interface ServiceBusClientOptions
 */
export interface ServiceBusClientOptions {
  /**
   * @property The data transformer that will be used to encode
   * and decode the sent and received messages respectively. If not provided then we will use the
   * DefaultDataTransformer. The default transformer should handle majority of the cases. This
   * option needs to be used only for specialized scenarios.
   */
  dataTransformer?: DataTransformer;
  /**
   * @property
   * Options to configure the channelling of the AMQP connection over Web Sockets.
   */
  webSocketOptions?: WebSocketOptions;
}

/**
 * Describes the client that allows interacting with a Service Bus instance.
 * Holds the AMQP connection to the Service Bus Namespace and is the entry point for using Queues,
 * Topics and Subscriptions.
 */
export class ServiceBusClient {
  /**
   * @readonly
   * @property The name of the Service Bus Namespace.
   */
  readonly name: string;
  /**
   * @property Describes the amqp connection context for the Namespace.
   * @private
   */
  private _context: ConnectionContext;

  /**
   * Creates a ServiceBusClient for the Service Bus Namespace represented in the given connection
   * string.
   * @param connectionString - Connection string of the form
   * 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
   * @param options Options to control ways to interact with the
   * Service Bus Namespace.
   * @returns ServiceBusClient
   */
  constructor(connectionString: string, options?: ServiceBusClientOptions);

  /**
   * Instantiates a ServiceBusClient to interact with a Service Bus Namespace.
   *
   * @constructor
   * @param host - The host name for the Service Bus namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net
   * @param credential - credential that implements the TokenCredential interface.
   * @param options - Options to control ways to interact with the Service Bus
   * Namespace.
   */
  constructor(host: string, credential: TokenCredential, options?: ServiceBusClientOptions);

  constructor(
    hostOrConnectionString: string,
    credentialOrServiceBusClientOptions?: TokenCredential | ServiceBusClientOptions,
    options?: ServiceBusClientOptions
  ) {
    let config;
    let credential;

    if (!isTokenCredential(credentialOrServiceBusClientOptions)) {
      // connectionString and options based constructor was invoked
      config = ConnectionConfig.create(hostOrConnectionString);

      options = credentialOrServiceBusClientOptions as ServiceBusClientOptions;
      config.webSocket = options?.webSocketOptions?.webSocket;
      config.webSocketEndpointPath = "$servicebus/websocket";
      config.webSocketConstructorOptions = options?.webSocketOptions?.webSocketConstructorOptions;

      // Since connectionstring was passed, create a SharedKeyCredential
      credential = new SharedKeyCredential(config.sharedAccessKeyName, config.sharedAccessKey);

      ConnectionConfig.validate(config);
    } else {
      // host, credential and options based constructor was invoked
      credential = credentialOrServiceBusClientOptions as TokenCredential;

      hostOrConnectionString = String(hostOrConnectionString);
      if (!hostOrConnectionString.endsWith("/")) {
        hostOrConnectionString += "/";
      }
      const connectionString = `Endpoint=sb://${hostOrConnectionString};SharedAccessKeyName=defaultKeyName;SharedAccessKey=defaultKeyValue;`;
      config = ConnectionConfig.create(connectionString);
    }

    if (!options) {
      options = {};
    }

    this.name = config.endpoint;
    this._context = ConnectionContext.create(config, credential, options);
  }

  /**
   * Creates a QueueClient for an existing Service Bus Queue.
   * @param {string} queueName The queue name.
   * @returns QueueClient.
   * @throws Error if the underlying connection is closed.
   */
  createQueueClient(queueName: string): QueueClient {
    const client = new QueueClient(queueName, this._context);
    log.ns("Created the QueueClient for Queue: %s", queueName);
    return client;
  }

  /**
   * Creates a TopicClient for an existing Service Bus Topic.
   * @param {string} topicName The topic name.
   * @returns TopicClient.
   * @throws
   * @throws Error if the underlying connection is closed.
   */
  createTopicClient(topicName: string): TopicClient {
    const client = new TopicClient(topicName, this._context);
    log.ns("Created the TopicClient for Topic: %s", topicName);
    return client;
  }

  /**
   * Creates a SubscriptionClient for an existing Service Bus Subscription.
   * @param {string} topicName The topic name.
   * @param {string} subscriptionName The subscription name.
   * @returns SubscriptionClient.
   * @throws Error if the underlying connection is closed.
   */
  createSubscriptionClient(topicName: string, subscriptionName: string): SubscriptionClient {
    const client = new SubscriptionClient(topicName, subscriptionName, this._context);
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

        // Close all the clients.
        for (const id of Object.keys(this._context.clientContexts)) {
          const clientContext = this._context.clientContexts[id];
          await clientContext.close();
        }
        await this._context.cbsSession.close();

        await this._context.connection.close();
        this._context.wasConnectionCloseCalled = true;
        log.ns("Closed the amqp connection '%s' on the client.", this._context.connectionId);
      }
    } catch (err) {
      const errObj = err instanceof Error ? err : new Error(JSON.stringify(err));
      log.error(
        `An error occurred while closing the connection "${this._context.connectionId}":\n${errObj}`
      );
      throw errObj;
    }
  }
}
