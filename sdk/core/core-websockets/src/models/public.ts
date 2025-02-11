// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type * as WS from "ws";
import type { RetryOptions } from "../retry.js";
import type { ClientRequestArgs } from "node:http";

/**
 * The close information.
 */
export interface CloseInfo {
  /**
   * The close code.
   */
  code?: string;
  /**
   * The close reason.
   */
  reason?: string;
}

/**
 * Options to close the connection.
 */
export interface CloseOptions {
  /**
   * The close info.
   */
  info?: CloseInfo;
  /**
   * The abort signal.
   */
  abortSignal?: AbortSignal;
}

/**
 * Options to open the connection.
 */
export interface OpenOptions {
  /**
   * The abort signal.
   */
  abortSignal?: AbortSignal;
}

/**
 * Options to send data.
 */
export interface SendOptions {
  /**
   * The abort signal.
   */
  abortSignal?: AbortSignal;
}

/**
 * Options to check if the connection is open.
 */
export interface IsOpenOptions {
  /**
   * The abort signal.
   */
  abortSignal?: AbortSignal;
}

/**
 * The group of methods needed to implement a client over a reliable connection.
 */
export interface ConnectionManager<SendDataT, ReceiveDataT> extends Listeners<ReceiveDataT> {
  /**
   * Opens the connection. The client must be able to listen to events.
   * after this method is called.
   */
  open(): void;
  /**
   * Closes the connection.
   */
  close(opts?: Omit<CloseOptions, "abortSignal">): void;
  /**
   * Sends data over the connection. Returns the number of bytes in the send buffer.
   */
  send(data: SendDataT, opts?: SendOptions): Promise<number>;
  /**
   * Checks if the connection can reconnect when is disconnected.
   */
  canReconnect(info: CloseInfo): boolean;
  /**
   * Destroys the connection and it can't be opened again.
   */
  destroy(): void;
}

/**
 * The status of the connection.
 */
export type Status = "connecting" | "connected" | "disconnecting" | "disconnected";

/**
 * Listeners for various events.
 */
export interface Listeners<ReceiveDataT> {
  /**
   * Sets the callback function to be called when a message is received.
   */
  on(event: "message", listener: (data: ReceiveDataT) => void): void;
  /**
   * Sets the callback function to be called when the connection is opened.
   */
  on(event: "open", listener: () => void): void;
  /**
   * Sets the callback function to be called when the connection is closed.
   */
  on(event: "close", listener: (info: CloseInfo) => void): void;
  /**
   * Sets the callback function to be called when an error is received.
   */
  on(event: "error", listener: (err: unknown) => void): void;
  /**
   * Removes the callback function to be called when a message is received.
   */
  off(event: "message", listener: (data: ReceiveDataT) => void): void;
  /**
   * Removes the callback function to be called when the connection is opened.
   */
  off(event: "open", listener: () => void): void;
  /**
   * Removes the callback function to be called when the connection is closed.
   */
  off(event: "close", listener: (info: CloseInfo) => void): void;
  /**
   * Removes the callback function to be called when an error is received.
   */
  off(event: "error", listener: (err: unknown) => void): void;
}

/**
 * The reliable connection client.
 */
export interface ReliableConnectionClient<SendDataT, ReceiveDataT> extends Listeners<ReceiveDataT> {
  /**
   * The status of the connection.
   */
  readonly status: Status;
  /**
   * The identifier of the connection.
   */
  readonly identifier: string;
  /**
   * Opens the connection.
   */
  open(opts?: OpenOptions): Promise<void>;
  /**
   * Closes the connection.
   */
  close(opts?: CloseOptions): Promise<void>;
  /**
   * Sends data over the connection. Returns false if the send buffer is full.
   */
  send(data: SendDataT, opts?: SendOptions): Promise<boolean>;
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
}

/**
 * The type of data that can be sent and received through the websocket connection
 */
export type Data = string | ArrayBuffer | ArrayBufferView;

/**
 * The WebSocket client.
 */
export interface WebSocketClient<WebSocketT> extends Listeners<Data> {
  /**
   * The status of the connection.
   */
  readonly status: Status;
  /**
   * The identifier of the connection.
   */
  readonly identifier: string;
  /**
   * The WebSocket instance.
   */
  readonly websocket: WebSocketT;
  /**
   * Send a message to the WebSocket server.
   * @param data - The message to send.
   *
   * @returns false if the send buffer is full
   */
  send(data: Data, opts?: SendOptions): Promise<boolean>;
  /**
   * Close the WebSocket connection.
   */
  close(opts?: CloseOptions): Promise<void>;
}

/**
 * Options for configuring the WebSocket client.
 */
export interface WebSocketClientOptions {
  /**
   * The WebSocket protocol version(s) to use.
   * This can be a single protocol string or an array of protocol strings.
   */
  protocols?: string | string[];

  /**
   * NODEJS ONLY and WS ONLY
   *
   * The options to create the WS client.
   */
  wsOptions?: WS.ClientOptions | ClientRequestArgs;

  /**
   * The high water mark for the send queue.
   */
  highWaterMark?: number;

  /**
   * Whether to allow insecure connections.
   */
  allowInsecureConnection?: boolean;

  /**
   * Options for retrying the connection in case of failure.
   */
  retryOptions?: RetryOptions;

  /**
   * The abort signal to abort opening the connection.
   */
  abortSignal?: AbortSignal;

  /**
   * A unique identifier for the WebSocket client.
   */
  identifier?: string;

  /**
   * Listeners for various events.
   */
  on?: Partial<WebSocketEventListeners<Data>>;
}

/**
 * The WebSocket client wrapper. It is a promise that resolves to a WebSocket client.
 * It also has methods to get the WebSocket client as a ws WebSocket client or as a Web API WebSocket client.
 * This is useful when the client needs to access the underlying WebSocket.
 */
export interface WebsocketClientWrapper<WebSocketT> extends Promise<WebSocketClient<WebSocketT>> {
  /**
   * Returns the WebSocket client as a ws WebSocket client.
   * @returns The ws WebSocket client.
   */
  asWs: () => Promise<WebSocketClient<WS.WebSocket>>;
  /**
   * Returns the WebSocket client as a Web API WebSocket client.
   * @returns The Web API WebSocket client.
   */
  asWebSocket: () => Promise<WebSocketClient<WebSocket>>;
}

// A typed mapping from event name to the listener function signature
export interface WebSocketEventListeners<ReceiveDataT = unknown> {
  message: (data: ReceiveDataT) => void;
  open: () => void;
  close: (info: CloseInfo) => void;
  error: (err: unknown) => void;
}
