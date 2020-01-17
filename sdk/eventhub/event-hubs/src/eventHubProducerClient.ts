// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { isTokenCredential, TokenCredential } from "@azure/core-amqp";
import { EventDataBatch } from "./eventDataBatch";
import { EventHubClient } from "./impl/eventHubClient";
import { EventHubProperties, PartitionProperties } from "./managementClient";
import { EventHubProducer } from "./sender";
import {
  SendBatchOptions,
  GetEventHubPropertiesOptions,
  GetPartitionIdsOptions,
  GetPartitionPropertiesOptions,
  EventHubClientOptions,
  CreateBatchOptions
} from "./models/public";

/**
 * The `EventHubProducerClient` class is used to send events to an Event Hub.
 *
 * There are multiple ways to create an `EventHubProducerClient`
 * - Use the connection string from the SAS policy created for your Event Hub instance.
 * - Use the connection string from the SAS policy created for your Event Hub namespace,
 * and the name of the Event Hub instance
 * - Use the full namespace like `<yournamespace>.servicebus.windows.net`, and a credentials object.
 *
 * Optionally, you can also pass an options bag to configure the retry policy or proxy settings.
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
   * The fully qualified namespace of the Event Hub instance for which this client is created.
   * This is likely to be similar to <yournamespace>.servicebus.windows.net.
   */
  get fullyQualifiedNamespace(): string {
    return this._client.fullyQualifiedNamespace;
  }

  /**
   * @constructor
   * The `EventHubProducerClient` class is used to send events to an Event Hub.
   * Use the `options` parmeter to configure retry policy or proxy settings.
   * @param connectionString - The connection string to use for connecting to the Event Hub instance.
   * It is expected that the shared key properties and the Event Hub path are contained in this connection string.
   * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-event-hub-name'.
   * @param options - A set of options to apply when configuring the client.
   * - `retryOptions`   : Configures the retry policy for all the operations on the client.
   * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
   * - `webSocketOptions`: Configures the channelling of the AMQP connection over Web Sockets.
   * - `userAgent`      : A string to append to the built in user agent string that is passed to the service.
   */
  constructor(connectionString: string, options?: EventHubClientOptions);
  /**
   * @constructor
   * The `EventHubProducerClient` class is used to send events to an Event Hub.
   * Use the `options` parmeter to configure retry policy or proxy settings.
   * @param connectionString - The connection string to use for connecting to the Event Hubs namespace.
   * It is expected that the shared key properties are contained in this connection string, but not the Event Hub path,
   * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;'.
   * @param eventHubName - The name of the specific Event Hub to connect the client to.
   * @param options - A set of options to apply when configuring the client.
   * - `retryOptions`   : Configures the retry policy for all the operations on the client.
   * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
   * - `webSocketOptions`: Configures the channelling of the AMQP connection over Web Sockets.
   * - `userAgent`      : A string to append to the built in user agent string that is passed to the service.
   */
  constructor(connectionString: string, eventHubName: string, options?: EventHubClientOptions);
  /**
   * @constructor
   * The `EventHubProducerClient` class is used to send events to an Event Hub.
   * Use the `options` parmeter to configure retry policy or proxy settings.
   * @param fullyQualifiedNamespace - The full namespace which is likely to be similar to
   * <yournamespace>.servicebus.windows.net
   * @param eventHubName - The name of the specific Event Hub to connect the client to.
   * @param credential - An credential object used by the client to get the token to authenticate the connection
   * with the Azure Event Hubs service. See &commat;azure/identity for creating the credentials.
   * @param options - A set of options to apply when configuring the client.
   * - `retryOptions`   : Configures the retry policy for all the operations on the client.
   * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
   * - `webSocketOptions`: Configures the channelling of the AMQP connection over Web Sockets.
   * - `userAgent`      : A string to append to the built in user agent string that is passed to the service.
   */
  constructor(
    fullyQualifiedNamespace: string,
    eventHubName: string,
    credential: TokenCredential,
    options?: EventHubClientOptions
  );
  constructor(
    fullyQualifiedNamespaceOrConnectionString1: string,
    eventHubNameOrOptions2?: string | EventHubClientOptions,
    credentialOrOptions3?: TokenCredential | EventHubClientOptions,
    options4?: EventHubClientOptions
  ) {
    if (typeof eventHubNameOrOptions2 !== "string") {
      this._client = new EventHubClient(
        fullyQualifiedNamespaceOrConnectionString1,
        eventHubNameOrOptions2
      );
    } else if (!isTokenCredential(credentialOrOptions3)) {
      this._client = new EventHubClient(
        fullyQualifiedNamespaceOrConnectionString1,
        eventHubNameOrOptions2,
        credentialOrOptions3
      );
    } else {
      this._client = new EventHubClient(
        fullyQualifiedNamespaceOrConnectionString1,
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
   * @param options  Configures the behavior of the batch.
   * - `partitionKey`  : A value that is hashed and used by the Azure Event Hubs service to determine the partition to which
   * the events need to be sent.
   * - `partitionId`   : Id of the partition to which the batch of events need to be sent.
   * - `maxSizeInBytes`: The upper limit for the size of batch. The `tryAdd` function will return `false` after this limit is reached.
   * - `abortSignal`   : A signal the request to cancel the operation.
   * @returns Promise<EventDataBatch>
   * @throws Error if both `partitionId` and `partitionKey` are set in the options.
   * @throws Error if the underlying connection has been closed, create a new EventHubProducerClient.
   * @throws AbortError if the operation is cancelled via the abortSignal in the options.
   */
  async createBatch(options?: CreateBatchOptions): Promise<EventDataBatch> {
    if (options && options.partitionId && options.partitionKey) {
      throw new Error("partitionId and partitionKey cannot both be set when creating a batch");
    }

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
   * @param batch A batch of events that you can create using the {@link createBatch} method.
   * @param options A set of options that can be specified to influence the way in which
   * events are sent to the associated Event Hub.
   * - `abortSignal`  : A signal the request to cancel the send operation.
   *
   * @returns Promise<void>
   * @throws AbortError if the operation is cancelled via the abortSignal.
   * @throws MessagingError if an error is encountered while sending a message.
   * @throws Error if the underlying connection or sender has been closed.
   */
  async sendBatch(batch: EventDataBatch, options?: SendBatchOptions): Promise<void> {
    let partitionId = "";

    if (batch.partitionId) {
      partitionId = batch.partitionId;
    }

    let producer = this._producersMap.get(partitionId);
    if (!producer) {
      producer = this._client.createProducer({
        partitionId: partitionId === "" ? undefined : partitionId
      });
      this._producersMap.set(partitionId, producer);
    }
    return producer.send(batch, options);
  }

  /**
   * Closes the AMQP connection to the Event Hub instance,
   * returning a promise that will be resolved when disconnection is completed.
   * @returns Promise<void>
   * @throws Error if the underlying connection encounters an error while closing.
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
   * @param options The set of options to apply to the operation call.
   * @returns A promise that resolves with information about the Event Hub instance.
   * @throws Error if the underlying connection has been closed, create a new EventHubProducerClient.
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  getEventHubProperties(options: GetEventHubPropertiesOptions = {}): Promise<EventHubProperties> {
    return this._client.getProperties(options);
  }

  /**
   * Provides the id for each partition associated with the Event Hub.
   * @param options The set of options to apply to the operation call.
   * @returns A promise that resolves with an Array of strings representing the id for
   * each partition associated with the Event Hub.
   * @throws Error if the underlying connection has been closed, create a new EventHubProducerClient.
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  getPartitionIds(options: GetPartitionIdsOptions = {}): Promise<Array<string>> {
    return this._client.getPartitionIds(options);
  }

  /**
   * Provides information about the state of the specified partition.
   * @param partitionId The id of the partition for which information is required.
   * @param options The set of options to apply to the operation call.
   * @returns A promise that resolves with information about the state of the partition .
   * @throws Error if the underlying connection has been closed, create a new EventHubProducerClient.
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  getPartitionProperties(
    partitionId: string,
    options: GetPartitionPropertiesOptions = {}
  ): Promise<PartitionProperties> {
    return this._client.getPartitionProperties(partitionId, options);
  }
}
