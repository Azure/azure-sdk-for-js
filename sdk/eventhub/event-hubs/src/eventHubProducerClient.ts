// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isTokenCredential, TokenCredential } from "@azure/core-amqp";
import { ConnectionContext } from "./connectionContext";
import { EventData } from "./eventData";
import { EventDataBatch, isEventDataBatch } from "./eventDataBatch";
import { createConnectionContext } from "./impl/eventHubClient";
import { EventHubProperties, PartitionProperties } from "./managementClient";
import { EventHubProducerOptions } from "./models/private";
import {
  CreateBatchOptions,
  EventHubClientOptions,
  GetEventHubPropertiesOptions,
  GetPartitionIdsOptions,
  GetPartitionPropertiesOptions,
  SendBatchOptions
} from "./models/public";
import { EventHubProducer } from "./sender";
import { throwErrorIfConnectionClosed } from "./util/error";
import { OperationOptions } from "./util/operationOptions";

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
  /**
   * Describes the amqp connection context for the client.
   */
  private _context: ConnectionContext;

  /**
   * The options passed by the user when creating the EventHubClient instance.
   */
  private _clientOptions: EventHubClientOptions;
  /**
   * Map of partitionId to producers
   */
  private _producersMap: Map<string, EventHubProducer>;

  /**
   * @property
   * @readonly
   * The name of the Event Hub instance for which this client is created.
   */
  get eventHubName(): string {
    return this._context.config.entityPath;
  }

  /**
   * @property
   * @readonly
   * The fully qualified namespace of the Event Hub instance for which this client is created.
   * This is likely to be similar to <yournamespace>.servicebus.windows.net.
   */
  get fullyQualifiedNamespace(): string {
    return this._context.config.host;
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
    this._context = createConnectionContext(
      fullyQualifiedNamespaceOrConnectionString1,
      eventHubNameOrOptions2,
      credentialOrOptions3,
      options4
    );
    if (typeof eventHubNameOrOptions2 !== "string") {
      this._clientOptions = eventHubNameOrOptions2 || {};
    } else if (!isTokenCredential(credentialOrOptions3)) {
      this._clientOptions = credentialOrOptions3 || {};
    } else {
      this._clientOptions = options4 || {};
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
      producer = this._createProducer();
      this._producersMap.set("", producer);
    }

    return producer.createBatch(options);
  }

  /**
   * Sends an array of events to the associated Event Hub.
   *
   * @param batch An array of {@link EventData}.
   * @param options A set of options that can be specified to influence the way in which
   * events are sent to the associated Event Hub.
   * - `abortSignal`  : A signal the request to cancel the send operation.
   * - `partitionId`  : The partition this batch will be sent to. If set, `partitionKey` can not be set.
   * - `partitionKey` : A value that is hashed to produce a partition assignment. If set, `partitionId` can not be set.
   *
   * @returns Promise<void>
   * @throws AbortError if the operation is cancelled via the abortSignal.
   * @throws MessagingError if an error is encountered while sending a message.
   * @throws Error if the underlying connection or sender has been closed.
   */
  async sendBatch(batch: EventData[], options?: SendBatchOptions): Promise<void>;
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
  async sendBatch(batch: EventDataBatch, options?: OperationOptions): Promise<void>;
  async sendBatch(
    batch: EventDataBatch | EventData[],
    options: SendBatchOptions | OperationOptions = {}
  ): Promise<void> {
    let partitionId: string | undefined;
    let partitionKey: string | undefined;
    if (isEventDataBatch(batch)) {
      // For batches, partitionId and partitionKey would be set on the batch.
      partitionId = batch.partitionId;
      partitionKey = batch.partitionKey;
      const unexpectedOptions = options as SendBatchOptions;
      if (unexpectedOptions.partitionKey && partitionKey !== unexpectedOptions.partitionKey) {
        throw new Error(
          `The partitionKey (${unexpectedOptions.partitionKey}) set on sendBatch does not match the partitionKey (${partitionKey}) set when creating the batch.`
        );
      }
      if (unexpectedOptions.partitionId && unexpectedOptions.partitionId !== partitionId) {
        throw new Error(
          `The partitionId (${unexpectedOptions.partitionId}) set on sendBatch does not match the partitionId (${partitionId}) set when creating the batch.`
        );
      }
    } else {
      // For arrays of events, partitionId and partitionKey would be set in the options.
      const expectedOptions = options as SendBatchOptions;
      partitionId = expectedOptions.partitionId;
      partitionKey = expectedOptions.partitionKey;
    }
    if (partitionId && partitionKey) {
      throw new Error(
        `The partitionId (${partitionId}) and partitionKey (${partitionKey}) cannot both be specified.`
      );
    }

    if (!partitionId) {
      // The producer map requires that partitionId be a string.
      partitionId = "";
    }

    let producer = this._producersMap.get(partitionId);
    if (!producer) {
      producer = this._createProducer({
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
    await this._context.close();

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
  async getEventHubProperties(
    options: GetEventHubPropertiesOptions = {}
  ): Promise<EventHubProperties> {
    return this._context.managementSession!.getEventHubProperties({
      ...options,
      retryOptions: this._clientOptions.retryOptions
    });
  }

  /**
   * Provides the id for each partition associated with the Event Hub.
   * @param options The set of options to apply to the operation call.
   * @returns A promise that resolves with an Array of strings representing the id for
   * each partition associated with the Event Hub.
   * @throws Error if the underlying connection has been closed, create a new EventHubProducerClient.
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  async getPartitionIds(options: GetPartitionIdsOptions = {}): Promise<Array<string>> {
    const eventHubProperties = await this._context.managementSession!.getEventHubProperties({
      ...options,
      retryOptions: this._clientOptions.retryOptions
    });
    return eventHubProperties.partitionIds;
  }

  /**
   * Provides information about the state of the specified partition.
   * @param partitionId The id of the partition for which information is required.
   * @param options The set of options to apply to the operation call.
   * @returns A promise that resolves with information about the state of the partition .
   * @throws Error if the underlying connection has been closed, create a new EventHubProducerClient.
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  async getPartitionProperties(
    partitionId: string,
    options: GetPartitionPropertiesOptions = {}
  ): Promise<PartitionProperties> {
    return this._context.managementSession!.getPartitionProperties(partitionId, {
      ...options,
      retryOptions: this._clientOptions.retryOptions
    });
  }

  /**
   * Creates an Event Hub producer that can send events to the Event Hub.
   * If `partitionId` is specified in the `options`, all event data sent using the producer
   * will be sent to the specified partition.
   * Otherwise, they are automatically routed to an available partition by the Event Hubs service.
   *
   * Automatic routing of partitions is recommended because:
   *  - The sending of events will be highly available.
   *  - The event data will be evenly distributed among all available partitions.
   *
   * @param options The set of options to apply when creating the producer.
   * - `partitionId`  : The identifier of the partition that the producer can be bound to.
   * - `retryOptions` : The retry options used to govern retry attempts when an issue is encountered while sending events.
   * A simple usage can be `{ "maxRetries": 4 }`.
   *
   * @throws Error if the underlying connection has been closed, create a new EventHubClient.
   * @returns EventHubProducer
   */
  private _createProducer(options?: EventHubProducerOptions): EventHubProducer {
    if (!options) {
      options = {};
    }
    if (!options.retryOptions) {
      options.retryOptions = this._clientOptions.retryOptions;
    }
    throwErrorIfConnectionClosed(this._context);
    return new EventHubProducer(
      this.eventHubName,
      this.fullyQualifiedNamespace,
      this._context,
      options
    );
  }
}
