// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OAuth2Flow } from "../../auth/authFlows.js";
import type { OAuth2TokenCredential } from "../../auth/credentials.js";
import type { AuthScheme } from "../../auth/schemes.js";
import type { PipelineRequest, PipelineResponse, SendRequest } from "../../interfaces.js";
import type { PipelinePolicy } from "../../pipeline.js";
import {
  allowInsecureConnection,
  emitInsecureConnectionWarning,
} from "./checkInsecureConnection.js";

/**
 * Name of the OAuth2 Authentication Policy
 */
export const oauth2AuthenticationPolicyName = "oauth2AuthenticationPolicy";

/**
 * Options for configuring the OAuth2 authentication policy
 */
export interface OAuth2AuthenticationPolicyOptions<TFlows extends OAuth2Flow> {
  /**
   * The OAuth2TokenCredential implementation that can supply the bearer token.
   */
  credential: OAuth2TokenCredential<TFlows>;
  /**
   * Optional authentication schemes to use. If not provided, schemes from the request will be used.
   */
  authSchemes?: AuthScheme[];
  /**
   * Allows for connecting to HTTP endpoints instead of enforcing HTTPS.
   * CAUTION: Never use this option in production.
   */
  allowInsecureConnection?: boolean;
}

/**
 * Gets a pipeline policy that adds authorization header from OAuth2 schemes
 */
export function oauth2AuthenticationPolicy<TFlows extends OAuth2Flow>(
  options: OAuth2AuthenticationPolicyOptions<TFlows>,
): PipelinePolicy {
  return {
    name: oauth2AuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      // Ensure allowInsecureConnection is explicitly set when sending request to non-https URLs
      if (allowInsecureConnection(request, options)) {
        emitInsecureConnectionWarning();
      } else {
        throw new Error(
          "OAuth2 token authentication is not permitted for non-TLS protected (non-https) URLs when allowInsecureConnection is false.",
        );
      }

      const scheme = (request.authSchemes ?? options.authSchemes)?.find((x) => x.type === "oauth2");

      // Skip adding authentication header if no OAuth2 authentication scheme is found
      if (!scheme) {
        return next(request);
      }
      const token = await options.credential.getOAuth2Token(scheme.flows as TFlows[], {
        abortSignal: request.abortSignal,
      });
      request.headers.set("Authorization", `Bearer ${token}`);
      return next(request);
    },
  };
}
