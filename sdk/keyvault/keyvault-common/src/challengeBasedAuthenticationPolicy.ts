// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AuthorizeRequestOnChallengeOptions,
  AuthorizeRequestOptions,
  ChallengeCallbacks,
  PipelineRequest,
  RequestBodyType,
} from "@azure/core-rest-pipeline";
import { WWWAuthenticate, parseWWWAuthenticateHeader } from "./parseWWWAuthenticate";

import { GetTokenOptions } from "@azure/core-auth";

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
    };

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
      `The challenge resource '${scopeAsUrl.hostname}' does not match the requested domain. Set disableChallengeResourceVerification to true in your client options to disable. See https://aka.ms/azsdk/blog/vault-uri for more information.`
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
  options: CreateChallengeCallbacksOptions = {}
): ChallengeCallbacks {
  const { disableChallengeResourceVerification } = options;
  let challengeState: ChallengeState = { status: "none" };

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
        const token = await getAccessToken(challengeState.scopes, requestOptions);
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
    if (request.body === null && challengeState.status === "started") {
      // Reset the original body before doing anything else.
      // Note: If successful status will be "complete", otherwise "none" will
      // restart the process.
      request.body = challengeState.originalBody;
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
    });

    if (!accessToken) {
      return false;
    }

    request.headers.set("Authorization", `Bearer ${accessToken.token}`);

    challengeState = {
      status: "complete",
      scopes: [scope],
    };

    return true;
  }

  return {
    authorizeRequest,
    authorizeRequestOnChallenge,
  };
}
