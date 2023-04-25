// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  SearchListPolygons200Response,
  SearchListPolygonsDefaultResponse,
  SearchFuzzySearch200Response,
  SearchFuzzySearchDefaultResponse,
  SearchSearchPointOfInterest200Response,
  SearchSearchPointOfInterestDefaultResponse,
  SearchSearchNearbyPointOfInterest200Response,
  SearchSearchNearbyPointOfInterestDefaultResponse,
  SearchSearchPointOfInterestCategory200Response,
  SearchSearchPointOfInterestCategoryDefaultResponse,
  SearchGetPointOfInterestCategoryTree200Response,
  SearchGetPointOfInterestCategoryTreeDefaultResponse,
  SearchSearchAddress200Response,
  SearchSearchAddressDefaultResponse,
  SearchReverseSearchAddress200Response,
  SearchReverseSearchAddressDefaultResponse,
  SearchReverseSearchCrossStreetAddress200Response,
  SearchReverseSearchCrossStreetAddressDefaultResponse,
  SearchSearchStructuredAddress200Response,
  SearchSearchStructuredAddressDefaultResponse,
  SearchSearchInsideGeometry200Response,
  SearchSearchInsideGeometryDefaultResponse,
  SearchSearchAlongRoute200Response,
  SearchSearchAlongRouteDefaultResponse,
  SearchFuzzySearchBatchSync200Response,
  SearchFuzzySearchBatchSync408Response,
  SearchFuzzySearchBatchSyncDefaultResponse,
  SearchSearchAddressBatchSync200Response,
  SearchSearchAddressBatchSync408Response,
  SearchSearchAddressBatchSyncDefaultResponse,
  SearchReverseSearchAddressBatchSync200Response,
  SearchReverseSearchAddressBatchSync408Response,
  SearchReverseSearchAddressBatchSyncDefaultResponse
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /search/polygon/{format}": ["200"],
  "GET /search/fuzzy/{format}": ["200"],
  "GET /search/poi/{format}": ["200"],
  "GET /search/nearby/{format}": ["200"],
  "GET /search/poi/category/{format}": ["200"],
  "GET /search/poi/category/tree/{format}": ["200"],
  "GET /search/address/{format}": ["200"],
  "GET /search/address/reverse/{format}": ["200"],
  "GET /search/address/reverse/crossStreet/{format}": ["200"],
  "GET /search/address/structured/{format}": ["200"],
  "POST /search/geometry/{format}": ["200"],
  "POST /search/alongRoute/{format}": ["200"],
  "POST /search/fuzzy/batch/sync/{format}": ["200"],
  "POST /search/fuzzy/batch/{format}": ["200", "202"],
  "GET /search/fuzzy/batch/{format}": ["200", "202"],
  "POST /search/address/batch/sync/{format}": ["200"],
  "POST /search/address/batch/{format}": ["200", "202"],
  "GET /search/address/batch/{format}": ["200", "202"],
  "POST /search/address/reverse/batch/sync/{format}": ["200"],
  "POST /search/address/reverse/batch/{format}": ["200", "202"],
  "GET /search/address/reverse/batch/{format}": ["200", "202"]
};

export function isUnexpected(
  response: SearchListPolygons200Response | SearchListPolygonsDefaultResponse
): response is SearchListPolygonsDefaultResponse;
export function isUnexpected(
  response: SearchFuzzySearch200Response | SearchFuzzySearchDefaultResponse
): response is SearchFuzzySearchDefaultResponse;
export function isUnexpected(
  response:
    | SearchSearchPointOfInterest200Response
    | SearchSearchPointOfInterestDefaultResponse
): response is SearchSearchPointOfInterestDefaultResponse;
export function isUnexpected(
  response:
    | SearchSearchNearbyPointOfInterest200Response
    | SearchSearchNearbyPointOfInterestDefaultResponse
): response is SearchSearchNearbyPointOfInterestDefaultResponse;
export function isUnexpected(
  response:
    | SearchSearchPointOfInterestCategory200Response
    | SearchSearchPointOfInterestCategoryDefaultResponse
): response is SearchSearchPointOfInterestCategoryDefaultResponse;
export function isUnexpected(
  response:
    | SearchGetPointOfInterestCategoryTree200Response
    | SearchGetPointOfInterestCategoryTreeDefaultResponse
): response is SearchGetPointOfInterestCategoryTreeDefaultResponse;
export function isUnexpected(
  response: SearchSearchAddress200Response | SearchSearchAddressDefaultResponse
): response is SearchSearchAddressDefaultResponse;
export function isUnexpected(
  response:
    | SearchReverseSearchAddress200Response
    | SearchReverseSearchAddressDefaultResponse
): response is SearchReverseSearchAddressDefaultResponse;
export function isUnexpected(
  response:
    | SearchReverseSearchCrossStreetAddress200Response
    | SearchReverseSearchCrossStreetAddressDefaultResponse
): response is SearchReverseSearchCrossStreetAddressDefaultResponse;
export function isUnexpected(
  response:
    | SearchSearchStructuredAddress200Response
    | SearchSearchStructuredAddressDefaultResponse
): response is SearchSearchStructuredAddressDefaultResponse;
export function isUnexpected(
  response:
    | SearchSearchInsideGeometry200Response
    | SearchSearchInsideGeometryDefaultResponse
): response is SearchSearchInsideGeometryDefaultResponse;
export function isUnexpected(
  response:
    | SearchSearchAlongRoute200Response
    | SearchSearchAlongRouteDefaultResponse
): response is SearchSearchAlongRouteDefaultResponse;
export function isUnexpected(
  response:
    | SearchFuzzySearchBatchSync200Response
    | SearchFuzzySearchBatchSync408Response
    | SearchFuzzySearchBatchSyncDefaultResponse
): response is SearchFuzzySearchBatchSync408Response;
export function isUnexpected(
  response:
    | SearchSearchAddressBatchSync200Response
    | SearchSearchAddressBatchSync408Response
    | SearchSearchAddressBatchSyncDefaultResponse
): response is SearchSearchAddressBatchSync408Response;
export function isUnexpected(
  response:
    | SearchReverseSearchAddressBatchSync200Response
    | SearchReverseSearchAddressBatchSync408Response
    | SearchReverseSearchAddressBatchSyncDefaultResponse
): response is SearchReverseSearchAddressBatchSync408Response;
export function isUnexpected(
  response:
    | SearchListPolygons200Response
    | SearchListPolygonsDefaultResponse
    | SearchFuzzySearch200Response
    | SearchFuzzySearchDefaultResponse
    | SearchSearchPointOfInterest200Response
    | SearchSearchPointOfInterestDefaultResponse
    | SearchSearchNearbyPointOfInterest200Response
    | SearchSearchNearbyPointOfInterestDefaultResponse
    | SearchSearchPointOfInterestCategory200Response
    | SearchSearchPointOfInterestCategoryDefaultResponse
    | SearchGetPointOfInterestCategoryTree200Response
    | SearchGetPointOfInterestCategoryTreeDefaultResponse
    | SearchSearchAddress200Response
    | SearchSearchAddressDefaultResponse
    | SearchReverseSearchAddress200Response
    | SearchReverseSearchAddressDefaultResponse
    | SearchReverseSearchCrossStreetAddress200Response
    | SearchReverseSearchCrossStreetAddressDefaultResponse
    | SearchSearchStructuredAddress200Response
    | SearchSearchStructuredAddressDefaultResponse
    | SearchSearchInsideGeometry200Response
    | SearchSearchInsideGeometryDefaultResponse
    | SearchSearchAlongRoute200Response
    | SearchSearchAlongRouteDefaultResponse
    | SearchFuzzySearchBatchSync200Response
    | SearchFuzzySearchBatchSync408Response
    | SearchFuzzySearchBatchSyncDefaultResponse
    | SearchSearchAddressBatchSync200Response
    | SearchSearchAddressBatchSync408Response
    | SearchSearchAddressBatchSyncDefaultResponse
    | SearchReverseSearchAddressBatchSync200Response
    | SearchReverseSearchAddressBatchSync408Response
    | SearchReverseSearchAddressBatchSyncDefaultResponse
): response is
  | SearchListPolygonsDefaultResponse
  | SearchFuzzySearchDefaultResponse
  | SearchSearchPointOfInterestDefaultResponse
  | SearchSearchNearbyPointOfInterestDefaultResponse
  | SearchSearchPointOfInterestCategoryDefaultResponse
  | SearchGetPointOfInterestCategoryTreeDefaultResponse
  | SearchSearchAddressDefaultResponse
  | SearchReverseSearchAddressDefaultResponse
  | SearchReverseSearchCrossStreetAddressDefaultResponse
  | SearchSearchStructuredAddressDefaultResponse
  | SearchSearchInsideGeometryDefaultResponse
  | SearchSearchAlongRouteDefaultResponse
  | SearchFuzzySearchBatchSync408Response
  | SearchFuzzySearchBatchSyncDefaultResponse
  | SearchSearchAddressBatchSync408Response
  | SearchSearchAddressBatchSyncDefaultResponse
  | SearchReverseSearchAddressBatchSync408Response
  | SearchReverseSearchAddressBatchSyncDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = geParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function geParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
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
          candidateParts[i]?.startsWith("{") &&
          candidateParts[i]?.endsWith("}")
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
