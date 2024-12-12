// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  RequestBodyType,
  SendRequest,
} from "@azure/core-rest-pipeline";
import type { WWWAuthenticate } from "./parseWWWAuthenticate.js";
import { parseWWWAuthenticateHeader } from "./parseWWWAuthenticate.js";

import type { GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { createTokenCycler } from "./tokenCycler.js";
import { logger } from "./logger.js";

/**
 * @internal
 * Holds the state of Challenge Auth.
 * When making the first request we force Key Vault to begin a challenge
 * by clearing out the request body and storing it locally.
 *
 * Later on, the authorizeRequestOnChallenge callback will process the
 * challenge and, if ready to resend the original request, reset the body
 * so that it may be sent again.
 *
 * Once a client has succeeded once, we can start skipping CAE.
 */
type ChallengeState =
  | {
      status: "none";
    }
  | {
      status: "started";
      originalBody?: RequestBodyType;
    }
  | {
      status: "complete";
      scopes: string[];
      tenantId?: string;
    };

/**
 * Additional options for the challenge based authentication policy.
 */
export interface KeyVaultAuthenticationPolicyOptions {
  /**
   * Whether to disable verification that the challenge resource matches the Key Vault or Managed HSM domain.
   *
   * Defaults to false.
   */
  disableChallengeResourceVerification?: boolean;
}

function verifyChallengeResource(scope: string, request: PipelineRequest): void {
  let scopeAsUrl: URL;
  try {
    scopeAsUrl = new URL(scope);
  } catch (e) {
    throw new Error(`The challenge contains invalid scope '${scope}'`);
  }

  const requestUrl = new URL(request.url);

  if (!requestUrl.hostname.endsWith(`.${scopeAsUrl.hostname}`)) {
    throw new Error(
      `The challenge resource '${scopeAsUrl.hostname}' does not match the requested domain. Set disableChallengeResourceVerification to true in your client options to disable. See https://aka.ms/azsdk/blog/vault-uri for more information.`,
    );
  }
}

/**
 * Name of the Key Vault authentication policy.
 */
export const keyVaultAuthenticationPolicyName = "keyVaultAuthenticationPolicy";

/**
 * A custom implementation of the bearer-token authentication policy that handles Key Vault and CAE challenges.
 *
 * Key Vault supports other authentication schemes, but we ensure challenge authentication
 * is used by first sending a copy of the request, without authorization or content.
 *
 * when the challenge is received, it will be authenticated and used to send the original
 * request with authorization.
 *
 * Following the first request of a client, follow-up requests will get the cached token
 * if possible.
 *
 */
export function keyVaultAuthenticationPolicy(
  credential: TokenCredential,
  options: KeyVaultAuthenticationPolicyOptions = {},
): PipelinePolicy {
  const { disableChallengeResourceVerification } = options;
  let challengeState: ChallengeState = { status: "none" };
  const getAccessToken = createTokenCycler(credential);

  function requestToOptions(request: PipelineRequest): GetTokenOptions {
    return {
      abortSignal: request.abortSignal,
      requestOptions: {
        timeout: request.timeout > 0 ? request.timeout : undefined,
      },
      tracingOptions: request.tracingOptions,
    };
  }

  async function authorizeRequest(request: PipelineRequest): Promise<void> {
    const requestOptions: GetTokenOptions = requestToOptions(request);

    switch (challengeState.status) {
      case "none":
        challengeState = {
          status: "started",
          originalBody: request.body,
        };
        request.body = null;
        break;
      case "started":
        break; // Retry, we should not overwrite the original body
      case "complete": {
        const token = await getAccessToken(challengeState.scopes, {
          ...requestOptions,
          enableCae: true,
          tenantId: challengeState.tenantId,
        });
        if (token) {
          request.headers.set("authorization", `Bearer ${token.token}`);
        }
        break;
      }
    }
  }

  async function handleChallenge(
    request: PipelineRequest,
    response: PipelineResponse,
    next: SendRequest,
  ): Promise<PipelineResponse> {
    // If status is not 401, this is a no-op
    if (response.status !== 401) {
      return response;
    }

    if (request.body === null && challengeState.status === "started") {
      // Reset the original body before doing anything else.
      // Note: If successful status will be "complete", otherwise "none" will
      // restart the process.
      request.body = challengeState.originalBody;
    }

    const getTokenOptions = requestToOptions(request);

    const challenge = response.headers.get("WWW-Authenticate");
    if (!challenge) {
      logger.warning(
        "keyVaultAuthentication policy encountered a 401 response without a corresponding WWW-Authenticate header. This is unexpected. Not handling the 401 response.",
      );
      return response;
    }
    const parsedChallenge: WWWAuthenticate = parseWWWAuthenticateHeader(challenge);

    const scope = parsedChallenge.resource
      ? parsedChallenge.resource + "/.default"
      : parsedChallenge.scope;

    if (!scope) {
      // Cannot handle this kind of challenge here (if scope is not present, may be a CAE challenge)
      return response;
    }

    if (!disableChallengeResourceVerification) {
      verifyChallengeResource(scope, request);
    }

    const accessToken = await getAccessToken([scope], {
      ...getTokenOptions,
      enableCae: true,
      tenantId: parsedChallenge.tenantId,
    });

    if (!accessToken) {
      // No access token provided, treat as no-op
      return response;
    }

    request.headers.set("Authorization", `Bearer ${accessToken.token}`);

    challengeState = {
      status: "complete",
      scopes: [scope],
      tenantId: parsedChallenge.tenantId,
    };

    // We have a token now, so try send the request again
    return next(request);
  }

  async function handleCaeChallenge(
    request: PipelineRequest,
    response: PipelineResponse,
    next: SendRequest,
  ): Promise<PipelineResponse> {
    // Cannot handle CAE challenge if a regular challenge has not been completed first
    if (challengeState.status !== "complete") {
      return response;
    }

    // If status is not 401, this is a no-op
    if (response.status !== 401) {
      return response;
    }

    const getTokenOptions = requestToOptions(request);

    const challenge = response.headers.get("WWW-Authenticate");
    if (!challenge) {
      return response;
    }
    const { claims: base64EncodedClaims, error }: WWWAuthenticate =
      parseWWWAuthenticateHeader(challenge);

    if (error !== "insufficient_claims" || base64EncodedClaims === undefined) {
      return response;
    }

    const claims = atob(base64EncodedClaims);

    const accessToken = await getAccessToken(challengeState.scopes, {
      ...getTokenOptions,
      enableCae: true,
      tenantId: challengeState.tenantId,
      claims,
    });

    request.headers.set("Authorization", `Bearer ${accessToken.token}`);

    return next(request);
  }

  async function sendRequest(
    request: PipelineRequest,
    next: SendRequest,
  ): Promise<PipelineResponse> {
    // Add token if possible
    await authorizeRequest(request);

    // Try send request (first attempt)
    let response = await next(request);

    // Handle standard challenge if present
    response = await handleChallenge(request, response, next);

    // Handle CAE challenge if present
    response = await handleCaeChallenge(request, response, next);

    return response;
  }

  return {
    name: keyVaultAuthenticationPolicyName,
    sendRequest,
  };
}
