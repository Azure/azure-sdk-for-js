// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationsList200Response,
  OperationsListDefaultResponse,
  FleetsGet200Response,
  FleetsGetDefaultResponse,
  FleetsCreateOrUpdate200Response,
  FleetsCreateOrUpdate201Response,
  FleetsCreateOrUpdateLogicalResponse,
  FleetsCreateOrUpdateDefaultResponse,
  FleetsUpdate200Response,
  FleetsUpdate202Response,
  FleetsUpdateLogicalResponse,
  FleetsUpdateDefaultResponse,
  FleetsDelete202Response,
  FleetsDelete204Response,
  FleetsDeleteLogicalResponse,
  FleetsDeleteDefaultResponse,
  FleetsListByResourceGroup200Response,
  FleetsListByResourceGroupDefaultResponse,
  FleetsListBySubscription200Response,
  FleetsListBySubscriptionDefaultResponse,
  FleetsListVirtualMachineScaleSets200Response,
  FleetsListVirtualMachineScaleSetsDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "GET /providers/Microsoft.AzureFleet/operations": ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}":
    ["200", "201"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}":
    ["200", "202"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.AzureFleet/fleets": ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{name}/virtualMachineScaleSets":
    ["200"],
};

export function isUnexpected(
  response: OperationsList200Response | OperationsListDefaultResponse,
): response is OperationsListDefaultResponse;
export function isUnexpected(
  response: FleetsGet200Response | FleetsGetDefaultResponse,
): response is FleetsGetDefaultResponse;
export function isUnexpected(
  response:
    | FleetsCreateOrUpdate200Response
    | FleetsCreateOrUpdate201Response
    | FleetsCreateOrUpdateLogicalResponse
    | FleetsCreateOrUpdateDefaultResponse,
): response is FleetsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | FleetsUpdate200Response
    | FleetsUpdate202Response
    | FleetsUpdateLogicalResponse
    | FleetsUpdateDefaultResponse,
): response is FleetsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | FleetsDelete202Response
    | FleetsDelete204Response
    | FleetsDeleteLogicalResponse
    | FleetsDeleteDefaultResponse,
): response is FleetsDeleteDefaultResponse;
export function isUnexpected(
  response: FleetsListByResourceGroup200Response | FleetsListByResourceGroupDefaultResponse,
): response is FleetsListByResourceGroupDefaultResponse;
export function isUnexpected(
  response: FleetsListBySubscription200Response | FleetsListBySubscriptionDefaultResponse,
): response is FleetsListBySubscriptionDefaultResponse;
export function isUnexpected(
  response:
    | FleetsListVirtualMachineScaleSets200Response
    | FleetsListVirtualMachineScaleSetsDefaultResponse,
): response is FleetsListVirtualMachineScaleSetsDefaultResponse;
export function isUnexpected(
  response:
    | OperationsList200Response
    | OperationsListDefaultResponse
    | FleetsGet200Response
    | FleetsGetDefaultResponse
    | FleetsCreateOrUpdate200Response
    | FleetsCreateOrUpdate201Response
    | FleetsCreateOrUpdateLogicalResponse
    | FleetsCreateOrUpdateDefaultResponse
    | FleetsUpdate200Response
    | FleetsUpdate202Response
    | FleetsUpdateLogicalResponse
    | FleetsUpdateDefaultResponse
    | FleetsDelete202Response
    | FleetsDelete204Response
    | FleetsDeleteLogicalResponse
    | FleetsDeleteDefaultResponse
    | FleetsListByResourceGroup200Response
    | FleetsListByResourceGroupDefaultResponse
    | FleetsListBySubscription200Response
    | FleetsListBySubscriptionDefaultResponse
    | FleetsListVirtualMachineScaleSets200Response
    | FleetsListVirtualMachineScaleSetsDefaultResponse,
): response is
  | OperationsListDefaultResponse
  | FleetsGetDefaultResponse
  | FleetsCreateOrUpdateDefaultResponse
  | FleetsUpdateDefaultResponse
  | FleetsDeleteDefaultResponse
  | FleetsListByResourceGroupDefaultResponse
  | FleetsListBySubscriptionDefaultResponse
  | FleetsListVirtualMachineScaleSetsDefaultResponse {
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
