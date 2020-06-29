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
 * @ignore
 */
export interface SendOptions extends OperationOptions {
  /**
   * @property
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
   * @property
   * Options to configure the retry policy for all the operations on the client.
   * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
   */
  retryOptions?: RetryOptions;
  /**
   * @property
   * Options to configure the channelling of the AMQP connection over Web Sockets.
   */
  webSocketOptions?: WebSocketOptions;
  /**
   * @property
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
 * - `retryOptions`     : The retry options for all the operations on the EventHubConsumerClient.
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
   * @property
   * The upper limit for the size of batch. The `tryAdd` function will return `false` after this limit is reached.
   */
  maxSizeInBytes?: number;
}
