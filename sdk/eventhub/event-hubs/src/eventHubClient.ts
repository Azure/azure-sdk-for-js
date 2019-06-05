// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import { WebSocketImpl } from "rhea-promise";
import {
  ApplicationTokenCredentials,
  DeviceTokenCredentials,
  UserTokenCredentials,
  MSITokenCredentials
} from "@azure/ms-rest-nodeauth";
import {
  DataTransformer,
  TokenProvider,
  EventHubConnectionConfig,
  AadTokenProvider,
  SasTokenProvider,
  ConnectionConfig,
  parseConnectionString,
  EventHubConnectionStringModel
} from "@azure/amqp-common";

import { ConnectionContext } from "./connectionContext";
import { PartitionProperties, EventHubProperties } from "./managementClient";
import { EventPosition } from "./eventPosition";

import { IotHubClient } from "./iothub/iothubClient";
import { Aborter } from "./aborter";
import { Sender } from "./sender";
import { Receiver } from "./receiver";

/**
 * Retry policy options for operations on the EventHubClient
 */
export interface RetryOptions {
  /**
   * Total number of times to attempt an operation
   */
  retryCount?: number;
  /**
   * Number of milliseconds to wait between retries
   */
  retryInterval?: number;
  // /**
  //  * The maximum value the `retryInterval` gets incremented exponentially between retries.
  //  * Not applicable, when `isExponential` is set to `false`.
  //  */
  // maxRetryInterval?: number;
  // /**
  //  * Boolean denoting if the `retryInterval` should be incremented exponentially between
  //  * retries or kept the same.
  //  */
  // isExponential?: boolean;
}

/**
 * Options to passed when creating a sender using the EventHubClient
 */
export interface SenderOptions {
  /**
   * The id of the partition to which the event should be sent. If no id is provided,
   * the service will determine the partition to which the event will be sent.
   */
  partitionId?: string;
  /**
   * Retry options for the send operation on the sender. If no value is provided here, the
   * retry options set when creating the `EventHubClient` is used.
   */
  retryOptions?: RetryOptions;
}

/**
 * Options that can be passed when sending a batch of events using the EventHubsClient
 */
export interface BatchingOptions {
  /**
   * @property {string | null} [batchLabel] If specified EventHub will hash this string to a partitionId.
   * It guarantees that messages end up in the same partition on the event hub.
   * This will be ignored if `paritionId` is used when sending events.
   */
  batchLabel?: string | null;
  /**
   * Cancel current operation
   */
  cancellationToken?: Aborter;
}

/**
 * Options that can be passed to the receive operations on the EventHubsClient
 * @interface ReceiveOptions
 */
export interface ReceiverOptions {
  /**
   * @property {object} [eventPosition] The starting event position at which to start receiving messages.
   * This is used to filter messages for the EventHub Receiver.
   */
  eventPosition?: EventPosition;
  /**
   * @property {string} [consumerGroup] The consumer group to which the receiver wants to connect to.
   * If not provided then it will be connected to "$default" consumer group.
   */
  consumerGroup?: string;
  /**
   * @property {number} [epoch] The priority value that this receiver is currently using for partition ownership.
   */
  exclusiveReceiverPriority?: number;
  /**
   * Retry options for the send operation on the receiver. If no value is provided here, the
   * retry options set when creating the `EventHubClient` is used.
   */
  retryOptions?: RetryOptions;
}

/**
 * Describes the options that can be provided while creating the EventHub Client.
 * @interface ClientOptions
 */
export interface EventHubClientOptions {
  /**
   * @property {DataTransformer} [dataTransformer] The data transformer that will be used to encode
   * and decode the sent and received messages respectively. If not provided then we will use the
   * DefaultDataTransformer. The default transformer should handle majority of the cases. This
   * option needs to be used only for specialized scenarios.
   */
  dataTransformer?: DataTransformer;
  /**
   * @property {string} [userAgent] The user agent that needs to be appended to the built in
   * user agent string.
   */
  userAgent?: string;
  /**
   * @property The WebSocket constructor used to create an AMQP connection over a WebSocket.
   * This option should be provided in the below scenarios
   * - The TCP port 5671 which is what is used by the AMQP connection to Event Hubs is blocked in your environment.
   * - Your application needs to be run behind a proxy server
   * - Your application needs to run in the browser and you want to provide your own choice of Websocket implementation
   * instead of the built-in WebSocket in the browser.
   */
  webSocket?: WebSocketImpl;
  /**
   * @property {webSocketConstructorOptions} - Options to be passed to the WebSocket constructor
   */
  webSocketConstructorOptions?: any;
  /**
   * Retry options for all the operations on the client/sender/receiver.
   * This can be overridden by the retry options set on the sender and receiver.
   */
  retryOptions?: RetryOptions;
}

/**
 * @class EventHubClient
 * Describes the EventHub client.
 */
export class EventHubClient {
  /**
   * @property {ConnectionContext} _context Describes the amqp connection context for the eventhub client.
   * @private
   */
  private _context: ConnectionContext;

  private _clientOptions: EventHubClientOptions;

  /**
   * @property The name of the Event Hub instance for which this client is created
   */
  get eventHubName(): string {
    return this._context.config.entityPath;
  }

  /**
   * @constructor
   * @param {string} connectionString - Connection string of the form 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-event-hub-name'
   * @param options - The options that can be provided during client creation.
   */
  constructor(connectionString: string, options?: EventHubClientOptions);
  /**
   * @constructor
   * @param host - Fully qualified domain name for Event Hubs. Most likely,
   * <yournamespace>.servicebus.windows.net
   * @param eventHubPath - EventHub path of the form 'my-event-hub-name'
   * @param tokenProvider - Your token provider that implements the TokenProvider interface.
   * @param options - The options that can be provided during client creation.
   */
  constructor(host: string, eventHubPath: string, tokenProvider: TokenProvider, options?: EventHubClientOptions);
  /**
   * @constructor
   * @param host - Fully qualified domain name for Event Hubs. Most likely,
   * <yournamespace>.servicebus.windows.net
   * @param eventHubPath - EventHub path of the form 'my-event-hub-name'
   * @param credentials - The Token credentials as implemented in the `ms-rest-nodeauth` library. It can be one of the following:
   *  - ApplicationTokenCredentials
   *  - UserTokenCredentials
   *  - DeviceTokenCredentials
   *  - MSITokenCredentials.
   * @param options - The options that can be provided during client creation.
   */
  constructor(
    host: string,
    eventHubPath: string,
    credentials: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials,
    options?: EventHubClientOptions
  );
  constructor(
    hostOrConnectionString: string,
    eventHubPathOrOptions?: string | EventHubClientOptions,
    tokenProviderOrCredentials?:
      | TokenProvider
      | ApplicationTokenCredentials
      | UserTokenCredentials
      | DeviceTokenCredentials
      | MSITokenCredentials,
    options?: EventHubClientOptions
  ) {
    let connectionString;
    let tokenProvider: TokenProvider;
    hostOrConnectionString = String(hostOrConnectionString);

    if (typeof eventHubPathOrOptions !== "string") {
      connectionString = hostOrConnectionString;
      options = eventHubPathOrOptions;
      const parsedCS = parseConnectionString<EventHubConnectionStringModel>(connectionString);
      if (!parsedCS.EntityPath) {
        throw new TypeError(
          `"connectionString": "${connectionString}", ` + `must contain EntityPath="<path-to-the-entity>".`
        );
      }
      tokenProvider = new SasTokenProvider(parsedCS.Endpoint, parsedCS.SharedAccessKeyName, parsedCS.SharedAccessKey);
    } else {
      let host = hostOrConnectionString;
      const eventHubPath = eventHubPathOrOptions;
      let sharedAccessKeyName = "defaultKeyName";
      let sharedAccessKey = "defaultKeyValue";
      if (!host) {
        throw new Error(
          "Please provide a fully qualified domain name of your Event Hub instance for the 'host' parameter."
        );
      }
      if (!eventHubPath) {
        throw new Error("Please provide a value for the 'entityPath' parameter.");
      }
      if (!tokenProviderOrCredentials) {
        throw new Error("Please provide either a token provider or a valid credentials object.");
      }
      if (
        tokenProviderOrCredentials instanceof ApplicationTokenCredentials ||
        tokenProviderOrCredentials instanceof UserTokenCredentials ||
        tokenProviderOrCredentials instanceof DeviceTokenCredentials ||
        tokenProviderOrCredentials instanceof MSITokenCredentials
      ) {
        tokenProvider = new AadTokenProvider(tokenProviderOrCredentials);
      } else {
        tokenProvider = tokenProviderOrCredentials;
        if (tokenProvider instanceof SasTokenProvider) {
          sharedAccessKeyName = tokenProvider.keyName;
          sharedAccessKey = tokenProvider.key;
        }
      }
      if (!host.endsWith("/")) host += "/";
      connectionString = `Endpoint=sb://${host};SharedAccessKeyName=${sharedAccessKeyName};SharedAccessKey=${sharedAccessKey};EntityPath=${eventHubPath}`;
    }

    const config = EventHubConnectionConfig.create(connectionString);
    ConnectionConfig.validate(config);

    this._clientOptions = options || {};
    this._context = ConnectionContext.create(config, tokenProvider, this._clientOptions);
  }

  /**
   * Closes the AMQP connection to the Event Hub for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @returns {Promise<void>} Promise<void>
   */
  async close(): Promise<void> {
    try {
      if (this._context.connection.isOpen()) {
        // Close all the senders.
        for (const senderName of Object.keys(this._context.senders)) {
          await this._context.senders[senderName].close();
        }
        // Close all the receivers.
        for (const receiverName of Object.keys(this._context.receivers)) {
          await this._context.receivers[receiverName].close();
        }
        // Close the cbs session;
        await this._context.cbsSession.close();
        // Close the management session
        await this._context.managementSession!.close();
        await this._context.connection.close();
        this._context.wasConnectionCloseCalled = true;
        log.client("Closed the amqp connection '%s' on the client.", this._context.connectionId);
      }
    } catch (err) {
      const msg = `An error occurred while closing the connection "${this._context.connectionId}": ${JSON.stringify(err)}`;
      log.error(msg);
      throw new Error(msg);
    }
  }

  /**
   * Creates a Sender
   *
   * @param options Options to create a Sender where you can control the partition that the
   * events need to be sent to as well retry options and timeouts.
   *
   * @return {Promise<void>} Promise<void>
   */
  createSender(options?: SenderOptions): Sender {
    return new Sender(this._context, options);
  }

  /**
   * Creates a Receiver
   */
  createReceiver(partitionId: string, options?: ReceiverOptions): Receiver {
    return new Receiver(this._context, partitionId, options);
  }

  /**
   * Provides the eventhub runtime information.
   * @returns {Promise<EventHubProperties>} A promise that resolves with HubInformation.
   */
  async getProperties(cancellationToken?: Aborter): Promise<EventHubProperties> {
    try {
      return await this._context.managementSession!.getHubRuntimeInformation({
        retryOptions: this._clientOptions.retryOptions,
        cancellationToken
      });
    } catch (err) {
      log.error("An error occurred while getting the hub runtime information: %O", err);
      throw err;
    }
  }

  /**
   * Provides an array of partitionIds.
   * @returns {Promise<Array<string>>} A promise that resolves with an Array of strings.
   */
  async getPartitionIds(cancellationToken?: Aborter): Promise<Array<string>> {
    try {
      const runtimeInfo = await this.getProperties(cancellationToken);
      return runtimeInfo.partitionIds;
    } catch (err) {
      log.error("An error occurred while getting the partition ids: %O", err);
      throw err;
    }
  }

  /**
   * Provides information about the specified partition.
   * @param {(string|number)} partitionId Partition ID for which partition information is required.
   * @returns {Promise<PartitionProperties>} A promise that resoloves with EventHubPartitionRuntimeInformation.
   */
  async getPartitionInformation(partitionId: string, cancellationToken?: Aborter): Promise<PartitionProperties> {
    if (typeof partitionId !== "string" && typeof partitionId !== "number") {
      throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
    }
    try {
      return await this._context.managementSession!.getPartitionInformation(partitionId, {
        retryOptions: this._clientOptions.retryOptions,
        cancellationToken
      });
    } catch (err) {
      log.error("An error occurred while getting the partition information: %O", err);
      throw err;
    }
  }

  /**
   * Creates an EventHubClient from connection string. If the connection string doesnt have
   * the EntityPath set in it, then use the entityPath parameter to pass the event hub name
   * @param {string} connectionString - Connection string of the form 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
   * @param {string} [entityPath] - EventHub path of the form 'my-event-hub-name'
   * @param {EventHubClientOptions} [options] Options that can be provided during client creation.
   * @returns {EventHubClient} - An instance of the eventhub client.
   */

  static createFromConnectionString(
    connectionString: string,
    entityPath?: string,
    options?: EventHubClientOptions
  ): EventHubClient {
    if (!connectionString || (connectionString && typeof connectionString !== "string")) {
      throw new Error("'connectionString' is a required parameter and must be of type: 'string'.");
    }
    const config = ConnectionConfig.create(connectionString, entityPath);
    if (!config.entityPath) {
      throw new TypeError(
        `Either provide "path" or the "connectionString": "${connectionString}", ` +
          `must contain EntityPath="<path-to-the-entity>".`
      );
    }
    const tokenProvider = new SasTokenProvider(config.endpoint, config.sharedAccessKeyName, config.sharedAccessKey);
    return new EventHubClient(config.host, config.entityPath, tokenProvider, options);
  }

  /**
   * Creates an EventHub Client from connection string.
   * @param {string} iothubConnectionString - Connection string of the form 'HostName=iot-host-name;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
   * @param {EventHubClientOptions} [options] Options that can be provided during client creation.
   * @returns {Promise<EventHubClient>} - Promise<EventHubClient>.
   */
  static async createFromIotHubConnectionString(
    iothubConnectionString: string,
    options?: EventHubClientOptions
  ): Promise<EventHubClient> {
    if (!iothubConnectionString || (iothubConnectionString && typeof iothubConnectionString !== "string")) {
      throw new Error("'connectionString' is a required parameter and must be of type: 'string'.");
    }
    const connectionString = await new IotHubClient(iothubConnectionString).getEventHubConnectionString();
    return new EventHubClient(connectionString, options);
  }
}
