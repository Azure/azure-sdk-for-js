// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AuthorizeRequestOnChallengeOptions,
  AuthorizeRequestOptions,
  bearerTokenAuthenticationPolicy,
  ChallengeCallbacks,
  Pipeline,
  PipelinePolicy,
  PipelineRequest,
  RequestBodyType,
  RestError,
} from "@azure/core-rest-pipeline";
import { WWWAuthenticate, parseWWWAuthenticateHeader } from "./parseWWWAuthenticate.js";

import { GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { BearerTokenAuthenticationPolicyOptions } from "@azure/core-rest-pipeline";
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

interface ChallengeStateContainer {
  get(): ChallengeState;
  update(newState: ChallengeState): void;
}

function createChallengeStateContainer(): ChallengeStateContainer {
  let challengeState: ChallengeState = { status: "none" };

  return {
    get() {
      return challengeState;
    },
    update(newState) {
      challengeState = newState;
    },
  };
}

/**
 * Additional options for the challenge based authentication policy.
 */
export interface CreateChallengeCallbacksOptions {
  /**
   * Whether to disable verification that the challenge resource matches the Key Vault or Managed HSM domain.
   *
   * Defaults to false.
   */
  disableChallengeResourceVerification?: boolean;

  /**
   * Callbacks to set and update the challenge state.
   */
  challengeState?: ChallengeStateContainer;
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
 * Creates challenge callback handlers to manage CAE lifecycle in Azure Key Vault.
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
export function createKeyVaultChallengeCallbacks(
  options: CreateChallengeCallbacksOptions = {},
): ChallengeCallbacks {
  const { disableChallengeResourceVerification } = options;

  const challengeState = options.challengeState ?? createChallengeStateContainer();

  function requestToOptions(request: PipelineRequest): GetTokenOptions {
    return {
      abortSignal: request.abortSignal,
      requestOptions: {
        timeout: request.timeout > 0 ? request.timeout : undefined,
      },
      tracingOptions: request.tracingOptions,
    };
  }

  async function authorizeRequest({
    request,
    getAccessToken,
  }: AuthorizeRequestOptions): Promise<void> {
    const requestOptions: GetTokenOptions = requestToOptions(request);

    const currentChallengeState = challengeState.get();

    switch (currentChallengeState.status) {
      case "none":
        challengeState.update({
          status: "started",
          originalBody: request.body,
        });
        request.body = null;
        break;
      case "started":
        break; // Retry, we should not overwrite the original body
      case "complete": {
        const token = await getAccessToken(currentChallengeState.scopes, {
          ...requestOptions,
          tenantId: currentChallengeState.tenantId,
        });
        if (token) {
          request.headers.set("authorization", `Bearer ${token.token}`);
        }
        break;
      }
    }
    return Promise.resolve();
  }

  async function authorizeRequestOnChallenge({
    request,
    response,
    getAccessToken,
  }: AuthorizeRequestOnChallengeOptions): Promise<boolean> {
    const currentChallengeState = challengeState.get();
    if (request.body === null && currentChallengeState.status === "started") {
      // Reset the original body before doing anything else.
      // Note: If successful status will be "complete", otherwise "none" will
      // restart the process.
      request.body = currentChallengeState.originalBody;
    }

    const getTokenOptions = requestToOptions(request);

    const challenge = response.headers.get("WWW-Authenticate");
    if (!challenge) {
      throw new Error("Missing challenge.");
    }
    const parsedChallenge: WWWAuthenticate = parseWWWAuthenticateHeader(challenge) || {};

    const scope = parsedChallenge.resource
      ? parsedChallenge.resource + "/.default"
      : parsedChallenge.scope;

    if (!scope) {
      throw new Error("Missing scope.");
    }

    if (!disableChallengeResourceVerification) {
      verifyChallengeResource(scope, request);
    }

    const accessToken = await getAccessToken([scope], {
      ...getTokenOptions,
      tenantId: parsedChallenge.tenantId,
      enableCae: true,
    });

    if (!accessToken) {
      return false;
    }

    request.headers.set("Authorization", `Bearer ${accessToken.token}`);

    challengeState.update({
      status: "complete",
      tenantId: parsedChallenge.tenantId,
      scopes: [scope],
    });

    return true;
  }

  return {
    authorizeRequest,
    authorizeRequestOnChallenge,
  };
}

function keyVaultClaimsChallengePolicy(
  getChallengeState: () => ChallengeState,
  credential: TokenCredential,
): PipelinePolicy {
  return {
    name: "keyVaultClaimsChallengePolicy",
    async sendRequest(request, next) {
      const response = await next(request);
      if (response.status === 401 && response.headers.has("WWW-Authenticate")) {
        const {
          error,
          claims: base64EncodedClaims,
          scope: newScope,
        } = parseWWWAuthenticateHeader(response.headers.get("WWW-Authenticate") ?? "");

        // If the error is present and is "insufficient_claims", we have a CAE challenge that this policy will now handle.
        if (error !== "insufficient_claims") {
          return response;
        }

        const challengeState = getChallengeState();
        if (challengeState.status !== "complete") {
          logger.warning(
            "Received a CAE challenge before receiving a normal challenge. Not handling CAE challenge.",
          );
          return response;
        }

        if (base64EncodedClaims === undefined) {
          throw new RestError(
            `Received a WWW-Authenticate header with error="insufficient_claims", but no claims field was present`,
          );
        }

        const claims = atob(base64EncodedClaims);

        const token = await credential.getToken(newScope ? [newScope] : challengeState.scopes, {
          tenantId: challengeState.tenantId,
          enableCae: true,
          claims,
        });
        request.headers.set("Authorization", `Bearer ${token?.token}`);
        return next(request);
      }

      return response;
    },
  };
}

/**
 * Add the necessary pipeline policies for Key Vault authentication to the given pipeline.
 * As a result of calling this function, the provided pipeline will have two policies added to it:
 * - The Key Vault bearer-token authentication policy, which will handle parsing the standard authorization challenge;
 * - and a CAE bearer-token authentication policy, which will handle any CAE claims challenges that may arise after the standard authorization challenge.
 *
 * @param pipeline - Pipeline to add the policy to
 * @param options - Options to be passed to the bearer token auth policy and to createKeyVaultChallengeCallbacks
 */
export function addKeyVaultAuthenticationPolicies(
  pipeline: Pipeline,
  credential: TokenCredential,
  options?: Omit<BearerTokenAuthenticationPolicyOptions, "credential" | "scopes"> &
    CreateChallengeCallbacksOptions,
): void {
  const challengeState: ChallengeStateContainer =
    options?.challengeState ?? createChallengeStateContainer();
  pipeline.addPolicy(
    bearerTokenAuthenticationPolicy({
      ...options,
      credential,
      challengeCallbacks: createKeyVaultChallengeCallbacks({ challengeState, ...options }),
      scopes: [],
    }),
  );

  pipeline.addPolicy(keyVaultClaimsChallengePolicy(() => challengeState.get(), credential));
}
