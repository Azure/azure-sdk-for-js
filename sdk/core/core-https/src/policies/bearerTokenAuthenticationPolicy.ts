// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { TokenCredential, GetTokenOptions } from "@azure/core-auth";
import { AccessTokenCache, ExpiringAccessTokenCache } from "../accessTokenCache";

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
}

/**
 * A policy that can request a token from a TokenCredential implementation and
 * then apply it to the Authorization header of a request as a Bearer token.
 */
export function bearerTokenAuthenticationPolicy(
  options: BearerTokenAuthenticationPolicyOptions
): PipelinePolicy {
  const { credential, scopes } = options;
  const tokenCache: AccessTokenCache = new ExpiringAccessTokenCache();
  async function getToken(options: GetTokenOptions): Promise<string | undefined> {
    let accessToken = tokenCache.getCachedToken();
    if (accessToken === undefined) {
      accessToken = (await credential.getToken(scopes, options)) || undefined;
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
