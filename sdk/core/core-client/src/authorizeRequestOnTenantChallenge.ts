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
 * Defines a callback to handle auth challenge for Storage APIs.
 * This implements the bearer challenge process described here: https://docs.microsoft.com/rest/api/storageservices/authorize-with-azure-active-directory#bearer-challenge
 * Handling has specific features for storage that departs to the general AAD challenge docs.
 **/
export const authorizeRequestOnTenantChallenge: (
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

/**
 * Extracts the tenant id from the challenge information
 * The tenant id is contained in the authorization_uri as the first
 * path part.
 */
function extractTenantId(challengeInfo: Challenge): string {
  const parsedAuthUri = new URL(challengeInfo.authorization_uri);
  const pathSegments = parsedAuthUri.pathname.split("/");
  const tenantId = pathSegments[1];

  return tenantId;
}

/**
 * Builds the authentication scopes based on the information that comes in the
 * challenge information. Scopes url is present in the resource_id, if it is empty
 * we keep using the original scopes.
 */
function buildScopes(
  challengeOptions: AuthorizeRequestOnChallengeOptions,
  challengeInfo: Challenge
): string[] {
  if (!challengeInfo.resource_uri) {
    return challengeOptions.scopes;
  }

  const challengeScopes = new URL(challengeInfo.resource_uri);
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
  resource_uri?: string;
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

/**
 * Extracts the options form a Pipeline Request for later re-use
 */
function requestToOptions(request: PipelineRequest): GetTokenOptions {
  return {
    abortSignal: request.abortSignal,
    requestOptions: {
      timeout: request.timeout,
    },
    tracingOptions: request.tracingOptions,
  };
}
