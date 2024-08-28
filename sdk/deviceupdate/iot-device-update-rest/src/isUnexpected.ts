// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DeviceUpdateListUpdates200Response,
  DeviceUpdateListUpdatesdefaultResponse,
  DeviceUpdateImportUpdate200Response,
  DeviceUpdateImportUpdate202Response,
  DeviceUpdateImportUpdatedefaultResponse,
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
  DeviceUpdateListOperationStatuses200Response,
  DeviceUpdateListOperationStatusesdefaultResponse,
  DeviceUpdateGetOperationStatus200Response,
  DeviceUpdateGetOperationStatus304Response,
  DeviceUpdateGetOperationStatusdefaultResponse,
  DeviceManagementListDeviceClasses200Response,
  DeviceManagementListDeviceClassesdefaultResponse,
  DeviceManagementGetDeviceClass200Response,
  DeviceManagementGetDeviceClassdefaultResponse,
  DeviceManagementUpdateDeviceClass200Response,
  DeviceManagementUpdateDeviceClassdefaultResponse,
  DeviceManagementDeleteDeviceClass204Response,
  DeviceManagementDeleteDeviceClassdefaultResponse,
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
  DeviceManagementListGroups200Response,
  DeviceManagementListGroupsdefaultResponse,
  DeviceManagementGetGroup200Response,
  DeviceManagementGetGroupdefaultResponse,
  DeviceManagementDeleteGroup204Response,
  DeviceManagementDeleteGroupdefaultResponse,
  DeviceManagementGetUpdateComplianceForGroup200Response,
  DeviceManagementGetUpdateComplianceForGroupdefaultResponse,
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
  DeviceManagementGetDeploymentStatus200Response,
  DeviceManagementGetDeploymentStatusdefaultResponse,
  DeviceManagementListDeviceClassSubgroupsForGroup200Response,
  DeviceManagementListDeviceClassSubgroupsForGroupdefaultResponse,
  DeviceManagementGetDeviceClassSubgroup200Response,
  DeviceManagementGetDeviceClassSubgroupdefaultResponse,
  DeviceManagementDeleteDeviceClassSubgroup204Response,
  DeviceManagementDeleteDeviceClassSubgroupdefaultResponse,
  DeviceManagementGetDeviceClassSubgroupUpdateCompliance200Response,
  DeviceManagementGetDeviceClassSubgroupUpdateCompliancedefaultResponse,
  DeviceManagementGetBestUpdatesForDeviceClassSubgroup200Response,
  DeviceManagementGetBestUpdatesForDeviceClassSubgroupdefaultResponse,
  DeviceManagementListDeploymentsForDeviceClassSubgroup200Response,
  DeviceManagementListDeploymentsForDeviceClassSubgroupdefaultResponse,
  DeviceManagementGetDeploymentForDeviceClassSubgroup200Response,
  DeviceManagementGetDeploymentForDeviceClassSubgroupdefaultResponse,
  DeviceManagementDeleteDeploymentForDeviceClassSubgroup204Response,
  DeviceManagementDeleteDeploymentForDeviceClassSubgroupdefaultResponse,
  DeviceManagementStopDeployment200Response,
  DeviceManagementStopDeploymentdefaultResponse,
  DeviceManagementRetryDeployment200Response,
  DeviceManagementRetryDeploymentdefaultResponse,
  DeviceManagementGetDeviceClassSubgroupDeploymentStatus200Response,
  DeviceManagementGetDeviceClassSubgroupDeploymentStatusdefaultResponse,
  DeviceManagementListDeviceStatesForDeviceClassSubgroupDeployment200Response,
  DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentdefaultResponse,
  DeviceManagementGetOperationStatus200Response,
  DeviceManagementGetOperationStatus304Response,
  DeviceManagementGetOperationStatusdefaultResponse,
  DeviceManagementListOperationStatuses200Response,
  DeviceManagementListOperationStatusesdefaultResponse,
  DeviceManagementStartLogCollection201Response,
  DeviceManagementStartLogCollectiondefaultResponse,
  DeviceManagementGetLogCollection200Response,
  DeviceManagementGetLogCollectiondefaultResponse,
  DeviceManagementListLogCollections200Response,
  DeviceManagementListLogCollectionsdefaultResponse,
  DeviceManagementGetLogCollectionDetailedStatus200Response,
  DeviceManagementGetLogCollectionDetailedStatusdefaultResponse,
  DeviceManagementListHealthOfDevices200Response,
  DeviceManagementListHealthOfDevicesdefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /deviceUpdate/{instanceId}/updates": ["200"],
  "POST /deviceUpdate/{instanceId}/updates:import": ["200", "202"],
  "GET /deviceUpdate/{instanceId}/updates:import": ["200", "202"],
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
  "POST /deviceUpdate/{instanceId}/management/devices:import": ["202"],
  "GET /deviceUpdate/{instanceId}/management/devices:import": ["202"],
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
  response: DeviceUpdateListUpdates200Response | DeviceUpdateListUpdatesdefaultResponse,
): response is DeviceUpdateListUpdatesdefaultResponse;
export function isUnexpected(
  response:
    | DeviceUpdateImportUpdate200Response
    | DeviceUpdateImportUpdate202Response
    | DeviceUpdateImportUpdatedefaultResponse,
): response is DeviceUpdateImportUpdatedefaultResponse;
export function isUnexpected(
  response:
    | DeviceUpdateGetUpdate200Response
    | DeviceUpdateGetUpdate304Response
    | DeviceUpdateGetUpdatedefaultResponse,
): response is DeviceUpdateGetUpdatedefaultResponse;
export function isUnexpected(
  response: DeviceUpdateDeleteUpdate202Response | DeviceUpdateDeleteUpdatedefaultResponse,
): response is DeviceUpdateDeleteUpdatedefaultResponse;
export function isUnexpected(
  response: DeviceUpdateListProviders200Response | DeviceUpdateListProvidersdefaultResponse,
): response is DeviceUpdateListProvidersdefaultResponse;
export function isUnexpected(
  response: DeviceUpdateListNames200Response | DeviceUpdateListNamesdefaultResponse,
): response is DeviceUpdateListNamesdefaultResponse;
export function isUnexpected(
  response: DeviceUpdateListVersions200Response | DeviceUpdateListVersionsdefaultResponse,
): response is DeviceUpdateListVersionsdefaultResponse;
export function isUnexpected(
  response: DeviceUpdateListFiles200Response | DeviceUpdateListFilesdefaultResponse,
): response is DeviceUpdateListFilesdefaultResponse;
export function isUnexpected(
  response:
    | DeviceUpdateGetFile200Response
    | DeviceUpdateGetFile304Response
    | DeviceUpdateGetFiledefaultResponse,
): response is DeviceUpdateGetFiledefaultResponse;
export function isUnexpected(
  response:
    | DeviceUpdateListOperationStatuses200Response
    | DeviceUpdateListOperationStatusesdefaultResponse,
): response is DeviceUpdateListOperationStatusesdefaultResponse;
export function isUnexpected(
  response:
    | DeviceUpdateGetOperationStatus200Response
    | DeviceUpdateGetOperationStatus304Response
    | DeviceUpdateGetOperationStatusdefaultResponse,
): response is DeviceUpdateGetOperationStatusdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListDeviceClasses200Response
    | DeviceManagementListDeviceClassesdefaultResponse,
): response is DeviceManagementListDeviceClassesdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetDeviceClass200Response
    | DeviceManagementGetDeviceClassdefaultResponse,
): response is DeviceManagementGetDeviceClassdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementUpdateDeviceClass200Response
    | DeviceManagementUpdateDeviceClassdefaultResponse,
): response is DeviceManagementUpdateDeviceClassdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementDeleteDeviceClass204Response
    | DeviceManagementDeleteDeviceClassdefaultResponse,
): response is DeviceManagementDeleteDeviceClassdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListInstallableUpdatesForDeviceClass200Response
    | DeviceManagementListInstallableUpdatesForDeviceClassdefaultResponse,
): response is DeviceManagementListInstallableUpdatesForDeviceClassdefaultResponse;
export function isUnexpected(
  response: DeviceManagementListDevices200Response | DeviceManagementListDevicesdefaultResponse,
): response is DeviceManagementListDevicesdefaultResponse;
export function isUnexpected(
  response: DeviceManagementImportDevices202Response | DeviceManagementImportDevicesdefaultResponse,
): response is DeviceManagementImportDevicesdefaultResponse;
export function isUnexpected(
  response: DeviceManagementGetDevice200Response | DeviceManagementGetDevicedefaultResponse,
): response is DeviceManagementGetDevicedefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetDeviceModule200Response
    | DeviceManagementGetDeviceModuledefaultResponse,
): response is DeviceManagementGetDeviceModuledefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetUpdateCompliance200Response
    | DeviceManagementGetUpdateCompliancedefaultResponse,
): response is DeviceManagementGetUpdateCompliancedefaultResponse;
export function isUnexpected(
  response: DeviceManagementListGroups200Response | DeviceManagementListGroupsdefaultResponse,
): response is DeviceManagementListGroupsdefaultResponse;
export function isUnexpected(
  response: DeviceManagementGetGroup200Response | DeviceManagementGetGroupdefaultResponse,
): response is DeviceManagementGetGroupdefaultResponse;
export function isUnexpected(
  response: DeviceManagementDeleteGroup204Response | DeviceManagementDeleteGroupdefaultResponse,
): response is DeviceManagementDeleteGroupdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetUpdateComplianceForGroup200Response
    | DeviceManagementGetUpdateComplianceForGroupdefaultResponse,
): response is DeviceManagementGetUpdateComplianceForGroupdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListBestUpdatesForGroup200Response
    | DeviceManagementListBestUpdatesForGroupdefaultResponse,
): response is DeviceManagementListBestUpdatesForGroupdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListDeploymentsForGroup200Response
    | DeviceManagementListDeploymentsForGroupdefaultResponse,
): response is DeviceManagementListDeploymentsForGroupdefaultResponse;
export function isUnexpected(
  response: DeviceManagementGetDeployment200Response | DeviceManagementGetDeploymentdefaultResponse,
): response is DeviceManagementGetDeploymentdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementCreateOrUpdateDeployment200Response
    | DeviceManagementCreateOrUpdateDeploymentdefaultResponse,
): response is DeviceManagementCreateOrUpdateDeploymentdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementDeleteDeployment204Response
    | DeviceManagementDeleteDeploymentdefaultResponse,
): response is DeviceManagementDeleteDeploymentdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetDeploymentStatus200Response
    | DeviceManagementGetDeploymentStatusdefaultResponse,
): response is DeviceManagementGetDeploymentStatusdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListDeviceClassSubgroupsForGroup200Response
    | DeviceManagementListDeviceClassSubgroupsForGroupdefaultResponse,
): response is DeviceManagementListDeviceClassSubgroupsForGroupdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetDeviceClassSubgroup200Response
    | DeviceManagementGetDeviceClassSubgroupdefaultResponse,
): response is DeviceManagementGetDeviceClassSubgroupdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementDeleteDeviceClassSubgroup204Response
    | DeviceManagementDeleteDeviceClassSubgroupdefaultResponse,
): response is DeviceManagementDeleteDeviceClassSubgroupdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetDeviceClassSubgroupUpdateCompliance200Response
    | DeviceManagementGetDeviceClassSubgroupUpdateCompliancedefaultResponse,
): response is DeviceManagementGetDeviceClassSubgroupUpdateCompliancedefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetBestUpdatesForDeviceClassSubgroup200Response
    | DeviceManagementGetBestUpdatesForDeviceClassSubgroupdefaultResponse,
): response is DeviceManagementGetBestUpdatesForDeviceClassSubgroupdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListDeploymentsForDeviceClassSubgroup200Response
    | DeviceManagementListDeploymentsForDeviceClassSubgroupdefaultResponse,
): response is DeviceManagementListDeploymentsForDeviceClassSubgroupdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetDeploymentForDeviceClassSubgroup200Response
    | DeviceManagementGetDeploymentForDeviceClassSubgroupdefaultResponse,
): response is DeviceManagementGetDeploymentForDeviceClassSubgroupdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementDeleteDeploymentForDeviceClassSubgroup204Response
    | DeviceManagementDeleteDeploymentForDeviceClassSubgroupdefaultResponse,
): response is DeviceManagementDeleteDeploymentForDeviceClassSubgroupdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementStopDeployment200Response
    | DeviceManagementStopDeploymentdefaultResponse,
): response is DeviceManagementStopDeploymentdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementRetryDeployment200Response
    | DeviceManagementRetryDeploymentdefaultResponse,
): response is DeviceManagementRetryDeploymentdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetDeviceClassSubgroupDeploymentStatus200Response
    | DeviceManagementGetDeviceClassSubgroupDeploymentStatusdefaultResponse,
): response is DeviceManagementGetDeviceClassSubgroupDeploymentStatusdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListDeviceStatesForDeviceClassSubgroupDeployment200Response
    | DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentdefaultResponse,
): response is DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetOperationStatus200Response
    | DeviceManagementGetOperationStatus304Response
    | DeviceManagementGetOperationStatusdefaultResponse,
): response is DeviceManagementGetOperationStatusdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListOperationStatuses200Response
    | DeviceManagementListOperationStatusesdefaultResponse,
): response is DeviceManagementListOperationStatusesdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementStartLogCollection201Response
    | DeviceManagementStartLogCollectiondefaultResponse,
): response is DeviceManagementStartLogCollectiondefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetLogCollection200Response
    | DeviceManagementGetLogCollectiondefaultResponse,
): response is DeviceManagementGetLogCollectiondefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListLogCollections200Response
    | DeviceManagementListLogCollectionsdefaultResponse,
): response is DeviceManagementListLogCollectionsdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementGetLogCollectionDetailedStatus200Response
    | DeviceManagementGetLogCollectionDetailedStatusdefaultResponse,
): response is DeviceManagementGetLogCollectionDetailedStatusdefaultResponse;
export function isUnexpected(
  response:
    | DeviceManagementListHealthOfDevices200Response
    | DeviceManagementListHealthOfDevicesdefaultResponse,
): response is DeviceManagementListHealthOfDevicesdefaultResponse;
export function isUnexpected(
  response:
    | DeviceUpdateListUpdates200Response
    | DeviceUpdateListUpdatesdefaultResponse
    | DeviceUpdateImportUpdate200Response
    | DeviceUpdateImportUpdate202Response
    | DeviceUpdateImportUpdatedefaultResponse
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
    | DeviceUpdateListOperationStatuses200Response
    | DeviceUpdateListOperationStatusesdefaultResponse
    | DeviceUpdateGetOperationStatus200Response
    | DeviceUpdateGetOperationStatus304Response
    | DeviceUpdateGetOperationStatusdefaultResponse
    | DeviceManagementListDeviceClasses200Response
    | DeviceManagementListDeviceClassesdefaultResponse
    | DeviceManagementGetDeviceClass200Response
    | DeviceManagementGetDeviceClassdefaultResponse
    | DeviceManagementUpdateDeviceClass200Response
    | DeviceManagementUpdateDeviceClassdefaultResponse
    | DeviceManagementDeleteDeviceClass204Response
    | DeviceManagementDeleteDeviceClassdefaultResponse
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
    | DeviceManagementListGroups200Response
    | DeviceManagementListGroupsdefaultResponse
    | DeviceManagementGetGroup200Response
    | DeviceManagementGetGroupdefaultResponse
    | DeviceManagementDeleteGroup204Response
    | DeviceManagementDeleteGroupdefaultResponse
    | DeviceManagementGetUpdateComplianceForGroup200Response
    | DeviceManagementGetUpdateComplianceForGroupdefaultResponse
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
    | DeviceManagementGetDeploymentStatus200Response
    | DeviceManagementGetDeploymentStatusdefaultResponse
    | DeviceManagementListDeviceClassSubgroupsForGroup200Response
    | DeviceManagementListDeviceClassSubgroupsForGroupdefaultResponse
    | DeviceManagementGetDeviceClassSubgroup200Response
    | DeviceManagementGetDeviceClassSubgroupdefaultResponse
    | DeviceManagementDeleteDeviceClassSubgroup204Response
    | DeviceManagementDeleteDeviceClassSubgroupdefaultResponse
    | DeviceManagementGetDeviceClassSubgroupUpdateCompliance200Response
    | DeviceManagementGetDeviceClassSubgroupUpdateCompliancedefaultResponse
    | DeviceManagementGetBestUpdatesForDeviceClassSubgroup200Response
    | DeviceManagementGetBestUpdatesForDeviceClassSubgroupdefaultResponse
    | DeviceManagementListDeploymentsForDeviceClassSubgroup200Response
    | DeviceManagementListDeploymentsForDeviceClassSubgroupdefaultResponse
    | DeviceManagementGetDeploymentForDeviceClassSubgroup200Response
    | DeviceManagementGetDeploymentForDeviceClassSubgroupdefaultResponse
    | DeviceManagementDeleteDeploymentForDeviceClassSubgroup204Response
    | DeviceManagementDeleteDeploymentForDeviceClassSubgroupdefaultResponse
    | DeviceManagementStopDeployment200Response
    | DeviceManagementStopDeploymentdefaultResponse
    | DeviceManagementRetryDeployment200Response
    | DeviceManagementRetryDeploymentdefaultResponse
    | DeviceManagementGetDeviceClassSubgroupDeploymentStatus200Response
    | DeviceManagementGetDeviceClassSubgroupDeploymentStatusdefaultResponse
    | DeviceManagementListDeviceStatesForDeviceClassSubgroupDeployment200Response
    | DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentdefaultResponse
    | DeviceManagementGetOperationStatus200Response
    | DeviceManagementGetOperationStatus304Response
    | DeviceManagementGetOperationStatusdefaultResponse
    | DeviceManagementListOperationStatuses200Response
    | DeviceManagementListOperationStatusesdefaultResponse
    | DeviceManagementStartLogCollection201Response
    | DeviceManagementStartLogCollectiondefaultResponse
    | DeviceManagementGetLogCollection200Response
    | DeviceManagementGetLogCollectiondefaultResponse
    | DeviceManagementListLogCollections200Response
    | DeviceManagementListLogCollectionsdefaultResponse
    | DeviceManagementGetLogCollectionDetailedStatus200Response
    | DeviceManagementGetLogCollectionDetailedStatusdefaultResponse
    | DeviceManagementListHealthOfDevices200Response
    | DeviceManagementListHealthOfDevicesdefaultResponse,
): response is
  | DeviceUpdateListUpdatesdefaultResponse
  | DeviceUpdateImportUpdatedefaultResponse
  | DeviceUpdateGetUpdatedefaultResponse
  | DeviceUpdateDeleteUpdatedefaultResponse
  | DeviceUpdateListProvidersdefaultResponse
  | DeviceUpdateListNamesdefaultResponse
  | DeviceUpdateListVersionsdefaultResponse
  | DeviceUpdateListFilesdefaultResponse
  | DeviceUpdateGetFiledefaultResponse
  | DeviceUpdateListOperationStatusesdefaultResponse
  | DeviceUpdateGetOperationStatusdefaultResponse
  | DeviceManagementListDeviceClassesdefaultResponse
  | DeviceManagementGetDeviceClassdefaultResponse
  | DeviceManagementUpdateDeviceClassdefaultResponse
  | DeviceManagementDeleteDeviceClassdefaultResponse
  | DeviceManagementListInstallableUpdatesForDeviceClassdefaultResponse
  | DeviceManagementListDevicesdefaultResponse
  | DeviceManagementImportDevicesdefaultResponse
  | DeviceManagementGetDevicedefaultResponse
  | DeviceManagementGetDeviceModuledefaultResponse
  | DeviceManagementGetUpdateCompliancedefaultResponse
  | DeviceManagementListGroupsdefaultResponse
  | DeviceManagementGetGroupdefaultResponse
  | DeviceManagementDeleteGroupdefaultResponse
  | DeviceManagementGetUpdateComplianceForGroupdefaultResponse
  | DeviceManagementListBestUpdatesForGroupdefaultResponse
  | DeviceManagementListDeploymentsForGroupdefaultResponse
  | DeviceManagementGetDeploymentdefaultResponse
  | DeviceManagementCreateOrUpdateDeploymentdefaultResponse
  | DeviceManagementDeleteDeploymentdefaultResponse
  | DeviceManagementGetDeploymentStatusdefaultResponse
  | DeviceManagementListDeviceClassSubgroupsForGroupdefaultResponse
  | DeviceManagementGetDeviceClassSubgroupdefaultResponse
  | DeviceManagementDeleteDeviceClassSubgroupdefaultResponse
  | DeviceManagementGetDeviceClassSubgroupUpdateCompliancedefaultResponse
  | DeviceManagementGetBestUpdatesForDeviceClassSubgroupdefaultResponse
  | DeviceManagementListDeploymentsForDeviceClassSubgroupdefaultResponse
  | DeviceManagementGetDeploymentForDeviceClassSubgroupdefaultResponse
  | DeviceManagementDeleteDeploymentForDeviceClassSubgroupdefaultResponse
  | DeviceManagementStopDeploymentdefaultResponse
  | DeviceManagementRetryDeploymentdefaultResponse
  | DeviceManagementGetDeviceClassSubgroupDeploymentStatusdefaultResponse
  | DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentdefaultResponse
  | DeviceManagementGetOperationStatusdefaultResponse
  | DeviceManagementListOperationStatusesdefaultResponse
  | DeviceManagementStartLogCollectiondefaultResponse
  | DeviceManagementGetLogCollectiondefaultResponse
  | DeviceManagementListLogCollectionsdefaultResponse
  | DeviceManagementGetLogCollectionDetailedStatusdefaultResponse
  | DeviceManagementListHealthOfDevicesdefaultResponse {
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
