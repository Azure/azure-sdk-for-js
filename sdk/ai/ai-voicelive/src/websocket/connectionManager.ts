// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VoiceLiveWebSocketLike } from './websocketLike.js';
import { VoiceLiveConnectionError, VoiceLiveErrorCodes, VoiceLiveErrorClassifier } from '../errors/index.js';

/**
 * Connection state enumeration for lifecycle management
 */
export enum ConnectionState {
  Disconnected = 'disconnected',
  Connecting = 'connecting',
  Connected = 'connected',
  Reconnecting = 'reconnecting',
  Disconnecting = 'disconnecting'
}

/**
 * Configuration options for connection management
 */
export interface ConnectionOptions {
  /** WebSocket endpoint URL */
  endpoint: string;
  /** WebSocket protocols to use */
  protocols?: string[];
  /** Maximum number of reconnection attempts */
  reconnectAttempts?: number;
  /** Initial delay before reconnection attempt in milliseconds */
  reconnectDelay?: number;
  /** Connection timeout in milliseconds */
  connectionTimeout?: number;
  /** Maximum delay between reconnection attempts in milliseconds */
  maxReconnectDelay?: number;
  /** Multiplier for exponential backoff */
  backoffMultiplier?: number;
}

/**
 * Event handlers for connection lifecycle events
 */
export interface ConnectionEventHandlers {
  /** Called when connection state changes */
  onStateChange?: (state: ConnectionState, previousState: ConnectionState) => void;
  /** Called when a message is received */
  onMessage?: (data: string | ArrayBuffer) => void;
  /** Called when an error occurs */
  onError?: (error: VoiceLiveConnectionError) => void;
  /** Called when a reconnection attempt is made */
  onReconnectAttempt?: (attempt: number, maxAttempts: number) => void;
}

/**
 * Manages WebSocket connection lifecycle including reconnection logic
 */
export class ConnectionManager {
  private _state: ConnectionState = ConnectionState.Disconnected;
  private _previousState: ConnectionState = ConnectionState.Disconnected;
  private _websocket?: VoiceLiveWebSocketLike;
  private _reconnectAttempts = 0;
  private _reconnectTimeoutId?: NodeJS.Timeout;
  private _abortController?: AbortController;
  
  private readonly _maxReconnectAttempts: number;
  private readonly _reconnectDelay: number;
  private readonly _maxReconnectDelay: number;
  private readonly _backoffMultiplier: number;
  
  constructor(
    private _websocketFactory: () => VoiceLiveWebSocketLike,
    private _options: ConnectionOptions,
    private _eventHandlers: ConnectionEventHandlers = {}
  ) {
    this._maxReconnectAttempts = _options.reconnectAttempts ?? 5;
    this._reconnectDelay = _options.reconnectDelay ?? 1000;
    this._maxReconnectDelay = _options.maxReconnectDelay ?? 30000;
    this._backoffMultiplier = _options.backoffMultiplier ?? 2.0;
  }
  
  /**
   * Initiates a WebSocket connection
   */
  async connect(abortSignal?: AbortSignal): Promise<void> {
    if (this._state === ConnectionState.Connected) {
      return;
    }
    
    if (this._state === ConnectionState.Connecting) {
      throw new VoiceLiveConnectionError(
        "Connection attempt already in progress",
        VoiceLiveErrorCodes.INVALID_STATE
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
        abortSignal.addEventListener('abort', () => {
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
        this._abortController.signal
      );
      
      this._setState(ConnectionState.Connected);
      this._reconnectAttempts = 0;
      
    } catch (error) {
      this._setState(ConnectionState.Disconnected);
      
      if (error instanceof VoiceLiveConnectionError) {
        throw error;
      } else {
        throw new VoiceLiveConnectionError(
          `Failed to connect: ${error instanceof Error ? error.message : 'Unknown error'}`,
          VoiceLiveErrorCodes.CONNECTION_FAILED,
          "connection_attempt",
          true,
          error instanceof Error ? error : new Error(String(error))
        );
      }
    }
  }
  
  /**
   * Disconnects the WebSocket connection
   */
  async disconnect(_abortSignal?: AbortSignal): Promise<void> {
    if (this._state === ConnectionState.Disconnected) {
      return;
    }
    
    // Cancel any pending reconnection
    this._cancelReconnection();
    
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
  async send(data: string | ArrayBuffer, abortSignal?: AbortSignal): Promise<void> {
    if (!this._websocket || this._state !== ConnectionState.Connected) {
      throw new VoiceLiveConnectionError(
        "Cannot send message: WebSocket not connected",
        VoiceLiveErrorCodes.NOT_CONNECTED
      );
    }
    
    return this._websocket.send(data, abortSignal);
  }
  
  /**
   * Sets up event handlers for the WebSocket instance
   */
  private _setupWebSocketHandlers(): void {
    if (!this._websocket) return;
    console.info("Setting up WebSocket event handlers");
    this._websocket.onOpen(() => {
      console.info('WebSocket connection opened');
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
   * Handles unexpected connection loss
   */
  private _handleConnectionLost(code: number, reason: string): void {
    if (this._state === ConnectionState.Disconnecting) {
      return; // Expected disconnection
    }
    
    const wasConnected = this._state === ConnectionState.Connected;
    this._setState(ConnectionState.Disconnected);
    
    // Classify the close event to determine if we should reconnect
    const error = VoiceLiveErrorClassifier.classifyWebSocketClose(code, reason);
    this._eventHandlers.onError?.(error);
    
    // Attempt reconnection if appropriate and we were previously connected
    if (wasConnected && this._shouldReconnect(code)) {
      this._scheduleReconnection();
    }
  }
  
  /**
   * Handles WebSocket errors
   */
  private _handleConnectionError(error: Error): void {
    const connectionError = new VoiceLiveConnectionError(
      `WebSocket error: ${error.message}`,
      VoiceLiveErrorCodes.WEBSOCKET_ERROR,
      "websocket_error",
      true,
      error
    );
    
    this._eventHandlers.onError?.(connectionError);
  }
  
  /**
   * Determines if reconnection should be attempted based on close code
   */
  private _shouldReconnect(code: number): boolean {
    // Don't reconnect on authentication failure (1008) or normal closure (1000)
    const nonRecoverableCodes = [1000, 1008, 1003]; // Normal, Policy violation, Unsupported data
    
    return !nonRecoverableCodes.includes(code) && 
           this._reconnectAttempts < this._maxReconnectAttempts;
  }
  
  /**
   * Schedules a reconnection attempt with exponential backoff
   */
  private _scheduleReconnection(): void {
    if (this._reconnectTimeoutId) {
      return; // Already scheduled
    }
    
    this._reconnectAttempts++;
    this._setState(ConnectionState.Reconnecting);
    
    // Calculate delay with exponential backoff
    const baseDelay = this._reconnectDelay * Math.pow(this._backoffMultiplier, this._reconnectAttempts - 1);
    const delay = Math.min(baseDelay, this._maxReconnectDelay);
    
    this._eventHandlers.onReconnectAttempt?.(this._reconnectAttempts, this._maxReconnectAttempts);
    
    this._reconnectTimeoutId = setTimeout(async () => {
      this._reconnectTimeoutId = undefined;
      
      try {
        await this.connect();
      } catch (error) {
        if (this._reconnectAttempts >= this._maxReconnectAttempts) {
          this._setState(ConnectionState.Disconnected);
          
          const finalError = new VoiceLiveConnectionError(
            `Failed to reconnect after ${this._maxReconnectAttempts} attempts`,
            VoiceLiveErrorCodes.CONNECTION_FAILED,
            "reconnection_failed",
            false,
            error instanceof Error ? error : new Error(String(error))
          );
          
          this._eventHandlers.onError?.(finalError);
        } else {
          // Schedule next reconnection attempt
          this._scheduleReconnection();
        }
      }
    }, delay);
  }
  
  /**
   * Cancels any pending reconnection attempt
   */
  private _cancelReconnection(): void {
    if (this._reconnectTimeoutId) {
      clearTimeout(this._reconnectTimeoutId);
      this._reconnectTimeoutId = undefined;
    }
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
   * Gets the current number of reconnection attempts
   */
  get reconnectAttempts(): number {
    return this._reconnectAttempts;
  }
  
  /**
   * Gets the maximum number of reconnection attempts
   */
  get maxReconnectAttempts(): number {
    return this._maxReconnectAttempts;
  }
  
  /**
   * Updates the event handlers
   */
  updateEventHandlers(handlers: Partial<ConnectionEventHandlers>): void {
    Object.assign(this._eventHandlers, handlers);
  }
}
