// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  DeploymentDeviceStatesListOutput,
  DeploymentOutput,
  DeploymentStatusOutput,
  DeploymentsListOutput,
  DeviceClassOutput,
  DeviceClassesListOutput,
  DeviceOperationOutput,
  DeviceOperationsListOutput,
  DeviceOutput,
  DeviceTagOutput,
  DeviceTagsListOutput,
  DevicesListOutput,
  ErrorResponseOutput,
  GroupOutput,
  GroupsListOutput,
  LogCollectionOperationDetailedStatusOutput,
  LogCollectionOperationListOutput,
  LogCollectionOperationOutput,
  StringsListOutput,
  UpdatableDevicesListOutput,
  UpdateComplianceOutput,
  UpdateFileOutput,
  UpdateIdsListOutput,
  UpdateListOutput,
  UpdateOperationOutput,
  UpdateOperationsListOutput,
  UpdateOutput,
} from "./outputModels";

export interface DeviceUpdateImportUpdate202Headers {
  /** Url to retrieve the import operation status. */
  "operation-location"?: string;
}

/** Import new update version. */
export interface DeviceUpdateImportUpdate202Response extends HttpResponse {
  status: "202";
  body: UpdateOutput;
  headers: RawHttpHeaders & DeviceUpdateImportUpdate202Headers;
}

/** Import new update version. */
export interface DeviceUpdateImportUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a list of all updates that have been imported to Device Update for IoT Hub. */
export interface DeviceUpdateListUpdates200Response extends HttpResponse {
  status: "200";
  body: UpdateListOutput;
}

/** Get a list of all updates that have been imported to Device Update for IoT Hub. */
export interface DeviceUpdateListUpdatesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a specific update version. */
export interface DeviceUpdateGetUpdate200Response extends HttpResponse {
  status: "200";
  body: UpdateOutput;
}

/** Get a specific update version. */
export interface DeviceUpdateGetUpdate304Response extends HttpResponse {
  status: "304";
  body: Record<string, unknown>;
}

/** Get a specific update version. */
export interface DeviceUpdateGetUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

export interface DeviceUpdateDeleteUpdate202Headers {
  /** Url to retrieve the operation status */
  "operation-location"?: string;
}

/** Delete a specific update version. */
export interface DeviceUpdateDeleteUpdate202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & DeviceUpdateDeleteUpdate202Headers;
}

/** Delete a specific update version. */
export interface DeviceUpdateDeleteUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a list of all update providers that have been imported to Device Update for IoT Hub. */
export interface DeviceUpdateListProviders200Response extends HttpResponse {
  status: "200";
  body: StringsListOutput;
}

/** Get a list of all update providers that have been imported to Device Update for IoT Hub. */
export interface DeviceUpdateListProvidersdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a list of all update names that match the specified provider. */
export interface DeviceUpdateListNames200Response extends HttpResponse {
  status: "200";
  body: StringsListOutput;
}

/** Get a list of all update names that match the specified provider. */
export interface DeviceUpdateListNamesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a list of all update versions that match the specified provider and name. */
export interface DeviceUpdateListVersions200Response extends HttpResponse {
  status: "200";
  body: StringsListOutput;
}

/** Get a list of all update versions that match the specified provider and name. */
export interface DeviceUpdateListVersionsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a list of all update file identifiers for the specified version. */
export interface DeviceUpdateListFiles200Response extends HttpResponse {
  status: "200";
  body: StringsListOutput;
}

/** Get a list of all update file identifiers for the specified version. */
export interface DeviceUpdateListFilesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a specific update file from the version. */
export interface DeviceUpdateGetFile200Response extends HttpResponse {
  status: "200";
  body: UpdateFileOutput;
}

/** Get a specific update file from the version. */
export interface DeviceUpdateGetFile304Response extends HttpResponse {
  status: "304";
  body: Record<string, unknown>;
}

/** Get a specific update file from the version. */
export interface DeviceUpdateGetFiledefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a list of all import update operations. Completed operations are kept for 7 days before auto-deleted. Delete operations are not returned by this API version. */
export interface DeviceUpdateListOperations200Response extends HttpResponse {
  status: "200";
  body: UpdateOperationsListOutput;
}

/** Get a list of all import update operations. Completed operations are kept for 7 days before auto-deleted. Delete operations are not returned by this API version. */
export interface DeviceUpdateListOperationsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

export interface DeviceUpdateGetOperation200Headers {
  /** Number of seconds to wait before checking the operation status again. */
  "retry-after"?: string;
}

/** Retrieve operation status. */
export interface DeviceUpdateGetOperation200Response extends HttpResponse {
  status: "200";
  body: UpdateOperationOutput;
  headers: RawHttpHeaders & DeviceUpdateGetOperation200Headers;
}

/** Retrieve operation status. */
export interface DeviceUpdateGetOperation304Response extends HttpResponse {
  status: "304";
  body: Record<string, unknown>;
}

/** Retrieve operation status. */
export interface DeviceUpdateGetOperationdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a list of all device classes (unique combinations of device manufacturer and model) for all devices connected to Device Update for IoT Hub. */
export interface DeviceManagementListDeviceClasses200Response extends HttpResponse {
  status: "200";
  body: DeviceClassesListOutput;
}

/** Gets a list of all device classes (unique combinations of device manufacturer and model) for all devices connected to Device Update for IoT Hub. */
export interface DeviceManagementListDeviceClassesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets the properties of a device class. */
export interface DeviceManagementGetDeviceClass200Response extends HttpResponse {
  status: "200";
  body: DeviceClassOutput;
}

/** Gets the properties of a device class. */
export interface DeviceManagementGetDeviceClassdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a list of installable updates for a device class. */
export interface DeviceManagementListInstallableUpdatesForDeviceClass200Response
  extends HttpResponse {
  status: "200";
  body: UpdateIdsListOutput;
}

/** Gets a list of installable updates for a device class. */
export interface DeviceManagementListInstallableUpdatesForDeviceClassdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a list of devices connected to Device Update for IoT Hub. */
export interface DeviceManagementListDevices200Response extends HttpResponse {
  status: "200";
  body: DevicesListOutput;
}

/** Gets a list of devices connected to Device Update for IoT Hub. */
export interface DeviceManagementListDevicesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

export interface DeviceManagementImportDevices202Headers {
  /** Url to retrieve the device import operation status. */
  "operation-location"?: string;
}

/** Import existing devices from IoT Hub. */
export interface DeviceManagementImportDevices202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & DeviceManagementImportDevices202Headers;
}

/** Import existing devices from IoT Hub. */
export interface DeviceManagementImportDevicesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets the device properties and latest deployment status for a device connected to Device Update for IoT Hub. */
export interface DeviceManagementGetDevice200Response extends HttpResponse {
  status: "200";
  body: DeviceOutput;
}

/** Gets the device properties and latest deployment status for a device connected to Device Update for IoT Hub. */
export interface DeviceManagementGetDevicedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets the device module properties and latest deployment status for a device module connected to Device Update for IoT Hub. */
export interface DeviceManagementGetDeviceModule200Response extends HttpResponse {
  status: "200";
  body: DeviceOutput;
}

/** Gets the device module properties and latest deployment status for a device module connected to Device Update for IoT Hub. */
export interface DeviceManagementGetDeviceModuledefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets the breakdown of how many devices are on their latest update, have new updates available, or are in progress receiving new updates. */
export interface DeviceManagementGetUpdateCompliance200Response extends HttpResponse {
  status: "200";
  body: UpdateComplianceOutput;
}

/** Gets the breakdown of how many devices are on their latest update, have new updates available, or are in progress receiving new updates. */
export interface DeviceManagementGetUpdateCompliancedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a list of available group device tags for all devices connected to Device Update for IoT Hub. */
export interface DeviceManagementListDeviceTags200Response extends HttpResponse {
  status: "200";
  body: DeviceTagsListOutput;
}

/** Gets a list of available group device tags for all devices connected to Device Update for IoT Hub. */
export interface DeviceManagementListDeviceTagsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a count of how many devices have a device tag. */
export interface DeviceManagementGetDeviceTag200Response extends HttpResponse {
  status: "200";
  body: DeviceTagOutput;
}

/** Gets a count of how many devices have a device tag. */
export interface DeviceManagementGetDeviceTagdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a list of all device groups. */
export interface DeviceManagementListGroups200Response extends HttpResponse {
  status: "200";
  body: GroupsListOutput;
}

/** Gets a list of all device groups. */
export interface DeviceManagementListGroupsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets the properties of a group. */
export interface DeviceManagementGetGroup200Response extends HttpResponse {
  status: "200";
  body: GroupOutput;
}

/** Gets the properties of a group. */
export interface DeviceManagementGetGroupdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Create or update a device group. */
export interface DeviceManagementCreateOrUpdateGroup200Response extends HttpResponse {
  status: "200";
  body: GroupOutput;
}

/** Create or update a device group. */
export interface DeviceManagementCreateOrUpdateGroupdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Deletes a device group. */
export interface DeviceManagementDeleteGroup204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a device group. */
export interface DeviceManagementDeleteGroupdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get group update compliance information such as how many devices are on their latest update, how many need new updates, and how many are in progress on receiving a new update. */
export interface DeviceManagementGetGroupUpdateCompliance200Response extends HttpResponse {
  status: "200";
  body: UpdateComplianceOutput;
}

/** Get group update compliance information such as how many devices are on their latest update, how many need new updates, and how many are in progress on receiving a new update. */
export interface DeviceManagementGetGroupUpdateCompliancedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the best available updates for a group and a count of how many devices need each update. */
export interface DeviceManagementListBestUpdatesForGroup200Response extends HttpResponse {
  status: "200";
  body: UpdatableDevicesListOutput;
}

/** Get the best available updates for a group and a count of how many devices need each update. */
export interface DeviceManagementListBestUpdatesForGroupdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a list of deployments for a group. */
export interface DeviceManagementListDeploymentsForGroup200Response extends HttpResponse {
  status: "200";
  body: DeploymentsListOutput;
}

/** Gets a list of deployments for a group. */
export interface DeviceManagementListDeploymentsForGroupdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets the properties of a deployment. */
export interface DeviceManagementGetDeployment200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Gets the properties of a deployment. */
export interface DeviceManagementGetDeploymentdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Creates or updates a deployment. */
export interface DeviceManagementCreateOrUpdateDeployment200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Creates or updates a deployment. */
export interface DeviceManagementCreateOrUpdateDeploymentdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Deletes a deployment. */
export interface DeviceManagementDeleteDeployment204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a deployment. */
export interface DeviceManagementDeleteDeploymentdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets the status of a deployment including a breakdown of how many devices in the deployment are in progress, completed, or failed. */
export interface DeviceManagementGetDeploymentStatus200Response extends HttpResponse {
  status: "200";
  body: DeploymentStatusOutput;
}

/** Gets the status of a deployment including a breakdown of how many devices in the deployment are in progress, completed, or failed. */
export interface DeviceManagementGetDeploymentStatusdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a list of devices in a deployment along with their state. Useful for getting a list of failed devices. */
export interface DeviceManagementListDeploymentDevices200Response extends HttpResponse {
  status: "200";
  body: DeploymentDeviceStatesListOutput;
}

/** Gets a list of devices in a deployment along with their state. Useful for getting a list of failed devices. */
export interface DeviceManagementListDeploymentDevicesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

export interface DeviceManagementGetOperation200Headers {
  /** Number of seconds to wait before checking the operation status again. */
  "retry-after"?: string;
}

/** Retrieve operation status. */
export interface DeviceManagementGetOperation200Response extends HttpResponse {
  status: "200";
  body: DeviceOperationOutput;
  headers: RawHttpHeaders & DeviceManagementGetOperation200Headers;
}

/** Retrieve operation status. */
export interface DeviceManagementGetOperation304Response extends HttpResponse {
  status: "304";
  body: Record<string, unknown>;
}

/** Retrieve operation status. */
export interface DeviceManagementGetOperationdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a list of all device import operations. Completed operations are kept for 7 days before auto-deleted. */
export interface DeviceManagementListOperations200Response extends HttpResponse {
  status: "200";
  body: DeviceOperationsListOutput;
}

/** Get a list of all device import operations. Completed operations are kept for 7 days before auto-deleted. */
export interface DeviceManagementListOperationsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Start the device diagnostics log collection operation on specified devices. */
export interface DeviceManagementCollectLogs201Response extends HttpResponse {
  status: "201";
  body: LogCollectionOperationOutput;
}

/** Start the device diagnostics log collection operation on specified devices. */
export interface DeviceManagementCollectLogsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the device diagnostics log collection operation */
export interface DeviceManagementGetLogCollectionOperation200Response extends HttpResponse {
  status: "200";
  body: LogCollectionOperationOutput;
}

/** Get the device diagnostics log collection operation */
export interface DeviceManagementGetLogCollectionOperationdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get all device diagnostics log collection operations */
export interface DeviceManagementListLogCollectionOperations200Response extends HttpResponse {
  status: "200";
  body: LogCollectionOperationListOutput;
}

/** Get all device diagnostics log collection operations */
export interface DeviceManagementListLogCollectionOperationsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get device diagnostics log collection operation with detailed status */
export interface DeviceManagementGetLogCollectionOperationDetailedStatus200Response
  extends HttpResponse {
  status: "200";
  body: LogCollectionOperationDetailedStatusOutput;
}

/** Get device diagnostics log collection operation with detailed status */
export interface DeviceManagementGetLogCollectionOperationDetailedStatusdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Stops a deployment. */
export interface DeviceManagementStopDeployment200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Stops a deployment. */
export interface DeviceManagementStopDeploymentdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Retries a deployment with failed devices. */
export interface DeviceManagementRetryDeployment200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Retries a deployment with failed devices. */
export interface DeviceManagementRetryDeploymentdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}
