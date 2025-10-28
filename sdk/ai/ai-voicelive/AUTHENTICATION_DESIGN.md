# Authentication Integration Design - Voice Live SDK

## Overview
This document outlines the authentication integration design for the Voice Live SDK, supporting Azure Active Directory and API key authentication following Azure SDK patterns.

## Design Goals

1. **Azure SDK Compatibility** - Follow Azure SDK authentication patterns
2. **Multiple Auth Methods** - Support TokenCredential and KeyCredential
3. **Secure Token Handling** - Proper token lifecycle management
4. **WebSocket Integration** - Seamless authentication with WebSocket connections
5. **Token Refresh** - Automatic token refresh for long-lived connections
6. **Error Resilience** - Robust error handling for authentication failures

## Core Authentication Types

### Credential Interfaces

```typescript
import type { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
import type { KeyCredential } from "@azure/core-auth";
import type { AbortSignalLike } from "@azure/abort-controller";

/**
 * Options for Voice Live authentication
 */
export interface VoiceLiveAuthenticationOptions {
  /** Custom scope for token requests. Defaults to Voice Live service scope. */
  scope?: string | string[];
  /** Whether to enable automatic token refresh. Defaults to true. */
  enableAutoRefresh?: boolean;
  /** Token refresh threshold in milliseconds before expiry. Defaults to 300000 (5 minutes). */
  refreshThresholdMs?: number;
  /** Maximum retry attempts for token acquisition. Defaults to 3. */
  maxRetryAttempts?: number;
  /** Retry delay in milliseconds. Defaults to 1000. */
  retryDelayMs?: number;
}

/**
 * Authentication result containing access details
 */
export interface VoiceLiveAuthenticationResult {
  /** Access token for API requests */
  accessToken: string;
  /** Token expiration time */
  expiresOn?: Date;
  /** Token type (usually 'Bearer') */
  tokenType: string;
  /** Whether this is a refreshed token */
  isRefresh?: boolean;
}

/**
 * Authentication context for connection management
 */
export interface VoiceLiveAuthenticationContext {
  /** Current authentication result */
  current?: VoiceLiveAuthenticationResult;
  /** Whether authentication is currently being refreshed */
  isRefreshing: boolean;
  /** Last authentication error if any */
  lastError?: Error;
  /** Authentication expiry time */
  expiresAt?: Date;
}
```

### Authentication Handler Interface

```typescript
/**
 * Abstract base for Voice Live authentication handling
 */
export interface VoiceLiveAuthenticationHandler {
  /**
   * Authenticates and returns access token
   * @param options - Authentication options
   * @returns Promise resolving to authentication result
   */
  authenticate(options?: VoiceLiveAuthenticationOptions): Promise<VoiceLiveAuthenticationResult>;

  /**
   * Refreshes the current authentication if needed
   * @param forceRefresh - Whether to force refresh even if not expired
   * @param options - Authentication options
   * @returns Promise resolving to authentication result
   */
  refreshAuthentication(
    forceRefresh?: boolean, 
    options?: VoiceLiveAuthenticationOptions
  ): Promise<VoiceLiveAuthenticationResult>;

  /**
   * Gets the current authentication context
   * @returns Current authentication context
   */
  getAuthenticationContext(): VoiceLiveAuthenticationContext;

  /**
   * Checks if current authentication is valid and not expired
   * @param bufferMs - Buffer time in milliseconds to consider for expiry
   * @returns true if authentication is valid
   */
  isAuthenticationValid(bufferMs?: number): boolean;

  /**
   * Disposes resources used by the authentication handler
   */
  dispose(): void;
}
```

## Implementation Classes

### Token Credential Handler

```typescript
import type { TokenCredential, GetTokenOptions } from "@azure/core-auth";

/**
 * Authentication handler for Azure Active Directory using TokenCredential
 */
export class VoiceLiveTokenCredentialHandler implements VoiceLiveAuthenticationHandler {
  private readonly _credential: TokenCredential;
  private readonly _scope: string;
  private _context: VoiceLiveAuthenticationContext;
  private _refreshTimer?: NodeJS.Timeout;

  private static readonly DEFAULT_SCOPE = "https://cognitiveservices.azure.com/.default";
  private static readonly DEFAULT_REFRESH_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes

  constructor(
    credential: TokenCredential,
    scope: string = VoiceLiveTokenCredentialHandler.DEFAULT_SCOPE
  ) {
    this._credential = credential;
    this._scope = scope;
    this._context = {
      isRefreshing: false
    };
  }

  async authenticate(options?: VoiceLiveAuthenticationOptions): Promise<VoiceLiveAuthenticationResult> {
    if (this._context.isRefreshing) {
      throw new VoiceLiveAuthenticationError('Authentication is already in progress');
    }

    this._context.isRefreshing = true;
    this._context.lastError = undefined;

    try {
      const tokenOptions: GetTokenOptions = {
        scopes: [options?.scope || this._scope],
        abortSignal: undefined // Will be supported in future
      };

      const token = await this._credential.getToken(tokenOptions);
      
      if (!token) {
        throw new VoiceLiveAuthenticationError('Failed to acquire access token');
      }

      const result: VoiceLiveAuthenticationResult = {
        accessToken: token.token,
        expiresOn: new Date(token.expiresOnTimestamp),
        tokenType: 'Bearer'
      };

      this._context.current = result;
      this._context.expiresAt = result.expiresOn;
      this._scheduleTokenRefresh(options);

      return result;
    } catch (error) {
      const authError = error instanceof VoiceLiveAuthenticationError 
        ? error 
        : new VoiceLiveAuthenticationError(
            `Token credential authentication failed: ${error.message}`,
            error
          );
      
      this._context.lastError = authError;
      throw authError;
    } finally {
      this._context.isRefreshing = false;
    }
  }

  async refreshAuthentication(
    forceRefresh = false, 
    options?: VoiceLiveAuthenticationOptions
  ): Promise<VoiceLiveAuthenticationResult> {
    if (!forceRefresh && this.isAuthenticationValid(options?.refreshThresholdMs)) {
      return this._context.current!;
    }

    return this.authenticate({ ...options, isRefresh: true } as any);
  }

  getAuthenticationContext(): VoiceLiveAuthenticationContext {
    return { ...this._context };
  }

  isAuthenticationValid(bufferMs = VoiceLiveTokenCredentialHandler.DEFAULT_REFRESH_THRESHOLD_MS): boolean {
    if (!this._context.current || !this._context.expiresAt) {
      return false;
    }

    const now = new Date();
    const expiryWithBuffer = new Date(this._context.expiresAt.getTime() - bufferMs);
    
    return now < expiryWithBuffer;
  }

  dispose(): void {
    if (this._refreshTimer) {
      clearTimeout(this._refreshTimer);
      this._refreshTimer = undefined;
    }
    
    this._context = {
      isRefreshing: false
    };
  }

  private _scheduleTokenRefresh(options?: VoiceLiveAuthenticationOptions): void {
    if (!options?.enableAutoRefresh || options.enableAutoRefresh === false) {
      return;
    }

    if (this._refreshTimer) {
      clearTimeout(this._refreshTimer);
    }

    if (!this._context.expiresAt) {
      return;
    }

    const refreshThreshold = options?.refreshThresholdMs || 
                           VoiceLiveTokenCredentialHandler.DEFAULT_REFRESH_THRESHOLD_MS;
    const refreshTime = this._context.expiresAt.getTime() - refreshThreshold;
    const now = Date.now();
    const delayMs = Math.max(0, refreshTime - now);

    this._refreshTimer = setTimeout(async () => {
      try {
        await this.refreshAuthentication(true, options);
      } catch (error) {
        // Log error but don't throw - client can handle via authentication context
        console.warn('Automatic token refresh failed:', error);
      }
    }, delayMs);
  }
}
```

### Key Credential Handler

```typescript
import type { KeyCredential } from "@azure/core-auth";

/**
 * Authentication handler for API key authentication
 */
export class VoiceLiveKeyCredentialHandler implements VoiceLiveAuthenticationHandler {
  private readonly _credential: KeyCredential;
  private _context: VoiceLiveAuthenticationContext;

  constructor(credential: KeyCredential) {
    this._credential = credential;
    this._context = {
      isRefreshing: false,
      current: {
        accessToken: credential.key,
        tokenType: 'ApiKey'
      }
    };
  }

  async authenticate(options?: VoiceLiveAuthenticationOptions): Promise<VoiceLiveAuthenticationResult> {
    // API keys don't require authentication flow
    return this._context.current!;
  }

  async refreshAuthentication(
    forceRefresh = false, 
    options?: VoiceLiveAuthenticationOptions
  ): Promise<VoiceLiveAuthenticationResult> {
    // API keys don't require refresh, but update if key changed
    const currentKey = this._credential.key;
    
    if (this._context.current!.accessToken !== currentKey) {
      this._context.current = {
        accessToken: currentKey,
        tokenType: 'ApiKey',
        isRefresh: true
      };
    }

    return this._context.current!;
  }

  getAuthenticationContext(): VoiceLiveAuthenticationContext {
    return { ...this._context };
  }

  isAuthenticationValid(bufferMs?: number): boolean {
    // API keys are always valid unless explicitly invalidated
    return !!this._context.current && !!this._credential.key;
  }

  dispose(): void {
    // No cleanup needed for API key authentication
  }
}
```

### Authentication Factory

```typescript
/**
 * Factory for creating appropriate authentication handlers
 */
export class VoiceLiveAuthenticationFactory {
  /**
   * Creates authentication handler for TokenCredential
   * @param credential - Azure TokenCredential
   * @param scope - Optional custom scope
   * @returns TokenCredential-based authentication handler
   */
  static createTokenCredentialHandler(
    credential: TokenCredential,
    scope?: string
  ): VoiceLiveTokenCredentialHandler {
    return new VoiceLiveTokenCredentialHandler(credential, scope);
  }

  /**
   * Creates authentication handler for KeyCredential
   * @param credential - API key credential
   * @returns KeyCredential-based authentication handler
   */
  static createKeyCredentialHandler(
    credential: KeyCredential
  ): VoiceLiveKeyCredentialHandler {
    return new VoiceLiveKeyCredentialHandler(credential);
  }

  /**
   * Creates appropriate authentication handler based on credential type
   * @param credential - Either TokenCredential or KeyCredential
   * @param scope - Optional scope for TokenCredential
   * @returns Appropriate authentication handler
   */
  static createHandler(
    credential: TokenCredential | KeyCredential,
    scope?: string
  ): VoiceLiveAuthenticationHandler {
    if ('getToken' in credential) {
      return this.createTokenCredentialHandler(credential, scope);
    } else if ('key' in credential) {
      return this.createKeyCredentialHandler(credential);
    } else {
      throw new VoiceLiveAuthenticationError('Unsupported credential type');
    }
  }
}
```

## WebSocket Authentication Integration

### Connection URL Building

```typescript
/**
 * Utilities for building authenticated WebSocket URLs
 */
export class VoiceLiveConnectionBuilder {
  /**
   * Builds WebSocket connection URL with authentication
   * @param endpoint - Base Voice Live endpoint
   * @param authResult - Authentication result
   * @param apiVersion - API version to use
   * @returns Complete WebSocket URL with authentication
   */
  static buildConnectionUrl(
    endpoint: string,
    authResult: VoiceLiveAuthenticationResult,
    apiVersion: string = '2024-12-01-preview'
  ): string {
    const url = new URL(endpoint);
    
    // Convert HTTP(S) to WebSocket URL
    url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
    url.pathname = '/realtime';
    
    // Add query parameters
    url.searchParams.set('api-version', apiVersion);
    
    if (authResult.tokenType === 'ApiKey') {
      url.searchParams.set('api-key', authResult.accessToken);
    }
    
    return url.toString();
  }

  /**
   * Builds connection headers for WebSocket authentication
   * @param authResult - Authentication result
   * @returns Headers object for WebSocket connection
   */
  static buildConnectionHeaders(
    authResult: VoiceLiveAuthenticationResult
  ): Record<string, string> {
    const headers: Record<string, string> = {};
    
    if (authResult.tokenType === 'Bearer') {
      headers['Authorization'] = `Bearer ${authResult.accessToken}`;
    }
    
    headers['User-Agent'] = `azure-ai-voicelive-js/1.0.0-beta.1`;
    
    return headers;
  }

  /**
   * Builds WebSocket sub-protocols for Voice Live
   * @param authResult - Authentication result
   * @returns Array of WebSocket sub-protocols
   */
  static buildProtocols(
    authResult?: VoiceLiveAuthenticationResult
  ): string[] {
    const protocols = ['azure-voicelive-v1'];
    
    // Add authentication protocol if using API key in protocol
    if (authResult?.tokenType === 'ApiKey') {
      protocols.push(`azure-api-key.${authResult.accessToken}`);
    }
    
    return protocols;
  }
}
```

### Connection Manager Integration

```typescript
/**
 * Connection manager with authentication integration
 */
export class VoiceLiveConnectionManager {
  private readonly _authHandler: VoiceLiveAuthenticationHandler;
  private readonly _endpoint: string;
  private readonly _apiVersion: string;
  private _webSocket?: VoiceLiveWebSocketLike;

  constructor(
    endpoint: string,
    authHandler: VoiceLiveAuthenticationHandler,
    apiVersion: string = '2024-12-01-preview'
  ) {
    this._endpoint = endpoint;
    this._authHandler = authHandler;
    this._apiVersion = apiVersion;
  }

  async establishConnection(
    webSocketFactory: VoiceLiveWebSocketFactory,
    options?: ConnectOptions
  ): Promise<VoiceLiveWebSocketLike> {
    // Ensure we have valid authentication
    const authResult = await this._ensureValidAuthentication();
    
    // Build connection details
    const url = VoiceLiveConnectionBuilder.buildConnectionUrl(
      this._endpoint,
      authResult,
      this._apiVersion
    );
    
    const headers = VoiceLiveConnectionBuilder.buildConnectionHeaders(authResult);
    const protocols = VoiceLiveConnectionBuilder.buildProtocols(authResult);

    // Create and connect WebSocket
    const webSocket = webSocketFactory.createWebSocket();
    
    try {
      await webSocket.connect(url, protocols, headers, options?.abortSignal);
      this._webSocket = webSocket;
      
      // Set up authentication refresh monitoring
      this._setupAuthenticationMonitoring(webSocket);
      
      return webSocket;
    } catch (error) {
      throw new VoiceLiveConnectionError(
        `Failed to establish WebSocket connection: ${error.message}`,
        error
      );
    }
  }

  async refreshConnectionAuthentication(): Promise<void> {
    if (!this._webSocket || !this._webSocket.isConnected) {
      throw new VoiceLiveConnectionError('No active connection to refresh');
    }

    try {
      await this._authHandler.refreshAuthentication(true);
      // Note: WebSocket connection may need to be re-established
      // depending on the authentication method and service requirements
    } catch (error) {
      throw new VoiceLiveAuthenticationError(
        `Failed to refresh connection authentication: ${error.message}`,
        error
      );
    }
  }

  private async _ensureValidAuthentication(): Promise<VoiceLiveAuthenticationResult> {
    if (!this._authHandler.isAuthenticationValid()) {
      return await this._authHandler.authenticate();
    }
    
    return this._authHandler.getAuthenticationContext().current!;
  }

  private _setupAuthenticationMonitoring(webSocket: VoiceLiveWebSocketLike): void {
    // Monitor for authentication-related WebSocket errors
    webSocket.onError((error) => {
      // Check if error is authentication-related
      if (this._isAuthenticationError(error)) {
        this._handleAuthenticationError(error);
      }
    });

    webSocket.onClose((code, reason) => {
      // Check if close is authentication-related
      if (this._isAuthenticationCloseCode(code)) {
        this._handleAuthenticationClose(code, reason);
      }
    });
  }

  private _isAuthenticationError(error: Error): boolean {
    const message = error.message.toLowerCase();
    return message.includes('unauthorized') || 
           message.includes('forbidden') ||
           message.includes('authentication') ||
           message.includes('access denied');
  }

  private _isAuthenticationCloseCode(code: number): boolean {
    // WebSocket close codes that indicate authentication issues
    return code === 1002 || // Protocol error (auth)
           code === 1003 || // Unsupported data (auth)
           code === 1008 || // Policy violation (auth)
           code === 4001 || // Custom auth error
           code === 4003;   // Custom forbidden
  }

  private _handleAuthenticationError(error: Error): void {
    // Emit authentication error event to client
    // The client can then decide to refresh authentication and reconnect
  }

  private _handleAuthenticationClose(code: number, reason: string): void {
    // Handle authentication-related connection closure
    // May trigger automatic reauthentication and reconnection
  }
}
```

## Error Handling

### Authentication Error Types

```typescript
/**
 * Base authentication error
 */
export class VoiceLiveAuthenticationError extends Error {
  constructor(
    message: string,
    public readonly originalError?: Error,
    public readonly errorCode?: string
  ) {
    super(message);
    this.name = 'VoiceLiveAuthenticationError';
  }
}

/**
 * Token acquisition failed
 */
export class VoiceLiveTokenAcquisitionError extends VoiceLiveAuthenticationError {
  constructor(message: string, originalError?: Error) {
    super(message, originalError, 'TOKEN_ACQUISITION_FAILED');
    this.name = 'VoiceLiveTokenAcquisitionError';
  }
}

/**
 * Token refresh failed
 */
export class VoiceLiveTokenRefreshError extends VoiceLiveAuthenticationError {
  constructor(message: string, originalError?: Error) {
    super(message, originalError, 'TOKEN_REFRESH_FAILED');
    this.name = 'VoiceLiveTokenRefreshError';
  }
}

/**
 * Authentication expired
 */
export class VoiceLiveAuthenticationExpiredError extends VoiceLiveAuthenticationError {
  constructor(message: string = 'Authentication has expired') {
    super(message, undefined, 'AUTHENTICATION_EXPIRED');
    this.name = 'VoiceLiveAuthenticationExpiredError';
  }
}

/**
 * Connection authentication failed
 */
export class VoiceLiveConnectionError extends Error {
  constructor(message: string, public readonly originalError?: Error) {
    super(message);
    this.name = 'VoiceLiveConnectionError';
  }
}
```

## Integration with Main Client

### Client Authentication Integration

```typescript
// In VoiceLiveClient constructor
export class VoiceLiveClient {
  private readonly _authHandler: VoiceLiveAuthenticationHandler;
  private readonly _connectionManager: VoiceLiveConnectionManager;

  constructor(
    endpoint: string,
    credential: TokenCredential | KeyCredential,
    options: VoiceLiveClientOptions = {}
  ) {
    // ... other initialization

    // Create authentication handler
    this._authHandler = VoiceLiveAuthenticationFactory.createHandler(
      credential,
      options.authenticationScope
    );

    // Create connection manager
    this._connectionManager = new VoiceLiveConnectionManager(
      endpoint,
      this._authHandler,
      options.apiVersion
    );
  }

  async connect(options?: ConnectOptions): Promise<void> {
    try {
      const webSocket = await this._connectionManager.establishConnection(
        this._webSocketFactory,
        options
      );

      this._webSocket = webSocket;
      this._setupWebSocketEventHandlers(webSocket);
      
      // ... rest of connection logic
    } catch (error) {
      if (error instanceof VoiceLiveAuthenticationError) {
        this._emitEvent('error', {
          error,
          context: 'authentication',
          recoverable: true
        });
      }
      throw error;
    }
  }

  async refreshAuthentication(): Promise<void> {
    try {
      await this._connectionManager.refreshConnectionAuthentication();
    } catch (error) {
      this._emitEvent('error', {
        error: error instanceof Error ? error : new Error(String(error)),
        context: 'authentication_refresh',
        recoverable: true
      });
      throw error;
    }
  }

  get authenticationContext(): VoiceLiveAuthenticationContext {
    return this._authHandler.getAuthenticationContext();
  }
}
```

## Usage Examples

### Token Credential Authentication

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { VoiceLiveClient } from "@azure/ai-voicelive";

const credential = new DefaultAzureCredential();
const client = new VoiceLiveClient(
  "https://my-voicelive.cognitiveservices.azure.com",
  credential,
  {
    authenticationScope: "https://cognitiveservices.azure.com/.default",
    enableAutoRefresh: true
  }
);

await client.connect();
```

### API Key Authentication

```typescript
import { AzureKeyCredential } from "@azure/core-auth";
import { VoiceLiveClient } from "@azure/ai-voicelive";

const credential = new AzureKeyCredential("your-api-key");
const client = new VoiceLiveClient(
  "https://my-voicelive.cognitiveservices.azure.com",
  credential
);

await client.connect();
```

### Manual Authentication Refresh

```typescript
// Check authentication status
const authContext = client.authenticationContext;
if (!client.authenticationContext.current || authContext.lastError) {
  // Refresh authentication
  await client.refreshAuthentication();
}
```

## Benefits of This Design

1. **Azure SDK Compliance** - Follows established Azure SDK authentication patterns
2. **Multiple Auth Methods** - Supports both Azure AD and API key authentication
3. **Automatic Refresh** - Handles token lifecycle automatically
4. **Error Resilience** - Comprehensive error handling with recovery options
5. **WebSocket Integration** - Seamless authentication with WebSocket connections
6. **Type Safety** - Full TypeScript support with proper type definitions
7. **Testability** - Easy to mock and test authentication scenarios
8. **Extensibility** - Easy to add new authentication methods

## Security Considerations

1. **Token Storage** - Tokens are kept in memory only, not persisted
2. **Token Refresh** - Automatic refresh prevents long-lived token exposure
3. **Error Handling** - Authentication errors don't expose sensitive information
4. **Connection Security** - WebSocket connections use secure protocols (WSS)
5. **Header Security** - Authorization headers properly formatted and transmitted
6. **Scope Validation** - Proper scope validation for Azure AD tokens

## Future Enhancements

1. **Managed Identity** - Support for Azure Managed Identity
2. **Certificate Authentication** - Support for certificate-based authentication
3. **Custom Authentication** - Pluggable authentication providers
4. **Token Caching** - Optional secure token caching mechanisms
5. **Multi-Tenant** - Support for multi-tenant authentication scenarios
6. **Conditional Access** - Support for Azure Conditional Access policies