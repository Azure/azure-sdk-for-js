// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Pipeline } from "@azure/core-rest-pipeline";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";

import type { TokenCredential } from "@azure/core-auth";
import { authorizeRequestOnTenantChallenge } from "@azure/core-client";

/**
 * @internal
 * Setups the challenge authentication policy for the provided token credential.
 */
export function setTokenChallengeAuthenticationPolicy(
  pipeline: Pipeline,
  credential: TokenCredential,
  scopes: string | string[],
): void {
  // Make sure no bearerTokenPolicy is set.
  pipeline.removePolicy({ name: "bearerTokenPolicy" });
  pipeline.addPolicy(
    bearerTokenAuthenticationPolicy({
      credential,
      scopes,
      challengeCallbacks: { authorizeRequestOnChallenge: authorizeRequestOnTenantChallenge },
    }),
    {
      phase: "Sign",
    },
  );
}
