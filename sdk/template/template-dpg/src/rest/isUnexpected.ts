// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import {
  ListWidgets200Response,
  ListWidgetsDefaultResponse,
  CreateWidget201Response,
  CreateWidgetDefaultResponse,
  GetWidget200Response,
  GetWidgetDefaultResponse,
  UpdateWidget200Response,
  UpdateWidgetDefaultResponse,
  DeleteWidget204Response,
  DeleteWidgetDefaultResponse,
  AnalyzeWidget200Response,
  AnalyzeWidgetDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "GET /widgets": ["200"],
  "POST /widgets": ["201"],
  "GET /widgets/{id}": ["200"],
  "PATCH /widgets/{id}": ["200"],
  "DELETE /widgets/{id}": ["204"],
  "POST /widgets/{id}/analyze": ["200"],
};

export function isUnexpected(
  response: ListWidgets200Response | ListWidgetsDefaultResponse
): response is ListWidgetsDefaultResponse;
export function isUnexpected(
  response: CreateWidget201Response | CreateWidgetDefaultResponse
): response is CreateWidgetDefaultResponse;
export function isUnexpected(
  response: GetWidget200Response | GetWidgetDefaultResponse
): response is GetWidgetDefaultResponse;
export function isUnexpected(
  response: UpdateWidget200Response | UpdateWidgetDefaultResponse
): response is UpdateWidgetDefaultResponse;
export function isUnexpected(
  response: DeleteWidget204Response | DeleteWidgetDefaultResponse
): response is DeleteWidgetDefaultResponse;
export function isUnexpected(
  response: AnalyzeWidget200Response | AnalyzeWidgetDefaultResponse
): response is AnalyzeWidgetDefaultResponse;
export function isUnexpected(
  response:
    | ListWidgets200Response
    | ListWidgetsDefaultResponse
    | CreateWidget201Response
    | CreateWidgetDefaultResponse
    | GetWidget200Response
    | GetWidgetDefaultResponse
    | UpdateWidget200Response
    | UpdateWidgetDefaultResponse
    | DeleteWidget204Response
    | DeleteWidgetDefaultResponse
    | AnalyzeWidget200Response
    | AnalyzeWidgetDefaultResponse
): response is
  | ListWidgetsDefaultResponse
  | CreateWidgetDefaultResponse
  | GetWidgetDefaultResponse
  | UpdateWidgetDefaultResponse
  | DeleteWidgetDefaultResponse
  | AnalyzeWidgetDefaultResponse {
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
    for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
      if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.indexOf("}") !== -1) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(`${candidateParts[i]?.slice(start, end)}`).test(
          pathParts[j] || ""
        );

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
