// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { storageBearerTokenChallengeAuthenticationPolicy } from "@azure/core-client";
import { Pipeline } from "@azure/core-rest-pipeline";

/**
 * @internal
 * Setups the challenge authentication policy for the provided token credential.
 */
export function setTokenChallengeAuthenticationPolicy(
  pipeline: Pipeline,
  credential: TokenCredential,
  scopes: string | string[]
) {
  // Make sure no bearerTokenPolicy is set.
  pipeline.removePolicy({ name: "bearerTokenPolicy" });
  pipeline.addPolicy(storageBearerTokenChallengeAuthenticationPolicy(credential, scopes), {
    phase: "Sign",
  });
}
