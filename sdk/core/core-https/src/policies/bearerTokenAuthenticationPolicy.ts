// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
import { ExpiringAccessTokenCache } from "../accessTokenCache";
import { delay } from "../util/helpers";

/**
 * The programmatic identifier of the bearerTokenAuthenticationPolicy.
 */
export const bearerTokenAuthenticationPolicyName = "bearerTokenAuthenticationPolicy";

/**
 * Options to configure the bearerTokenAuthenticationPolicy
 */
export interface BearerTokenAuthenticationPolicyOptions {
  /**
   * The TokenCredential implementation that can supply the bearer token.
   */
  credential: TokenCredential;
  /**
   * The scopes for which the bearer token applies.
   */
  scopes: string | string[];
  /**
   * Number of milliseconds before the token expires, during which we start triggering refreshes.
   */
  beforeTokenExpiresInMs?: number;
  /**
   * Interval between token refreshes until the token expires. Defaults to 30 seconds.
   */
  tokenRefreshIntervalInMs?: number;
}

/**
 * Default interval between token refreshes until the token expires.
 */
export const DefaultTokenRefreshIntervalInMs = 30000;

/**
 * A policy that can request a token from a TokenCredential implementation and
 * then apply it to the Authorization header of a request as a Bearer token.
 */
export function bearerTokenAuthenticationPolicy(
  options: BearerTokenAuthenticationPolicyOptions
): PipelinePolicy {
  const { credential, scopes } = options;
  const tokenCache: ExpiringAccessTokenCache = new ExpiringAccessTokenCache(
    options.beforeTokenExpiresInMs
  );

  let refreshPromise: Promise<AccessToken | undefined> | undefined;

  let refreshAttemptsBufferMs = options.tokenRefreshIntervalInMs ?? DefaultTokenRefreshIntervalInMs;

  // When the refresh buffer is hit, we trigger this refresher
  // which tries to update the token every so often.
  // The delay of the refreshes is defined by the `refreshAttemptsBufferMs`
  async function refresher(tokenOptions: GetTokenOptions): Promise<AccessToken | undefined> {
    // If the cached token expired, we should stop refreshing the token.
    while (tokenCache.isTokenValid()) {
      const token = await credential.getToken(scopes, tokenOptions);
      if (token) {
        refreshPromise = undefined;
        return token;
      }
      await delay(refreshAttemptsBufferMs);
    }
    refreshPromise = undefined;
    return;
  }

  async function getToken(tokenOptions: GetTokenOptions): Promise<string | undefined> {
    if (!refreshPromise && tokenCache.isReadyToRefresh()) {
      refreshPromise = refresher(tokenOptions);
    }

    let accessToken = tokenCache.getCachedToken();
    if (accessToken === undefined) {
      if (refreshPromise) {
        accessToken = await refreshPromise;
      } else {
        accessToken = (await credential.getToken(scopes, tokenOptions)) || undefined;
      }
      tokenCache.setCachedToken(accessToken);
    }
    return accessToken ? accessToken.token : undefined;
  }

  return {
    name: bearerTokenAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const token = await getToken({
        abortSignal: request.abortSignal,
        tracingOptions: {
          spanOptions: request.spanOptions
        }
      });
      request.headers.set("Authorization", `Bearer ${token}`);
      return next(request);
    }
  };
}
