// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AmqpAnnotatedMessage } from "@azure/core-amqp";
import { NamedKeyCredential, SASCredential, TokenCredential } from "@azure/core-auth";
import { SpanStatusCode, Link, Span, SpanContext, SpanKind } from "@azure/core-tracing";
import { ConnectionContext, createConnectionContext } from "./connectionContext";
import { instrumentEventData } from "./diagnostics/instrumentEventData";
import { EventData } from "./eventData";
import { EventDataBatch, EventDataBatchImpl, isEventDataBatch } from "./eventDataBatch";
import { EventHubSender } from "./eventHubSender";
import { logErrorStackTrace, logger } from "./log";
import { EventHubProperties, PartitionProperties } from "./managementClient";
import {
  CreateBatchOptions,
  EventHubClientOptions,
  GetEventHubPropertiesOptions,
  GetPartitionIdsOptions,
  GetPartitionPropertiesOptions,
  SendBatchOptions
} from "./models/public";
import { throwErrorIfConnectionClosed, throwTypeErrorIfParameterMissing } from "./util/error";
import { isCredential, isDefined } from "./util/typeGuards";
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
   * The options passed by the user when creating the EventHubClient instance.
   */
  private _clientOptions: EventHubClientOptions;
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

    if (isDefined(options.partitionId) && isDefined(options.partitionKey)) {
      throw new Error("partitionId and partitionKey cannot both be set when creating a batch");
    }

    let sender = this._sendersMap.get("");
    if (!sender) {
      sender = EventHubSender.create(this._context);
      this._sendersMap.set("", sender);
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
      options.partitionKey,
      options.partitionId
    );
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
   * @param batch - An array of {@link EventData} or `AmqpAnnotatedMessage`.
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
  async sendBatch(
    batch: EventData[] | AmqpAnnotatedMessage[],
    options?: SendBatchOptions
  ): Promise<void>;
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

    let partitionId: string | undefined;
    let partitionKey: string | undefined;

    // link message span contexts
    let spanContextsToLink: SpanContext[] = [];

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

      spanContextsToLink = batch._messageSpanContexts;
    } else {
      if (!Array.isArray(batch)) {
        batch = [batch];
      }

      // For arrays of events, partitionId and partitionKey would be set in the options.
      const expectedOptions = options as SendBatchOptions;
      partitionId = expectedOptions.partitionId;
      partitionKey = expectedOptions.partitionKey;

      for (let i = 0; i < batch.length; i++) {
        batch[i] = instrumentEventData(
          batch[i],
          options,
          this._context.config.entityPath,
          this._context.config.host
        ).event;
      }
    }
    if (isDefined(partitionId) && isDefined(partitionKey)) {
      throw new Error(
        `The partitionId (${partitionId}) and partitionKey (${partitionKey}) cannot both be specified.`
      );
    }

    if (isDefined(partitionId)) {
      partitionId = String(partitionId);
    }
    if (isDefined(partitionKey)) {
      partitionKey = String(partitionKey);
    }

    let sender = this._sendersMap.get(partitionId || "");
    if (!sender) {
      sender = EventHubSender.create(this._context, partitionId);
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
      sendSpan.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error) {
      sendSpan.setStatus({
        code: SpanStatusCode.ERROR,
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
}
