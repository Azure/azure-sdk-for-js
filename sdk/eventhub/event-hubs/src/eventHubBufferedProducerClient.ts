// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AmqpAnnotatedMessage } from "@azure/core-amqp";
import { NamedKeyCredential, SASCredential, TokenCredential } from "@azure/core-auth";
import { EventData, OperationOptions } from ".";
import { ConnectionContext, createConnectionContext } from "./connectionContext";
import { EventHubProperties, PartitionProperties } from "./managementClient";
import {
  EventHubClientOptions,
  GetEventHubPropertiesOptions,
  GetPartitionIdsOptions,
  GetPartitionPropertiesOptions,
  SendBatchOptions
} from "./models/public";
import { isCredential, isDefined } from "./util/typeGuards";

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
   * The maximum number of events to buffer.
   */
  maxBufferedEventCount?: number;
  /**
   * The maximum amount of time to wait before sending a batch of messages to the Event Hub.
   */
  maxWaitTimeInMs?: number;
  /**
   * The handler to call once a batch has successfully published.
   */
  onSendEventsSuccessHandler?: (ctx: OnSendEventsSuccessContext) => Promise<void>;
  /**
   * The handler to call when a batch fails to publish.
   */
  onSendEventsErrorHandler: (ctx: OnSendEventsErrorContext) => Promise<void>;
}

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
 */
export class EventHubBufferedProducerClient {
  /**
   * Describes the amqp connection context for the client.
   */
  private _context: ConnectionContext;

  /**
   * The options passed by the user when creating the EventHubClient instance.
   */
  private _clientOptions: EventHubClientOptions;

  /**
   * @readonly
   * The name of the Event Hub instance for which this client is created.
   */
  get eventHubName(): string {
    throw new Error("Not implemented");
  }

  /**
   * @readonly
   * The fully qualified namespace of the Event Hub instance for which this client is created.
   * This is likely to be similar to <yournamespace>.servicebus.windows.net.
   */
  get fullyQualifiedNamespace(): string {
    throw new Error("Not implemented");
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
    this._context = createConnectionContext(
      fullyQualifiedNamespaceOrConnectionString1,
      eventHubNameOrOptions2,
      credentialOrOptions3,
      options4
    );
    if (typeof eventHubNameOrOptions2 !== "string") {
      this._clientOptions = eventHubNameOrOptions2 || {};
    } else if (!isCredential(credentialOrOptions3)) {
      this._clientOptions = credentialOrOptions3 || {};
    } else {
      this._clientOptions = options4 || {};
    }
  }

  /**
   * Closes the AMQP connection to the Event Hub instance,
   * returning a promise that will be resolved when disconnection is completed.
   *
   * @param options - The set of options to apply to the operation call.
   * @returns Promise<void>
   * @throws Error if the underlying connection encounters an error while closing.
   */
  async close(options: BufferedCloseOptions = {}): Promise<void> {
    if (!isDefined(options.flush) || options.flush === true) {
      await this.flush(options);
    }
    return this._context.close();
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
    throw new Error(`Not implemented ${event}, ${options}`);
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
    throw new Error(`Not implemented ${events}, ${options}`);
  }

  /**
   * Attempts to publish all events in the buffer immediately.
   * This may result in multiple batches being published,
   * the outcome of each of which will be individually reported by
   * the `onSendEventsSuccessHandler` and `onSendEventsErrorHandler` handlers.
   *
   * @param options - The set of options to apply to the operation call.
   */
  async flush(options: OperationOptions = {}): Promise<void> {
    throw new Error(`Not implemented ${options}`);
  }

  /**
   * Provides the Event Hub runtime information.
   * @param options - The set of options to apply to the operation call.
   * @returns A promise that resolves with information about the Event Hub instance.
   * @throws Error if the underlying connection has been closed, create a new EventHubBufferedProducerClient.
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  getEventHubProperties(options: GetEventHubPropertiesOptions = {}): Promise<EventHubProperties> {
    return this._context.managementSession!.getEventHubProperties({
      ...options,
      retryOptions: this._clientOptions.retryOptions
    });
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
    return this._context
      .managementSession!.getEventHubProperties({
        ...options,
        retryOptions: this._clientOptions.retryOptions
      })
      .then((eventHubProperties) => {
        return eventHubProperties.partitionIds;
      });
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
    return this._context.managementSession!.getPartitionProperties(partitionId, {
      ...options,
      retryOptions: this._clientOptions.retryOptions
    });
  }
}
