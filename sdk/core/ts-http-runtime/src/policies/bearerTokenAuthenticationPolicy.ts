// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential, OAuth2Flow } from "../auth/tokenCredential.js";
import type { PipelineRequest, PipelineResponse, SendRequest } from "../interfaces.js";
import type { PipelinePolicy } from "../pipeline.js";
import { logger as coreLogger } from "../log.js";

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
   * Allows for connecting to HTTP endpoints instead of enforcing HTTPS.
   * CAUTION: Never use this option in production.
   */
  allowInsecureConnection?: boolean;
  /**
   * The authentication flows supported by this policy.
   */
  authFlows?: OAuth2Flow[];
}

/**
 * Checks if the request is allowed to be sent over an insecure connection.
 *
 * A request is allowed to be sent over an insecure connection when:
 * - The `allowInsecureConnection` option is set to `true`.
 * - The request has the `allowInsecureConnection` property set to `true`.
 * - The request is being sent to `localhost` or `127.0.0.1`
 */
function allowInsecureConnection(
  request: PipelineRequest,
  options: BearerTokenAuthenticationPolicyOptions,
): boolean {
  if (options.allowInsecureConnection && request.allowInsecureConnection) {
    const url = new URL(request.url);
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      return true;
    }
  }

  return false;
}

/**
 * Logs a warning about sending a bearer token over an insecure connection.
 *
 * This function will emit a node warning once, but log the warning every time.
 */
function emitInsecureConnectionWarning(): void {
  const warning =
    "Sending bearer token over insecure transport. Assume any token issued is compromised.";

  coreLogger.warning(warning);

  if (typeof process?.emitWarning === "function" && !emitInsecureConnectionWarning.warned) {
    emitInsecureConnectionWarning.warned = true;
    process.emitWarning(warning);
  }
}

emitInsecureConnectionWarning.warned = false; // Prime TypeScript to allow the property. Used to only emit warning once.

/**
 * A policy that can request a token from a TokenCredential implementation and
 * then apply it to the Authorization header of a request as a Bearer token.
 */
export function bearerTokenAuthenticationPolicy(
  options: BearerTokenAuthenticationPolicyOptions,
): PipelinePolicy {
  const { credential, authFlows } = options;
  const getAccessToken = credential.getToken;
  return {
    name: bearerTokenAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      // Ensure allowInsecureConnection is explicitly set when sending request to non-https URLs
      if (!request.url.toLowerCase().startsWith("https://")) {
        if (allowInsecureConnection(request, options)) {
          emitInsecureConnectionWarning();
        } else {
          throw new Error(
            "Bearer token authentication is not permitted for non-TLS protected (non-https) URLs when allowInsecureConnection is false.",
          );
        }
      }
      // TODO: Check if the scopes is provided for the request
      
      const getAccessTokenOptions = {
        abortSignal: request.abortSignal,
        authFlows: request.authFlows?? authFlows,
      };
      const accessToken = await getAccessToken(getAccessTokenOptions);
      request.headers.set("Authorization", `Bearer ${accessToken.token}`);

      return next(request);
    },
  };
}
