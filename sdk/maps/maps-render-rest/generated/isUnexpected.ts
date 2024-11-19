// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  RenderGetMapTile200Response,
  RenderGetMapTileDefaultResponse,
  RenderGetMapTileset200Response,
  RenderGetMapTilesetDefaultResponse,
  RenderGetMapAttribution200Response,
  RenderGetMapAttributionDefaultResponse,
  RenderGetMapStateTile200Response,
  RenderGetMapStateTileDefaultResponse,
  RenderGetCopyrightCaption200Response,
  RenderGetCopyrightCaptionDefaultResponse,
  RenderGetMapStaticImage200Response,
  RenderGetMapStaticImageDefaultResponse,
  RenderGetCopyrightFromBoundingBox200Response,
  RenderGetCopyrightFromBoundingBoxDefaultResponse,
  RenderGetCopyrightForTile200Response,
  RenderGetCopyrightForTileDefaultResponse,
  RenderGetCopyrightForWorld200Response,
  RenderGetCopyrightForWorldDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /map/tile": ["200"],
  "GET /map/tileset": ["200"],
  "GET /map/attribution": ["200"],
  "GET /map/statetile": ["200"],
  "GET /map/copyright/caption/{format}": ["200"],
  "GET /map/static": ["200"],
  "GET /map/copyright/bounding/{format}": ["200"],
  "GET /map/copyright/tile/{format}": ["200"],
  "GET /map/copyright/world/{format}": ["200"],
};

export function isUnexpected(
  response: RenderGetMapTile200Response | RenderGetMapTileDefaultResponse,
): response is RenderGetMapTileDefaultResponse;
export function isUnexpected(
  response: RenderGetMapTileset200Response | RenderGetMapTilesetDefaultResponse,
): response is RenderGetMapTilesetDefaultResponse;
export function isUnexpected(
  response:
    | RenderGetMapAttribution200Response
    | RenderGetMapAttributionDefaultResponse,
): response is RenderGetMapAttributionDefaultResponse;
export function isUnexpected(
  response:
    | RenderGetMapStateTile200Response
    | RenderGetMapStateTileDefaultResponse,
): response is RenderGetMapStateTileDefaultResponse;
export function isUnexpected(
  response:
    | RenderGetCopyrightCaption200Response
    | RenderGetCopyrightCaptionDefaultResponse,
): response is RenderGetCopyrightCaptionDefaultResponse;
export function isUnexpected(
  response:
    | RenderGetMapStaticImage200Response
    | RenderGetMapStaticImageDefaultResponse,
): response is RenderGetMapStaticImageDefaultResponse;
export function isUnexpected(
  response:
    | RenderGetCopyrightFromBoundingBox200Response
    | RenderGetCopyrightFromBoundingBoxDefaultResponse,
): response is RenderGetCopyrightFromBoundingBoxDefaultResponse;
export function isUnexpected(
  response:
    | RenderGetCopyrightForTile200Response
    | RenderGetCopyrightForTileDefaultResponse,
): response is RenderGetCopyrightForTileDefaultResponse;
export function isUnexpected(
  response:
    | RenderGetCopyrightForWorld200Response
    | RenderGetCopyrightForWorldDefaultResponse,
): response is RenderGetCopyrightForWorldDefaultResponse;
export function isUnexpected(
  response:
    | RenderGetMapTile200Response
    | RenderGetMapTileDefaultResponse
    | RenderGetMapTileset200Response
    | RenderGetMapTilesetDefaultResponse
    | RenderGetMapAttribution200Response
    | RenderGetMapAttributionDefaultResponse
    | RenderGetMapStateTile200Response
    | RenderGetMapStateTileDefaultResponse
    | RenderGetCopyrightCaption200Response
    | RenderGetCopyrightCaptionDefaultResponse
    | RenderGetMapStaticImage200Response
    | RenderGetMapStaticImageDefaultResponse
    | RenderGetCopyrightFromBoundingBox200Response
    | RenderGetCopyrightFromBoundingBoxDefaultResponse
    | RenderGetCopyrightForTile200Response
    | RenderGetCopyrightForTileDefaultResponse
    | RenderGetCopyrightForWorld200Response
    | RenderGetCopyrightForWorldDefaultResponse,
): response is
  | RenderGetMapTileDefaultResponse
  | RenderGetMapTilesetDefaultResponse
  | RenderGetMapAttributionDefaultResponse
  | RenderGetMapStateTileDefaultResponse
  | RenderGetCopyrightCaptionDefaultResponse
  | RenderGetMapStaticImageDefaultResponse
  | RenderGetCopyrightFromBoundingBoxDefaultResponse
  | RenderGetCopyrightForTileDefaultResponse
  | RenderGetCopyrightForWorldDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = getParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function getParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: string[] = [];

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

    // track if we have found a match to return the values found.
    let found = true;
    for (
      let i = candidateParts.length - 1, j = pathParts.length - 1;
      i >= 1 && j >= 1;
      i--, j--
    ) {
      if (
        candidateParts[i]?.startsWith("{") &&
        candidateParts[i]?.indexOf("}") !== -1
      ) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(
          `${candidateParts[i]?.slice(start, end)}`,
        ).test(pathParts[j] || "");

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
