// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "../auth/tokenCredential.js";
import type { PipelineRequest, PipelineResponse, SendRequest } from "../interfaces.js";
import type { PipelinePolicy } from "../pipeline.js";

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
  options: BearerTokenAuthenticationPolicyOptions,
): PipelinePolicy {
  const { credential, scopes } = options;

  const getAccessToken = credential ? credential.getToken : () => Promise.resolve(undefined);
  return {
    name: bearerTokenAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if ( request.allowInsecureConnection != true && !request.url.toLowerCase().startsWith("https://")) {
        throw new Error(
          "Bearer token authentication is not permitted for non-TLS protected (non-https) URLs when allowInsecureConnection is false.",
        );
      }
      const accessToken = await getAccessToken(scopes);

      if (accessToken) {
        request.headers.set("Authorization", `Bearer ${accessToken.token}`);
      }

      return next(request);
    },
  };
}
