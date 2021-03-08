// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "../util/operationOptions";
import { RetryOptions, WebSocketOptions } from "@azure/core-amqp";

/**
 * The set of options to configure the behavior of `getEventHubProperties`.
 * - `abortSignal`  : An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
 * - `parentSpan` : The `Span` or `SpanContext` to use as the `parent` of the span created while calling this operation.
 */
export interface GetEventHubPropertiesOptions extends OperationOptions {}

/**
 * The set of options to configure the behavior of `getPartitionProperties`.
 * - `abortSignal`  : An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
 * - `parentSpan` : The `Span` or `SpanContext` to use as the `parent` of the span created while calling this operation.
 */
export interface GetPartitionPropertiesOptions extends OperationOptions {}

/**
 * The set of options to configure the behavior of `getPartitionIds`.
 * - `abortSignal`  : An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
 * - `parentSpan` : The `Span` or `SpanContext` to use as the `parent` of the span created while calling this operation.
 */
export interface GetPartitionIdsOptions extends OperationOptions {}

/**
 * Options to configure the `sendBatch` method on the `EventHubProducerClient`
 * when sending an array of events.
 * If `partitionId` is set, `partitionKey` must not be set and vice versa.
 *
 * - `partitionId`  : The partition this batch will be sent to.
 * - `partitionKey` : A value that is hashed to produce a partition assignment.
 * - `abortSignal`  : A signal used to cancel the send operation.
 */
export interface SendBatchOptions extends OperationOptions {
  /**
   * The partition this batch will be sent to.
   * If this value is set then partitionKey can not be set.
   */
  partitionId?: string;
  /**
   * A value that is hashed to produce a partition assignment.
   * It guarantees that messages with the same partitionKey end up in the same partition.
   * Specifying this will throw an error if the producer was created using a `paritionId`.
   */
  partitionKey?: string;
}

/**
 * The set of options to configure the `send` operation on the `EventHubProducer`.
 * - `partitionKey` : A value that is hashed to produce a partition assignment.
 * - `abortSignal`  : A signal used to cancel the send operation.
 *
 * Example usage:
 * ```js
 * {
 *     partitionKey: 'foo'
 * }
 * ```
 *
 * @internal
 */
export interface SendOptions extends OperationOptions {
  /**
   * A value that is hashed to produce a partition assignment.
   * It guarantees that messages with the same partitionKey end up in the same partition.
   * Specifying this will throw an error if the producer was created using a `paritionId`.
   */
  partitionKey?: string;
}

/**
 * An enum representing the different reasons for an `EventHubConsumerClient` to stop processing
 * events from a partition in a consumer group of an Event Hub.
 */
export enum CloseReason {
  /**
   * Ownership of the partition was lost or transitioned to a new processor instance.
   */
  OwnershipLost = "OwnershipLost",
  /**
   * The EventProcessor was shutdown.
   */
  Shutdown = "Shutdown"
}

/**
 * Describes the options that can be provided while creating the EventHubClient.
 * - `userAgent`        : A string to append to the built in user agent string that is passed as a connection property
 * to the service.
 * - `webSocketOptions` : Options to configure the channelling of the AMQP connection over Web Sockets.
 *    - `websocket`     : The WebSocket constructor used to create an AMQP connection if you choose to make the connection
 * over a WebSocket.
 *    - `webSocketConstructorOptions` : Options to pass to the Websocket constructor when you choose to make the connection
 * over a WebSocket.
 * - `retryOptions`     : The retry options for all the operations on the client/producer/consumer.
 *    - `maxRetries` : The number of times the operation can be retried in case of a retryable error.
 *    - `maxRetryDelayInMs`: The maximum delay between retries. Applicable only when performing exponential retries.
 *    - `mode`: Which retry mode to apply, specified by the `RetryMode` enum. Options are `Exponential` and `Fixed`. Defaults to `Fixed`.
 *    - `retryDelayInMs`: Amount of time to wait in milliseconds before making the next attempt. When `mode` is set to `Exponential`,
 *       this is used to compute the exponentially increasing delays between retries. Default: 30000 milliseconds.
 *    - `timeoutInMs`: Amount of time in milliseconds to wait before the operation times out. This will trigger a retry if there are any
 *       retry attempts remaining. Minimum value: 60000 milliseconds.
 *
 * A simple usage can be `{ "maxRetries": 4 }`.
 *
 * Example usage:
 * ```js
 * {
 *     retryOptions: {
 *         maxRetries: 4
 *     }
 * }
 * ```
 */
export interface EventHubClientOptions {
  /**
   * A custom endpoint to use when connecting to the Event Hubs service.
   * This can be useful when your network does not allow connecting to the
   * standard Azure Event Hubs endpoint address, but does allow connecting
   * through an intermediary.
   *
   * Example: "https://my.custom.endpoint:100/"
   */
  customEndpointAddress?: string;
  /**
   * Options to configure the retry policy for all the operations on the client.
   * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
   *
   */
  retryOptions?: RetryOptions;
  /**
   * Options to configure the channelling of the AMQP connection over Web Sockets.
   */
  webSocketOptions?: WebSocketOptions;
  /**
   * Value that is appended to the built in user agent string that is passed to the Event Hubs service.
   */
  userAgent?: string;
}

/**
 * Describes the options that can be provided while creating the EventHubConsumerClient.
 * - `loadBalancingOptions`: Options to tune how the EventHubConsumerClient claims partitions.
 * - `userAgent`        : A string to append to the built in user agent string that is passed as a connection property
 * to the service.
 * - `webSocketOptions` : Options to configure the channelling of the AMQP connection over Web Sockets.
 *    - `websocket`     : The WebSocket constructor used to create an AMQP connection if you choose to make the connection
 * over a WebSocket.
 *    - `webSocketConstructorOptions` : Options to pass to the Websocket constructor when you choose to make the connection
 * over a WebSocket.
 * - `retryOptions`     : The retry options for all the operations on the client/producer/consumer.
 *    - `maxRetries` : The number of times the operation can be retried in case of a retryable error.
 *    - `maxRetryDelayInMs`: The maximum delay between retries. Applicable only when performing exponential retries.
 *    - `mode`: Which retry mode to apply, specified by the `RetryMode` enum. Options are `Exponential` and `Fixed`. Defaults to `Fixed`.
 *    - `retryDelayInMs`: Amount of time to wait in milliseconds before making the next attempt. When `mode` is set to `Exponential`,
 *       this is used to compute the exponentially increasing delays between retries. Default: 30000 milliseconds.
 *    - `timeoutInMs`: Amount of time in milliseconds to wait before the operation times out. This will trigger a retry if there are any
 *       retry attempts remaining. Minimum value: 60000 milliseconds.
 *
 * A simple usage can be `{ "maxRetries": 4 }`.
 *
 * Example usage:
 * ```js
 * {
 *     retryOptions: {
 *         maxRetries: 4
 *     }
 * }
 * ```
 */
export interface EventHubConsumerClientOptions extends EventHubClientOptions {
  /**
   * Options to tune how the EventHubConsumerClient claims partitions.
   */
  loadBalancingOptions?: LoadBalancingOptions;
}

/**
 * Describes the options that can be provided while creating the EventHubProducerClient.
 * - `enableIdempotentPartitions`: Indicates whether or not the EventHubProducerClient should enable idempotent publishing to Event Hub partitions.
 * - `userAgent`        : A string to append to the built in user agent string that is passed as a connection property
 * to the service.
 * - `webSocketOptions` : Options to configure the channelling of the AMQP connection over Web Sockets.
 *    - `websocket`     : The WebSocket constructor used to create an AMQP connection if you choose to make the connection
 * over a WebSocket.
 *    - `webSocketConstructorOptions` : Options to pass to the Websocket constructor when you choose to make the connection
 * over a WebSocket.
 * - `retryOptions`     : The retry options for all the operations on the client/producer/consumer.
 *    - `maxRetries` : The number of times the operation can be retried in case of a retryable error.
 *    - `maxRetryDelayInMs`: The maximum delay between retries. Applicable only when performing exponential retries.
 *    - `mode`: Which retry mode to apply, specified by the `RetryMode` enum. Options are `Exponential` and `Fixed`. Defaults to `Fixed`.
 *    - `retryDelayInMs`: Amount of time to wait in milliseconds before making the next attempt. When `mode` is set to `Exponential`,
 *       this is used to compute the exponentially increasing delays between retries. Default: 30000 milliseconds.
 *    - `timeoutInMs`: Amount of time in milliseconds to wait before the operation times out. This will trigger a retry if there are any
 *       retry attempts remaining. Minimum value: 60000 milliseconds.
 *
 * A simple usage can be `{ "maxRetries": 4 }`.
 *
 * Example usage:
 * ```js
 * {
 *     retryOptions: {
 *         maxRetries: 4
 *     }
 * }
 * ```
 */
export interface EventHubProducerClientOptions extends EventHubClientOptions {
  /**
   * Indicates whether or not the EventHubProducerClient should enable idempotent publishing to Event Hub partitions.
   * If enabled, the producer will only be able to publish directly to partitions;
   * it will not be able to publish to the Event Hubs gateway for automatic partition routing
   * nor will it be able to use a partition key.
   * Default: false
   */
  enableIdempotentPartitions?: boolean;
  /**
   * The set of options that can be specified to influence publishing behavior specific to the configured Event Hub partition.
   * These options are not necessary in the majority of scenarios and are intended for use with specialized scenarios,
   * such as when recovering the state used for idempotent publishing.
   */
  partitionOptions?: Record<string, PartitionPublishingOptions>;
}

/**
 * The set of options that can be specified for an `EventHubProducerClient`
 * to influence its behavior when publishing directly to an Event Hub partition.
 *
 * These options are ignored when publishing to the Event Hubs gateway for automatic
 * routing or when using a partition key.
 */
export interface PartitionPublishingOptions {
  /**
   * The owner level indicates that a publishing is intended to be performed exclusively for events in the
   * requested partition in the context of the associated producer group.
   *
   * To do so, publishing will attempt to assert ownership over the partition;
   * in the case where more than one publisher in the producer group attempts to assert ownership for the same partition,
   * the one having a larger `ownerLevel` value will "win".
   */
  ownerLevel?: number;
  /**
   * The identifier of the producer group that this producer is associated with when publishing to the associated partition.
   * Events will be published in the context of this group.
   *
   * If `undefined`, the Event Hubs service will control the value.
   *
   * The producer group is only recognized and relevant when certain features of the producer are enabled.
   * For example, it is used by idempotent publishing.
   */
  producerGroupId?: number;
  /**
   * The starting number that should be used for the automatic sequencing of events for the associated partition, when published by this producer.
   *
   * If `undefined`, the Event Hubs service will control the value.
   *
   * The producer group is only recognized and relevant when certain features of the producer are enabled.
   * For example, it is used by idempotent publishing.
   */
  startingSequenceNumber?: number;
}

/**
 * An options bag to configure load balancing settings.
 */
export interface LoadBalancingOptions {
  /**
   * Whether to apply a greedy or a more balanced approach when
   * claiming partitions.
   *
   * - balanced: The `EventHubConsumerClient` will take a measured approach to
   * requesting partition ownership when balancing work with other clients,
   * slowly claiming partitions until a stabilized distribution is achieved.
   *
   * - greedy: The `EventHubConsumerClient` will attempt to claim ownership
   * of its fair share of partitions aggressively when balancing work with
   * other clients.
   *
   * This option is ignored when either:
   *   - `CheckpointStore` is __not__ provided to the `EventHubConsumerClient`.
   *   - `subscribe()` is called for a single partition.
   * Default: balanced
   */
  strategy?: "balanced" | "greedy";
  /**
   * The length of time between attempts to claim partitions.
   * Default: 10000
   */
  updateIntervalInMs?: number;
  /**
   * The length of time a partition claim is valid.
   * Default: 60000
   */
  partitionOwnershipExpirationIntervalInMs?: number;
}

/**
 * Options to configure the `createBatch` method on the `EventHubProducerClient`.
 * - `partitionKey`  : A value that is hashed to produce a partition assignment.
 * - `maxSizeInBytes`: The upper limit for the size of batch.
 * - `abortSignal`   : A signal the request to cancel the send operation.
 *
 * Example usage:
 * ```js
 * {
 *     partitionKey: 'foo',
 *     maxSizeInBytes: 1024 * 1024 // 1 MB
 * }
 * ```
 */
export interface CreateBatchOptions extends OperationOptions {
  /**
   * A value that is hashed to produce a partition assignment. It guarantees that messages
   * with the same partitionKey end up in the same partition.
   * If this value is set then partitionId can not be set.
   */
  partitionKey?: string;
  /**
   * The partition this batch will be sent to.
   * If this value is set then partitionKey can not be set.
   */
  partitionId?: string;
  /**
   * The upper limit for the size of batch. The `tryAdd` function will return `false` after this limit is reached.
   */
  maxSizeInBytes?: number;
}

/**
 * Describes the information about the state of publishing for a partition.
 */
export interface PartitionPublishingProperties {
  /**
   * Indicates whether or not idempotent publishing is enabled for the producer and, by extension, the associated partition.
   */
  isIdempotentPublishingEnabled: boolean;
  /**
   * The owner level of the producer publishing to the associated partition.
   */
  ownerLevel?: number;
  /**
   * The partition id the properties are associated with.
   */
  partitionId: string;
  /**
   * The identifier of the producer group for which this producer is publishing to the associated partition.
   */
  producerGroupId?: number;
  /**
   * The sequence number assigned to the event that was most recently published to the associated partition successfully.
   */
  lastPublishedSequenceNumber?: number;
}
