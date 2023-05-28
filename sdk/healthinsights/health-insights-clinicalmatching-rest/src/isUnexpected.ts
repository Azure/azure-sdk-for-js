// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  MatchTrials200Response,
  MatchTrials202Response,
  MatchTrialsLogicalResponse,
  MatchTrialsDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "POST /trialmatcher/jobs": ["200", "202"],
  "GET /trialmatcher/jobs": ["200", "202"],
};

export function isUnexpected(
  response:
    | MatchTrials200Response
    | MatchTrials202Response
    | MatchTrialsLogicalResponse
    | MatchTrialsDefaultResponse
): response is MatchTrialsDefaultResponse;
export function isUnexpected(
  response:
    | MatchTrials200Response
    | MatchTrials202Response
    | MatchTrialsLogicalResponse
    | MatchTrialsDefaultResponse
): response is MatchTrialsDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  const pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    return true;
  }
  return !pathDetails.includes(response.status);
}
