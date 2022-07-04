// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DeviceUpdateImportUpdateParameters,
  DeviceUpdateListUpdatesParameters,
  DeviceUpdateGetUpdateParameters,
  DeviceUpdateDeleteUpdateParameters,
  DeviceUpdateListProvidersParameters,
  DeviceUpdateListNamesParameters,
  DeviceUpdateListVersionsParameters,
  DeviceUpdateListFilesParameters,
  DeviceUpdateGetFileParameters,
  DeviceUpdateListOperationsParameters,
  DeviceUpdateGetOperationParameters,
  DeviceManagementListDeviceClassesParameters,
  DeviceManagementGetDeviceClassParameters,
  DeviceManagementListInstallableUpdatesForDeviceClassParameters,
  DeviceManagementListDevicesParameters,
  DeviceManagementImportDevicesParameters,
  DeviceManagementGetDeviceParameters,
  DeviceManagementGetDeviceModuleParameters,
  DeviceManagementGetUpdateComplianceParameters,
  DeviceManagementListDeviceTagsParameters,
  DeviceManagementGetDeviceTagParameters,
  DeviceManagementListGroupsParameters,
  DeviceManagementGetGroupParameters,
  DeviceManagementCreateOrUpdateGroupParameters,
  DeviceManagementDeleteGroupParameters,
  DeviceManagementGetGroupUpdateComplianceParameters,
  DeviceManagementListBestUpdatesForGroupParameters,
  DeviceManagementListDeploymentsForGroupParameters,
  DeviceManagementGetDeploymentParameters,
  DeviceManagementCreateOrUpdateDeploymentParameters,
  DeviceManagementDeleteDeploymentParameters,
  DeviceManagementGetDeploymentStatusParameters,
  DeviceManagementListDeploymentDevicesParameters,
  DeviceManagementGetOperationParameters,
  DeviceManagementListOperationsParameters,
  DeviceManagementCollectLogsParameters,
  DeviceManagementGetLogCollectionOperationParameters,
  DeviceManagementListLogCollectionOperationsParameters,
  DeviceManagementGetLogCollectionOperationDetailedStatusParameters,
  DeviceManagementStopDeploymentParameters,
  DeviceManagementRetryDeploymentParameters,
} from "./parameters";
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
  DeviceManagementStopDeployment200Response,
  DeviceManagementStopDeploymentdefaultResponse,
  DeviceManagementRetryDeployment200Response,
  DeviceManagementRetryDeploymentdefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface DeviceUpdateImportUpdate {
  /** Import new update version. */
  post(
    options: DeviceUpdateImportUpdateParameters
  ): StreamableMethod<
    DeviceUpdateImportUpdate202Response | DeviceUpdateImportUpdatedefaultResponse
  >;
  /** Get a list of all updates that have been imported to Device Update for IoT Hub. */
  get(
    options?: DeviceUpdateListUpdatesParameters
  ): StreamableMethod<DeviceUpdateListUpdates200Response | DeviceUpdateListUpdatesdefaultResponse>;
}

export interface DeviceUpdateGetUpdate {
  /** Get a specific update version. */
  get(
    options?: DeviceUpdateGetUpdateParameters
  ): StreamableMethod<
    | DeviceUpdateGetUpdate200Response
    | DeviceUpdateGetUpdate304Response
    | DeviceUpdateGetUpdatedefaultResponse
  >;
  /** Delete a specific update version. */
  delete(
    options?: DeviceUpdateDeleteUpdateParameters
  ): StreamableMethod<
    DeviceUpdateDeleteUpdate202Response | DeviceUpdateDeleteUpdatedefaultResponse
  >;
}

export interface DeviceUpdateListProviders {
  /** Get a list of all update providers that have been imported to Device Update for IoT Hub. */
  get(
    options?: DeviceUpdateListProvidersParameters
  ): StreamableMethod<
    DeviceUpdateListProviders200Response | DeviceUpdateListProvidersdefaultResponse
  >;
}

export interface DeviceUpdateListNames {
  /** Get a list of all update names that match the specified provider. */
  get(
    options?: DeviceUpdateListNamesParameters
  ): StreamableMethod<DeviceUpdateListNames200Response | DeviceUpdateListNamesdefaultResponse>;
}

export interface DeviceUpdateListVersions {
  /** Get a list of all update versions that match the specified provider and name. */
  get(
    options?: DeviceUpdateListVersionsParameters
  ): StreamableMethod<
    DeviceUpdateListVersions200Response | DeviceUpdateListVersionsdefaultResponse
  >;
}

export interface DeviceUpdateListFiles {
  /** Get a list of all update file identifiers for the specified version. */
  get(
    options?: DeviceUpdateListFilesParameters
  ): StreamableMethod<DeviceUpdateListFiles200Response | DeviceUpdateListFilesdefaultResponse>;
}

export interface DeviceUpdateGetFile {
  /** Get a specific update file from the version. */
  get(
    options?: DeviceUpdateGetFileParameters
  ): StreamableMethod<
    | DeviceUpdateGetFile200Response
    | DeviceUpdateGetFile304Response
    | DeviceUpdateGetFiledefaultResponse
  >;
}

export interface DeviceUpdateListOperations {
  /** Get a list of all import update operations. Completed operations are kept for 7 days before auto-deleted. Delete operations are not returned by this API version. */
  get(
    options?: DeviceUpdateListOperationsParameters
  ): StreamableMethod<
    DeviceUpdateListOperations200Response | DeviceUpdateListOperationsdefaultResponse
  >;
}

export interface DeviceUpdateGetOperation {
  /** Retrieve operation status. */
  get(
    options?: DeviceUpdateGetOperationParameters
  ): StreamableMethod<
    | DeviceUpdateGetOperation200Response
    | DeviceUpdateGetOperation304Response
    | DeviceUpdateGetOperationdefaultResponse
  >;
}

export interface DeviceManagementListDeviceClasses {
  /** Gets a list of all device classes (unique combinations of device manufacturer and model) for all devices connected to Device Update for IoT Hub. */
  get(
    options?: DeviceManagementListDeviceClassesParameters
  ): StreamableMethod<
    DeviceManagementListDeviceClasses200Response | DeviceManagementListDeviceClassesdefaultResponse
  >;
}

export interface DeviceManagementGetDeviceClass {
  /** Gets the properties of a device class. */
  get(
    options?: DeviceManagementGetDeviceClassParameters
  ): StreamableMethod<
    DeviceManagementGetDeviceClass200Response | DeviceManagementGetDeviceClassdefaultResponse
  >;
}

export interface DeviceManagementListInstallableUpdatesForDeviceClass {
  /** Gets a list of installable updates for a device class. */
  get(
    options?: DeviceManagementListInstallableUpdatesForDeviceClassParameters
  ): StreamableMethod<
    | DeviceManagementListInstallableUpdatesForDeviceClass200Response
    | DeviceManagementListInstallableUpdatesForDeviceClassdefaultResponse
  >;
}

export interface DeviceManagementListDevices {
  /** Gets a list of devices connected to Device Update for IoT Hub. */
  get(
    options?: DeviceManagementListDevicesParameters
  ): StreamableMethod<
    DeviceManagementListDevices200Response | DeviceManagementListDevicesdefaultResponse
  >;
  /** Import existing devices from IoT Hub. */
  post(
    options: DeviceManagementImportDevicesParameters
  ): StreamableMethod<
    DeviceManagementImportDevices202Response | DeviceManagementImportDevicesdefaultResponse
  >;
}

export interface DeviceManagementGetDevice {
  /** Gets the device properties and latest deployment status for a device connected to Device Update for IoT Hub. */
  get(
    options?: DeviceManagementGetDeviceParameters
  ): StreamableMethod<
    DeviceManagementGetDevice200Response | DeviceManagementGetDevicedefaultResponse
  >;
}

export interface DeviceManagementGetDeviceModule {
  /** Gets the device module properties and latest deployment status for a device module connected to Device Update for IoT Hub. */
  get(
    options?: DeviceManagementGetDeviceModuleParameters
  ): StreamableMethod<
    DeviceManagementGetDeviceModule200Response | DeviceManagementGetDeviceModuledefaultResponse
  >;
}

export interface DeviceManagementGetUpdateCompliance {
  /** Gets the breakdown of how many devices are on their latest update, have new updates available, or are in progress receiving new updates. */
  get(
    options?: DeviceManagementGetUpdateComplianceParameters
  ): StreamableMethod<
    | DeviceManagementGetUpdateCompliance200Response
    | DeviceManagementGetUpdateCompliancedefaultResponse
  >;
}

export interface DeviceManagementListDeviceTags {
  /** Gets a list of available group device tags for all devices connected to Device Update for IoT Hub. */
  get(
    options?: DeviceManagementListDeviceTagsParameters
  ): StreamableMethod<
    DeviceManagementListDeviceTags200Response | DeviceManagementListDeviceTagsdefaultResponse
  >;
}

export interface DeviceManagementGetDeviceTag {
  /** Gets a count of how many devices have a device tag. */
  get(
    options?: DeviceManagementGetDeviceTagParameters
  ): StreamableMethod<
    DeviceManagementGetDeviceTag200Response | DeviceManagementGetDeviceTagdefaultResponse
  >;
}

export interface DeviceManagementListGroups {
  /** Gets a list of all device groups. */
  get(
    options?: DeviceManagementListGroupsParameters
  ): StreamableMethod<
    DeviceManagementListGroups200Response | DeviceManagementListGroupsdefaultResponse
  >;
}

export interface DeviceManagementGetGroup {
  /** Gets the properties of a group. */
  get(
    options?: DeviceManagementGetGroupParameters
  ): StreamableMethod<
    DeviceManagementGetGroup200Response | DeviceManagementGetGroupdefaultResponse
  >;
  /** Create or update a device group. */
  put(
    options: DeviceManagementCreateOrUpdateGroupParameters
  ): StreamableMethod<
    | DeviceManagementCreateOrUpdateGroup200Response
    | DeviceManagementCreateOrUpdateGroupdefaultResponse
  >;
  /** Deletes a device group. */
  delete(
    options?: DeviceManagementDeleteGroupParameters
  ): StreamableMethod<
    DeviceManagementDeleteGroup204Response | DeviceManagementDeleteGroupdefaultResponse
  >;
}

export interface DeviceManagementGetGroupUpdateCompliance {
  /** Get group update compliance information such as how many devices are on their latest update, how many need new updates, and how many are in progress on receiving a new update. */
  get(
    options?: DeviceManagementGetGroupUpdateComplianceParameters
  ): StreamableMethod<
    | DeviceManagementGetGroupUpdateCompliance200Response
    | DeviceManagementGetGroupUpdateCompliancedefaultResponse
  >;
}

export interface DeviceManagementListBestUpdatesForGroup {
  /** Get the best available updates for a group and a count of how many devices need each update. */
  get(
    options?: DeviceManagementListBestUpdatesForGroupParameters
  ): StreamableMethod<
    | DeviceManagementListBestUpdatesForGroup200Response
    | DeviceManagementListBestUpdatesForGroupdefaultResponse
  >;
}

export interface DeviceManagementListDeploymentsForGroup {
  /** Gets a list of deployments for a group. */
  get(
    options?: DeviceManagementListDeploymentsForGroupParameters
  ): StreamableMethod<
    | DeviceManagementListDeploymentsForGroup200Response
    | DeviceManagementListDeploymentsForGroupdefaultResponse
  >;
}

export interface DeviceManagementGetDeployment {
  /** Gets the properties of a deployment. */
  get(
    options?: DeviceManagementGetDeploymentParameters
  ): StreamableMethod<
    DeviceManagementGetDeployment200Response | DeviceManagementGetDeploymentdefaultResponse
  >;
  /** Creates or updates a deployment. */
  put(
    options: DeviceManagementCreateOrUpdateDeploymentParameters
  ): StreamableMethod<
    | DeviceManagementCreateOrUpdateDeployment200Response
    | DeviceManagementCreateOrUpdateDeploymentdefaultResponse
  >;
  /** Deletes a deployment. */
  delete(
    options?: DeviceManagementDeleteDeploymentParameters
  ): StreamableMethod<
    DeviceManagementDeleteDeployment204Response | DeviceManagementDeleteDeploymentdefaultResponse
  >;
  /** Stops a deployment. */
  post(
    options: DeviceManagementStopDeploymentParameters | DeviceManagementRetryDeploymentParameters
  ):
    | StreamableMethod<
        DeviceManagementStopDeployment200Response | DeviceManagementStopDeploymentdefaultResponse
      >
    | StreamableMethod<
        DeviceManagementRetryDeployment200Response | DeviceManagementRetryDeploymentdefaultResponse
      >;
}

export interface DeviceManagementGetDeploymentStatus {
  /** Gets the status of a deployment including a breakdown of how many devices in the deployment are in progress, completed, or failed. */
  get(
    options?: DeviceManagementGetDeploymentStatusParameters
  ): StreamableMethod<
    | DeviceManagementGetDeploymentStatus200Response
    | DeviceManagementGetDeploymentStatusdefaultResponse
  >;
}

export interface DeviceManagementListDeploymentDevices {
  /** Gets a list of devices in a deployment along with their state. Useful for getting a list of failed devices. */
  get(
    options?: DeviceManagementListDeploymentDevicesParameters
  ): StreamableMethod<
    | DeviceManagementListDeploymentDevices200Response
    | DeviceManagementListDeploymentDevicesdefaultResponse
  >;
}

export interface DeviceManagementGetOperation {
  /** Retrieve operation status. */
  get(
    options?: DeviceManagementGetOperationParameters
  ): StreamableMethod<
    | DeviceManagementGetOperation200Response
    | DeviceManagementGetOperation304Response
    | DeviceManagementGetOperationdefaultResponse
  >;
}

export interface DeviceManagementListOperations {
  /** Get a list of all device import operations. Completed operations are kept for 7 days before auto-deleted. */
  get(
    options?: DeviceManagementListOperationsParameters
  ): StreamableMethod<
    DeviceManagementListOperations200Response | DeviceManagementListOperationsdefaultResponse
  >;
}

export interface DeviceManagementCollectLogs {
  /** Start the device diagnostics log collection operation on specified devices. */
  put(
    options: DeviceManagementCollectLogsParameters
  ): StreamableMethod<
    DeviceManagementCollectLogs201Response | DeviceManagementCollectLogsdefaultResponse
  >;
  /** Get the device diagnostics log collection operation */
  get(
    options?: DeviceManagementGetLogCollectionOperationParameters
  ): StreamableMethod<
    | DeviceManagementGetLogCollectionOperation200Response
    | DeviceManagementGetLogCollectionOperationdefaultResponse
  >;
}

export interface DeviceManagementListLogCollectionOperations {
  /** Get all device diagnostics log collection operations */
  get(
    options?: DeviceManagementListLogCollectionOperationsParameters
  ): StreamableMethod<
    | DeviceManagementListLogCollectionOperations200Response
    | DeviceManagementListLogCollectionOperationsdefaultResponse
  >;
}

export interface DeviceManagementGetLogCollectionOperationDetailedStatus {
  /** Get device diagnostics log collection operation with detailed status */
  get(
    options?: DeviceManagementGetLogCollectionOperationDetailedStatusParameters
  ): StreamableMethod<
    | DeviceManagementGetLogCollectionOperationDetailedStatus200Response
    | DeviceManagementGetLogCollectionOperationDetailedStatusdefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/deviceupdate/\{instanceId\}/updates' has methods for the following verbs: post, get */
  (path: "/deviceupdate/{instanceId}/updates", instanceId: string): DeviceUpdateImportUpdate;
  /** Resource for '/deviceupdate/\{instanceId\}/updates/providers/\{provider\}/names/\{name\}/versions/\{version\}' has methods for the following verbs: get, delete */
  (
    path: "/deviceupdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}",
    instanceId: string,
    provider: string,
    name: string,
    version: string
  ): DeviceUpdateGetUpdate;
  /** Resource for '/deviceupdate/\{instanceId\}/updates/providers' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/updates/providers",
    instanceId: string
  ): DeviceUpdateListProviders;
  /** Resource for '/deviceupdate/\{instanceId\}/updates/providers/\{provider\}/names' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/updates/providers/{provider}/names",
    instanceId: string,
    provider: string
  ): DeviceUpdateListNames;
  /** Resource for '/deviceupdate/\{instanceId\}/updates/providers/\{provider\}/names/\{name\}/versions' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/updates/providers/{provider}/names/{name}/versions",
    instanceId: string,
    provider: string,
    name: string
  ): DeviceUpdateListVersions;
  /** Resource for '/deviceupdate/\{instanceId\}/updates/providers/\{provider\}/names/\{name\}/versions/\{version\}/files' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files",
    instanceId: string,
    provider: string,
    name: string,
    version: string
  ): DeviceUpdateListFiles;
  /** Resource for '/deviceupdate/\{instanceId\}/updates/providers/\{provider\}/names/\{name\}/versions/\{version\}/files/\{fileId\}' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files/{fileId}",
    instanceId: string,
    provider: string,
    name: string,
    version: string,
    fileId: string
  ): DeviceUpdateGetFile;
  /** Resource for '/deviceupdate/\{instanceId\}/updates/operations' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/updates/operations",
    instanceId: string
  ): DeviceUpdateListOperations;
  /** Resource for '/deviceupdate/\{instanceId\}/updates/operations/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/updates/operations/{operationId}",
    instanceId: string,
    operationId: string
  ): DeviceUpdateGetOperation;
  /** Resource for '/deviceupdate/\{instanceId\}/management/deviceclasses' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/deviceclasses",
    instanceId: string
  ): DeviceManagementListDeviceClasses;
  /** Resource for '/deviceupdate/\{instanceId\}/management/deviceclasses/\{deviceClassId\}' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/deviceclasses/{deviceClassId}",
    instanceId: string,
    deviceClassId: string
  ): DeviceManagementGetDeviceClass;
  /** Resource for '/deviceupdate/\{instanceId\}/management/deviceclasses/\{deviceClassId\}/installableupdates' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/deviceclasses/{deviceClassId}/installableupdates",
    instanceId: string,
    deviceClassId: string
  ): DeviceManagementListInstallableUpdatesForDeviceClass;
  /** Resource for '/deviceupdate/\{instanceId\}/management/devices' has methods for the following verbs: get, post */
  (
    path: "/deviceupdate/{instanceId}/management/devices",
    instanceId: string
  ): DeviceManagementListDevices;
  /** Resource for '/deviceupdate/\{instanceId\}/management/devices/\{deviceId\}' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/devices/{deviceId}",
    instanceId: string,
    deviceId: string
  ): DeviceManagementGetDevice;
  /** Resource for '/deviceupdate/\{instanceId\}/management/devices/\{deviceId\}/modules/\{moduleId\}' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/devices/{deviceId}/modules/{moduleId}",
    instanceId: string,
    deviceId: string,
    moduleId: string
  ): DeviceManagementGetDeviceModule;
  /** Resource for '/deviceupdate/\{instanceId\}/management/updatecompliance' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/updatecompliance",
    instanceId: string
  ): DeviceManagementGetUpdateCompliance;
  /** Resource for '/deviceupdate/\{instanceId\}/management/devicetags' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/devicetags",
    instanceId: string
  ): DeviceManagementListDeviceTags;
  /** Resource for '/deviceupdate/\{instanceId\}/management/devicetags/\{tagName\}' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/devicetags/{tagName}",
    instanceId: string,
    tagName: string
  ): DeviceManagementGetDeviceTag;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/groups",
    instanceId: string
  ): DeviceManagementListGroups;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}' has methods for the following verbs: get, put, delete */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}",
    instanceId: string,
    groupId: string
  ): DeviceManagementGetGroup;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}/updateCompliance' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}/updateCompliance",
    instanceId: string,
    groupId: string
  ): DeviceManagementGetGroupUpdateCompliance;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}/bestUpdates' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}/bestUpdates",
    instanceId: string,
    groupId: string
  ): DeviceManagementListBestUpdatesForGroup;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}/deployments' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}/deployments",
    instanceId: string,
    groupId: string
  ): DeviceManagementListDeploymentsForGroup;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}/deployments/\{deploymentId\}' has methods for the following verbs: get, put, delete, post */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}",
    instanceId: string,
    groupId: string,
    deploymentId: string
  ): DeviceManagementGetDeployment;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}/deployments/\{deploymentId\}/status' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}/status",
    instanceId: string,
    groupId: string,
    deploymentId: string
  ): DeviceManagementGetDeploymentStatus;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}/deployments/\{deploymentId\}/devicestates' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}/devicestates",
    instanceId: string,
    groupId: string,
    deploymentId: string
  ): DeviceManagementListDeploymentDevices;
  /** Resource for '/deviceupdate/\{instanceId\}/management/operations/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/operations/{operationId}",
    instanceId: string,
    operationId: string
  ): DeviceManagementGetOperation;
  /** Resource for '/deviceupdate/\{instanceId\}/management/operations' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/operations",
    instanceId: string
  ): DeviceManagementListOperations;
  /** Resource for '/deviceupdate/\{instanceId\}/management/deviceDiagnostics/logCollections/\{operationId\}' has methods for the following verbs: put, get */
  (
    path: "/deviceupdate/{instanceId}/management/deviceDiagnostics/logCollections/{operationId}",
    instanceId: string,
    operationId: string
  ): DeviceManagementCollectLogs;
  /** Resource for '/deviceupdate/\{instanceId\}/management/deviceDiagnostics/logCollections' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/deviceDiagnostics/logCollections",
    instanceId: string
  ): DeviceManagementListLogCollectionOperations;
  /** Resource for '/deviceupdate/\{instanceId\}/management/deviceDiagnostics/logCollections/\{operationId\}/detailedStatus' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/deviceDiagnostics/logCollections/{operationId}/detailedStatus",
    instanceId: string,
    operationId: string
  ): DeviceManagementGetLogCollectionOperationDetailedStatus;
}

export type DeviceUpdateClient = Client & {
  path: Routes;
};
