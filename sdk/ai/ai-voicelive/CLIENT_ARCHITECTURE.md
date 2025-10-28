# Client Architecture Design - Voice Live SDK

## Overview
This document outlines the client architecture design for the Voice Live SDK, following Azure SDK patterns and leveraging the existing generated model system.

## Core Client Design

### Main Client Class Structure

```typescript
import type { TokenCredential, KeyCredential } from "@azure/core-auth";
import type { ClientOptions } from "@azure-rest/core-client";
import { EventEmitter } from "events";
import type { 
  ClientEventUnion, 
  ServerEventUnion, 
  RequestSession, 
  ResponseSession 
} from "./models/index.js";

/**
 * Client options for VoiceLiveClient
 */
export interface VoiceLiveClientOptions extends ClientOptions {
  /** API version to use for requests. Defaults to latest. */
  apiVersion?: string;
  /** Auto-reconnect on connection loss. Defaults to true. */
  autoReconnect?: boolean;
  /** Maximum reconnection attempts. Defaults to 5. */
  maxReconnectAttempts?: number;
  /** Reconnection delay in milliseconds. Defaults to 1000. */
  reconnectDelayMs?: number;
  /** Connection timeout in milliseconds. Defaults to 30000. */
  connectionTimeoutMs?: number;
}

/**
 * Connection options for connect() method
 */
export interface ConnectOptions {
  /** AbortSignal to cancel the connection attempt */
  abortSignal?: AbortSignal;
  /** Initial session configuration */
  session?: RequestSession;
}

/**
 * Options for sending events
 */
export interface SendEventOptions {
  /** AbortSignal to cancel the send operation */
  abortSignal?: AbortSignal;
  /** Timeout for the operation in milliseconds */
  timeoutMs?: number;
}

/**
 * Options for updating session
 */
export interface UpdateSessionOptions {
  /** AbortSignal to cancel the update operation */
  abortSignal?: AbortSignal;
}

/**
 * Arguments for connected event
 */
export interface ConnectedEventArgs {
  /** Session information from server */
  session: ResponseSession;
  /** Connection identifier */
  connectionId?: string;
}

/**
 * Arguments for disconnected event  
 */
export interface DisconnectedEventArgs {
  /** Reason for disconnection */
  reason: string;
  /** Error code if applicable */
  code?: number;
  /** Whether reconnection will be attempted */
  willReconnect: boolean;
}

/**
 * Arguments for error event
 */
export interface ErrorEventArgs {
  /** The error that occurred */
  error: Error;
  /** Context where error occurred */
  context: string;
  /** Whether the error is recoverable */
  recoverable: boolean;
  /** The original server event if applicable */
  serverEvent?: ServerEventUnion;
}

/**
 * Arguments for server event
 */
export interface ServerEventArgs {
  /** The server event */
  event: ServerEventUnion;
  /** Timestamp when event was received */
  timestamp: Date;
}

/**
 * The main Voice Live client for real-time conversations
 */
export class VoiceLiveClient {
  private readonly _endpoint: string;
  private readonly _credential: TokenCredential | KeyCredential;
  private readonly _options: VoiceLiveClientOptions;
  private readonly _emitter: EventEmitter;
  
  private _webSocket?: VoiceLiveWebSocketLike;
  private _connectionState: ConnectionState = ConnectionState.Disconnected;
  private _currentSession?: ResponseSession;
  private _connectionId?: string;
  private _reconnectAttempts: number = 0;
  private _isReconnecting: boolean = false;

  /**
   * Creates a new VoiceLiveClient instance
   * @param endpoint - The Voice Live service endpoint URL
   * @param credential - Azure credential for authentication
   * @param options - Client configuration options
   */
  constructor(
    endpoint: string, 
    credential: TokenCredential, 
    options?: VoiceLiveClientOptions
  );
  
  /**
   * Creates a new VoiceLiveClient instance with key credential
   * @param endpoint - The Voice Live service endpoint URL  
   * @param credential - API key credential for authentication
   * @param options - Client configuration options
   */
  constructor(
    endpoint: string, 
    credential: KeyCredential, 
    options?: VoiceLiveClientOptions
  );

  constructor(
    endpoint: string,
    credential: TokenCredential | KeyCredential,
    options: VoiceLiveClientOptions = {}
  ) {
    this._endpoint = endpoint;
    this._credential = credential;
    this._options = { ...DEFAULT_CLIENT_OPTIONS, ...options };
    this._emitter = new EventEmitter();
  }

  // Connection lifecycle
  
  /**
   * Establishes connection to Voice Live service
   * @param options - Connection options
   * @returns Promise that resolves when connected
   */
  public async connect(options?: ConnectOptions): Promise<void>;
  
  /**
   * Disconnects from Voice Live service
   * @returns Promise that resolves when disconnected
   */
  public async disconnect(): Promise<void>;

  // Event registration - strongly typed following WebPubSub pattern
  
  /**
   * Register handler for connected event
   * @param event - Event name  
   * @param handler - Event handler function
   */
  public on(event: "connected", handler: (args: ConnectedEventArgs) => void): void;
  
  /**
   * Register handler for disconnected event
   * @param event - Event name
   * @param handler - Event handler function  
   */
  public on(event: "disconnected", handler: (args: DisconnectedEventArgs) => void): void;
  
  /**
   * Register handler for error event
   * @param event - Event name
   * @param handler - Event handler function
   */
  public on(event: "error", handler: (args: ErrorEventArgs) => void): void;
  
  /**
   * Register handler for any server event
   * @param event - Event name
   * @param handler - Event handler function
   */
  public on(event: "serverEvent", handler: (args: ServerEventArgs) => void): void;

  // Remove event handlers

  /**
   * Remove handler for connected event
   * @param event - Event name
   * @param handler - Event handler function to remove
   */
  public off(event: "connected", handler: (args: ConnectedEventArgs) => void): void;
  
  /**
   * Remove handler for disconnected event  
   * @param event - Event name
   * @param handler - Event handler function to remove
   */
  public off(event: "disconnected", handler: (args: DisconnectedEventArgs) => void): void;
  
  /**
   * Remove handler for error event
   * @param event - Event name  
   * @param handler - Event handler function to remove
   */
  public off(event: "error", handler: (args: ErrorEventArgs) => void): void;
  
  /**
   * Remove handler for server event
   * @param event - Event name
   * @param handler - Event handler function to remove  
   */
  public off(event: "serverEvent", handler: (args: ServerEventArgs) => void): void;

  // Core operations
  
  /**
   * Updates the current session configuration
   * @param session - New session configuration
   * @param options - Update options
   * @returns Promise that resolves when update is complete
   */
  public async updateSession(
    session: RequestSession, 
    options?: UpdateSessionOptions
  ): Promise<void>;
  
  /**
   * Sends a client event to the server
   * @param event - The client event to send
   * @param options - Send options
   * @returns Promise that resolves when event is sent
   */
  public async sendEvent(
    event: ClientEventUnion, 
    options?: SendEventOptions
  ): Promise<void>;

  // Utility properties
  
  /**
   * Gets the current connection state
   */
  public get isConnected(): boolean {
    return this._connectionState === ConnectionState.Connected;
  }
  
  /**
   * Gets the current connection ID if connected
   */  
  public get connectionId(): string | undefined {
    return this._connectionId;
  }
  
  /**
   * Gets the current session configuration
   */
  public get currentSession(): ResponseSession | undefined {
    return this._currentSession;
  }
  
  /**
   * Gets the service endpoint URL
   */
  public get endpoint(): string {
    return this._endpoint;
  }
}

/**
 * Connection state enumeration
 */
export enum ConnectionState {
  Disconnected = "Disconnected",
  Connecting = "Connecting", 
  Connected = "Connected",
  Reconnecting = "Reconnecting",
  Disconnecting = "Disconnecting"
}

/**
 * Default client options
 */
const DEFAULT_CLIENT_OPTIONS: Required<VoiceLiveClientOptions> = {
  apiVersion: "2024-12-01-preview",
  autoReconnect: true,
  maxReconnectAttempts: 5,
  reconnectDelayMs: 1000,
  connectionTimeoutMs: 30000,
  // ... other ClientOptions defaults
};
```

## Constructor Overload Strategy

Following Azure SDK patterns, the client supports multiple authentication methods:

1. **TokenCredential** - For Azure Active Directory authentication
2. **KeyCredential** - For API key authentication

This provides flexibility for different authentication scenarios while maintaining type safety.

## Event System Design

### Event Registration Pattern
Following the WebPubSub client pattern with strongly typed event handlers:

- `on(event, handler)` - Register event handlers
- `off(event, handler)` - Remove event handlers
- Each event type has specific argument interfaces
- Type safety ensured through method overloads

### Core Events
1. **connected** - Connection established successfully
2. **disconnected** - Connection lost or closed
3. **error** - Error occurred during operation
4. **serverEvent** - Generic handler for all server events

### Event Flow
1. Client emits `connected` when WebSocket connection established and session created
2. All server events flow through `serverEvent` handler for unified processing
3. Specific error conditions emit `error` events with context
4. Connection issues emit `disconnected` with reconnection status

## Connection Management

### Connection Lifecycle
1. **Disconnected** → `connect()` → **Connecting** → **Connected**
2. **Connected** → `disconnect()` → **Disconnecting** → **Disconnected**  
3. **Connected** → Connection Lost → **Reconnecting** → **Connected** (if auto-reconnect enabled)

### Reconnection Strategy
- Automatic reconnection on connection loss (configurable)
- Exponential backoff with configurable max attempts
- Session restoration after reconnection
- Graceful degradation on permanent failures

## Session Management

### Session Configuration
- Initial session sent during connection
- Session updates via `updateSession()` method
- Server session state tracked in `currentSession` property
- Session events handled through server event system

### Session State Synchronization
- Client maintains current session state
- Server confirmations update local state
- Session changes trigger appropriate events

## Error Handling Strategy

### Error Categories
1. **Connection Errors** - Network, authentication, protocol issues
2. **Operation Errors** - Invalid requests, service errors
3. **Recoverable Errors** - Temporary failures, rate limiting
4. **Fatal Errors** - Authentication failure, service unavailable

### Error Propagation
- All errors flow through `error` event with context
- Recoverable errors allow retry logic
- Fatal errors require client-side handling
- Server error events mapped to appropriate error types

## Integration with Generated Models

### Type Safety
- All event types use generated discriminated unions
- Serialization/deserialization handled by generated functions
- Client acts as strongly-typed wrapper around WebSocket protocol

### Extensibility
- New event types automatically supported through union types
- Client code remains stable as protocol evolves
- Generated serializers handle protocol versioning

## Platform Support

The client architecture supports:
- **Node.js** - Full feature set with WebSocket support
- **Browser** - Web-compatible with WebSocket API
- **React Native** - Mobile app support with WebSocket polyfill

Platform-specific implementations will be handled by the WebSocket abstraction layer.

## Benefits of This Design

1. **Azure SDK Consistency** - Follows established patterns and conventions
2. **Type Safety** - Comprehensive TypeScript support with generated types
3. **Extensibility** - Easy to add new features without breaking changes
4. **Error Resilience** - Robust error handling and recovery mechanisms
5. **Developer Experience** - Intuitive API with strong IntelliSense support
6. **Protocol Evolution** - Maintains compatibility as Voice Live protocol evolves

## Next Steps

1. Implement WebSocket abstraction layer
2. Create authentication integration
3. Build error handling framework
4. Implement connection management logic
5. Add session management functionality
6. Create comprehensive test suite