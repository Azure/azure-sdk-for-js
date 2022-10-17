// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RequestRouteMatrixSync200Response,
  RequestRouteMatrixSync408Response,
  RequestRouteMatrixSyncdefaultResponse,
  GetRouteDirections200Response,
  GetRouteDirectionsdefaultResponse,
  GetRouteDirectionsWithAdditionalParameters200Response,
  GetRouteDirectionsWithAdditionalParametersdefaultResponse,
  GetRouteRange200Response,
  GetRouteRangedefaultResponse,
  RequestRouteDirectionsBatchSync200Response,
  RequestRouteDirectionsBatchSync408Response,
  RequestRouteDirectionsBatchSyncdefaultResponse
} from "./responses";

const responseMap: Record<string, string[]> = {
  "POST /route/matrix/{format}": ["200", "202"],
  "GET /route/matrix/{format}": ["200", "202"],
  "POST /route/matrix/sync/{format}": ["200"],
  "GET /route/directions/{format}": ["200"],
  "POST /route/directions/{format}": ["200"],
  "GET /route/range/{format}": ["200"],
  "POST /route/directions/batch/{format}": ["200", "202"],
  "GET /route/directions/batch/{format}": ["200", "202"],
  "POST /route/directions/batch/sync/{format}": ["200"]
};

export function isUnexpected(
  response:
    | RequestRouteMatrixSync200Response
    | RequestRouteMatrixSync408Response
    | RequestRouteMatrixSyncdefaultResponse
): response is RequestRouteMatrixSync408Response;
export function isUnexpected(
  response: GetRouteDirections200Response | GetRouteDirectionsdefaultResponse
): response is GetRouteDirectionsdefaultResponse;
export function isUnexpected(
  response:
    | GetRouteDirectionsWithAdditionalParameters200Response
    | GetRouteDirectionsWithAdditionalParametersdefaultResponse
): response is GetRouteDirectionsWithAdditionalParametersdefaultResponse;
export function isUnexpected(
  response: GetRouteRange200Response | GetRouteRangedefaultResponse
): response is GetRouteRangedefaultResponse;
export function isUnexpected(
  response:
    | RequestRouteDirectionsBatchSync200Response
    | RequestRouteDirectionsBatchSync408Response
    | RequestRouteDirectionsBatchSyncdefaultResponse
): response is RequestRouteDirectionsBatchSync408Response;
export function isUnexpected(
  response:
    | RequestRouteMatrixSync200Response
    | RequestRouteMatrixSync408Response
    | RequestRouteMatrixSyncdefaultResponse
    | GetRouteDirections200Response
    | GetRouteDirectionsdefaultResponse
    | GetRouteDirectionsWithAdditionalParameters200Response
    | GetRouteDirectionsWithAdditionalParametersdefaultResponse
    | GetRouteRange200Response
    | GetRouteRangedefaultResponse
    | RequestRouteDirectionsBatchSync200Response
    | RequestRouteDirectionsBatchSync408Response
    | RequestRouteDirectionsBatchSyncdefaultResponse
): response is
  | RequestRouteMatrixSync408Response
  | RequestRouteMatrixSyncdefaultResponse
  | GetRouteDirectionsdefaultResponse
  | GetRouteDirectionsWithAdditionalParametersdefaultResponse
  | GetRouteRangedefaultResponse
  | RequestRouteDirectionsBatchSync408Response
  | RequestRouteDirectionsBatchSyncdefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = geParametrizedPathSuccess(url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function geParametrizedPathSuccess(path: string): string[] {
  const pathParts = path.split("/");

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // If the candidate and actual paths don't match in size
    // we move on to the next candidate path
    if (
      candidateParts.length === pathParts.length &&
      hasParametrizedPath(key)
    ) {
      // track if we have found a match to return the values found.
      let found = true;
      for (let i = 0; i < candidateParts.length; i++) {
        if (
          candidateParts[i].startsWith("{") &&
          candidateParts[i].endsWith("}")
        ) {
          // If the current part of the candidate is a "template" part
          // it is a match with the actual path part on hand
          // skip as the parameterized part can match anything
          continue;
        }

        // If the candidate part is not a template and
        // the parts don't match mark the candidate as not found
        // to move on with the next candidate path.
        if (candidateParts[i] !== pathParts[i]) {
          found = false;
          break;
        }
      }

      // We finished evaluating the current candidate parts
      // if all parts matched we return the success values form
      // the path mapping.
      if (found) {
        return value;
      }
    }
  }

  // No match was found, return an empty array.
  return [];
}

function hasParametrizedPath(path: string): boolean {
  return path.includes("/{");
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
