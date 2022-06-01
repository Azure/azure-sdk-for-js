// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ConnectionContext, createConnectionContext } from "./connectionContext";
import {
  CreateBatchOptions,
  EventHubClientOptions,
  GetEventHubPropertiesOptions,
  GetPartitionIdsOptions,
  GetPartitionPropertiesOptions,
  SendBatchOptions,
} from "./models/public";
import { PartitionPublishingOptions, PartitionPublishingProperties } from "./models/private";
import { EventDataBatch, EventDataBatchImpl, isEventDataBatch } from "./eventDataBatch";
import { EventHubProperties, PartitionProperties } from "./managementClient";
import { TracingContext, TracingSpanLink } from "@azure/core-tracing";
import { NamedKeyCredential, SASCredential, TokenCredential } from "@azure/core-auth";
import { isCredential, isDefined } from "./util/typeGuards";
import { logErrorStackTrace, logger } from "./log";
import {
  idempotentAlreadyPublished,
  idempotentSomeAlreadyPublished,
  throwErrorIfConnectionClosed,
  throwTypeErrorIfParameterMissing,
  validateProducerPartitionSettings,
} from "./util/error";
import { AmqpAnnotatedMessage } from "@azure/core-amqp";
import { EventData, EventDataInternal } from "./eventData";
import { EventHubSender } from "./eventHubSender";
import { OperationOptions } from "./util/operationOptions";
import { toSpanOptions, tracingClient } from "./diagnostics/tracing";
import { instrumentEventData } from "./diagnostics/instrumentEventData";

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
   * Map of partitionId to senders
   */
  private _sendersMap: Map<string, EventHubSender>;
  /**
   * Indicates whether or not the EventHubProducerClient should enable idempotent publishing to Event Hub partitions.
   * If enabled, the producer will only be able to publish directly to partitions;
   * it will not be able to publish to the Event Hubs gateway for automatic partition routing
   * nor will it be able to use a partition key.
   * Default: false
   */
  private _enableIdempotentRetries?: boolean;
  /**
   * The set of options that can be specified to influence publishing behavior specific to the configured Event Hub partition.
   * These options are not necessary in the majority of scenarios and are intended for use with specialized scenarios,
   * such as when recovering the state used for idempotent publishing.
   */
  private _partitionOptions?: Record<string, PartitionPublishingOptions>;
  /**
   * @readonly
   * The name of the Event Hub instance for which this client is created.
   */
  get eventHubName(): string {
    return this._context.config.entityPath;
  }

  /**
   * @readonly
   * The fully qualified namespace of the Event Hub instance for which this client is created.
   * This is likely to be similar to <yournamespace>.servicebus.windows.net.
   */
  get fullyQualifiedNamespace(): string {
    return this._context.config.host;
  }

  /**
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
  constructor(connectionString: string, options?: EventHubClientOptions); // eslint-disable-line @azure/azure-sdk/ts-naming-options
  /**
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
  constructor(connectionString: string, eventHubName: string, options?: EventHubClientOptions); // eslint-disable-line @azure/azure-sdk/ts-naming-options
  /**
   * The `EventHubProducerClient` class is used to send events to an Event Hub.
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
    options?: EventHubClientOptions // eslint-disable-line @azure/azure-sdk/ts-naming-options
  );
  constructor(
    fullyQualifiedNamespaceOrConnectionString1: string,
    eventHubNameOrOptions2?: string | EventHubClientOptions,
    credentialOrOptions3?:
      | TokenCredential
      | NamedKeyCredential
      | SASCredential
      | EventHubClientOptions,
    options4?: EventHubClientOptions // eslint-disable-line @azure/azure-sdk/ts-naming-options
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

    this._sendersMap = new Map();
  }

  /**
   * Creates an instance of `EventDataBatch` to which one can add events until the maximum supported size is reached.
   * The batch can be passed to the {@link sendBatch} method of the `EventHubProducerClient` to be sent to Azure Event Hubs.
   *
   * Events with different values for partitionKey or partitionId will need to be put into different batches.
   * To simplify such batch management across partitions or to have the client automatically batch events
   * and send them in specific intervals, use `EventHubBufferedProducerClient` instead.
   *
   * The below example assumes you have an array of events at hand to be batched safely.
   * If you have events coming in one by one, `EventHubBufferedProducerClient` is recommended instead
   * for effecient management of batches.
   *
   * Example usage:
   * ```ts
   * const client = new EventHubProducerClient(connectionString);
   * let batch = await client.createBatch();
   * for (let i = 0; i < messages.length; i++) {
   *  if (!batch.tryAdd(messages[i])) {
   *    await client.sendBatch(batch);
   *    batch = await client.createBatch();
   *    if (!batch.tryAdd(messages[i])) {
   *      throw new Error("Message too big to fit")
   *    }
   *    if (i === messages.length - 1) {
   *      await client.sendBatch(batch);
   *    }
   *   }
   * }
   * ```
   *
   * @param options -  Configures the behavior of the batch.
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
  async createBatch(options: CreateBatchOptions = {}): Promise<EventDataBatch> {
    throwErrorIfConnectionClosed(this._context);

    const partitionId = isDefined(options.partitionId) ? String(options.partitionId) : undefined;

    validateProducerPartitionSettings({
      enableIdempotentRetries: this._enableIdempotentRetries,
      partitionId,
      partitionKey: options.partitionKey,
    });

    let sender = this._sendersMap.get(partitionId || "");
    if (!sender) {
      const partitionPublishingOptions = isDefined(partitionId)
        ? this._partitionOptions?.[partitionId]
        : undefined;
      sender = EventHubSender.create(this._context, {
        enableIdempotentProducer: Boolean(this._enableIdempotentRetries),
        partitionId,
        partitionPublishingOptions,
      });
      this._sendersMap.set(partitionId || "", sender);
    }

    let maxMessageSize = await sender.getMaxMessageSize({
      retryOptions: this._clientOptions.retryOptions,
      abortSignal: options.abortSignal,
    });

    if (options.maxSizeInBytes) {
      if (options.maxSizeInBytes > maxMessageSize) {
        const error = new Error(
          `Max message size (${options.maxSizeInBytes} bytes) is greater than maximum message size (${maxMessageSize} bytes) on the AMQP sender link.`
        );
        logger.warning(`[${this._context.connectionId}] ${error.message}`);
        logErrorStackTrace(error);
        throw error;
      }
      maxMessageSize = options.maxSizeInBytes;
    }
    return new EventDataBatchImpl(
      this._context,
      maxMessageSize,
      Boolean(this._enableIdempotentRetries),
      options.partitionKey,
      partitionId
    );
  }

  /**
   * Get the information about the state of publishing for a partition as observed by the `EventHubProducerClient`.
   * This data can always be read, but will only be populated with information relevant to the active features
   * for the producer client.
   *
   * @param partitionId - Id of the partition from which to retrieve publishing properties.
   * @param options - The set of options to apply to the operation call.
   * - `abortSignal`  : A signal the request to cancel the send operation.
   * @returns Promise<void>
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore this is called in EventHubBufferedProducerClient via cast-to-any workaround
  private async getPartitionPublishingProperties(
    partitionId: string,
    options: OperationOptions = {}
  ): Promise<PartitionPublishingProperties> {
    if (!isDefined(partitionId)) {
      throw new TypeError(
        `getPartitionPublishingProperties called without required argument "partitionId"`
      );
    }

    if (typeof partitionId === "number") {
      partitionId = String(partitionId);
    }

    let sender = this._sendersMap.get(partitionId);
    if (!sender) {
      sender = EventHubSender.create(this._context, {
        enableIdempotentProducer: Boolean(this._enableIdempotentRetries),
        partitionId,
        partitionPublishingOptions: this._partitionOptions?.[partitionId],
      });
      this._sendersMap.set(partitionId, sender);
    }

    return sender.getPartitionPublishingProperties(options);
  }

  /**
   * Sends an array of events as a batch to the associated Event Hub.
   *
   * Azure Event Hubs has a limit on the size of the batch that can be sent which if exceeded
   * will result in an error with code `MessageTooLargeError`.
   * To safely send within batch size limits, use `EventHubProducerClient.createBatch()` or
   * `EventHubBufferedProducerClient` instead.
   *
   * Example usage:
   * ```ts
   * const client = new EventHubProducerClient(connectionString);
   * await client.sendBatch(messages);
   * ```
   *
   * @param batch - An array of {@link EventData} or `AmqpAnnotatedMessage`.
   * @param options - A set of options that can be specified to influence the way in which
   * events are sent to the associated Event Hub.
   * - `abortSignal`  : A signal the request to cancel the send operation.
   * - `partitionId`  : The partition this batch will be sent to. If set, `partitionKey` can not be set.
   * - `partitionKey` : A value that is hashed to produce a partition assignment. If set, `partitionId` can not be set.
   *
   * @returns Promise<void>
   * @throws MessageTooLargeError if all the events in the input array cannot be fit into a batch.
   * @throws AbortError if the operation is cancelled via the abortSignal.
   * @throws MessagingError if an error is encountered while sending a message.
   * @throws Error if the underlying connection or sender has been closed.
   */
  async sendBatch(
    batch: EventData[] | AmqpAnnotatedMessage[],
    options?: SendBatchOptions
  ): Promise<void>;
  /**
   * Sends a batch of events created using `EventHubProducerClient.createBatch()` to the associated Event Hub.
   *
   * Events with different values for partitionKey or partitionId will need to be put into different batches.
   * To simplify such batch management across partitions or to have the client automatically batch events
   * and send them in specific intervals, use `EventHubBufferedProducerClient` instead.
   *
   * The below example assumes you have an array of events at hand to be batched safely.
   * If you have events coming in one by one, `EventHubBufferedProducerClient` is recommended instead
   * for effecient management of batches.
   *
   * Example usage:
   * ```ts
   * const client = new EventHubProducerClient(connectionString);
   * let batch = await client.createBatch();
   * for (let i = 0; i < messages.length; i++) {
   *  if (!batch.tryAdd(messages[i])) {
   *    await client.sendBatch(batch);
   *    batch = await client.createBatch();
   *    if (!batch.tryAdd(messages[i])) {
   *      throw new Error("Message too big to fit")
   *    }
   *    if (i === messages.length - 1) {
   *      await client.sendBatch(batch);
   *    }
   *   }
   * }
   * ```
   * @param batch - A batch of events that you can create using the {@link createBatch} method.
   * @param options - A set of options that can be specified to influence the way in which
   * events are sent to the associated Event Hub.
   * - `abortSignal`  : A signal the request to cancel the send operation.
   *
   * @returns Promise<void>
   * @throws AbortError if the operation is cancelled via the abortSignal.
   * @throws MessagingError if an error is encountered while sending a message.
   * @throws Error if the underlying connection or sender has been closed.
   */
  async sendBatch(batch: EventDataBatch, options?: OperationOptions): Promise<void>; // eslint-disable-line @azure/azure-sdk/ts-naming-options
  async sendBatch(
    batch: EventDataBatch | EventData[],
    options: SendBatchOptions | OperationOptions = {}
  ): Promise<void> {
    throwErrorIfConnectionClosed(this._context);
    throwTypeErrorIfParameterMissing(this._context.connectionId, "sendBatch", "batch", batch);

    let partitionId: string | undefined;
    let partitionKey: string | undefined;

    // Holds an EventData properties object containing tracing properties.
    // This lets us avoid cloning batch when it is EventData[], which is
    // important as the idempotent EventHubSender needs to decorate the
    // original EventData passed through.
    const eventDataTracingProperties: Array<EventData["properties"]> = [];

    // link message span contexts
    let spanContextsToLink: TracingContext[] = [];

    if (isEventDataBatch(batch)) {
      if (
        this._enableIdempotentRetries &&
        isDefined((batch as EventDataBatchImpl).startingPublishedSequenceNumber)
      ) {
        throw new Error(idempotentAlreadyPublished);
      }
      const partitionAssignment = extractPartitionAssignmentFromBatch(batch, options);
      partitionId = partitionAssignment.partitionId;
      partitionKey = partitionAssignment.partitionKey;
      spanContextsToLink = (batch as EventDataBatchImpl)._messageSpanContexts;
    } else {
      if (!Array.isArray(batch)) {
        batch = [batch];
      }
      if (batch.some((event) => isDefined((event as EventDataInternal)._publishedSequenceNumber))) {
        throw new Error(idempotentSomeAlreadyPublished);
      }
      const partitionAssignment = extractPartitionAssignmentFromOptions(options);
      partitionId = partitionAssignment.partitionId;
      partitionKey = partitionAssignment.partitionKey;

      for (let i = 0; i < batch.length; i++) {
        batch[i] = instrumentEventData(
          batch[i],
          options,
          this._context.config.entityPath,
          this._context.config.host
        ).event;
        eventDataTracingProperties[i] = batch[i].properties;
      }
    }

    validateProducerPartitionSettings({
      enableIdempotentRetries: this._enableIdempotentRetries,
      partitionId,
      partitionKey,
    });

    return tracingClient.withSpan(
      `${EventHubProducerClient.name}.${this.sendBatch.name}`,
      options,
      (updatedOptions) => {
        let sender = this._sendersMap.get(partitionId || "");
        if (!sender) {
          const partitionPublishingOptions = isDefined(partitionId)
            ? this._partitionOptions?.[partitionId]
            : undefined;
          sender = EventHubSender.create(this._context, {
            enableIdempotentProducer: Boolean(this._enableIdempotentRetries),
            partitionId,
            partitionPublishingOptions,
          });
          this._sendersMap.set(partitionId || "", sender);
        }

        return sender.send(batch, {
          ...updatedOptions,
          partitionId,
          partitionKey,
          retryOptions: this._clientOptions.retryOptions,
        });
      },
      {
        spanLinks: spanContextsToLink.map<TracingSpanLink>((tracingContext) => {
          return { tracingContext };
        }),
        ...toSpanOptions(this._context.config, "client"),
      }
    );
  }

  /**
   * Closes the AMQP connection to the Event Hub instance,
   * returning a promise that will be resolved when disconnection is completed.
   * @returns Promise<void>
   * @throws Error if the underlying connection encounters an error while closing.
   */
  async close(): Promise<void> {
    await this._context.close();

    for (const pair of this._sendersMap) {
      await pair[1].close();
    }
    this._sendersMap.clear();
  }

  /**
   * Provides the Event Hub runtime information.
   * @param options - The set of options to apply to the operation call.
   * @returns A promise that resolves with information about the Event Hub instance.
   * @throws Error if the underlying connection has been closed, create a new EventHubProducerClient.
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  getEventHubProperties(options: GetEventHubPropertiesOptions = {}): Promise<EventHubProperties> {
    return this._context.managementSession!.getEventHubProperties({
      ...options,
      retryOptions: this._clientOptions.retryOptions,
    });
  }

  /**
   * Provides the id for each partition associated with the Event Hub.
   * @param options - The set of options to apply to the operation call.
   * @returns A promise that resolves with an Array of strings representing the id for
   * each partition associated with the Event Hub.
   * @throws Error if the underlying connection has been closed, create a new EventHubProducerClient.
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  getPartitionIds(options: GetPartitionIdsOptions = {}): Promise<Array<string>> {
    return this._context
      .managementSession!.getEventHubProperties({
        ...options,
        retryOptions: this._clientOptions.retryOptions,
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
   * @throws Error if the underlying connection has been closed, create a new EventHubProducerClient.
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  getPartitionProperties(
    partitionId: string,
    options: GetPartitionPropertiesOptions = {}
  ): Promise<PartitionProperties> {
    return this._context.managementSession!.getPartitionProperties(partitionId, {
      ...options,
      retryOptions: this._clientOptions.retryOptions,
    });
  }
}

/**
 * @internal
 */
function extractPartitionAssignmentFromOptions(options: SendBatchOptions = {}): {
  partitionKey?: string;
  partitionId?: string;
} {
  const result: ReturnType<typeof extractPartitionAssignmentFromOptions> = {};
  const { partitionId, partitionKey } = options;

  if (isDefined(partitionId)) {
    result.partitionId = String(partitionId);
  }
  if (isDefined(partitionKey)) {
    result.partitionKey = String(partitionKey);
  }

  return result;
}

/**
 * @internal
 */
function extractPartitionAssignmentFromBatch(
  batch: EventDataBatch,
  options: SendBatchOptions
): { partitionKey?: string; partitionId?: string } {
  const result: ReturnType<typeof extractPartitionAssignmentFromBatch> = {};
  const partitionId = batch.partitionId;
  const partitionKey = batch.partitionKey;

  const { partitionId: unexpectedPartitionId, partitionKey: unexpectedPartitionKey } =
    extractPartitionAssignmentFromOptions(options);
  if (unexpectedPartitionKey && partitionKey !== unexpectedPartitionKey) {
    throw new Error(
      `The partitionKey (${unexpectedPartitionKey}) set on sendBatch does not match the partitionKey (${partitionKey}) set when creating the batch.`
    );
  }
  if (unexpectedPartitionId && unexpectedPartitionId !== partitionId) {
    throw new Error(
      `The partitionId (${unexpectedPartitionId}) set on sendBatch does not match the partitionId (${partitionId}) set when creating the batch.`
    );
  }

  if (isDefined(partitionId)) {
    result.partitionId = String(partitionId);
  }
  if (isDefined(partitionKey)) {
    result.partitionKey = String(partitionKey);
  }

  return result;
}
