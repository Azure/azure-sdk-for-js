// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BasicCredential } from "../../auth/credentials.js";
import type { AuthScheme } from "../../auth/schemes.js";
import type { PipelineRequest, PipelineResponse, SendRequest } from "../../interfaces.js";
import type { PipelinePolicy } from "../../pipeline.js";
import { stringToUint8Array, uint8ArrayToString } from "../../util/bytesEncoding.js";
import { ensureSecureConnection } from "./checkInsecureConnection.js";

/**
 * Name of the Basic Authentication Policy
 */
export const basicAuthenticationPolicyName = "bearerAuthenticationPolicy";

/**
 * Options for configuring the basic authentication policy
 */
export interface BasicAuthenticationPolicyOptions {
  /**
   * The credential used to authenticate requests
   */
  credential: BasicCredential;
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
 * Gets a pipeline policy that adds basic authentication to requests
 */
export function basicAuthenticationPolicy(
  options: BasicAuthenticationPolicyOptions,
): PipelinePolicy {
  return {
    name: basicAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      // Ensure allowInsecureConnection is explicitly set when sending request to non-https URLs
      ensureSecureConnection(request, options);

      const scheme = (request.authSchemes ?? options.authSchemes)?.find(
        (x) => x.type === "http" && x.scheme === "basic",
      );

      // Skip adding authentication header if no basic authentication scheme is found
      if (!scheme) {
        return next(request);
      }

      const { username, password } = options.credential;
      const headerValue = uint8ArrayToString(
        stringToUint8Array(`${username}:${password}`, "utf-8"),
        "base64",
      );
      request.headers.set("Authorization", `Basic ${headerValue}`);
      return next(request);
    },
  };
}
