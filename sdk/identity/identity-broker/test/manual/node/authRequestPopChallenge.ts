// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizeRequestOnChallengeOptions } from "@azure/core-rest-pipeline";
import { setLogLevel } from "@azure/logger";

/**
 * Converts: `Bearer a="b", c="d", Bearer d="e", f="g"`.
 * Into: `[ { a: 'b', c: 'd' }, { d: 'e', f: 'g' } ]`.
 *
 * @internal
 */
export function parseCAEChallenge(challenges: string): any[] {
    console.log({challenges})
  const bearerChallenges = `, ${challenges.trim()}`.split(", Bearer ").filter((x) => x);
  return bearerChallenges.map((challenge) => {
    const challengeParts = `${challenge.trim()}, `.split('", ').filter((x) => x);
    const keyValuePairs = challengeParts.map((keyValue) =>
      (([key, value]) => ({ [key]: value }))(keyValue.trim().split('="')),
    );
    // Key-value pairs to plain object:
    return keyValuePairs.reduce((a, b) => ({ ...a, ...b }), {});
  });
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
setLogLevel("info");
export async function authorizeRequestOnClaimChallenge(
  onChallengeOptions: AuthorizeRequestOnChallengeOptions,
): Promise<boolean> {
  const { scopes, response } = onChallengeOptions;
  const logger = onChallengeOptions.logger //|| coreClientLogger;
    console.log("authorizeRequestPopClaimChallenge func is called")
   const challenge = response.headers.get("WWW-Authenticate");
  if (!challenge) {
    logger?.info(
      `The WWW-Authenticate header was missing. Failed to perform the Continuous Access Evaluation authentication flow.`,
    );
    return false;
  }
//   const challenges: CAEChallenge[] = parseCAEChallenge(challenge) || [];

//   const parsedChallenge = challenges.find((x) => x.claims);
//   if (!parsedChallenge) {
//     logger?.info(
//       `The WWW-Authenticate header was missing the necessary "claims" to perform the Continuous Access Evaluation authentication flow.`,
//     );
//     return false;
//   }
//[node-tests]   challenges: 'Bearer realm="", authorization_uri="https://login.microsoftonline.com/common/oauth2/authorize", client_id="00000003-0000-0000-c000-000000000000", PoP realm="", authorization_uri="https://login.microsoftonline.com/common/oauth2/authorize", client_id="00000003-0000-0000-c000-000000000000", nonce="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkJBQTFFQjM4MjUyOENBM0Q4M0UyQjNENjYwNEM3NDExREFGMEZERDIifQ.eyJ0cyI6MTcyNjc4NDk0MH0.QUzOZtsvl7kDCUq1ExD-5ARdsBLWYUaJ4tR55nTEiKlc_4MVDJOB6lcHyjSEuoGu0eS7dshxGlOvx-GRYEOtqODNtA4x-6YiTYOwQ33XxGFqwyWF4sqO7mHOwjcmYz32G5gHQXzqIVfR1lE9n2ZQqidOD1CiZ6mroXYxbcxHVInBRIF5DVDnIkP9Izsz6NSsMV0zXkV2Eoy1h7LKWx2kkR5WdIys2xSbk-Srbpddkp7n6qXNadQsPUy_nPggdP4vtA6BkvXWo1PK92bZbJlX2oHbNNqyOeyFfBWeFkMhwnGtUlLdEvq1sy5_CdkEdSONxyZt67jOnu86jmHdSVuzCw"'
//[node-tests] }
 
// Use regular expression to match the nonce value
const nonceMatch = challenge.match(/nonce="([^"]*)"/);
if(!nonceMatch){
    return false;
}
 
// Check if the nonce was found

    const nonce = nonceMatch[1];
    console.log("Extracted nonce:", nonce);

  const accessToken = await onChallengeOptions.getAccessToken(
    scopes,
    {
      proofOfPossessionOptions: {
        nonce: nonce,
        resourceRequestMethod: onChallengeOptions.request.method,
        resourceRequestUri: onChallengeOptions.request.url
      }
    },
  );
  console.log("we found access token");
console.dir(accessToken);
  if (!accessToken) {
    return false;
  }

  onChallengeOptions.request.headers.set("Authorization", `pop ${accessToken.token}`);
  return true;
}
