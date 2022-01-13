// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken } from "@azure/core-auth";

/**
 * Defines the default token refresh buffer duration.
 */
export const TokenRefreshBufferMs = 2 * 60 * 1000; // 2 Minutes

/**
 * Provides a cache for an AccessToken that was that
 * was returned from a TokenCredential.
 */
export interface AccessTokenCache {
  /**
   * Sets the cached token.
   *
   * @param accessToken - The {@link AccessToken} to be cached or null to
   *        clear the cached token.
   */
  setCachedToken(accessToken: AccessToken | undefined): void;

  /**
   * Returns the cached {@link AccessToken} or undefined if nothing is cached.
   */
  getCachedToken(): AccessToken | undefined;
}

/**
 * Provides an {@link AccessTokenCache} implementation which clears
 * the cached {@link AccessToken}'s after the expiresOnTimestamp has
 * passed.
 *
 * @deprecated No longer used in the bearer authorization policy.
 */
export class ExpiringAccessTokenCache implements AccessTokenCache {
  private tokenRefreshBufferMs: number;
  private cachedToken?: AccessToken = undefined;

  /**
   * Constructs an instance of {@link ExpiringAccessTokenCache} with
   * an optional expiration buffer time.
   */
  constructor(tokenRefreshBufferMs: number = TokenRefreshBufferMs) {
    this.tokenRefreshBufferMs = tokenRefreshBufferMs;
  }

  /**
   * Saves an access token into the internal in-memory cache.
   * @param accessToken - Access token or undefined to clear the cache.
   */
  setCachedToken(accessToken: AccessToken | undefined): void {
    this.cachedToken = accessToken;
  }

  /**
   * Returns the cached access token, or `undefined` if one is not cached or the cached one is expiring soon.
   */
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
