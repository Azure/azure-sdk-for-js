// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { isTokenCredential, TokenCredential } from "@azure/core-amqp";
import { EventDataBatch } from "./eventDataBatch";
import {
  EventHubClient,
  EventHubClientOptions,
  GetPartitionIdsOptions,
  GetEventHubPropertiesOptions,
  CreateBatchOptions,
  SendBatchOptions
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
    hostOrConnectionString1: string,
    eventHubNameOrOptions2?: string | EventHubClientOptions,
    credentialOrOptions3?: TokenCredential | EventHubClientOptions,
    options4?: EventHubClientOptions
  ) {
    if (typeof eventHubNameOrOptions2 !== "string") {
      this._client = new EventHubClient(hostOrConnectionString1, eventHubNameOrOptions2);
    } else if (!isTokenCredential(credentialOrOptions3)) {
      this._client = new EventHubClient(
        hostOrConnectionString1,
        eventHubNameOrOptions2,
        credentialOrOptions3
      );
    } else {
      this._client = new EventHubClient(
        hostOrConnectionString1,
        eventHubNameOrOptions2,
        credentialOrOptions3,
        options4
      );
    }

    this._producersMap = new Map();
  }

  /**
   * Creates an instance of `EventDataBatch` to which one can add events until the maximum supported size is reached.
   * The batch can be passed to the {@link sendBatch} method of the `EventHubProducerClient` to be sent to Azure Event Hubs.
   * @param options  A set of options to configure the behavior of the batch.
   * - `partitionKey`  : A value that is hashed to produce a partition assignment.
   * Not applicable if the `EventHubProducer` was created using a `partitionId`.
   * - `maxSizeInBytes`: The upper limit for the size of batch. The `tryAdd` function will return `false` after this limit is reached.
   * - `abortSignal`   : A signal the request to cancel the operation.
   * @returns Promise<EventDataBatch>
   */
  async createBatch(options?: CreateBatchOptions): Promise<EventDataBatch> {
    let producer = this._producersMap.get("");

    if (!producer) {
      producer = this._client.createProducer();
      this._producersMap.set("", producer);
    }
    
    return producer.createBatch(options);
  }

  /**
   * Sends a batch of events to the associated Event Hub.
   *
   * @param batch An instance of `EventDataBatch` that you can create using the {@link createBatch} method.
   * @param options The set of options that can be specified to influence the way in which
   * events are sent to the associated Event Hub.
   * - `abortSignal`  : A signal the request to cancel the send operation.
   *
   * @returns Promise<void>
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   * @throws {MessagingError} Thrown if an error is encountered while sending a message.
   * @throws {TypeError} Thrown if a required parameter is missing.
   * @throws {Error} Thrown if the underlying connection or sender has been closed.
   */
  async sendBatch(batch: EventDataBatch, options?: SendBatchOptions): Promise<void>;
  /**
   * Sends a batch of events to the associated Event Hub to a specific partition
   *
   * @param batch An instance of `EventDataBatch` that you can create using the {@link createBatch} method.
   * @param partitionId a partition id
   * @param options The set of options that can be specified to influence the way in which
   * events are sent to the associated Event Hub.
   * - `abortSignal`  : A signal the request to cancel the send operation.
   *
   * @returns Promise<void>
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   * @throws {MessagingError} Thrown if an error is encountered while sending a message.
   * @throws {TypeError} Thrown if a required parameter is missing.
   * @throws {Error} Thrown if the underlying connection or sender has been closed.
   * @throws {Error} Thrown if the batch was created using a partitionKey as it conflicts with our attempt to send to a specific partition.
   */
  async sendBatch(batch: EventDataBatch, partitionId: string, options?: SendBatchOptions): Promise<void>;
  async sendBatch(
    batch1: EventDataBatch,
    partitionIdOrOptions2: string | SendBatchOptions | undefined,
    options3: SendBatchOptions | undefined = {}
  ): Promise<void> {
    let partitionId = "";
    if (typeof partitionIdOrOptions2 === "string") {
      partitionId = partitionIdOrOptions2;
    } else {
      options3 = partitionIdOrOptions2;
    }
    let producer = this._producersMap.get(partitionId);
    if (!producer) {
      producer = this._client.createProducer({ partitionId: partitionId === "" ? undefined : partitionId });
      this._producersMap.set(partitionId, producer);
    }
    return producer.send(batch1, options3);
  }

  /**
   * Closes the AMQP connection to the Event Hub instance,
   * returning a promise that will be resolved when disconnection is completed.
   * @returns Promise<void>
   * @throws {Error} Thrown if the underlying connection encounters an error while closing.
   */
  async close(): Promise<void> {
    await this._client.close();

    for (const pair of this._producersMap) {
      await pair[1].close();
    }
    this._producersMap.clear();
  }

  /**
   * Provides the Event Hub runtime information.
   * @param [options] The set of options to apply to the operation call.
   * @returns A promise that resolves with EventHubProperties.
   * @throws {Error} Thrown if the underlying connection has been closed, create a new EventHubClient.
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   */
  async getEventHubProperties(options: GetEventHubPropertiesOptions = {}): Promise<EventHubProperties> {
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
