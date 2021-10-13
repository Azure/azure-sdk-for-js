// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import {
  PageableListOfUpdateIds,
  Update,
  PageableListOfStrings,
  File,
  PageableListOfOperations,
  Operation,
  PageableListOfDeviceClasses,
  DeviceClass,
  PageableListOfDevices,
  Device,
  UpdateCompliance,
  PageableListOfDeviceTags,
  DeviceTag,
  PageableListOfGroups,
  Group,
  PageableListOfUpdatableDevices,
  DeviceOperation,
  PageableListOfDeviceOperations,
  PageableListOfDeployments,
  Deployment,
  DeploymentStatus,
  PageableListOfDeploymentDeviceStates,
  DiagnosticsOperation,
  DiagnosticsOperationStatus,
  PageableListOfDiagnosticsOperationStatus
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
export interface UpdatesImportUpdate429Response extends HttpResponse {
  status: "429";
  body: Record<string, unknown>;
}

/** Get a list of all update identities that have been imported to Device Update for IoT Hub. */
export interface UpdatesGetUpdateIds200Response extends HttpResponse {
  status: "200";
  body: PageableListOfUpdateIds;
}

/** Get a list of all update identities that have been imported to Device Update for IoT Hub. */
export interface UpdatesGetUpdateIds429Response extends HttpResponse {
  status: "429";
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
export interface UpdatesGetUpdate404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Get a specific update version. */
export interface UpdatesGetUpdate429Response extends HttpResponse {
  status: "429";
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
export interface UpdatesDeleteUpdate429Response extends HttpResponse {
  status: "429";
  body: Record<string, unknown>;
}

/** Get a list of all update providers that have been imported to Device Update for IoT Hub. */
export interface UpdatesGetProviders200Response extends HttpResponse {
  status: "200";
  body: PageableListOfStrings;
}

/** Get a list of all update providers that have been imported to Device Update for IoT Hub. */
export interface UpdatesGetProviders429Response extends HttpResponse {
  status: "429";
  body: Record<string, unknown>;
}

/** Get a list of all update names that match the specified provider. */
export interface UpdatesGetNames200Response extends HttpResponse {
  status: "200";
  body: PageableListOfStrings;
}

/** Get a list of all update names that match the specified provider. */
export interface UpdatesGetNames404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Get a list of all update names that match the specified provider. */
export interface UpdatesGetNames429Response extends HttpResponse {
  status: "429";
  body: Record<string, unknown>;
}

/** Get a list of all update versions that match the specified provider and name. */
export interface UpdatesGetVersions200Response extends HttpResponse {
  status: "200";
  body: PageableListOfStrings;
}

/** Get a list of all update versions that match the specified provider and name. */
export interface UpdatesGetVersions404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Get a list of all update versions that match the specified provider and name. */
export interface UpdatesGetVersions429Response extends HttpResponse {
  status: "429";
  body: Record<string, unknown>;
}

/** Get a list of all update file identifiers for the specified version. */
export interface UpdatesGetFiles200Response extends HttpResponse {
  status: "200";
  body: PageableListOfStrings;
}

/** Get a list of all update file identifiers for the specified version. */
export interface UpdatesGetFiles404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Get a list of all update file identifiers for the specified version. */
export interface UpdatesGetFiles429Response extends HttpResponse {
  status: "429";
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
export interface UpdatesGetFile404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Get a specific update file from the version. */
export interface UpdatesGetFile429Response extends HttpResponse {
  status: "429";
  body: Record<string, unknown>;
}

/** Get a list of all import update operations. Completed operations are kept for 7 days before auto-deleted. Delete operations are not returned by this API version. */
export interface UpdatesGetOperations200Response extends HttpResponse {
  status: "200";
  body: PageableListOfOperations;
}

/** Get a list of all import update operations. Completed operations are kept for 7 days before auto-deleted. Delete operations are not returned by this API version. */
export interface UpdatesGetOperations429Response extends HttpResponse {
  status: "429";
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
export interface UpdatesGetOperation404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Retrieve operation status. */
export interface UpdatesGetOperation429Response extends HttpResponse {
  status: "429";
  body: Record<string, unknown>;
}

/** Gets a list of all device classes (unique combinations of device manufacturer and model) for all devices connected to Device Update for IoT Hub. */
export interface DevicesGetAllDeviceClasses200Response extends HttpResponse {
  status: "200";
  body: PageableListOfDeviceClasses;
}

/** Gets the properties of a device class. */
export interface DevicesGetDeviceClass200Response extends HttpResponse {
  status: "200";
  body: DeviceClass;
}

/** Gets the properties of a device class. */
export interface DevicesGetDeviceClass404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Gets a list of device identifiers in a device class. */
export interface DevicesGetDeviceClassDeviceIds200Response
  extends HttpResponse {
  status: "200";
  body: PageableListOfStrings;
}

/** Gets a list of device identifiers in a device class. */
export interface DevicesGetDeviceClassDeviceIds404Response
  extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Gets a list of installable updates for a device class. */
export interface DevicesGetDeviceClassInstallableUpdates200Response
  extends HttpResponse {
  status: "200";
  body: PageableListOfUpdateIds;
}

/** Gets a list of installable updates for a device class. */
export interface DevicesGetDeviceClassInstallableUpdates404Response
  extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Gets a list of devices connected to Device Update for IoT Hub. */
export interface DevicesGetAllDevices200Response extends HttpResponse {
  status: "200";
  body: PageableListOfDevices;
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
export interface DevicesImportDevices400Response extends HttpResponse {
  status: "400";
  body: Record<string, unknown>;
}

/** Import existing devices from IoT Hub. */
export interface DevicesImportDevices429Response extends HttpResponse {
  status: "429";
  body: Record<string, unknown>;
}

/** Gets the device properties and latest deployment status for a device connected to Device Update for IoT Hub. */
export interface DevicesGetDevice200Response extends HttpResponse {
  status: "200";
  body: Device;
}

/** Gets the device properties and latest deployment status for a device connected to Device Update for IoT Hub. */
export interface DevicesGetDevice404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Gets the breakdown of how many devices are on their latest update, have new updates available, or are in progress receiving new updates. */
export interface DevicesGetUpdateCompliance200Response extends HttpResponse {
  status: "200";
  body: UpdateCompliance;
}

/** Gets a list of available group device tags for all devices connected to Device Update for IoT Hub. */
export interface DevicesGetAllDeviceTags200Response extends HttpResponse {
  status: "200";
  body: PageableListOfDeviceTags;
}

/** Gets a count of how many devices have a device tag. */
export interface DevicesGetDeviceTag200Response extends HttpResponse {
  status: "200";
  body: DeviceTag;
}

/** Gets a count of how many devices have a device tag. */
export interface DevicesGetDeviceTag404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Gets a list of all device groups. */
export interface DevicesGetAllGroups200Response extends HttpResponse {
  status: "200";
  body: PageableListOfGroups;
}

/** Gets the properties of a group. */
export interface DevicesGetGroup200Response extends HttpResponse {
  status: "200";
  body: Group;
}

/** Gets the properties of a group. */
export interface DevicesGetGroup404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Create or update a device group. */
export interface DevicesCreateOrUpdateGroup200Response extends HttpResponse {
  status: "200";
  body: Group;
}

/** Create or update a device group. */
export interface DevicesCreateOrUpdateGroup400Response extends HttpResponse {
  status: "400";
  body: Record<string, unknown>;
}

/** Create or update a device group. */
export interface DevicesCreateOrUpdateGroup404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Deletes a device group. */
export interface DevicesDeleteGroup200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a device group. */
export interface DevicesDeleteGroup204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Get group update compliance information such as how many devices are on their latest update, how many need new updates, and how many are in progress on receiving a new update. */
export interface DevicesGetGroupUpdateCompliance200Response
  extends HttpResponse {
  status: "200";
  body: UpdateCompliance;
}

/** Get group update compliance information such as how many devices are on their latest update, how many need new updates, and how many are in progress on receiving a new update. */
export interface DevicesGetGroupUpdateCompliance404Response
  extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Get the best available updates for a group and a count of how many devices need each update. */
export interface DevicesGetGroupBestUpdates200Response extends HttpResponse {
  status: "200";
  body: PageableListOfUpdatableDevices;
}

/** Get the best available updates for a group and a count of how many devices need each update. */
export interface DevicesGetGroupBestUpdates404Response extends HttpResponse {
  status: "404";
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
export interface DevicesGetOperation404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Retrieve operation status. */
export interface DevicesGetOperation429Response extends HttpResponse {
  status: "429";
  body: Record<string, unknown>;
}

/** Get a list of all device import operations. Completed operations are kept for 7 days before auto-deleted. */
export interface DevicesGetOperations200Response extends HttpResponse {
  status: "200";
  body: PageableListOfDeviceOperations;
}

/** Get a list of all device import operations. Completed operations are kept for 7 days before auto-deleted. */
export interface DevicesGetOperations429Response extends HttpResponse {
  status: "429";
  body: Record<string, unknown>;
}

/** Gets a list of deployments for a group. */
export interface DeploymentsGetAllDeployments200Response extends HttpResponse {
  status: "200";
  body: PageableListOfDeployments;
}

/** Gets the properties of a deployment. */
export interface DeploymentsGetDeployment200Response extends HttpResponse {
  status: "200";
  body: Deployment;
}

/** Gets the properties of a deployment. */
export interface DeploymentsGetDeployment404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Creates or updates a deployment. */
export interface DeploymentsCreateOrUpdateDeployment200Response
  extends HttpResponse {
  status: "200";
  body: Deployment;
}

/** Creates or updates a deployment. */
export interface DeploymentsCreateOrUpdateDeployment400Response
  extends HttpResponse {
  status: "400";
  body: Record<string, unknown>;
}

/** Creates or updates a deployment. */
export interface DeploymentsCreateOrUpdateDeployment404Response
  extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Deletes a deployment. */
export interface DeploymentsDeleteDeployment200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a deployment. */
export interface DeploymentsDeleteDeployment404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Gets the status of a deployment including a breakdown of how many devices in the deployment are in progress, completed, or failed. */
export interface DeploymentsGetDeploymentStatus200Response
  extends HttpResponse {
  status: "200";
  body: DeploymentStatus;
}

/** Gets the status of a deployment including a breakdown of how many devices in the deployment are in progress, completed, or failed. */
export interface DeploymentsGetDeploymentStatus404Response
  extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Gets a list of devices in a deployment along with their state. Useful for getting a list of failed devices. */
export interface DeploymentsGetDeploymentDevices200Response
  extends HttpResponse {
  status: "200";
  body: PageableListOfDeploymentDeviceStates;
}

/** Gets a list of devices in a deployment along with their state. Useful for getting a list of failed devices. */
export interface DeploymentsGetDeploymentDevices404Response
  extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Cancels a deployment. */
export interface DeploymentsCancelDeployment200Response extends HttpResponse {
  status: "200";
  body: Deployment;
}

/** Cancels a deployment. */
export interface DeploymentsCancelDeployment404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Retries a deployment with failed devices. */
export interface DeploymentsRetryDeployment200Response extends HttpResponse {
  status: "200";
  body: Deployment;
}

/** Retries a deployment with failed devices. */
export interface DeploymentsRetryDeployment404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Start the log upload operation on specified devices. */
export interface DiagnosticsPutOperation201Response extends HttpResponse {
  status: "201";
  body: DiagnosticsOperation;
}

/** Start the log upload operation on specified devices. */
export interface DiagnosticsPutOperation409Response extends HttpResponse {
  status: "409";
  body: Record<string, unknown>;
}

/** Get the diagnostics operation */
export interface DiagnosticsGetOperation200Response extends HttpResponse {
  status: "200";
  body: DiagnosticsOperation;
}

/** Get diagnostics operation status */
export interface DiagnosticsGetOperationStatus200Response extends HttpResponse {
  status: "200";
  body: DiagnosticsOperationStatus;
}

/** Get all diagnostics operations */
export interface DiagnosticsGetOperations200Response extends HttpResponse {
  status: "200";
  body: PageableListOfDiagnosticsOperationStatus;
}
