// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import { WebSocketImpl } from "rhea-promise";
import {
  DataTransformer,
  TokenCredential,
  EventHubConnectionConfig,
  SharedKeyCredential,
  ConnectionConfig,
  isTokenCredential,
  Constants
} from "@azure/core-amqp";

import { ConnectionContext } from "./connectionContext";
import { PartitionProperties, EventHubProperties } from "./managementClient";
import { EventPosition } from "./eventPosition";

import { IotHubClient } from "./iothub/iothubClient";
import { AbortSignalLike } from "@azure/abort-controller";
import { EventHubProducer } from "./sender";
import { EventHubConsumer } from "./receiver";
import { throwTypeErrorIfParameterMissing, throwErrorIfConnectionClosed } from "./util/error";

/**
 * Retry policy options for operations on the EventHubClient.
 */
export interface RetryOptions {
  /**
   * Total number of times to attempt an operation.
   */
  retryCount?: number;
  /**
   * Number of milliseconds to wait between retries.
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
 * Options to passed when creating a producer using the EventHubClient.
 */
export interface EventHubProducerOptions {
  /**
   * @property
   * The id of the partition to which the event should be sent. If no id is provided,
   * the service will determine the partition to which the event will be sent.
   */
  partitionId?: string;
  /**
   * @property
   * Retry options for the send operation on the producer. If no value is provided here, the
   * retry options set when creating the `EventHubClient` is used.
   */
  retryOptions?: RetryOptions;
}

/**
 * Options that can be passed when sending a batch of events using the EventHubsClient.
 */
export interface SendOptions {
  /**
   * @property
   * If specified, Event Hubs will hash this string to map to a partitionId.
   * It guarantees that messages with the same partitionKey end up in the same partition.
   * Specifying this will throw an error if the producer was created using a `paritionId`.
   */
  partitionKey?: string | null;
  /**
   * @property
   * Can cancel the current operation.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options that can be passed to the receive operations on the EventHubsClient.
 * @interface EventHubConsumerOptions
 */
export interface EventHubConsumerOptions {
  /**
   * @property
   * The level that this consumer is currently using for partition ownership.
   * If another consumer is currently active for the same partition with no or lower
   * level, then it will get disconnected.
   * If another consumer is currently active with a higher level, then this consumer
   * will fail to connect.
   */
  ownerLevel?: number;
  /**
   * @property
   * Retry options for the receive operation on the consumer. If no value is provided here, the
   * retry options set when creating the `EventHubClient` is used.
   */
  retryOptions?: RetryOptions;
}

/**
 * Describes the options that can be provided while creating the EventHubClient.
 * @interface ClientOptions
 */
export interface EventHubClientOptions {
  /**
   * @property
   * The data transformer that will be used to encode and decode the sent and received messages respectively.
   * If not provided then the `DefaultDataTransformer` is used which has the below `encode` & `decode` features
   * - `encode`:
   *    - If event body is a Buffer, then the event is sent without any data transformation
   *    - Else, JSON.stringfy() is run on the body, and then converted to Buffer before sending the event
   *    - If JSON.stringify() fails at this point, the send operation fails too.
   * - `decode`
   *    - The body receivied via the AMQP protocol is always of type Buffer
   *    - UTF-8 encoding is used to convert Buffer to string, and then JSON.parse() is run on it to get the event body
   *    - If the JSON.parse() fails at this point, then the originally received Buffer object is returned in the event body.
   */
  dataTransformer?: DataTransformer;
  /**
   * @property
   * The user agent that will be appended to the built in user agent string that is passed as a
   * connection property to the Event Hubs service
   */
  userAgent?: string;
  /**
   * @property
   * The WebSocket constructor used to create an AMQP connection over a WebSocket.
   * This option should be provided in the below scenarios
   * - The TCP port 5671 which is what is used by the AMQP connection to Event Hubs is blocked in your environment.
   * - Your application needs to be run behind a proxy server
   * - Your application needs to run in the browser and you want to provide your own choice of Websocket implementation
   * instead of the built-in WebSocket in the browser.
   */
  webSocket?: WebSocketImpl;
  /**
   * @property
   * Options to be passed to the WebSocket constructor when the underlying `rhea` library instantiates
   * the WebSocket.
   */
  webSocketConstructorOptions?: any;
  /**
   * @property
   * Retry options for all the operations on the client/producer/consumer.
   * This can be overridden by the retry options set on the producer and consumer.
   */
  retryOptions?: RetryOptions;
}

/**
 * @class EventHubClient
 * Describes the EventHub client.
 */
export class EventHubClient {
  /**
   * Describes the amqp connection context for the eventhub client.
   */
  private _context: ConnectionContext;

  /**
   * The options passed by the user when creating the EventHubClient instance.
   */
  private _clientOptions: EventHubClientOptions;

  /**
   * @property
   * @readonly
   * The name of the Event Hub instance for which this client is created.
   */
  get eventHubName(): string {
    return this._context.config.entityPath;
  }

  /**
   * @constructor
   * @param connectionString - Connection string of the form 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-event-hub-name'.
   * @param options - The options that can be provided during client creation.
   */
  constructor(connectionString: string, options?: EventHubClientOptions);
  /**
   * @constructor
   * @param connectionString - Connection string of the form 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;'.
   * @param eventHubPath - EventHub path of the form 'my-event-hub-name'
   * @param options - The options that can be provided during client creation.
   */
  constructor(connectionString: string, eventHubPath: string, options?: EventHubClientOptions);
  /**
   * @constructor
   * @param host - Fully qualified domain name for Event Hubs. Most likely,
   * <yournamespace>.servicebus.windows.net
   * @param eventHubPath - EventHub path of the form 'my-event-hub-name'.
   * @param credential - SharedKeyCredential object or your credential that implements the TokenCredential interface.
   * @param options - The options that can be provided during client creation.
   */
  constructor(host: string, eventHubPath: string, credential: TokenCredential, options?: EventHubClientOptions);
  constructor(
    hostOrConnectionString: string,
    eventHubPathOrOptions?: string | EventHubClientOptions,
    credentialOrOptions?: TokenCredential | EventHubClientOptions,
    options?: EventHubClientOptions
  ) {
    let connectionString;
    let config;
    let credential: TokenCredential | SharedKeyCredential;
    hostOrConnectionString = String(hostOrConnectionString);

    if (!isTokenCredential(credentialOrOptions)) {
      connectionString = hostOrConnectionString;
      if (typeof eventHubPathOrOptions !== "string") {
        // connectionstring and/or options were passed to constructor
        config = EventHubConnectionConfig.create(connectionString);
        options = eventHubPathOrOptions;
      } else {
        // connectionstring, eventHubPath and/or options were passed to constructor
        const eventHubPath = eventHubPathOrOptions;
        config = EventHubConnectionConfig.create(connectionString, eventHubPath);
        options = credentialOrOptions;
      }
      // Since connectionstring was passed, create a SharedKeyCredential
      credential = new SharedKeyCredential(config.sharedAccessKeyName, config.sharedAccessKey);
    } else {
      // host, eventHubPath, a TokenCredential and/or options were passed to constructor
      const eventHubPath = eventHubPathOrOptions;
      let host = hostOrConnectionString;
      credential = credentialOrOptions;

      if (!host.endsWith("/")) host += "/";
      connectionString = `Endpoint=sb://${host};SharedAccessKeyName=defaultKeyName;SharedAccessKey=defaultKeyValue;EntityPath=${eventHubPath}`;
      config = EventHubConnectionConfig.create(connectionString);
    }

    ConnectionConfig.validate(config);

    this._clientOptions = options || {};
    this._context = ConnectionContext.create(config, credential, this._clientOptions);
  }

  /**
   * Closes the AMQP connection to the Event Hub for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @returns Promise<void>
   * @throws {Error} Thrown if the underlying connection encounters an error while closing.
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
      err = err instanceof Error ? err : JSON.stringify(err);
      log.error(`An error occurred while closing the connection "${this._context.connectionId}":\n${err}`);
      throw err;
    }
  }

  /**
   * Creates an EventHubProducer that can be used to send events to the Event Hub for which this client
   * was created.
   *
   * @param options Options to create a EventHubProducer where you can specify the id of the partition
   * to which events need to be sent to, and retry options.
   *
   * @throws {Error} Thrown if the underlying connection has been closed, create a new EventHubClient.
   * @returns Promise<void>
   */
  createProducer(options?: EventHubProducerOptions): EventHubProducer {
    throwErrorIfConnectionClosed(this._context);
    return new EventHubProducer(this._context, options);
  }

  /**
   * Creates an EventHubConsumer that can be used to receive events from the Event Hub for which this
   * client was created.
   *
   * @param consumerGroup The consumer group from which the consumer should receive events.
   * @param partitionId The id of the partition from which to receive events.
   * @param eventPosition The event position in the partition at which to start receiving messages.
   * @param options Options to create the EventHubConsumer where you can specify the position from
   * which to start receiving events, the consumer group to receive events from, retry options
   * and more.
   * @throws {Error} Thrown if the underlying connection has been closed, create a new EventHubClient.
   * @throws {TypeError} Thrown if a required parameter is missing.
   */
  createConsumer(
    consumerGroup: string,
    partitionId: string,
    eventPosition: EventPosition,
    options?: EventHubConsumerOptions
  ): EventHubConsumer {
    throwErrorIfConnectionClosed(this._context);
    throwTypeErrorIfParameterMissing(this._context.connectionId, "consumerGroup", consumerGroup);
    throwTypeErrorIfParameterMissing(this._context.connectionId, "partitionId", partitionId);
    throwTypeErrorIfParameterMissing(this._context.connectionId, "eventPosition", eventPosition);
    partitionId = String(partitionId);
    return new EventHubConsumer(this._context, consumerGroup, partitionId, eventPosition, options);
  }

  /**
   * Provides the Event Hub runtime information.
   * @returns A promise that resolves with EventHubProperties.
   * @throws {Error} Thrown if the underlying connection has been closed, create a new EventHubClient.
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   */
  async getProperties(abortSignal?: AbortSignalLike): Promise<EventHubProperties> {
    throwErrorIfConnectionClosed(this._context);
    try {
      return await this._context.managementSession!.getHubRuntimeInformation({
        retryOptions: this._clientOptions.retryOptions,
        abortSignal
      });
    } catch (err) {
      log.error("An error occurred while getting the hub runtime information: %O", err);
      throw err;
    }
  }

  /**
   * Provides an array of partitionIds.
   * @returns A promise that resolves with an Array of strings.
   * @throws {Error} Thrown if the underlying connection has been closed, create a new EventHubClient.
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   */
  async getPartitionIds(abortSignal?: AbortSignalLike): Promise<Array<string>> {
    throwErrorIfConnectionClosed(this._context);
    try {
      const runtimeInfo = await this.getProperties(abortSignal);
      return runtimeInfo.partitionIds;
    } catch (err) {
      log.error("An error occurred while getting the partition ids: %O", err);
      throw err;
    }
  }

  /**
   * Provides information about the specified partition.
   * @param partitionId Partition ID for which partition information is required.
   * @returns A promise that resoloves with PartitionProperties.
   * @throws {Error} Thrown if the underlying connection has been closed, create a new EventHubClient.
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   */
  async getPartitionProperties(partitionId: string, abortSignal?: AbortSignalLike): Promise<PartitionProperties> {
    throwErrorIfConnectionClosed(this._context);
    throwTypeErrorIfParameterMissing(this._context.connectionId, "partitionId", partitionId);
    partitionId = String(partitionId);
    try {
      return await this._context.managementSession!.getPartitionProperties(partitionId, {
        retryOptions: this._clientOptions.retryOptions,
        abortSignal
      });
    } catch (err) {
      log.error("An error occurred while getting the partition information: %O", err);
      throw err;
    }
  }

  /**
   * Creates an EventHubClient from connection string.
   * @param iothubConnectionString - Connection string of the form 'HostName=iot-host-name;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'.
   * @param [options] Options that can be provided during client creation.
   * @returns - Promise<EventHubClient>.
   * @throws {Error} Thrown if the iothubConnectionString is not provided as a string.
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

  /**
   * @property
   * The name of the default consumer group for any Event Hub instance
   */
  static defaultConsumerGroup: string = Constants.defaultConsumerGroup;
}
