// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationsList200Response,
  OperationsListDefaultResponse,
  MongoClustersGet200Response,
  MongoClustersGetDefaultResponse,
  MongoClustersCreateOrUpdate200Response,
  MongoClustersCreateOrUpdate201Response,
  MongoClustersCreateOrUpdateLogicalResponse,
  MongoClustersCreateOrUpdateDefaultResponse,
  MongoClustersUpdate200Response,
  MongoClustersUpdate202Response,
  MongoClustersUpdateLogicalResponse,
  MongoClustersUpdateDefaultResponse,
  MongoClustersDelete202Response,
  MongoClustersDelete204Response,
  MongoClustersDeleteLogicalResponse,
  MongoClustersDeleteDefaultResponse,
  MongoClustersListByResourceGroup200Response,
  MongoClustersListByResourceGroupDefaultResponse,
  MongoClustersList200Response,
  MongoClustersListDefaultResponse,
  MongoClustersListConnectionStrings200Response,
  MongoClustersListConnectionStringsDefaultResponse,
  MongoClustersCheckNameAvailability200Response,
  MongoClustersCheckNameAvailabilityDefaultResponse,
  FirewallRulesGet200Response,
  FirewallRulesGetDefaultResponse,
  FirewallRulesCreateOrUpdate200Response,
  FirewallRulesCreateOrUpdate201Response,
  FirewallRulesCreateOrUpdate202Response,
  FirewallRulesCreateOrUpdateLogicalResponse,
  FirewallRulesCreateOrUpdateDefaultResponse,
  FirewallRulesDelete202Response,
  FirewallRulesDelete204Response,
  FirewallRulesDeleteLogicalResponse,
  FirewallRulesDeleteDefaultResponse,
  FirewallRulesListByMongoCluster200Response,
  FirewallRulesListByMongoClusterDefaultResponse,
  PrivateEndpointConnectionsListByMongoCluster200Response,
  PrivateEndpointConnectionsListByMongoClusterDefaultResponse,
  PrivateEndpointConnectionsGet200Response,
  PrivateEndpointConnectionsGetDefaultResponse,
  PrivateEndpointConnectionsCreate200Response,
  PrivateEndpointConnectionsCreate201Response,
  PrivateEndpointConnectionsCreate202Response,
  PrivateEndpointConnectionsCreateLogicalResponse,
  PrivateEndpointConnectionsCreateDefaultResponse,
  PrivateEndpointConnectionsDelete202Response,
  PrivateEndpointConnectionsDelete204Response,
  PrivateEndpointConnectionsDeleteLogicalResponse,
  PrivateEndpointConnectionsDeleteDefaultResponse,
  PrivateLinksListByMongoCluster200Response,
  PrivateLinksListByMongoClusterDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "GET /providers/Microsoft.DocumentDB/operations": ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}":
    ["200", "201"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}":
    ["200", "202"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/mongoClusters":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/listConnectionStrings":
    ["200"],
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/checkMongoClusterNameAvailability":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/firewallRules/{firewallRuleName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/firewallRules/{firewallRuleName}":
    ["200", "201", "202"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/firewallRules/{firewallRuleName}":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/firewallRules":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateEndpointConnections":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateEndpointConnections/{privateEndpointConnectionName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateEndpointConnections/{privateEndpointConnectionName}":
    ["200", "201", "202"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateEndpointConnections/{privateEndpointConnectionName}":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateLinkResources":
    ["200"],
};

export function isUnexpected(
  response: OperationsList200Response | OperationsListDefaultResponse,
): response is OperationsListDefaultResponse;
export function isUnexpected(
  response: MongoClustersGet200Response | MongoClustersGetDefaultResponse,
): response is MongoClustersGetDefaultResponse;
export function isUnexpected(
  response:
    | MongoClustersCreateOrUpdate200Response
    | MongoClustersCreateOrUpdate201Response
    | MongoClustersCreateOrUpdateLogicalResponse
    | MongoClustersCreateOrUpdateDefaultResponse,
): response is MongoClustersCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | MongoClustersUpdate200Response
    | MongoClustersUpdate202Response
    | MongoClustersUpdateLogicalResponse
    | MongoClustersUpdateDefaultResponse,
): response is MongoClustersUpdateDefaultResponse;
export function isUnexpected(
  response:
    | MongoClustersDelete202Response
    | MongoClustersDelete204Response
    | MongoClustersDeleteLogicalResponse
    | MongoClustersDeleteDefaultResponse,
): response is MongoClustersDeleteDefaultResponse;
export function isUnexpected(
  response:
    | MongoClustersListByResourceGroup200Response
    | MongoClustersListByResourceGroupDefaultResponse,
): response is MongoClustersListByResourceGroupDefaultResponse;
export function isUnexpected(
  response: MongoClustersList200Response | MongoClustersListDefaultResponse,
): response is MongoClustersListDefaultResponse;
export function isUnexpected(
  response:
    | MongoClustersListConnectionStrings200Response
    | MongoClustersListConnectionStringsDefaultResponse,
): response is MongoClustersListConnectionStringsDefaultResponse;
export function isUnexpected(
  response:
    | MongoClustersCheckNameAvailability200Response
    | MongoClustersCheckNameAvailabilityDefaultResponse,
): response is MongoClustersCheckNameAvailabilityDefaultResponse;
export function isUnexpected(
  response: FirewallRulesGet200Response | FirewallRulesGetDefaultResponse,
): response is FirewallRulesGetDefaultResponse;
export function isUnexpected(
  response:
    | FirewallRulesCreateOrUpdate200Response
    | FirewallRulesCreateOrUpdate201Response
    | FirewallRulesCreateOrUpdate202Response
    | FirewallRulesCreateOrUpdateLogicalResponse
    | FirewallRulesCreateOrUpdateDefaultResponse,
): response is FirewallRulesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | FirewallRulesDelete202Response
    | FirewallRulesDelete204Response
    | FirewallRulesDeleteLogicalResponse
    | FirewallRulesDeleteDefaultResponse,
): response is FirewallRulesDeleteDefaultResponse;
export function isUnexpected(
  response:
    | FirewallRulesListByMongoCluster200Response
    | FirewallRulesListByMongoClusterDefaultResponse,
): response is FirewallRulesListByMongoClusterDefaultResponse;
export function isUnexpected(
  response:
    | PrivateEndpointConnectionsListByMongoCluster200Response
    | PrivateEndpointConnectionsListByMongoClusterDefaultResponse,
): response is PrivateEndpointConnectionsListByMongoClusterDefaultResponse;
export function isUnexpected(
  response:
    | PrivateEndpointConnectionsGet200Response
    | PrivateEndpointConnectionsGetDefaultResponse,
): response is PrivateEndpointConnectionsGetDefaultResponse;
export function isUnexpected(
  response:
    | PrivateEndpointConnectionsCreate200Response
    | PrivateEndpointConnectionsCreate201Response
    | PrivateEndpointConnectionsCreate202Response
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
    | PrivateLinksListByMongoCluster200Response
    | PrivateLinksListByMongoClusterDefaultResponse,
): response is PrivateLinksListByMongoClusterDefaultResponse;
export function isUnexpected(
  response:
    | OperationsList200Response
    | OperationsListDefaultResponse
    | MongoClustersGet200Response
    | MongoClustersGetDefaultResponse
    | MongoClustersCreateOrUpdate200Response
    | MongoClustersCreateOrUpdate201Response
    | MongoClustersCreateOrUpdateLogicalResponse
    | MongoClustersCreateOrUpdateDefaultResponse
    | MongoClustersUpdate200Response
    | MongoClustersUpdate202Response
    | MongoClustersUpdateLogicalResponse
    | MongoClustersUpdateDefaultResponse
    | MongoClustersDelete202Response
    | MongoClustersDelete204Response
    | MongoClustersDeleteLogicalResponse
    | MongoClustersDeleteDefaultResponse
    | MongoClustersListByResourceGroup200Response
    | MongoClustersListByResourceGroupDefaultResponse
    | MongoClustersList200Response
    | MongoClustersListDefaultResponse
    | MongoClustersListConnectionStrings200Response
    | MongoClustersListConnectionStringsDefaultResponse
    | MongoClustersCheckNameAvailability200Response
    | MongoClustersCheckNameAvailabilityDefaultResponse
    | FirewallRulesGet200Response
    | FirewallRulesGetDefaultResponse
    | FirewallRulesCreateOrUpdate200Response
    | FirewallRulesCreateOrUpdate201Response
    | FirewallRulesCreateOrUpdate202Response
    | FirewallRulesCreateOrUpdateLogicalResponse
    | FirewallRulesCreateOrUpdateDefaultResponse
    | FirewallRulesDelete202Response
    | FirewallRulesDelete204Response
    | FirewallRulesDeleteLogicalResponse
    | FirewallRulesDeleteDefaultResponse
    | FirewallRulesListByMongoCluster200Response
    | FirewallRulesListByMongoClusterDefaultResponse
    | PrivateEndpointConnectionsListByMongoCluster200Response
    | PrivateEndpointConnectionsListByMongoClusterDefaultResponse
    | PrivateEndpointConnectionsGet200Response
    | PrivateEndpointConnectionsGetDefaultResponse
    | PrivateEndpointConnectionsCreate200Response
    | PrivateEndpointConnectionsCreate201Response
    | PrivateEndpointConnectionsCreate202Response
    | PrivateEndpointConnectionsCreateLogicalResponse
    | PrivateEndpointConnectionsCreateDefaultResponse
    | PrivateEndpointConnectionsDelete202Response
    | PrivateEndpointConnectionsDelete204Response
    | PrivateEndpointConnectionsDeleteLogicalResponse
    | PrivateEndpointConnectionsDeleteDefaultResponse
    | PrivateLinksListByMongoCluster200Response
    | PrivateLinksListByMongoClusterDefaultResponse,
): response is
  | OperationsListDefaultResponse
  | MongoClustersGetDefaultResponse
  | MongoClustersCreateOrUpdateDefaultResponse
  | MongoClustersUpdateDefaultResponse
  | MongoClustersDeleteDefaultResponse
  | MongoClustersListByResourceGroupDefaultResponse
  | MongoClustersListDefaultResponse
  | MongoClustersListConnectionStringsDefaultResponse
  | MongoClustersCheckNameAvailabilityDefaultResponse
  | FirewallRulesGetDefaultResponse
  | FirewallRulesCreateOrUpdateDefaultResponse
  | FirewallRulesDeleteDefaultResponse
  | FirewallRulesListByMongoClusterDefaultResponse
  | PrivateEndpointConnectionsListByMongoClusterDefaultResponse
  | PrivateEndpointConnectionsGetDefaultResponse
  | PrivateEndpointConnectionsCreateDefaultResponse
  | PrivateEndpointConnectionsDeleteDefaultResponse
  | PrivateLinksListByMongoClusterDefaultResponse {
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
