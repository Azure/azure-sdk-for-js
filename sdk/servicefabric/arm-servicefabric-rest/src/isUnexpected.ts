// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ApplicationTypeVersionsCreateOrUpdate202Response,
  ApplicationTypeVersionsCreateOrUpdatedefaultResponse,
  ApplicationTypeVersionsDelete202Response,
  ApplicationTypeVersionsDelete204Response,
  ApplicationTypeVersionsDeletedefaultResponse,
  ApplicationTypeVersionsGet200Response,
  ApplicationTypeVersionsGetdefaultResponse,
  ApplicationTypeVersionsList200Response,
  ApplicationTypeVersionsListdefaultResponse,
  ApplicationTypesCreateOrUpdate200Response,
  ApplicationTypesCreateOrUpdatedefaultResponse,
  ApplicationTypesDelete202Response,
  ApplicationTypesDelete204Response,
  ApplicationTypesDeletedefaultResponse,
  ApplicationTypesGet200Response,
  ApplicationTypesGetdefaultResponse,
  ApplicationTypesList200Response,
  ApplicationTypesListdefaultResponse,
  ApplicationsCreateOrUpdate202Response,
  ApplicationsCreateOrUpdatedefaultResponse,
  ApplicationsDelete202Response,
  ApplicationsDelete204Response,
  ApplicationsDeletedefaultResponse,
  ApplicationsGet200Response,
  ApplicationsGetdefaultResponse,
  ApplicationsList200Response,
  ApplicationsListdefaultResponse,
  ApplicationsUpdate202Response,
  ApplicationsUpdatedefaultResponse,
  ClusterVersionsGet200Response,
  ClusterVersionsGetByEnvironment200Response,
  ClusterVersionsGetByEnvironmentdefaultResponse,
  ClusterVersionsGetdefaultResponse,
  ClusterVersionsList200Response,
  ClusterVersionsListByEnvironment200Response,
  ClusterVersionsListByEnvironmentdefaultResponse,
  ClusterVersionsListdefaultResponse,
  ClustersCreateOrUpdate200Response,
  ClustersCreateOrUpdate202Response,
  ClustersCreateOrUpdatedefaultResponse,
  ClustersDelete200Response,
  ClustersDelete204Response,
  ClustersDeletedefaultResponse,
  ClustersGet200Response,
  ClustersGetdefaultResponse,
  ClustersList200Response,
  ClustersListByResourceGroup200Response,
  ClustersListByResourceGroupdefaultResponse,
  ClustersListUpgradableVersions200Response,
  ClustersListUpgradableVersionsdefaultResponse,
  ClustersListdefaultResponse,
  ClustersUpdate200Response,
  ClustersUpdate202Response,
  ClustersUpdatedefaultResponse,
  OperationsList200Response,
  OperationsListdefaultResponse,
  ServicesCreateOrUpdate202Response,
  ServicesCreateOrUpdatedefaultResponse,
  ServicesDelete202Response,
  ServicesDelete204Response,
  ServicesDeletedefaultResponse,
  ServicesGet200Response,
  ServicesGetdefaultResponse,
  ServicesList200Response,
  ServicesListdefaultResponse,
  ServicesUpdate202Response,
  ServicesUpdatedefaultResponse,
} from "./responses";

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
  response: ClustersGet200Response | ClustersGetdefaultResponse,
): response is ClustersGetdefaultResponse;
export function isUnexpected(
  response:
    | ClustersCreateOrUpdate200Response
    | ClustersCreateOrUpdate202Response
    | ClustersCreateOrUpdatedefaultResponse,
): response is ClustersCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: ClustersUpdate200Response | ClustersUpdate202Response | ClustersUpdatedefaultResponse,
): response is ClustersUpdatedefaultResponse;
export function isUnexpected(
  response: ClustersDelete200Response | ClustersDelete204Response | ClustersDeletedefaultResponse,
): response is ClustersDeletedefaultResponse;
export function isUnexpected(
  response: ClustersListByResourceGroup200Response | ClustersListByResourceGroupdefaultResponse,
): response is ClustersListByResourceGroupdefaultResponse;
export function isUnexpected(
  response: ClustersList200Response | ClustersListdefaultResponse,
): response is ClustersListdefaultResponse;
export function isUnexpected(
  response:
    | ClustersListUpgradableVersions200Response
    | ClustersListUpgradableVersionsdefaultResponse,
): response is ClustersListUpgradableVersionsdefaultResponse;
export function isUnexpected(
  response: ClusterVersionsGet200Response | ClusterVersionsGetdefaultResponse,
): response is ClusterVersionsGetdefaultResponse;
export function isUnexpected(
  response:
    | ClusterVersionsGetByEnvironment200Response
    | ClusterVersionsGetByEnvironmentdefaultResponse,
): response is ClusterVersionsGetByEnvironmentdefaultResponse;
export function isUnexpected(
  response: ClusterVersionsList200Response | ClusterVersionsListdefaultResponse,
): response is ClusterVersionsListdefaultResponse;
export function isUnexpected(
  response:
    | ClusterVersionsListByEnvironment200Response
    | ClusterVersionsListByEnvironmentdefaultResponse,
): response is ClusterVersionsListByEnvironmentdefaultResponse;
export function isUnexpected(
  response: OperationsList200Response | OperationsListdefaultResponse,
): response is OperationsListdefaultResponse;
export function isUnexpected(
  response: ApplicationTypesGet200Response | ApplicationTypesGetdefaultResponse,
): response is ApplicationTypesGetdefaultResponse;
export function isUnexpected(
  response:
    | ApplicationTypesCreateOrUpdate200Response
    | ApplicationTypesCreateOrUpdatedefaultResponse,
): response is ApplicationTypesCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | ApplicationTypesDelete202Response
    | ApplicationTypesDelete204Response
    | ApplicationTypesDeletedefaultResponse,
): response is ApplicationTypesDeletedefaultResponse;
export function isUnexpected(
  response: ApplicationTypesList200Response | ApplicationTypesListdefaultResponse,
): response is ApplicationTypesListdefaultResponse;
export function isUnexpected(
  response: ApplicationTypeVersionsGet200Response | ApplicationTypeVersionsGetdefaultResponse,
): response is ApplicationTypeVersionsGetdefaultResponse;
export function isUnexpected(
  response:
    | ApplicationTypeVersionsCreateOrUpdate202Response
    | ApplicationTypeVersionsCreateOrUpdatedefaultResponse,
): response is ApplicationTypeVersionsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | ApplicationTypeVersionsDelete202Response
    | ApplicationTypeVersionsDelete204Response
    | ApplicationTypeVersionsDeletedefaultResponse,
): response is ApplicationTypeVersionsDeletedefaultResponse;
export function isUnexpected(
  response: ApplicationTypeVersionsList200Response | ApplicationTypeVersionsListdefaultResponse,
): response is ApplicationTypeVersionsListdefaultResponse;
export function isUnexpected(
  response: ApplicationsGet200Response | ApplicationsGetdefaultResponse,
): response is ApplicationsGetdefaultResponse;
export function isUnexpected(
  response: ApplicationsCreateOrUpdate202Response | ApplicationsCreateOrUpdatedefaultResponse,
): response is ApplicationsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: ApplicationsUpdate202Response | ApplicationsUpdatedefaultResponse,
): response is ApplicationsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | ApplicationsDelete202Response
    | ApplicationsDelete204Response
    | ApplicationsDeletedefaultResponse,
): response is ApplicationsDeletedefaultResponse;
export function isUnexpected(
  response: ApplicationsList200Response | ApplicationsListdefaultResponse,
): response is ApplicationsListdefaultResponse;
export function isUnexpected(
  response: ServicesGet200Response | ServicesGetdefaultResponse,
): response is ServicesGetdefaultResponse;
export function isUnexpected(
  response: ServicesCreateOrUpdate202Response | ServicesCreateOrUpdatedefaultResponse,
): response is ServicesCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: ServicesUpdate202Response | ServicesUpdatedefaultResponse,
): response is ServicesUpdatedefaultResponse;
export function isUnexpected(
  response: ServicesDelete202Response | ServicesDelete204Response | ServicesDeletedefaultResponse,
): response is ServicesDeletedefaultResponse;
export function isUnexpected(
  response: ServicesList200Response | ServicesListdefaultResponse,
): response is ServicesListdefaultResponse;
export function isUnexpected(
  response:
    | ClustersGet200Response
    | ClustersGetdefaultResponse
    | ClustersCreateOrUpdate200Response
    | ClustersCreateOrUpdate202Response
    | ClustersCreateOrUpdatedefaultResponse
    | ClustersUpdate200Response
    | ClustersUpdate202Response
    | ClustersUpdatedefaultResponse
    | ClustersDelete200Response
    | ClustersDelete204Response
    | ClustersDeletedefaultResponse
    | ClustersListByResourceGroup200Response
    | ClustersListByResourceGroupdefaultResponse
    | ClustersList200Response
    | ClustersListdefaultResponse
    | ClustersListUpgradableVersions200Response
    | ClustersListUpgradableVersionsdefaultResponse
    | ClusterVersionsGet200Response
    | ClusterVersionsGetdefaultResponse
    | ClusterVersionsGetByEnvironment200Response
    | ClusterVersionsGetByEnvironmentdefaultResponse
    | ClusterVersionsList200Response
    | ClusterVersionsListdefaultResponse
    | ClusterVersionsListByEnvironment200Response
    | ClusterVersionsListByEnvironmentdefaultResponse
    | OperationsList200Response
    | OperationsListdefaultResponse
    | ApplicationTypesGet200Response
    | ApplicationTypesGetdefaultResponse
    | ApplicationTypesCreateOrUpdate200Response
    | ApplicationTypesCreateOrUpdatedefaultResponse
    | ApplicationTypesDelete202Response
    | ApplicationTypesDelete204Response
    | ApplicationTypesDeletedefaultResponse
    | ApplicationTypesList200Response
    | ApplicationTypesListdefaultResponse
    | ApplicationTypeVersionsGet200Response
    | ApplicationTypeVersionsGetdefaultResponse
    | ApplicationTypeVersionsCreateOrUpdate202Response
    | ApplicationTypeVersionsCreateOrUpdatedefaultResponse
    | ApplicationTypeVersionsDelete202Response
    | ApplicationTypeVersionsDelete204Response
    | ApplicationTypeVersionsDeletedefaultResponse
    | ApplicationTypeVersionsList200Response
    | ApplicationTypeVersionsListdefaultResponse
    | ApplicationsGet200Response
    | ApplicationsGetdefaultResponse
    | ApplicationsCreateOrUpdate202Response
    | ApplicationsCreateOrUpdatedefaultResponse
    | ApplicationsUpdate202Response
    | ApplicationsUpdatedefaultResponse
    | ApplicationsDelete202Response
    | ApplicationsDelete204Response
    | ApplicationsDeletedefaultResponse
    | ApplicationsList200Response
    | ApplicationsListdefaultResponse
    | ServicesGet200Response
    | ServicesGetdefaultResponse
    | ServicesCreateOrUpdate202Response
    | ServicesCreateOrUpdatedefaultResponse
    | ServicesUpdate202Response
    | ServicesUpdatedefaultResponse
    | ServicesDelete202Response
    | ServicesDelete204Response
    | ServicesDeletedefaultResponse
    | ServicesList200Response
    | ServicesListdefaultResponse,
): response is
  | ClustersGetdefaultResponse
  | ClustersCreateOrUpdatedefaultResponse
  | ClustersUpdatedefaultResponse
  | ClustersDeletedefaultResponse
  | ClustersListByResourceGroupdefaultResponse
  | ClustersListdefaultResponse
  | ClustersListUpgradableVersionsdefaultResponse
  | ClusterVersionsGetdefaultResponse
  | ClusterVersionsGetByEnvironmentdefaultResponse
  | ClusterVersionsListdefaultResponse
  | ClusterVersionsListByEnvironmentdefaultResponse
  | OperationsListdefaultResponse
  | ApplicationTypesGetdefaultResponse
  | ApplicationTypesCreateOrUpdatedefaultResponse
  | ApplicationTypesDeletedefaultResponse
  | ApplicationTypesListdefaultResponse
  | ApplicationTypeVersionsGetdefaultResponse
  | ApplicationTypeVersionsCreateOrUpdatedefaultResponse
  | ApplicationTypeVersionsDeletedefaultResponse
  | ApplicationTypeVersionsListdefaultResponse
  | ApplicationsGetdefaultResponse
  | ApplicationsCreateOrUpdatedefaultResponse
  | ApplicationsUpdatedefaultResponse
  | ApplicationsDeletedefaultResponse
  | ApplicationsListdefaultResponse
  | ServicesGetdefaultResponse
  | ServicesCreateOrUpdatedefaultResponse
  | ServicesUpdatedefaultResponse
  | ServicesDeletedefaultResponse
  | ServicesListdefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = geParametrizedPathSuccess(url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function geParametrizedPathSuccess(path: string): string[] {
  const pathParts = path.split("/");

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // If the candidate and actual paths don't match in size
    // we move on to the next candidate path
    if (candidateParts.length === pathParts.length && hasParametrizedPath(key)) {
      // track if we have found a match to return the values found.
      let found = true;
      for (let i = 0; i < candidateParts.length; i++) {
        if (candidateParts[i].startsWith("{") && candidateParts[i].endsWith("}")) {
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
