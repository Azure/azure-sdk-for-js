// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  WebSocketClientStatus,
  WebSocketCloseDetails,
  WebSocketCloseOptions,
  WebSocketEventListeners,
  WebSocketEventRegistrar,
  WebSocketOpenOptions,
  WebSocketSendOptions,
} from "./public.js";
import type { RetryOptions } from "../retry.js";

/**
 * The group of methods needed to implement a client over a reliable connection.
 */
export interface ConnectionManager<SendDataT, ReceiveDataT>
  extends WebSocketEventRegistrar<ReceiveDataT> {
  /**
   * Opens the connection. The client must be able to listen to events.
   * after this method is called.
   */
  open(): void;
  /**
   * Closes the connection.
   */
  close(opts?: Omit<WebSocketCloseOptions, "abortSignal">): void;
  /**
   * Sends data over the connection. Returns the number of bytes in the send buffer.
   */
  send(data: SendDataT, opts?: WebSocketSendOptions): Promise<number>;
  /**
   * Destroys the connection and it can't be opened again.
   */
  destroy(): void;
}

/**
 * The reliable connection client.
 */
export interface ReliableConnectionClient<SendDataT, ReceiveDataT>
  extends WebSocketEventRegistrar<ReceiveDataT> {
  /**
   * The status of the connection.
   */
  readonly status: WebSocketClientStatus;
  /**
   * The identifier of the connection.
   */
  readonly identifier: string;
  /**
   * Opens the connection.
   */
  open(opts?: WebSocketOpenOptions): Promise<void>;
  /**
   * Closes the connection.
   */
  close(opts?: WebSocketCloseOptions): Promise<void>;
  /**
   * Sends data over the connection. Returns false if the send buffer is full.
   */
  send(data: SendDataT, opts?: WebSocketSendOptions): Promise<boolean>;
  /**
   * Destroys the connection and it can't be opened again.
   */
  destroy(): void;
}

/**
 * Options to create a reliable connection client factory.
 */
export interface CreateReliableConnectionOptions {
  /**
   * A function to check if an error is retryable.
   */
  isRetryable?: (err: unknown) => boolean;
  /**
   * Whether to swallow errors or not.
   */
  resolveOnUnsuccessful?: boolean;
}

/**
 * Options to create a reliable connection client.
 */
export interface ReliableConnectionOptions<ReceiveDataT> {
  /**
   * The options to retry an operation.
   */
  retryOptions?: RetryOptions;
  /**
   * The identifier of the connection.
   */
  identifier?: string;
  /**
   * The high water mark for the send queue.
   */
  highWaterMark?: number;
  /**
   * Listeners for various events.
   */
  on?: Partial<WebSocketEventListeners<ReceiveDataT>>;
  /**
   * Whether to auto reconnect when the connection is closed.
   */
  reconnectOnClosure?: (info: WebSocketCloseDetails) => boolean;
}

/**
 * The options to create a WebSocket implementation.
 */
export interface WebSocketImplOptions {
  /**
   * The WebSocket protocol version(s) to use.
   * This can be a single protocol string or an array of protocol strings.
   */
  protocols?: string | string[];
}

export interface WithSocket<SocketT, SendT, ReceiveT> {
  connectionManager: ConnectionManager<SendT, ReceiveT>;
  socket: SocketT;
}
