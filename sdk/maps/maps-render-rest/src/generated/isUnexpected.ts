// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
  RenderGetCopyrightForWorldDefaultResponse
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
  "GET /map/copyright/world/{format}": ["200"]
};

export function isUnexpected(
  response: RenderGetMapTile200Response | RenderGetMapTileDefaultResponse
): response is RenderGetMapTileDefaultResponse;
export function isUnexpected(
  response: RenderGetMapTileset200Response | RenderGetMapTilesetDefaultResponse
): response is RenderGetMapTilesetDefaultResponse;
export function isUnexpected(
  response:
    | RenderGetMapAttribution200Response
    | RenderGetMapAttributionDefaultResponse
): response is RenderGetMapAttributionDefaultResponse;
export function isUnexpected(
  response:
    | RenderGetMapStateTile200Response
    | RenderGetMapStateTileDefaultResponse
): response is RenderGetMapStateTileDefaultResponse;
export function isUnexpected(
  response:
    | RenderGetCopyrightCaption200Response
    | RenderGetCopyrightCaptionDefaultResponse
): response is RenderGetCopyrightCaptionDefaultResponse;
export function isUnexpected(
  response:
    | RenderGetMapStaticImage200Response
    | RenderGetMapStaticImageDefaultResponse
): response is RenderGetMapStaticImageDefaultResponse;
export function isUnexpected(
  response:
    | RenderGetCopyrightFromBoundingBox200Response
    | RenderGetCopyrightFromBoundingBoxDefaultResponse
): response is RenderGetCopyrightFromBoundingBoxDefaultResponse;
export function isUnexpected(
  response:
    | RenderGetCopyrightForTile200Response
    | RenderGetCopyrightForTileDefaultResponse
): response is RenderGetCopyrightForTileDefaultResponse;
export function isUnexpected(
  response:
    | RenderGetCopyrightForWorld200Response
    | RenderGetCopyrightForWorldDefaultResponse
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
    | RenderGetCopyrightForWorldDefaultResponse
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
