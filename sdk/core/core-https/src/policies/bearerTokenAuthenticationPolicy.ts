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
   * Number of milliseconds before the token expire from which we start triggering refreshes.
   */
  tokenRefreshBufferMs?: number;
  /**
   * To avoid too many refresh requests, we make new refresh requests only after this time. Defaults to 30 seconds.
   */
  refreshAttemptsBufferMs?: number;
}

/**
 * A policy that can request a token from a TokenCredential implementation and
 * then apply it to the Authorization header of a request as a Bearer token.
 */
export function bearerTokenAuthenticationPolicy(
  options: BearerTokenAuthenticationPolicyOptions
): PipelinePolicy {
  const { credential, scopes } = options;
  const tokenCache: ExpiringAccessTokenCache = new ExpiringAccessTokenCache(
    options.tokenRefreshBufferMs
  );

  let refreshPromise: Promise<AccessToken | null> | undefined;

  let refreshAttemptsBufferMs = options.refreshAttemptsBufferMs ?? 30000;

  // When the refresh buffer is hit, we trigger this refresher
  // which tries to update the token every so often.
  // The delay of the refreshes is defined by the `refreshAttemptsBufferMs`
  async function refresher(tokenOptions: GetTokenOptions): Promise<AccessToken | null> {
    // If the cached token expired, we should stop refreshing the token.
    while (!tokenCache.isExpired()) {
      const token = await credential.getToken(scopes, tokenOptions);
      if (token) {
        return token;
      }
      await delay(refreshAttemptsBufferMs);
    }
    return null;
  }

  async function getToken(tokenOptions: GetTokenOptions): Promise<string | undefined> {
    if (tokenCache.readyToRefresh()) {
      refreshPromise = refresher(tokenOptions);
    }
    let accessToken = tokenCache.getCachedToken();
    if (accessToken === undefined) {
      if (!refreshPromise) {
        refreshPromise = credential.getToken(scopes, tokenOptions);
      }
      accessToken = (await refreshPromise) || undefined;
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
