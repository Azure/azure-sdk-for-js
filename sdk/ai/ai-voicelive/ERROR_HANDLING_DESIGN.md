# Error Handling Framework Design - Voice Live SDK

## Overview
This document outlines the comprehensive error handling framework for the Voice Live SDK, following Azure SDK patterns and providing robust error management for real-time voice applications.

## Design Goals

1. **Azure SDK Compliance** - Follow Azure SDK error handling patterns
2. **Error Classification** - Clear categorization of error types and recovery strategies
3. **Context Preservation** - Maintain error context for debugging and recovery
4. **Type Safety** - Comprehensive TypeScript support with proper error typing
5. **Recovery Guidance** - Clear indication of error recoverability and retry strategies
6. **Observability** - Rich error information for logging and monitoring
7. **Voice Live Specificity** - Handle real-time conversation-specific error scenarios

## Core Error Framework

### Base Error Classes

```typescript
/**
 * Base error class for all Voice Live SDK errors
 */
export class VoiceLiveError extends Error {
  /**
   * Error code identifying the specific error type
   */
  public readonly code: string;
  
  /**
   * Indicates whether this error is potentially recoverable
   */
  public readonly recoverable: boolean;
  
  /**
   * Context information about where the error occurred
   */
  public readonly context: string;
  
  /**
   * The original error that caused this error, if any
   */
  public readonly cause?: Error;
  
  /**
   * Timestamp when the error occurred
   */
  public readonly timestamp: Date;
  
  /**
   * Additional error details specific to the error type
   */
  public readonly details?: Record<string, any>;

  constructor(
    message: string,
    code: string,
    context: string,
    options: VoiceLiveErrorOptions = {}
  ) {
    super(message);
    this.name = 'VoiceLiveError';
    this.code = code;
    this.context = context;
    this.recoverable = options.recoverable ?? false;
    this.cause = options.cause;
    this.timestamp = options.timestamp || new Date();
    this.details = options.details;
    
    // Ensure proper stack trace in V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, VoiceLiveError);
    }
  }

  /**
   * Returns a JSON representation of the error
   */
  toJSON(): VoiceLiveErrorInfo {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      context: this.context,
      recoverable: this.recoverable,
      timestamp: this.timestamp,
      details: this.details,
      stack: this.stack
    };
  }

  /**
   * Creates a formatted error message with context
   */
  toString(): string {
    return `${this.name} [${this.code}]: ${this.message} (context: ${this.context})`;
  }
}

/**
 * Options for creating VoiceLive errors
 */
export interface VoiceLiveErrorOptions {
  /** Whether the error is recoverable */
  recoverable?: boolean;
  /** Original error that caused this error */
  cause?: Error;
  /** Error timestamp */
  timestamp?: Date;
  /** Additional error details */
  details?: Record<string, any>;
}

/**
 * Serializable error information
 */
export interface VoiceLiveErrorInfo {
  name: string;
  message: string;
  code: string;
  context: string;
  recoverable: boolean;
  timestamp: Date;
  details?: Record<string, any>;
  stack?: string;
}
```

### Connection Error Types

```typescript
/**
 * Errors related to WebSocket connection management
 */
export class VoiceLiveConnectionError extends VoiceLiveError {
  constructor(
    message: string,
    code: VoiceLiveConnectionErrorCode,
    options: VoiceLiveErrorOptions = {}
  ) {
    super(message, code, 'connection', { recoverable: true, ...options });
    this.name = 'VoiceLiveConnectionError';
  }
}

/**
 * Connection error codes
 */
export type VoiceLiveConnectionErrorCode =
  | 'CONNECTION_FAILED'
  | 'CONNECTION_TIMEOUT'
  | 'CONNECTION_REFUSED'
  | 'CONNECTION_LOST'
  | 'CONNECTION_ABORTED'
  | 'RECONNECTION_FAILED'
  | 'WEBSOCKET_ERROR'
  | 'PROTOCOL_MISMATCH'
  | 'TLS_ERROR';

/**
 * Factory methods for common connection errors
 */
export class VoiceLiveConnectionErrors {
  static connectionFailed(message: string, cause?: Error): VoiceLiveConnectionError {
    return new VoiceLiveConnectionError(
      message || 'Failed to establish connection to Voice Live service',
      'CONNECTION_FAILED',
      { cause, recoverable: true }
    );
  }

  static connectionTimeout(timeoutMs: number): VoiceLiveConnectionError {
    return new VoiceLiveConnectionError(
      `Connection attempt timed out after ${timeoutMs}ms`,
      'CONNECTION_TIMEOUT',
      { recoverable: true, details: { timeoutMs } }
    );
  }

  static connectionLost(reason?: string): VoiceLiveConnectionError {
    return new VoiceLiveConnectionError(
      `Connection to Voice Live service was lost${reason ? `: ${reason}` : ''}`,
      'CONNECTION_LOST',
      { recoverable: true, details: { reason } }
    );
  }

  static reconnectionFailed(attempt: number, maxAttempts: number): VoiceLiveConnectionError {
    return new VoiceLiveConnectionError(
      `Reconnection failed after ${attempt}/${maxAttempts} attempts`,
      'RECONNECTION_FAILED',
      { 
        recoverable: attempt < maxAttempts,
        details: { attempt, maxAttempts }
      }
    );
  }
}
```

### Authentication Error Types

```typescript
/**
 * Errors related to authentication and authorization
 */
export class VoiceLiveAuthenticationError extends VoiceLiveError {
  constructor(
    message: string,
    code: VoiceLiveAuthenticationErrorCode,
    options: VoiceLiveErrorOptions = {}
  ) {
    super(message, code, 'authentication', { recoverable: false, ...options });
    this.name = 'VoiceLiveAuthenticationError';
  }
}

/**
 * Authentication error codes
 */
export type VoiceLiveAuthenticationErrorCode =
  | 'AUTHENTICATION_FAILED'
  | 'TOKEN_ACQUISITION_FAILED'
  | 'TOKEN_EXPIRED'
  | 'TOKEN_INVALID'
  | 'TOKEN_REFRESH_FAILED'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'INVALID_CREDENTIALS'
  | 'CREDENTIAL_UNAVAILABLE';

/**
 * Factory methods for common authentication errors
 */
export class VoiceLiveAuthenticationErrors {
  static authenticationFailed(message: string, cause?: Error): VoiceLiveAuthenticationError {
    return new VoiceLiveAuthenticationError(
      message || 'Authentication failed',
      'AUTHENTICATION_FAILED',
      { cause, recoverable: false }
    );
  }

  static tokenExpired(): VoiceLiveAuthenticationError {
    return new VoiceLiveAuthenticationError(
      'Access token has expired',
      'TOKEN_EXPIRED',
      { recoverable: true } // Can be recovered by refreshing token
    );
  }

  static tokenRefreshFailed(cause?: Error): VoiceLiveAuthenticationError {
    return new VoiceLiveAuthenticationError(
      'Failed to refresh access token',
      'TOKEN_REFRESH_FAILED',
      { cause, recoverable: false }
    );
  }

  static unauthorized(resource?: string): VoiceLiveAuthenticationError {
    return new VoiceLiveAuthenticationError(
      `Access denied${resource ? ` to ${resource}` : ''}`,
      'UNAUTHORIZED',
      { recoverable: false, details: { resource } }
    );
  }
}
```

### Protocol Error Types

```typescript
/**
 * Errors related to Voice Live protocol communication
 */
export class VoiceLiveProtocolError extends VoiceLiveError {
  /** The server event that caused the error, if applicable */
  public readonly serverEvent?: ServerEventUnion;
  
  /** The client event that caused the error, if applicable */
  public readonly clientEvent?: ClientEventUnion;

  constructor(
    message: string,
    code: VoiceLiveProtocolErrorCode,
    options: VoiceLiveProtocolErrorOptions = {}
  ) {
    super(message, code, 'protocol', { recoverable: false, ...options });
    this.name = 'VoiceLiveProtocolError';
    this.serverEvent = options.serverEvent;
    this.clientEvent = options.clientEvent;
  }
}

/**
 * Protocol error codes
 */
export type VoiceLiveProtocolErrorCode =
  | 'INVALID_MESSAGE_FORMAT'
  | 'UNSUPPORTED_EVENT_TYPE'
  | 'MESSAGE_TOO_LARGE'
  | 'SERIALIZATION_ERROR'
  | 'DESERIALIZATION_ERROR'
  | 'INVALID_SESSION_STATE'
  | 'PROTOCOL_VERSION_MISMATCH'
  | 'SERVER_ERROR'
  | 'RATE_LIMITED';

/**
 * Options for protocol errors
 */
export interface VoiceLiveProtocolErrorOptions extends VoiceLiveErrorOptions {
  /** Server event related to the error */
  serverEvent?: ServerEventUnion;
  /** Client event related to the error */
  clientEvent?: ClientEventUnion;
}

/**
 * Factory methods for common protocol errors
 */
export class VoiceLiveProtocolErrors {
  static invalidMessageFormat(message: string, data?: any): VoiceLiveProtocolError {
    return new VoiceLiveProtocolError(
      message || 'Invalid message format received',
      'INVALID_MESSAGE_FORMAT',
      { recoverable: false, details: { data } }
    );
  }

  static serverError(serverEvent: ServerEventError): VoiceLiveProtocolError {
    const errorDetails = serverEvent.error;
    return new VoiceLiveProtocolError(
      `Server error: ${errorDetails.message}`,
      'SERVER_ERROR',
      { 
        recoverable: true, // Server errors might be temporary
        serverEvent,
        details: {
          serverErrorCode: errorDetails.code,
          serverErrorType: errorDetails.type,
          eventId: errorDetails.eventId
        }
      }
    );
  }

  static rateLimited(retryAfterMs?: number): VoiceLiveProtocolError {
    return new VoiceLiveProtocolError(
      `Request rate limited${retryAfterMs ? `, retry after ${retryAfterMs}ms` : ''}`,
      'RATE_LIMITED',
      { 
        recoverable: true,
        details: { retryAfterMs }
      }
    );
  }
}
```

### Service Error Types  

```typescript
/**
 * Errors related to the Voice Live service itself
 */
export class VoiceLiveServiceError extends VoiceLiveError {
  /** HTTP status code if applicable */
  public readonly statusCode?: number;
  
  /** Service-specific error code */
  public readonly serviceCode?: string;

  constructor(
    message: string,
    code: VoiceLiveServiceErrorCode,
    options: VoiceLiveServiceErrorOptions = {}
  ) {
    super(message, code, 'service', { recoverable: true, ...options });
    this.name = 'VoiceLiveServiceError';
    this.statusCode = options.statusCode;
    this.serviceCode = options.serviceCode;
  }
}

/**
 * Service error codes
 */
export type VoiceLiveServiceErrorCode =
  | 'SERVICE_UNAVAILABLE'
  | 'SERVICE_BUSY'
  | 'QUOTA_EXCEEDED'
  | 'MODEL_UNAVAILABLE'
  | 'FEATURE_NOT_SUPPORTED'
  | 'RESOURCE_NOT_FOUND'
  | 'INTERNAL_ERROR'
  | 'MAINTENANCE'
  | 'REGION_UNAVAILABLE';

/**
 * Options for service errors
 */
export interface VoiceLiveServiceErrorOptions extends VoiceLiveErrorOptions {
  /** HTTP status code */
  statusCode?: number;
  /** Service-specific error code */
  serviceCode?: string;
}

/**
 * Factory methods for common service errors
 */
export class VoiceLiveServiceErrors {
  static serviceUnavailable(retryAfterMs?: number): VoiceLiveServiceError {
    return new VoiceLiveServiceError(
      'Voice Live service is temporarily unavailable',
      'SERVICE_UNAVAILABLE',
      { 
        recoverable: true,
        statusCode: 503,
        details: { retryAfterMs }
      }
    );
  }

  static quotaExceeded(quotaType?: string): VoiceLiveServiceError {
    return new VoiceLiveServiceError(
      `Quota exceeded${quotaType ? ` for ${quotaType}` : ''}`,
      'QUOTA_EXCEEDED',
      { 
        recoverable: false,
        statusCode: 429,
        details: { quotaType }
      }
    );
  }

  static modelUnavailable(modelName: string): VoiceLiveServiceError {
    return new VoiceLiveServiceError(
      `Model '${modelName}' is not available`,
      'MODEL_UNAVAILABLE',
      { 
        recoverable: false,
        statusCode: 404,
        details: { modelName }
      }
    );
  }
}
```

### Client Error Types

```typescript
/**
 * Errors related to client usage and configuration
 */
export class VoiceLiveClientError extends VoiceLiveError {
  constructor(
    message: string,
    code: VoiceLiveClientErrorCode,
    options: VoiceLiveErrorOptions = {}
  ) {
    super(message, code, 'client', { recoverable: false, ...options });
    this.name = 'VoiceLiveClientError';
  }
}

/**
 * Client error codes
 */
export type VoiceLiveClientErrorCode =
  | 'INVALID_CONFIGURATION'
  | 'INVALID_PARAMETER'
  | 'INVALID_STATE'
  | 'OPERATION_NOT_SUPPORTED'
  | 'ALREADY_CONNECTED'
  | 'NOT_CONNECTED'
  | 'OPERATION_ABORTED'
  | 'TIMEOUT'
  | 'INVALID_AUDIO_FORMAT'
  | 'AUDIO_PROCESSING_ERROR';

/**
 * Factory methods for common client errors
 */
export class VoiceLiveClientErrors {
  static invalidConfiguration(parameter: string, value: any): VoiceLiveClientError {
    return new VoiceLiveClientError(
      `Invalid configuration for parameter '${parameter}': ${value}`,
      'INVALID_CONFIGURATION',
      { details: { parameter, value } }
    );
  }

  static invalidState(currentState: string, expectedState: string, operation: string): VoiceLiveClientError {
    return new VoiceLiveClientError(
      `Cannot perform '${operation}' in state '${currentState}', expected '${expectedState}'`,
      'INVALID_STATE',
      { details: { currentState, expectedState, operation } }
    );
  }

  static notConnected(operation: string): VoiceLiveClientError {
    return new VoiceLiveClientError(
      `Cannot perform '${operation}' - client is not connected`,
      'NOT_CONNECTED',
      { recoverable: true }
    );
  }

  static operationAborted(operation: string): VoiceLiveClientError {
    return new VoiceLiveClientError(
      `Operation '${operation}' was aborted`,
      'OPERATION_ABORTED',
      { recoverable: true }
    );
  }
}
```

## Error Recovery Framework

### Recovery Strategy Interface

```typescript
/**
 * Interface for error recovery strategies
 */
export interface VoiceLiveErrorRecoveryStrategy {
  /**
   * Determines if this strategy can handle the given error
   */
  canHandle(error: VoiceLiveError): boolean;

  /**
   * Attempts to recover from the error
   */
  recover(error: VoiceLiveError, context: VoiceLiveErrorRecoveryContext): Promise<boolean>;

  /**
   * Gets the maximum number of recovery attempts for this strategy
   */
  getMaxAttempts(): number;

  /**
   * Gets the delay between recovery attempts
   */
  getRetryDelay(attempt: number): number;
}

/**
 * Context information for error recovery
 */
export interface VoiceLiveErrorRecoveryContext {
  /** The Voice Live client instance */
  client: VoiceLiveClient;
  /** Current recovery attempt number */
  attempt: number;
  /** Previous recovery errors */
  previousErrors: VoiceLiveError[];
  /** Additional context data */
  data?: Record<string, any>;
}

/**
 * Recovery strategy for connection errors
 */
export class ConnectionErrorRecoveryStrategy implements VoiceLiveErrorRecoveryStrategy {
  private readonly maxAttempts: number;
  private readonly baseDelayMs: number;

  constructor(maxAttempts = 5, baseDelayMs = 1000) {
    this.maxAttempts = maxAttempts;
    this.baseDelayMs = baseDelayMs;
  }

  canHandle(error: VoiceLiveError): boolean {
    return error instanceof VoiceLiveConnectionError && error.recoverable;
  }

  async recover(error: VoiceLiveError, context: VoiceLiveErrorRecoveryContext): Promise<boolean> {
    const { client, attempt } = context;

    if (attempt >= this.maxAttempts) {
      return false;
    }

    try {
      // Wait before retry
      const delay = this.getRetryDelay(attempt);
      await new Promise(resolve => setTimeout(resolve, delay));

      // Attempt reconnection
      await client.connect();
      return true;
    } catch (recoveryError) {
      return false;
    }
  }

  getMaxAttempts(): number {
    return this.maxAttempts;
  }

  getRetryDelay(attempt: number): number {
    // Exponential backoff with jitter
    const exponentialDelay = this.baseDelayMs * Math.pow(2, attempt - 1);
    const jitter = Math.random() * 0.1 * exponentialDelay;
    return Math.min(exponentialDelay + jitter, 30000); // Cap at 30 seconds
  }
}

/**
 * Recovery strategy for authentication errors
 */
export class AuthenticationErrorRecoveryStrategy implements VoiceLiveErrorRecoveryStrategy {
  canHandle(error: VoiceLiveError): boolean {
    return error instanceof VoiceLiveAuthenticationError && 
           error.code === 'TOKEN_EXPIRED';
  }

  async recover(error: VoiceLiveError, context: VoiceLiveErrorRecoveryContext): Promise<boolean> {
    const { client } = context;

    try {
      // Attempt to refresh authentication
      await client.refreshAuthentication();
      return true;
    } catch (refreshError) {
      return false;
    }
  }

  getMaxAttempts(): number {
    return 1; // Only try once for auth refresh
  }

  getRetryDelay(attempt: number): number {
    return 0; // Immediate retry for auth refresh
  }
}
```

### Error Recovery Manager

```typescript
/**
 * Manages error recovery strategies and execution
 */
export class VoiceLiveErrorRecoveryManager {
  private readonly strategies: VoiceLiveErrorRecoveryStrategy[];
  private readonly recoveryAttempts: Map<string, number>;

  constructor() {
    this.strategies = [
      new ConnectionErrorRecoveryStrategy(),
      new AuthenticationErrorRecoveryStrategy(),
      // Add more recovery strategies as needed
    ];
    this.recoveryAttempts = new Map();
  }

  /**
   * Attempts to recover from an error using available strategies
   */
  async attemptRecovery(
    error: VoiceLiveError,
    client: VoiceLiveClient
  ): Promise<VoiceLiveErrorRecoveryResult> {
    const strategy = this.findStrategy(error);
    
    if (!strategy) {
      return {
        recovered: false,
        strategy: null,
        attempts: 0,
        finalError: error
      };
    }

    const errorKey = this.getErrorKey(error);
    const currentAttempts = this.recoveryAttempts.get(errorKey) || 0;
    
    if (currentAttempts >= strategy.getMaxAttempts()) {
      return {
        recovered: false,
        strategy: strategy.constructor.name,
        attempts: currentAttempts,
        finalError: new VoiceLiveError(
          `Recovery failed after ${currentAttempts} attempts`,
          'RECOVERY_EXHAUSTED',
          'recovery',
          { cause: error }
        )
      };
    }

    const newAttempts = currentAttempts + 1;
    this.recoveryAttempts.set(errorKey, newAttempts);

    const context: VoiceLiveErrorRecoveryContext = {
      client,
      attempt: newAttempts,
      previousErrors: [],
      data: {}
    };

    try {
      const recovered = await strategy.recover(error, context);
      
      if (recovered) {
        this.recoveryAttempts.delete(errorKey); // Reset on success
      }

      return {
        recovered,
        strategy: strategy.constructor.name,
        attempts: newAttempts,
        finalError: recovered ? null : error
      };
    } catch (recoveryError) {
      return {
        recovered: false,
        strategy: strategy.constructor.name,
        attempts: newAttempts,
        finalError: recoveryError instanceof Error 
          ? new VoiceLiveError(
              `Recovery strategy failed: ${recoveryError.message}`,
              'RECOVERY_FAILED',
              'recovery',
              { cause: recoveryError }
            )
          : error
      };
    }
  }

  private findStrategy(error: VoiceLiveError): VoiceLiveErrorRecoveryStrategy | null {
    return this.strategies.find(strategy => strategy.canHandle(error)) || null;
  }

  private getErrorKey(error: VoiceLiveError): string {
    return `${error.constructor.name}:${error.code}:${error.context}`;
  }
}

/**
 * Result of error recovery attempt
 */
export interface VoiceLiveErrorRecoveryResult {
  /** Whether recovery was successful */
  recovered: boolean;
  /** Name of strategy used */
  strategy: string | null;
  /** Number of recovery attempts made */
  attempts: number;
  /** Final error if recovery failed */
  finalError: VoiceLiveError | Error | null;
}
```

## Error Event System

### Error Event Args

```typescript
/**
 * Arguments for error events emitted by the client
 */
export interface VoiceLiveErrorEventArgs {
  /** The error that occurred */
  error: VoiceLiveError;
  /** Context where error occurred */
  context: string;
  /** Whether the error is recoverable */
  recoverable: boolean;
  /** The original server event if applicable */
  serverEvent?: ServerEventUnion;
  /** The client event that caused the error if applicable */
  clientEvent?: ClientEventUnion;
  /** Recovery result if recovery was attempted */
  recoveryResult?: VoiceLiveErrorRecoveryResult;
  /** Additional error context */
  additionalContext?: Record<string, any>;
}
```

### Integration with Main Client

```typescript
// In VoiceLiveClient
export class VoiceLiveClient {
  private readonly _errorRecoveryManager: VoiceLiveErrorRecoveryManager;

  constructor(
    endpoint: string,
    credential: TokenCredential | KeyCredential,
    options: VoiceLiveClientOptions = {}
  ) {
    // ... other initialization
    this._errorRecoveryManager = new VoiceLiveErrorRecoveryManager();
  }

  /**
   * Handles errors with optional automatic recovery
   */
  private async _handleError(
    error: Error,
    context: string,
    serverEvent?: ServerEventUnion,
    clientEvent?: ClientEventUnion
  ): Promise<void> {
    // Convert to VoiceLive error if needed
    const voiceLiveError = error instanceof VoiceLiveError 
      ? error 
      : this._convertToVoiceLiveError(error, context);

    // Attempt recovery if enabled and error is recoverable
    let recoveryResult: VoiceLiveErrorRecoveryResult | undefined;
    
    if (voiceLiveError.recoverable && this._options.enableAutoRecovery) {
      recoveryResult = await this._errorRecoveryManager.attemptRecovery(voiceLiveError, this);
      
      if (recoveryResult.recovered) {
        // Emit recovery success event
        this._emitEvent('recovered', {
          originalError: voiceLiveError,
          recoveryResult
        });
        return; // Don't emit error event if recovered
      }
    }

    // Emit error event
    this._emitEvent('error', {
      error: voiceLiveError,
      context,
      recoverable: voiceLiveError.recoverable,
      serverEvent,
      clientEvent,
      recoveryResult
    });
  }

  private _convertToVoiceLiveError(error: Error, context: string): VoiceLiveError {
    if (error.message.includes('authentication') || error.message.includes('unauthorized')) {
      return VoiceLiveAuthenticationErrors.authenticationFailed(error.message, error);
    }
    
    if (error.message.includes('connection') || error.message.includes('network')) {
      return VoiceLiveConnectionErrors.connectionFailed(error.message, error);
    }
    
    // Default to generic client error
    return new VoiceLiveClientError(
      error.message,
      'GENERAL_ERROR',
      { cause: error, context }
    );
  }
}
```

## Error Logging and Monitoring

### Error Logging Interface

```typescript
/**
 * Interface for error logging
 */
export interface VoiceLiveErrorLogger {
  /**
   * Logs an error
   */
  logError(error: VoiceLiveError, context?: Record<string, any>): void;

  /**
   * Logs error recovery attempt
   */
  logRecoveryAttempt(error: VoiceLiveError, attempt: number, success: boolean): void;

  /**
   * Logs error patterns for analysis
   */
  logErrorPattern(errors: VoiceLiveError[], timeWindowMs: number): void;
}

/**
 * Default console error logger
 */
export class ConsoleErrorLogger implements VoiceLiveErrorLogger {
  logError(error: VoiceLiveError, context?: Record<string, any>): void {
    console.error(`[VoiceLive Error] ${error.toString()}`, {
      error: error.toJSON(),
      context
    });
  }

  logRecoveryAttempt(error: VoiceLiveError, attempt: number, success: boolean): void {
    const message = success 
      ? `Recovery successful for ${error.code} after ${attempt} attempt(s)`
      : `Recovery attempt ${attempt} failed for ${error.code}`;
    
    console.log(`[VoiceLive Recovery] ${message}`);
  }

  logErrorPattern(errors: VoiceLiveError[], timeWindowMs: number): void {
    const errorCounts = errors.reduce((counts, error) => {
      counts[error.code] = (counts[error.code] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);

    console.warn(`[VoiceLive Error Pattern] ${errors.length} errors in ${timeWindowMs}ms:`, errorCounts);
  }
}
```

## Usage Examples

### Basic Error Handling

```typescript
const client = new VoiceLiveClient(endpoint, credential);

client.on('error', (args: VoiceLiveErrorEventArgs) => {
  console.error('Voice Live error:', args.error.toString());
  
  if (args.recoverable) {
    console.log('Error is recoverable, client may attempt automatic recovery');
  } else {
    console.log('Error is not recoverable, manual intervention required');
  }
});

client.on('recovered', (args) => {
  console.log('Recovered from error:', args.originalError.code);
});
```

### Custom Error Recovery

```typescript
// Disable automatic recovery and handle manually
const client = new VoiceLiveClient(endpoint, credential, {
  enableAutoRecovery: false
});

client.on('error', async (args: VoiceLiveErrorEventArgs) => {
  if (args.error instanceof VoiceLiveConnectionError) {
    // Custom connection recovery logic
    await handleConnectionError(args.error);
  } else if (args.error instanceof VoiceLiveAuthenticationError) {
    // Custom authentication recovery logic
    await handleAuthenticationError(args.error);
  }
});
```

### Error Monitoring

```typescript
// Set up error monitoring
const errorLogger = new CustomErrorLogger(); // Your custom logger
client.setErrorLogger(errorLogger);

// Monitor error patterns
client.on('error', (args) => {
  errorLogger.logError(args.error, {
    timestamp: new Date(),
    sessionId: client.sessionId,
    connectionId: client.connectionId
  });
});
```

## Benefits of This Design

1. **Comprehensive Coverage** - Covers all error scenarios in Voice Live usage
2. **Recovery Automation** - Automatic recovery for common error scenarios
3. **Type Safety** - Full TypeScript support with proper error typing
4. **Observability** - Rich error information for debugging and monitoring
5. **Extensibility** - Easy to add new error types and recovery strategies
6. **Azure SDK Compliance** - Follows established Azure SDK error patterns
7. **Real-time Optimized** - Handles real-time conversation error scenarios
8. **Graceful Degradation** - Provides fallback options when recovery fails

## Error Prevention Best Practices

1. **Validation** - Validate inputs before sending to service
2. **Connection Monitoring** - Monitor connection health proactively
3. **Authentication Management** - Proactive token refresh
4. **Rate Limiting** - Implement client-side rate limiting
5. **Resource Management** - Proper cleanup and resource disposal
6. **Error Boundaries** - Isolate error contexts to prevent cascading failures