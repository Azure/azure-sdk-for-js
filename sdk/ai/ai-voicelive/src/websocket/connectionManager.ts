// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { VoiceLiveWebSocketLike } from "./websocketLike.js";
import {
  VoiceLiveConnectionError,
  VoiceLiveErrorCodes,
  classifyWebSocketClose,
} from "../errors/index.js";
import { logger } from "../logger.js";

/**
 * Connection state enumeration for lifecycle management
 */
export enum ConnectionState {
  Disconnected = "disconnected",
  Connecting = "connecting",
  Connected = "connected",
  Disconnecting = "disconnecting",
  // Removed: Reconnecting - no reconnection in fail-fast model
}

/**
 * Configuration options for connection management
 */
export interface ConnectionOptions {
  /** WebSocket endpoint URL */
  endpoint: string;
  /** WebSocket protocols to use */
  protocols?: string[];
  /** Connection timeout in milliseconds */
  connectionTimeout?: number;
  // Removed all reconnection options - fail fast model
}

/**
 * Event handlers for connection lifecycle events
 */
export interface ConnectionEventHandlers {
  /** Called when connection state changes */
  onStateChange?: (state: ConnectionState, previousState: ConnectionState) => void;
  /** Called when a message is received */
  onMessage?: (data: string | ArrayBuffer) => void;
  /** Called when an error occurs or connection is lost */
  onError?: (error: VoiceLiveConnectionError) => void;
  // Removed: onReconnectAttempt - no reconnection in fail-fast model
}

/**
 * Manages WebSocket connection lifecycle with fail-fast semantics
 */
export class ConnectionManager {
  private _state: ConnectionState = ConnectionState.Disconnected;
  private _previousState: ConnectionState = ConnectionState.Disconnected;
  private _websocket?: VoiceLiveWebSocketLike;
  private _abortController?: AbortController;

  constructor(
    private _websocketFactory: () => VoiceLiveWebSocketLike,
    private _options: ConnectionOptions,
    private _eventHandlers: ConnectionEventHandlers = {},
  ) {
    // No reconnection setup needed - fail fast model
  }

  /**
   * Initiates a WebSocket connection
   */
  async connect(abortSignal?: AbortSignalLike): Promise<void> {
    if (this._state === ConnectionState.Connected) {
      return;
    }

    if (this._state === ConnectionState.Connecting) {
      throw new VoiceLiveConnectionError(
        "Connection attempt already in progress",
        VoiceLiveErrorCodes.InvalidState,
      );
    }

    this._setState(ConnectionState.Connecting);

    // Create new abort controller for this connection attempt
    this._abortController = new AbortController();

    // Chain with provided abort signal
    if (abortSignal) {
      if (abortSignal.aborted) {
        this._abortController.abort();
      } else {
        abortSignal.addEventListener("abort", () => {
          this._abortController?.abort();
        });
      }
    }

    try {
      this._websocket = this._websocketFactory();
      this._setupWebSocketHandlers();

      await this._websocket.connect(
        this._options.endpoint,
        this._options.protocols,
        this._abortController.signal,
      );

      this._setState(ConnectionState.Connected);
    } catch (error) {
      this._setState(ConnectionState.Disconnected);

      if (error instanceof VoiceLiveConnectionError) {
        throw error;
      } else {
        throw new VoiceLiveConnectionError(
          `Failed to connect: ${error instanceof Error ? error.message : "Unknown error"}`,
          VoiceLiveErrorCodes.ConnectionFailed,
          "connection_attempt",
          true,
          error instanceof Error ? error : new Error(String(error)),
        );
      }
    }
  }

  /**
   * Disconnects the WebSocket connection
   */
  async disconnect(_abortSignal?: AbortSignalLike): Promise<void> {
    if (this._state === ConnectionState.Disconnected) {
      return;
    }

    // Abort any ongoing connection attempt
    this._abortController?.abort();

    this._setState(ConnectionState.Disconnecting);

    try {
      if (this._websocket) {
        await this._websocket.disconnect(1000, "Client disconnect");
      }
    } finally {
      this._setState(ConnectionState.Disconnected);
    }
  }

  /**
   * Sends data through the WebSocket connection
   */
  async send(data: string | ArrayBuffer, abortSignal?: AbortSignalLike): Promise<void> {
    if (!this._websocket || this._state !== ConnectionState.Connected) {
      throw new VoiceLiveConnectionError(
        "Cannot send message: WebSocket not connected",
        VoiceLiveErrorCodes.NotConnected,
      );
    }

    return this._websocket.send(data, abortSignal);
  }

  /**
   * Sets up event handlers for the WebSocket instance
   */
  private _setupWebSocketHandlers(): void {
    if (!this._websocket) return;
    logger.info("Setting up WebSocket event handlers");
    this._websocket.onOpen(() => {
      logger.info("WebSocket connection opened");
      // Connection opened - handled in connect() method
    });

    this._websocket.onClose((code, reason) => {
      this._handleConnectionLost(code, reason);
    });

    this._websocket.onError((error) => {
      this._handleConnectionError(error);
    });

    this._websocket.onMessage((data) => {
      this._eventHandlers.onMessage?.(data);
    });
  }

  /**
   * Handles any connection loss - always fatal in fail-fast model
   */
  private _handleConnectionLost(code: number, reason: string): void {
    // Check if this was an expected disconnection before changing state
    if (this._state === ConnectionState.Disconnecting) {
      // This was an expected disconnection, don't treat as error
      this._setState(ConnectionState.Disconnected);
      return;
    }

    this._setState(ConnectionState.Disconnected);

    // In fail-fast model, ANY unexpected connection loss is fatal
    let error: VoiceLiveConnectionError;

    if (code === 1000) {
      // Normal close, but unexpected
      error = new VoiceLiveConnectionError(
        "WebSocket connection closed unexpectedly",
        VoiceLiveErrorCodes.ConnectionLost,
        "connection_lost",
      );
    } else {
      // Use classifier for other codes
      error = classifyWebSocketClose(code, reason);
    }

    // Always notify of fatal error for unexpected disconnections
    this._eventHandlers.onError?.(error);
  }

  /**
   * Handles WebSocket errors
   */
  private _handleConnectionError(error: Error): void {
    const connectionError = new VoiceLiveConnectionError(
      `WebSocket error: ${error.message}`,
      VoiceLiveErrorCodes.WebSocketError,
      "websocket_error",
      true,
      error,
    );

    this._eventHandlers.onError?.(connectionError);
  }

  /**
   * Updates the connection state and notifies handlers
   */
  private _setState(state: ConnectionState): void {
    if (this._state !== state) {
      this._previousState = this._state;
      this._state = state;
      this._eventHandlers.onStateChange?.(state, this._previousState);
    }
  }

  // Public properties and methods

  /**
   * Gets the current connection state
   */
  get state(): ConnectionState {
    return this._state;
  }

  /**
   * Checks if the connection is currently established
   */
  get isConnected(): boolean {
    return this._state === ConnectionState.Connected;
  }

  /**
   * Updates the event handlers
   */
  updateEventHandlers(handlers: Partial<ConnectionEventHandlers>): void {
    Object.assign(this._eventHandlers, handlers);
  }
}
