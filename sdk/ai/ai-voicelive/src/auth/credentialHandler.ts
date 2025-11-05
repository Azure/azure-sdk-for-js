// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential, KeyCredential, AccessToken } from '@azure/core-auth';
import { VoiceLiveAuthenticationError, VoiceLiveErrorCodes } from '../errors/index.js';
import { logger } from '../logger.js';

/**
 * Union type for supported credential types
 */
export type VoiceLiveCredential = TokenCredential | KeyCredential;

/**
 * Type guard to check if credential is a KeyCredential
 */
function isKeyCredential(credential: VoiceLiveCredential): credential is KeyCredential {
  return 'key' in credential && typeof (credential as KeyCredential).key === 'string';
}

/**
 * Handles both Azure TokenCredential and KeyCredential authentication for Voice Live service
 */
export class CredentialHandler {
  private _accessToken?: AccessToken;
  private readonly _scope: string;
  private readonly _tokenRefreshBuffer = 5 * 60 * 1000; // 5 minutes
  private readonly _credential: VoiceLiveCredential;
  private readonly _isApiKey: boolean;

  constructor(
    credential: VoiceLiveCredential,
    scope?: string
  ) {
    this._credential = credential;
    this._isApiKey = isKeyCredential(credential);
    
    // Voice Live specific scope - may need adjustment based on actual service
    this._scope = scope || 'https://cognitiveservices.azure.com/.default';
    
    logger.info('CredentialHandler initialized', { 
      credentialType: this._isApiKey ? 'KeyCredential' : 'TokenCredential',
      scope: this._scope 
    });
  }

  /**
   * Gets a valid access token or API key, refreshing if necessary
   */
  async getAccessToken(): Promise<string> {
    // For API Key credentials, return the key directly
    if (this._isApiKey) {
      const keyCredential = this._credential as KeyCredential;
      logger.info('Using API key for authentication');
      return keyCredential.key;
    }

    // For Token credentials, handle token lifecycle
    const tokenCredential = this._credential as TokenCredential;

    // Check if current token is still valid
    if (this._accessToken && this._isTokenValid(this._accessToken)) {
      return this._accessToken.token;
    }

    try {
      logger.info('Acquiring new access token', { scope: this._scope });
      
      // Get new token from credential
      const tokenResponse = await tokenCredential.getToken(this._scope);
      
      if (!tokenResponse) {
        throw new VoiceLiveAuthenticationError(
          'Failed to acquire access token - credential returned null',
          VoiceLiveErrorCodes.AUTHENTICATION_FAILED
        );
      }

      this._accessToken = tokenResponse;

      logger.info('Successfully acquired access token', { 
        expiresAt: new Date(this._accessToken.expiresOnTimestamp)
      });
      
      return this._accessToken.token;
      
    } catch (error) {
      logger.error('Failed to obtain access token', { error, scope: this._scope });
      
      if (error instanceof VoiceLiveAuthenticationError) {
        throw error;
      }
      
      throw new VoiceLiveAuthenticationError(
        `Failed to obtain access token: ${error instanceof Error ? error.message : 'Unknown error'}`,
        VoiceLiveErrorCodes.AUTHENTICATION_FAILED,
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Builds the WebSocket URL with authentication
   */
  async getWebSocketUrl(baseEndpoint: string, apiVersion: string, model?: string): Promise<string> {
    const authValue = await this.getAccessToken();
    
    const url = new URL(baseEndpoint);
    url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
    url.pathname = '/voice-live/realtime'; // Voice Live WebSocket endpoint path
    url.searchParams.set('api-version', apiVersion);
    
    // Add model parameter if provided
    if (model) {
      url.searchParams.set('model', model);
    }
    
    // For API keys, add as query parameter
    if (this._isApiKey) {
      url.searchParams.set('api-key', authValue);
    } else {
      // For tokens, we'll use headers instead of query params
      // The token will be added in getAuthHeaders()
    }
    
    return url.toString();
  }

  /**
   * Gets authentication headers for the WebSocket connection
   */
  async getAuthHeaders(): Promise<Record<string, string>> {
    const authValue = await this.getAccessToken();
    
    const headers: Record<string, string> = {
      'X-MS-Client-Request-ID': this._generateRequestId(),
      'User-Agent': 'Azure-Voice-Live-SDK-JS/1.0.0'
    };

    // Add appropriate authentication header based on credential type
    if (this._isApiKey) {
      // For API keys, use the X-API-Key header or similar
      headers['api-key'] = authValue;
    } else {
      // For tokens, use standard Bearer authorization
      headers['Authorization'] = `Bearer ${authValue}`;
    }
    
    return headers;
  }

  /**
   * Returns the type of credential being used
   */
  get credentialType(): 'key' | 'token' {
    return this._isApiKey ? 'key' : 'token';
  }

  /**
   * Returns whether this is using an API key credential
   */
  get isApiKey(): boolean {
    return this._isApiKey;
  }

  /**
   * For API key credentials, allows updating the key
   */
  updateApiKey(newKey: string): void {
    if (!this._isApiKey) {
      throw new VoiceLiveAuthenticationError(
        'Cannot update API key on TokenCredential',
        VoiceLiveErrorCodes.INVALID_CREDENTIALS
      );
    }
    
    const keyCredential = this._credential as KeyCredential;
    if ('update' in keyCredential && typeof keyCredential.update === 'function') {
      keyCredential.update(newKey);
      logger.info('API key updated');
    } else {
      throw new VoiceLiveAuthenticationError(
        'KeyCredential does not support key updates',
        VoiceLiveErrorCodes.INVALID_CREDENTIALS
      );
    }
  }

  private _isTokenValid(token: AccessToken): boolean {
    const expiresAt = token.expiresOnTimestamp;
    const now = Date.now();
    return expiresAt > (now + this._tokenRefreshBuffer);
  }

  private _generateRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
