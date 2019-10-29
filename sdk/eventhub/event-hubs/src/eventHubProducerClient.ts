// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { isTokenCredential, TokenCredential } from "@azure/core-amqp";
import { EventDataBatch } from "./eventDataBatch";
import {
  EventHubClient,
  EventHubClientOptions,
  GetPartitionIdsOptions,
  GetPropertiesOptions,
  SendOptions,
  BatchOptions
} from "./eventHubClient";
import { EventHubProperties } from "./managementClient";
import { EventHubProducer } from "./sender";

/**
 * @class
 * The client is the main point of interaction with Azure Event Hubs service.
 * It offers connection to a specific Event Hub within the Event Hubs namespace along with
 * operations for sending event data and inspecting the connected Event Hub.
 *
 * There are multiple ways to create an `EventHubProducerClient`
 * - Use the connection string from the SAS policy created for your Event Hub instance.
 * - Use the connection string from the SAS policy created for your Event Hub namespace,
 * and the name of the Event Hub instance
 * - Use the fully qualified domain name of your Event Hub namespace like `<yournamespace>.servicebus.windows.net`,
 * and a credentials object.
 *
 */
export class EventHubProducerClient {
  private _client: EventHubClient;

  private _producersMap: Map<string, EventHubProducer>;

  /**
   * @property
   * @readonly
   * The name of the Event Hub instance for which this client is created.
   */
  get eventHubName(): string {
    return this._client.eventHubName;
  }

  /**
   * @property
   * @readonly
   * The fully qualified Event Hubs namespace for which this client is created. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net.
   */
  get fullyQualifiedNamespace(): string {
    return this._client.fullyQualifiedNamespace;
  }

  /**
   * @constructor
   * @param connectionString - The connection string to use for connecting to the Event Hubs namespace.
   * It is expected that the shared key properties and the Event Hub path are contained in this connection string.
   * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-event-hub-name'.
   * @param options - A set of options to apply when configuring the client.
   * - `dataTransformer`: A set of `encode`/`decode` methods to be used to encode an event before sending to service
   * and to decode the event received from the service
   * - `userAgent`      : A string to append to the built in user agent string that is passed as a connection property
   * to the service.
   * - `websocket`      : The WebSocket constructor used to create an AMQP connection if you choose to make the connection
   * over a WebSocket.
   * - `webSocketConstructorOptions` : Options to pass to the Websocket constructor when you choose to make the connection
   * over a WebSocket.
   * - `retryOptions`   : The retry options for all the operations on the client/producer/consumer.
   * A simple usage can be `{ "maxRetries": 4 }`.
   */
  constructor(connectionString: string, options?: EventHubClientOptions);
  /**
   * @constructor
   * @param connectionString - The connection string to use for connecting to the Event Hubs namespace;
   * it is expected that the shared key properties are contained in this connection string, but not the Event Hub path,
   * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;'.
   * @param eventHubName - The path of the specific Event Hub to connect the client to.
   * @param options - A set of options to apply when configuring the client.
   * - `dataTransformer`: A set of `encode`/`decode` methods to be used to encode an event before sending to service
   * and to decode the event received from the service
   * - `userAgent`      : A string to append to the built in user agent string that is passed as a connection property
   * to the service.
   * - `websocket`      : The WebSocket constructor used to create an AMQP connection if you choose to make the connection
   * over a WebSocket.
   * - `webSocketConstructorOptions` : Options to pass to the Websocket constructor when you choose to make the connection
   * over a WebSocket.
   * - `retryOptions`   : The retry options for all the operations on the client/producer/consumer.
   * A simple usage can be `{ "maxRetries": 4 }`.
   */
  constructor(connectionString: string, eventHubName: string, options?: EventHubClientOptions);
  /**
   * @constructor
   * @param host - The fully qualified host name for the Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net
   * @param eventHubName - The path of the specific Event Hub to connect the client to.
   * @param credential - SharedKeyCredential object or your credential that implements the TokenCredential interface.
   * @param options - A set of options to apply when configuring the client.
   * - `dataTransformer`: A set of `encode`/`decode` methods to be used to encode an event before sending to service
   * and to decode the event received from the service
   * - `userAgent`      : A string to append to the built in user agent string that is passed as a connection property
   * to the service.
   * - `websocket`      : The WebSocket constructor used to create an AMQP connection if you choose to make the connection
   * over a WebSocket.
   * - `webSocketConstructorOptions` : Options to pass to the Websocket constructor when you choose to make the connection
   * over a WebSocket.
   * - `retryOptions`   : The retry options for all the operations on the client/producer/consumer.
   * A simple usage can be `{ "maxRetries": 4 }`.
   */
  constructor(
    host: string,
    eventHubName: string,
    credential: TokenCredential,
    options?: EventHubClientOptions
  );
  constructor(
    hostOrConnectionString: string,
    eventHubNameOrOptions?: string | EventHubClientOptions,
    credentialOrOptions?: TokenCredential | EventHubClientOptions,
    options?: EventHubClientOptions
  ) {
    if (typeof eventHubNameOrOptions !== "string") {
      this._client = new EventHubClient(hostOrConnectionString, eventHubNameOrOptions);
    } else if (!isTokenCredential(credentialOrOptions)) {
      this._client = new EventHubClient(
        hostOrConnectionString,
        eventHubNameOrOptions,
        credentialOrOptions
      );
    } else {
      this._client = new EventHubClient(
        hostOrConnectionString,
        eventHubNameOrOptions,
        credentialOrOptions,
        options
      );
    }

    this._producersMap = new Map();
  }

  async createBatch(options?: BatchOptions): Promise<EventDataBatch> {
    if (!this._producersMap.has("")) {
      this._producersMap.set("", this._client.createProducer());
    }
    let producer = this._producersMap.get("");
    if (!producer) {
      producer = this._client.createProducer();
      this._producersMap.set("", producer);
    }
    return producer.createBatch(options);
  }

  async sendBatch(batch: EventDataBatch, options: SendOptions): Promise<void>;
  async sendBatch(batch: EventDataBatch, partitionId: string, options: SendOptions): Promise<void>;
  async sendBatch(
    batch: EventDataBatch,
    partitionIdOrOptions: string | SendOptions,
    options: SendOptions = {}
  ): Promise<void> {
    let partitionId = "";
    if (typeof partitionIdOrOptions === "string") {
      partitionId = partitionIdOrOptions;
    } else {
      options = partitionIdOrOptions;
    }
    let producer = this._producersMap.get(partitionId);
    if (!producer) {
      producer = this._client.createProducer({ partitionId });
      this._producersMap.set(partitionId, producer);
    }
    return producer.send(batch, options);
  }

  /**
   * Closes the AMQP connection to the Event Hub instance,
   * returning a promise that will be resolved when disconnection is completed.
   * @returns Promise<void>
   * @throws {Error} Thrown if the underlying connection encounters an error while closing.
   */
  async close(): Promise<void> {
    await this._client.close();
    this._producersMap.clear();
  }

  /**
   * Provides the Event Hub runtime information.
   * @param [options] The set of options to apply to the operation call.
   * @returns A promise that resolves with EventHubProperties.
   * @throws {Error} Thrown if the underlying connection has been closed, create a new EventHubClient.
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   */
  async getProperties(options: GetPropertiesOptions = {}): Promise<EventHubProperties> {
    return this._client.getProperties(options);
  }

  /**
   * Provides an array of partitionIds.
   * @param [options] The set of options to apply to the operation call.
   * @returns A promise that resolves with an Array of strings.
   * @throws {Error} Thrown if the underlying connection has been closed, create a new EventHubClient.
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   */
  async getPartitionIds(options: GetPartitionIdsOptions = {}): Promise<Array<string>> {
    return this._client.getPartitionIds(options);
  }
}
