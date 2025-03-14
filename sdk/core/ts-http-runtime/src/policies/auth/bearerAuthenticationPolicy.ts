// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BearerTokenCredential } from "../../auth/credentials.js";
import type { AuthScheme } from "../../auth/schemes.js";
import type { PipelineRequest, PipelineResponse, SendRequest } from "../../interfaces.js";
import type { PipelinePolicy } from "../../pipeline.js";
import { ensureSecureConnection } from "./checkInsecureConnection.js";

/**
 * Name of the Bearer Authentication Policy
 */
export const bearerAuthenticationPolicyName = "bearerAuthenticationPolicy";

/**
 * Options for configuring the bearer authentication policy
 */
export interface BearerAuthenticationPolicyOptions {
  /**
   * The BearerTokenCredential implementation that can supply the bearer token.
   */
  credential: BearerTokenCredential;
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
 * Gets a pipeline policy that adds bearer token authentication to requests
 */
export function bearerAuthenticationPolicy(
  options: BearerAuthenticationPolicyOptions,
): PipelinePolicy {
  return {
    name: bearerAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      // Ensure allowInsecureConnection is explicitly set when sending request to non-https URLs
      ensureSecureConnection(request, options);

      const scheme = (request.authSchemes ?? options.authSchemes)?.find(
        (x) => x.type === "http" && x.scheme === "bearer",
      );

      // Skip adding authentication header if no bearer authentication scheme is found
      if (!scheme) {
        return next(request);
      }

      const token = await options.credential.getBearerToken({
        abortSignal: request.abortSignal,
      });
      request.headers.set("Authorization", `Bearer ${token}`);
      return next(request);
    },
  };
}
