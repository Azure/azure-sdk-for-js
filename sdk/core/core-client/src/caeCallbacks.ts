// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetTokenOptions } from "@azure/core-auth";
import { AuthorizeRequestOnChallengeOptions, ChallengeCallbacks } from "@azure/core-rest-pipeline";
import { decodeString } from "./base64";

/**
 * Converts: `Bearer a="b", c="d", Bearer d="e", f="g"`.
 * Into: `[ { a: 'b', c: 'd' }, { d: 'e', f: 'g"' } ]`.
 *
 * Important:
 * Do not use this in production, as values might contain the strings we use to split things up.
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
 * Generates callbacks to use on the `bearerTokenAuthenticationPolicy` to support CAE challenges:
 * [Continuous Access Evaluation](https://docs.microsoft.com/azure/active-directory/conditional-access/concept-continuous-access-evaluation).
 */
export function createCAECallbacks(): ChallengeCallbacks {
  let cachedChallenge: string | undefined;

  return {
    async authorizeRequestOnChallenge(
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
      if (cachedChallenge !== challenge) {
        cachedChallenge = challenge;
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
  };
}
