// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TimeZoneGetTimeZoneByID200Response,
  TimeZoneGetTimeZoneByIDDefaultResponse,
  TimeZoneGetTimeZoneByCoordinates200Response,
  TimeZoneGetTimeZoneByCoordinatesDefaultResponse,
  TimeZoneGetWindowsTimezoneIds200Response,
  TimeZoneGetWindowsTimezoneIdsDefaultResponse,
  TimeZoneGetIanaTimezoneIds200Response,
  TimeZoneGetIanaTimezoneIdsDefaultResponse,
  TimeZoneGetIanaVersion200Response,
  TimeZoneGetIanaVersionDefaultResponse,
  TimeZoneConvertWindowsTimezoneToIana200Response,
  TimeZoneConvertWindowsTimezoneToIanaDefaultResponse
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /timezone/byId/{format}": ["200"],
  "GET /timezone/byCoordinates/{format}": ["200"],
  "GET /timezone/enumWindows/{format}": ["200"],
  "GET /timezone/enumIana/{format}": ["200"],
  "GET /timezone/ianaVersion/{format}": ["200"],
  "GET /timezone/windowsToIana/{format}": ["200"]
};

export function isUnexpected(
  response:
    | TimeZoneGetTimeZoneByID200Response
    | TimeZoneGetTimeZoneByIDDefaultResponse
): response is TimeZoneGetTimeZoneByIDDefaultResponse;
export function isUnexpected(
  response:
    | TimeZoneGetTimeZoneByCoordinates200Response
    | TimeZoneGetTimeZoneByCoordinatesDefaultResponse
): response is TimeZoneGetTimeZoneByCoordinatesDefaultResponse;
export function isUnexpected(
  response:
    | TimeZoneGetWindowsTimezoneIds200Response
    | TimeZoneGetWindowsTimezoneIdsDefaultResponse
): response is TimeZoneGetWindowsTimezoneIdsDefaultResponse;
export function isUnexpected(
  response:
    | TimeZoneGetIanaTimezoneIds200Response
    | TimeZoneGetIanaTimezoneIdsDefaultResponse
): response is TimeZoneGetIanaTimezoneIdsDefaultResponse;
export function isUnexpected(
  response:
    | TimeZoneGetIanaVersion200Response
    | TimeZoneGetIanaVersionDefaultResponse
): response is TimeZoneGetIanaVersionDefaultResponse;
export function isUnexpected(
  response:
    | TimeZoneConvertWindowsTimezoneToIana200Response
    | TimeZoneConvertWindowsTimezoneToIanaDefaultResponse
): response is TimeZoneConvertWindowsTimezoneToIanaDefaultResponse;
export function isUnexpected(
  response:
    | TimeZoneGetTimeZoneByID200Response
    | TimeZoneGetTimeZoneByIDDefaultResponse
    | TimeZoneGetTimeZoneByCoordinates200Response
    | TimeZoneGetTimeZoneByCoordinatesDefaultResponse
    | TimeZoneGetWindowsTimezoneIds200Response
    | TimeZoneGetWindowsTimezoneIdsDefaultResponse
    | TimeZoneGetIanaTimezoneIds200Response
    | TimeZoneGetIanaTimezoneIdsDefaultResponse
    | TimeZoneGetIanaVersion200Response
    | TimeZoneGetIanaVersionDefaultResponse
    | TimeZoneConvertWindowsTimezoneToIana200Response
    | TimeZoneConvertWindowsTimezoneToIanaDefaultResponse
): response is
  | TimeZoneGetTimeZoneByIDDefaultResponse
  | TimeZoneGetTimeZoneByCoordinatesDefaultResponse
  | TimeZoneGetWindowsTimezoneIdsDefaultResponse
  | TimeZoneGetIanaTimezoneIdsDefaultResponse
  | TimeZoneGetIanaVersionDefaultResponse
  | TimeZoneConvertWindowsTimezoneToIanaDefaultResponse {
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
