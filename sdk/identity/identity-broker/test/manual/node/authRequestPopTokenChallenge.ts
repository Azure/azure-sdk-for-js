// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizeRequestOnChallengeOptions } from "@azure/core-rest-pipeline";

export async function authorizeRequestOnPopTokenChallenge(
  onChallengeOptions: AuthorizeRequestOnChallengeOptions,
): Promise<boolean> {
  const { scopes, response } = onChallengeOptions;
  const logger = onChallengeOptions.logger;
  const challenge = response.headers.get("WWW-Authenticate");
  if (!challenge) {
    logger?.info(
      `The WWW-Authenticate header was missing. Failed to perform the Continuous Access Evaluation authentication flow.`,
    );
    return false;
  }
  // Use regular expression to match the nonce value
  const nonceMatch = challenge.match(/nonce="([^"]*)"/);
  if (!nonceMatch) {
    return false;
  }
  const nonce = nonceMatch[1];

  const accessToken = await onChallengeOptions.getAccessToken(scopes, {
    proofOfPossessionOptions: {
      nonce: nonce,
      resourceRequestMethod: onChallengeOptions.request.method,
      resourceRequestUrl: onChallengeOptions.request.url,
    },
  });
  if (!accessToken) {
    return false;
  }

  onChallengeOptions.request.headers.set(
    "Authorization",
    `${accessToken.tokenType} ${accessToken.token}`,
  );
  return true;
}
