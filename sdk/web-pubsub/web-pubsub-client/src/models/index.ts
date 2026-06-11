// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { WebPubSubClientProtocol } from "../protocols/index.js";
import type {
  DisconnectedMessage,
  GroupDataMessage,
  JSONTypes,
  ServerDataMessage,
  StreamDataError,
  StreamInfo,
  StreamEndError,
  WebPubSubDataType,
} from "./messages.js";

/**
 * The client options
 */
export interface WebPubSubClientOptions {
  /**
   * The subprotocol
   */
  protocol?: WebPubSubClientProtocol;
  /**
   * Whether to auto reconnect after connection is dropped and not recoverable
   */
  autoReconnect?: boolean;
  /**
   * Whether to enable restoring group after reconnecting
   */
  autoRejoinGroups?: boolean;
  /**
   * The retry options for operations like joining group and sending messages
   */
  messageRetryOptions?: WebPubSubRetryOptions;
  /**
   * The retry options for reconnection. Only available when autoReconnect is true.
   */
  reconnectRetryOptions?: WebPubSubRetryOptions;
  /**
   * The idle timeout in milliseconds used to detect half-open connections when no data or pong has
   * been received. Default is 120000ms (120 seconds). Set to 0 to disable this timeout check. Must
   * be greater than or equal to 0. We recommend keeping this value comfortably larger than
   * `keepAliveIntervalInMs` (for example 3x) so that probes have time to run before the timeout
   * closes the socket.
   */
  keepAliveTimeoutInMs?: number;
  /**
   * The interval in milliseconds at which to send keep-alive ping messages to the runtime. Default
   * is 20000ms (20 seconds). Set to 0 to disable client-initiated keep-alive pings. Must be greater
   * than or equal to 0. We recommend choosing a value that is lower than `keepAliveTimeoutInMs`
   * (again, about 3x lower) so the timeout only triggers when multiple pings fail.
   */
  keepAliveIntervalInMs?: number;
}

/**
 * The retry options
 */
export interface WebPubSubRetryOptions {
  /**
   * Number of times the operation needs to be retried in case
   * of retryable error. Default: 3.
   */
  maxRetries?: number;
  /**
   * Amount of time to wait in milliseconds before making the
   * next attempt. Default: `1000 milliseconds`.
   * When `mode` option is set to `Exponential`,
   * this is used to compute the exponentially increasing delays between retries.
   */
  retryDelayInMs?: number;
  /**
   * Denotes the maximum delay between retries
   * that the retry attempts will be capped at. Applicable only when performing exponential retry.
   */
  maxRetryDelayInMs?: number;
  /**
   * Denotes which retry mode to apply. If undefined, defaults to `Fixed`
   */
  mode?: RetryMode;
}

/**
 * Describes the Retry Mode type
 */
export type RetryMode = "Exponential" | "Fixed";

/**
 * The start options
 */
export interface StartOptions {
  /**
   * The abort signal
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Join group operation options
 */
export interface JoinGroupOptions {
  /**
   * The optional ackId. If not specified, client will generate one.
   */
  ackId?: number;
  /**
   * The abort signal
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Leave group operation options
 */
export interface LeaveGroupOptions {
  /**
   * The optional ackId. If not specified, client will generate one.
   */
  ackId?: number;
  /**
   * The abort signal
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Send to group operation options
 */
export interface SendToGroupOptions {
  /**
   * Whether the message should not be echoed back to the sender.
   */
  noEcho?: boolean;
  /**
   * If true, the message won't contains ackId. No AckMessage will be returned from the service.
   */
  fireAndForget?: boolean;
  /**
   * The optional ackId. If not specified, client will generate one.
   */
  ackId?: number;
  /**
   * The abort signal
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Send event operation options
 */
export interface SendEventOptions {
  /**
   * If true, the message won't contains ackId. No AckMessage will be returned from the service.
   */
  fireAndForget?: boolean;
  /**
   * The optional ackId. If not specified, client will generate one.
   */
  ackId?: number;
  /**
   * The abort signal
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Invoke event operation options
 */
export interface InvokeEventOptions {
  /**
   * Optional invocation identifier. If not specified, the client generates one.
   */
  invocationId?: string;
  /**
   * Optional abort signal to cancel the invocation.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * streamToGroup operation options.
 */
export interface StreamToGroupOptions {
  /**
   * Optional stream identifier. If not specified, client will generate one.
   */
  streamId?: string;
  /**
   * Whether the stream start message should not be echoed back to the sender.
   * Default: false.
   */
  noEcho?: boolean;
  /**
   * Optional stream idle timeout in milliseconds.
   */
  idleTimeoutInMs?: number;
}

/**
 * Send stream data options.
 */
export interface SendStreamDataOptions {
  /**
   * Optional abort signal.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Send stream keepAlive options.
 */
export interface SendStreamKeepAliveOptions {
  /**
   * Optional abort signal.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Complete stream options.
 */
export interface CompleteStreamOptions {
  /**
   * Optional stream end error.
   */
  error?: StreamEndError;
  /**
   * Optional abort signal.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Group stream publisher abstraction for sending one logical stream to a group.
 */
export interface GroupStreamPublisher {
  /**
   * Stream identifier.
   */
  readonly streamId: string;
  /**
   * Publish a stream fragment.
   */
  publish(
    content: JSONTypes | ArrayBuffer,
    dataType: WebPubSubDataType,
    options?: SendStreamDataOptions,
  ): Promise<void>;
  /**
   * Send stream keepAlive.
   */
  keepAlive(options?: SendStreamKeepAliveOptions): Promise<void>;
  /**
   * Complete the stream.
   */
  complete(options?: CompleteStreamOptions): Promise<void>;
  /**
   * Register outbound stream error callback.
   * Returns a function to unregister this callback.
   */
  onError(listener: (error: StreamDataError) => void): () => void;
}

/**
 * Parameter of OnConnected callback
 */
export interface OnConnectedArgs {
  /**
   * The connection id
   */
  connectionId: string;
  /**
   * The user id of the client connection
   */
  userId: string;
}

/**
 * Parameter of OnDisconnected callback
 */
export interface OnDisconnectedArgs {
  /**
   * The connection id
   */
  connectionId?: string;
  /**
   * The disconnected message
   */
  message?: DisconnectedMessage;
}

/**
 * Parameter of OnStopped callback
 */
export interface OnStoppedArgs {}

/**
 * Parameter of OnDataMessage callback
 */
export interface OnServerDataMessageArgs {
  /**
   * The data message
   */
  message: ServerDataMessage;
}

/**
 * Parameter of OnGroupDataMessage callback
 */
export interface OnGroupDataMessageArgs {
  /**
   * The group data message
   */
  message: GroupDataMessage;
}

/**
 * Parameter of RejoinGroupFailed callback
 */
export interface OnRejoinGroupFailedArgs {
  /**
   * The group name
   */
  group: string;
  /**
   * The failure error
   */
  error: Error;
}

/**
 * Stream message delivered to a stream handler.
 */
export interface OnGroupStreamDataArgs {
  /**
   * Group name.
   */
  group: string;
  /**
   * Sender user id.
   */
  fromUserId: string;
  /**
   * Connection-scoped reliable sequence id.
   */
  sequenceId?: number;
  /**
   * Message data type.
   */
  dataType: WebPubSubDataType;
  /**
   * Message payload.
   */
  data: JSONTypes | ArrayBuffer;
  /**
   * Stream metadata.
   */
  stream: StreamInfo;
}

/**
 * Stream terminal event.
 */
export interface OnGroupStreamEndArgs {
  /**
   * Stream identifier.
   */
  streamId: string;
  /**
   * Group name.
   */
  group: string;
  /**
   * Optional terminal error.
   */
  error?: StreamDataError;
}

/**
 * Per-stream value object passed to a factory registered via
 * `client.onGroupStream(...)`. * `GroupStream` instance is created per observed stream lifecycle. The factory returns a `GroupStreamHandler`
 * whose callbacks consume that single stream.
 */
export interface OnGroupStreamArgs {
  /**
   * The group this stream belongs to.
   */
  readonly group: string;
  /**
   * The stream identifier assigned by the publisher.
   */
  readonly streamId: string;
}

/**
 * Callbacks attached to a single inbound group stream. Returned by the factory
 * registered via `client.onGroupStream(factory)`. All callbacks are optional.
 */
export interface GroupStreamHandler {
  /**
   * Called for each non-terminal data fragment.
   */
  onMessage?: (args: OnGroupStreamDataArgs) => void;
  /**
   * Called once when the stream completes successfully.
   */
  onComplete?: (args: OnGroupStreamEndArgs) => void;
  /**
   * Called once when the stream terminates with an error (including `IdleTimeout`).
   */
  onError?: (args: OnGroupStreamEndArgs) => void;
}

/**
 * Options controlling how inbound group streams are tracked and dispatched for a
 * single factory registered via `client.onGroupStream(factory, options)`.
 *
 * Granularity is two-level:
 * - The option *values* are scoped to the registration (i.e. per handler): each
 *   `onGroupStream` call carries its own values, and different handlers may use
 *   different values.
 * - The option *effects* are applied independently to each stream, identified by
 *   its `(group, streamId)` pair. Concurrent streams — even two streams in the
 *   same group observed by the same handler — each get their own idle timer and
 *   their own `handleFromStart` gate. Nothing is shared or aggregated across
 *   streams or across groups.
 */
export interface OnGroupStreamOptions {
  /**
   * Inactivity timeout in milliseconds, applied independently to each stream
   * (identified by its `(group, streamId)` pair). Every stream has its own timer
   * that is reset whenever a fragment for that stream arrives. If no fragment
   * arrives within this duration, only that stream is terminated with an
   * `IdleTimeout` error; sibling streams of the same handler are unaffected.
   * Default: 300000 (5 minutes).
   */
  idleTimeoutInMs?: number;
  /**
   * Whether to require the first observed fragment of a stream to start at
   * `streamSequenceId === 1`, evaluated independently per stream (identified by
   * its `(group, streamId)` pair). If true and the first observed fragment for a
   * stream is mid-stream, that stream is ignored until its terminal frame
   * arrives, without affecting any other concurrent stream.
   * Default: false.
   */
  handleFromStart?: boolean;
}

/**
 * The ack result
 */
export interface WebPubSubResult {
  /**
   * The ack message from the service. If the message is fire-and-forget, this will be undefined.
   */
  ackId?: number;
  /**
   * Whether the message is duplicated.
   */
  isDuplicated: boolean;
}

/**
 * Result of invokeEvent
 */
export interface InvokeEventResult {
  /**
   * Invocation identifier correlated with the response.
   */
  invocationId: string;
  /**
   * The response payload data type.
   */
  dataType?: WebPubSubDataType;
  /**
   * The response payload.
   */
  data?: JSONTypes | ArrayBuffer;
}

/**
 * The start options
 */
export interface GetClientAccessUrlOptions {
  /**
   * The abort signal
   */
  abortSignal?: AbortSignalLike;
}

export type * from "./messages.js";
