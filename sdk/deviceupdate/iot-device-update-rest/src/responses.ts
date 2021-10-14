// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import {
  UpdateIdsList,
  Update,
  StringsList,
  File,
  UpdateOperationsList,
  Operation,
  DeviceClassesList,
  DeviceClass,
  DevicesList,
  Device,
  UpdateCompliance,
  DeviceTagsList,
  DeviceTag,
  GroupsList,
  Group,
  UpdatableDevicesList,
  DeviceOperation,
  DeviceOperationsList,
  DeploymentsList,
  Deployment,
  DeploymentStatus,
  DeploymentDeviceStatesList,
  DiagnosticsOperation,
  DiagnosticsOperationStatus,
  DiagnosticsOperationStatusList,
} from "./models";

export interface UpdatesImportUpdate202Headers {
  /** Url to retrieve the import operation status. */
  "operation-location"?: string;
}

/** Import new update version. */
export interface UpdatesImportUpdate202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & UpdatesImportUpdate202Headers;
}

/** Import new update version. */
export interface UpdatesImportUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Get a list of all update identities that have been imported to Device Update for IoT Hub. */
export interface UpdatesListUpdateIds200Response extends HttpResponse {
  status: "200";
  body: UpdateIdsList;
}

/** Get a list of all update identities that have been imported to Device Update for IoT Hub. */
export interface UpdatesListUpdateIdsdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Get a specific update version. */
export interface UpdatesGetUpdate200Response extends HttpResponse {
  status: "200";
  body: Update;
}

/** Get a specific update version. */
export interface UpdatesGetUpdate304Response extends HttpResponse {
  status: "304";
  body: Record<string, unknown>;
}

/** Get a specific update version. */
export interface UpdatesGetUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

export interface UpdatesDeleteUpdate202Headers {
  /** Url to retrieve the operation status */
  "operation-location"?: string;
}

/** Delete a specific update version. */
export interface UpdatesDeleteUpdate202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & UpdatesDeleteUpdate202Headers;
}

/** Delete a specific update version. */
export interface UpdatesDeleteUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Get a list of all update providers that have been imported to Device Update for IoT Hub. */
export interface UpdatesListProviders200Response extends HttpResponse {
  status: "200";
  body: StringsList;
}

/** Get a list of all update providers that have been imported to Device Update for IoT Hub. */
export interface UpdatesListProvidersdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Get a list of all update names that match the specified provider. */
export interface UpdatesListNames200Response extends HttpResponse {
  status: "200";
  body: StringsList;
}

/** Get a list of all update names that match the specified provider. */
export interface UpdatesListNamesdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Get a list of all update versions that match the specified provider and name. */
export interface UpdatesListVersions200Response extends HttpResponse {
  status: "200";
  body: StringsList;
}

/** Get a list of all update versions that match the specified provider and name. */
export interface UpdatesListVersionsdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Get a list of all update file identifiers for the specified version. */
export interface UpdatesListFiles200Response extends HttpResponse {
  status: "200";
  body: StringsList;
}

/** Get a list of all update file identifiers for the specified version. */
export interface UpdatesListFilesdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Get a specific update file from the version. */
export interface UpdatesGetFile200Response extends HttpResponse {
  status: "200";
  body: File;
}

/** Get a specific update file from the version. */
export interface UpdatesGetFile304Response extends HttpResponse {
  status: "304";
  body: Record<string, unknown>;
}

/** Get a specific update file from the version. */
export interface UpdatesGetFiledefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Get a list of all import update operations. Completed operations are kept for 7 days before auto-deleted. Delete operations are not returned by this API version. */
export interface UpdatesListOperations200Response extends HttpResponse {
  status: "200";
  body: UpdateOperationsList;
}

/** Get a list of all import update operations. Completed operations are kept for 7 days before auto-deleted. Delete operations are not returned by this API version. */
export interface UpdatesListOperationsdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

export interface UpdatesGetOperation200Headers {
  /** Number of seconds to wait before checking the operation status again. */
  "retry-after"?: string;
}

/** Retrieve operation status. */
export interface UpdatesGetOperation200Response extends HttpResponse {
  status: "200";
  body: Operation;
  headers: RawHttpHeaders & UpdatesGetOperation200Headers;
}

/** Retrieve operation status. */
export interface UpdatesGetOperation304Response extends HttpResponse {
  status: "304";
  body: Record<string, unknown>;
}

/** Retrieve operation status. */
export interface UpdatesGetOperationdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Gets a list of all device classes (unique combinations of device manufacturer and model) for all devices connected to Device Update for IoT Hub. */
export interface DevicesListDeviceClasses200Response extends HttpResponse {
  status: "200";
  body: DeviceClassesList;
}

/** Gets a list of all device classes (unique combinations of device manufacturer and model) for all devices connected to Device Update for IoT Hub. */
export interface DevicesListDeviceClassesdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Gets the properties of a device class. */
export interface DevicesGetDeviceClass200Response extends HttpResponse {
  status: "200";
  body: DeviceClass;
}

/** Gets the properties of a device class. */
export interface DevicesGetDeviceClassdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Gets a list of device identifiers in a device class. */
export interface DevicesListDeviceClassDeviceIds200Response extends HttpResponse {
  status: "200";
  body: StringsList;
}

/** Gets a list of device identifiers in a device class. */
export interface DevicesListDeviceClassDeviceIdsdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Gets a list of installable updates for a device class. */
export interface DevicesListDeviceClassInstallableUpdates200Response extends HttpResponse {
  status: "200";
  body: UpdateIdsList;
}

/** Gets a list of installable updates for a device class. */
export interface DevicesListDeviceClassInstallableUpdatesdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Gets a list of devices connected to Device Update for IoT Hub. */
export interface DevicesListDevices200Response extends HttpResponse {
  status: "200";
  body: DevicesList;
}

/** Gets a list of devices connected to Device Update for IoT Hub. */
export interface DevicesListDevicesdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

export interface DevicesImportDevices202Headers {
  /** Url to retrieve the device import operation status. */
  "operation-location"?: string;
}

/** Import existing devices from IoT Hub. */
export interface DevicesImportDevices202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & DevicesImportDevices202Headers;
}

/** Import existing devices from IoT Hub. */
export interface DevicesImportDevicesdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Gets the device properties and latest deployment status for a device connected to Device Update for IoT Hub. */
export interface DevicesGetDevice200Response extends HttpResponse {
  status: "200";
  body: Device;
}

/** Gets the device properties and latest deployment status for a device connected to Device Update for IoT Hub. */
export interface DevicesGetDevicedefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Gets the breakdown of how many devices are on their latest update, have new updates available, or are in progress receiving new updates. */
export interface DevicesGetUpdateCompliance200Response extends HttpResponse {
  status: "200";
  body: UpdateCompliance;
}

/** Gets the breakdown of how many devices are on their latest update, have new updates available, or are in progress receiving new updates. */
export interface DevicesGetUpdateCompliancedefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Gets a list of available group device tags for all devices connected to Device Update for IoT Hub. */
export interface DevicesListDeviceTags200Response extends HttpResponse {
  status: "200";
  body: DeviceTagsList;
}

/** Gets a list of available group device tags for all devices connected to Device Update for IoT Hub. */
export interface DevicesListDeviceTagsdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Gets a count of how many devices have a device tag. */
export interface DevicesGetDeviceTag200Response extends HttpResponse {
  status: "200";
  body: DeviceTag;
}

/** Gets a count of how many devices have a device tag. */
export interface DevicesGetDeviceTagdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Gets a list of all device groups. */
export interface DevicesListGroups200Response extends HttpResponse {
  status: "200";
  body: GroupsList;
}

/** Gets a list of all device groups. */
export interface DevicesListGroupsdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Gets the properties of a group. */
export interface DevicesGetGroup200Response extends HttpResponse {
  status: "200";
  body: Group;
}

/** Gets the properties of a group. */
export interface DevicesGetGroupdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Create or update a device group. */
export interface DevicesCreateOrUpdateGroup200Response extends HttpResponse {
  status: "200";
  body: Group;
}

/** Create or update a device group. */
export interface DevicesCreateOrUpdateGroupdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Deletes a device group. */
export interface DevicesDeleteGroup204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a device group. */
export interface DevicesDeleteGroupdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Get group update compliance information such as how many devices are on their latest update, how many need new updates, and how many are in progress on receiving a new update. */
export interface DevicesGetGroupUpdateCompliance200Response extends HttpResponse {
  status: "200";
  body: UpdateCompliance;
}

/** Get group update compliance information such as how many devices are on their latest update, how many need new updates, and how many are in progress on receiving a new update. */
export interface DevicesGetGroupUpdateCompliancedefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Get the best available updates for a group and a count of how many devices need each update. */
export interface DevicesListGroupBestUpdates200Response extends HttpResponse {
  status: "200";
  body: UpdatableDevicesList;
}

/** Get the best available updates for a group and a count of how many devices need each update. */
export interface DevicesListGroupBestUpdatesdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

export interface DevicesGetOperation200Headers {
  /** Number of seconds to wait before checking the operation status again. */
  "retry-after"?: string;
}

/** Retrieve operation status. */
export interface DevicesGetOperation200Response extends HttpResponse {
  status: "200";
  body: DeviceOperation;
  headers: RawHttpHeaders & DevicesGetOperation200Headers;
}

/** Retrieve operation status. */
export interface DevicesGetOperation304Response extends HttpResponse {
  status: "304";
  body: Record<string, unknown>;
}

/** Retrieve operation status. */
export interface DevicesGetOperationdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Get a list of all device import operations. Completed operations are kept for 7 days before auto-deleted. */
export interface DevicesListOperations200Response extends HttpResponse {
  status: "200";
  body: DeviceOperationsList;
}

/** Get a list of all device import operations. Completed operations are kept for 7 days before auto-deleted. */
export interface DevicesListOperationsdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Gets a list of deployments for a group. */
export interface DeploymentsListAllDeployments200Response extends HttpResponse {
  status: "200";
  body: DeploymentsList;
}

/** Gets a list of deployments for a group. */
export interface DeploymentsListAllDeploymentsdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Gets the properties of a deployment. */
export interface DeploymentsGetDeployment200Response extends HttpResponse {
  status: "200";
  body: Deployment;
}

/** Gets the properties of a deployment. */
export interface DeploymentsGetDeploymentdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Creates or updates a deployment. */
export interface DeploymentsCreateOrUpdateDeployment200Response extends HttpResponse {
  status: "200";
  body: Deployment;
}

/** Creates or updates a deployment. */
export interface DeploymentsCreateOrUpdateDeploymentdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Deletes a deployment. */
export interface DeploymentsDeleteDeployment204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a deployment. */
export interface DeploymentsDeleteDeploymentdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Gets the status of a deployment including a breakdown of how many devices in the deployment are in progress, completed, or failed. */
export interface DeploymentsGetDeploymentStatus200Response extends HttpResponse {
  status: "200";
  body: DeploymentStatus;
}

/** Gets the status of a deployment including a breakdown of how many devices in the deployment are in progress, completed, or failed. */
export interface DeploymentsGetDeploymentStatusdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Gets a list of devices in a deployment along with their state. Useful for getting a list of failed devices. */
export interface DeploymentsListDeploymentDevices200Response extends HttpResponse {
  status: "200";
  body: DeploymentDeviceStatesList;
}

/** Gets a list of devices in a deployment along with their state. Useful for getting a list of failed devices. */
export interface DeploymentsListDeploymentDevicesdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Cancels a deployment. */
export interface DeploymentsCancelDeployment200Response extends HttpResponse {
  status: "200";
  body: Deployment;
}

/** Cancels a deployment. */
export interface DeploymentsCancelDeploymentdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Retries a deployment with failed devices. */
export interface DeploymentsRetryDeployment200Response extends HttpResponse {
  status: "200";
  body: Deployment;
}

/** Retries a deployment with failed devices. */
export interface DeploymentsRetryDeploymentdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Start the log upload operation on specified devices. */
export interface DiagnosticsUploadLog201Response extends HttpResponse {
  status: "201";
  body: DiagnosticsOperation;
}

/** Start the log upload operation on specified devices. */
export interface DiagnosticsUploadLogdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Get the diagnostics operation */
export interface DiagnosticsGetOperation200Response extends HttpResponse {
  status: "200";
  body: DiagnosticsOperation;
}

/** Get the diagnostics operation */
export interface DiagnosticsGetOperationdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Get diagnostics operation status */
export interface DiagnosticsGetOperationStatus200Response extends HttpResponse {
  status: "200";
  body: DiagnosticsOperationStatus;
}

/** Get diagnostics operation status */
export interface DiagnosticsGetOperationStatusdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Get all diagnostics operations */
export interface DiagnosticsListOperations200Response extends HttpResponse {
  status: "200";
  body: DiagnosticsOperationStatusList;
}

/** Get all diagnostics operations */
export interface DiagnosticsListOperationsdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}
