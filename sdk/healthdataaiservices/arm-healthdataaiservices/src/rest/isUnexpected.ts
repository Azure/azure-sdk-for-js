// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  OperationsList200Response,
  OperationsListDefaultResponse,
  DeidServicesGet200Response,
  DeidServicesGetDefaultResponse,
  DeidServicesCreate200Response,
  DeidServicesCreate201Response,
  DeidServicesCreateLogicalResponse,
  DeidServicesCreateDefaultResponse,
  DeidServicesUpdate200Response,
  DeidServicesUpdate202Response,
  DeidServicesUpdateLogicalResponse,
  DeidServicesUpdateDefaultResponse,
  DeidServicesDelete202Response,
  DeidServicesDelete204Response,
  DeidServicesDeleteLogicalResponse,
  DeidServicesDeleteDefaultResponse,
  DeidServicesListByResourceGroup200Response,
  DeidServicesListByResourceGroupDefaultResponse,
  DeidServicesListBySubscription200Response,
  DeidServicesListBySubscriptionDefaultResponse,
  PrivateEndpointConnectionsGet200Response,
  PrivateEndpointConnectionsGetDefaultResponse,
  PrivateEndpointConnectionsCreate200Response,
  PrivateEndpointConnectionsCreate201Response,
  PrivateEndpointConnectionsCreateLogicalResponse,
  PrivateEndpointConnectionsCreateDefaultResponse,
  PrivateEndpointConnectionsDelete202Response,
  PrivateEndpointConnectionsDelete204Response,
  PrivateEndpointConnectionsDeleteLogicalResponse,
  PrivateEndpointConnectionsDeleteDefaultResponse,
  PrivateEndpointConnectionsListByDeidService200Response,
  PrivateEndpointConnectionsListByDeidServiceDefaultResponse,
  PrivateLinksListByDeidService200Response,
  PrivateLinksListByDeidServiceDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "GET /providers/Microsoft.HealthDataAIServices/operations": ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}":
    ["200", "201"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}":
    ["200", "202"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.HealthDataAIServices/deidServices": [
    "200",
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateEndpointConnections/{privateEndpointConnectionName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateEndpointConnections/{privateEndpointConnectionName}":
    ["200", "201"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateEndpointConnections/{privateEndpointConnectionName}":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateEndpointConnections":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateLinkResources":
    ["200"],
};

export function isUnexpected(
  response: OperationsList200Response | OperationsListDefaultResponse,
): response is OperationsListDefaultResponse;
export function isUnexpected(
  response: DeidServicesGet200Response | DeidServicesGetDefaultResponse,
): response is DeidServicesGetDefaultResponse;
export function isUnexpected(
  response:
    | DeidServicesCreate200Response
    | DeidServicesCreate201Response
    | DeidServicesCreateLogicalResponse
    | DeidServicesCreateDefaultResponse,
): response is DeidServicesCreateDefaultResponse;
export function isUnexpected(
  response:
    | DeidServicesUpdate200Response
    | DeidServicesUpdate202Response
    | DeidServicesUpdateLogicalResponse
    | DeidServicesUpdateDefaultResponse,
): response is DeidServicesUpdateDefaultResponse;
export function isUnexpected(
  response:
    | DeidServicesDelete202Response
    | DeidServicesDelete204Response
    | DeidServicesDeleteLogicalResponse
    | DeidServicesDeleteDefaultResponse,
): response is DeidServicesDeleteDefaultResponse;
export function isUnexpected(
  response:
    | DeidServicesListByResourceGroup200Response
    | DeidServicesListByResourceGroupDefaultResponse,
): response is DeidServicesListByResourceGroupDefaultResponse;
export function isUnexpected(
  response:
    | DeidServicesListBySubscription200Response
    | DeidServicesListBySubscriptionDefaultResponse,
): response is DeidServicesListBySubscriptionDefaultResponse;
export function isUnexpected(
  response: PrivateEndpointConnectionsGet200Response | PrivateEndpointConnectionsGetDefaultResponse,
): response is PrivateEndpointConnectionsGetDefaultResponse;
export function isUnexpected(
  response:
    | PrivateEndpointConnectionsCreate200Response
    | PrivateEndpointConnectionsCreate201Response
    | PrivateEndpointConnectionsCreateLogicalResponse
    | PrivateEndpointConnectionsCreateDefaultResponse,
): response is PrivateEndpointConnectionsCreateDefaultResponse;
export function isUnexpected(
  response:
    | PrivateEndpointConnectionsDelete202Response
    | PrivateEndpointConnectionsDelete204Response
    | PrivateEndpointConnectionsDeleteLogicalResponse
    | PrivateEndpointConnectionsDeleteDefaultResponse,
): response is PrivateEndpointConnectionsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | PrivateEndpointConnectionsListByDeidService200Response
    | PrivateEndpointConnectionsListByDeidServiceDefaultResponse,
): response is PrivateEndpointConnectionsListByDeidServiceDefaultResponse;
export function isUnexpected(
  response: PrivateLinksListByDeidService200Response | PrivateLinksListByDeidServiceDefaultResponse,
): response is PrivateLinksListByDeidServiceDefaultResponse;
export function isUnexpected(
  response:
    | OperationsList200Response
    | OperationsListDefaultResponse
    | DeidServicesGet200Response
    | DeidServicesGetDefaultResponse
    | DeidServicesCreate200Response
    | DeidServicesCreate201Response
    | DeidServicesCreateLogicalResponse
    | DeidServicesCreateDefaultResponse
    | DeidServicesUpdate200Response
    | DeidServicesUpdate202Response
    | DeidServicesUpdateLogicalResponse
    | DeidServicesUpdateDefaultResponse
    | DeidServicesDelete202Response
    | DeidServicesDelete204Response
    | DeidServicesDeleteLogicalResponse
    | DeidServicesDeleteDefaultResponse
    | DeidServicesListByResourceGroup200Response
    | DeidServicesListByResourceGroupDefaultResponse
    | DeidServicesListBySubscription200Response
    | DeidServicesListBySubscriptionDefaultResponse
    | PrivateEndpointConnectionsGet200Response
    | PrivateEndpointConnectionsGetDefaultResponse
    | PrivateEndpointConnectionsCreate200Response
    | PrivateEndpointConnectionsCreate201Response
    | PrivateEndpointConnectionsCreateLogicalResponse
    | PrivateEndpointConnectionsCreateDefaultResponse
    | PrivateEndpointConnectionsDelete202Response
    | PrivateEndpointConnectionsDelete204Response
    | PrivateEndpointConnectionsDeleteLogicalResponse
    | PrivateEndpointConnectionsDeleteDefaultResponse
    | PrivateEndpointConnectionsListByDeidService200Response
    | PrivateEndpointConnectionsListByDeidServiceDefaultResponse
    | PrivateLinksListByDeidService200Response
    | PrivateLinksListByDeidServiceDefaultResponse,
): response is
  | OperationsListDefaultResponse
  | DeidServicesGetDefaultResponse
  | DeidServicesCreateDefaultResponse
  | DeidServicesUpdateDefaultResponse
  | DeidServicesDeleteDefaultResponse
  | DeidServicesListByResourceGroupDefaultResponse
  | DeidServicesListBySubscriptionDefaultResponse
  | PrivateEndpointConnectionsGetDefaultResponse
  | PrivateEndpointConnectionsCreateDefaultResponse
  | PrivateEndpointConnectionsDeleteDefaultResponse
  | PrivateEndpointConnectionsListByDeidServiceDefaultResponse
  | PrivateLinksListByDeidServiceDefaultResponse {
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
