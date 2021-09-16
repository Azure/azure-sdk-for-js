// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetTokenOptions } from "@azure/core-auth";
import { AuthorizeRequestOnChallengeOptions } from "@azure/core-rest-pipeline";
import { decodeString, uint8ArrayToString } from "./base64";

/**
 * Converts: `Bearer a="b", c="d", Bearer d="e", f="g"`.
 * Into: `[ { a: 'b', c: 'd' }, { d: 'e', f: 'g"' } ]`.
 *
 * @internal
 */
export function parseCAEChallenge(challenges: string): any[] {
  return challenges
    .split("Bearer ")
    .filter((x) => x)
    .map((challenge) =>
      `${challenge.trim()}, `
        .split('", ')
        .filter((x) => x)
        .map((keyValue) => (([key, value]) => ({ [key]: value }))(keyValue.trim().split('="')))
        .reduce((a, b) => ({ ...a, ...b }), {})
    );
}

/**
 * CAE Challenge structure
 */
export interface CAEChallenge {
  scope: string;
  claims: string;
}

/**
 * This function can be used as a callback for the `bearerTokenAuthenticationPolicy` of `@azure/core-rest-pipeline`, to support CAE challenges:
 * [Continuous Access Evaluation](https://docs.microsoft.com/azure/active-directory/conditional-access/concept-continuous-access-evaluation).
 *
 * Call the `bearerTokenAuthenticationPolicy` with the following options:
 *
 * ```ts
 * import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
 * import { authorizeRequestOnClaimChallenge } from "@azure/core-client";
 *
 * const bearerTokenAuthenticationPolicy = bearerTokenAuthenticationPolicy({
 *   authorizeRequestOnChallenge: authorizeRequestOnClaimChallenge
 * });
 * ```
 *
 * Once provided, the `bearerTokenAuthenticationPolicy` policy will internally handle Continuous Access Evaluation (CAE) challenges.
 * When it can't complete a challenge it will return the 401 (unauthorized) response from ARM.
 *
 * Example challenge with claims:
 *
 * ```
 * Bearer authorization_uri="https://login.windows-ppe.net/", error="invalid_token",
 * error_description="User session has been revoked",
 * claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwgInZhbHVlIjoiMTYwMzc0MjgwMCJ9fX0="
 * ```
 */
export async function authorizeRequestOnClaimChallenge(
  onChallengeOptions: AuthorizeRequestOnChallengeOptions
): Promise<boolean> {
  const { scopes: onChallengeScopes } = onChallengeOptions;

  const challenge = onChallengeOptions.response.headers.get("WWW-Authenticate");
  if (!challenge) {
    console.log(
      `The WWW-Authenticate header was missing. Failed to perform the Continuous Access Evaluation authentication flow.`
    );
    return false;
  }
  const challenges: CAEChallenge[] = parseCAEChallenge(challenge) || [];

  const parsedChallenge = challenges.find((x) => x.claims);
  if (!parsedChallenge) {
    console.log(
      `The WWW-Authenticate header was missing the necessary "claims" to perform the Continuous Access Evaluation authentication flow.`
    );
    return false;
  }

  // Added padding, if necessary.
  const claims = parsedChallenge.claims;
  const padding = claims.length % 4;
  const claimsPadded = claims + "=".repeat(padding);

  const accessToken = await onChallengeOptions.getAccessToken(
    parsedChallenge.scope ? [parsedChallenge.scope] : onChallengeScopes,
    {
      ...onChallengeOptions,
      claims: uint8ArrayToString(decodeString(claimsPadded))
    } as GetTokenOptions
  );

  if (!accessToken) {
    return false;
  }

  onChallengeOptions.request.headers.set("Authorization", `Bearer ${accessToken.token}`);
  return true;
}
