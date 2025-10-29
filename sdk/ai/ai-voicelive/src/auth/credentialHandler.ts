// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential, AccessToken } from '@azure/core-auth';
import { VoiceLiveAuthenticationError, VoiceLiveErrorCodes } from '../errors/index.js';
import { logger } from '../logger.js';

/**
 * Handles Azure credential authentication for Voice Live service
 */
export class CredentialHandler {
  private _accessToken?: AccessToken;
  private readonly _scope: string;
  private readonly _tokenRefreshBuffer = 5 * 60 * 1000; // 5 minutes

  constructor(
    private _credential?: TokenCredential,
    scope?: string
  ) {
    // Voice Live specific scope - may need adjustment based on actual service
    this._scope = scope || 'https://cognitiveservices.azure.com/.default';
  }

  /**
   * Gets a valid access token, refreshing if necessary
   */
  async getAccessToken(): Promise<string> {
    if (!this._credential) {
      throw new VoiceLiveAuthenticationError(
        'No credential provided for authentication',
        VoiceLiveErrorCodes.INVALID_CREDENTIALS
      );
    }

    // Check if current token is still valid
    if (this._accessToken && this._isTokenValid(this._accessToken)) {
      return this._accessToken.token;
    }

    try {
      logger.info('Acquiring new access token', { scope: this._scope });
      
      // Get new token from credential
      const tokenResponse = await this._credential.getToken(this._scope);
      
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
  async getWebSocketUrl(baseEndpoint: string, apiVersion: string): Promise<string> {
    const token = await this.getAccessToken();
    
    const url = new URL(baseEndpoint);
    url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
    url.pathname = '/realtime'; // Voice Live WebSocket endpoint path
    url.searchParams.set('api-version', apiVersion);
    url.searchParams.set('access_token', token);
    
    return url.toString();
  }

  /**
   * Gets authentication headers for the WebSocket connection
   */
  async getAuthHeaders(): Promise<Record<string, string>> {
    const token = await this.getAccessToken();
    
    return {
      'Authorization': `Bearer ${token}`,
      'X-MS-Client-Request-ID': this._generateRequestId(),
      'User-Agent': 'Azure-Voice-Live-SDK-JS/1.0.0'
    };
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