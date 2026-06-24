// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AnalyzeImage200Response,
  AnalyzeImageDefaultResponse,
  AnalyzeText200Response,
  AnalyzeTextDefaultResponse,
  ShieldPrompt200Response,
  ShieldPromptDefaultResponse,
  DetectTextProtectedMaterial200Response,
  DetectTextProtectedMaterialDefaultResponse,
  GetTextBlocklist200Response,
  GetTextBlocklistDefaultResponse,
  CreateOrUpdateTextBlocklist200Response,
  CreateOrUpdateTextBlocklist201Response,
  CreateOrUpdateTextBlocklistDefaultResponse,
  DeleteTextBlocklist204Response,
  DeleteTextBlocklistDefaultResponse,
  ListTextBlocklists200Response,
  ListTextBlocklistsDefaultResponse,
  AddOrUpdateBlocklistItems200Response,
  AddOrUpdateBlocklistItemsDefaultResponse,
  RemoveBlocklistItems204Response,
  RemoveBlocklistItemsDefaultResponse,
  GetTextBlocklistItem200Response,
  GetTextBlocklistItemDefaultResponse,
  ListTextBlocklistItems200Response,
  ListTextBlocklistItemsDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "POST /image:analyze": ["200"],
  "POST /text:analyze": ["200"],
  "POST /text:shieldPrompt": ["200"],
  "POST /text:detectProtectedMaterial": ["200"],
  "GET /text/blocklists/{blocklistName}": ["200"],
  "PATCH /text/blocklists/{blocklistName}": ["200", "201"],
  "DELETE /text/blocklists/{blocklistName}": ["204"],
  "GET /text/blocklists": ["200"],
  "POST /text/blocklists/{blocklistName}:addOrUpdateBlocklistItems": ["200"],
  "POST /text/blocklists/{blocklistName}:removeBlocklistItems": ["204"],
  "GET /text/blocklists/{blocklistName}/blocklistItems/{blocklistItemId}": ["200"],
  "GET /text/blocklists/{blocklistName}/blocklistItems": ["200"],
};

export function isUnexpected(
  response: AnalyzeImage200Response | AnalyzeImageDefaultResponse,
): response is AnalyzeImageDefaultResponse;
export function isUnexpected(
  response: AnalyzeText200Response | AnalyzeTextDefaultResponse,
): response is AnalyzeTextDefaultResponse;
export function isUnexpected(
  response: ShieldPrompt200Response | ShieldPromptDefaultResponse,
): response is ShieldPromptDefaultResponse;
export function isUnexpected(
  response: DetectTextProtectedMaterial200Response | DetectTextProtectedMaterialDefaultResponse,
): response is DetectTextProtectedMaterialDefaultResponse;
export function isUnexpected(
  response: GetTextBlocklist200Response | GetTextBlocklistDefaultResponse,
): response is GetTextBlocklistDefaultResponse;
export function isUnexpected(
  response:
    | CreateOrUpdateTextBlocklist200Response
    | CreateOrUpdateTextBlocklist201Response
    | CreateOrUpdateTextBlocklistDefaultResponse,
): response is CreateOrUpdateTextBlocklistDefaultResponse;
export function isUnexpected(
  response: DeleteTextBlocklist204Response | DeleteTextBlocklistDefaultResponse,
): response is DeleteTextBlocklistDefaultResponse;
export function isUnexpected(
  response: ListTextBlocklists200Response | ListTextBlocklistsDefaultResponse,
): response is ListTextBlocklistsDefaultResponse;
export function isUnexpected(
  response: AddOrUpdateBlocklistItems200Response | AddOrUpdateBlocklistItemsDefaultResponse,
): response is AddOrUpdateBlocklistItemsDefaultResponse;
export function isUnexpected(
  response: RemoveBlocklistItems204Response | RemoveBlocklistItemsDefaultResponse,
): response is RemoveBlocklistItemsDefaultResponse;
export function isUnexpected(
  response: GetTextBlocklistItem200Response | GetTextBlocklistItemDefaultResponse,
): response is GetTextBlocklistItemDefaultResponse;
export function isUnexpected(
  response: ListTextBlocklistItems200Response | ListTextBlocklistItemsDefaultResponse,
): response is ListTextBlocklistItemsDefaultResponse;
export function isUnexpected(
  response:
    | AnalyzeImage200Response
    | AnalyzeImageDefaultResponse
    | AnalyzeText200Response
    | AnalyzeTextDefaultResponse
    | ShieldPrompt200Response
    | ShieldPromptDefaultResponse
    | DetectTextProtectedMaterial200Response
    | DetectTextProtectedMaterialDefaultResponse
    | GetTextBlocklist200Response
    | GetTextBlocklistDefaultResponse
    | CreateOrUpdateTextBlocklist200Response
    | CreateOrUpdateTextBlocklist201Response
    | CreateOrUpdateTextBlocklistDefaultResponse
    | DeleteTextBlocklist204Response
    | DeleteTextBlocklistDefaultResponse
    | ListTextBlocklists200Response
    | ListTextBlocklistsDefaultResponse
    | AddOrUpdateBlocklistItems200Response
    | AddOrUpdateBlocklistItemsDefaultResponse
    | RemoveBlocklistItems204Response
    | RemoveBlocklistItemsDefaultResponse
    | GetTextBlocklistItem200Response
    | GetTextBlocklistItemDefaultResponse
    | ListTextBlocklistItems200Response
    | ListTextBlocklistItemsDefaultResponse,
): response is
  | AnalyzeImageDefaultResponse
  | AnalyzeTextDefaultResponse
  | ShieldPromptDefaultResponse
  | DetectTextProtectedMaterialDefaultResponse
  | GetTextBlocklistDefaultResponse
  | CreateOrUpdateTextBlocklistDefaultResponse
  | DeleteTextBlocklistDefaultResponse
  | ListTextBlocklistsDefaultResponse
  | AddOrUpdateBlocklistItemsDefaultResponse
  | RemoveBlocklistItemsDefaultResponse
  | GetTextBlocklistItemDefaultResponse
  | ListTextBlocklistItemsDefaultResponse {
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
          pathParts[j] || "",
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
