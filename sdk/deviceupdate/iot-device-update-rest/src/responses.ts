// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  UpdateOutput,
  ErrorResponseOutput,
  UpdateListOutput,
  StringsListOutput,
  UpdateFileOutput,
  UpdateOperationsListOutput,
  UpdateOperationOutput,
  DeviceClassesListOutput,
  DeviceClassOutput,
  UpdateIdsListOutput,
  DevicesListOutput,
  DeviceOutput,
  UpdateComplianceOutput,
  DeviceTagsListOutput,
  DeviceTagOutput,
  GroupsListOutput,
  GroupOutput,
  UpdatableDevicesListOutput,
  DeploymentsListOutput,
  DeploymentOutput,
  DeploymentStatusOutput,
  DeploymentDeviceStatesListOutput,
  DeviceOperationOutput,
  DeviceOperationsListOutput,
  LogCollectionOperationOutput,
  LogCollectionOperationListOutput,
  LogCollectionOperationDetailedStatusOutput
} from "./outputModels";

export interface UpdatesImportUpdate202Headers {
  /** Url to retrieve the import operation status. */
  "operation-location"?: string;
}

/** Import new update version. */
export interface UpdatesImportUpdate202Response extends HttpResponse {
  status: "202";
  body: UpdateOutput;
  headers: RawHttpHeaders & UpdatesImportUpdate202Headers;
}

/** Import new update version. */
export interface UpdatesImportUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a list of all updates that have been imported to Device Update for IoT Hub. */
export interface UpdatesListUpdates200Response extends HttpResponse {
  status: "200";
  body: UpdateListOutput;
}

/** Get a list of all updates that have been imported to Device Update for IoT Hub. */
export interface UpdatesListUpdatesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a specific update version. */
export interface UpdatesGetUpdate200Response extends HttpResponse {
  status: "200";
  body: UpdateOutput;
}

/** Get a specific update version. */
export interface UpdatesGetUpdate304Response extends HttpResponse {
  status: "304";
  body: Record<string, unknown>;
}

/** Get a specific update version. */
export interface UpdatesGetUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
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
  body: ErrorResponseOutput;
}

/** Get a list of all update providers that have been imported to Device Update for IoT Hub. */
export interface UpdatesListProviders200Response extends HttpResponse {
  status: "200";
  body: StringsListOutput;
}

/** Get a list of all update providers that have been imported to Device Update for IoT Hub. */
export interface UpdatesListProvidersdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a list of all update names that match the specified provider. */
export interface UpdatesListNames200Response extends HttpResponse {
  status: "200";
  body: StringsListOutput;
}

/** Get a list of all update names that match the specified provider. */
export interface UpdatesListNamesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a list of all update versions that match the specified provider and name. */
export interface UpdatesListVersions200Response extends HttpResponse {
  status: "200";
  body: StringsListOutput;
}

/** Get a list of all update versions that match the specified provider and name. */
export interface UpdatesListVersionsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a list of all update file identifiers for the specified version. */
export interface UpdatesListFiles200Response extends HttpResponse {
  status: "200";
  body: StringsListOutput;
}

/** Get a list of all update file identifiers for the specified version. */
export interface UpdatesListFilesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a specific update file from the version. */
export interface UpdatesGetFile200Response extends HttpResponse {
  status: "200";
  body: UpdateFileOutput;
}

/** Get a specific update file from the version. */
export interface UpdatesGetFile304Response extends HttpResponse {
  status: "304";
  body: Record<string, unknown>;
}

/** Get a specific update file from the version. */
export interface UpdatesGetFiledefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a list of all import update operations. Completed operations are kept for 7 days before auto-deleted. Delete operations are not returned by this API version. */
export interface UpdatesListOperations200Response extends HttpResponse {
  status: "200";
  body: UpdateOperationsListOutput;
}

/** Get a list of all import update operations. Completed operations are kept for 7 days before auto-deleted. Delete operations are not returned by this API version. */
export interface UpdatesListOperationsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

export interface UpdatesGetOperation200Headers {
  /** Number of seconds to wait before checking the operation status again. */
  "retry-after"?: string;
}

/** Retrieve operation status. */
export interface UpdatesGetOperation200Response extends HttpResponse {
  status: "200";
  body: UpdateOperationOutput;
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
  body: ErrorResponseOutput;
}

/** Gets a list of all device classes (unique combinations of device manufacturer and model) for all devices connected to Device Update for IoT Hub. */
export interface ManagementListDeviceClasses200Response extends HttpResponse {
  status: "200";
  body: DeviceClassesListOutput;
}

/** Gets a list of all device classes (unique combinations of device manufacturer and model) for all devices connected to Device Update for IoT Hub. */
export interface ManagementListDeviceClassesdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets the properties of a device class. */
export interface ManagementGetDeviceClass200Response extends HttpResponse {
  status: "200";
  body: DeviceClassOutput;
}

/** Gets the properties of a device class. */
export interface ManagementGetDeviceClassdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a list of installable updates for a device class. */
export interface ManagementListInstallableUpdatesForDeviceClass200Response
  extends HttpResponse {
  status: "200";
  body: UpdateIdsListOutput;
}

/** Gets a list of installable updates for a device class. */
export interface ManagementListInstallableUpdatesForDeviceClassdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a list of devices connected to Device Update for IoT Hub. */
export interface ManagementListDevices200Response extends HttpResponse {
  status: "200";
  body: DevicesListOutput;
}

/** Gets a list of devices connected to Device Update for IoT Hub. */
export interface ManagementListDevicesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

export interface ManagementImportDevices202Headers {
  /** Url to retrieve the device import operation status. */
  "operation-location"?: string;
}

/** Import existing devices from IoT Hub. */
export interface ManagementImportDevices202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & ManagementImportDevices202Headers;
}

/** Import existing devices from IoT Hub. */
export interface ManagementImportDevicesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets the device properties and latest deployment status for a device connected to Device Update for IoT Hub. */
export interface ManagementGetDevice200Response extends HttpResponse {
  status: "200";
  body: DeviceOutput;
}

/** Gets the device properties and latest deployment status for a device connected to Device Update for IoT Hub. */
export interface ManagementGetDevicedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets the device module properties and latest deployment status for a device module connected to Device Update for IoT Hub. */
export interface ManagementGetDeviceModule200Response extends HttpResponse {
  status: "200";
  body: DeviceOutput;
}

/** Gets the device module properties and latest deployment status for a device module connected to Device Update for IoT Hub. */
export interface ManagementGetDeviceModuledefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets the breakdown of how many devices are on their latest update, have new updates available, or are in progress receiving new updates. */
export interface ManagementGetUpdateCompliance200Response extends HttpResponse {
  status: "200";
  body: UpdateComplianceOutput;
}

/** Gets the breakdown of how many devices are on their latest update, have new updates available, or are in progress receiving new updates. */
export interface ManagementGetUpdateCompliancedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a list of available group device tags for all devices connected to Device Update for IoT Hub. */
export interface ManagementListDeviceTags200Response extends HttpResponse {
  status: "200";
  body: DeviceTagsListOutput;
}

/** Gets a list of available group device tags for all devices connected to Device Update for IoT Hub. */
export interface ManagementListDeviceTagsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a count of how many devices have a device tag. */
export interface ManagementGetDeviceTag200Response extends HttpResponse {
  status: "200";
  body: DeviceTagOutput;
}

/** Gets a count of how many devices have a device tag. */
export interface ManagementGetDeviceTagdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a list of all device groups. */
export interface ManagementListGroups200Response extends HttpResponse {
  status: "200";
  body: GroupsListOutput;
}

/** Gets a list of all device groups. */
export interface ManagementListGroupsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets the properties of a group. */
export interface ManagementGetGroup200Response extends HttpResponse {
  status: "200";
  body: GroupOutput;
}

/** Gets the properties of a group. */
export interface ManagementGetGroupdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Create or update a device group. */
export interface ManagementCreateOrUpdateGroup200Response extends HttpResponse {
  status: "200";
  body: GroupOutput;
}

/** Create or update a device group. */
export interface ManagementCreateOrUpdateGroupdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Deletes a device group. */
export interface ManagementDeleteGroup204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a device group. */
export interface ManagementDeleteGroupdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get group update compliance information such as how many devices are on their latest update, how many need new updates, and how many are in progress on receiving a new update. */
export interface ManagementGetGroupUpdateCompliance200Response
  extends HttpResponse {
  status: "200";
  body: UpdateComplianceOutput;
}

/** Get group update compliance information such as how many devices are on their latest update, how many need new updates, and how many are in progress on receiving a new update. */
export interface ManagementGetGroupUpdateCompliancedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the best available updates for a group and a count of how many devices need each update. */
export interface ManagementListBestUpdatesForGroup200Response
  extends HttpResponse {
  status: "200";
  body: UpdatableDevicesListOutput;
}

/** Get the best available updates for a group and a count of how many devices need each update. */
export interface ManagementListBestUpdatesForGroupdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a list of deployments for a group. */
export interface ManagementListDeploymentsForGroup200Response
  extends HttpResponse {
  status: "200";
  body: DeploymentsListOutput;
}

/** Gets a list of deployments for a group. */
export interface ManagementListDeploymentsForGroupdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets the properties of a deployment. */
export interface ManagementGetDeployment200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Gets the properties of a deployment. */
export interface ManagementGetDeploymentdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Creates or updates a deployment. */
export interface ManagementCreateOrUpdateDeployment200Response
  extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Creates or updates a deployment. */
export interface ManagementCreateOrUpdateDeploymentdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Deletes a deployment. */
export interface ManagementDeleteDeployment204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a deployment. */
export interface ManagementDeleteDeploymentdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets the status of a deployment including a breakdown of how many devices in the deployment are in progress, completed, or failed. */
export interface ManagementGetDeploymentStatus200Response extends HttpResponse {
  status: "200";
  body: DeploymentStatusOutput;
}

/** Gets the status of a deployment including a breakdown of how many devices in the deployment are in progress, completed, or failed. */
export interface ManagementGetDeploymentStatusdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a list of devices in a deployment along with their state. Useful for getting a list of failed devices. */
export interface ManagementListDeploymentDevices200Response
  extends HttpResponse {
  status: "200";
  body: DeploymentDeviceStatesListOutput;
}

/** Gets a list of devices in a deployment along with their state. Useful for getting a list of failed devices. */
export interface ManagementListDeploymentDevicesdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

export interface ManagementGetOperation200Headers {
  /** Number of seconds to wait before checking the operation status again. */
  "retry-after"?: string;
}

/** Retrieve operation status. */
export interface ManagementGetOperation200Response extends HttpResponse {
  status: "200";
  body: DeviceOperationOutput;
  headers: RawHttpHeaders & ManagementGetOperation200Headers;
}

/** Retrieve operation status. */
export interface ManagementGetOperation304Response extends HttpResponse {
  status: "304";
  body: Record<string, unknown>;
}

/** Retrieve operation status. */
export interface ManagementGetOperationdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a list of all device import operations. Completed operations are kept for 7 days before auto-deleted. */
export interface ManagementListOperations200Response extends HttpResponse {
  status: "200";
  body: DeviceOperationsListOutput;
}

/** Get a list of all device import operations. Completed operations are kept for 7 days before auto-deleted. */
export interface ManagementListOperationsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Start the device diagnostics log collection operation on specified devices. */
export interface ManagementCollectLogs201Response extends HttpResponse {
  status: "201";
  body: LogCollectionOperationOutput;
}

/** Start the device diagnostics log collection operation on specified devices. */
export interface ManagementCollectLogsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the device diagnostics log collection operation */
export interface ManagementGetLogCollectionOperation200Response
  extends HttpResponse {
  status: "200";
  body: LogCollectionOperationOutput;
}

/** Get the device diagnostics log collection operation */
export interface ManagementGetLogCollectionOperationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get all device diagnostics log collection operations */
export interface ManagementListLogCollectionOperations200Response
  extends HttpResponse {
  status: "200";
  body: LogCollectionOperationListOutput;
}

/** Get all device diagnostics log collection operations */
export interface ManagementListLogCollectionOperationsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get device diagnostics log collection operation with detailed status */
export interface ManagementGetLogCollectionOperationDetailedStatus200Response
  extends HttpResponse {
  status: "200";
  body: LogCollectionOperationDetailedStatusOutput;
}

/** Get device diagnostics log collection operation with detailed status */
export interface ManagementGetLogCollectionOperationDetailedStatusdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Stops a deployment. */
export interface ManagementStopDeployment200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Stops a deployment. */
export interface ManagementStopDeploymentdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Retries a deployment with failed devices. */
export interface ManagementRetryDeployment200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Retries a deployment with failed devices. */
export interface ManagementRetryDeploymentdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}
