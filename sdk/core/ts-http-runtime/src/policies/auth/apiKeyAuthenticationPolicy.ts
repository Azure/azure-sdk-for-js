// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiKeyCredential } from "../../auth/credentials.js";
import type { AuthScheme } from "../../auth/schemes.js";
import type { PipelineRequest, PipelineResponse, SendRequest } from "../../interfaces.js";
import type { PipelinePolicy } from "../../pipeline.js";
import { ensureSecureConnection } from "./checkInsecureConnection.js";

/**
 * Name of the API Key Authentication Policy
 */
export const apiKeyAuthenticationPolicyName = "apiKeyAuthenticationPolicy";

/**
 * Options for configuring the API key authentication policy
 */
export interface ApiKeyAuthenticationPolicyOptions {
  /**
   * The credential used to authenticate requests
   */
  credential: ApiKeyCredential;
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
 * Gets a pipeline policy that adds API key authentication to requests
 */
export function apiKeyAuthenticationPolicy(
  options: ApiKeyAuthenticationPolicyOptions,
): PipelinePolicy {
  return {
    name: apiKeyAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      // Ensure allowInsecureConnection is explicitly set when sending request to non-https URLs
      ensureSecureConnection(request, options);

      const scheme = (request.authSchemes ?? options.authSchemes)?.find((x) => x.type === "apiKey");

      // Skip adding authentication header if no API key authentication scheme is found
      if (!scheme) {
        return next(request);
      }
      if (scheme.apiKeyLocation !== "header") {
        throw new Error(`Unsupported API key location: ${scheme.apiKeyLocation}`);
      }

      request.headers.set(scheme.name, options.credential.key);
      return next(request);
    },
  };
}
