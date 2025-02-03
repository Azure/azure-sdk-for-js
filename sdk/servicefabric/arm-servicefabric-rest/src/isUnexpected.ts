// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ClustersGet200Response,
  ClustersGetDefaultResponse,
  ClustersCreateOrUpdate200Response,
  ClustersCreateOrUpdate202Response,
  ClustersCreateOrUpdateDefaultResponse,
  ClustersUpdate200Response,
  ClustersUpdate202Response,
  ClustersUpdateDefaultResponse,
  ClustersDelete200Response,
  ClustersDelete204Response,
  ClustersDeleteDefaultResponse,
  ClustersListByResourceGroup200Response,
  ClustersListByResourceGroupDefaultResponse,
  ClustersList200Response,
  ClustersListDefaultResponse,
  ClustersListUpgradableVersions200Response,
  ClustersListUpgradableVersionsDefaultResponse,
  ClusterVersionsGet200Response,
  ClusterVersionsGetDefaultResponse,
  ClusterVersionsGetByEnvironment200Response,
  ClusterVersionsGetByEnvironmentDefaultResponse,
  ClusterVersionsList200Response,
  ClusterVersionsListDefaultResponse,
  ClusterVersionsListByEnvironment200Response,
  ClusterVersionsListByEnvironmentDefaultResponse,
  OperationsList200Response,
  OperationsListDefaultResponse,
  ApplicationTypesGet200Response,
  ApplicationTypesGetDefaultResponse,
  ApplicationTypesCreateOrUpdate200Response,
  ApplicationTypesCreateOrUpdateDefaultResponse,
  ApplicationTypesDelete202Response,
  ApplicationTypesDelete204Response,
  ApplicationTypesDeleteDefaultResponse,
  ApplicationTypesList200Response,
  ApplicationTypesListDefaultResponse,
  ApplicationTypeVersionsGet200Response,
  ApplicationTypeVersionsGetDefaultResponse,
  ApplicationTypeVersionsCreateOrUpdate202Response,
  ApplicationTypeVersionsCreateOrUpdateDefaultResponse,
  ApplicationTypeVersionsDelete202Response,
  ApplicationTypeVersionsDelete204Response,
  ApplicationTypeVersionsDeleteDefaultResponse,
  ApplicationTypeVersionsList200Response,
  ApplicationTypeVersionsListDefaultResponse,
  ApplicationsGet200Response,
  ApplicationsGetDefaultResponse,
  ApplicationsCreateOrUpdate202Response,
  ApplicationsCreateOrUpdateDefaultResponse,
  ApplicationsUpdate202Response,
  ApplicationsUpdateDefaultResponse,
  ApplicationsDelete202Response,
  ApplicationsDelete204Response,
  ApplicationsDeleteDefaultResponse,
  ApplicationsList200Response,
  ApplicationsListDefaultResponse,
  ServicesGet200Response,
  ServicesGetDefaultResponse,
  ServicesCreateOrUpdate202Response,
  ServicesCreateOrUpdateDefaultResponse,
  ServicesUpdate202Response,
  ServicesUpdateDefaultResponse,
  ServicesDelete202Response,
  ServicesDelete204Response,
  ServicesDeleteDefaultResponse,
  ServicesList200Response,
  ServicesListDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}":
    ["200", "202"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}":
    ["200", "202"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}":
    ["200", "204"],
  "GET /subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/clusters": ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/listUpgradableVersions":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/clusterVersions/{clusterVersion}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/environments/{environment}/clusterVersions/{clusterVersion}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/clusterVersions":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/environments/{environment}/clusterVersions":
    ["200"],
  "GET /providers/Microsoft.ServiceFabric/operations": ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}/versions/{version}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}/versions/{version}":
    ["202"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}/versions/{version}":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}/versions":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}":
    ["202"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}":
    ["202"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}/services/{serviceName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}/services/{serviceName}":
    ["202"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}/services/{serviceName}":
    ["202"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}/services/{serviceName}":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}/services":
    ["200"],
};

export function isUnexpected(
  response: ClustersGet200Response | ClustersGetDefaultResponse,
): response is ClustersGetDefaultResponse;
export function isUnexpected(
  response:
    | ClustersCreateOrUpdate200Response
    | ClustersCreateOrUpdate202Response
    | ClustersCreateOrUpdateDefaultResponse,
): response is ClustersCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: ClustersUpdate200Response | ClustersUpdate202Response | ClustersUpdateDefaultResponse,
): response is ClustersUpdateDefaultResponse;
export function isUnexpected(
  response: ClustersDelete200Response | ClustersDelete204Response | ClustersDeleteDefaultResponse,
): response is ClustersDeleteDefaultResponse;
export function isUnexpected(
  response: ClustersListByResourceGroup200Response | ClustersListByResourceGroupDefaultResponse,
): response is ClustersListByResourceGroupDefaultResponse;
export function isUnexpected(
  response: ClustersList200Response | ClustersListDefaultResponse,
): response is ClustersListDefaultResponse;
export function isUnexpected(
  response:
    | ClustersListUpgradableVersions200Response
    | ClustersListUpgradableVersionsDefaultResponse,
): response is ClustersListUpgradableVersionsDefaultResponse;
export function isUnexpected(
  response: ClusterVersionsGet200Response | ClusterVersionsGetDefaultResponse,
): response is ClusterVersionsGetDefaultResponse;
export function isUnexpected(
  response:
    | ClusterVersionsGetByEnvironment200Response
    | ClusterVersionsGetByEnvironmentDefaultResponse,
): response is ClusterVersionsGetByEnvironmentDefaultResponse;
export function isUnexpected(
  response: ClusterVersionsList200Response | ClusterVersionsListDefaultResponse,
): response is ClusterVersionsListDefaultResponse;
export function isUnexpected(
  response:
    | ClusterVersionsListByEnvironment200Response
    | ClusterVersionsListByEnvironmentDefaultResponse,
): response is ClusterVersionsListByEnvironmentDefaultResponse;
export function isUnexpected(
  response: OperationsList200Response | OperationsListDefaultResponse,
): response is OperationsListDefaultResponse;
export function isUnexpected(
  response: ApplicationTypesGet200Response | ApplicationTypesGetDefaultResponse,
): response is ApplicationTypesGetDefaultResponse;
export function isUnexpected(
  response:
    | ApplicationTypesCreateOrUpdate200Response
    | ApplicationTypesCreateOrUpdateDefaultResponse,
): response is ApplicationTypesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | ApplicationTypesDelete202Response
    | ApplicationTypesDelete204Response
    | ApplicationTypesDeleteDefaultResponse,
): response is ApplicationTypesDeleteDefaultResponse;
export function isUnexpected(
  response: ApplicationTypesList200Response | ApplicationTypesListDefaultResponse,
): response is ApplicationTypesListDefaultResponse;
export function isUnexpected(
  response: ApplicationTypeVersionsGet200Response | ApplicationTypeVersionsGetDefaultResponse,
): response is ApplicationTypeVersionsGetDefaultResponse;
export function isUnexpected(
  response:
    | ApplicationTypeVersionsCreateOrUpdate202Response
    | ApplicationTypeVersionsCreateOrUpdateDefaultResponse,
): response is ApplicationTypeVersionsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | ApplicationTypeVersionsDelete202Response
    | ApplicationTypeVersionsDelete204Response
    | ApplicationTypeVersionsDeleteDefaultResponse,
): response is ApplicationTypeVersionsDeleteDefaultResponse;
export function isUnexpected(
  response: ApplicationTypeVersionsList200Response | ApplicationTypeVersionsListDefaultResponse,
): response is ApplicationTypeVersionsListDefaultResponse;
export function isUnexpected(
  response: ApplicationsGet200Response | ApplicationsGetDefaultResponse,
): response is ApplicationsGetDefaultResponse;
export function isUnexpected(
  response: ApplicationsCreateOrUpdate202Response | ApplicationsCreateOrUpdateDefaultResponse,
): response is ApplicationsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: ApplicationsUpdate202Response | ApplicationsUpdateDefaultResponse,
): response is ApplicationsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | ApplicationsDelete202Response
    | ApplicationsDelete204Response
    | ApplicationsDeleteDefaultResponse,
): response is ApplicationsDeleteDefaultResponse;
export function isUnexpected(
  response: ApplicationsList200Response | ApplicationsListDefaultResponse,
): response is ApplicationsListDefaultResponse;
export function isUnexpected(
  response: ServicesGet200Response | ServicesGetDefaultResponse,
): response is ServicesGetDefaultResponse;
export function isUnexpected(
  response: ServicesCreateOrUpdate202Response | ServicesCreateOrUpdateDefaultResponse,
): response is ServicesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: ServicesUpdate202Response | ServicesUpdateDefaultResponse,
): response is ServicesUpdateDefaultResponse;
export function isUnexpected(
  response: ServicesDelete202Response | ServicesDelete204Response | ServicesDeleteDefaultResponse,
): response is ServicesDeleteDefaultResponse;
export function isUnexpected(
  response: ServicesList200Response | ServicesListDefaultResponse,
): response is ServicesListDefaultResponse;
export function isUnexpected(
  response:
    | ClustersGet200Response
    | ClustersGetDefaultResponse
    | ClustersCreateOrUpdate200Response
    | ClustersCreateOrUpdate202Response
    | ClustersCreateOrUpdateDefaultResponse
    | ClustersUpdate200Response
    | ClustersUpdate202Response
    | ClustersUpdateDefaultResponse
    | ClustersDelete200Response
    | ClustersDelete204Response
    | ClustersDeleteDefaultResponse
    | ClustersListByResourceGroup200Response
    | ClustersListByResourceGroupDefaultResponse
    | ClustersList200Response
    | ClustersListDefaultResponse
    | ClustersListUpgradableVersions200Response
    | ClustersListUpgradableVersionsDefaultResponse
    | ClusterVersionsGet200Response
    | ClusterVersionsGetDefaultResponse
    | ClusterVersionsGetByEnvironment200Response
    | ClusterVersionsGetByEnvironmentDefaultResponse
    | ClusterVersionsList200Response
    | ClusterVersionsListDefaultResponse
    | ClusterVersionsListByEnvironment200Response
    | ClusterVersionsListByEnvironmentDefaultResponse
    | OperationsList200Response
    | OperationsListDefaultResponse
    | ApplicationTypesGet200Response
    | ApplicationTypesGetDefaultResponse
    | ApplicationTypesCreateOrUpdate200Response
    | ApplicationTypesCreateOrUpdateDefaultResponse
    | ApplicationTypesDelete202Response
    | ApplicationTypesDelete204Response
    | ApplicationTypesDeleteDefaultResponse
    | ApplicationTypesList200Response
    | ApplicationTypesListDefaultResponse
    | ApplicationTypeVersionsGet200Response
    | ApplicationTypeVersionsGetDefaultResponse
    | ApplicationTypeVersionsCreateOrUpdate202Response
    | ApplicationTypeVersionsCreateOrUpdateDefaultResponse
    | ApplicationTypeVersionsDelete202Response
    | ApplicationTypeVersionsDelete204Response
    | ApplicationTypeVersionsDeleteDefaultResponse
    | ApplicationTypeVersionsList200Response
    | ApplicationTypeVersionsListDefaultResponse
    | ApplicationsGet200Response
    | ApplicationsGetDefaultResponse
    | ApplicationsCreateOrUpdate202Response
    | ApplicationsCreateOrUpdateDefaultResponse
    | ApplicationsUpdate202Response
    | ApplicationsUpdateDefaultResponse
    | ApplicationsDelete202Response
    | ApplicationsDelete204Response
    | ApplicationsDeleteDefaultResponse
    | ApplicationsList200Response
    | ApplicationsListDefaultResponse
    | ServicesGet200Response
    | ServicesGetDefaultResponse
    | ServicesCreateOrUpdate202Response
    | ServicesCreateOrUpdateDefaultResponse
    | ServicesUpdate202Response
    | ServicesUpdateDefaultResponse
    | ServicesDelete202Response
    | ServicesDelete204Response
    | ServicesDeleteDefaultResponse
    | ServicesList200Response
    | ServicesListDefaultResponse,
): response is
  | ClustersGetDefaultResponse
  | ClustersCreateOrUpdateDefaultResponse
  | ClustersUpdateDefaultResponse
  | ClustersDeleteDefaultResponse
  | ClustersListByResourceGroupDefaultResponse
  | ClustersListDefaultResponse
  | ClustersListUpgradableVersionsDefaultResponse
  | ClusterVersionsGetDefaultResponse
  | ClusterVersionsGetByEnvironmentDefaultResponse
  | ClusterVersionsListDefaultResponse
  | ClusterVersionsListByEnvironmentDefaultResponse
  | OperationsListDefaultResponse
  | ApplicationTypesGetDefaultResponse
  | ApplicationTypesCreateOrUpdateDefaultResponse
  | ApplicationTypesDeleteDefaultResponse
  | ApplicationTypesListDefaultResponse
  | ApplicationTypeVersionsGetDefaultResponse
  | ApplicationTypeVersionsCreateOrUpdateDefaultResponse
  | ApplicationTypeVersionsDeleteDefaultResponse
  | ApplicationTypeVersionsListDefaultResponse
  | ApplicationsGetDefaultResponse
  | ApplicationsCreateOrUpdateDefaultResponse
  | ApplicationsUpdateDefaultResponse
  | ApplicationsDeleteDefaultResponse
  | ApplicationsListDefaultResponse
  | ServicesGetDefaultResponse
  | ServicesCreateOrUpdateDefaultResponse
  | ServicesUpdateDefaultResponse
  | ServicesDeleteDefaultResponse
  | ServicesListDefaultResponse {
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
