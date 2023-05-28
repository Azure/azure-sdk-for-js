// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  InferCancerProfile200Response,
  InferCancerProfile202Response,
  InferCancerProfileLogicalResponse,
  InferCancerProfileDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "POST /oncophenotype/jobs": ["200", "202"],
  "GET /oncophenotype/jobs": ["200", "202"],
};

export function isUnexpected(
  response:
    | InferCancerProfile200Response
    | InferCancerProfile202Response
    | InferCancerProfileLogicalResponse
    | InferCancerProfileDefaultResponse
): response is InferCancerProfileDefaultResponse;
export function isUnexpected(
  response:
    | InferCancerProfile200Response
    | InferCancerProfile202Response
    | InferCancerProfileLogicalResponse
    | InferCancerProfileDefaultResponse
): response is InferCancerProfileDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  const pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    return true;
  }
  return !pathDetails.includes(response.status);
}
