// Licensed under the MIT license.

import {
  OperationsList200Response,
  OperationsListDefaultResponse,
  OperationStatusGet200Response,
  OperationStatusGetDefaultResponse,
  AssetsGet200Response,
  AssetsGetDefaultResponse,
  AssetsCreateOrReplace200Response,
  AssetsCreateOrReplace201Response,
  AssetsCreateOrReplaceLogicalResponse,
  AssetsCreateOrReplaceDefaultResponse,
  AssetsUpdate200Response,
  AssetsUpdate202Response,
  AssetsUpdateLogicalResponse,
  AssetsUpdateDefaultResponse,
  AssetsDelete202Response,
  AssetsDelete204Response,
  AssetsDeleteLogicalResponse,
  AssetsDeleteDefaultResponse,
  AssetsListByResourceGroup200Response,
  AssetsListByResourceGroupDefaultResponse,
  AssetsListBySubscription200Response,
  AssetsListBySubscriptionDefaultResponse,
  AssetEndpointProfilesGet200Response,
  AssetEndpointProfilesGetDefaultResponse,
  AssetEndpointProfilesCreateOrReplace200Response,
  AssetEndpointProfilesCreateOrReplace201Response,
  AssetEndpointProfilesCreateOrReplaceLogicalResponse,
  AssetEndpointProfilesCreateOrReplaceDefaultResponse,
  AssetEndpointProfilesUpdate200Response,
  AssetEndpointProfilesUpdate202Response,
  AssetEndpointProfilesUpdateLogicalResponse,
  AssetEndpointProfilesUpdateDefaultResponse,
  AssetEndpointProfilesDelete202Response,
  AssetEndpointProfilesDelete204Response,
  AssetEndpointProfilesDeleteLogicalResponse,
  AssetEndpointProfilesDeleteDefaultResponse,
  AssetEndpointProfilesListByResourceGroup200Response,
  AssetEndpointProfilesListByResourceGroupDefaultResponse,
  AssetEndpointProfilesListBySubscription200Response,
  AssetEndpointProfilesListBySubscriptionDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "GET /providers/Microsoft.DeviceRegistry/operations": ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/locations/{location}/operationStatuses/{operationId}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets/{assetName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets/{assetName}":
    ["200", "201"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets/{assetName}":
    ["200", "202"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets/{assetName}":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/assets":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles/{assetEndpointProfileName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles/{assetEndpointProfileName}":
    ["200", "201"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles/{assetEndpointProfileName}":
    ["200", "202"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles/{assetEndpointProfileName}":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles":
    ["200"],
};

export function isUnexpected(
  response: OperationsList200Response | OperationsListDefaultResponse,
): response is OperationsListDefaultResponse;
export function isUnexpected(
  response: OperationStatusGet200Response | OperationStatusGetDefaultResponse,
): response is OperationStatusGetDefaultResponse;
export function isUnexpected(
  response: AssetsGet200Response | AssetsGetDefaultResponse,
): response is AssetsGetDefaultResponse;
export function isUnexpected(
  response:
    | AssetsCreateOrReplace200Response
    | AssetsCreateOrReplace201Response
    | AssetsCreateOrReplaceLogicalResponse
    | AssetsCreateOrReplaceDefaultResponse,
): response is AssetsCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response:
    | AssetsUpdate200Response
    | AssetsUpdate202Response
    | AssetsUpdateLogicalResponse
    | AssetsUpdateDefaultResponse,
): response is AssetsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | AssetsDelete202Response
    | AssetsDelete204Response
    | AssetsDeleteLogicalResponse
    | AssetsDeleteDefaultResponse,
): response is AssetsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | AssetsListByResourceGroup200Response
    | AssetsListByResourceGroupDefaultResponse,
): response is AssetsListByResourceGroupDefaultResponse;
export function isUnexpected(
  response:
    | AssetsListBySubscription200Response
    | AssetsListBySubscriptionDefaultResponse,
): response is AssetsListBySubscriptionDefaultResponse;
export function isUnexpected(
  response:
    | AssetEndpointProfilesGet200Response
    | AssetEndpointProfilesGetDefaultResponse,
): response is AssetEndpointProfilesGetDefaultResponse;
export function isUnexpected(
  response:
    | AssetEndpointProfilesCreateOrReplace200Response
    | AssetEndpointProfilesCreateOrReplace201Response
    | AssetEndpointProfilesCreateOrReplaceLogicalResponse
    | AssetEndpointProfilesCreateOrReplaceDefaultResponse,
): response is AssetEndpointProfilesCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response:
    | AssetEndpointProfilesUpdate200Response
    | AssetEndpointProfilesUpdate202Response
    | AssetEndpointProfilesUpdateLogicalResponse
    | AssetEndpointProfilesUpdateDefaultResponse,
): response is AssetEndpointProfilesUpdateDefaultResponse;
export function isUnexpected(
  response:
    | AssetEndpointProfilesDelete202Response
    | AssetEndpointProfilesDelete204Response
    | AssetEndpointProfilesDeleteLogicalResponse
    | AssetEndpointProfilesDeleteDefaultResponse,
): response is AssetEndpointProfilesDeleteDefaultResponse;
export function isUnexpected(
  response:
    | AssetEndpointProfilesListByResourceGroup200Response
    | AssetEndpointProfilesListByResourceGroupDefaultResponse,
): response is AssetEndpointProfilesListByResourceGroupDefaultResponse;
export function isUnexpected(
  response:
    | AssetEndpointProfilesListBySubscription200Response
    | AssetEndpointProfilesListBySubscriptionDefaultResponse,
): response is AssetEndpointProfilesListBySubscriptionDefaultResponse;
export function isUnexpected(
  response:
    | OperationsList200Response
    | OperationsListDefaultResponse
    | OperationStatusGet200Response
    | OperationStatusGetDefaultResponse
    | AssetsGet200Response
    | AssetsGetDefaultResponse
    | AssetsCreateOrReplace200Response
    | AssetsCreateOrReplace201Response
    | AssetsCreateOrReplaceLogicalResponse
    | AssetsCreateOrReplaceDefaultResponse
    | AssetsUpdate200Response
    | AssetsUpdate202Response
    | AssetsUpdateLogicalResponse
    | AssetsUpdateDefaultResponse
    | AssetsDelete202Response
    | AssetsDelete204Response
    | AssetsDeleteLogicalResponse
    | AssetsDeleteDefaultResponse
    | AssetsListByResourceGroup200Response
    | AssetsListByResourceGroupDefaultResponse
    | AssetsListBySubscription200Response
    | AssetsListBySubscriptionDefaultResponse
    | AssetEndpointProfilesGet200Response
    | AssetEndpointProfilesGetDefaultResponse
    | AssetEndpointProfilesCreateOrReplace200Response
    | AssetEndpointProfilesCreateOrReplace201Response
    | AssetEndpointProfilesCreateOrReplaceLogicalResponse
    | AssetEndpointProfilesCreateOrReplaceDefaultResponse
    | AssetEndpointProfilesUpdate200Response
    | AssetEndpointProfilesUpdate202Response
    | AssetEndpointProfilesUpdateLogicalResponse
    | AssetEndpointProfilesUpdateDefaultResponse
    | AssetEndpointProfilesDelete202Response
    | AssetEndpointProfilesDelete204Response
    | AssetEndpointProfilesDeleteLogicalResponse
    | AssetEndpointProfilesDeleteDefaultResponse
    | AssetEndpointProfilesListByResourceGroup200Response
    | AssetEndpointProfilesListByResourceGroupDefaultResponse
    | AssetEndpointProfilesListBySubscription200Response
    | AssetEndpointProfilesListBySubscriptionDefaultResponse,
): response is
  | OperationsListDefaultResponse
  | OperationStatusGetDefaultResponse
  | AssetsGetDefaultResponse
  | AssetsCreateOrReplaceDefaultResponse
  | AssetsUpdateDefaultResponse
  | AssetsDeleteDefaultResponse
  | AssetsListByResourceGroupDefaultResponse
  | AssetsListBySubscriptionDefaultResponse
  | AssetEndpointProfilesGetDefaultResponse
  | AssetEndpointProfilesCreateOrReplaceDefaultResponse
  | AssetEndpointProfilesUpdateDefaultResponse
  | AssetEndpointProfilesDeleteDefaultResponse
  | AssetEndpointProfilesListByResourceGroupDefaultResponse
  | AssetEndpointProfilesListBySubscriptionDefaultResponse {
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
