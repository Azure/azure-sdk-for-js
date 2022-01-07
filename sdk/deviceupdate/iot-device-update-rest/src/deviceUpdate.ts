// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ManagementCollectLogsParameters,
  ManagementCreateOrUpdateDeploymentParameters,
  ManagementCreateOrUpdateGroupParameters,
  ManagementDeleteDeploymentParameters,
  ManagementDeleteGroupParameters,
  ManagementGetDeploymentParameters,
  ManagementGetDeploymentStatusParameters,
  ManagementGetDeviceClassParameters,
  ManagementGetDeviceModuleParameters,
  ManagementGetDeviceParameters,
  ManagementGetDeviceTagParameters,
  ManagementGetGroupParameters,
  ManagementGetGroupUpdateComplianceParameters,
  ManagementGetLogCollectionOperationDetailedStatusParameters,
  ManagementGetLogCollectionOperationParameters,
  ManagementGetOperationParameters,
  ManagementGetUpdateComplianceParameters,
  ManagementImportDevicesParameters,
  ManagementListBestUpdatesForGroupParameters,
  ManagementListDeploymentDevicesParameters,
  ManagementListDeploymentsForGroupParameters,
  ManagementListDeviceClassesParameters,
  ManagementListDeviceTagsParameters,
  ManagementListDevicesParameters,
  ManagementListGroupsParameters,
  ManagementListInstallableUpdatesForDeviceClassParameters,
  ManagementListLogCollectionOperationsParameters,
  ManagementListOperationsParameters,
  ManagementRetryDeploymentParameters,
  ManagementStopDeploymentParameters,
  UpdatesDeleteUpdateParameters,
  UpdatesGetFileParameters,
  UpdatesGetOperationParameters,
  UpdatesGetUpdateParameters,
  UpdatesImportUpdateParameters,
  UpdatesListFilesParameters,
  UpdatesListNamesParameters,
  UpdatesListOperationsParameters,
  UpdatesListProvidersParameters,
  UpdatesListUpdatesParameters,
  UpdatesListVersionsParameters
} from "./parameters";
import {
  ManagementCollectLogs201Response,
  ManagementCollectLogsdefaultResponse,
  ManagementCreateOrUpdateDeployment200Response,
  ManagementCreateOrUpdateDeploymentdefaultResponse,
  ManagementCreateOrUpdateGroup200Response,
  ManagementCreateOrUpdateGroupdefaultResponse,
  ManagementDeleteDeployment204Response,
  ManagementDeleteDeploymentdefaultResponse,
  ManagementDeleteGroup204Response,
  ManagementDeleteGroupdefaultResponse,
  ManagementGetDeployment200Response,
  ManagementGetDeploymentStatus200Response,
  ManagementGetDeploymentStatusdefaultResponse,
  ManagementGetDeploymentdefaultResponse,
  ManagementGetDevice200Response,
  ManagementGetDeviceClass200Response,
  ManagementGetDeviceClassdefaultResponse,
  ManagementGetDeviceModule200Response,
  ManagementGetDeviceModuledefaultResponse,
  ManagementGetDeviceTag200Response,
  ManagementGetDeviceTagdefaultResponse,
  ManagementGetDevicedefaultResponse,
  ManagementGetGroup200Response,
  ManagementGetGroupUpdateCompliance200Response,
  ManagementGetGroupUpdateCompliancedefaultResponse,
  ManagementGetGroupdefaultResponse,
  ManagementGetLogCollectionOperation200Response,
  ManagementGetLogCollectionOperationDetailedStatus200Response,
  ManagementGetLogCollectionOperationDetailedStatusdefaultResponse,
  ManagementGetLogCollectionOperationdefaultResponse,
  ManagementGetOperation200Response,
  ManagementGetOperation304Response,
  ManagementGetOperationdefaultResponse,
  ManagementGetUpdateCompliance200Response,
  ManagementGetUpdateCompliancedefaultResponse,
  ManagementImportDevices202Response,
  ManagementImportDevicesdefaultResponse,
  ManagementListBestUpdatesForGroup200Response,
  ManagementListBestUpdatesForGroupdefaultResponse,
  ManagementListDeploymentDevices200Response,
  ManagementListDeploymentDevicesdefaultResponse,
  ManagementListDeploymentsForGroup200Response,
  ManagementListDeploymentsForGroupdefaultResponse,
  ManagementListDeviceClasses200Response,
  ManagementListDeviceClassesdefaultResponse,
  ManagementListDeviceTags200Response,
  ManagementListDeviceTagsdefaultResponse,
  ManagementListDevices200Response,
  ManagementListDevicesdefaultResponse,
  ManagementListGroups200Response,
  ManagementListGroupsdefaultResponse,
  ManagementListInstallableUpdatesForDeviceClass200Response,
  ManagementListInstallableUpdatesForDeviceClassdefaultResponse,
  ManagementListLogCollectionOperations200Response,
  ManagementListLogCollectionOperationsdefaultResponse,
  ManagementListOperations200Response,
  ManagementListOperationsdefaultResponse,
  ManagementRetryDeployment200Response,
  ManagementRetryDeploymentdefaultResponse,
  ManagementStopDeployment200Response,
  ManagementStopDeploymentdefaultResponse,
  UpdatesDeleteUpdate202Response,
  UpdatesDeleteUpdatedefaultResponse,
  UpdatesGetFile200Response,
  UpdatesGetFile304Response,
  UpdatesGetFiledefaultResponse,
  UpdatesGetOperation200Response,
  UpdatesGetOperation304Response,
  UpdatesGetOperationdefaultResponse,
  UpdatesGetUpdate200Response,
  UpdatesGetUpdate304Response,
  UpdatesGetUpdatedefaultResponse,
  UpdatesImportUpdate202Response,
  UpdatesImportUpdatedefaultResponse,
  UpdatesListFiles200Response,
  UpdatesListFilesdefaultResponse,
  UpdatesListNames200Response,
  UpdatesListNamesdefaultResponse,
  UpdatesListOperations200Response,
  UpdatesListOperationsdefaultResponse,
  UpdatesListProviders200Response,
  UpdatesListProvidersdefaultResponse,
  UpdatesListUpdates200Response,
  UpdatesListUpdatesdefaultResponse,
  UpdatesListVersions200Response,
  UpdatesListVersionsdefaultResponse
} from "./responses";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface UpdatesImportUpdate {
  /** Import new update version. */
  post(
    options: UpdatesImportUpdateParameters
  ): Promise<
    UpdatesImportUpdate202Response | UpdatesImportUpdatedefaultResponse
  >;
  /** Get a list of all updates that have been imported to Device Update for IoT Hub. */
  get(
    options?: UpdatesListUpdatesParameters
  ): Promise<UpdatesListUpdates200Response | UpdatesListUpdatesdefaultResponse>;
}

export interface UpdatesGetUpdate {
  /** Get a specific update version. */
  get(
    options?: UpdatesGetUpdateParameters
  ): Promise<
    | UpdatesGetUpdate200Response
    | UpdatesGetUpdate304Response
    | UpdatesGetUpdatedefaultResponse
  >;
  /** Delete a specific update version. */
  delete(
    options?: UpdatesDeleteUpdateParameters
  ): Promise<
    UpdatesDeleteUpdate202Response | UpdatesDeleteUpdatedefaultResponse
  >;
}

export interface UpdatesListProviders {
  /** Get a list of all update providers that have been imported to Device Update for IoT Hub. */
  get(
    options?: UpdatesListProvidersParameters
  ): Promise<
    UpdatesListProviders200Response | UpdatesListProvidersdefaultResponse
  >;
}

export interface UpdatesListNames {
  /** Get a list of all update names that match the specified provider. */
  get(
    options?: UpdatesListNamesParameters
  ): Promise<UpdatesListNames200Response | UpdatesListNamesdefaultResponse>;
}

export interface UpdatesListVersions {
  /** Get a list of all update versions that match the specified provider and name. */
  get(
    options?: UpdatesListVersionsParameters
  ): Promise<
    UpdatesListVersions200Response | UpdatesListVersionsdefaultResponse
  >;
}

export interface UpdatesListFiles {
  /** Get a list of all update file identifiers for the specified version. */
  get(
    options?: UpdatesListFilesParameters
  ): Promise<UpdatesListFiles200Response | UpdatesListFilesdefaultResponse>;
}

export interface UpdatesGetFile {
  /** Get a specific update file from the version. */
  get(
    options?: UpdatesGetFileParameters
  ): Promise<
    | UpdatesGetFile200Response
    | UpdatesGetFile304Response
    | UpdatesGetFiledefaultResponse
  >;
}

export interface UpdatesListOperations {
  /** Get a list of all import update operations. Completed operations are kept for 7 days before auto-deleted. Delete operations are not returned by this API version. */
  get(
    options?: UpdatesListOperationsParameters
  ): Promise<
    UpdatesListOperations200Response | UpdatesListOperationsdefaultResponse
  >;
}

export interface UpdatesGetOperation {
  /** Retrieve operation status. */
  get(
    options?: UpdatesGetOperationParameters
  ): Promise<
    | UpdatesGetOperation200Response
    | UpdatesGetOperation304Response
    | UpdatesGetOperationdefaultResponse
  >;
}

export interface ManagementListDeviceClasses {
  /** Gets a list of all device classes (unique combinations of device manufacturer and model) for all devices connected to Device Update for IoT Hub. */
  get(
    options?: ManagementListDeviceClassesParameters
  ): Promise<
    | ManagementListDeviceClasses200Response
    | ManagementListDeviceClassesdefaultResponse
  >;
}

export interface ManagementGetDeviceClass {
  /** Gets the properties of a device class. */
  get(
    options?: ManagementGetDeviceClassParameters
  ): Promise<
    | ManagementGetDeviceClass200Response
    | ManagementGetDeviceClassdefaultResponse
  >;
}

export interface ManagementListInstallableUpdatesForDeviceClass {
  /** Gets a list of installable updates for a device class. */
  get(
    options?: ManagementListInstallableUpdatesForDeviceClassParameters
  ): Promise<
    | ManagementListInstallableUpdatesForDeviceClass200Response
    | ManagementListInstallableUpdatesForDeviceClassdefaultResponse
  >;
}

export interface ManagementListDevices {
  /** Gets a list of devices connected to Device Update for IoT Hub. */
  get(
    options?: ManagementListDevicesParameters
  ): Promise<
    ManagementListDevices200Response | ManagementListDevicesdefaultResponse
  >;
  /** Import existing devices from IoT Hub. */
  post(
    options: ManagementImportDevicesParameters
  ): Promise<
    ManagementImportDevices202Response | ManagementImportDevicesdefaultResponse
  >;
}

export interface ManagementGetDevice {
  /** Gets the device properties and latest deployment status for a device connected to Device Update for IoT Hub. */
  get(
    options?: ManagementGetDeviceParameters
  ): Promise<
    ManagementGetDevice200Response | ManagementGetDevicedefaultResponse
  >;
}

export interface ManagementGetDeviceModule {
  /** Gets the device module properties and latest deployment status for a device module connected to Device Update for IoT Hub. */
  get(
    options?: ManagementGetDeviceModuleParameters
  ): Promise<
    | ManagementGetDeviceModule200Response
    | ManagementGetDeviceModuledefaultResponse
  >;
}

export interface ManagementGetUpdateCompliance {
  /** Gets the breakdown of how many devices are on their latest update, have new updates available, or are in progress receiving new updates. */
  get(
    options?: ManagementGetUpdateComplianceParameters
  ): Promise<
    | ManagementGetUpdateCompliance200Response
    | ManagementGetUpdateCompliancedefaultResponse
  >;
}

export interface ManagementListDeviceTags {
  /** Gets a list of available group device tags for all devices connected to Device Update for IoT Hub. */
  get(
    options?: ManagementListDeviceTagsParameters
  ): Promise<
    | ManagementListDeviceTags200Response
    | ManagementListDeviceTagsdefaultResponse
  >;
}

export interface ManagementGetDeviceTag {
  /** Gets a count of how many devices have a device tag. */
  get(
    options?: ManagementGetDeviceTagParameters
  ): Promise<
    ManagementGetDeviceTag200Response | ManagementGetDeviceTagdefaultResponse
  >;
}

export interface ManagementListGroups {
  /** Gets a list of all device groups. */
  get(
    options?: ManagementListGroupsParameters
  ): Promise<
    ManagementListGroups200Response | ManagementListGroupsdefaultResponse
  >;
}

export interface ManagementGetGroup {
  /** Gets the properties of a group. */
  get(
    options?: ManagementGetGroupParameters
  ): Promise<ManagementGetGroup200Response | ManagementGetGroupdefaultResponse>;
  /** Create or update a device group. */
  put(
    options: ManagementCreateOrUpdateGroupParameters
  ): Promise<
    | ManagementCreateOrUpdateGroup200Response
    | ManagementCreateOrUpdateGroupdefaultResponse
  >;
  /** Deletes a device group. */
  delete(
    options?: ManagementDeleteGroupParameters
  ): Promise<
    ManagementDeleteGroup204Response | ManagementDeleteGroupdefaultResponse
  >;
}

export interface ManagementGetGroupUpdateCompliance {
  /** Get group update compliance information such as how many devices are on their latest update, how many need new updates, and how many are in progress on receiving a new update. */
  get(
    options?: ManagementGetGroupUpdateComplianceParameters
  ): Promise<
    | ManagementGetGroupUpdateCompliance200Response
    | ManagementGetGroupUpdateCompliancedefaultResponse
  >;
}

export interface ManagementListBestUpdatesForGroup {
  /** Get the best available updates for a group and a count of how many devices need each update. */
  get(
    options?: ManagementListBestUpdatesForGroupParameters
  ): Promise<
    | ManagementListBestUpdatesForGroup200Response
    | ManagementListBestUpdatesForGroupdefaultResponse
  >;
}

export interface ManagementListDeploymentsForGroup {
  /** Gets a list of deployments for a group. */
  get(
    options?: ManagementListDeploymentsForGroupParameters
  ): Promise<
    | ManagementListDeploymentsForGroup200Response
    | ManagementListDeploymentsForGroupdefaultResponse
  >;
}

export interface ManagementGetDeployment {
  /** Gets the properties of a deployment. */
  get(
    options?: ManagementGetDeploymentParameters
  ): Promise<
    ManagementGetDeployment200Response | ManagementGetDeploymentdefaultResponse
  >;
  /** Creates or updates a deployment. */
  put(
    options: ManagementCreateOrUpdateDeploymentParameters
  ): Promise<
    | ManagementCreateOrUpdateDeployment200Response
    | ManagementCreateOrUpdateDeploymentdefaultResponse
  >;
  /** Deletes a deployment. */
  delete(
    options?: ManagementDeleteDeploymentParameters
  ): Promise<
    | ManagementDeleteDeployment204Response
    | ManagementDeleteDeploymentdefaultResponse
  >;
  /** Stops a deployment. */
  post(
    options:
      | ManagementStopDeploymentParameters
      | ManagementRetryDeploymentParameters
  ):
    | Promise<
        | ManagementStopDeployment200Response
        | ManagementStopDeploymentdefaultResponse
      >
    | Promise<
        | ManagementRetryDeployment200Response
        | ManagementRetryDeploymentdefaultResponse
      >;
}

export interface ManagementGetDeploymentStatus {
  /** Gets the status of a deployment including a breakdown of how many devices in the deployment are in progress, completed, or failed. */
  get(
    options?: ManagementGetDeploymentStatusParameters
  ): Promise<
    | ManagementGetDeploymentStatus200Response
    | ManagementGetDeploymentStatusdefaultResponse
  >;
}

export interface ManagementListDeploymentDevices {
  /** Gets a list of devices in a deployment along with their state. Useful for getting a list of failed devices. */
  get(
    options?: ManagementListDeploymentDevicesParameters
  ): Promise<
    | ManagementListDeploymentDevices200Response
    | ManagementListDeploymentDevicesdefaultResponse
  >;
}

export interface ManagementGetOperation {
  /** Retrieve operation status. */
  get(
    options?: ManagementGetOperationParameters
  ): Promise<
    | ManagementGetOperation200Response
    | ManagementGetOperation304Response
    | ManagementGetOperationdefaultResponse
  >;
}

export interface ManagementListOperations {
  /** Get a list of all device import operations. Completed operations are kept for 7 days before auto-deleted. */
  get(
    options?: ManagementListOperationsParameters
  ): Promise<
    | ManagementListOperations200Response
    | ManagementListOperationsdefaultResponse
  >;
}

export interface ManagementCollectLogs {
  /** Start the device diagnostics log collection operation on specified devices. */
  put(
    options: ManagementCollectLogsParameters
  ): Promise<
    ManagementCollectLogs201Response | ManagementCollectLogsdefaultResponse
  >;
  /** Get the device diagnostics log collection operation */
  get(
    options?: ManagementGetLogCollectionOperationParameters
  ): Promise<
    | ManagementGetLogCollectionOperation200Response
    | ManagementGetLogCollectionOperationdefaultResponse
  >;
}

export interface ManagementListLogCollectionOperations {
  /** Get all device diagnostics log collection operations */
  get(
    options?: ManagementListLogCollectionOperationsParameters
  ): Promise<
    | ManagementListLogCollectionOperations200Response
    | ManagementListLogCollectionOperationsdefaultResponse
  >;
}

export interface ManagementGetLogCollectionOperationDetailedStatus {
  /** Get device diagnostics log collection operation with detailed status */
  get(
    options?: ManagementGetLogCollectionOperationDetailedStatusParameters
  ): Promise<
    | ManagementGetLogCollectionOperationDetailedStatus200Response
    | ManagementGetLogCollectionOperationDetailedStatusdefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/deviceupdate/\{instanceId\}/updates' has methods for the following verbs: post, get */
  (
    path: "/deviceupdate/{instanceId}/updates",
    instanceId: string
  ): UpdatesImportUpdate;
  /** Resource for '/deviceupdate/\{instanceId\}/updates/providers/\{provider\}/names/\{name\}/versions/\{version\}' has methods for the following verbs: get, delete */
  (
    path: "/deviceupdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}",
    instanceId: string,
    provider: string,
    name: string,
    version: string
  ): UpdatesGetUpdate;
  /** Resource for '/deviceupdate/\{instanceId\}/updates/providers' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/updates/providers",
    instanceId: string
  ): UpdatesListProviders;
  /** Resource for '/deviceupdate/\{instanceId\}/updates/providers/\{provider\}/names' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/updates/providers/{provider}/names",
    instanceId: string,
    provider: string
  ): UpdatesListNames;
  /** Resource for '/deviceupdate/\{instanceId\}/updates/providers/\{provider\}/names/\{name\}/versions' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/updates/providers/{provider}/names/{name}/versions",
    instanceId: string,
    provider: string,
    name: string
  ): UpdatesListVersions;
  /** Resource for '/deviceupdate/\{instanceId\}/updates/providers/\{provider\}/names/\{name\}/versions/\{version\}/files' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files",
    instanceId: string,
    provider: string,
    name: string,
    version: string
  ): UpdatesListFiles;
  /** Resource for '/deviceupdate/\{instanceId\}/updates/providers/\{provider\}/names/\{name\}/versions/\{version\}/files/\{fileId\}' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files/{fileId}",
    instanceId: string,
    provider: string,
    name: string,
    version: string,
    fileId: string
  ): UpdatesGetFile;
  /** Resource for '/deviceupdate/\{instanceId\}/updates/operations' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/updates/operations",
    instanceId: string
  ): UpdatesListOperations;
  /** Resource for '/deviceupdate/\{instanceId\}/updates/operations/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/updates/operations/{operationId}",
    instanceId: string,
    operationId: string
  ): UpdatesGetOperation;
  /** Resource for '/deviceupdate/\{instanceId\}/management/deviceclasses' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/deviceclasses",
    instanceId: string
  ): ManagementListDeviceClasses;
  /** Resource for '/deviceupdate/\{instanceId\}/management/deviceclasses/\{deviceClassId\}' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/deviceclasses/{deviceClassId}",
    instanceId: string,
    deviceClassId: string
  ): ManagementGetDeviceClass;
  /** Resource for '/deviceupdate/\{instanceId\}/management/deviceclasses/\{deviceClassId\}/installableupdates' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/deviceclasses/{deviceClassId}/installableupdates",
    instanceId: string,
    deviceClassId: string
  ): ManagementListInstallableUpdatesForDeviceClass;
  /** Resource for '/deviceupdate/\{instanceId\}/management/devices' has methods for the following verbs: get, post */
  (
    path: "/deviceupdate/{instanceId}/management/devices",
    instanceId: string
  ): ManagementListDevices;
  /** Resource for '/deviceupdate/\{instanceId\}/management/devices/\{deviceId\}' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/devices/{deviceId}",
    instanceId: string,
    deviceId: string
  ): ManagementGetDevice;
  /** Resource for '/deviceupdate/\{instanceId\}/management/devices/\{deviceId\}/modules/\{moduleId\}' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/devices/{deviceId}/modules/{moduleId}",
    instanceId: string,
    deviceId: string,
    moduleId: string
  ): ManagementGetDeviceModule;
  /** Resource for '/deviceupdate/\{instanceId\}/management/updatecompliance' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/updatecompliance",
    instanceId: string
  ): ManagementGetUpdateCompliance;
  /** Resource for '/deviceupdate/\{instanceId\}/management/devicetags' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/devicetags",
    instanceId: string
  ): ManagementListDeviceTags;
  /** Resource for '/deviceupdate/\{instanceId\}/management/devicetags/\{tagName\}' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/devicetags/{tagName}",
    instanceId: string,
    tagName: string
  ): ManagementGetDeviceTag;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/groups",
    instanceId: string
  ): ManagementListGroups;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}' has methods for the following verbs: get, put, delete */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}",
    instanceId: string,
    groupId: string
  ): ManagementGetGroup;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}/updateCompliance' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}/updateCompliance",
    instanceId: string,
    groupId: string
  ): ManagementGetGroupUpdateCompliance;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}/bestUpdates' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}/bestUpdates",
    instanceId: string,
    groupId: string
  ): ManagementListBestUpdatesForGroup;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}/deployments' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}/deployments",
    instanceId: string,
    groupId: string
  ): ManagementListDeploymentsForGroup;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}/deployments/\{deploymentId\}' has methods for the following verbs: get, put, delete, post */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}",
    instanceId: string,
    groupId: string,
    deploymentId: string
  ): ManagementGetDeployment;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}/deployments/\{deploymentId\}/status' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}/status",
    instanceId: string,
    groupId: string,
    deploymentId: string
  ): ManagementGetDeploymentStatus;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}/deployments/\{deploymentId\}/devicestates' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}/devicestates",
    instanceId: string,
    groupId: string,
    deploymentId: string
  ): ManagementListDeploymentDevices;
  /** Resource for '/deviceupdate/\{instanceId\}/management/operations/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/operations/{operationId}",
    instanceId: string,
    operationId: string
  ): ManagementGetOperation;
  /** Resource for '/deviceupdate/\{instanceId\}/management/operations' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/operations",
    instanceId: string
  ): ManagementListOperations;
  /** Resource for '/deviceupdate/\{instanceId\}/management/deviceDiagnostics/logCollections/\{operationId\}' has methods for the following verbs: put, get */
  (
    path: "/deviceupdate/{instanceId}/management/deviceDiagnostics/logCollections/{operationId}",
    instanceId: string,
    operationId: string
  ): ManagementCollectLogs;
  /** Resource for '/deviceupdate/\{instanceId\}/management/deviceDiagnostics/logCollections' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/deviceDiagnostics/logCollections",
    instanceId: string
  ): ManagementListLogCollectionOperations;
  /** Resource for '/deviceupdate/\{instanceId\}/management/deviceDiagnostics/logCollections/\{operationId\}/detailedStatus' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/deviceDiagnostics/logCollections/{operationId}/detailedStatus",
    instanceId: string,
    operationId: string
  ): ManagementGetLogCollectionOperationDetailedStatus;
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
      scopes: ["https://api.adu.microsoft.com/.default"]
    }
  };

  return getClient(baseUrl, credentials, options) as DeviceUpdateRestClient;
}
