// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AbortSignalLike } from "@azure/abort-controller";
import {
  EventHubClient,
  GetPartitionIdsOptions,
  GetPropertiesOptions,
  GetPartitionPropertiesOptions
} from "./eventHubClient";
import { OnError, OnMessage } from "./eventHubReceiver";
import { EventPosition } from "./eventPosition";
import { EventHubProperties, PartitionProperties } from "./managementClient";
import { ReceiveHandler } from "./receiveHandler";
import { EventHubConsumer } from "./receiver";

/**
 * @class
 * The client is the main point of interaction with Azure Event Hubs service.
 * It offers connection to a specific Event Hub within the Event Hubs namespace along with
 * operations for receiving event data and inspecting the connected Event Hub.
 *
 * There are multiple ways to create an `EventHubConsumerClient`
 * - Use the connection string from the SAS policy created for your Event Hub instance.
 * - Use the connection string from the SAS policy created for your Event Hub namespace,
 * and the name of the Event Hub instance
 * - Use the fully qualified domain name of your Event Hub namespace like `<yournamespace>.servicebus.windows.net`,
 * and a credentials object.
 *
 */
export class EventHubConsumerClient {
  private _consumersMap: Map<string, EventHubConsumer>;

  /**
   * @property
   * @readonly
   * The name of the Event Hub instance for which this client is created.
   */
  get eventHubName(): string {
    return this.client.eventHubName;
  }

  /**
   * @property
   * @readonly
   * The fully qualified Event Hubs namespace for which this client is created. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net.
   */
  get fullyQualifiedNamespace(): string {
    return this.client.fullyQualifiedNamespace;
  }

  // /**
  //  * @constructor
  //  * @param connectionString - The connection string to use for connecting to the Event Hubs namespace.
  //  * It is expected that the shared key properties and the Event Hub path are contained in this connection string.
  //  * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-event-hub-name'.
  //  * @param options - A set of options to apply when configuring the client.
  //  * - `dataTransformer`: A set of `encode`/`decode` methods to be used to encode an event before sending to service
  //  * and to decode the event received from the service
  //  * - `userAgent`      : A string to append to the built in user agent string that is passed as a connection property
  //  * to the service.
  //  * - `websocket`      : The WebSocket constructor used to create an AMQP connection if you choose to make the connection
  //  * over a WebSocket.
  //  * - `webSocketConstructorOptions` : Options to pass to the Websocket constructor when you choose to make the connection
  //  * over a WebSocket.
  //  * - `retryOptions`   : The retry options for all the operations on the client/producer/consumer.
  //  * A simple usage can be `{ "maxRetries": 4 }`.
  //  */
  // constructor(connectionString: string, consumerGroupName: string, options?: EventHubClientOptions);
  // /**
  //  * @constructor
  //  * @param connectionString - The connection string to use for connecting to the Event Hubs namespace;
  //  * it is expected that the shared key properties are contained in this connection string, but not the Event Hub path,
  //  * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;'.
  //  * @param eventHubName - The path of the specific Event Hub to connect the client to.
  //  * @param options - A set of options to apply when configuring the client.
  //  * - `dataTransformer`: A set of `encode`/`decode` methods to be used to encode an event before sending to service
  //  * and to decode the event received from the service
  //  * - `userAgent`      : A string to append to the built in user agent string that is passed as a connection property
  //  * to the service.
  //  * - `websocket`      : The WebSocket constructor used to create an AMQP connection if you choose to make the connection
  //  * over a WebSocket.
  //  * - `webSocketConstructorOptions` : Options to pass to the Websocket constructor when you choose to make the connection
  //  * over a WebSocket.
  //  * - `retryOptions`   : The retry options for all the operations on the client/producer/consumer.
  //  * A simple usage can be `{ "maxRetries": 4 }`.
  //  */
  // constructor(
  //   connectionString: string,
  //   eventHubName: string,
  //   consumerGroupName: string,
  //   options?: EventHubClientOptions
  // );
  // /**
  //  * @constructor
  //  * @param host - The fully qualified host name for the Event Hubs namespace. This is likely to be similar to
  //  * <yournamespace>.servicebus.windows.net
  //  * @param eventHubName - The path of the specific Event Hub to connect the client to.
  //  * @param credential - SharedKeyCredential object or your credential that implements the TokenCredential interface.
  //  * @param options - A set of options to apply when configuring the client.
  //  * - `dataTransformer`: A set of `encode`/`decode` methods to be used to encode an event before sending to service
  //  * and to decode the event received from the service
  //  * - `userAgent`      : A string to append to the built in user agent string that is passed as a connection property
  //  * to the service.
  //  * - `websocket`      : The WebSocket constructor used to create an AMQP connection if you choose to make the connection
  //  * over a WebSocket.
  //  * - `webSocketConstructorOptions` : Options to pass to the Websocket constructor when you choose to make the connection
  //  * over a WebSocket.
  //  * - `retryOptions`   : The retry options for all the operations on the client/producer/consumer.
  //  * A simple usage can be `{ "maxRetries": 4 }`.
  //  */
  // constructor(
  //   host: string,
  //   eventHubName: string,
  //   consumerGroupName: string,
  //   credential: TokenCredential,
  //   options?: EventHubClientOptions
  // );
  // constructor(
  //   param1: string,
  //   param2: string,
  //   param3?: string | EventHubClientOptions,
  //   param4?: TokenCredential | EventHubClientOptions,
  //   options?: EventHubClientOptions
  // ) {
  //   this._consumersMap = new Map();
  //   if (isTokenCredential(param4)) {
  //     this._client = new EventHubClient(param1, param2, param4, options);
  //     this._consumerGroupName = param3 as string;
  //   } else if (typeof param3 === "string") {
  //     this._client = new EventHubClient(param1, param2, param4);
  //     this._consumerGroupName = param3;
  //   } else {
  //     this._client = new EventHubClient(param1, param3);
  //     this._consumerGroupName = param2;
  //   }
  // }

  constructor(private client: EventHubClient, private consumerGroupName: string) {
    this._consumersMap = new Map();
  }

  receive(
    onMessage: OnMessage,
    onError: OnError,
    partitionId: string,
    abortSignal?: AbortSignalLike
  ): ReceiveHandler {
    let consumer = this._consumersMap.get(partitionId);
    if (!consumer) {
      consumer = this.client.createConsumer(
        this.consumerGroupName,
        partitionId,
        EventPosition.latest()
      );
      this._consumersMap.set(partitionId, consumer);
    }
    return consumer.receive(onMessage, onError, abortSignal);
  }

  /**
   * Closes the AMQP connection to the Event Hub instance,
   * returning a promise that will be resolved when disconnection is completed.
   * @returns Promise<void>
   * @throws {Error} Thrown if the underlying connection encounters an error while closing.
   */
  async close(): Promise<void> {
    await this.client.close();
    this._consumersMap.clear();
  }

  /**
   * Provides the Event Hub runtime information.
   * @param [options] The set of options to apply to the operation call.
   * @returns A promise that resolves with EventHubProperties.
   * @throws {Error} Thrown if the underlying connection has been closed, create a new EventHubClient.
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   */
  async getProperties(options: GetPropertiesOptions = {}): Promise<EventHubProperties> {
    return this.client.getProperties(options);
  }

  /**
   * Provides an array of partitionIds.
   * @param [options] The set of options to apply to the operation call.
   * @returns A promise that resolves with an Array of strings.
   * @throws {Error} Thrown if the underlying connection has been closed, create a new EventHubClient.
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   */
  async getPartitionIds(options: GetPartitionIdsOptions = {}): Promise<Array<string>> {
    return this.client.getPartitionIds(options);
  }

  /**
   * Provides information about the specified partition.
   * @param partitionId Partition ID for which partition information is required.
   * @param [options] The set of options to apply to the operation call.
   * @returns A promise that resoloves with PartitionProperties.
   * @throws {Error} Thrown if the underlying connection has been closed, create a new EventHubClient.
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   */
  async getPartitionProperties(
    partitionId: string,
    options: GetPartitionPropertiesOptions = {}
  ): Promise<PartitionProperties> {
    return this.client.getPartitionProperties(partitionId, options);
  }
}
