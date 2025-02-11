// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type * as WS from "ws";
import type { RetryOptions } from "../retry.js";
import type { ClientRequestArgs } from "node:http";

/**
 * The close information.
 */
export interface WebSocketCloseDetails {
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
export interface WebSocketCloseOptions {
  /**
   * The close info.
   */
  info?: WebSocketCloseDetails;
  /**
   * The abort signal.
   */
  abortSignal?: AbortSignal;
}

/**
 * Options to open the connection.
 */
export interface WebSocketOpenOptions {
  /**
   * The abort signal.
   */
  abortSignal?: AbortSignal;
}

/**
 * Options to send data.
 */
export interface WebSocketSendOptions {
  /**
   * The abort signal.
   */
  abortSignal?: AbortSignal;
}

/**
 * The status of the WebSocket Client.
 */
export type WebSocketClientStatus = "connecting" | "connected" | "disconnecting" | "disconnected";

/**
 * Represents functions that registers and unregisters listeners for events.
 */
export interface WebSocketEventRegistrar<ReceiveDataT> {
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
  on(event: "close", listener: (info: WebSocketCloseDetails) => void): void;
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
  off(event: "close", listener: (info: WebSocketCloseDetails) => void): void;
  /**
   * Removes the callback function to be called when an error is received.
   */
  off(event: "error", listener: (err: unknown) => void): void;
}

/**
 * The type of data that can be sent and received through the websocket connection
 */
export type WebSocketData = string | ArrayBuffer | ArrayBufferView;

/**
 * The WebSocket client.
 */
export interface WebSocketClient<WebSocketT> extends WebSocketEventRegistrar<WebSocketData> {
  /**
   * The status of the connection.
   */
  readonly status: WebSocketClientStatus;
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
  send(data: WebSocketData, opts?: WebSocketSendOptions): Promise<boolean>;
  /**
   * Close the WebSocket connection.
   */
  close(opts?: WebSocketCloseOptions): Promise<void>;
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
   * Use this option to install listeners for various events.
   */
  on?: Partial<WebSocketEventListeners<WebSocketData>>;
}

/**
 * The WebSocket client wrapper. It is a promise that resolves to a WebSocket client.
 * It also has methods to get the WebSocket client as a ws WebSocket client or as a Web API WebSocket client.
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

/**
 * The event listeners for the WebSocket client.
 */
export interface WebSocketEventListeners<ReceiveDataT = WebSocketData> {
  /** The listener for messages */
  message: (data: ReceiveDataT) => void;
  /** The listener for open events */
  open: () => void;
  /** The listener for close events */
  close: (info: WebSocketCloseDetails) => void;
  /** The listener for error events */
  error: (err: unknown) => void;
}
