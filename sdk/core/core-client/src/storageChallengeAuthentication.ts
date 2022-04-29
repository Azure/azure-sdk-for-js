// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AuthorizeRequestOnChallengeOptions,
  PipelineRequest,
  PipelineResponse,
} from "@azure/core-rest-pipeline";

import { GetTokenOptions } from "@azure/core-auth";

/**
 * A set of constants used internally when processing requests.
 */
const Constants = {
  DefaultScope: "/.default",
  /**
   * Defines constants for use with HTTP headers.
   */
  HeaderConstants: {
    /**
     * The Authorization header.
     */
    AUTHORIZATION: "authorization",
  },
};

/**
 * Defines a callback to handle auth challenge for Storage APIs
 **/
export const storageAuthorizeRequestOnChallenge: (
  challengeOptions: AuthorizeRequestOnChallengeOptions
) => Promise<boolean> = async (challengeOptions) => {
  const requestOptions = requestToOptions(challengeOptions.request);
  const challenge = getChallenge(challengeOptions.response);
  if (challenge) {
    const challengeInfo: Challenge = parseChallenge(challenge);
    const challengeScopes = buildScopes(challengeOptions, challengeInfo);
    const tenantId = extractTenantId(challengeInfo);
    const accessToken = await challengeOptions.getAccessToken(challengeScopes, {
      ...requestOptions,
      tenantId,
    });

    if (!accessToken) {
      return false;
    }

    challengeOptions.request.headers.set(
      Constants.HeaderConstants.AUTHORIZATION,
      `Bearer ${accessToken.token}`
    );
    return true;
  }
  return false;
};

function extractTenantId(challengeInfo: Challenge): string {
  const parsedAuthUri = new URL(challengeInfo.authorization_uri);
  const pathSegments = parsedAuthUri.pathname.split("/");
  const tenantId = pathSegments[1];

  return tenantId;
}

function buildScopes(
  challengeOptions: AuthorizeRequestOnChallengeOptions,
  challengeInfo: Challenge
): string[] {
  if (!challengeInfo.resource_id) {
    return challengeOptions.scopes;
  }

  const challengeScopes = new URL(challengeInfo.resource_id);
  challengeScopes.pathname = Constants.DefaultScope;
  return [challengeScopes.toString()];
}

/**
 * We will retrieve the challenge only if the response status code was 401,
 * and if the response contained the header "WWW-Authenticate" with a non-empty value.
 */
function getChallenge(response: PipelineResponse): string | undefined {
  const challenge = response.headers.get("WWW-Authenticate");
  if (response.status === 401 && challenge) {
    return challenge;
  }
  return;
}

/**
 * Challenge structure
 */
interface Challenge {
  authorization_uri: string;
  resource_id?: string;
}

/**
 * Converts: `Bearer a="b" c="d"`.
 * Into: `[ { a: 'b', c: 'd' }]`.
 *
 * @internal
 */
function parseChallenge(challenge: string): Challenge {
  const bearerChallenge = challenge.slice("Bearer ".length);
  const challengeParts = `${bearerChallenge.trim()} `.split(" ").filter((x) => x);
  const keyValuePairs = challengeParts.map((keyValue) =>
    (([key, value]) => ({ [key]: value }))(keyValue.trim().split("="))
  );
  // Key-value pairs to plain object:
  return keyValuePairs.reduce((a, b) => ({ ...a, ...b }), {} as Challenge);
}

function requestToOptions(request: PipelineRequest): GetTokenOptions {
  return {
    abortSignal: request.abortSignal,
    requestOptions: {
      timeout: request.timeout,
    },
    tracingOptions: request.tracingOptions,
  };
}
