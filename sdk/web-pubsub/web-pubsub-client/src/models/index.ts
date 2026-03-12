// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { WebPubSubClientProtocol } from "../protocols/index.js";
import type { JSONTypes } from "../webPubSubClient.js";
import type {
  DisconnectedMessage,
  GroupDataMessage,
  ServerDataMessage,
  StreamDataError,
  StreamInfo,
  StreamEndUserError,
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
   * Whether the message needs to echo to sender
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
 * stream operation options.
 */
export interface StreamOptions {
  /**
   * Optional stream identifier. If not specified, client will generate one.
   */
  streamId?: string;
  /**
   * Optional stream idle timeout in milliseconds.
   */
  idleTimeoutMs?: number;
  /**
   * Optional abort signal for stream start handshake.
   * If aborted before `streamAck(expectedSequenceId=1)` arrives, `stream()` rejects.
   */
  abortSignal?: AbortSignalLike;
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
 * Send stream keepalive options.
 */
export interface SendStreamKeepaliveOptions {
  /**
   * Optional abort signal.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * End stream options.
 */
export interface EndStreamOptions {
  /**
   * Optional stream end error.
   */
  error?: StreamEndUserError;
  /**
   * Optional abort signal.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Stream publisher abstraction for sending one logical stream.
 */
export interface StreamPublisher {
  /**
   * Stream identifier.
   */
  readonly streamId: string;
  /**
   * Publish a stream fragment.
   */
  publish(
    content: JSONTypes | ArrayBuffer,
    dataType?: WebPubSubDataType,
    options?: SendStreamDataOptions,
  ): Promise<void>;
  /**
   * Send stream keepalive.
   */
  keepalive(options?: SendStreamKeepaliveOptions): Promise<void>;
  /**
   * Complete the stream.
   */
  complete(options?: EndStreamOptions): Promise<void>;
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
export interface OnStreamDataArgs {
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
export interface OnStreamEndArgs {
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
 * Callback contract for consuming one logical stream.
 */
export interface StreamHandler {
  /**
   * Called for every stream fragment.
   */
  onMessage?: (args: OnStreamDataArgs) => void;
  /**
   * Called when the stream completes without error.
   */
  onComplete?: (args: OnStreamEndArgs) => void;
  /**
   * Called when the stream ends with error.
   */
  onError?: (args: OnStreamEndArgs) => void;
}

/**
 * onStream operation options.
 */
export interface OnStreamOptions {
  /**
   * Maximum stream lifetime in milliseconds in the client-side handler registry.
   * Default: 300000 (5 minutes).
   */
  ttlInMs?: number;
  /**
   * Whether to attach to an in-progress stream if the first observed fragment does not start at 1.
   * Default: true.
   */
  handleFromStart?: boolean;
}

/**
 * Stream subscription handle returned by `onStream`.
 */
export interface StreamSubscription {
  /**
   * Unregister this stream subscription.
   */
  close(): void;
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
