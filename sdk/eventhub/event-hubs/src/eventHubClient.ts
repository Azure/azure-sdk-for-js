// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import { Delivery, WebSocketImpl } from "rhea-promise";
import {
  ApplicationTokenCredentials,
  DeviceTokenCredentials,
  UserTokenCredentials,
  MSITokenCredentials
} from "@azure/ms-rest-nodeauth";
import {
  MessagingError,
  DataTransformer,
  TokenProvider,
  EventHubConnectionConfig,
  AadTokenProvider
} from "@azure/amqp-common";
import { OnMessage, OnError } from "./eventHubReceiver";
import { EventData } from "./eventData";
import { ConnectionContext } from "./connectionContext";
import { EventHubPartitionRuntimeInformation, EventHubRuntimeInformation } from "./managementClient";
import { EventPosition } from "./eventPosition";
import { EventHubSender } from "./eventHubSender";
import { StreamingReceiver, ReceiveHandler } from "./streamingReceiver";
import { BatchingReceiver } from "./batchingReceiver";
import { IotHubClient } from "./iothub/iothubClient";

/**
 * Describes the options that one can set while receiving messages.
 * @interface ReceiveOptions
 */
export interface ReceiveOptions {
  /**
   * @property {string} [name] The name of the receiver. If not provided then we will set a GUID by default.
   */
  name?: string;
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
   * @property {number} [prefetchCount] The upper limit of events this receiver will actively receive
   * regardless of whether a receive operation is pending. Defaults to 1000.
   */
  prefetchCount?: number;
  /**
   * @property {number} [epoch] The epoch value that this receiver is currently using for partition ownership.
   */
  epoch?: number;
  /**
   * @property {string} [identifier] The receiver identifier that uniqely identifies the receiver.
   */
  identifier?: string;
  /**
   * @property {boolean} [enableReceiverRuntimeMetric] A value indicating whether the runtime metric of a receiver is enabled.
   */
  enableReceiverRuntimeMetric?: boolean;
}

/**
 * Describes the base client options.
 * @interface ClientOptionsBase
 */
export interface ClientOptionsBase {
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
}

/**
 * Describes the options that can be provided while creating the EventHub Client.
 * @interface ClientOptions
 */
export interface ClientOptions extends ClientOptionsBase {
  /**
   * @property {TokenProvider} [tokenProvider] - The token provider that provides the token for authentication.
   * Default value: SasTokenProvider.
   */
  tokenProvider?: TokenProvider;
}

/**
 * @class EventHubClient
 * Describes the EventHub client.
 */
export class EventHubClient {
  /**
   * @property {string} [connectionId] The amqp connection id that uniquely identifies the connection within a process.
   */
  connectionId?: string;

  /**
   * @property {string} eventhubName The name of the Eventhub.
   * @readonly
   */
  get eventhubName(): string {
    return this._context.config.entityPath!;
  }

  /**
   * @property {ConnectionContext} _context Describes the amqp connection context for the eventhub client.
   * @private
   */
  private _context: ConnectionContext;

  /**
   * Instantiates a client pointing to the Event Hub given by this configuration.
   *
   * @constructor
   * @param {EventHubConnectionConfig} config - The connection configuration to create the EventHub Client.
   * @param {ClientOptions} options - The optional parameters that can be provided to the EventHub
   * Client constructor.
   */
  constructor(config: EventHubConnectionConfig, options?: ClientOptions) {
    if (!options) options = {};
    this._context = ConnectionContext.create(config, options);
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
   * Sends the given message to the EventHub.
   *
   * @param {any} data                    Message to send.  Will be sent as UTF8-encoded JSON string.
   * @param {string|number} [partitionId] Partition ID to which the event data needs to be sent. This should only be specified
   * if you intend to send the event to a specific partition. When not specified EventHub will store the messages in a round-robin
   * fashion amongst the different partitions in the EventHub.
   *
   * @returns {Promise<Delivery>} Promise<Delivery>
   */
  async send(data: EventData, partitionId?: string | number): Promise<Delivery> {
    const sender = EventHubSender.create(this._context, partitionId);
    return sender.send(data);
  }

  /**
   * Send a batch of EventData to the EventHub. The "message_annotations", "application_properties" and "properties"
   * of the first message will be set as that of the envelope (batch message).
   *
   * @param {Array<EventData>} datas  An array of EventData objects to be sent in a Batch message.
   * @param {string|number} [partitionId] Partition ID to which the event data needs to be sent. This should only be specified
   * if you intend to send the event to a specific partition. When not specified EventHub will store the messages in a round-robin
   * fashion amongst the different partitions in the EventHub.
   *
   * @return {Promise<Delivery>} Promise<Delivery>
   */
  async sendBatch(datas: EventData[], partitionId?: string | number): Promise<Delivery> {
    const sender = EventHubSender.create(this._context, partitionId);
    return sender.sendBatch(datas);
  }

  /**
   * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session. Messages will be passed to
   * the provided onMessage handler and error will be passed to the provided onError handler.
   *
   * @param {string|number} partitionId                        Partition ID from which to receive.
   * @param {OnMessage} onMessage                              The message handler to receive event data objects.
   * @param {OnError} onError                                  The error handler to receive an error that occurs
   * while receiving messages.
   * @param {ReceiveOptions} [options]                         Options for how you'd like to receive messages.
   *
   * @returns {ReceiveHandler} ReceiveHandler - An object that provides a mechanism to stop receiving more messages.
   */
  receive(
    partitionId: string | number,
    onMessage: OnMessage,
    onError: OnError,
    options?: ReceiveOptions
  ): ReceiveHandler {
    if (typeof partitionId !== "string" && typeof partitionId !== "number") {
      throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
    }
    const sReceiver = StreamingReceiver.create(this._context, partitionId, options);
    this._context.receivers[sReceiver.name] = sReceiver;
    return sReceiver.receive(onMessage, onError);
  }

  /**
   * Receives a batch of EventData objects from an EventHub partition for a given count and a given max wait time in seconds, whichever
   * happens first. This method can be used directly after creating the receiver object and **MUST NOT** be used along with the `start()` method.
   *
   * @param {string|number} partitionId                        Partition ID from which to receive.
   * @param {number} maxMessageCount                           The maximum message count. Must be a value greater than 0.
   * @param {number} [maxWaitTimeInSeconds]                    The maximum wait time in seconds for which the Receiver should wait
   * to receiver the said amount of messages. If not provided, it defaults to 60 seconds.
   * @param {ReceiveOptions} [options]                         Options for how you'd like to receive messages.
   *
   * @returns {Promise<Array<EventData>>} Promise<Array<EventData>>.
   */
  async receiveBatch(
    partitionId: string | number,
    maxMessageCount: number,
    maxWaitTimeInSeconds?: number,
    options?: ReceiveOptions
  ): Promise<EventData[]> {
    if (typeof partitionId !== "string" && typeof partitionId !== "number") {
      throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
    }
    const bReceiver = BatchingReceiver.create(this._context, partitionId, options);
    this._context.receivers[bReceiver.name] = bReceiver;
    let error: MessagingError | undefined;
    let result: EventData[] = [];
    try {
      result = await bReceiver.receive(maxMessageCount, maxWaitTimeInSeconds);
    } catch (err) {
      error = err;
      log.error(
        "[%s] Receiver '%s', an error occurred while receiving %d messages for %d max time:\n %O",
        this._context.connectionId,
        bReceiver.name,
        maxMessageCount,
        maxWaitTimeInSeconds,
        err
      );
    }
    try {
      await bReceiver.close();
    } catch (err) {
      // do nothing about it.
    }
    if (error) {
      throw error;
    }
    return result;
  }

  /**
   * Provides the eventhub runtime information.
   * @returns {Promise<EventHubRuntimeInformation>} A promise that resolves with EventHubRuntimeInformation.
   */
  async getHubRuntimeInformation(): Promise<EventHubRuntimeInformation> {
    try {
      return await this._context.managementSession!.getHubRuntimeInformation();
    } catch (err) {
      log.error("An error occurred while getting the hub runtime information: %O", err);
      throw err;
    }
  }

  /**
   * Provides an array of partitionIds.
   * @returns {Promise<Array<string>>} A promise that resolves with an Array of strings.
   */
  async getPartitionIds(): Promise<Array<string>> {
    try {
      const runtimeInfo = await this.getHubRuntimeInformation();
      return runtimeInfo.partitionIds;
    } catch (err) {
      log.error("An error occurred while getting the partition ids: %O", err);
      throw err;
    }
  }

  /**
   * Provides information about the specified partition.
   * @param {(string|number)} partitionId Partition ID for which partition information is required.
   * @returns {Promise<EventHubPartitionRuntimeInformation>} A promise that resoloves with EventHubPartitionRuntimeInformation.
   */
  async getPartitionInformation(partitionId: string | number): Promise<EventHubPartitionRuntimeInformation> {
    if (typeof partitionId !== "string" && typeof partitionId !== "number") {
      throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
    }
    try {
      return await this._context.managementSession!.getPartitionInformation(partitionId);
    } catch (err) {
      log.error("An error occurred while getting the partition information: %O", err);
      throw err;
    }
  }

  /**
   * Creates an EventHub Client from connection string.
   * @param {string} connectionString - Connection string of the form 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
   * @param {string} [path] - EventHub path of the form 'my-event-hub-name'
   * @param {ClientOptions} [options] Options that can be provided during client creation.
   * @returns {EventHubClient} - An instance of the eventhub client.
   */
  static createFromConnectionString(connectionString: string, path?: string, options?: ClientOptions): EventHubClient {
    if (!connectionString || (connectionString && typeof connectionString !== "string")) {
      throw new Error("'connectionString' is a required parameter and must be of type: 'string'.");
    }
    const config = EventHubConnectionConfig.create(connectionString, path);

    config.webSocket = options && options.webSocket;
    config.webSocketEndpointPath = "$servicebus/websocket";
    config.webSocketConstructorOptions = options && options.webSocketConstructorOptions;

    if (!config.entityPath) {
      throw new Error(
        `Either the connectionString must have "EntityPath=<path-to-entity>" or ` +
          `you must provide "path", while creating the client`
      );
    }
    return new EventHubClient(config, options);
  }

  /**
   * Creates an EventHub Client from connection string.
   * @param {string} iothubConnectionString - Connection string of the form 'HostName=iot-host-name;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
   * @param {ClientOptions} [options] Options that can be provided during client creation.
   * @returns {Promise<EventHubClient>} - Promise<EventHubClient>.
   */
  static async createFromIotHubConnectionString(
    iothubConnectionString: string,
    options?: ClientOptions
  ): Promise<EventHubClient> {
    if (!iothubConnectionString || (iothubConnectionString && typeof iothubConnectionString !== "string")) {
      throw new Error("'connectionString' is a required parameter and must be of type: 'string'.");
    }
    const connectionString = await new IotHubClient(iothubConnectionString).getEventHubConnectionString();
    return EventHubClient.createFromConnectionString(connectionString, undefined, options);
  }

  /**
   * Creates an EventHub Client from a generic token provider.
   * @param {string} host - Fully qualified domain name for Event Hubs. Most likely,
   * <yournamespace>.servicebus.windows.net
   * @param {string} entityPath - EventHub path of the form 'my-event-hub-name'
   * @param {TokenProvider} tokenProvider - Your token provider that implements the TokenProvider interface.
   * @param {ClientOptionsBase} options - The options that can be provided during client creation.
   * @returns {EventHubClient} An instance of the Eventhub client.
   */
  static createFromTokenProvider(
    host: string,
    entityPath: string,
    tokenProvider: TokenProvider,
    options?: ClientOptionsBase
  ): EventHubClient {
    if (!host || (host && typeof host !== "string")) {
      throw new Error("'host' is a required parameter and must be of type: 'string'.");
    }

    if (!entityPath || (entityPath && typeof entityPath !== "string")) {
      throw new Error("'entityPath' is a required parameter and must be of type: 'string'.");
    }

    if (!tokenProvider || (tokenProvider && typeof tokenProvider !== "object")) {
      throw new Error("'tokenProvider' is a required parameter and must be of type: 'object'.");
    }
    if (!host.endsWith("/")) host += "/";
    const connectionString =
      `Endpoint=sb://${host};SharedAccessKeyName=defaultKeyName;` + `SharedAccessKey=defaultKeyValue`;
    if (!options) options = {};
    const clientOptions: ClientOptions = options;
    clientOptions.tokenProvider = tokenProvider;
    return EventHubClient.createFromConnectionString(connectionString, entityPath, clientOptions);
  }

  /**
   * Creates an EventHub Client from AADTokenCredentials.
   * @param {string} host - Fully qualified domain name for Event Hubs. Most likely,
   * <yournamespace>.servicebus.windows.net
   * @param {string} entityPath - EventHub path of the form 'my-event-hub-name'
   * @param {TokenCredentials} credentials - The AAD Token credentials. It can be one of the following:
   * ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials.
   * @param {ClientOptionsBase} options - The options that can be provided during client creation.
   * @returns {EventHubClient} An instance of the Eventhub client.
   */
  static createFromAadTokenCredentials(
    host: string,
    entityPath: string,
    credentials: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials,
    options?: ClientOptionsBase
  ): EventHubClient {
    if (!credentials || (credentials && typeof credentials !== "object")) {
      throw new Error(
        "'credentials' is a required parameter and must be an instance of " +
          "ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | " +
          "MSITokenCredentials."
      );
    }
    const tokenProvider = new AadTokenProvider(credentials);
    return EventHubClient.createFromTokenProvider(host, entityPath, tokenProvider, options);
  }
}
