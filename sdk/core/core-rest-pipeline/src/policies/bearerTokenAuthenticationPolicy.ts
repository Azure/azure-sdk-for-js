// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { TokenCredential } from "@azure/core-auth";
import { createTokenCycler } from "../util/tokenCycler";

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

  // This function encapsulates the entire process of reliably retrieving the token
  // The options are left out of the public API until there's demand to configure this.
  // Remember to extend `BearerTokenAuthenticationPolicyOptions` with `TokenCyclerOptions`
  // in order to pass through the `options` object.
  const getToken = createTokenCycler(credential, scopes /* , options */);

  return {
    name: bearerTokenAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const { token } = await getToken({
        abortSignal: request.abortSignal,
        tracingOptions: request.tracingOptions
      });
      request.headers.set("Authorization", `Bearer ${token}`);
      return next(request);
    }
  };
}
