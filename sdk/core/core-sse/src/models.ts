// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { IncomingMessage } from "node:http";

/**
 * Represents a message sent in an event stream
 * https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format
 */
export interface EventMessage {
  /** The event ID to set the EventSource object's last event ID value. */
  id: string;
  /** A string identifying the type of event described. */
  event: string;
  /** The event data */
  data: string;
  /** The reconnection interval (in milliseconds) to wait before retrying the connection */
  retry?: number;
}

/**
 * A stream of event messages
 */
export type EventMessageStream = ReadableStream<EventMessage> &
  AsyncDisposable &
  AsyncIterable<EventMessage>;

/**
 * A stream containing the bytes of an SSE response body.
 */
export type SseStream = ReadableStream<Uint8Array> | NodeJSReadableStream | IncomingMessage;

/**
 * Context supplied when establishing an SSE connection.
 */
export interface SseConnectOptions {
  /**
   * A signal that aborts this connection attempt.
   */
  abortSignal: AbortSignalLike;

  /**
   * The last event ID to send with the request.
   *
   * This is omitted from the initial request unless explicitly configured and
   * omitted from reconnect requests when the last event ID is empty.
   */
  lastEventId?: string;
}

/**
 * The minimum response shape needed by a reconnecting SSE stream.
 */
export interface SseConnectResponse {
  /**
   * The response body, when the response is accepted as an SSE connection.
   */
  body?: SseStream;
}

/**
 * Establishes an SSE connection.
 */
export type SseConnect<TResponse extends SseConnectResponse> = (
  options: SseConnectOptions,
) => Promise<TResponse>;

/**
 * The result of validating an SSE connection response.
 */
export type SseResponseValidationResult = "accept" | "stop";

/**
 * Validates an SSE connection response.
 *
 * Return `"accept"` to consume the response body, `"stop"` to end the stream
 * without reconnecting, or throw to fail the stream.
 */
export type SseResponseValidator<TResponse extends SseConnectResponse> = (
  response: TResponse,
) => SseResponseValidationResult | Promise<SseResponseValidationResult>;

/**
 * Options for creating a reconnecting SSE stream.
 */
export interface ReconnectingSseStreamOptions<TResponse extends SseConnectResponse> {
  /**
   * Validates every response before its body is consumed.
   */
  validateResponse: SseResponseValidator<TResponse>;

  /**
   * A signal used to abort connection attempts, active response bodies, and
   * pending reconnection delays.
   */
  abortSignal?: AbortSignalLike;

  /**
   * The event ID to send with the initial request.
   */
  lastEventId?: string;

  /**
   * The initial delay, in milliseconds, before reconnecting. Defaults to 3000.
   *
   * A valid `retry:` field received from the service replaces this value for
   * subsequent reconnections.
   */
  retryDelayInMs?: number;

  /**
   * The maximum total number of reconnection requests. By default,
   * reconnection is unlimited.
   */
  maxRetries?: number;
}

export type PartialSome<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * A Node.js Readable stream that also has a `destroy` method.
 */
export interface NodeJSReadableStream extends NodeJS.ReadableStream {
  /**
   * Destroy the stream. Optionally emit an 'error' event, and emit a
   * 'close' event (unless emitClose is set to false). After this call,
   * internal resources will be released.
   */
  destroy(error?: Error): void;
}

/**
 * An error thrown when an SSE stream reaches its configured reconnection limit.
 */
export class SseRetryError extends Error {
  /**
   * The last transport error, when reconnection followed a transport failure.
   */
  readonly cause?: unknown;

  /**
   * Creates an error indicating that an SSE stream exhausted its reconnection attempts.
   * @param cause - The last transport error, if one occurred.
   */
  constructor(cause?: unknown) {
    super("The SSE stream exhausted its reconnection attempts.");
    this.name = "SseRetryError";
    this.cause = cause;
  }
}
