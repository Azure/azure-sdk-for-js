// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import type { WWWAuthenticate } from "./parseWWWAuthenticate.js";
import { parseWWWAuthenticateHeader } from "./parseWWWAuthenticate.js";

import type { GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";
import type { AccessTokenGetter } from "./tokenCycler.js";
import { createTokenCycler } from "./tokenCycler.js";
import { logger } from "./logger.js";

interface AuthenticationChallenge {
  scopes: [string];
  tenantId?: string;
  resourceHostname?: string;
  requestOrigin: string;
  getAccessToken: AccessTokenGetter;
}

interface PendingAuthenticationChallenge {
  challenge: AuthenticationChallenge;
  requests: number;
}

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

function getChallengeResourceHostname(scope: string): string {
  const invalidScopeMessage = "The challenge contains an invalid scope.";
  // Check the original authority before URL parsing normalizes ambiguous input.
  const authority = /^[a-z][a-z\d+.-]*:\/\/([^/?#]+)/i.exec(scope)?.[1];
  if (!authority || authority.includes("@") || authority.includes("%")) {
    throw new Error(invalidScopeMessage);
  }
  for (const character of scope) {
    if (character <= " " || character === "\u007f" || character === "\\") {
      throw new Error(invalidScopeMessage);
    }
  }

  let resourceHostname: string;
  try {
    resourceHostname = new URL(scope).hostname;
  } catch {
    throw new Error(invalidScopeMessage);
  }
  if (!resourceHostname) {
    throw new Error(invalidScopeMessage);
  }
  return resourceHostname;
}

function verifyChallengeResource(resourceHostname: string, request: PipelineRequest): void {
  const requestUrl = new URL(request.url);
  if (requestUrl.protocol !== "https:") {
    throw new Error("The request URL must use HTTPS.");
  }

  if (!requestUrl.hostname.endsWith(`.${resourceHostname}`)) {
    throw new Error(
      `The challenge resource '${resourceHostname}' does not match the requested domain. Set disableChallengeResourceVerification to true in your client options to disable. See https://aka.ms/azsdk/blog/vault-uri for more information.`,
    );
  }
}

function verifyChallengeOrigin(requestOrigin: string, request: PipelineRequest): void {
  const requestUrl = new URL(request.url);
  if (requestUrl.protocol !== "https:") {
    throw new Error("The request URL must use HTTPS.");
  }

  if (requestUrl.origin !== requestOrigin) {
    throw new Error(
      `The challenge origin '${requestOrigin}' does not match the requested domain. This request targeted '${requestUrl.origin}'.`,
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
 * This policy uses challenge authentication, withholding the initial request body
 * until the service's challenge has been validated.
 *
 * When the challenge is received, it will be authenticated and used to send the original
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
  let cachedChallenge: AuthenticationChallenge | undefined;
  // Pending acquisitions can reuse an earlier cached object, so identity alone cannot detect updates.
  let cachedChallengeRevision = 0;
  const pendingChallenges = new Map<string, PendingAuthenticationChallenge>();
  const pendingCaeChallenges = new WeakMap<
    AuthenticationChallenge,
    Map<string, PendingAuthenticationChallenge>
  >();

  function requestToOptions(request: PipelineRequest): GetTokenOptions {
    return {
      abortSignal: request.abortSignal,
      requestOptions: {
        timeout: request.timeout > 0 ? request.timeout : undefined,
      },
      tracingOptions: request.tracingOptions,
    };
  }

  async function authorizeRequestWithChallenge(
    request: PipelineRequest,
    state: AuthenticationChallenge,
    claims?: string,
  ): Promise<void> {
    verifyChallengeOrigin(state.requestOrigin, request);
    if (state.resourceHostname !== undefined) {
      verifyChallengeResource(state.resourceHostname, request);
    }

    const token = await state.getAccessToken(state.scopes, {
      ...requestToOptions(request),
      enableCae: true,
      tenantId: state.tenantId,
      claims,
    });

    if (state.resourceHostname !== undefined) {
      verifyChallengeResource(state.resourceHostname, request);
    }
    verifyChallengeOrigin(state.requestOrigin, request);
    request.headers.set("Authorization", `Bearer ${token.token}`);
  }

  async function handleChallenge(
    request: PipelineRequest,
    response: PipelineResponse,
  ): Promise<AuthenticationChallenge | undefined> {
    // If status is not 401, this is a no-op
    if (response.status !== 401) {
      return undefined;
    }

    const challenge = response.headers.get("WWW-Authenticate");
    if (!challenge) {
      logger.warning(
        "keyVaultAuthentication policy encountered a 401 response without a corresponding WWW-Authenticate header. This is unexpected. Not handling the 401 response.",
      );
      return undefined;
    }
    const parsedChallenge: WWWAuthenticate = parseWWWAuthenticateHeader(challenge);

    const scope = parsedChallenge.resource
      ? parsedChallenge.resource + "/.default"
      : parsedChallenge.scope;

    if (!scope) {
      // Cannot handle this kind of challenge here (if scope is not present, may be a CAE challenge)
      return undefined;
    }

    const resourceHostname = disableChallengeResourceVerification
      ? undefined
      : getChallengeResourceHostname(scope);
    if (resourceHostname !== undefined) {
      verifyChallengeResource(resourceHostname, request);
    }

    const previousRevision = cachedChallengeRevision;
    let state = cachedChallenge;
    const pendingKey = JSON.stringify([scope, parsedChallenge.tenantId]);
    let pending: PendingAuthenticationChallenge | undefined;
    if (!state || state.scopes[0] !== scope || state.tenantId !== parsedChallenge.tenantId) {
      pending = pendingChallenges.get(pendingKey);
      if (!pending) {
        pending = {
          challenge: {
            scopes: [scope],
            tenantId: parsedChallenge.tenantId,
            resourceHostname,
            requestOrigin: new URL(request.url).origin,
            getAccessToken: createTokenCycler(credential),
          },
          requests: 0,
        };
        pendingChallenges.set(pendingKey, pending);
      }
      pending.requests++;
      state = pending.challenge;
    }
    try {
      await authorizeRequestWithChallenge(request, state);
      // Do not replace a successful context until acquisition succeeds, or undo a concurrent update.
      if (cachedChallengeRevision === previousRevision && cachedChallenge !== state) {
        cachedChallenge = state;
        cachedChallengeRevision++;
      }
      return state;
    } finally {
      if (pending && --pending.requests === 0) {
        pendingChallenges.delete(pendingKey);
      }
    }
  }

  async function handleCaeChallenge(
    request: PipelineRequest,
    response: PipelineResponse,
    next: SendRequest,
    state: AuthenticationChallenge | undefined,
  ): Promise<PipelineResponse> {
    // Cannot handle CAE challenge if a regular challenge has not been completed first
    if (!state) {
      return response;
    }

    // If status is not 401, this is a no-op
    if (response.status !== 401) {
      return response;
    }

    const challenge = response.headers.get("WWW-Authenticate");
    if (!challenge) {
      return response;
    }
    const { claims: base64EncodedClaims, error }: WWWAuthenticate =
      parseWWWAuthenticateHeader(challenge);

    if (error !== "insufficient_claims" || base64EncodedClaims === undefined) {
      return response;
    }

    const claims = uint8ArrayToString(stringToUint8Array(base64EncodedClaims, "base64"), "utf-8");
    const previousRevision = cachedChallengeRevision;

    // Do not let a caller from a newer cache revision join and promote an older acquisition.
    const pendingKey = JSON.stringify([claims, previousRevision]);
    let stateChallenges = pendingCaeChallenges.get(state);
    if (!stateChallenges) {
      stateChallenges = new Map();
      pendingCaeChallenges.set(state, stateChallenges);
    }
    let pending = stateChallenges.get(pendingKey);
    if (!pending) {
      pending = {
        challenge: { ...state, getAccessToken: createTokenCycler(credential) },
        requests: 0,
      };
      stateChallenges.set(pendingKey, pending);
    }
    pending.requests++;
    try {
      await authorizeRequestWithChallenge(request, pending.challenge, claims);
      if (cachedChallengeRevision === previousRevision && cachedChallenge === state) {
        cachedChallenge = pending.challenge;
        cachedChallengeRevision++;
      }
    } finally {
      if (--pending.requests === 0) {
        stateChallenges.delete(pendingKey);
        if (stateChallenges.size === 0) {
          pendingCaeChallenges.delete(state);
        }
      }
    }

    return next(request);
  }

  async function sendRequest(
    request: PipelineRequest,
    next: SendRequest,
  ): Promise<PipelineResponse> {
    // Keep the authentication context and anonymous request body local to this operation.
    let state = cachedChallenge;
    let response: PipelineResponse;
    if (state) {
      await authorizeRequestWithChallenge(request, state);
      response = await next(request);
    } else {
      const originalBody = request.body;
      request.body = null;
      try {
        response = await next(request);
      } finally {
        if (request.body === null) {
          request.body = originalBody;
        }
      }
    }

    const challengedState = await handleChallenge(request, response);
    if (challengedState) {
      state = challengedState;
      response = await next(request);
    }
    return handleCaeChallenge(request, response, next, state);
  }

  return {
    name: keyVaultAuthenticationPolicyName,
    sendRequest,
  };
}
