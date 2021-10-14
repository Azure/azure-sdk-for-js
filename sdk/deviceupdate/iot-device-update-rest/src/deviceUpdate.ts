// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  UpdatesImportUpdateParameters,
  UpdatesListUpdateIdsParameters,
  UpdatesGetUpdateParameters,
  UpdatesDeleteUpdateParameters,
  UpdatesListProvidersParameters,
  UpdatesListNamesParameters,
  UpdatesListVersionsParameters,
  UpdatesListFilesParameters,
  UpdatesGetFileParameters,
  UpdatesListOperationsParameters,
  UpdatesGetOperationParameters,
  DevicesListDeviceClassesParameters,
  DevicesGetDeviceClassParameters,
  DevicesListDeviceClassDeviceIdsParameters,
  DevicesListDeviceClassInstallableUpdatesParameters,
  DevicesListDevicesParameters,
  DevicesImportDevicesParameters,
  DevicesGetDeviceParameters,
  DevicesGetUpdateComplianceParameters,
  DevicesListDeviceTagsParameters,
  DevicesGetDeviceTagParameters,
  DevicesListGroupsParameters,
  DevicesGetGroupParameters,
  DevicesCreateOrUpdateGroupParameters,
  DevicesDeleteGroupParameters,
  DevicesGetGroupUpdateComplianceParameters,
  DevicesListGroupBestUpdatesParameters,
  DevicesGetOperationParameters,
  DevicesListOperationsParameters,
  DeploymentsListAllDeploymentsParameters,
  DeploymentsGetDeploymentParameters,
  DeploymentsCreateOrUpdateDeploymentParameters,
  DeploymentsDeleteDeploymentParameters,
  DeploymentsGetDeploymentStatusParameters,
  DeploymentsListDeploymentDevicesParameters,
  DeploymentsCancelDeploymentParameters,
  DeploymentsRetryDeploymentParameters,
  DiagnosticsUploadLogParameters,
  DiagnosticsGetOperationParameters,
  DiagnosticsGetOperationStatusParameters,
  DiagnosticsListOperationsParameters
} from "./parameters";
import {
  UpdatesImportUpdate202Response,
  UpdatesImportUpdatedefaultResponse,
  UpdatesListUpdateIds200Response,
  UpdatesListUpdateIdsdefaultResponse,
  UpdatesGetUpdate200Response,
  UpdatesGetUpdate304Response,
  UpdatesGetUpdatedefaultResponse,
  UpdatesDeleteUpdate202Response,
  UpdatesDeleteUpdatedefaultResponse,
  UpdatesListProviders200Response,
  UpdatesListProvidersdefaultResponse,
  UpdatesListNames200Response,
  UpdatesListNamesdefaultResponse,
  UpdatesListVersions200Response,
  UpdatesListVersionsdefaultResponse,
  UpdatesListFiles200Response,
  UpdatesListFilesdefaultResponse,
  UpdatesGetFile200Response,
  UpdatesGetFile304Response,
  UpdatesGetFiledefaultResponse,
  UpdatesListOperations200Response,
  UpdatesListOperationsdefaultResponse,
  UpdatesGetOperation200Response,
  UpdatesGetOperation304Response,
  UpdatesGetOperationdefaultResponse,
  DevicesListDeviceClasses200Response,
  DevicesListDeviceClassesdefaultResponse,
  DevicesGetDeviceClass200Response,
  DevicesGetDeviceClassdefaultResponse,
  DevicesListDeviceClassDeviceIds200Response,
  DevicesListDeviceClassDeviceIdsdefaultResponse,
  DevicesListDeviceClassInstallableUpdates200Response,
  DevicesListDeviceClassInstallableUpdatesdefaultResponse,
  DevicesListDevices200Response,
  DevicesListDevicesdefaultResponse,
  DevicesImportDevices202Response,
  DevicesImportDevicesdefaultResponse,
  DevicesGetDevice200Response,
  DevicesGetDevicedefaultResponse,
  DevicesGetUpdateCompliance200Response,
  DevicesGetUpdateCompliancedefaultResponse,
  DevicesListDeviceTags200Response,
  DevicesListDeviceTagsdefaultResponse,
  DevicesGetDeviceTag200Response,
  DevicesGetDeviceTagdefaultResponse,
  DevicesListGroups200Response,
  DevicesListGroupsdefaultResponse,
  DevicesGetGroup200Response,
  DevicesGetGroupdefaultResponse,
  DevicesCreateOrUpdateGroup200Response,
  DevicesCreateOrUpdateGroupdefaultResponse,
  DevicesDeleteGroup204Response,
  DevicesDeleteGroupdefaultResponse,
  DevicesGetGroupUpdateCompliance200Response,
  DevicesGetGroupUpdateCompliancedefaultResponse,
  DevicesListGroupBestUpdates200Response,
  DevicesListGroupBestUpdatesdefaultResponse,
  DevicesGetOperation200Response,
  DevicesGetOperation304Response,
  DevicesGetOperationdefaultResponse,
  DevicesListOperations200Response,
  DevicesListOperationsdefaultResponse,
  DeploymentsListAllDeployments200Response,
  DeploymentsListAllDeploymentsdefaultResponse,
  DeploymentsGetDeployment200Response,
  DeploymentsGetDeploymentdefaultResponse,
  DeploymentsCreateOrUpdateDeployment200Response,
  DeploymentsCreateOrUpdateDeploymentdefaultResponse,
  DeploymentsDeleteDeployment204Response,
  DeploymentsDeleteDeploymentdefaultResponse,
  DeploymentsGetDeploymentStatus200Response,
  DeploymentsGetDeploymentStatusdefaultResponse,
  DeploymentsListDeploymentDevices200Response,
  DeploymentsListDeploymentDevicesdefaultResponse,
  DeploymentsCancelDeployment200Response,
  DeploymentsCancelDeploymentdefaultResponse,
  DeploymentsRetryDeployment200Response,
  DeploymentsRetryDeploymentdefaultResponse,
  DiagnosticsUploadLog201Response,
  DiagnosticsUploadLogdefaultResponse,
  DiagnosticsGetOperation200Response,
  DiagnosticsGetOperationdefaultResponse,
  DiagnosticsGetOperationStatus200Response,
  DiagnosticsGetOperationStatusdefaultResponse,
  DiagnosticsListOperations200Response,
  DiagnosticsListOperationsdefaultResponse
} from "./responses";
import { getClient, ClientOptions, Client } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface UpdatesImportUpdate {
  /** Import new update version. */
  post(
    options: UpdatesImportUpdateParameters
  ): Promise<
    UpdatesImportUpdate202Response | UpdatesImportUpdatedefaultResponse
  >;
  /** Get a list of all update identities that have been imported to Device Update for IoT Hub. */
  get(
    options?: UpdatesListUpdateIdsParameters
  ): Promise<
    UpdatesListUpdateIds200Response | UpdatesListUpdateIdsdefaultResponse
  >;
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

export interface DevicesListDeviceClasses {
  /** Gets a list of all device classes (unique combinations of device manufacturer and model) for all devices connected to Device Update for IoT Hub. */
  get(
    options?: DevicesListDeviceClassesParameters
  ): Promise<
    | DevicesListDeviceClasses200Response
    | DevicesListDeviceClassesdefaultResponse
  >;
}

export interface DevicesGetDeviceClass {
  /** Gets the properties of a device class. */
  get(
    options?: DevicesGetDeviceClassParameters
  ): Promise<
    DevicesGetDeviceClass200Response | DevicesGetDeviceClassdefaultResponse
  >;
}

export interface DevicesListDeviceClassDeviceIds {
  /** Gets a list of device identifiers in a device class. */
  get(
    options?: DevicesListDeviceClassDeviceIdsParameters
  ): Promise<
    | DevicesListDeviceClassDeviceIds200Response
    | DevicesListDeviceClassDeviceIdsdefaultResponse
  >;
}

export interface DevicesListDeviceClassInstallableUpdates {
  /** Gets a list of installable updates for a device class. */
  get(
    options?: DevicesListDeviceClassInstallableUpdatesParameters
  ): Promise<
    | DevicesListDeviceClassInstallableUpdates200Response
    | DevicesListDeviceClassInstallableUpdatesdefaultResponse
  >;
}

export interface DevicesListDevices {
  /** Gets a list of devices connected to Device Update for IoT Hub. */
  get(
    options?: DevicesListDevicesParameters
  ): Promise<DevicesListDevices200Response | DevicesListDevicesdefaultResponse>;
  /** Import existing devices from IoT Hub. */
  post(
    options: DevicesImportDevicesParameters
  ): Promise<
    DevicesImportDevices202Response | DevicesImportDevicesdefaultResponse
  >;
}

export interface DevicesGetDevice {
  /** Gets the device properties and latest deployment status for a device connected to Device Update for IoT Hub. */
  get(
    options?: DevicesGetDeviceParameters
  ): Promise<DevicesGetDevice200Response | DevicesGetDevicedefaultResponse>;
}

export interface DevicesGetUpdateCompliance {
  /** Gets the breakdown of how many devices are on their latest update, have new updates available, or are in progress receiving new updates. */
  get(
    options?: DevicesGetUpdateComplianceParameters
  ): Promise<
    | DevicesGetUpdateCompliance200Response
    | DevicesGetUpdateCompliancedefaultResponse
  >;
}

export interface DevicesListDeviceTags {
  /** Gets a list of available group device tags for all devices connected to Device Update for IoT Hub. */
  get(
    options?: DevicesListDeviceTagsParameters
  ): Promise<
    DevicesListDeviceTags200Response | DevicesListDeviceTagsdefaultResponse
  >;
}

export interface DevicesGetDeviceTag {
  /** Gets a count of how many devices have a device tag. */
  get(
    options?: DevicesGetDeviceTagParameters
  ): Promise<
    DevicesGetDeviceTag200Response | DevicesGetDeviceTagdefaultResponse
  >;
}

export interface DevicesListGroups {
  /** Gets a list of all device groups. */
  get(
    options?: DevicesListGroupsParameters
  ): Promise<DevicesListGroups200Response | DevicesListGroupsdefaultResponse>;
}

export interface DevicesGetGroup {
  /** Gets the properties of a group. */
  get(
    options?: DevicesGetGroupParameters
  ): Promise<DevicesGetGroup200Response | DevicesGetGroupdefaultResponse>;
  /** Create or update a device group. */
  put(
    options: DevicesCreateOrUpdateGroupParameters
  ): Promise<
    | DevicesCreateOrUpdateGroup200Response
    | DevicesCreateOrUpdateGroupdefaultResponse
  >;
  /** Deletes a device group. */
  delete(
    options?: DevicesDeleteGroupParameters
  ): Promise<DevicesDeleteGroup204Response | DevicesDeleteGroupdefaultResponse>;
}

export interface DevicesGetGroupUpdateCompliance {
  /** Get group update compliance information such as how many devices are on their latest update, how many need new updates, and how many are in progress on receiving a new update. */
  get(
    options?: DevicesGetGroupUpdateComplianceParameters
  ): Promise<
    | DevicesGetGroupUpdateCompliance200Response
    | DevicesGetGroupUpdateCompliancedefaultResponse
  >;
}

export interface DevicesListGroupBestUpdates {
  /** Get the best available updates for a group and a count of how many devices need each update. */
  get(
    options?: DevicesListGroupBestUpdatesParameters
  ): Promise<
    | DevicesListGroupBestUpdates200Response
    | DevicesListGroupBestUpdatesdefaultResponse
  >;
}

export interface DevicesGetOperation {
  /** Retrieve operation status. */
  get(
    options?: DevicesGetOperationParameters
  ): Promise<
    | DevicesGetOperation200Response
    | DevicesGetOperation304Response
    | DevicesGetOperationdefaultResponse
  >;
}

export interface DevicesListOperations {
  /** Get a list of all device import operations. Completed operations are kept for 7 days before auto-deleted. */
  get(
    options?: DevicesListOperationsParameters
  ): Promise<
    DevicesListOperations200Response | DevicesListOperationsdefaultResponse
  >;
}

export interface DeploymentsListAllDeployments {
  /** Gets a list of deployments for a group. */
  get(
    options?: DeploymentsListAllDeploymentsParameters
  ): Promise<
    | DeploymentsListAllDeployments200Response
    | DeploymentsListAllDeploymentsdefaultResponse
  >;
}

export interface DeploymentsGetDeployment {
  /** Gets the properties of a deployment. */
  get(
    options?: DeploymentsGetDeploymentParameters
  ): Promise<
    | DeploymentsGetDeployment200Response
    | DeploymentsGetDeploymentdefaultResponse
  >;
  /** Creates or updates a deployment. */
  put(
    options: DeploymentsCreateOrUpdateDeploymentParameters
  ): Promise<
    | DeploymentsCreateOrUpdateDeployment200Response
    | DeploymentsCreateOrUpdateDeploymentdefaultResponse
  >;
  /** Deletes a deployment. */
  delete(
    options?: DeploymentsDeleteDeploymentParameters
  ): Promise<
    | DeploymentsDeleteDeployment204Response
    | DeploymentsDeleteDeploymentdefaultResponse
  >;
  /** Cancels a deployment. */
  post(
    options:
      | DeploymentsCancelDeploymentParameters
      | DeploymentsRetryDeploymentParameters
  ):
    | Promise<
        | DeploymentsCancelDeployment200Response
        | DeploymentsCancelDeploymentdefaultResponse
      >
    | Promise<
        | DeploymentsRetryDeployment200Response
        | DeploymentsRetryDeploymentdefaultResponse
      >;
}

export interface DeploymentsGetDeploymentStatus {
  /** Gets the status of a deployment including a breakdown of how many devices in the deployment are in progress, completed, or failed. */
  get(
    options?: DeploymentsGetDeploymentStatusParameters
  ): Promise<
    | DeploymentsGetDeploymentStatus200Response
    | DeploymentsGetDeploymentStatusdefaultResponse
  >;
}

export interface DeploymentsListDeploymentDevices {
  /** Gets a list of devices in a deployment along with their state. Useful for getting a list of failed devices. */
  get(
    options?: DeploymentsListDeploymentDevicesParameters
  ): Promise<
    | DeploymentsListDeploymentDevices200Response
    | DeploymentsListDeploymentDevicesdefaultResponse
  >;
}

export interface DiagnosticsUploadLog {
  /** Start the log upload operation on specified devices. */
  put(
    options: DiagnosticsUploadLogParameters
  ): Promise<
    DiagnosticsUploadLog201Response | DiagnosticsUploadLogdefaultResponse
  >;
  /** Get the diagnostics operation */
  get(
    options?: DiagnosticsGetOperationParameters
  ): Promise<
    DiagnosticsGetOperation200Response | DiagnosticsGetOperationdefaultResponse
  >;
}

export interface DiagnosticsGetOperationStatus {
  /** Get diagnostics operation status */
  get(
    options?: DiagnosticsGetOperationStatusParameters
  ): Promise<
    | DiagnosticsGetOperationStatus200Response
    | DiagnosticsGetOperationStatusdefaultResponse
  >;
}

export interface DiagnosticsListOperations {
  /** Get all diagnostics operations */
  get(
    options?: DiagnosticsListOperationsParameters
  ): Promise<
    | DiagnosticsListOperations200Response
    | DiagnosticsListOperationsdefaultResponse
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
  ): DevicesListDeviceClasses;
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
  ): DevicesListDeviceClassDeviceIds;
  /** Resource for '/deviceupdate/\{instanceId\}/management/deviceclasses/\{deviceClassId\}/installableupdates' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/deviceclasses/{deviceClassId}/installableupdates",
    instanceId: string,
    deviceClassId: string
  ): DevicesListDeviceClassInstallableUpdates;
  /** Resource for '/deviceupdate/\{instanceId\}/management/devices' has methods for the following verbs: get, post */
  (
    path: "/deviceupdate/{instanceId}/management/devices",
    instanceId: string
  ): DevicesListDevices;
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
  ): DevicesListDeviceTags;
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
  ): DevicesListGroups;
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
  ): DevicesListGroupBestUpdates;
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
  ): DevicesListOperations;
  /** Resource for '/deviceupdate/\{instanceId\}/management/groups/\{groupId\}/deployments' has methods for the following verbs: get */
  (
    path: "/deviceupdate/{instanceId}/management/groups/{groupId}/deployments",
    instanceId: string,
    groupId: string
  ): DeploymentsListAllDeployments;
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
  ): DeploymentsListDeploymentDevices;
  /** Resource for '/deviceupdate/\{instanceId\}/management/diagnostics/\{operationId\}' has methods for the following verbs: put, get */
  (
    path: "/deviceupdate/{instanceId}/management/diagnostics/{operationId}",
    instanceId: string,
    operationId: string
  ): DiagnosticsUploadLog;
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
  ): DiagnosticsListOperations;
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
