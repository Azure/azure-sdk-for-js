// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DeviceUpdateImportUpdate202Response,
  DeviceUpdateImportUpdatedefaultResponse,
  DeviceUpdateListUpdates200Response,
  DeviceUpdateListUpdatesdefaultResponse,
  DeviceUpdateGetUpdate200Response,
  DeviceUpdateGetUpdate304Response,
  DeviceUpdateGetUpdatedefaultResponse,
  DeviceUpdateDeleteUpdate202Response,
  DeviceUpdateDeleteUpdatedefaultResponse,
  DeviceUpdateListProviders200Response,
  DeviceUpdateListProvidersdefaultResponse,
  DeviceUpdateListNames200Response,
  DeviceUpdateListNamesdefaultResponse,
  DeviceUpdateListVersions200Response,
  DeviceUpdateListVersionsdefaultResponse,
  DeviceUpdateListFiles200Response,
  DeviceUpdateListFilesdefaultResponse,
  DeviceUpdateGetFile200Response,
  DeviceUpdateGetFile304Response,
  DeviceUpdateGetFiledefaultResponse,
  DeviceUpdateListOperations200Response,
  DeviceUpdateListOperationsdefaultResponse,
  DeviceUpdateGetOperation200Response,
  DeviceUpdateGetOperation304Response,
  DeviceUpdateGetOperationdefaultResponse,
  DeviceManagementListDeviceClasses200Response,
  DeviceManagementListDeviceClassesdefaultResponse,
  DeviceManagementGetDeviceClass200Response,
  DeviceManagementGetDeviceClassdefaultResponse,
  DeviceManagementListInstallableUpdatesForDeviceClass200Response,
  DeviceManagementListInstallableUpdatesForDeviceClassdefaultResponse,
  DeviceManagementListDevices200Response,
  DeviceManagementListDevicesdefaultResponse,
  DeviceManagementImportDevices202Response,
  DeviceManagementImportDevicesdefaultResponse,
  DeviceManagementGetDevice200Response,
  DeviceManagementGetDevicedefaultResponse,
  DeviceManagementGetDeviceModule200Response,
  DeviceManagementGetDeviceModuledefaultResponse,
  DeviceManagementGetUpdateCompliance200Response,
  DeviceManagementGetUpdateCompliancedefaultResponse,
  DeviceManagementListDeviceTags200Response,
  DeviceManagementListDeviceTagsdefaultResponse,
  DeviceManagementGetDeviceTag200Response,
  DeviceManagementGetDeviceTagdefaultResponse,
  DeviceManagementListGroups200Response,
  DeviceManagementListGroupsdefaultResponse,
  DeviceManagementGetGroup200Response,
  DeviceManagementGetGroupdefaultResponse,
  DeviceManagementCreateOrUpdateGroup200Response,
  DeviceManagementCreateOrUpdateGroupdefaultResponse,
  DeviceManagementDeleteGroup204Response,
  DeviceManagementDeleteGroupdefaultResponse,
  DeviceManagementGetGroupUpdateCompliance200Response,
  DeviceManagementGetGroupUpdateCompliancedefaultResponse,
  DeviceManagementListBestUpdatesForGroup200Response,
  DeviceManagementListBestUpdatesForGroupdefaultResponse,
  DeviceManagementListDeploymentsForGroup200Response,
  DeviceManagementListDeploymentsForGroupdefaultResponse,
  DeviceManagementGetDeployment200Response,
  DeviceManagementGetDeploymentdefaultResponse,
  DeviceManagementCreateOrUpdateDeployment200Response,
  DeviceManagementCreateOrUpdateDeploymentdefaultResponse,
  DeviceManagementDeleteDeployment204Response,
  DeviceManagementDeleteDeploymentdefaultResponse,
  DeviceManagementStopDeployment200Response,
  DeviceManagementStopDeploymentdefaultResponse,
  DeviceManagementGetDeploymentStatus200Response,
  DeviceManagementGetDeploymentStatusdefaultResponse,
  DeviceManagementListDeploymentDevices200Response,
  DeviceManagementListDeploymentDevicesdefaultResponse,
  DeviceManagementGetOperation200Response,
  DeviceManagementGetOperation304Response,
  DeviceManagementGetOperationdefaultResponse,
  DeviceManagementListOperations200Response,
  DeviceManagementListOperationsdefaultResponse,
  DeviceManagementCollectLogs201Response,
  DeviceManagementCollectLogsdefaultResponse,
  DeviceManagementGetLogCollectionOperation200Response,
  DeviceManagementGetLogCollectionOperationdefaultResponse,
  DeviceManagementListLogCollectionOperations200Response,
  DeviceManagementListLogCollectionOperationsdefaultResponse,
  DeviceManagementGetLogCollectionOperationDetailedStatus200Response,
  DeviceManagementGetLogCollectionOperationDetailedStatusdefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "POST /deviceupdate/{instanceId}/updates": ["202"],
  "GET /deviceupdate/{instanceId}/updates": ["200"],
  "GET /deviceupdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}": [
    "200",
    "304",
  ],
  "DELETE /deviceupdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}": [
    "202",
  ],
  "GET /deviceupdate/{instanceId}/updates/providers": ["200"],
  "GET /deviceupdate/{instanceId}/updates/providers/{provider}/names": ["200"],
  "GET /deviceupdate/{instanceId}/updates/providers/{provider}/names/{name}/versions": ["200"],
  "GET /deviceupdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files": [
    "200",
  ],
  "GET /deviceupdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files/{fileId}": [
    "200",
    "304",
  ],
  "GET /deviceupdate/{instanceId}/updates/operations": ["200"],
  "GET /deviceupdate/{instanceId}/updates/operations/{operationId}": ["200", "304"],
  "GET /deviceupdate/{instanceId}/management/deviceclasses": ["200"],
  "GET /deviceupdate/{instanceId}/management/deviceclasses/{deviceClassId}": ["200"],
  "GET /deviceupdate/{instanceId}/management/deviceclasses/{deviceClassId}/installableupdates": [
    "200",
  ],
  "GET /deviceupdate/{instanceId}/management/devices": ["200"],
  "POST /deviceupdate/{instanceId}/management/devices": ["202"],
  "GET /deviceupdate/{instanceId}/management/devices/{deviceId}": ["200"],
  "GET /deviceupdate/{instanceId}/management/devices/{deviceId}/modules/{moduleId}": ["200"],
  "GET /deviceupdate/{instanceId}/management/updatecompliance": ["200"],
  "GET /deviceupdate/{instanceId}/management/devicetags": ["200"],
  "GET /deviceupdate/{instanceId}/management/devicetags/{tagName}": ["200"],
  "GET /deviceupdate/{instanceId}/management/groups": ["200"],
  "GET /deviceupdate/{instanceId}/management/groups/{groupId}": ["200"],
  "PUT /deviceupdate/{instanceId}/management/groups/{groupId}": ["200"],
  "DELETE /deviceupdate/{instanceId}/management/groups/{groupId}": ["204"],
  "GET /deviceupdate/{instanceId}/management/groups/{groupId}/updateCompliance": ["200"],
  "GET /deviceupdate/{instanceId}/management/groups/{groupId}/bestUpdates": ["200"],
  "GET /deviceupdate/{instanceId}/management/groups/{groupId}/deployments": ["200"],
  "GET /deviceupdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}": ["200"],
  "PUT /deviceupdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}": ["200"],
  "DELETE /deviceupdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}": [
    "204",
  ],
  "POST /deviceupdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}": ["200"],
  "GET /deviceupdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}/status": [
    "200",
  ],
  "GET /deviceupdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}/devicestates": [
    "200",
  ],
  "GET /deviceupdate/{instanceId}/management/operations/{operationId}": ["200", "304"],
  "GET /deviceupdate/{instanceId}/management/operations": ["200"],
  "PUT /deviceupdate/{instanceId}/management/deviceDiagnostics/logCollections/{operationId}": [
    "201",
  ],
  "GET /deviceupdate/{instanceId}/management/deviceDiagnostics/logCollections/{operationId}": [
    "200",
  ],
  "GET /deviceupdate/{instanceId}/management/deviceDiagnostics/logCollections": ["200"],
  "GET /deviceupdate/{instanceId}/management/deviceDiagnostics/logCollections/{operationId}/detailedStatus": [
    "200",
  ],
};

export function isUnexpected(
  response: DeviceUpdateImportUpdate202Response | DeviceUpdateImportUpdatedefaultResponse
): response is DeviceUpdateImportUpdatedefaultResponse;
export function isUnexpected(
  response: DeviceUpdateListUpdates200Response | DeviceUpdateListUpdatesdefaultResponse
): response is DeviceUpdateListUpdatesdefaultResponse;
export function isUnexpected(
  response:
    | DeviceUpdateGetUpdate200Response
    | DeviceUpdateGetUpdate304Response
    | DeviceUpdateGetUpdatedefaultResponse
): response is DeviceUpdateGetUpdatedefaultResponse;
export function isUnexpected(
  response: DeviceUpdateDeleteUpdate202Response | DeviceUpdateDeleteUpdatedefaultResponse
): response is DeviceUpdateDeleteUpdatedefaultResponse;
export function isUnexpected(
  response: DeviceUpdateListProviders200Response | DeviceUpdateListProvidersdefaultResponse
): response is DeviceUpdateListProvidersdefaultResponse;
export function isUnexpected(
  response: DeviceUpdateListNames200Response | DeviceUpdateListNamesdefaultResponse
): response is DeviceUpdateListNamesdefaultResponse;
export function isUnexpected(
  response: DeviceUpdateListVersions200Response | DeviceUpdateListVersionsdefaultResponse
): response is DeviceUpdateListVersionsdefaultResponse;
export function isUnexpected(
  response: DeviceUpdateListFiles200Response | DeviceUpdateListFilesdefaultResponse
): response is DeviceUpdateListFilesdefaultResponse;
export function isUnexpected(
  response:
    | DeviceUpdateGetFile200Response
    | DeviceUpdateGetFile304Response
    | DeviceUpdateGetFiledefaultResponse
): response is DeviceUpdateGetFiledefaultResponse;
export function isUnexpected(
  response: DeviceUpdateListOperations200Response | DeviceUpdateListOperationsdefaultResponse
): response is DeviceUpdateListOperationsdefaultResponse;
export function isUnexpected(
  response:
    | DeviceUpdateGetOperation200Response
    | DeviceUpdateGetOperation304Response
    | DeviceUpdateGetOperationdefaultResponse
): response is DeviceUpdateGetOperationdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListDeviceClasses200Response
    | DeviceManagementListDeviceClassesdefaultResponse
): response is DeviceManagementListDeviceClassesdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetDeviceClass200Response
    | DeviceManagementGetDeviceClassdefaultResponse
): response is DeviceManagementGetDeviceClassdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListInstallableUpdatesForDeviceClass200Response
    | DeviceManagementListInstallableUpdatesForDeviceClassdefaultResponse
): response is DeviceManagementListInstallableUpdatesForDeviceClassdefaultResponse;
export function isUnexpected(
  response: DeviceManagementListDevices200Response | DeviceManagementListDevicesdefaultResponse
): response is DeviceManagementListDevicesdefaultResponse;
export function isUnexpected(
  response: DeviceManagementImportDevices202Response | DeviceManagementImportDevicesdefaultResponse
): response is DeviceManagementImportDevicesdefaultResponse;
export function isUnexpected(
  response: DeviceManagementGetDevice200Response | DeviceManagementGetDevicedefaultResponse
): response is DeviceManagementGetDevicedefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetDeviceModule200Response
    | DeviceManagementGetDeviceModuledefaultResponse
): response is DeviceManagementGetDeviceModuledefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetUpdateCompliance200Response
    | DeviceManagementGetUpdateCompliancedefaultResponse
): response is DeviceManagementGetUpdateCompliancedefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListDeviceTags200Response
    | DeviceManagementListDeviceTagsdefaultResponse
): response is DeviceManagementListDeviceTagsdefaultResponse;
export function isUnexpected(
  response: DeviceManagementGetDeviceTag200Response | DeviceManagementGetDeviceTagdefaultResponse
): response is DeviceManagementGetDeviceTagdefaultResponse;
export function isUnexpected(
  response: DeviceManagementListGroups200Response | DeviceManagementListGroupsdefaultResponse
): response is DeviceManagementListGroupsdefaultResponse;
export function isUnexpected(
  response: DeviceManagementGetGroup200Response | DeviceManagementGetGroupdefaultResponse
): response is DeviceManagementGetGroupdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementCreateOrUpdateGroup200Response
    | DeviceManagementCreateOrUpdateGroupdefaultResponse
): response is DeviceManagementCreateOrUpdateGroupdefaultResponse;
export function isUnexpected(
  response: DeviceManagementDeleteGroup204Response | DeviceManagementDeleteGroupdefaultResponse
): response is DeviceManagementDeleteGroupdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetGroupUpdateCompliance200Response
    | DeviceManagementGetGroupUpdateCompliancedefaultResponse
): response is DeviceManagementGetGroupUpdateCompliancedefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListBestUpdatesForGroup200Response
    | DeviceManagementListBestUpdatesForGroupdefaultResponse
): response is DeviceManagementListBestUpdatesForGroupdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListDeploymentsForGroup200Response
    | DeviceManagementListDeploymentsForGroupdefaultResponse
): response is DeviceManagementListDeploymentsForGroupdefaultResponse;
export function isUnexpected(
  response: DeviceManagementGetDeployment200Response | DeviceManagementGetDeploymentdefaultResponse
): response is DeviceManagementGetDeploymentdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementCreateOrUpdateDeployment200Response
    | DeviceManagementCreateOrUpdateDeploymentdefaultResponse
): response is DeviceManagementCreateOrUpdateDeploymentdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementDeleteDeployment204Response
    | DeviceManagementDeleteDeploymentdefaultResponse
): response is DeviceManagementDeleteDeploymentdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementStopDeployment200Response
    | DeviceManagementStopDeploymentdefaultResponse
): response is DeviceManagementStopDeploymentdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetDeploymentStatus200Response
    | DeviceManagementGetDeploymentStatusdefaultResponse
): response is DeviceManagementGetDeploymentStatusdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListDeploymentDevices200Response
    | DeviceManagementListDeploymentDevicesdefaultResponse
): response is DeviceManagementListDeploymentDevicesdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetOperation200Response
    | DeviceManagementGetOperation304Response
    | DeviceManagementGetOperationdefaultResponse
): response is DeviceManagementGetOperationdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListOperations200Response
    | DeviceManagementListOperationsdefaultResponse
): response is DeviceManagementListOperationsdefaultResponse;
export function isUnexpected(
  response: DeviceManagementCollectLogs201Response | DeviceManagementCollectLogsdefaultResponse
): response is DeviceManagementCollectLogsdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetLogCollectionOperation200Response
    | DeviceManagementGetLogCollectionOperationdefaultResponse
): response is DeviceManagementGetLogCollectionOperationdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListLogCollectionOperations200Response
    | DeviceManagementListLogCollectionOperationsdefaultResponse
): response is DeviceManagementListLogCollectionOperationsdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetLogCollectionOperationDetailedStatus200Response
    | DeviceManagementGetLogCollectionOperationDetailedStatusdefaultResponse
): response is DeviceManagementGetLogCollectionOperationDetailedStatusdefaultResponse;
export function isUnexpected(
  response:
    | DeviceUpdateImportUpdate202Response
    | DeviceUpdateImportUpdatedefaultResponse
    | DeviceUpdateListUpdates200Response
    | DeviceUpdateListUpdatesdefaultResponse
    | DeviceUpdateGetUpdate200Response
    | DeviceUpdateGetUpdate304Response
    | DeviceUpdateGetUpdatedefaultResponse
    | DeviceUpdateDeleteUpdate202Response
    | DeviceUpdateDeleteUpdatedefaultResponse
    | DeviceUpdateListProviders200Response
    | DeviceUpdateListProvidersdefaultResponse
    | DeviceUpdateListNames200Response
    | DeviceUpdateListNamesdefaultResponse
    | DeviceUpdateListVersions200Response
    | DeviceUpdateListVersionsdefaultResponse
    | DeviceUpdateListFiles200Response
    | DeviceUpdateListFilesdefaultResponse
    | DeviceUpdateGetFile200Response
    | DeviceUpdateGetFile304Response
    | DeviceUpdateGetFiledefaultResponse
    | DeviceUpdateListOperations200Response
    | DeviceUpdateListOperationsdefaultResponse
    | DeviceUpdateGetOperation200Response
    | DeviceUpdateGetOperation304Response
    | DeviceUpdateGetOperationdefaultResponse
    | DeviceManagementListDeviceClasses200Response
    | DeviceManagementListDeviceClassesdefaultResponse
    | DeviceManagementGetDeviceClass200Response
    | DeviceManagementGetDeviceClassdefaultResponse
    | DeviceManagementListInstallableUpdatesForDeviceClass200Response
    | DeviceManagementListInstallableUpdatesForDeviceClassdefaultResponse
    | DeviceManagementListDevices200Response
    | DeviceManagementListDevicesdefaultResponse
    | DeviceManagementImportDevices202Response
    | DeviceManagementImportDevicesdefaultResponse
    | DeviceManagementGetDevice200Response
    | DeviceManagementGetDevicedefaultResponse
    | DeviceManagementGetDeviceModule200Response
    | DeviceManagementGetDeviceModuledefaultResponse
    | DeviceManagementGetUpdateCompliance200Response
    | DeviceManagementGetUpdateCompliancedefaultResponse
    | DeviceManagementListDeviceTags200Response
    | DeviceManagementListDeviceTagsdefaultResponse
    | DeviceManagementGetDeviceTag200Response
    | DeviceManagementGetDeviceTagdefaultResponse
    | DeviceManagementListGroups200Response
    | DeviceManagementListGroupsdefaultResponse
    | DeviceManagementGetGroup200Response
    | DeviceManagementGetGroupdefaultResponse
    | DeviceManagementCreateOrUpdateGroup200Response
    | DeviceManagementCreateOrUpdateGroupdefaultResponse
    | DeviceManagementDeleteGroup204Response
    | DeviceManagementDeleteGroupdefaultResponse
    | DeviceManagementGetGroupUpdateCompliance200Response
    | DeviceManagementGetGroupUpdateCompliancedefaultResponse
    | DeviceManagementListBestUpdatesForGroup200Response
    | DeviceManagementListBestUpdatesForGroupdefaultResponse
    | DeviceManagementListDeploymentsForGroup200Response
    | DeviceManagementListDeploymentsForGroupdefaultResponse
    | DeviceManagementGetDeployment200Response
    | DeviceManagementGetDeploymentdefaultResponse
    | DeviceManagementCreateOrUpdateDeployment200Response
    | DeviceManagementCreateOrUpdateDeploymentdefaultResponse
    | DeviceManagementDeleteDeployment204Response
    | DeviceManagementDeleteDeploymentdefaultResponse
    | DeviceManagementStopDeployment200Response
    | DeviceManagementStopDeploymentdefaultResponse
    | DeviceManagementGetDeploymentStatus200Response
    | DeviceManagementGetDeploymentStatusdefaultResponse
    | DeviceManagementListDeploymentDevices200Response
    | DeviceManagementListDeploymentDevicesdefaultResponse
    | DeviceManagementGetOperation200Response
    | DeviceManagementGetOperation304Response
    | DeviceManagementGetOperationdefaultResponse
    | DeviceManagementListOperations200Response
    | DeviceManagementListOperationsdefaultResponse
    | DeviceManagementCollectLogs201Response
    | DeviceManagementCollectLogsdefaultResponse
    | DeviceManagementGetLogCollectionOperation200Response
    | DeviceManagementGetLogCollectionOperationdefaultResponse
    | DeviceManagementListLogCollectionOperations200Response
    | DeviceManagementListLogCollectionOperationsdefaultResponse
    | DeviceManagementGetLogCollectionOperationDetailedStatus200Response
    | DeviceManagementGetLogCollectionOperationDetailedStatusdefaultResponse
): response is
  | DeviceUpdateImportUpdatedefaultResponse
  | DeviceUpdateListUpdatesdefaultResponse
  | DeviceUpdateGetUpdatedefaultResponse
  | DeviceUpdateDeleteUpdatedefaultResponse
  | DeviceUpdateListProvidersdefaultResponse
  | DeviceUpdateListNamesdefaultResponse
  | DeviceUpdateListVersionsdefaultResponse
  | DeviceUpdateListFilesdefaultResponse
  | DeviceUpdateGetFiledefaultResponse
  | DeviceUpdateListOperationsdefaultResponse
  | DeviceUpdateGetOperationdefaultResponse
  | DeviceManagementListDeviceClassesdefaultResponse
  | DeviceManagementGetDeviceClassdefaultResponse
  | DeviceManagementListInstallableUpdatesForDeviceClassdefaultResponse
  | DeviceManagementListDevicesdefaultResponse
  | DeviceManagementImportDevicesdefaultResponse
  | DeviceManagementGetDevicedefaultResponse
  | DeviceManagementGetDeviceModuledefaultResponse
  | DeviceManagementGetUpdateCompliancedefaultResponse
  | DeviceManagementListDeviceTagsdefaultResponse
  | DeviceManagementGetDeviceTagdefaultResponse
  | DeviceManagementListGroupsdefaultResponse
  | DeviceManagementGetGroupdefaultResponse
  | DeviceManagementCreateOrUpdateGroupdefaultResponse
  | DeviceManagementDeleteGroupdefaultResponse
  | DeviceManagementGetGroupUpdateCompliancedefaultResponse
  | DeviceManagementListBestUpdatesForGroupdefaultResponse
  | DeviceManagementListDeploymentsForGroupdefaultResponse
  | DeviceManagementGetDeploymentdefaultResponse
  | DeviceManagementCreateOrUpdateDeploymentdefaultResponse
  | DeviceManagementDeleteDeploymentdefaultResponse
  | DeviceManagementStopDeploymentdefaultResponse
  | DeviceManagementGetDeploymentStatusdefaultResponse
  | DeviceManagementListDeploymentDevicesdefaultResponse
  | DeviceManagementGetOperationdefaultResponse
  | DeviceManagementListOperationsdefaultResponse
  | DeviceManagementCollectLogsdefaultResponse
  | DeviceManagementGetLogCollectionOperationdefaultResponse
  | DeviceManagementListLogCollectionOperationsdefaultResponse
  | DeviceManagementGetLogCollectionOperationDetailedStatusdefaultResponse {
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
