// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AssociationsInterfaceGet200Response,
  AssociationsInterfaceGetDefaultResponse,
  AssociationsInterfaceCreateOrUpdate200Response,
  AssociationsInterfaceCreateOrUpdate201Response,
  AssociationsInterfaceCreateOrUpdateLogicalResponse,
  AssociationsInterfaceCreateOrUpdateDefaultResponse,
  AssociationsInterfaceUpdate200Response,
  AssociationsInterfaceUpdateDefaultResponse,
  AssociationsInterfaceDeleteOperation200Response,
  AssociationsInterfaceDeleteOperation202Response,
  AssociationsInterfaceDeleteOperation204Response,
  AssociationsInterfaceDeleteLogicalResponse,
  AssociationsInterfaceDeleteOperationDefaultResponse,
  AssociationsInterfaceListByTrafficController200Response,
  AssociationsInterfaceListByTrafficControllerDefaultResponse,
  FrontendsInterfaceGet200Response,
  FrontendsInterfaceGetDefaultResponse,
  FrontendsInterfaceCreateOrUpdate200Response,
  FrontendsInterfaceCreateOrUpdate201Response,
  FrontendsInterfaceCreateOrUpdateLogicalResponse,
  FrontendsInterfaceCreateOrUpdateDefaultResponse,
  FrontendsInterfaceUpdate200Response,
  FrontendsInterfaceUpdateDefaultResponse,
  FrontendsInterfaceDeleteOperation200Response,
  FrontendsInterfaceDeleteOperation202Response,
  FrontendsInterfaceDeleteOperation204Response,
  FrontendsInterfaceDeleteLogicalResponse,
  FrontendsInterfaceDeleteOperationDefaultResponse,
  FrontendsInterfaceListByTrafficController200Response,
  FrontendsInterfaceListByTrafficControllerDefaultResponse,
  TrafficControllerInterfaceGet200Response,
  TrafficControllerInterfaceGetDefaultResponse,
  TrafficControllerInterfaceCreateOrUpdate200Response,
  TrafficControllerInterfaceCreateOrUpdate201Response,
  TrafficControllerInterfaceCreateOrUpdateLogicalResponse,
  TrafficControllerInterfaceCreateOrUpdateDefaultResponse,
  TrafficControllerInterfaceUpdate200Response,
  TrafficControllerInterfaceUpdateDefaultResponse,
  TrafficControllerInterfaceDeleteOperation200Response,
  TrafficControllerInterfaceDeleteOperation202Response,
  TrafficControllerInterfaceDeleteOperation204Response,
  TrafficControllerInterfaceDeleteLogicalResponse,
  TrafficControllerInterfaceDeleteOperationDefaultResponse,
  TrafficControllerInterfaceListByResourceGroup200Response,
  TrafficControllerInterfaceListByResourceGroupDefaultResponse,
  TrafficControllerInterfaceListBySubscription200Response,
  TrafficControllerInterfaceListBySubscriptionDefaultResponse,
  OperationsList200Response,
  OperationsListDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/associations/{associationName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/associations/{associationName}":
    ["200", "201"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/associations/{associationName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/associations/{associationName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/associations":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/frontends/{frontendName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/frontends/{frontendName}":
    ["200", "201"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/frontends/{frontendName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/frontends/{frontendName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/frontends":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}":
    ["200", "201"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.ServiceNetworking/trafficControllers":
    ["200"],
  "GET /providers/Microsoft.ServiceNetworking/operations": ["200"],
};

export function isUnexpected(
  response:
    | AssociationsInterfaceGet200Response
    | AssociationsInterfaceGetDefaultResponse,
): response is AssociationsInterfaceGetDefaultResponse;
export function isUnexpected(
  response:
    | AssociationsInterfaceCreateOrUpdate200Response
    | AssociationsInterfaceCreateOrUpdate201Response
    | AssociationsInterfaceCreateOrUpdateLogicalResponse
    | AssociationsInterfaceCreateOrUpdateDefaultResponse,
): response is AssociationsInterfaceCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | AssociationsInterfaceUpdate200Response
    | AssociationsInterfaceUpdateDefaultResponse,
): response is AssociationsInterfaceUpdateDefaultResponse;
export function isUnexpected(
  response:
    | AssociationsInterfaceDeleteOperation200Response
    | AssociationsInterfaceDeleteOperation202Response
    | AssociationsInterfaceDeleteOperation204Response
    | AssociationsInterfaceDeleteLogicalResponse
    | AssociationsInterfaceDeleteOperationDefaultResponse,
): response is AssociationsInterfaceDeleteOperationDefaultResponse;
export function isUnexpected(
  response:
    | AssociationsInterfaceListByTrafficController200Response
    | AssociationsInterfaceListByTrafficControllerDefaultResponse,
): response is AssociationsInterfaceListByTrafficControllerDefaultResponse;
export function isUnexpected(
  response:
    | FrontendsInterfaceGet200Response
    | FrontendsInterfaceGetDefaultResponse,
): response is FrontendsInterfaceGetDefaultResponse;
export function isUnexpected(
  response:
    | FrontendsInterfaceCreateOrUpdate200Response
    | FrontendsInterfaceCreateOrUpdate201Response
    | FrontendsInterfaceCreateOrUpdateLogicalResponse
    | FrontendsInterfaceCreateOrUpdateDefaultResponse,
): response is FrontendsInterfaceCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | FrontendsInterfaceUpdate200Response
    | FrontendsInterfaceUpdateDefaultResponse,
): response is FrontendsInterfaceUpdateDefaultResponse;
export function isUnexpected(
  response:
    | FrontendsInterfaceDeleteOperation200Response
    | FrontendsInterfaceDeleteOperation202Response
    | FrontendsInterfaceDeleteOperation204Response
    | FrontendsInterfaceDeleteLogicalResponse
    | FrontendsInterfaceDeleteOperationDefaultResponse,
): response is FrontendsInterfaceDeleteOperationDefaultResponse;
export function isUnexpected(
  response:
    | FrontendsInterfaceListByTrafficController200Response
    | FrontendsInterfaceListByTrafficControllerDefaultResponse,
): response is FrontendsInterfaceListByTrafficControllerDefaultResponse;
export function isUnexpected(
  response:
    | TrafficControllerInterfaceGet200Response
    | TrafficControllerInterfaceGetDefaultResponse,
): response is TrafficControllerInterfaceGetDefaultResponse;
export function isUnexpected(
  response:
    | TrafficControllerInterfaceCreateOrUpdate200Response
    | TrafficControllerInterfaceCreateOrUpdate201Response
    | TrafficControllerInterfaceCreateOrUpdateLogicalResponse
    | TrafficControllerInterfaceCreateOrUpdateDefaultResponse,
): response is TrafficControllerInterfaceCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | TrafficControllerInterfaceUpdate200Response
    | TrafficControllerInterfaceUpdateDefaultResponse,
): response is TrafficControllerInterfaceUpdateDefaultResponse;
export function isUnexpected(
  response:
    | TrafficControllerInterfaceDeleteOperation200Response
    | TrafficControllerInterfaceDeleteOperation202Response
    | TrafficControllerInterfaceDeleteOperation204Response
    | TrafficControllerInterfaceDeleteLogicalResponse
    | TrafficControllerInterfaceDeleteOperationDefaultResponse,
): response is TrafficControllerInterfaceDeleteOperationDefaultResponse;
export function isUnexpected(
  response:
    | TrafficControllerInterfaceListByResourceGroup200Response
    | TrafficControllerInterfaceListByResourceGroupDefaultResponse,
): response is TrafficControllerInterfaceListByResourceGroupDefaultResponse;
export function isUnexpected(
  response:
    | TrafficControllerInterfaceListBySubscription200Response
    | TrafficControllerInterfaceListBySubscriptionDefaultResponse,
): response is TrafficControllerInterfaceListBySubscriptionDefaultResponse;
export function isUnexpected(
  response: OperationsList200Response | OperationsListDefaultResponse,
): response is OperationsListDefaultResponse;
export function isUnexpected(
  response:
    | AssociationsInterfaceGet200Response
    | AssociationsInterfaceGetDefaultResponse
    | AssociationsInterfaceCreateOrUpdate200Response
    | AssociationsInterfaceCreateOrUpdate201Response
    | AssociationsInterfaceCreateOrUpdateLogicalResponse
    | AssociationsInterfaceCreateOrUpdateDefaultResponse
    | AssociationsInterfaceUpdate200Response
    | AssociationsInterfaceUpdateDefaultResponse
    | AssociationsInterfaceDeleteOperation200Response
    | AssociationsInterfaceDeleteOperation202Response
    | AssociationsInterfaceDeleteOperation204Response
    | AssociationsInterfaceDeleteLogicalResponse
    | AssociationsInterfaceDeleteOperationDefaultResponse
    | AssociationsInterfaceListByTrafficController200Response
    | AssociationsInterfaceListByTrafficControllerDefaultResponse
    | FrontendsInterfaceGet200Response
    | FrontendsInterfaceGetDefaultResponse
    | FrontendsInterfaceCreateOrUpdate200Response
    | FrontendsInterfaceCreateOrUpdate201Response
    | FrontendsInterfaceCreateOrUpdateLogicalResponse
    | FrontendsInterfaceCreateOrUpdateDefaultResponse
    | FrontendsInterfaceUpdate200Response
    | FrontendsInterfaceUpdateDefaultResponse
    | FrontendsInterfaceDeleteOperation200Response
    | FrontendsInterfaceDeleteOperation202Response
    | FrontendsInterfaceDeleteOperation204Response
    | FrontendsInterfaceDeleteLogicalResponse
    | FrontendsInterfaceDeleteOperationDefaultResponse
    | FrontendsInterfaceListByTrafficController200Response
    | FrontendsInterfaceListByTrafficControllerDefaultResponse
    | TrafficControllerInterfaceGet200Response
    | TrafficControllerInterfaceGetDefaultResponse
    | TrafficControllerInterfaceCreateOrUpdate200Response
    | TrafficControllerInterfaceCreateOrUpdate201Response
    | TrafficControllerInterfaceCreateOrUpdateLogicalResponse
    | TrafficControllerInterfaceCreateOrUpdateDefaultResponse
    | TrafficControllerInterfaceUpdate200Response
    | TrafficControllerInterfaceUpdateDefaultResponse
    | TrafficControllerInterfaceDeleteOperation200Response
    | TrafficControllerInterfaceDeleteOperation202Response
    | TrafficControllerInterfaceDeleteOperation204Response
    | TrafficControllerInterfaceDeleteLogicalResponse
    | TrafficControllerInterfaceDeleteOperationDefaultResponse
    | TrafficControllerInterfaceListByResourceGroup200Response
    | TrafficControllerInterfaceListByResourceGroupDefaultResponse
    | TrafficControllerInterfaceListBySubscription200Response
    | TrafficControllerInterfaceListBySubscriptionDefaultResponse
    | OperationsList200Response
    | OperationsListDefaultResponse,
): response is
  | AssociationsInterfaceGetDefaultResponse
  | AssociationsInterfaceCreateOrUpdateDefaultResponse
  | AssociationsInterfaceUpdateDefaultResponse
  | AssociationsInterfaceDeleteOperationDefaultResponse
  | AssociationsInterfaceListByTrafficControllerDefaultResponse
  | FrontendsInterfaceGetDefaultResponse
  | FrontendsInterfaceCreateOrUpdateDefaultResponse
  | FrontendsInterfaceUpdateDefaultResponse
  | FrontendsInterfaceDeleteOperationDefaultResponse
  | FrontendsInterfaceListByTrafficControllerDefaultResponse
  | TrafficControllerInterfaceGetDefaultResponse
  | TrafficControllerInterfaceCreateOrUpdateDefaultResponse
  | TrafficControllerInterfaceUpdateDefaultResponse
  | TrafficControllerInterfaceDeleteOperationDefaultResponse
  | TrafficControllerInterfaceListByResourceGroupDefaultResponse
  | TrafficControllerInterfaceListBySubscriptionDefaultResponse
  | OperationsListDefaultResponse {
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
