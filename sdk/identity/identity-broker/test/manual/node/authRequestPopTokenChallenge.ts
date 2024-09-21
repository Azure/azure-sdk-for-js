// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizeRequestOnChallengeOptions, PipelineRequest } from "@azure/core-rest-pipeline";

export async function authorizeRequestOnPopTokenChallenge(
  onChallengeOptions: AuthorizeRequestOnChallengeOptions,
): Promise<onChallengeResult> {
  const { scopes, response } = onChallengeOptions;
  const logger = onChallengeOptions.logger
   const challenge = response.headers.get("WWW-Authenticate");
  if (!challenge) {
    logger?.info(
      `The WWW-Authenticate header was missing. Failed to perform the Continuous Access Evaluation authentication flow.`,
    );
    return {isPossible: false};
  } 
// Use regular expression to match the nonce value
const nonceMatch = challenge.match(/nonce="([^"]*)"/);
if(!nonceMatch){
  return {isPossible: false};
}
  const nonce = nonceMatch[1];

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
  console.log("we found access token")
  console.dir(accessToken)
  if (!accessToken) {
    return {isPossible: false};
  }

  onChallengeOptions.request.headers.set("Authorization", `${accessToken.tokenType} ${accessToken.token}`);
  console.log(onChallengeOptions.request.headers.get("Authorization"))
  return {isPossible: true, request: onChallengeOptions.request};
}

export type onChallengeResult = {
  isPossible: boolean;
  request?: PipelineRequest;
}
