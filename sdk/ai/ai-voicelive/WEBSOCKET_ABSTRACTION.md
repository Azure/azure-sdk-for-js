# WebSocket Abstraction Layer Design - Voice Live SDK

## Overview
This document outlines the WebSocket abstraction layer design for the Voice Live SDK, providing platform-agnostic WebSocket functionality while following Azure SDK patterns.

## Design Goals

1. **Platform Agnostic** - Support Node.js, Browser, and React Native environments
2. **Type Safe** - Comprehensive TypeScript support with proper event typing
3. **Error Resilient** - Robust error handling and connection management
4. **Azure SDK Compatible** - Follow Azure SDK patterns and conventions
5. **Testable** - Easy to mock and unit test
6. **Extensible** - Support future protocol enhancements

## Core Abstractions

### WebSocket Interface

```typescript
import type { AbortSignalLike } from "@azure/abort-controller";

/**
 * Platform-agnostic WebSocket interface for Voice Live connections
 */
export interface VoiceLiveWebSocketLike {
  /**
   * Establishes WebSocket connection to the specified URL
   * @param url - WebSocket URL to connect to
   * @param protocols - Optional WebSocket sub-protocols
   * @param headers - Optional connection headers
   * @param abortSignal - Optional abort signal to cancel connection
   * @returns Promise that resolves when connection is established
   */
  connect(
    url: string, 
    protocols?: string[], 
    headers?: Record<string, string>,
    abortSignal?: AbortSignalLike
  ): Promise<void>;

  /**
   * Closes the WebSocket connection
   * @param code - Optional close code
   * @param reason - Optional close reason
   * @returns Promise that resolves when connection is closed
   */
  disconnect(code?: number, reason?: string): Promise<void>;

  /**
   * Sends data through the WebSocket connection
   * @param data - Data to send (string or binary)
   * @param abortSignal - Optional abort signal to cancel send
   * @returns Promise that resolves when data is sent
   */
  send(data: string | ArrayBuffer | Uint8Array, abortSignal?: AbortSignalLike): Promise<void>;

  /**
   * Registers handler for connection open event
   * @param handler - Event handler function
   */
  onOpen(handler: () => void): void;

  /**
   * Registers handler for connection close event
   * @param handler - Event handler function with close details
   */
  onClose(handler: (code: number, reason: string, wasClean: boolean) => void): void;

  /**
   * Registers handler for message reception
   * @param handler - Event handler function with message data
   */
  onMessage(handler: (data: string | ArrayBuffer | Uint8Array) => void): void;

  /**
   * Registers handler for connection errors
   * @param handler - Event handler function with error details
   */
  onError(handler: (error: Error) => void): void;

  /**
   * Gets current connection state
   * @returns true if connected and ready to send/receive
   */
  readonly isConnected: boolean;

  /**
   * Gets current connection state enum
   * @returns detailed connection state
   */
  readonly readyState: WebSocketReadyState;

  /**
   * Gets the connected URL if applicable
   * @returns connected URL or undefined
   */
  readonly url?: string;

  /**
   * Gets supported binary types for this platform
   * @returns array of supported binary data types
   */
  readonly supportedBinaryTypes: string[];
}

/**
 * WebSocket ready state enumeration  
 */
export enum WebSocketReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3
}

/**
 * Factory interface for creating WebSocket instances
 */
export interface VoiceLiveWebSocketFactory {
  /**
   * Creates a new WebSocket instance for the target platform
   * @param options - Platform-specific creation options
   * @returns WebSocket instance
   */
  createWebSocket(options?: WebSocketCreationOptions): VoiceLiveWebSocketLike;

  /**
   * Gets whether WebSockets are supported on this platform
   * @returns true if WebSocket support is available
   */
  readonly isSupported: boolean;

  /**
   * Gets the platform identifier
   * @returns platform name (node, browser, react-native)
   */
  readonly platform: string;
}

/**
 * Options for WebSocket creation
 */
export interface WebSocketCreationOptions {
  /** Connection timeout in milliseconds */
  connectionTimeoutMs?: number;
  /** Keep-alive interval in milliseconds */
  keepAliveIntervalMs?: number;
  /** Maximum message size in bytes */
  maxMessageSize?: number;
  /** Binary data type preference */
  binaryType?: 'arraybuffer' | 'uint8array';
}
```

## Platform-Specific Implementations

### Node.js Implementation

```typescript
import WebSocket from 'ws';
import type { AbortSignalLike } from "@azure/abort-controller";
import type { 
  VoiceLiveWebSocketLike, 
  WebSocketCreationOptions,
  WebSocketReadyState 
} from './websocketLike.js';

/**
 * Node.js WebSocket implementation using 'ws' library
 */
export class VoiceLiveWebSocketNode implements VoiceLiveWebSocketLike {
  private _socket?: WebSocket;
  private _url?: string;
  private _options: WebSocketCreationOptions;
  
  // Event handlers
  private _onOpen?: () => void;
  private _onClose?: (code: number, reason: string, wasClean: boolean) => void;
  private _onMessage?: (data: string | ArrayBuffer | Uint8Array) => void;
  private _onError?: (error: Error) => void;

  constructor(options: WebSocketCreationOptions = {}) {
    this._options = {
      connectionTimeoutMs: 30000,
      keepAliveIntervalMs: 30000,
      maxMessageSize: 16 * 1024 * 1024, // 16MB
      binaryType: 'arraybuffer',
      ...options
    };
  }

  async connect(
    url: string, 
    protocols?: string[], 
    headers?: Record<string, string>,
    abortSignal?: AbortSignalLike
  ): Promise<void> {
    if (this._socket) {
      throw new Error('WebSocket is already connected or connecting');
    }

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Connection timeout'));
      }, this._options.connectionTimeoutMs);

      const cleanup = () => {
        clearTimeout(timeoutId);
        abortSignal?.removeEventListener('abort', onAbort);
      };

      const onAbort = () => {
        cleanup();
        this._socket?.terminate();
        reject(new Error('Connection aborted'));
      };

      abortSignal?.addEventListener('abort', onAbort);

      this._socket = new WebSocket(url, protocols, {
        headers,
        maxPayload: this._options.maxMessageSize
      });

      this._socket.binaryType = this._options.binaryType === 'uint8array' 
        ? 'nodebuffer' 
        : 'arraybuffer';

      this._socket.onopen = () => {
        cleanup();
        this._url = url;
        this._onOpen?.();
        resolve();
      };

      this._socket.onclose = (event) => {
        cleanup();
        this._onClose?.(event.code, event.reason, event.wasClean);
      };

      this._socket.onmessage = (event) => {
        const data = this._convertMessageData(event.data);
        this._onMessage?.(data);
      };

      this._socket.onerror = (event) => {
        cleanup();
        const error = new Error(`WebSocket error: ${event.message || 'Unknown error'}`);
        this._onError?.(error);
        reject(error);
      };
    });
  }

  async disconnect(code?: number, reason?: string): Promise<void> {
    if (!this._socket) {
      return;
    }

    return new Promise((resolve) => {
      const socket = this._socket!;
      this._socket = undefined;
      this._url = undefined;

      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.onclose = () => resolve();
        socket.close(code, reason);
      } else {
        resolve();
      }
    });
  }

  async send(data: string | ArrayBuffer | Uint8Array, abortSignal?: AbortSignalLike): Promise<void> {
    if (!this._socket || this._socket.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected');
    }

    return new Promise((resolve, reject) => {
      const onAbort = () => {
        reject(new Error('Send operation aborted'));
      };

      abortSignal?.addEventListener('abort', onAbort);

      this._socket!.send(data, (error) => {
        abortSignal?.removeEventListener('abort', onAbort);
        
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  onOpen(handler: () => void): void {
    this._onOpen = handler;
  }

  onClose(handler: (code: number, reason: string, wasClean: boolean) => void): void {
    this._onClose = handler;
  }

  onMessage(handler: (data: string | ArrayBuffer | Uint8Array) => void): void {
    this._onMessage = handler;
  }

  onError(handler: (error: Error) => void): void {
    this._onError = handler;
  }

  get isConnected(): boolean {
    return this._socket?.readyState === WebSocket.OPEN;
  }

  get readyState(): WebSocketReadyState {
    if (!this._socket) return WebSocketReadyState.Closed;
    return this._socket.readyState as WebSocketReadyState;
  }

  get url(): string | undefined {
    return this._url;
  }

  get supportedBinaryTypes(): string[] {
    return ['arraybuffer', 'uint8array'];
  }

  private _convertMessageData(data: any): string | ArrayBuffer | Uint8Array {
    if (typeof data === 'string') {
      return data;
    }
    
    if (data instanceof Buffer) {
      return this._options.binaryType === 'uint8array' 
        ? new Uint8Array(data) 
        : data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
    }
    
    return data;
  }
}
```

### Browser Implementation  

```typescript
import type { AbortSignalLike } from "@azure/abort-controller";
import type { 
  VoiceLiveWebSocketLike, 
  WebSocketCreationOptions,
  WebSocketReadyState 
} from './websocketLike.js';

/**
 * Browser WebSocket implementation using native WebSocket API
 */
export class VoiceLiveWebSocketBrowser implements VoiceLiveWebSocketLike {
  private _socket?: WebSocket;
  private _url?: string;
  private _options: WebSocketCreationOptions;
  
  // Event handlers
  private _onOpen?: () => void;
  private _onClose?: (code: number, reason: string, wasClean: boolean) => void;
  private _onMessage?: (data: string | ArrayBuffer | Uint8Array) => void;
  private _onError?: (error: Error) => void;

  constructor(options: WebSocketCreationOptions = {}) {
    this._options = {
      connectionTimeoutMs: 30000,
      binaryType: 'arraybuffer',
      ...options
    };
  }

  async connect(
    url: string, 
    protocols?: string[], 
    headers?: Record<string, string>,
    abortSignal?: AbortSignalLike
  ): Promise<void> {
    if (this._socket) {
      throw new Error('WebSocket is already connected or connecting');
    }

    // Note: Browser WebSocket doesn't support custom headers
    if (headers && Object.keys(headers).length > 0) {
      console.warn('Custom headers are not supported in browser WebSocket implementation');
    }

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Connection timeout'));
      }, this._options.connectionTimeoutMs);

      const cleanup = () => {
        clearTimeout(timeoutId);
        abortSignal?.removeEventListener('abort', onAbort);
      };

      const onAbort = () => {
        cleanup();
        this._socket?.close();
        reject(new Error('Connection aborted'));
      };

      abortSignal?.addEventListener('abort', onAbort);

      this._socket = new WebSocket(url, protocols);
      this._socket.binaryType = this._options.binaryType as BinaryType;

      this._socket.onopen = () => {
        cleanup();
        this._url = url;
        this._onOpen?.();
        resolve();
      };

      this._socket.onclose = (event) => {
        cleanup();
        this._onClose?.(event.code, event.reason, event.wasClean);
      };

      this._socket.onmessage = (event) => {
        const data = this._convertMessageData(event.data);
        this._onMessage?.(data);
      };

      this._socket.onerror = () => {
        cleanup();
        const error = new Error('WebSocket connection error');
        this._onError?.(error);
        reject(error);
      };
    });
  }

  async disconnect(code?: number, reason?: string): Promise<void> {
    if (!this._socket) {
      return;
    }

    return new Promise((resolve) => {
      const socket = this._socket!;
      this._socket = undefined;
      this._url = undefined;

      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.onclose = () => resolve();
        socket.close(code, reason);
      } else {
        resolve();
      }
    });
  }

  async send(data: string | ArrayBuffer | Uint8Array, abortSignal?: AbortSignalLike): Promise<void> {
    if (!this._socket || this._socket.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected');
    }

    return new Promise((resolve, reject) => {
      const onAbort = () => {
        reject(new Error('Send operation aborted'));
      };

      abortSignal?.addEventListener('abort', onAbort);

      try {
        this._socket!.send(data);
        abortSignal?.removeEventListener('abort', onAbort);
        resolve();
      } catch (error) {
        abortSignal?.removeEventListener('abort', onAbort);
        reject(error);
      }
    });
  }

  onOpen(handler: () => void): void {
    this._onOpen = handler;
  }

  onClose(handler: (code: number, reason: string, wasClean: boolean) => void): void {
    this._onClose = handler;
  }

  onMessage(handler: (data: string | ArrayBuffer | Uint8Array) => void): void {
    this._onMessage = handler;
  }

  onError(handler: (error: Error) => void): void {
    this._onError = handler;
  }

  get isConnected(): boolean {
    return this._socket?.readyState === WebSocket.OPEN;
  }

  get readyState(): WebSocketReadyState {
    if (!this._socket) return WebSocketReadyState.Closed;
    return this._socket.readyState as WebSocketReadyState;
  }

  get url(): string | undefined {
    return this._url;
  }

  get supportedBinaryTypes(): string[] {
    return ['arraybuffer'];
  }

  private _convertMessageData(data: any): string | ArrayBuffer | Uint8Array {
    if (typeof data === 'string') {
      return data;
    }
    
    if (data instanceof ArrayBuffer) {
      return this._options.binaryType === 'uint8array' ? new Uint8Array(data) : data;
    }
    
    return data;
  }
}
```

## Platform Detection and Factory

```typescript
import type { VoiceLiveWebSocketFactory, VoiceLiveWebSocketLike, WebSocketCreationOptions } from './websocketLike.js';

/**
 * Platform detection utilities
 */
export class PlatformDetector {
  static isNode(): boolean {
    return typeof process !== 'undefined' && 
           process.versions != null && 
           process.versions.node != null;
  }

  static isBrowser(): boolean {
    return typeof window !== 'undefined' && 
           typeof window.WebSocket !== 'undefined';
  }

  static isReactNative(): boolean {
    return typeof navigator !== 'undefined' && 
           navigator.product === 'ReactNative';
  }

  static getPlatform(): string {
    if (this.isNode()) return 'node';
    if (this.isReactNative()) return 'react-native';
    if (this.isBrowser()) return 'browser';
    return 'unknown';
  }
}

/**
 * Default WebSocket factory that auto-detects platform
 */
export class VoiceLiveWebSocketDefaultFactory implements VoiceLiveWebSocketFactory {
  createWebSocket(options?: WebSocketCreationOptions): VoiceLiveWebSocketLike {
    const platform = PlatformDetector.getPlatform();
    
    switch (platform) {
      case 'node':
        return new VoiceLiveWebSocketNode(options);
      case 'browser':
      case 'react-native':
        return new VoiceLiveWebSocketBrowser(options);
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  get isSupported(): boolean {
    return PlatformDetector.isNode() || 
           PlatformDetector.isBrowser() || 
           PlatformDetector.isReactNative();
  }

  get platform(): string {
    return PlatformDetector.getPlatform();
  }
}

/**
 * Default factory instance
 */
export const defaultWebSocketFactory = new VoiceLiveWebSocketDefaultFactory();
```

## Error Handling Strategy

### WebSocket Error Types

```typescript
/**
 * Base WebSocket error class
 */
export class VoiceLiveWebSocketError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly originalError?: Error
  ) {
    super(message);
    this.name = 'VoiceLiveWebSocketError';
  }
}

/**
 * Connection-related errors
 */
export class VoiceLiveWebSocketConnectionError extends VoiceLiveWebSocketError {
  constructor(message: string, originalError?: Error) {
    super(message, 'CONNECTION_ERROR', originalError);
    this.name = 'VoiceLiveWebSocketConnectionError';
  }
}

/**
 * Send operation errors
 */
export class VoiceLiveWebSocketSendError extends VoiceLiveWebSocketError {
  constructor(message: string, originalError?: Error) {
    super(message, 'SEND_ERROR', originalError);
    this.name = 'VoiceLiveWebSocketSendError';
  }
}

/**
 * Protocol-related errors
 */
export class VoiceLiveWebSocketProtocolError extends VoiceLiveWebSocketError {
  constructor(message: string, originalError?: Error) {
    super(message, 'PROTOCOL_ERROR', originalError);
    this.name = 'VoiceLiveWebSocketProtocolError';
  }
}
```

## Usage Integration

### Integration with Main Client

```typescript
// In VoiceLiveClient
import { defaultWebSocketFactory } from './websocket/index.js';

export class VoiceLiveClient {
  private readonly _webSocketFactory: VoiceLiveWebSocketFactory;
  
  constructor(
    endpoint: string,
    credential: TokenCredential | KeyCredential,
    options: VoiceLiveClientOptions = {}
  ) {
    // ... other initialization
    this._webSocketFactory = options.webSocketFactory || defaultWebSocketFactory;
  }

  private async _createWebSocketConnection(
    url: string, 
    protocols: string[], 
    headers: Record<string, string>
  ): Promise<VoiceLiveWebSocketLike> {
    const webSocket = this._webSocketFactory.createWebSocket({
      connectionTimeoutMs: this._options.connectionTimeoutMs,
      binaryType: 'arraybuffer'
    });

    await webSocket.connect(url, protocols, headers);
    return webSocket;
  }
}
```

## Testing Strategy

### Mock Implementation

```typescript
/**
 * Mock WebSocket implementation for testing
 */
export class VoiceLiveWebSocketMock implements VoiceLiveWebSocketLike {
  private _isConnected = false;
  private _url?: string;
  private _handlers: {
    onOpen?: () => void;
    onClose?: (code: number, reason: string, wasClean: boolean) => void;
    onMessage?: (data: string | ArrayBuffer | Uint8Array) => void;
    onError?: (error: Error) => void;
  } = {};

  // Simulate events for testing
  simulateOpen(): void {
    this._isConnected = true;
    this._handlers.onOpen?.();
  }

  simulateClose(code = 1000, reason = '', wasClean = true): void {
    this._isConnected = false;
    this._handlers.onClose?.(code, reason, wasClean);
  }

  simulateMessage(data: string | ArrayBuffer | Uint8Array): void {
    this._handlers.onMessage?.(data);
  }

  simulateError(error: Error): void {
    this._handlers.onError?.(error);
  }

  // Implementation of VoiceLiveWebSocketLike interface
  async connect(url: string): Promise<void> {
    this._url = url;
    // Connection happens immediately in mock
  }

  async disconnect(): Promise<void> {
    this._isConnected = false;
    this._url = undefined;
  }

  async send(data: string | ArrayBuffer | Uint8Array): Promise<void> {
    if (!this._isConnected) {
      throw new Error('WebSocket is not connected');
    }
    // Send happens immediately in mock
  }

  onOpen(handler: () => void): void {
    this._handlers.onOpen = handler;
  }

  onClose(handler: (code: number, reason: string, wasClean: boolean) => void): void {
    this._handlers.onClose = handler;
  }

  onMessage(handler: (data: string | ArrayBuffer | Uint8Array) => void): void {
    this._handlers.onMessage = handler;
  }

  onError(handler: (error: Error) => void): void {
    this._handlers.onError = handler;
  }

  get isConnected(): boolean {
    return this._isConnected;
  }

  get readyState(): WebSocketReadyState {
    return this._isConnected ? WebSocketReadyState.Open : WebSocketReadyState.Closed;
  }

  get url(): string | undefined {
    return this._url;
  }

  get supportedBinaryTypes(): string[] {
    return ['arraybuffer', 'uint8array'];
  }
}
```

## Benefits of This Design

1. **Platform Agnostic** - Single interface works across all target platforms
2. **Type Safe** - Full TypeScript support with proper event typing
3. **Error Resilient** - Comprehensive error handling with specific error types
4. **Testable** - Easy to mock for unit testing
5. **Extensible** - Easy to add new platforms or features
6. **Azure SDK Compatible** - Follows Azure SDK patterns and conventions
7. **Performance Optimized** - Platform-specific optimizations where needed

## Future Enhancements

1. **Connection Pooling** - Support for multiple concurrent connections
2. **Compression** - WebSocket compression support where available  
3. **Custom Protocols** - Support for additional WebSocket sub-protocols
4. **Metrics** - Built-in connection and performance metrics
5. **Advanced Error Recovery** - Automatic retry with exponential backoff
6. **Binary Optimization** - Optimized binary data handling per platform