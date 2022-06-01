// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventData } from "./eventData";
import { EventHubProducerClient } from "./eventHubProducerClient";
import { OperationOptions } from "./util/operationOptions";
import {
  EventHubClientOptions,
  GetEventHubPropertiesOptions,
  GetPartitionIdsOptions,
  GetPartitionPropertiesOptions,
  SendBatchOptions,
} from "./models/public";
import { EventHubProperties, PartitionProperties } from "./managementClient";
import { NamedKeyCredential, SASCredential, TokenCredential } from "@azure/core-auth";
import { isCredential, isDefined } from "./util/typeGuards";
import { AbortController } from "@azure/abort-controller";
import { AmqpAnnotatedMessage, delay } from "@azure/core-amqp";
import { BatchingPartitionChannel } from "./batchingPartitionChannel";
import { PartitionAssigner } from "./impl/partitionAssigner";
import { logger } from "./log";

/**
 * Contains the events that were successfully sent to the Event Hub,
 * and the partition they were assigned to.
 */
export interface OnSendEventsSuccessContext {
  /**
   * The partition each event was assigned.
   */
  partitionId: string;
  /**
   * The array of {@link EventData} and/or `AmqpAnnotatedMessage` that were successfully sent to the Event Hub.
   */
  events: Array<EventData | AmqpAnnotatedMessage>;
}

/**
 * Contains the events that were not successfully sent to the Event Hub,
 * the partition they were assigned to, and the error that was encountered while sending.
 */
export interface OnSendEventsErrorContext {
  /**
   * The partition each event was assigned.
   */
  partitionId: string;
  /**
   * The array of {@link EventData} and/or `AmqpAnnotatedMessage` that were not successfully sent to the Event Hub.
   */
  events: Array<EventData | AmqpAnnotatedMessage>;
  /**
   * The error that occurred when sending the associated events to the Event Hub.
   */
  error: Error;
}

/**
 * Describes the options that can be provided while creating the `EventHubBufferedProducerClient`.
 */
export interface EventHubBufferedProducerClientOptions extends EventHubClientOptions {
  /**
   * The total number of events that can be buffered for publishing at a given time for a given partition.
   *
   * Default: 1500
   */
  maxEventBufferLengthPerPartition?: number;
  /**
   * The amount of time to wait for a new event to be enqueued in the buffer before publishing a partially full batch.
   *
   * Default: 1 second.
   */
  maxWaitTimeInMs?: number;
  /**
   * The handler to call once a batch has successfully published.
   */
  onSendEventsSuccessHandler?: (ctx: OnSendEventsSuccessContext) => void;
  /**
   * The handler to call when a batch fails to publish.
   */
  onSendEventsErrorHandler: (ctx: OnSendEventsErrorContext) => void;
  /**
   * Indicates whether or not the EventHubProducerClient should enable idempotent publishing to Event Hub partitions.
   * If enabled, the producer will only be able to publish directly to partitions;
   * it will not be able to publish to the Event Hubs gateway for automatic partition routing
   * nor will it be able to use a partition key.
   * Default: false
   */
  enableIdempotentRetries?: boolean;
}

/**
 * Options to configure the `flush` method on the `EventHubBufferedProducerClient`.
 */
export interface BufferedFlushOptions extends OperationOptions {}

/**
 * Options to configure the `close` method on the `EventHubBufferedProducerClient`.
 */
export interface BufferedCloseOptions extends OperationOptions {
  /**
   * When `true`, all buffered events that are pending should be sent before closing.
   * When `false`, abandon all buffered events and close immediately.
   * Defaults to `true`.
   */
  flush?: boolean;
}

/**
 * Options to configure the `enqueueEvents` method on the `EventHubBufferedProcuerClient`.
 */
export interface EnqueueEventOptions extends SendBatchOptions {}

/**
 * The `EventHubBufferedProducerClient`is used to publish events to a specific Event Hub.
 *
 * The `EventHubBufferedProducerClient` does not publish events immediately.
 * Instead, events are buffered so they can be efficiently batched and published
 * when the batch is full or the `maxWaitTimeInMs` has elapsed with no new events
 * enqueued.
 *
 * Depending on the options specified when events are enqueued, they may be
 * automatically assigned to a partition, grouped according to the specified partition key,
 * or assigned a specifically requested partition.
 *
 * This model is intended to shift the burden of batch management from callers, at the cost of
 * non-deterministic timing, for when events will be published. There are additional trade-offs
 * to consider, as well:
 * - If the application crashes, events in the buffer will not have been published. To prevent
 *   data loss, callers are encouraged to track publishing progress using the
 *   `onSendEventsSuccessHandler` and `onSendEventsErrorHandler` handlers.
 * - Events specifying a partition key may be assigned a different partition than those using
 *   the same key with other producers.
 * - In the unlikely event that a partition becomes temporarily unavailable, the
 *   `EventHubBufferedProducerClient` may take longer to recover than other producers.
 *
 * In scenarios where it is important to have events published immediately with a deterministic
 * outcome, ensure that partition keys are assigned to a partition consistent with other
 * publishers, or where maximizing availability is a requirement, using the
 * `EventHubProducerClient` is recommended.
 */
export class EventHubBufferedProducerClient {
  /**
   * Controls the `abortSignal` passed to each `BatchingPartitionChannel`.
   * Used to signal when a channel should stop waiting for events.
   */
  private _abortController = new AbortController();

  /**
   * Indicates whether the client has been explicitly closed.
   */
  private _isClosed: boolean = false;

  /**
   * Handles assigning partitions.
   */
  private _partitionAssigner = new PartitionAssigner();

  /**
   * The known partitionIds that will be used when assigning events to partitions.
   */
  private _partitionIds: string[] = [];

  /**
   * The EventHubProducerClient to use when creating and sending batches to the Event Hub.
   */
  private _producer: EventHubProducerClient;

  /**
   * Mapping of partitionIds to `BatchingPartitionChannels`.
   * Each `BatchingPartitionChannel` handles buffering events and backpressure independently.
   */
  private _partitionChannels = new Map<string, BatchingPartitionChannel>();

  /**
   * The options passed by the user when creating the EventHubBufferedProducerClient instance.
   */
  private _clientOptions: EventHubBufferedProducerClientOptions;

  /**
   * The interval at which the background management operation should run.
   */
  private _backgroundManagementInterval = 10000; // 10 seconds

  /**
   * Indicates whether the background management loop is running.
   */
  private _isBackgroundManagementRunning = false;

  /**
   * @readonly
   * The name of the Event Hub instance for which this client is created.
   */
  get eventHubName(): string {
    return this._producer.eventHubName;
  }

  /**
   * @readonly
   * The fully qualified namespace of the Event Hub instance for which this client is created.
   * This is likely to be similar to <yournamespace>.servicebus.windows.net.
   */
  get fullyQualifiedNamespace(): string {
    return this._producer.fullyQualifiedNamespace;
  }

  /**
   * The `EventHubBufferedProducerClient` class is used to send events to an Event Hub.
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
  constructor(connectionString: string, options: EventHubBufferedProducerClientOptions);
  /**
   * The `EventHubBufferedProducerClient` class is used to send events to an Event Hub.
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
  constructor(
    connectionString: string,
    eventHubName: string,
    options: EventHubBufferedProducerClientOptions
  );
  /**
   * The `EventHubBufferedProducerClient` class is used to send events to an Event Hub.
   * Use the `options` parmeter to configure retry policy or proxy settings.
   * @param fullyQualifiedNamespace - The full namespace which is likely to be similar to
   * <yournamespace>.servicebus.windows.net
   * @param eventHubName - The name of the specific Event Hub to connect the client to.
   * @param credential - An credential object used by the client to get the token to authenticate the connection
   * with the Azure Event Hubs service.
   * See &commat;azure/identity for creating credentials that support AAD auth.
   * Use the `AzureNamedKeyCredential` from &commat;azure/core-auth if you want to pass in a `SharedAccessKeyName`
   * and `SharedAccessKey` without using a connection string. These fields map to the `name` and `key` field respectively
   * in `AzureNamedKeyCredential`.
   * Use the `AzureSASCredential` from &commat;azure/core-auth if you want to pass in a `SharedAccessSignature`
   * without using a connection string. This field maps to `signature` in `AzureSASCredential`.
   * @param options - A set of options to apply when configuring the client.
   * - `retryOptions`   : Configures the retry policy for all the operations on the client.
   * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
   * - `webSocketOptions`: Configures the channelling of the AMQP connection over Web Sockets.
   * - `userAgent`      : A string to append to the built in user agent string that is passed to the service.
   */
  constructor(
    fullyQualifiedNamespace: string,
    eventHubName: string,
    credential: TokenCredential | NamedKeyCredential | SASCredential,
    options: EventHubBufferedProducerClientOptions
  );
  constructor(
    fullyQualifiedNamespaceOrConnectionString1: string,
    eventHubNameOrOptions2: string | EventHubBufferedProducerClientOptions,
    credentialOrOptions3?:
      | TokenCredential
      | NamedKeyCredential
      | SASCredential
      | EventHubBufferedProducerClientOptions,
    options4?: EventHubBufferedProducerClientOptions
  ) {
    if (typeof eventHubNameOrOptions2 !== "string") {
      this._producer = new EventHubProducerClient(
        fullyQualifiedNamespaceOrConnectionString1,
        eventHubNameOrOptions2
      );
      this._clientOptions = { ...eventHubNameOrOptions2 };
    } else if (!isCredential(credentialOrOptions3)) {
      this._producer = new EventHubProducerClient(
        fullyQualifiedNamespaceOrConnectionString1,
        eventHubNameOrOptions2,
        credentialOrOptions3
      );
      this._clientOptions = { ...credentialOrOptions3! };
    } else {
      this._producer = new EventHubProducerClient(
        fullyQualifiedNamespaceOrConnectionString1,
        eventHubNameOrOptions2,
        credentialOrOptions3,
        options4
      );
      this._clientOptions = { ...options4! };
    }

    // setting internal idempotent publishing option on the standard producer.
    (this._producer as any)._enableIdempotentRetries = this._clientOptions.enableIdempotentRetries;
  }

  /**
   * Closes the AMQP connection to the Event Hub instance,
   * returning a promise that will be resolved when disconnection is completed.
   *
   * This will wait for enqueued events to be flushed to the service before closing
   * the connection.
   * To close without flushing, set the `flush` option to `false`.
   *
   * @param options - The set of options to apply to the operation call.
   * @returns Promise<void>
   * @throws Error if the underlying connection encounters an error while closing.
   */
  async close(options: BufferedCloseOptions = {}): Promise<void> {
    logger.verbose("closing buffered producer client...");
    if (!isDefined(options.flush) || options.flush === true) {
      await this.flush(options);
    }
    // Calling abort signals to the BatchingPartitionChannels that they
    // should stop reading/sending events, and to the background management
    // loop that it should stop periodic partition id updates.
    this._abortController.abort();
    await this._producer.close();
    this._isClosed = true;
  }

  /**
   * Enqueues an event into the buffer to be published to the Event Hub.
   * If there is no capacity in the buffer when this method is invoked,
   * it will wait for space to become available and ensure that the event
   * has been enqueued.
   *
   * When this call returns, the event has been accepted into the buffer,
   * but it may not have been published yet.
   * Publishing will take place at a nondeterministic point in the future as the buffer is processed.
   *
   * @param events - An {@link EventData} or `AmqpAnnotatedMessage`.
   * @param options - A set of options that can be specified to influence the way in which
   * the event is sent to the associated Event Hub.
   * - `abortSignal`  : A signal used to cancel the enqueueEvent operation.
   * - `partitionId`  : The partition this set of events will be sent to. If set, `partitionKey` can not be set.
   * - `partitionKey` : A value that is hashed to produce a partition assignment. If set, `partitionId` can not be set.
   * @returns The total number of events that are currently buffered and waiting to be published, across all partitions.
   */
  async enqueueEvent(
    event: EventData | AmqpAnnotatedMessage,
    options: EnqueueEventOptions = {}
  ): Promise<number> {
    if (this._isClosed) {
      throw new Error(
        `This EventHubBufferedProducerClient has already been closed. Create a new client to enqueue events.`
      );
    }

    if (!this._partitionIds.length) {
      await this._updatePartitionIds();
    }
    if (!this._isBackgroundManagementRunning) {
      this._startPartitionIdsUpdateLoop().catch((e) => {
        logger.error(
          `The following error occured during batch creation or sending: ${JSON.stringify(
            e,
            undefined,
            "  "
          )}`
        );
      });
      this._isBackgroundManagementRunning = true;
    }

    const partitionId = this._partitionAssigner.assignPartition({
      partitionId: options.partitionId,
      partitionKey: options.partitionKey,
    });

    const partitionChannel = this._getPartitionChannel(partitionId);
    await partitionChannel.enqueueEvent(event);
    return this._getTotalBufferedEventsCount();
  }

  /**
   * Enqueues events into the buffer to be published to the Event Hub.
   * If there is no capacity in the buffer when this method is invoked,
   * it will wait for space to become available and ensure that the events
   * have been enqueued.
   *
   * When this call returns, the events have been accepted into the buffer,
   * but it may not have been published yet.
   * Publishing will take place at a nondeterministic point in the future as the buffer is processed.
   *
   * @param events - An array of {@link EventData} or `AmqpAnnotatedMessage`.
   * @param options - A set of options that can be specified to influence the way in which
   * events are sent to the associated Event Hub.
   * - `abortSignal`  : A signal used to cancel the enqueueEvents operation.
   * - `partitionId`  : The partition this set of events will be sent to. If set, `partitionKey` can not be set.
   * - `partitionKey` : A value that is hashed to produce a partition assignment. If set, `partitionId` can not be set.
   * @returns The total number of events that are currently buffered and waiting to be published, across all partitions.
   */
  async enqueueEvents(
    events: EventData[] | AmqpAnnotatedMessage[],
    options: EnqueueEventOptions = {}
  ): Promise<number> {
    for (const event of events) {
      await this.enqueueEvent(event, options);
    }

    return this._getTotalBufferedEventsCount();
  }

  /**
   * Attempts to publish all events in the buffer immediately.
   * This may result in multiple batches being published,
   * the outcome of each of which will be individually reported by
   * the `onSendEventsSuccessHandler` and `onSendEventsErrorHandler` handlers.
   *
   * @param options - The set of options to apply to the operation call.
   */
  async flush(options: BufferedFlushOptions = {}): Promise<void> {
    await Promise.all(
      Array.from(this._partitionChannels.values()).map((channel) => channel.flush(options))
    );
  }

  /**
   * Provides the Event Hub runtime information.
   * @param options - The set of options to apply to the operation call.
   * @returns A promise that resolves with information about the Event Hub instance.
   * @throws Error if the underlying connection has been closed, create a new EventHubBufferedProducerClient.
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  getEventHubProperties(options: GetEventHubPropertiesOptions = {}): Promise<EventHubProperties> {
    return this._producer.getEventHubProperties(options);
  }

  /**
   * Provides the id for each partition associated with the Event Hub.
   * @param options - The set of options to apply to the operation call.
   * @returns A promise that resolves with an Array of strings representing the id for
   * each partition associated with the Event Hub.
   * @throws Error if the underlying connection has been closed, create a new EventHubBufferedProducerClient.
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  getPartitionIds(options: GetPartitionIdsOptions = {}): Promise<Array<string>> {
    return this._producer.getPartitionIds(options);
  }

  /**
   * Provides information about the state of the specified partition.
   * @param partitionId - The id of the partition for which information is required.
   * @param options - The set of options to apply to the operation call.
   * @returns A promise that resolves with information about the state of the partition .
   * @throws Error if the underlying connection has been closed, create a new EventHubBufferedProducerClient.
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  getPartitionProperties(
    partitionId: string,
    options: GetPartitionPropertiesOptions = {}
  ): Promise<PartitionProperties> {
    return this._producer.getPartitionProperties(partitionId, options);
  }

  /**
   * Gets the `BatchingPartitionChannel` associated with the partitionId.
   *
   * If one does not exist, it is created.
   */
  private _getPartitionChannel(partitionId: string): BatchingPartitionChannel {
    const partitionChannel =
      this._partitionChannels.get(partitionId) ??
      new BatchingPartitionChannel({
        loopAbortSignal: this._abortController.signal,
        maxBufferSize: this._clientOptions.maxEventBufferLengthPerPartition || 1500,
        maxWaitTimeInMs: this._clientOptions.maxWaitTimeInMs || 1000,
        onSendEventsErrorHandler: this._clientOptions.onSendEventsErrorHandler,
        onSendEventsSuccessHandler: this._clientOptions.onSendEventsSuccessHandler,
        partitionId,
        producer: this._producer,
      });
    this._partitionChannels.set(partitionId, partitionChannel);
    return partitionChannel;
  }

  /**
   * Returns the total number of buffered events across all partitions.
   */
  private _getTotalBufferedEventsCount(): number {
    let total = 0;
    for (const [_, channel] of this._partitionChannels) {
      total += channel.getCurrentBufferedCount();
    }

    return total;
  }

  private async _updatePartitionIds(): Promise<void> {
    logger.verbose("Checking for partition Id updates...");
    const queriedPartitionIds = await this.getPartitionIds();

    if (this._partitionIds.length !== queriedPartitionIds.length) {
      logger.verbose("Applying partition Id updates");
      this._partitionIds = queriedPartitionIds;
      this._partitionAssigner.setPartitionIds(this._partitionIds);
    }
  }

  private async _startPartitionIdsUpdateLoop(): Promise<void> {
    logger.verbose("Starting a background loop to check and apply partition id updates...");
    while (!this._abortController.signal.aborted && !this._isClosed) {
      await delay<void>(this._backgroundManagementInterval);
      if (!this._isClosed) {
        await this._updatePartitionIds();
      }
    }
  }
}
