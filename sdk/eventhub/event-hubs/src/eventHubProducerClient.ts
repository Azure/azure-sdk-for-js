// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isTokenCredential, TokenCredential } from "@azure/core-auth";
import { CanonicalCode, Link, Span, SpanContext, SpanKind } from "@opentelemetry/api";
import { ConnectionContext, createConnectionContext } from "./connectionContext";
import { instrumentEventData, TRACEPARENT_PROPERTY } from "./diagnostics/instrumentEventData";
import { createMessageSpan } from "./diagnostics/tracing";
import { EventData } from "./eventData";
import { EventDataBatch, EventDataBatchImpl, isEventDataBatch } from "./eventDataBatch";
import { EventHubSender } from "./eventHubSender";
import { logErrorStackTrace, logger } from "./log";
import { EventHubProperties, PartitionProperties } from "./managementClient";
import {
  CreateBatchOptions,
  EventHubProducerClientOptions,
  GetEventHubPropertiesOptions,
  GetPartitionIdsOptions,
  GetPartitionPropertiesOptions,
  PartitionPublishingProperties,
  SendBatchOptions
} from "./models/public";
import { throwErrorIfConnectionClosed, throwTypeErrorIfParameterMissing } from "./util/error";
import { isDefined } from "./util/typeGuards";
import { OperationOptions } from "./util/operationOptions";
import { createEventHubSpan } from "./diagnostics/tracing";

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
   * The options passed by the user when creating the EventHubProducerClient instance.
   */
  private _clientOptions: EventHubProducerClientOptions;
  /**
   * Map of partitionId to senders
   */
  private _sendersMap: Map<string, EventHubSender>;
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
  constructor(connectionString: string, options?: EventHubProducerClientOptions); // eslint-disable-line @azure/azure-sdk/ts-naming-options
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
  constructor(
    connectionString: string,
    eventHubName: string,
    options?: EventHubProducerClientOptions
  ); // eslint-disable-line @azure/azure-sdk/ts-naming-options
  /**
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
    options?: EventHubProducerClientOptions // eslint-disable-line @azure/azure-sdk/ts-naming-options
  );
  constructor(
    fullyQualifiedNamespaceOrConnectionString1: string,
    eventHubNameOrOptions2?: string | EventHubProducerClientOptions,
    credentialOrOptions3?: TokenCredential | EventHubProducerClientOptions,
    options4?: EventHubProducerClientOptions // eslint-disable-line @azure/azure-sdk/ts-naming-options
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

    this._sendersMap = new Map();
  }

  /**
   * Creates an instance of `EventDataBatch` to which one can add events until the maximum supported size is reached.
   * The batch can be passed to the {@link sendBatch} method of the `EventHubProducerClient` to be sent to Azure Event Hubs.
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
    const { enableIdempotentPartitions } = this._clientOptions;
    const partitionId = isDefined(options.partitionId) ? String(options.partitionId) : undefined;

    if (enableIdempotentPartitions && isDefined(options.partitionKey)) {
      throw new Error(
        `"partitionKey" cannot be set while the EventHubProducerClient has "enableIdempotentPartitions" set to true.`
      );
    }

    if (enableIdempotentPartitions && !partitionId) {
      throw new Error(
        `"partitionId" must be specified while the EventHubProducerClient has "enableIdempotentPartitions" set to true.`
      );
    }

    if (partitionId && isDefined(options.partitionKey)) {
      throw new Error("partitionId and partitionKey cannot both be set when creating a batch");
    }

    let sender = this._sendersMap.get(partitionId || "");
    if (!sender) {
      sender = EventHubSender.create(this._context, {
        enableIdempotentProducer: Boolean(enableIdempotentPartitions),
        partitionId
      });
      this._sendersMap.set(partitionId || "", sender);
    }

    let maxMessageSize = await sender.getMaxMessageSize({
      retryOptions: this._clientOptions.retryOptions,
      abortSignal: options.abortSignal
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
      Boolean(enableIdempotentPartitions),
      options.partitionKey,
      partitionId
    );
  }

  /**
   * Get the information about the state of publishing for a partition as observed by the `EventHubProducerClient`.
   * This data can always be read, but will only be populated with information relevant to the active features
   * for the producer client.

   *
   * Example usage:
   * ```ts
   * const client = new EventHubProducerClient(connectionString);
   * const props = await client.getPartitionPublishingProperties("0");
   * console.log(`
   *   Partition "${props.partitionId}"
   *   Idempotent publishing enabled is ${props.isIdempotentPublishingEnabled}
   *   Producer Group Id is ${props.producerGroupId ?? "not set"}
   *   Owner Level is ${props.ownerLevel ?? "not set"}
   *   Last published sequence number is ${props.lastPublishedSequenceNumber ?? "not set"}
   * `);
   * ```
   *
   * @param partitionId - Id of the partition from which to retrieve publishing properties.
   * @param options - The set of options to apply to the operation call.
   * - `abortSignal`  : A signal the request to cancel the send operation.
   * @returns Promise<void>
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  async getPartitionPublishingProperties(
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
        enableIdempotentProducer: Boolean(this._clientOptions.enableIdempotentPartitions),
        partitionId
      });
      this._sendersMap.set(partitionId, sender);
    }

    return sender.getPartitionPublishingProperties(options);
  }

  /**
   * Sends an array of events to the associated Event Hub.
   *
   * Example usage:
   * ```ts
   * const client = new EventHubProducerClient(connectionString);
   * await client.sendBatch(messages);
   * ```
   *
   * @param batch - An array of {@link EventData}.
   * @param options - A set of options that can be specified to influence the way in which
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

    const { enableIdempotentPartitions } = this._clientOptions;

    let partitionId: string | undefined;
    let partitionKey: string | undefined;

    // link message span contexts
    let spanContextsToLink: SpanContext[] = [];

    if (isEventDataBatch(batch)) {
      const partitionAssignment = this._extractPartitionAssignmentFromBatch(batch, options);
      partitionId = partitionAssignment.partitionId;
      partitionKey = partitionAssignment.partitionKey;
      spanContextsToLink = batch._messageSpanContexts;
    } else {
      if (!Array.isArray(batch)) {
        batch = [batch];
      }

      // For arrays of events, partitionId and partitionKey would be set in the options.
      const partitionAssignment = this._extractPartitionAssignmentFromOptions(options);
      partitionId = partitionAssignment.partitionId;
      partitionKey = partitionAssignment.partitionKey;

      for (let i = 0; i < batch.length; i++) {
        const event = batch[i];
        if (!event.properties || !event.properties[TRACEPARENT_PROPERTY]) {
          const { span: messageSpan } = createMessageSpan(options, this._context.config);
          // since these message spans are created from same context as the send span,
          // these message spans don't need to be linked.
          // replace the original event with the instrumented one
          batch[i] = instrumentEventData(batch[i], messageSpan);
          messageSpan.end();
        }
      }
    }

    if (enableIdempotentPartitions && (isDefined(partitionKey) || !isDefined(partitionId))) {
      throw new Error(
        `"partitionId" must be supplied and "partitionKey" must not be provided while the EventHubProducerClient has "enableIdempotentPartitions" set to true.`
      );
    }

    if (isDefined(partitionId) && isDefined(partitionKey)) {
      throw new Error(
        `The partitionId (${partitionId}) and partitionKey (${partitionKey}) cannot both be specified.`
      );
    }

    let sender = this._sendersMap.get(partitionId || "");
    if (!sender) {
      sender = EventHubSender.create(this._context, {
        enableIdempotentProducer: Boolean(enableIdempotentPartitions),
        partitionId
      });
      this._sendersMap.set(partitionId || "", sender);
    }

    const sendSpan = this._createSendSpan(options, spanContextsToLink);

    try {
      const result = await sender.send(batch, {
        ...options,
        partitionId,
        partitionKey,
        retryOptions: this._clientOptions.retryOptions
      });
      sendSpan.setStatus({ code: CanonicalCode.OK });
      return result;
    } catch (error) {
      sendSpan.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      sendSpan.end();
    }
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
      retryOptions: this._clientOptions.retryOptions
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
   * @throws Error if the underlying connection has been closed, create a new EventHubProducerClient.
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

  private _createSendSpan(
    operationOptions: OperationOptions,
    spanContextsToLink: SpanContext[] = []
  ): Span {
    const links: Link[] = spanContextsToLink.map((context) => {
      return {
        context
      };
    });

    const { span } = createEventHubSpan("send", operationOptions, this._context.config, {
      kind: SpanKind.CLIENT,
      links
    });

    return span;
  }

  private _extractPartitionAssignmentFromBatch(
    batch: EventDataBatch,
    options: SendBatchOptions
  ): { partitionKey?: string; partitionId?: string } {
    const result: ReturnType<EventHubProducerClient["_extractPartitionAssignmentFromBatch"]> = {};
    const partitionId = batch.partitionId;
    const partitionKey = batch.partitionKey;

    const {
      partitionId: unexpectedPartitionId,
      partitionKey: unexpectedPartitionKey
    } = this._extractPartitionAssignmentFromOptions(options);
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

  private _extractPartitionAssignmentFromOptions(
    options: SendBatchOptions = {}
  ): { partitionKey?: string; partitionId?: string } {
    const result: ReturnType<EventHubProducerClient["_extractPartitionAssignmentFromOptions"]> = {};
    const { partitionId, partitionKey } = options;

    if (isDefined(partitionId)) {
      result.partitionId = String(partitionId);
    }
    if (isDefined(partitionKey)) {
      result.partitionKey = String(partitionKey);
    }

    return result;
  }
}
