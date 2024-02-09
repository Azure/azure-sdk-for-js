// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken } from "./auth/tokenCredential";

/**
 * Defines the default token refresh buffer duration.
 */
export const DefaultTokenRefreshBufferMs = 2 * 60 * 1000; // 2 Minutes

/**
 * Provides a cache for an AccessToken that was that
 * was returned from a TokenCredential.
 */
export interface AccessTokenCache {
  /**
   * Sets the cached token.
   *
   * @param accessToken - The AccessToken to be cached or null to
   *   clear the cached token.
   */
  setCachedToken(accessToken: AccessToken | undefined): void;

  /**
   * Returns the cached AccessToken or undefined if nothing is cached.
   */
  getCachedToken(): AccessToken | undefined;
}

/**
 * Provides an AccessTokenCache implementation which clears
 * the cached AccessToken's after the expiresOnTimestamp has
 * passed.
 * @internal
 */
export class ExpiringAccessTokenCache implements AccessTokenCache {
  private tokenRefreshBufferMs: number;
  private cachedToken?: AccessToken;

  /**
   * Constructs an instance of ExpiringAccessTokenCache with
   * an optional expiration buffer time.
   */
  constructor(tokenRefreshBufferMs: number = DefaultTokenRefreshBufferMs) {
    this.tokenRefreshBufferMs = tokenRefreshBufferMs;
  }

  setCachedToken(accessToken: AccessToken | undefined): void {
    this.cachedToken = accessToken;
  }

  getCachedToken(): AccessToken | undefined {
    if (
      this.cachedToken &&
      Date.now() + this.tokenRefreshBufferMs >= this.cachedToken.expiresOnTimestamp
    ) {
      this.cachedToken = undefined;
    }

    return this.cachedToken;
  }
}
