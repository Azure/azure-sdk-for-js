// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DeviceUpdateListUpdates200Response,
  DeviceUpdateListUpdatesDefaultResponse,
  DeviceUpdateImportUpdate200Response,
  DeviceUpdateImportUpdate202Response,
  DeviceUpdateImportUpdateDefaultResponse,
  DeviceUpdateGetUpdate200Response,
  DeviceUpdateGetUpdate304Response,
  DeviceUpdateGetUpdateDefaultResponse,
  DeviceUpdateDeleteUpdate202Response,
  DeviceUpdateDeleteUpdateDefaultResponse,
  DeviceUpdateListProviders200Response,
  DeviceUpdateListProvidersDefaultResponse,
  DeviceUpdateListNames200Response,
  DeviceUpdateListNamesDefaultResponse,
  DeviceUpdateListVersions200Response,
  DeviceUpdateListVersionsDefaultResponse,
  DeviceUpdateListFiles200Response,
  DeviceUpdateListFilesDefaultResponse,
  DeviceUpdateGetFile200Response,
  DeviceUpdateGetFile304Response,
  DeviceUpdateGetFileDefaultResponse,
  DeviceUpdateListOperationStatuses200Response,
  DeviceUpdateListOperationStatusesDefaultResponse,
  DeviceUpdateGetOperationStatus200Response,
  DeviceUpdateGetOperationStatus304Response,
  DeviceUpdateGetOperationStatusDefaultResponse,
  DeviceManagementListDeviceClasses200Response,
  DeviceManagementListDeviceClassesDefaultResponse,
  DeviceManagementGetDeviceClass200Response,
  DeviceManagementGetDeviceClassDefaultResponse,
  DeviceManagementUpdateDeviceClass200Response,
  DeviceManagementUpdateDeviceClassDefaultResponse,
  DeviceManagementDeleteDeviceClass204Response,
  DeviceManagementDeleteDeviceClassDefaultResponse,
  DeviceManagementListInstallableUpdatesForDeviceClass200Response,
  DeviceManagementListInstallableUpdatesForDeviceClassDefaultResponse,
  DeviceManagementListDevices200Response,
  DeviceManagementListDevicesDefaultResponse,
  DeviceManagementImportDevices202Response,
  DeviceManagementImportDevicesDefaultResponse,
  DeviceManagementGetDevice200Response,
  DeviceManagementGetDeviceDefaultResponse,
  DeviceManagementGetDeviceModule200Response,
  DeviceManagementGetDeviceModuleDefaultResponse,
  DeviceManagementGetUpdateCompliance200Response,
  DeviceManagementGetUpdateComplianceDefaultResponse,
  DeviceManagementListGroups200Response,
  DeviceManagementListGroupsDefaultResponse,
  DeviceManagementGetGroup200Response,
  DeviceManagementGetGroupDefaultResponse,
  DeviceManagementDeleteGroup204Response,
  DeviceManagementDeleteGroupDefaultResponse,
  DeviceManagementGetUpdateComplianceForGroup200Response,
  DeviceManagementGetUpdateComplianceForGroupDefaultResponse,
  DeviceManagementListBestUpdatesForGroup200Response,
  DeviceManagementListBestUpdatesForGroupDefaultResponse,
  DeviceManagementListDeploymentsForGroup200Response,
  DeviceManagementListDeploymentsForGroupDefaultResponse,
  DeviceManagementGetDeployment200Response,
  DeviceManagementGetDeploymentDefaultResponse,
  DeviceManagementCreateOrUpdateDeployment200Response,
  DeviceManagementCreateOrUpdateDeploymentDefaultResponse,
  DeviceManagementDeleteDeployment204Response,
  DeviceManagementDeleteDeploymentDefaultResponse,
  DeviceManagementGetDeploymentStatus200Response,
  DeviceManagementGetDeploymentStatusDefaultResponse,
  DeviceManagementListDeviceClassSubgroupsForGroup200Response,
  DeviceManagementListDeviceClassSubgroupsForGroupDefaultResponse,
  DeviceManagementGetDeviceClassSubgroup200Response,
  DeviceManagementGetDeviceClassSubgroupDefaultResponse,
  DeviceManagementDeleteDeviceClassSubgroup204Response,
  DeviceManagementDeleteDeviceClassSubgroupDefaultResponse,
  DeviceManagementGetDeviceClassSubgroupUpdateCompliance200Response,
  DeviceManagementGetDeviceClassSubgroupUpdateComplianceDefaultResponse,
  DeviceManagementGetBestUpdatesForDeviceClassSubgroup200Response,
  DeviceManagementGetBestUpdatesForDeviceClassSubgroupDefaultResponse,
  DeviceManagementListDeploymentsForDeviceClassSubgroup200Response,
  DeviceManagementListDeploymentsForDeviceClassSubgroupDefaultResponse,
  DeviceManagementGetDeploymentForDeviceClassSubgroup200Response,
  DeviceManagementGetDeploymentForDeviceClassSubgroupDefaultResponse,
  DeviceManagementDeleteDeploymentForDeviceClassSubgroup204Response,
  DeviceManagementDeleteDeploymentForDeviceClassSubgroupDefaultResponse,
  DeviceManagementStopDeployment200Response,
  DeviceManagementStopDeploymentDefaultResponse,
  DeviceManagementRetryDeployment200Response,
  DeviceManagementRetryDeploymentDefaultResponse,
  DeviceManagementGetDeviceClassSubgroupDeploymentStatus200Response,
  DeviceManagementGetDeviceClassSubgroupDeploymentStatusDefaultResponse,
  DeviceManagementListDeviceStatesForDeviceClassSubgroupDeployment200Response,
  DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentDefaultResponse,
  DeviceManagementGetOperationStatus200Response,
  DeviceManagementGetOperationStatus304Response,
  DeviceManagementGetOperationStatusDefaultResponse,
  DeviceManagementListOperationStatuses200Response,
  DeviceManagementListOperationStatusesDefaultResponse,
  DeviceManagementStartLogCollection201Response,
  DeviceManagementStartLogCollectionDefaultResponse,
  DeviceManagementGetLogCollection200Response,
  DeviceManagementGetLogCollectionDefaultResponse,
  DeviceManagementListLogCollections200Response,
  DeviceManagementListLogCollectionsDefaultResponse,
  DeviceManagementGetLogCollectionDetailedStatus200Response,
  DeviceManagementGetLogCollectionDetailedStatusDefaultResponse,
  DeviceManagementListHealthOfDevices200Response,
  DeviceManagementListHealthOfDevicesDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /deviceUpdate/{instanceId}/updates": ["200"],
  "GET /deviceUpdate/{instanceId}/updates:import": ["200", "202"],
  "POST /deviceUpdate/{instanceId}/updates:import": ["200", "202"],
  "GET /deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}": [
    "200",
    "304",
  ],
  "DELETE /deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}":
    ["202"],
  "GET /deviceUpdate/{instanceId}/updates/providers": ["200"],
  "GET /deviceUpdate/{instanceId}/updates/providers/{provider}/names": ["200"],
  "GET /deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions": ["200"],
  "GET /deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files":
    ["200"],
  "GET /deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files/{fileId}":
    ["200", "304"],
  "GET /deviceUpdate/{instanceId}/updates/operations": ["200"],
  "GET /deviceUpdate/{instanceId}/updates/operations/{operationId}": ["200", "304"],
  "GET /deviceUpdate/{instanceId}/management/deviceClasses": ["200"],
  "GET /deviceUpdate/{instanceId}/management/deviceClasses/{deviceClassId}": ["200"],
  "PATCH /deviceUpdate/{instanceId}/management/deviceClasses/{deviceClassId}": ["200"],
  "DELETE /deviceUpdate/{instanceId}/management/deviceClasses/{deviceClassId}": ["204"],
  "GET /deviceUpdate/{instanceId}/management/deviceClasses/{deviceClassId}/installableUpdates": [
    "200",
  ],
  "GET /deviceUpdate/{instanceId}/management/devices": ["200"],
  "GET /deviceUpdate/{instanceId}/management/devices:import": ["202"],
  "POST /deviceUpdate/{instanceId}/management/devices:import": ["202"],
  "GET /deviceUpdate/{instanceId}/management/devices/{deviceId}": ["200"],
  "GET /deviceUpdate/{instanceId}/management/devices/{deviceId}/modules/{moduleId}": ["200"],
  "GET /deviceUpdate/{instanceId}/management/updateCompliance": ["200"],
  "GET /deviceUpdate/{instanceId}/management/groups": ["200"],
  "GET /deviceUpdate/{instanceId}/management/groups/{groupId}": ["200"],
  "DELETE /deviceUpdate/{instanceId}/management/groups/{groupId}": ["204"],
  "GET /deviceUpdate/{instanceId}/management/groups/{groupId}/updateCompliance": ["200"],
  "GET /deviceUpdate/{instanceId}/management/groups/{groupId}/bestUpdates": ["200"],
  "GET /deviceUpdate/{instanceId}/management/groups/{groupId}/deployments": ["200"],
  "GET /deviceUpdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}": ["200"],
  "PUT /deviceUpdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}": ["200"],
  "DELETE /deviceUpdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}": [
    "204",
  ],
  "GET /deviceUpdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}/status": [
    "200",
  ],
  "GET /deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups": ["200"],
  "GET /deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}":
    ["200"],
  "DELETE /deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}":
    ["204"],
  "GET /deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/updateCompliance":
    ["200"],
  "GET /deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/bestUpdates":
    ["200"],
  "GET /deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments":
    ["200"],
  "GET /deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}":
    ["200"],
  "DELETE /deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}":
    ["204"],
  "POST /deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}:cancel":
    ["200"],
  "POST /deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}:retry":
    ["200"],
  "GET /deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}/status":
    ["200"],
  "GET /deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}/devicestates":
    ["200"],
  "GET /deviceUpdate/{instanceId}/management/operations/{operationId}": ["200", "304"],
  "GET /deviceUpdate/{instanceId}/management/operations": ["200"],
  "PUT /deviceUpdate/{instanceId}/management/deviceDiagnostics/logCollections/{operationId}": [
    "201",
  ],
  "GET /deviceUpdate/{instanceId}/management/deviceDiagnostics/logCollections/{operationId}": [
    "200",
  ],
  "GET /deviceUpdate/{instanceId}/management/deviceDiagnostics/logCollections": ["200"],
  "GET /deviceUpdate/{instanceId}/management/deviceDiagnostics/logCollections/{operationId}/detailedStatus":
    ["200"],
  "GET /deviceUpdate/{instanceId}/management/deviceDiagnostics/deviceHealth": ["200"],
};

export function isUnexpected(
  response: DeviceUpdateListUpdates200Response | DeviceUpdateListUpdatesDefaultResponse,
): response is DeviceUpdateListUpdatesDefaultResponse;
export function isUnexpected(
  response:
    | DeviceUpdateImportUpdate200Response
    | DeviceUpdateImportUpdate202Response
    | DeviceUpdateImportUpdateDefaultResponse,
): response is DeviceUpdateImportUpdateDefaultResponse;
export function isUnexpected(
  response:
    | DeviceUpdateGetUpdate200Response
    | DeviceUpdateGetUpdate304Response
    | DeviceUpdateGetUpdateDefaultResponse,
): response is DeviceUpdateGetUpdateDefaultResponse;
export function isUnexpected(
  response: DeviceUpdateDeleteUpdate202Response | DeviceUpdateDeleteUpdateDefaultResponse,
): response is DeviceUpdateDeleteUpdateDefaultResponse;
export function isUnexpected(
  response: DeviceUpdateListProviders200Response | DeviceUpdateListProvidersDefaultResponse,
): response is DeviceUpdateListProvidersDefaultResponse;
export function isUnexpected(
  response: DeviceUpdateListNames200Response | DeviceUpdateListNamesDefaultResponse,
): response is DeviceUpdateListNamesDefaultResponse;
export function isUnexpected(
  response: DeviceUpdateListVersions200Response | DeviceUpdateListVersionsDefaultResponse,
): response is DeviceUpdateListVersionsDefaultResponse;
export function isUnexpected(
  response: DeviceUpdateListFiles200Response | DeviceUpdateListFilesDefaultResponse,
): response is DeviceUpdateListFilesDefaultResponse;
export function isUnexpected(
  response:
    | DeviceUpdateGetFile200Response
    | DeviceUpdateGetFile304Response
    | DeviceUpdateGetFileDefaultResponse,
): response is DeviceUpdateGetFileDefaultResponse;
export function isUnexpected(
  response:
    | DeviceUpdateListOperationStatuses200Response
    | DeviceUpdateListOperationStatusesDefaultResponse,
): response is DeviceUpdateListOperationStatusesDefaultResponse;
export function isUnexpected(
  response:
    | DeviceUpdateGetOperationStatus200Response
    | DeviceUpdateGetOperationStatus304Response
    | DeviceUpdateGetOperationStatusDefaultResponse,
): response is DeviceUpdateGetOperationStatusDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListDeviceClasses200Response
    | DeviceManagementListDeviceClassesDefaultResponse,
): response is DeviceManagementListDeviceClassesDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetDeviceClass200Response
    | DeviceManagementGetDeviceClassDefaultResponse,
): response is DeviceManagementGetDeviceClassDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementUpdateDeviceClass200Response
    | DeviceManagementUpdateDeviceClassDefaultResponse,
): response is DeviceManagementUpdateDeviceClassDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementDeleteDeviceClass204Response
    | DeviceManagementDeleteDeviceClassDefaultResponse,
): response is DeviceManagementDeleteDeviceClassDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListInstallableUpdatesForDeviceClass200Response
    | DeviceManagementListInstallableUpdatesForDeviceClassDefaultResponse,
): response is DeviceManagementListInstallableUpdatesForDeviceClassDefaultResponse;
export function isUnexpected(
  response: DeviceManagementListDevices200Response | DeviceManagementListDevicesDefaultResponse,
): response is DeviceManagementListDevicesDefaultResponse;
export function isUnexpected(
  response: DeviceManagementImportDevices202Response | DeviceManagementImportDevicesDefaultResponse,
): response is DeviceManagementImportDevicesDefaultResponse;
export function isUnexpected(
  response: DeviceManagementGetDevice200Response | DeviceManagementGetDeviceDefaultResponse,
): response is DeviceManagementGetDeviceDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetDeviceModule200Response
    | DeviceManagementGetDeviceModuleDefaultResponse,
): response is DeviceManagementGetDeviceModuleDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetUpdateCompliance200Response
    | DeviceManagementGetUpdateComplianceDefaultResponse,
): response is DeviceManagementGetUpdateComplianceDefaultResponse;
export function isUnexpected(
  response: DeviceManagementListGroups200Response | DeviceManagementListGroupsDefaultResponse,
): response is DeviceManagementListGroupsDefaultResponse;
export function isUnexpected(
  response: DeviceManagementGetGroup200Response | DeviceManagementGetGroupDefaultResponse,
): response is DeviceManagementGetGroupDefaultResponse;
export function isUnexpected(
  response: DeviceManagementDeleteGroup204Response | DeviceManagementDeleteGroupDefaultResponse,
): response is DeviceManagementDeleteGroupDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetUpdateComplianceForGroup200Response
    | DeviceManagementGetUpdateComplianceForGroupDefaultResponse,
): response is DeviceManagementGetUpdateComplianceForGroupDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListBestUpdatesForGroup200Response
    | DeviceManagementListBestUpdatesForGroupDefaultResponse,
): response is DeviceManagementListBestUpdatesForGroupDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListDeploymentsForGroup200Response
    | DeviceManagementListDeploymentsForGroupDefaultResponse,
): response is DeviceManagementListDeploymentsForGroupDefaultResponse;
export function isUnexpected(
  response: DeviceManagementGetDeployment200Response | DeviceManagementGetDeploymentDefaultResponse,
): response is DeviceManagementGetDeploymentDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementCreateOrUpdateDeployment200Response
    | DeviceManagementCreateOrUpdateDeploymentDefaultResponse,
): response is DeviceManagementCreateOrUpdateDeploymentDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementDeleteDeployment204Response
    | DeviceManagementDeleteDeploymentDefaultResponse,
): response is DeviceManagementDeleteDeploymentDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetDeploymentStatus200Response
    | DeviceManagementGetDeploymentStatusDefaultResponse,
): response is DeviceManagementGetDeploymentStatusDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListDeviceClassSubgroupsForGroup200Response
    | DeviceManagementListDeviceClassSubgroupsForGroupDefaultResponse,
): response is DeviceManagementListDeviceClassSubgroupsForGroupDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetDeviceClassSubgroup200Response
    | DeviceManagementGetDeviceClassSubgroupDefaultResponse,
): response is DeviceManagementGetDeviceClassSubgroupDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementDeleteDeviceClassSubgroup204Response
    | DeviceManagementDeleteDeviceClassSubgroupDefaultResponse,
): response is DeviceManagementDeleteDeviceClassSubgroupDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetDeviceClassSubgroupUpdateCompliance200Response
    | DeviceManagementGetDeviceClassSubgroupUpdateComplianceDefaultResponse,
): response is DeviceManagementGetDeviceClassSubgroupUpdateComplianceDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetBestUpdatesForDeviceClassSubgroup200Response
    | DeviceManagementGetBestUpdatesForDeviceClassSubgroupDefaultResponse,
): response is DeviceManagementGetBestUpdatesForDeviceClassSubgroupDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListDeploymentsForDeviceClassSubgroup200Response
    | DeviceManagementListDeploymentsForDeviceClassSubgroupDefaultResponse,
): response is DeviceManagementListDeploymentsForDeviceClassSubgroupDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetDeploymentForDeviceClassSubgroup200Response
    | DeviceManagementGetDeploymentForDeviceClassSubgroupDefaultResponse,
): response is DeviceManagementGetDeploymentForDeviceClassSubgroupDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementDeleteDeploymentForDeviceClassSubgroup204Response
    | DeviceManagementDeleteDeploymentForDeviceClassSubgroupDefaultResponse,
): response is DeviceManagementDeleteDeploymentForDeviceClassSubgroupDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementStopDeployment200Response
    | DeviceManagementStopDeploymentDefaultResponse,
): response is DeviceManagementStopDeploymentDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementRetryDeployment200Response
    | DeviceManagementRetryDeploymentDefaultResponse,
): response is DeviceManagementRetryDeploymentDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetDeviceClassSubgroupDeploymentStatus200Response
    | DeviceManagementGetDeviceClassSubgroupDeploymentStatusDefaultResponse,
): response is DeviceManagementGetDeviceClassSubgroupDeploymentStatusDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListDeviceStatesForDeviceClassSubgroupDeployment200Response
    | DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentDefaultResponse,
): response is DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetOperationStatus200Response
    | DeviceManagementGetOperationStatus304Response
    | DeviceManagementGetOperationStatusDefaultResponse,
): response is DeviceManagementGetOperationStatusDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListOperationStatuses200Response
    | DeviceManagementListOperationStatusesDefaultResponse,
): response is DeviceManagementListOperationStatusesDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementStartLogCollection201Response
    | DeviceManagementStartLogCollectionDefaultResponse,
): response is DeviceManagementStartLogCollectionDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetLogCollection200Response
    | DeviceManagementGetLogCollectionDefaultResponse,
): response is DeviceManagementGetLogCollectionDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListLogCollections200Response
    | DeviceManagementListLogCollectionsDefaultResponse,
): response is DeviceManagementListLogCollectionsDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetLogCollectionDetailedStatus200Response
    | DeviceManagementGetLogCollectionDetailedStatusDefaultResponse,
): response is DeviceManagementGetLogCollectionDetailedStatusDefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListHealthOfDevices200Response
    | DeviceManagementListHealthOfDevicesDefaultResponse,
): response is DeviceManagementListHealthOfDevicesDefaultResponse;
export function isUnexpected(
  response:
    | DeviceUpdateListUpdates200Response
    | DeviceUpdateListUpdatesDefaultResponse
    | DeviceUpdateImportUpdate200Response
    | DeviceUpdateImportUpdate202Response
    | DeviceUpdateImportUpdateDefaultResponse
    | DeviceUpdateGetUpdate200Response
    | DeviceUpdateGetUpdate304Response
    | DeviceUpdateGetUpdateDefaultResponse
    | DeviceUpdateDeleteUpdate202Response
    | DeviceUpdateDeleteUpdateDefaultResponse
    | DeviceUpdateListProviders200Response
    | DeviceUpdateListProvidersDefaultResponse
    | DeviceUpdateListNames200Response
    | DeviceUpdateListNamesDefaultResponse
    | DeviceUpdateListVersions200Response
    | DeviceUpdateListVersionsDefaultResponse
    | DeviceUpdateListFiles200Response
    | DeviceUpdateListFilesDefaultResponse
    | DeviceUpdateGetFile200Response
    | DeviceUpdateGetFile304Response
    | DeviceUpdateGetFileDefaultResponse
    | DeviceUpdateListOperationStatuses200Response
    | DeviceUpdateListOperationStatusesDefaultResponse
    | DeviceUpdateGetOperationStatus200Response
    | DeviceUpdateGetOperationStatus304Response
    | DeviceUpdateGetOperationStatusDefaultResponse
    | DeviceManagementListDeviceClasses200Response
    | DeviceManagementListDeviceClassesDefaultResponse
    | DeviceManagementGetDeviceClass200Response
    | DeviceManagementGetDeviceClassDefaultResponse
    | DeviceManagementUpdateDeviceClass200Response
    | DeviceManagementUpdateDeviceClassDefaultResponse
    | DeviceManagementDeleteDeviceClass204Response
    | DeviceManagementDeleteDeviceClassDefaultResponse
    | DeviceManagementListInstallableUpdatesForDeviceClass200Response
    | DeviceManagementListInstallableUpdatesForDeviceClassDefaultResponse
    | DeviceManagementListDevices200Response
    | DeviceManagementListDevicesDefaultResponse
    | DeviceManagementImportDevices202Response
    | DeviceManagementImportDevicesDefaultResponse
    | DeviceManagementGetDevice200Response
    | DeviceManagementGetDeviceDefaultResponse
    | DeviceManagementGetDeviceModule200Response
    | DeviceManagementGetDeviceModuleDefaultResponse
    | DeviceManagementGetUpdateCompliance200Response
    | DeviceManagementGetUpdateComplianceDefaultResponse
    | DeviceManagementListGroups200Response
    | DeviceManagementListGroupsDefaultResponse
    | DeviceManagementGetGroup200Response
    | DeviceManagementGetGroupDefaultResponse
    | DeviceManagementDeleteGroup204Response
    | DeviceManagementDeleteGroupDefaultResponse
    | DeviceManagementGetUpdateComplianceForGroup200Response
    | DeviceManagementGetUpdateComplianceForGroupDefaultResponse
    | DeviceManagementListBestUpdatesForGroup200Response
    | DeviceManagementListBestUpdatesForGroupDefaultResponse
    | DeviceManagementListDeploymentsForGroup200Response
    | DeviceManagementListDeploymentsForGroupDefaultResponse
    | DeviceManagementGetDeployment200Response
    | DeviceManagementGetDeploymentDefaultResponse
    | DeviceManagementCreateOrUpdateDeployment200Response
    | DeviceManagementCreateOrUpdateDeploymentDefaultResponse
    | DeviceManagementDeleteDeployment204Response
    | DeviceManagementDeleteDeploymentDefaultResponse
    | DeviceManagementGetDeploymentStatus200Response
    | DeviceManagementGetDeploymentStatusDefaultResponse
    | DeviceManagementListDeviceClassSubgroupsForGroup200Response
    | DeviceManagementListDeviceClassSubgroupsForGroupDefaultResponse
    | DeviceManagementGetDeviceClassSubgroup200Response
    | DeviceManagementGetDeviceClassSubgroupDefaultResponse
    | DeviceManagementDeleteDeviceClassSubgroup204Response
    | DeviceManagementDeleteDeviceClassSubgroupDefaultResponse
    | DeviceManagementGetDeviceClassSubgroupUpdateCompliance200Response
    | DeviceManagementGetDeviceClassSubgroupUpdateComplianceDefaultResponse
    | DeviceManagementGetBestUpdatesForDeviceClassSubgroup200Response
    | DeviceManagementGetBestUpdatesForDeviceClassSubgroupDefaultResponse
    | DeviceManagementListDeploymentsForDeviceClassSubgroup200Response
    | DeviceManagementListDeploymentsForDeviceClassSubgroupDefaultResponse
    | DeviceManagementGetDeploymentForDeviceClassSubgroup200Response
    | DeviceManagementGetDeploymentForDeviceClassSubgroupDefaultResponse
    | DeviceManagementDeleteDeploymentForDeviceClassSubgroup204Response
    | DeviceManagementDeleteDeploymentForDeviceClassSubgroupDefaultResponse
    | DeviceManagementStopDeployment200Response
    | DeviceManagementStopDeploymentDefaultResponse
    | DeviceManagementRetryDeployment200Response
    | DeviceManagementRetryDeploymentDefaultResponse
    | DeviceManagementGetDeviceClassSubgroupDeploymentStatus200Response
    | DeviceManagementGetDeviceClassSubgroupDeploymentStatusDefaultResponse
    | DeviceManagementListDeviceStatesForDeviceClassSubgroupDeployment200Response
    | DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentDefaultResponse
    | DeviceManagementGetOperationStatus200Response
    | DeviceManagementGetOperationStatus304Response
    | DeviceManagementGetOperationStatusDefaultResponse
    | DeviceManagementListOperationStatuses200Response
    | DeviceManagementListOperationStatusesDefaultResponse
    | DeviceManagementStartLogCollection201Response
    | DeviceManagementStartLogCollectionDefaultResponse
    | DeviceManagementGetLogCollection200Response
    | DeviceManagementGetLogCollectionDefaultResponse
    | DeviceManagementListLogCollections200Response
    | DeviceManagementListLogCollectionsDefaultResponse
    | DeviceManagementGetLogCollectionDetailedStatus200Response
    | DeviceManagementGetLogCollectionDetailedStatusDefaultResponse
    | DeviceManagementListHealthOfDevices200Response
    | DeviceManagementListHealthOfDevicesDefaultResponse,
): response is
  | DeviceUpdateListUpdatesDefaultResponse
  | DeviceUpdateImportUpdateDefaultResponse
  | DeviceUpdateGetUpdateDefaultResponse
  | DeviceUpdateDeleteUpdateDefaultResponse
  | DeviceUpdateListProvidersDefaultResponse
  | DeviceUpdateListNamesDefaultResponse
  | DeviceUpdateListVersionsDefaultResponse
  | DeviceUpdateListFilesDefaultResponse
  | DeviceUpdateGetFileDefaultResponse
  | DeviceUpdateListOperationStatusesDefaultResponse
  | DeviceUpdateGetOperationStatusDefaultResponse
  | DeviceManagementListDeviceClassesDefaultResponse
  | DeviceManagementGetDeviceClassDefaultResponse
  | DeviceManagementUpdateDeviceClassDefaultResponse
  | DeviceManagementDeleteDeviceClassDefaultResponse
  | DeviceManagementListInstallableUpdatesForDeviceClassDefaultResponse
  | DeviceManagementListDevicesDefaultResponse
  | DeviceManagementImportDevicesDefaultResponse
  | DeviceManagementGetDeviceDefaultResponse
  | DeviceManagementGetDeviceModuleDefaultResponse
  | DeviceManagementGetUpdateComplianceDefaultResponse
  | DeviceManagementListGroupsDefaultResponse
  | DeviceManagementGetGroupDefaultResponse
  | DeviceManagementDeleteGroupDefaultResponse
  | DeviceManagementGetUpdateComplianceForGroupDefaultResponse
  | DeviceManagementListBestUpdatesForGroupDefaultResponse
  | DeviceManagementListDeploymentsForGroupDefaultResponse
  | DeviceManagementGetDeploymentDefaultResponse
  | DeviceManagementCreateOrUpdateDeploymentDefaultResponse
  | DeviceManagementDeleteDeploymentDefaultResponse
  | DeviceManagementGetDeploymentStatusDefaultResponse
  | DeviceManagementListDeviceClassSubgroupsForGroupDefaultResponse
  | DeviceManagementGetDeviceClassSubgroupDefaultResponse
  | DeviceManagementDeleteDeviceClassSubgroupDefaultResponse
  | DeviceManagementGetDeviceClassSubgroupUpdateComplianceDefaultResponse
  | DeviceManagementGetBestUpdatesForDeviceClassSubgroupDefaultResponse
  | DeviceManagementListDeploymentsForDeviceClassSubgroupDefaultResponse
  | DeviceManagementGetDeploymentForDeviceClassSubgroupDefaultResponse
  | DeviceManagementDeleteDeploymentForDeviceClassSubgroupDefaultResponse
  | DeviceManagementStopDeploymentDefaultResponse
  | DeviceManagementRetryDeploymentDefaultResponse
  | DeviceManagementGetDeviceClassSubgroupDeploymentStatusDefaultResponse
  | DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentDefaultResponse
  | DeviceManagementGetOperationStatusDefaultResponse
  | DeviceManagementListOperationStatusesDefaultResponse
  | DeviceManagementStartLogCollectionDefaultResponse
  | DeviceManagementGetLogCollectionDefaultResponse
  | DeviceManagementListLogCollectionsDefaultResponse
  | DeviceManagementGetLogCollectionDetailedStatusDefaultResponse
  | DeviceManagementListHealthOfDevicesDefaultResponse {
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
