// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { ProxySettings } from "@azure/core-rest-pipeline";

/**
 * WebSocket ready state enumeration matching standard WebSocket values
 */
export enum WebSocketState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

/**
 * Options for WebSocket creation and connection
 */
export interface WebSocketFactoryOptions {
  /** Connection timeout in milliseconds */
  connectionTimeoutInMs?: number;
  /** Maximum message size in bytes */
  maxMessageSize?: number;
  /** Enable compression if supported */
  compression?: boolean;
  /** Custom headers for connection (Node.js only) */
  headers?: Record<string, string>;
  /** @internal - Proxy configuration (detected from environment variables) */
  proxyOptions?: ProxySettings;
}

/**
 * Platform-agnostic WebSocket interface for Voice Live connections
 */
export interface VoiceLiveWebSocketLike {
  /**
   * Establishes WebSocket connection to the specified URL
   */
  connect(url: string, protocols?: string[], abortSignal?: AbortSignalLike): Promise<void>;

  /**
   * Closes the WebSocket connection
   */
  disconnect(code?: number, reason?: string): Promise<void>;

  /**
   * Sends data through the WebSocket connection
   */
  send(data: string | ArrayBuffer, abortSignal?: AbortSignalLike): Promise<void>;

  /**
   * Registers handler for connection open event
   */
  onOpen(handler: () => void): void;

  /**
   * Registers handler for connection close event
   */
  onClose(handler: (code: number, reason: string) => void): void;

  /**
   * Registers handler for message reception
   */
  onMessage(handler: (data: string | ArrayBuffer) => void): void;

  /**
   * Registers handler for connection errors
   */
  onError(handler: (error: Error) => void): void;

  /**
   * Gets current connection state
   */
  readonly isConnected: boolean;

  /**
   * Gets current connection state enum
   */
  readonly readyState: WebSocketState;

  /**
   * Gets the connected URL if applicable
   */
  readonly url?: string;
}

/**
 * Factory interface for creating WebSocket instances
 */
export interface VoiceLiveWebSocketFactoryLike {
  /**
   * Creates a new WebSocket instance for the target platform
   */
  create(options?: WebSocketFactoryOptions): VoiceLiveWebSocketLike;
}
