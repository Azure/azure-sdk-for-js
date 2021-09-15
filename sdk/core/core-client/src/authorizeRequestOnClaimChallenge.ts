// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetTokenOptions } from "@azure/core-auth";
import { AuthorizeRequestOnChallengeOptions } from "@azure/core-rest-pipeline";
import { decodeString } from "./base64";

/**
 * Converts: `Bearer a="b", c="d", Bearer d="e", f="g"`.
 * Into: `[ { a: 'b', c: 'd' }, { d: 'e', f: 'g"' } ]`.
 *
 * @internal
 */
function parseCAEChallenge(challenges: string): any[] {
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
 */
export async function authorizeRequestOnClaimChallenge(
  onChallengeOptions: AuthorizeRequestOnChallengeOptions
): Promise<boolean> {
  const { scopes: onChallengeScopes } = onChallengeOptions;

  const challenge = onChallengeOptions.response.headers.get("WWW-Authenticate");
  if (!challenge) {
    throw new Error("Missing challenge");
  }
  const challenges: CAEChallenge[] = parseCAEChallenge(challenge) || [];

  const parsedChallenge = challenges.find((x) => x.claims);
  if (!parsedChallenge) {
    throw new Error("Missing claims");
  }

  const accessToken = await onChallengeOptions.getAccessToken(
    parsedChallenge.scope ? [parsedChallenge.scope] : onChallengeScopes,
    {
      ...onChallengeOptions,
      claims: decodeString(parsedChallenge.claims)
    } as GetTokenOptions
  );

  if (!accessToken) {
    return false;
  }

  onChallengeOptions.request.headers.set("Authorization", `Bearer ${accessToken.token}`);
  return true;
}
