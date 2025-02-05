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
export interface ConnectionManager<SendDataT, ReceiveDataT> {
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
   * Sets the callback function to be called when a message is received.
   */
  onMessage: (fn: (data: ReceiveDataT) => void) => void;
  /**
   * Sets the callback function to be called when the connection is opened.
   */
  onOpen: (fn: () => void) => void;
  /**
   * Sets the callback function to be called when the connection is closed.
   */
  onClose: (fn: (info: CloseInfo) => void) => void;
  /**
   * Sets the callback function to be called when an error is received.
   */
  onError: (fn: (error: unknown) => void) => void;
}

/**
 * The status of the connection.
 */
export type Status = "connecting" | "connected" | "disconnecting" | "disconnected";

/**
 * The reliable connection client.
 */
export interface ReliableConnectionClient<SendDataT, ReceiveDataT> {
  /**
   * The status of the connection.
   */
  readonly status: Status;
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
   * Sets the callback function to be called when a message is received.
   */
  onMessage: (fn: (data: ReceiveDataT) => void) => void;
  /**
   * Sets the callback function to be called when the connection is opened.
   */
  onOpen: (fn: () => void) => void;
  /**
   * Sets the callback function to be called when the connection is closed.
   */
  onClose: (fn: (info: CloseInfo) => void) => void;
  /**
   * Sets the callback function to be called when an error is received.
   */
  onError: (fn: (error: unknown) => void) => void;
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
export interface ReliableConnectionOptions {
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
}

/**
 * The type of data that can be sent and received through the websocket connection
 */
export type Data = string | ArrayBuffer | ArrayBufferView;

/**
 * The WebSocket client.
 */
export interface WebSocketClient {
  /**
   * Send a message to the WebSocket server.
   * @param data - The message to send.
   *
   * @returns false if the send buffer is full
   */
  send(data: Data, opts?: SendOptions): Promise<boolean>;

  /** Registers a callback to be called when a message is received */
  on(event: "message", listener: (data: Data) => void): void;

  /** Registers a callback to be called when an open event is received */
  on(event: "reconnect", listener: () => void): void;

  /** Registers a callback to be called when a close event is received */
  on(event: "close", listener: () => void): void;

  /** Registers a callback to be called when an error event is received */
  on(event: "error", listener: (error: Error) => void): void;

  /**
   * Close the WebSocket connection.
   */
  close(opts?: CloseOptions): Promise<void>;

  /**
   * The status of the connection.
   */
  readonly status: Status;
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
}

/**
 * The WebSocket client wrapper. It is a promise that resolves to a WebSocket client.
 * It also has methods to get the WebSocket client as a ws WebSocket client or as a Web API WebSocket client.
 * This is useful when the client needs to access the underlying WebSocket.
 */
export interface WebsocketClientWrapper extends Promise<WebSocketClient> {
  /**
   * Returns the WebSocket client as a ws WebSocket client.
   * @returns The ws WebSocket client.
   */
  asWs: () => Promise<WebSocketClient & { websocket: WS.WebSocket }>;
  /**
   * Returns the WebSocket client as a Web API WebSocket client.
   * @returns The Web API WebSocket client.
   */
  asWebSocket: () => Promise<WebSocketClient & { websocket: WebSocket }>;
}
