// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";

import { WebSocketImpl } from "rhea-promise";
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
   * @property The WebSocket constructor used to create an AMQP connection
   * over a WebSocket. In browsers, the built-in WebSocket will be  used by default. In Node, a
   * TCP socket will be used if a WebSocket constructor is not provided.
   */
  webSocket?: WebSocketImpl;
  /**
   * @property Options to be passed to the WebSocket constructor
   */
  webSocketConstructorOptions?: any;
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
    let connectionString;

    if (!options) {
      options = {};
    } else {
      // host, credential and options based constructor might have been invoked
      if (credentialOrServiceBusClientOptions == undefined) {
        throw new Error(
          "Input parameter token credential must be defined when using this constructor."
        );
      }
    }

    if (hostOrConnectionString == undefined || typeof hostOrConnectionString !== "string") {
      throw new Error("Input parameter of host or connection string must be a string.");
    }

    if (!isTokenCredential(credentialOrServiceBusClientOptions)) {
      // connectionString and options based constructor was invoked
      connectionString = hostOrConnectionString;
      config = ConnectionConfig.create(connectionString);

      options = credentialOrServiceBusClientOptions as ServiceBusClientOptions;
      config.webSocket = options && options.webSocket;
      config.webSocketEndpointPath = "$servicebus/websocket";
      config.webSocketConstructorOptions = options && options.webSocketConstructorOptions;

      // Since connectionstring was passed, create a SharedKeyCredential
      credential = new SharedKeyCredential(config.sharedAccessKeyName, config.sharedAccessKey);

      ConnectionConfig.validate(config);
    } else {
      // host, credential and options based constructor was invoked
      credential = credentialOrServiceBusClientOptions as TokenCredential;

      if (!hostOrConnectionString.endsWith("/")) {
        hostOrConnectionString += "/";
      }
      connectionString = `Endpoint=sb://${hostOrConnectionString};SharedAccessKeyName=defaultKeyName;SharedAccessKey=defaultKeyValue;`;
      config = ConnectionConfig.create(connectionString);
    }

    this.name = config.endpoint;
    this._context = ConnectionContext.create(config, credential, options);
  }

  /**
   * Creates a QueueClient for an existing Service Bus Queue.
   * @param {string} queueName The queue name.
   * @returns QueueClient.
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

  //   /**
  //    * Creates a ServiceBusClient for the Service Bus Namespace represented by the given host using
  //    * the given TokenProvider.
  //    * @param {string} host - Fully qualified domain name for Servicebus. Most likely,
  //    * `<yournamespace>.servicebus.windows.net`.
  //    * @param {TokenProvider} tokenProvider - Your custom implementation of the {@link https://github.com/Azure/amqp-common-js/blob/master/lib/auth/token.ts Token Provider}
  //    * interface.
  //    * @param {ServiceBusClientOptions} options - Options to control ways to interact with the
  //    * Service Bus Namespace.
  //    * @returns {ServiceBusClient}
  //    */
  //   static createFromTokenProvider(
  //     host: string,
  //     tokenProvider: TokenProvider,
  //     options?: ServiceBusClientOptions
  //   ): ServiceBusClient {
  //     host = String(host);
  //     if (!tokenProvider) {
  //       throw new TypeError('Missing parameter "tokenProvider"');
  //     }
  //     if (!host.endsWith("/")) host += "/";
  //     const connectionString =
  //       `Endpoint=sb://${host};SharedAccessKeyName=defaultKeyName;` +
  //       `SharedAccessKey=defaultKeyValue`;
  //     const config = ConnectionConfig.create(connectionString);

  //     config.webSocket = options && options.webSocket;
  //     config.webSocketEndpointPath = "$servicebus/websocket";
  //     config.webSocketConstructorOptions = options && options.webSocketConstructorOptions;

  //     ConnectionConfig.validate(config);
  //     return new ServiceBusClient(config, tokenProvider, options);
  //   }

  //   /**
  //    * Creates a ServiceBusClient for the Service Bus Namespace represented by the given host using
  //    * the TokenCredentials generated using the `@azure/ms-rest-nodeauth` library.
  //    * @param {string} host - Fully qualified domain name for ServiceBus.
  //    * Most likely, {yournamespace}.servicebus.windows.net
  //    * @param {ServiceClientCredentials} credentials - The Token credentials generated by using the
  //    * `@azure/ms-rest-nodeauth` library. It can be one of the following:
  //    *  - ApplicationTokenCredentials
  //    *  - UserTokenCredentials
  //    *  - DeviceTokenCredentials
  //    *  - MSITokenCredentials
  //    * Token audience (or resource in case of MSI based credentials) to use when creating the credentials is https://servicebus.azure.net/
  //    * @param {ServiceBusClientOptions} options - Options to control ways to interact with the
  //    * Service Bus Namespace.
  //    * @returns {ServiceBusClient}
  //    */
  //   static createFromAadTokenCredentials(
  //     host: string,
  //     credentials:
  //       | ApplicationTokenCredentials
  //       | UserTokenCredentials
  //       | DeviceTokenCredentials
  //       | MSITokenCredentials,
  //     options?: ServiceBusClientOptions
  //   ): ServiceBusClient {
  //     host = String(host);
  //     const tokenProvider = new AadTokenProvider(credentials);
  //     return ServiceBusClient.createFromTokenProvider(host, tokenProvider, options);
  //   }
}
