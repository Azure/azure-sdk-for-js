// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  UpdatesImportUpdateParameters,
  UpdatesGetUpdateIdsParameters,
  UpdatesGetUpdateParameters,
  UpdatesDeleteUpdateParameters,
  UpdatesGetProvidersParameters,
  UpdatesGetNamesParameters,
  UpdatesGetVersionsParameters,
  UpdatesGetFilesParameters,
  UpdatesGetFileParameters,
  UpdatesGetOperationsParameters,
  UpdatesGetOperationParameters,
  DevicesGetAllDeviceClassesParameters,
  DevicesGetDeviceClassParameters,
  DevicesGetDeviceClassDeviceIdsParameters,
  DevicesGetDeviceClassInstallableUpdatesParameters,
  DevicesGetAllDevicesParameters,
  DevicesImportDevicesParameters,
  DevicesGetDeviceParameters,
  DevicesGetUpdateComplianceParameters,
  DevicesGetAllDeviceTagsParameters,
  DevicesGetDeviceTagParameters,
  DevicesGetAllGroupsParameters,
  DevicesGetGroupParameters,
  DevicesCreateOrUpdateGroupParameters,
  DevicesDeleteGroupParameters,
  DevicesGetGroupUpdateComplianceParameters,
  DevicesGetGroupBestUpdatesParameters,
  DevicesGetOperationParameters,
  DevicesGetOperationsParameters,
  DeploymentsGetAllDeploymentsParameters,
  DeploymentsGetDeploymentParameters,
  DeploymentsCreateOrUpdateDeploymentParameters,
  DeploymentsDeleteDeploymentParameters,
  DeploymentsGetDeploymentStatusParameters,
  DeploymentsGetDeploymentDevicesParameters,
  DeploymentsCancelDeploymentParameters,
  DeploymentsRetryDeploymentParameters,
  DiagnosticsPutOperationParameters,
  DiagnosticsGetOperationParameters,
  DiagnosticsGetOperationStatusParameters,
  DiagnosticsGetOperationsParameters
} from "./parameters";
import {
  UpdatesImportUpdate202Response,
  UpdatesImportUpdate429Response,
  UpdatesGetUpdateIds200Response,
  UpdatesGetUpdateIds429Response,
  UpdatesGetUpdate200Response,
  UpdatesGetUpdate304Response,
  UpdatesGetUpdate404Response,
  UpdatesGetUpdate429Response,
  UpdatesDeleteUpdate202Response,
  UpdatesDeleteUpdate429Response,
  UpdatesGetProviders200Response,
  UpdatesGetProviders429Response,
  UpdatesGetNames200Response,
  UpdatesGetNames404Response,
  UpdatesGetNames429Response,
  UpdatesGetVersions200Response,
  UpdatesGetVersions404Response,
  UpdatesGetVersions429Response,
  UpdatesGetFiles200Response,
  UpdatesGetFiles404Response,
  UpdatesGetFiles429Response,
  UpdatesGetFile200Response,
  UpdatesGetFile304Response,
  UpdatesGetFile404Response,
  UpdatesGetFile429Response,
  UpdatesGetOperations200Response,
  UpdatesGetOperations429Response,
  UpdatesGetOperation200Response,
  UpdatesGetOperation304Response,
  UpdatesGetOperation404Response,
  UpdatesGetOperation429Response,
  DevicesGetAllDeviceClasses200Response,
  DevicesGetDeviceClass200Response,
  DevicesGetDeviceClass404Response,
  DevicesGetDeviceClassDeviceIds200Response,
  DevicesGetDeviceClassDeviceIds404Response,
  DevicesGetDeviceClassInstallableUpdates200Response,
  DevicesGetDeviceClassInstallableUpdates404Response,
  DevicesGetAllDevices200Response,
  DevicesImportDevices202Response,
  DevicesImportDevices400Response,
  DevicesImportDevices429Response,
  DevicesGetDevice200Response,
  DevicesGetDevice404Response,
  DevicesGetUpdateCompliance200Response,
  DevicesGetAllDeviceTags200Response,
  DevicesGetDeviceTag200Response,
  DevicesGetDeviceTag404Response,
  DevicesGetAllGroups200Response,
  DevicesGetGroup200Response,
  DevicesGetGroup404Response,
  DevicesCreateOrUpdateGroup200Response,
  DevicesCreateOrUpdateGroup400Response,
  DevicesCreateOrUpdateGroup404Response,
  DevicesDeleteGroup200Response,
  DevicesDeleteGroup204Response,
  DevicesGetGroupUpdateCompliance200Response,
  DevicesGetGroupUpdateCompliance404Response,
  DevicesGetGroupBestUpdates200Response,
  DevicesGetGroupBestUpdates404Response,
  DevicesGetOperation200Response,
  DevicesGetOperation304Response,
  DevicesGetOperation404Response,
  DevicesGetOperation429Response,
  DevicesGetOperations200Response,
  DevicesGetOperations429Response,
  DeploymentsGetAllDeployments200Response,
  DeploymentsGetDeployment200Response,
  DeploymentsGetDeployment404Response,
  DeploymentsCreateOrUpdateDeployment200Response,
  DeploymentsCreateOrUpdateDeployment400Response,
  DeploymentsCreateOrUpdateDeployment404Response,
  DeploymentsDeleteDeployment200Response,
  DeploymentsDeleteDeployment404Response,
  DeploymentsGetDeploymentStatus200Response,
  DeploymentsGetDeploymentStatus404Response,
  DeploymentsGetDeploymentDevices200Response,
  DeploymentsGetDeploymentDevices404Response,
  DeploymentsCancelDeployment200Response,
  DeploymentsCancelDeployment404Response,
  DeploymentsRetryDeployment200Response,
  DeploymentsRetryDeployment404Response,
  DiagnosticsPutOperation201Response,
  DiagnosticsPutOperation409Response,
  DiagnosticsGetOperation200Response,
  DiagnosticsGetOperationStatus200Response,
  DiagnosticsGetOperations200Response
} from "./responses";
import { getClient, ClientOptions, Client } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface UpdatesImportUpdate {
  /** Import new update version. */
  post(
    options: UpdatesImportUpdateParameters
  ): Promise<UpdatesImportUpdate202Response | UpdatesImportUpdate429Response>;
  /** Get a list of all update identities that have been imported to Device Update for IoT Hub. */
  get(
    options?: UpdatesGetUpdateIdsParameters
  ): Promise<UpdatesGetUpdateIds200Response | UpdatesGetUpdateIds429Response>;
}

export interface UpdatesGetUpdate {
  /** Get a specific update version. */
  get(
    options?: UpdatesGetUpdateParameters
  ): Promise<
    | UpdatesGetUpdate200Response
    | UpdatesGetUpdate304Response
    | UpdatesGetUpdate404Response
    | UpdatesGetUpdate429Response
  >;
  /** Delete a specific update version. */
  delete(
    options?: UpdatesDeleteUpdateParameters
  ): Promise<UpdatesDeleteUpdate202Response | UpdatesDeleteUpdate429Response>;
}

export interface UpdatesGetProviders {
  /** Get a list of all update providers that have been imported to Device Update for IoT Hub. */
  get(
    options?: UpdatesGetProvidersParameters
  ): Promise<UpdatesGetProviders200Response | UpdatesGetProviders429Response>;
}

export interface UpdatesGetNames {
  /** Get a list of all update names that match the specified provider. */
  get(
    options?: UpdatesGetNamesParameters
  ): Promise<
    | UpdatesGetNames200Response
    | UpdatesGetNames404Response
    | UpdatesGetNames429Response
  >;
}

export interface UpdatesGetVersions {
  /** Get a list of all update versions that match the specified provider and name. */
  get(
    options?: UpdatesGetVersionsParameters
  ): Promise<
    | UpdatesGetVersions200Response
    | UpdatesGetVersions404Response
    | UpdatesGetVersions429Response
  >;
}

export interface UpdatesGetFiles {
  /** Get a list of all update file identifiers for the specified version. */
  get(
    options?: UpdatesGetFilesParameters
  ): Promise<
    | UpdatesGetFiles200Response
    | UpdatesGetFiles404Response
    | UpdatesGetFiles429Response
  >;
}

export interface UpdatesGetFile {
  /** Get a specific update file from the version. */
  get(
    options?: UpdatesGetFileParameters
  ): Promise<
    | UpdatesGetFile200Response
    | UpdatesGetFile304Response
    | UpdatesGetFile404Response
    | UpdatesGetFile429Response
  >;
}

export interface UpdatesGetOperations {
  /** Get a list of all import update operations. Completed operations are kept for 7 days before auto-deleted. Delete operations are not returned by this API version. */
  get(
    options?: UpdatesGetOperationsParameters
  ): Promise<UpdatesGetOperations200Response | UpdatesGetOperations429Response>;
}

export interface UpdatesGetOperation {
  /** Retrieve operation status. */
  get(
    options?: UpdatesGetOperationParameters
  ): Promise<
    | UpdatesGetOperation200Response
    | UpdatesGetOperation304Response
    | UpdatesGetOperation404Response
    | UpdatesGetOperation429Response
  >;
}

export interface DevicesGetAllDeviceClasses {
  /** Gets a list of all device classes (unique combinations of device manufacturer and model) for all devices connected to Device Update for IoT Hub. */
  get(
    options?: DevicesGetAllDeviceClassesParameters
  ): Promise<DevicesGetAllDeviceClasses200Response>;
}

export interface DevicesGetDeviceClass {
  /** Gets the properties of a device class. */
  get(
    options?: DevicesGetDeviceClassParameters
  ): Promise<
    DevicesGetDeviceClass200Response | DevicesGetDeviceClass404Response
  >;
}

export interface DevicesGetDeviceClassDeviceIds {
  /** Gets a list of device identifiers in a device class. */
  get(
    options?: DevicesGetDeviceClassDeviceIdsParameters
  ): Promise<
    | DevicesGetDeviceClassDeviceIds200Response
    | DevicesGetDeviceClassDeviceIds404Response
  >;
}

export interface DevicesGetDeviceClassInstallableUpdates {
  /** Gets a list of installable updates for a device class. */
  get(
    options?: DevicesGetDeviceClassInstallableUpdatesParameters
  ): Promise<
    | DevicesGetDeviceClassInstallableUpdates200Response
    | DevicesGetDeviceClassInstallableUpdates404Response
  >;
}

export interface DevicesGetAllDevices {
  /** Gets a list of devices connected to Device Update for IoT Hub. */
  get(
    options?: DevicesGetAllDevicesParameters
  ): Promise<DevicesGetAllDevices200Response>;
  /** Import existing devices from IoT Hub. */
  post(
    options: DevicesImportDevicesParameters
  ): Promise<
    | DevicesImportDevices202Response
    | DevicesImportDevices400Response
    | DevicesImportDevices429Response
  >;
}

export interface DevicesGetDevice {
  /** Gets the device properties and latest deployment status for a device connected to Device Update for IoT Hub. */
  get(
    options?: DevicesGetDeviceParameters
  ): Promise<DevicesGetDevice200Response | DevicesGetDevice404Response>;
}

export interface DevicesGetUpdateCompliance {
  /** Gets the breakdown of how many devices are on their latest update, have new updates available, or are in progress receiving new updates. */
  get(
    options?: DevicesGetUpdateComplianceParameters
  ): Promise<DevicesGetUpdateCompliance200Response>;
}

export interface DevicesGetAllDeviceTags {
  /** Gets a list of available group device tags for all devices connected to Device Update for IoT Hub. */
  get(
    options?: DevicesGetAllDeviceTagsParameters
  ): Promise<DevicesGetAllDeviceTags200Response>;
}

export interface DevicesGetDeviceTag {
  /** Gets a count of how many devices have a device tag. */
  get(
    options?: DevicesGetDeviceTagParameters
  ): Promise<DevicesGetDeviceTag200Response | DevicesGetDeviceTag404Response>;
}

export interface DevicesGetAllGroups {
  /** Gets a list of all device groups. */
  get(
    options?: DevicesGetAllGroupsParameters
  ): Promise<DevicesGetAllGroups200Response>;
}

export interface DevicesGetGroup {
  /** Gets the properties of a group. */
  get(
    options?: DevicesGetGroupParameters
  ): Promise<DevicesGetGroup200Response | DevicesGetGroup404Response>;
  /** Create or update a device group. */
  put(
    options: DevicesCreateOrUpdateGroupParameters
  ): Promise<
    | DevicesCreateOrUpdateGroup200Response
    | DevicesCreateOrUpdateGroup400Response
    | DevicesCreateOrUpdateGroup404Response
  >;
  /** Deletes a device group. */
  delete(
    options?: DevicesDeleteGroupParameters
  ): Promise<DevicesDeleteGroup200Response | DevicesDeleteGroup204Response>;
}

export interface DevicesGetGroupUpdateCompliance {
  /** Get group update compliance information such as how many devices are on their latest update, how many need new updates, and how many are in progress on receiving a new update. */
  get(
    options?: DevicesGetGroupUpdateComplianceParameters
  ): Promise<
    | DevicesGetGroupUpdateCompliance200Response
    | DevicesGetGroupUpdateCompliance404Response
  >;
}

export interface DevicesGetGroupBestUpdates {
  /** Get the best available updates for a group and a count of how many devices need each update. */
  get(
    options?: DevicesGetGroupBestUpdatesParameters
  ): Promise<
    | DevicesGetGroupBestUpdates200Response
    | DevicesGetGroupBestUpdates404Response
  >;
}

export interface DevicesGetOperation {
  /** Retrieve operation status. */
  get(
    options?: DevicesGetOperationParameters
  ): Promise<
    | DevicesGetOperation200Response
    | DevicesGetOperation304Response
    | DevicesGetOperation404Response
    | DevicesGetOperation429Response
  >;
}

export interface DevicesGetOperations {
  /** Get a list of all device import operations. Completed operations are kept for 7 days before auto-deleted. */
  get(
    options?: DevicesGetOperationsParameters
  ): Promise<DevicesGetOperations200Response | DevicesGetOperations429Response>;
}

export interface DeploymentsGetAllDeployments {
  /** Gets a list of deployments for a group. */
  get(
    options?: DeploymentsGetAllDeploymentsParameters
  ): Promise<DeploymentsGetAllDeployments200Response>;
}

export interface DeploymentsGetDeployment {
  /** Gets the properties of a deployment. */
  get(
    options?: DeploymentsGetDeploymentParameters
  ): Promise<
    DeploymentsGetDeployment200Response | DeploymentsGetDeployment404Response
  >;
  /** Creates or updates a deployment. */
  put(
    options: DeploymentsCreateOrUpdateDeploymentParameters
  ): Promise<
    | DeploymentsCreateOrUpdateDeployment200Response
    | DeploymentsCreateOrUpdateDeployment400Response
    | DeploymentsCreateOrUpdateDeployment404Response
  >;
  /** Deletes a deployment. */
  delete(
    options?: DeploymentsDeleteDeploymentParameters
  ): Promise<
    | DeploymentsDeleteDeployment200Response
    | DeploymentsDeleteDeployment404Response
  >;
  /** Cancels a deployment. */
  post(
    options:
      | DeploymentsCancelDeploymentParameters
      | DeploymentsRetryDeploymentParameters
  ):
    | Promise<
        | DeploymentsCancelDeployment200Response
        | DeploymentsCancelDeployment404Response
      >
    | Promise<
        | DeploymentsRetryDeployment200Response
        | DeploymentsRetryDeployment404Response
      >;
}

export interface DeploymentsGetDeploymentStatus {
  /** Gets the status of a deployment including a breakdown of how many devices in the deployment are in progress, completed, or failed. */
  get(
    options?: DeploymentsGetDeploymentStatusParameters
  ): Promise<
    | DeploymentsGetDeploymentStatus200Response
    | DeploymentsGetDeploymentStatus404Response
  >;
}

export interface DeploymentsGetDeploymentDevices {
  /** Gets a list of devices in a deployment along with their state. Useful for getting a list of failed devices. */
  get(
    options?: DeploymentsGetDeploymentDevicesParameters
  ): Promise<
    | DeploymentsGetDeploymentDevices200Response
    | DeploymentsGetDeploymentDevices404Response
  >;
}

export interface DiagnosticsPutOperation {
  /** Start the log upload operation on specified devices. */
  put(
    options: DiagnosticsPutOperationParameters
  ): Promise<
    DiagnosticsPutOperation201Response | DiagnosticsPutOperation409Response
  >;
  /** Get the diagnostics operation */
  get(
    options?: DiagnosticsGetOperationParameters
  ): Promise<DiagnosticsGetOperation200Response>;
}

export interface DiagnosticsGetOperationStatus {
  /** Get diagnostics operation status */
  get(
    options?: DiagnosticsGetOperationStatusParameters
  ): Promise<DiagnosticsGetOperationStatus200Response>;
}

export interface DiagnosticsGetOperations {
  /** Get all diagnostics operations */
  get(
    options?: DiagnosticsGetOperationsParameters
  ): Promise<DiagnosticsGetOperations200Response>;
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
  ): UpdatesGetProviders;
  /** Resource for '/deviceupdate/\{instanceId\}/updates/providers/\{provider\}/names' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/updates/providers/{provider}/names",
    instanceId: string,
    provider: string
  ): UpdatesGetNames;
  /** Resource for '/deviceupdate/\{instanceId\}/updates/providers/\{provider\}/names/\{name\}/versions' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/updates/providers/{provider}/names/{name}/versions",
    instanceId: string,
    provider: string,
    name: string
  ): UpdatesGetVersions;
  /** Resource for '/deviceupdate/\{instanceId\}/updates/providers/\{provider\}/names/\{name\}/versions/\{version\}/files' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files",
    instanceId: string,
    provider: string,
    name: string,
    version: string
  ): UpdatesGetFiles;
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
  ): UpdatesGetOperations;
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
  ): DevicesGetAllDeviceClasses;
  /** Resource for '/deviceupdate/\{instanceId\}/management/deviceclasses/\{deviceClassId\}' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/deviceclasses/{deviceClassId}",
    instanceId: string,
    deviceClassId: string
  ): DevicesGetDeviceClass;
  /** Resource for '/deviceupdate/\{instanceId\}/management/deviceclasses/\{deviceClassId\}/deviceids' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/deviceclasses/{deviceClassId}/deviceids",
    instanceId: string,
    deviceClassId: string
  ): DevicesGetDeviceClassDeviceIds;
  /** Resource for '/deviceupdate/\{instanceId\}/management/deviceclasses/\{deviceClassId\}/installableupdates' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/deviceclasses/{deviceClassId}/installableupdates",
    instanceId: string,
    deviceClassId: string
  ): DevicesGetDeviceClassInstallableUpdates;
  /** Resource for '/deviceupdate/\{instanceId\}/management/devices' has methods for the following verbs: get, post */
  (
    path: "/deviceupdate/{instanceId}/management/devices",
    instanceId: string
  ): DevicesGetAllDevices;
  /** Resource for '/deviceupdate/\{instanceId\}/management/devices/\{deviceId\}' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/devices/{deviceId}",
    instanceId: string,
    deviceId: string
  ): DevicesGetDevice;
  /** Resource for '/deviceupdate/\{instanceId\}/management/updatecompliance' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/updatecompliance",
    instanceId: string
  ): DevicesGetUpdateCompliance;
  /** Resource for '/deviceupdate/\{instanceId\}/management/devicetags' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/devicetags",
    instanceId: string
  ): DevicesGetAllDeviceTags;
  /** Resource for '/deviceupdate/\{instanceId\}/management/devicetags/\{tagName\}' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/devicetags/{tagName}",
    instanceId: string,
    tagName: string
  ): DevicesGetDeviceTag;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/groups",
    instanceId: string
  ): DevicesGetAllGroups;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}' has methods for the following verbs: get, put, delete */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}",
    instanceId: string,
    groupId: string
  ): DevicesGetGroup;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}/updateCompliance' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}/updateCompliance",
    instanceId: string,
    groupId: string
  ): DevicesGetGroupUpdateCompliance;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}/bestUpdates' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}/bestUpdates",
    instanceId: string,
    groupId: string
  ): DevicesGetGroupBestUpdates;
  /** Resource for '/deviceupdate/\{instanceId\}/devices/operations/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/devices/operations/{operationId}",
    instanceId: string,
    operationId: string
  ): DevicesGetOperation;
  /** Resource for '/deviceupdate/\{instanceId\}/devices/operations' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/devices/operations",
    instanceId: string
  ): DevicesGetOperations;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}/deployments' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}/deployments",
    instanceId: string,
    groupId: string
  ): DeploymentsGetAllDeployments;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}/deployments/\{deploymentId\}' has methods for the following verbs: get, put, delete, post */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}",
    instanceId: string,
    deploymentId: string,
    groupId: string
  ): DeploymentsGetDeployment;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}/deployments/\{deploymentId\}/status' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}/status",
    instanceId: string,
    groupId: string,
    deploymentId: string
  ): DeploymentsGetDeploymentStatus;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}/deployments/\{deploymentId\}/devicestates' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}/devicestates",
    instanceId: string,
    groupId: string,
    deploymentId: string
  ): DeploymentsGetDeploymentDevices;
  /** Resource for '/deviceupdate/\{instanceId\}/management/diagnostics/\{operationId\}' has methods for the following verbs: put, get */
  (
    path: "/deviceupdate/{instanceId}/management/diagnostics/{operationId}",
    instanceId: string,
    operationId: string
  ): DiagnosticsPutOperation;
  /** Resource for '/deviceupdate/\{instanceId\}/management/diagnostics/\{operationId\}/status' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/diagnostics/{operationId}/status",
    instanceId: string,
    operationId: string
  ): DiagnosticsGetOperationStatus;
  /** Resource for '/deviceupdate/\{instanceId\}/management/diagnostics' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/diagnostics",
    instanceId: string
  ): DiagnosticsGetOperations;
}

export type DeviceUpdateRestClient = Client & {
  path: Routes;
};

export default function DeviceUpdate(
  accountEndpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): DeviceUpdateRestClient {
  const baseUrl = options.baseUrl ?? `https://${accountEndpoint}`;
  options.apiVersion = options.apiVersion ?? "2021-06-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://api.adu.microsoft.com/.default"]
    }
  };

  return getClient(baseUrl, credentials, options) as DeviceUpdateRestClient;
}
