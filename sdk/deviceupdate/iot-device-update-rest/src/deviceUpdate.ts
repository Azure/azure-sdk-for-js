// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DeviceManagementCollectLogsParameters,
  DeviceManagementCreateOrUpdateDeploymentParameters,
  DeviceManagementCreateOrUpdateGroupParameters,
  DeviceManagementDeleteDeploymentParameters,
  DeviceManagementDeleteGroupParameters,
  DeviceManagementGetDeploymentParameters,
  DeviceManagementGetDeploymentStatusParameters,
  DeviceManagementGetDeviceClassParameters,
  DeviceManagementGetDeviceModuleParameters,
  DeviceManagementGetDeviceParameters,
  DeviceManagementGetDeviceTagParameters,
  DeviceManagementGetGroupParameters,
  DeviceManagementGetGroupUpdateComplianceParameters,
  DeviceManagementGetLogCollectionOperationDetailedStatusParameters,
  DeviceManagementGetLogCollectionOperationParameters,
  DeviceManagementGetOperationParameters,
  DeviceManagementGetUpdateComplianceParameters,
  DeviceManagementImportDevicesParameters,
  DeviceManagementListBestUpdatesForGroupParameters,
  DeviceManagementListDeploymentDevicesParameters,
  DeviceManagementListDeploymentsForGroupParameters,
  DeviceManagementListDeviceClassesParameters,
  DeviceManagementListDeviceTagsParameters,
  DeviceManagementListDevicesParameters,
  DeviceManagementListGroupsParameters,
  DeviceManagementListInstallableUpdatesForDeviceClassParameters,
  DeviceManagementListLogCollectionOperationsParameters,
  DeviceManagementListOperationsParameters,
  DeviceManagementRetryDeploymentParameters,
  DeviceManagementStopDeploymentParameters,
  DeviceUpdateDeleteUpdateParameters,
  DeviceUpdateGetFileParameters,
  DeviceUpdateGetOperationParameters,
  DeviceUpdateGetUpdateParameters,
  DeviceUpdateImportUpdateParameters,
  DeviceUpdateListFilesParameters,
  DeviceUpdateListNamesParameters,
  DeviceUpdateListOperationsParameters,
  DeviceUpdateListProvidersParameters,
  DeviceUpdateListUpdatesParameters,
  DeviceUpdateListVersionsParameters,
} from "./parameters";
import {
  DeviceManagementCollectLogs201Response,
  DeviceManagementCollectLogsdefaultResponse,
  DeviceManagementCreateOrUpdateDeployment200Response,
  DeviceManagementCreateOrUpdateDeploymentdefaultResponse,
  DeviceManagementCreateOrUpdateGroup200Response,
  DeviceManagementCreateOrUpdateGroupdefaultResponse,
  DeviceManagementDeleteDeployment204Response,
  DeviceManagementDeleteDeploymentdefaultResponse,
  DeviceManagementDeleteGroup204Response,
  DeviceManagementDeleteGroupdefaultResponse,
  DeviceManagementGetDeployment200Response,
  DeviceManagementGetDeploymentStatus200Response,
  DeviceManagementGetDeploymentStatusdefaultResponse,
  DeviceManagementGetDeploymentdefaultResponse,
  DeviceManagementGetDevice200Response,
  DeviceManagementGetDeviceClass200Response,
  DeviceManagementGetDeviceClassdefaultResponse,
  DeviceManagementGetDeviceModule200Response,
  DeviceManagementGetDeviceModuledefaultResponse,
  DeviceManagementGetDeviceTag200Response,
  DeviceManagementGetDeviceTagdefaultResponse,
  DeviceManagementGetDevicedefaultResponse,
  DeviceManagementGetGroup200Response,
  DeviceManagementGetGroupUpdateCompliance200Response,
  DeviceManagementGetGroupUpdateCompliancedefaultResponse,
  DeviceManagementGetGroupdefaultResponse,
  DeviceManagementGetLogCollectionOperation200Response,
  DeviceManagementGetLogCollectionOperationDetailedStatus200Response,
  DeviceManagementGetLogCollectionOperationDetailedStatusdefaultResponse,
  DeviceManagementGetLogCollectionOperationdefaultResponse,
  DeviceManagementGetOperation200Response,
  DeviceManagementGetOperation304Response,
  DeviceManagementGetOperationdefaultResponse,
  DeviceManagementGetUpdateCompliance200Response,
  DeviceManagementGetUpdateCompliancedefaultResponse,
  DeviceManagementImportDevices202Response,
  DeviceManagementImportDevicesdefaultResponse,
  DeviceManagementListBestUpdatesForGroup200Response,
  DeviceManagementListBestUpdatesForGroupdefaultResponse,
  DeviceManagementListDeploymentDevices200Response,
  DeviceManagementListDeploymentDevicesdefaultResponse,
  DeviceManagementListDeploymentsForGroup200Response,
  DeviceManagementListDeploymentsForGroupdefaultResponse,
  DeviceManagementListDeviceClasses200Response,
  DeviceManagementListDeviceClassesdefaultResponse,
  DeviceManagementListDeviceTags200Response,
  DeviceManagementListDeviceTagsdefaultResponse,
  DeviceManagementListDevices200Response,
  DeviceManagementListDevicesdefaultResponse,
  DeviceManagementListGroups200Response,
  DeviceManagementListGroupsdefaultResponse,
  DeviceManagementListInstallableUpdatesForDeviceClass200Response,
  DeviceManagementListInstallableUpdatesForDeviceClassdefaultResponse,
  DeviceManagementListLogCollectionOperations200Response,
  DeviceManagementListLogCollectionOperationsdefaultResponse,
  DeviceManagementListOperations200Response,
  DeviceManagementListOperationsdefaultResponse,
  DeviceManagementRetryDeployment200Response,
  DeviceManagementRetryDeploymentdefaultResponse,
  DeviceManagementStopDeployment200Response,
  DeviceManagementStopDeploymentdefaultResponse,
  DeviceUpdateDeleteUpdate202Response,
  DeviceUpdateDeleteUpdatedefaultResponse,
  DeviceUpdateGetFile200Response,
  DeviceUpdateGetFile304Response,
  DeviceUpdateGetFiledefaultResponse,
  DeviceUpdateGetOperation200Response,
  DeviceUpdateGetOperation304Response,
  DeviceUpdateGetOperationdefaultResponse,
  DeviceUpdateGetUpdate200Response,
  DeviceUpdateGetUpdate304Response,
  DeviceUpdateGetUpdatedefaultResponse,
  DeviceUpdateImportUpdate202Response,
  DeviceUpdateImportUpdatedefaultResponse,
  DeviceUpdateListFiles200Response,
  DeviceUpdateListFilesdefaultResponse,
  DeviceUpdateListNames200Response,
  DeviceUpdateListNamesdefaultResponse,
  DeviceUpdateListOperations200Response,
  DeviceUpdateListOperationsdefaultResponse,
  DeviceUpdateListProviders200Response,
  DeviceUpdateListProvidersdefaultResponse,
  DeviceUpdateListUpdates200Response,
  DeviceUpdateListUpdatesdefaultResponse,
  DeviceUpdateListVersions200Response,
  DeviceUpdateListVersionsdefaultResponse,
} from "./responses";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface DeviceUpdateImportUpdate {
  /** Import new update version. */
  post(
    options: DeviceUpdateImportUpdateParameters
  ): Promise<DeviceUpdateImportUpdate202Response | DeviceUpdateImportUpdatedefaultResponse>;
  /** Get a list of all updates that have been imported to Device Update for IoT Hub. */
  get(
    options?: DeviceUpdateListUpdatesParameters
  ): Promise<DeviceUpdateListUpdates200Response | DeviceUpdateListUpdatesdefaultResponse>;
}

export interface DeviceUpdateGetUpdate {
  /** Get a specific update version. */
  get(
    options?: DeviceUpdateGetUpdateParameters
  ): Promise<
    | DeviceUpdateGetUpdate200Response
    | DeviceUpdateGetUpdate304Response
    | DeviceUpdateGetUpdatedefaultResponse
  >;
  /** Delete a specific update version. */
  delete(
    options?: DeviceUpdateDeleteUpdateParameters
  ): Promise<DeviceUpdateDeleteUpdate202Response | DeviceUpdateDeleteUpdatedefaultResponse>;
}

export interface DeviceUpdateListProviders {
  /** Get a list of all update providers that have been imported to Device Update for IoT Hub. */
  get(
    options?: DeviceUpdateListProvidersParameters
  ): Promise<DeviceUpdateListProviders200Response | DeviceUpdateListProvidersdefaultResponse>;
}

export interface DeviceUpdateListNames {
  /** Get a list of all update names that match the specified provider. */
  get(
    options?: DeviceUpdateListNamesParameters
  ): Promise<DeviceUpdateListNames200Response | DeviceUpdateListNamesdefaultResponse>;
}

export interface DeviceUpdateListVersions {
  /** Get a list of all update versions that match the specified provider and name. */
  get(
    options?: DeviceUpdateListVersionsParameters
  ): Promise<DeviceUpdateListVersions200Response | DeviceUpdateListVersionsdefaultResponse>;
}

export interface DeviceUpdateListFiles {
  /** Get a list of all update file identifiers for the specified version. */
  get(
    options?: DeviceUpdateListFilesParameters
  ): Promise<DeviceUpdateListFiles200Response | DeviceUpdateListFilesdefaultResponse>;
}

export interface DeviceUpdateGetFile {
  /** Get a specific update file from the version. */
  get(
    options?: DeviceUpdateGetFileParameters
  ): Promise<
    | DeviceUpdateGetFile200Response
    | DeviceUpdateGetFile304Response
    | DeviceUpdateGetFiledefaultResponse
  >;
}

export interface DeviceUpdateListOperations {
  /** Get a list of all import update operations. Completed operations are kept for 7 days before auto-deleted. Delete operations are not returned by this API version. */
  get(
    options?: DeviceUpdateListOperationsParameters
  ): Promise<DeviceUpdateListOperations200Response | DeviceUpdateListOperationsdefaultResponse>;
}

export interface DeviceUpdateGetOperation {
  /** Retrieve operation status. */
  get(
    options?: DeviceUpdateGetOperationParameters
  ): Promise<
    | DeviceUpdateGetOperation200Response
    | DeviceUpdateGetOperation304Response
    | DeviceUpdateGetOperationdefaultResponse
  >;
}

export interface DeviceManagementListDeviceClasses {
  /** Gets a list of all device classes (unique combinations of device manufacturer and model) for all devices connected to Device Update for IoT Hub. */
  get(
    options?: DeviceManagementListDeviceClassesParameters
  ): Promise<
    DeviceManagementListDeviceClasses200Response | DeviceManagementListDeviceClassesdefaultResponse
  >;
}

export interface DeviceManagementGetDeviceClass {
  /** Gets the properties of a device class. */
  get(
    options?: DeviceManagementGetDeviceClassParameters
  ): Promise<
    DeviceManagementGetDeviceClass200Response | DeviceManagementGetDeviceClassdefaultResponse
  >;
}

export interface DeviceManagementListInstallableUpdatesForDeviceClass {
  /** Gets a list of installable updates for a device class. */
  get(
    options?: DeviceManagementListInstallableUpdatesForDeviceClassParameters
  ): Promise<
    | DeviceManagementListInstallableUpdatesForDeviceClass200Response
    | DeviceManagementListInstallableUpdatesForDeviceClassdefaultResponse
  >;
}

export interface DeviceManagementListDevices {
  /** Gets a list of devices connected to Device Update for IoT Hub. */
  get(
    options?: DeviceManagementListDevicesParameters
  ): Promise<DeviceManagementListDevices200Response | DeviceManagementListDevicesdefaultResponse>;
  /** Import existing devices from IoT Hub. */
  post(
    options: DeviceManagementImportDevicesParameters
  ): Promise<
    DeviceManagementImportDevices202Response | DeviceManagementImportDevicesdefaultResponse
  >;
}

export interface DeviceManagementGetDevice {
  /** Gets the device properties and latest deployment status for a device connected to Device Update for IoT Hub. */
  get(
    options?: DeviceManagementGetDeviceParameters
  ): Promise<DeviceManagementGetDevice200Response | DeviceManagementGetDevicedefaultResponse>;
}

export interface DeviceManagementGetDeviceModule {
  /** Gets the device module properties and latest deployment status for a device module connected to Device Update for IoT Hub. */
  get(
    options?: DeviceManagementGetDeviceModuleParameters
  ): Promise<
    DeviceManagementGetDeviceModule200Response | DeviceManagementGetDeviceModuledefaultResponse
  >;
}

export interface DeviceManagementGetUpdateCompliance {
  /** Gets the breakdown of how many devices are on their latest update, have new updates available, or are in progress receiving new updates. */
  get(
    options?: DeviceManagementGetUpdateComplianceParameters
  ): Promise<
    | DeviceManagementGetUpdateCompliance200Response
    | DeviceManagementGetUpdateCompliancedefaultResponse
  >;
}

export interface DeviceManagementListDeviceTags {
  /** Gets a list of available group device tags for all devices connected to Device Update for IoT Hub. */
  get(
    options?: DeviceManagementListDeviceTagsParameters
  ): Promise<
    DeviceManagementListDeviceTags200Response | DeviceManagementListDeviceTagsdefaultResponse
  >;
}

export interface DeviceManagementGetDeviceTag {
  /** Gets a count of how many devices have a device tag. */
  get(
    options?: DeviceManagementGetDeviceTagParameters
  ): Promise<DeviceManagementGetDeviceTag200Response | DeviceManagementGetDeviceTagdefaultResponse>;
}

export interface DeviceManagementListGroups {
  /** Gets a list of all device groups. */
  get(
    options?: DeviceManagementListGroupsParameters
  ): Promise<DeviceManagementListGroups200Response | DeviceManagementListGroupsdefaultResponse>;
}

export interface DeviceManagementGetGroup {
  /** Gets the properties of a group. */
  get(
    options?: DeviceManagementGetGroupParameters
  ): Promise<DeviceManagementGetGroup200Response | DeviceManagementGetGroupdefaultResponse>;
  /** Create or update a device group. */
  put(
    options: DeviceManagementCreateOrUpdateGroupParameters
  ): Promise<
    | DeviceManagementCreateOrUpdateGroup200Response
    | DeviceManagementCreateOrUpdateGroupdefaultResponse
  >;
  /** Deletes a device group. */
  delete(
    options?: DeviceManagementDeleteGroupParameters
  ): Promise<DeviceManagementDeleteGroup204Response | DeviceManagementDeleteGroupdefaultResponse>;
}

export interface DeviceManagementGetGroupUpdateCompliance {
  /** Get group update compliance information such as how many devices are on their latest update, how many need new updates, and how many are in progress on receiving a new update. */
  get(
    options?: DeviceManagementGetGroupUpdateComplianceParameters
  ): Promise<
    | DeviceManagementGetGroupUpdateCompliance200Response
    | DeviceManagementGetGroupUpdateCompliancedefaultResponse
  >;
}

export interface DeviceManagementListBestUpdatesForGroup {
  /** Get the best available updates for a group and a count of how many devices need each update. */
  get(
    options?: DeviceManagementListBestUpdatesForGroupParameters
  ): Promise<
    | DeviceManagementListBestUpdatesForGroup200Response
    | DeviceManagementListBestUpdatesForGroupdefaultResponse
  >;
}

export interface DeviceManagementListDeploymentsForGroup {
  /** Gets a list of deployments for a group. */
  get(
    options?: DeviceManagementListDeploymentsForGroupParameters
  ): Promise<
    | DeviceManagementListDeploymentsForGroup200Response
    | DeviceManagementListDeploymentsForGroupdefaultResponse
  >;
}

export interface DeviceManagementGetDeployment {
  /** Gets the properties of a deployment. */
  get(
    options?: DeviceManagementGetDeploymentParameters
  ): Promise<
    DeviceManagementGetDeployment200Response | DeviceManagementGetDeploymentdefaultResponse
  >;
  /** Creates or updates a deployment. */
  put(
    options: DeviceManagementCreateOrUpdateDeploymentParameters
  ): Promise<
    | DeviceManagementCreateOrUpdateDeployment200Response
    | DeviceManagementCreateOrUpdateDeploymentdefaultResponse
  >;
  /** Deletes a deployment. */
  delete(
    options?: DeviceManagementDeleteDeploymentParameters
  ): Promise<
    DeviceManagementDeleteDeployment204Response | DeviceManagementDeleteDeploymentdefaultResponse
  >;
  /** Stops a deployment. */
  post(
    options: DeviceManagementStopDeploymentParameters | DeviceManagementRetryDeploymentParameters
  ):
    | Promise<
        DeviceManagementStopDeployment200Response | DeviceManagementStopDeploymentdefaultResponse
      >
    | Promise<
        DeviceManagementRetryDeployment200Response | DeviceManagementRetryDeploymentdefaultResponse
      >;
}

export interface DeviceManagementGetDeploymentStatus {
  /** Gets the status of a deployment including a breakdown of how many devices in the deployment are in progress, completed, or failed. */
  get(
    options?: DeviceManagementGetDeploymentStatusParameters
  ): Promise<
    | DeviceManagementGetDeploymentStatus200Response
    | DeviceManagementGetDeploymentStatusdefaultResponse
  >;
}

export interface DeviceManagementListDeploymentDevices {
  /** Gets a list of devices in a deployment along with their state. Useful for getting a list of failed devices. */
  get(
    options?: DeviceManagementListDeploymentDevicesParameters
  ): Promise<
    | DeviceManagementListDeploymentDevices200Response
    | DeviceManagementListDeploymentDevicesdefaultResponse
  >;
}

export interface DeviceManagementGetOperation {
  /** Retrieve operation status. */
  get(
    options?: DeviceManagementGetOperationParameters
  ): Promise<
    | DeviceManagementGetOperation200Response
    | DeviceManagementGetOperation304Response
    | DeviceManagementGetOperationdefaultResponse
  >;
}

export interface DeviceManagementListOperations {
  /** Get a list of all device import operations. Completed operations are kept for 7 days before auto-deleted. */
  get(
    options?: DeviceManagementListOperationsParameters
  ): Promise<
    DeviceManagementListOperations200Response | DeviceManagementListOperationsdefaultResponse
  >;
}

export interface DeviceManagementCollectLogs {
  /** Start the device diagnostics log collection operation on specified devices. */
  put(
    options: DeviceManagementCollectLogsParameters
  ): Promise<DeviceManagementCollectLogs201Response | DeviceManagementCollectLogsdefaultResponse>;
  /** Get the device diagnostics log collection operation */
  get(
    options?: DeviceManagementGetLogCollectionOperationParameters
  ): Promise<
    | DeviceManagementGetLogCollectionOperation200Response
    | DeviceManagementGetLogCollectionOperationdefaultResponse
  >;
}

export interface DeviceManagementListLogCollectionOperations {
  /** Get all device diagnostics log collection operations */
  get(
    options?: DeviceManagementListLogCollectionOperationsParameters
  ): Promise<
    | DeviceManagementListLogCollectionOperations200Response
    | DeviceManagementListLogCollectionOperationsdefaultResponse
  >;
}

export interface DeviceManagementGetLogCollectionOperationDetailedStatus {
  /** Get device diagnostics log collection operation with detailed status */
  get(
    options?: DeviceManagementGetLogCollectionOperationDetailedStatusParameters
  ): Promise<
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

export type DeviceUpdateRestClient = Client & {
  path: Routes;
};

export default function DeviceUpdate(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): DeviceUpdateRestClient {
  const baseUrl = options.baseUrl ?? `https://${endpoint}`;
  options.apiVersion = options.apiVersion ?? "2021-06-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://api.adu.microsoft.com/.default"],
    },
  };

  return getClient(baseUrl, credentials, options) as DeviceUpdateRestClient;
}
