// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  UpdateListOutput,
  ErrorResponseOutput,
  UpdateOutput,
  StringsListOutput,
  UpdateFileOutput,
  UpdateOperationsListOutput,
  UpdateOperationOutput,
  DeviceClassesListOutput,
  DeviceClassOutput,
  UpdateInfoListOutput,
  DevicesListOutput,
  DeviceOutput,
  UpdateComplianceOutput,
  GroupsListOutput,
  GroupOutput,
  DeviceClassSubgroupUpdatableDevicesListOutput,
  DeploymentsListOutput,
  DeploymentOutput,
  DeploymentStatusOutput,
  DeviceClassSubgroupsListOutput,
  DeviceClassSubgroupOutput,
  DeviceClassSubgroupUpdatableDevicesOutput,
  DeviceClassSubgroupDeploymentStatusOutput,
  DeploymentDeviceStatesListOutput,
  DeviceOperationOutput,
  DeviceOperationsListOutput,
  LogCollectionOutput,
  LogCollectionListOutput,
  LogCollectionOperationDetailedStatusOutput,
  DeviceHealthListOutput,
} from "./outputModels";

/** Get a list of all updates that have been imported to Device Update for IoT Hub. */
export interface DeviceUpdateListUpdates200Response extends HttpResponse {
  status: "200";
  body: UpdateListOutput;
}

/** Get a list of all updates that have been imported to Device Update for IoT Hub. */
export interface DeviceUpdateListUpdatesdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Import new update version. This is a long-running-operation; use Operation-Location response header value to check for operation status. */
export interface DeviceUpdateImportUpdate200Response extends HttpResponse {
  status: "200";
  body: UpdateOutput;
}

export interface DeviceUpdateImportUpdate202Headers {
  /** Url to retrieve the import operation status. */
  "operation-location"?: string;
}

/** Import new update version. This is a long-running-operation; use Operation-Location response header value to check for operation status. */
export interface DeviceUpdateImportUpdate202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & DeviceUpdateImportUpdate202Headers;
}

/** Import new update version. This is a long-running-operation; use Operation-Location response header value to check for operation status. */
export interface DeviceUpdateImportUpdatedefaultResponse extends HttpResponse {
  status: string;
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
  status: string;
  body: ErrorResponseOutput;
}

export interface DeviceUpdateDeleteUpdate202Headers {
  /** Url to retrieve the operation status */
  "operation-location"?: string;
}

/** Delete a specific update version. This is a long-running-operation; use Operation-Location response header value to check for operation status. */
export interface DeviceUpdateDeleteUpdate202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & DeviceUpdateDeleteUpdate202Headers;
}

/** Delete a specific update version. This is a long-running-operation; use Operation-Location response header value to check for operation status. */
export interface DeviceUpdateDeleteUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get a list of all update providers that have been imported to Device Update for IoT Hub. */
export interface DeviceUpdateListProviders200Response extends HttpResponse {
  status: "200";
  body: StringsListOutput;
}

/** Get a list of all update providers that have been imported to Device Update for IoT Hub. */
export interface DeviceUpdateListProvidersdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get a list of all update names that match the specified provider. */
export interface DeviceUpdateListNames200Response extends HttpResponse {
  status: "200";
  body: StringsListOutput;
}

/** Get a list of all update names that match the specified provider. */
export interface DeviceUpdateListNamesdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get a list of all update versions that match the specified provider and name. */
export interface DeviceUpdateListVersions200Response extends HttpResponse {
  status: "200";
  body: StringsListOutput;
}

/** Get a list of all update versions that match the specified provider and name. */
export interface DeviceUpdateListVersionsdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get a list of all update file identifiers for the specified version. */
export interface DeviceUpdateListFiles200Response extends HttpResponse {
  status: "200";
  body: StringsListOutput;
}

/** Get a list of all update file identifiers for the specified version. */
export interface DeviceUpdateListFilesdefaultResponse extends HttpResponse {
  status: string;
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
  status: string;
  body: ErrorResponseOutput;
}

/** Get a list of all import update operations. Completed operations are kept for 7 days before auto-deleted. Delete operations are not returned by this API version. */
export interface DeviceUpdateListOperationStatuses200Response extends HttpResponse {
  status: "200";
  body: UpdateOperationsListOutput;
}

/** Get a list of all import update operations. Completed operations are kept for 7 days before auto-deleted. Delete operations are not returned by this API version. */
export interface DeviceUpdateListOperationStatusesdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface DeviceUpdateGetOperationStatus200Headers {
  /** Number of seconds to wait before checking the operation status again. */
  "retry-after"?: string;
}

/** Retrieve operation status. */
export interface DeviceUpdateGetOperationStatus200Response extends HttpResponse {
  status: "200";
  body: UpdateOperationOutput;
  headers: RawHttpHeaders & DeviceUpdateGetOperationStatus200Headers;
}

/** Retrieve operation status. */
export interface DeviceUpdateGetOperationStatus304Response extends HttpResponse {
  status: "304";
  body: Record<string, unknown>;
}

/** Retrieve operation status. */
export interface DeviceUpdateGetOperationStatusdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets a list of all device classes (sets of devices compatible with the same updates based on the model Id and compat properties reported in the Device Update PnP interface in IoT Hub) for all devices connected to Device Update for IoT Hub. */
export interface DeviceManagementListDeviceClasses200Response extends HttpResponse {
  status: "200";
  body: DeviceClassesListOutput;
}

/** Gets a list of all device classes (sets of devices compatible with the same updates based on the model Id and compat properties reported in the Device Update PnP interface in IoT Hub) for all devices connected to Device Update for IoT Hub. */
export interface DeviceManagementListDeviceClassesdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the properties of a device class. */
export interface DeviceManagementGetDeviceClass200Response extends HttpResponse {
  status: "200";
  body: DeviceClassOutput;
}

/** Gets the properties of a device class. */
export interface DeviceManagementGetDeviceClassdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Update device class details. */
export interface DeviceManagementUpdateDeviceClass200Response extends HttpResponse {
  status: "200";
  body: DeviceClassOutput;
}

/** Update device class details. */
export interface DeviceManagementUpdateDeviceClassdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Deletes a device class. Device classes are created automatically when Device Update-enabled devices are connected to the hub but are not automatically cleaned up since they are referenced by DeviceClassSubgroups. If the user has deleted all DeviceClassSubgroups for a device class they can also delete the device class to remove the records from the system and to stop checking the compatibility of this device class with new updates. If a device is ever reconnected for this device class it will be re-created. */
export interface DeviceManagementDeleteDeviceClass204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a device class. Device classes are created automatically when Device Update-enabled devices are connected to the hub but are not automatically cleaned up since they are referenced by DeviceClassSubgroups. If the user has deleted all DeviceClassSubgroups for a device class they can also delete the device class to remove the records from the system and to stop checking the compatibility of this device class with new updates. If a device is ever reconnected for this device class it will be re-created. */
export interface DeviceManagementDeleteDeviceClassdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets a list of installable updates for a device class. */
export interface DeviceManagementListInstallableUpdatesForDeviceClass200Response
  extends HttpResponse {
  status: "200";
  body: UpdateInfoListOutput;
}

/** Gets a list of installable updates for a device class. */
export interface DeviceManagementListInstallableUpdatesForDeviceClassdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets a list of devices connected to Device Update for IoT Hub. */
export interface DeviceManagementListDevices200Response extends HttpResponse {
  status: "200";
  body: DevicesListOutput;
}

/** Gets a list of devices connected to Device Update for IoT Hub. */
export interface DeviceManagementListDevicesdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface DeviceManagementImportDevices202Headers {
  /** Url to retrieve the device import operation status. */
  "operation-location"?: string;
}

/** Import existing devices from IoT Hub. This is a long-running-operation; use Operation-Location response header value to check for operation status. */
export interface DeviceManagementImportDevices202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & DeviceManagementImportDevices202Headers;
}

/** Import existing devices from IoT Hub. This is a long-running-operation; use Operation-Location response header value to check for operation status. */
export interface DeviceManagementImportDevicesdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the device properties and latest deployment status for a device connected to Device Update for IoT Hub. */
export interface DeviceManagementGetDevice200Response extends HttpResponse {
  status: "200";
  body: DeviceOutput;
}

/** Gets the device properties and latest deployment status for a device connected to Device Update for IoT Hub. */
export interface DeviceManagementGetDevicedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the device module properties and latest deployment status for a device module connected to Device Update for IoT Hub. */
export interface DeviceManagementGetDeviceModule200Response extends HttpResponse {
  status: "200";
  body: DeviceOutput;
}

/** Gets the device module properties and latest deployment status for a device module connected to Device Update for IoT Hub. */
export interface DeviceManagementGetDeviceModuledefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the breakdown of how many devices are on their latest update, have new updates available, or are in progress receiving new updates. */
export interface DeviceManagementGetUpdateCompliance200Response extends HttpResponse {
  status: "200";
  body: UpdateComplianceOutput;
}

/** Gets the breakdown of how many devices are on their latest update, have new updates available, or are in progress receiving new updates. */
export interface DeviceManagementGetUpdateCompliancedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets a list of all device groups.  The $default group will always be returned first. */
export interface DeviceManagementListGroups200Response extends HttpResponse {
  status: "200";
  body: GroupsListOutput;
}

/** Gets a list of all device groups.  The $default group will always be returned first. */
export interface DeviceManagementListGroupsdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the device group properties. */
export interface DeviceManagementGetGroup200Response extends HttpResponse {
  status: "200";
  body: GroupOutput;
}

/** Gets the device group properties. */
export interface DeviceManagementGetGroupdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Deletes a device group. This group is automatically created when a Device Update-enabled device is connected to the hub and reports its properties. Groups, subgroups, and deployments are not automatically cleaned up but are retained for history purposes. Users can call this method to delete a group if they do not need to retain any of the history of the group and no longer need it. If a device is ever connected again for this group after the group was deleted it will be automatically re-created but there will be no history. */
export interface DeviceManagementDeleteGroup204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a device group. This group is automatically created when a Device Update-enabled device is connected to the hub and reports its properties. Groups, subgroups, and deployments are not automatically cleaned up but are retained for history purposes. Users can call this method to delete a group if they do not need to retain any of the history of the group and no longer need it. If a device is ever connected again for this group after the group was deleted it will be automatically re-created but there will be no history. */
export interface DeviceManagementDeleteGroupdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get device group update compliance information such as how many devices are on their latest update, how many need new updates, and how many are in progress on receiving a new update. */
export interface DeviceManagementGetUpdateComplianceForGroup200Response extends HttpResponse {
  status: "200";
  body: UpdateComplianceOutput;
}

/** Get device group update compliance information such as how many devices are on their latest update, how many need new updates, and how many are in progress on receiving a new update. */
export interface DeviceManagementGetUpdateComplianceForGroupdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get the best available updates for a device group and a count of how many devices need each update. */
export interface DeviceManagementListBestUpdatesForGroup200Response extends HttpResponse {
  status: "200";
  body: DeviceClassSubgroupUpdatableDevicesListOutput;
}

/** Get the best available updates for a device group and a count of how many devices need each update. */
export interface DeviceManagementListBestUpdatesForGroupdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets a list of deployments for a device group. */
export interface DeviceManagementListDeploymentsForGroup200Response extends HttpResponse {
  status: "200";
  body: DeploymentsListOutput;
}

/** Gets a list of deployments for a device group. */
export interface DeviceManagementListDeploymentsForGroupdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the deployment properties. */
export interface DeviceManagementGetDeployment200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Gets the deployment properties. */
export interface DeviceManagementGetDeploymentdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Creates or updates a deployment. */
export interface DeviceManagementCreateOrUpdateDeployment200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Creates or updates a deployment. */
export interface DeviceManagementCreateOrUpdateDeploymentdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Deletes a deployment. */
export interface DeviceManagementDeleteDeployment204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a deployment. */
export interface DeviceManagementDeleteDeploymentdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the status of a deployment including a breakdown of how many devices in the deployment are in progress, completed, or failed. */
export interface DeviceManagementGetDeploymentStatus200Response extends HttpResponse {
  status: "200";
  body: DeploymentStatusOutput;
}

/** Gets the status of a deployment including a breakdown of how many devices in the deployment are in progress, completed, or failed. */
export interface DeviceManagementGetDeploymentStatusdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get the device class subgroups for the group. A device class subgroup is the set of devices within the group that share the same device class. All devices within the same device class are compatible with the same updates. */
export interface DeviceManagementListDeviceClassSubgroupsForGroup200Response extends HttpResponse {
  status: "200";
  body: DeviceClassSubgroupsListOutput;
}

/** Get the device class subgroups for the group. A device class subgroup is the set of devices within the group that share the same device class. All devices within the same device class are compatible with the same updates. */
export interface DeviceManagementListDeviceClassSubgroupsForGroupdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets device class subgroup details. A device class subgroup is the set of devices within the group that share the same device class. All devices within the same device class are compatible with the same updates. */
export interface DeviceManagementGetDeviceClassSubgroup200Response extends HttpResponse {
  status: "200";
  body: DeviceClassSubgroupOutput;
}

/** Gets device class subgroup details. A device class subgroup is the set of devices within the group that share the same device class. All devices within the same device class are compatible with the same updates. */
export interface DeviceManagementGetDeviceClassSubgroupdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Deletes a device class subgroup. This subgroup is automatically created when a Device Update-enabled device is connected to the hub and reports its properties. Groups, subgroups, and deployments are not automatically cleaned up but are retained for history purposes. Users can call this method to delete a subgroup if they do not need to retain any of the history of the subgroup and no longer need it. If a device is ever connected again for this subgroup after the subgroup was deleted it will be automatically re-created but there will be no history. */
export interface DeviceManagementDeleteDeviceClassSubgroup204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a device class subgroup. This subgroup is automatically created when a Device Update-enabled device is connected to the hub and reports its properties. Groups, subgroups, and deployments are not automatically cleaned up but are retained for history purposes. Users can call this method to delete a subgroup if they do not need to retain any of the history of the subgroup and no longer need it. If a device is ever connected again for this subgroup after the subgroup was deleted it will be automatically re-created but there will be no history. */
export interface DeviceManagementDeleteDeviceClassSubgroupdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get device class subgroup update compliance information such as how many devices are on their latest update, how many need new updates, and how many are in progress on receiving a new update. */
export interface DeviceManagementGetDeviceClassSubgroupUpdateCompliance200Response
  extends HttpResponse {
  status: "200";
  body: UpdateComplianceOutput;
}

/** Get device class subgroup update compliance information such as how many devices are on their latest update, how many need new updates, and how many are in progress on receiving a new update. */
export interface DeviceManagementGetDeviceClassSubgroupUpdateCompliancedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get the best available update for a device class subgroup and a count of how many devices need this update. */
export interface DeviceManagementGetBestUpdatesForDeviceClassSubgroup200Response
  extends HttpResponse {
  status: "200";
  body: DeviceClassSubgroupUpdatableDevicesOutput;
}

/** Get the best available update for a device class subgroup and a count of how many devices need this update. */
export interface DeviceManagementGetBestUpdatesForDeviceClassSubgroupdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets a list of deployments for a device class subgroup. */
export interface DeviceManagementListDeploymentsForDeviceClassSubgroup200Response
  extends HttpResponse {
  status: "200";
  body: DeploymentsListOutput;
}

/** Gets a list of deployments for a device class subgroup. */
export interface DeviceManagementListDeploymentsForDeviceClassSubgroupdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the deployment properties. */
export interface DeviceManagementGetDeploymentForDeviceClassSubgroup200Response
  extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Gets the deployment properties. */
export interface DeviceManagementGetDeploymentForDeviceClassSubgroupdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Deletes a device class subgroup deployment. */
export interface DeviceManagementDeleteDeploymentForDeviceClassSubgroup204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a device class subgroup deployment. */
export interface DeviceManagementDeleteDeploymentForDeviceClassSubgroupdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Stops a deployment. */
export interface DeviceManagementStopDeployment200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Stops a deployment. */
export interface DeviceManagementStopDeploymentdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Retries a deployment with failed devices. */
export interface DeviceManagementRetryDeployment200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Retries a deployment with failed devices. */
export interface DeviceManagementRetryDeploymentdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the status of a deployment including a breakdown of how many devices in the deployment are in progress, completed, or failed. */
export interface DeviceManagementGetDeviceClassSubgroupDeploymentStatus200Response
  extends HttpResponse {
  status: "200";
  body: DeviceClassSubgroupDeploymentStatusOutput;
}

/** Gets the status of a deployment including a breakdown of how many devices in the deployment are in progress, completed, or failed. */
export interface DeviceManagementGetDeviceClassSubgroupDeploymentStatusdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets a list of devices in a deployment along with their state. Useful for getting a list of failed devices. */
export interface DeviceManagementListDeviceStatesForDeviceClassSubgroupDeployment200Response
  extends HttpResponse {
  status: "200";
  body: DeploymentDeviceStatesListOutput;
}

/** Gets a list of devices in a deployment along with their state. Useful for getting a list of failed devices. */
export interface DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface DeviceManagementGetOperationStatus200Headers {
  /** Number of seconds to wait before checking the operation status again. */
  "retry-after"?: string;
}

/** Retrieve operation status. */
export interface DeviceManagementGetOperationStatus200Response extends HttpResponse {
  status: "200";
  body: DeviceOperationOutput;
  headers: RawHttpHeaders & DeviceManagementGetOperationStatus200Headers;
}

/** Retrieve operation status. */
export interface DeviceManagementGetOperationStatus304Response extends HttpResponse {
  status: "304";
  body: Record<string, unknown>;
}

/** Retrieve operation status. */
export interface DeviceManagementGetOperationStatusdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get a list of all device import operations. Completed operations are kept for 7 days before auto-deleted. */
export interface DeviceManagementListOperationStatuses200Response extends HttpResponse {
  status: "200";
  body: DeviceOperationsListOutput;
}

/** Get a list of all device import operations. Completed operations are kept for 7 days before auto-deleted. */
export interface DeviceManagementListOperationStatusesdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Start the device diagnostics log collection on specified devices. */
export interface DeviceManagementStartLogCollection201Response extends HttpResponse {
  status: "201";
  body: LogCollectionOutput;
}

/** Start the device diagnostics log collection on specified devices. */
export interface DeviceManagementStartLogCollectiondefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get the device diagnostics log collection */
export interface DeviceManagementGetLogCollection200Response extends HttpResponse {
  status: "200";
  body: LogCollectionOutput;
}

/** Get the device diagnostics log collection */
export interface DeviceManagementGetLogCollectiondefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get all device diagnostics log collections */
export interface DeviceManagementListLogCollections200Response extends HttpResponse {
  status: "200";
  body: LogCollectionListOutput;
}

/** Get all device diagnostics log collections */
export interface DeviceManagementListLogCollectionsdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get log collection with detailed status */
export interface DeviceManagementGetLogCollectionDetailedStatus200Response extends HttpResponse {
  status: "200";
  body: LogCollectionOperationDetailedStatusOutput;
}

/** Get log collection with detailed status */
export interface DeviceManagementGetLogCollectionDetailedStatusdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get list of device health */
export interface DeviceManagementListHealthOfDevices200Response extends HttpResponse {
  status: "200";
  body: DeviceHealthListOutput;
}

/** Get list of device health */
export interface DeviceManagementListHealthOfDevicesdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
