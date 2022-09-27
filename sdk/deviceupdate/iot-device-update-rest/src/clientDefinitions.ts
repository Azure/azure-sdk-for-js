// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DeviceUpdateListUpdatesParameters,
  DeviceUpdateImportUpdateParameters,
  DeviceUpdateGetUpdateParameters,
  DeviceUpdateDeleteUpdateParameters,
  DeviceUpdateListProvidersParameters,
  DeviceUpdateListNamesParameters,
  DeviceUpdateListVersionsParameters,
  DeviceUpdateListFilesParameters,
  DeviceUpdateGetFileParameters,
  DeviceUpdateListOperationStatusesParameters,
  DeviceUpdateGetOperationStatusParameters,
  DeviceManagementListDeviceClassesParameters,
  DeviceManagementGetDeviceClassParameters,
  DeviceManagementUpdateDeviceClassParameters,
  DeviceManagementDeleteDeviceClassParameters,
  DeviceManagementListInstallableUpdatesForDeviceClassParameters,
  DeviceManagementListDevicesParameters,
  DeviceManagementImportDevicesParameters,
  DeviceManagementGetDeviceParameters,
  DeviceManagementGetDeviceModuleParameters,
  DeviceManagementGetUpdateComplianceParameters,
  DeviceManagementListGroupsParameters,
  DeviceManagementGetGroupParameters,
  DeviceManagementDeleteGroupParameters,
  DeviceManagementGetUpdateComplianceForGroupParameters,
  DeviceManagementListBestUpdatesForGroupParameters,
  DeviceManagementListDeploymentsForGroupParameters,
  DeviceManagementGetDeploymentParameters,
  DeviceManagementCreateOrUpdateDeploymentParameters,
  DeviceManagementDeleteDeploymentParameters,
  DeviceManagementGetDeploymentStatusParameters,
  DeviceManagementListDeviceClassSubgroupsForGroupParameters,
  DeviceManagementGetDeviceClassSubgroupParameters,
  DeviceManagementDeleteDeviceClassSubgroupParameters,
  DeviceManagementGetDeviceClassSubgroupUpdateComplianceParameters,
  DeviceManagementGetBestUpdatesForDeviceClassSubgroupParameters,
  DeviceManagementListDeploymentsForDeviceClassSubgroupParameters,
  DeviceManagementGetDeploymentForDeviceClassSubgroupParameters,
  DeviceManagementDeleteDeploymentForDeviceClassSubgroupParameters,
  DeviceManagementStopDeploymentParameters,
  DeviceManagementRetryDeploymentParameters,
  DeviceManagementGetDeviceClassSubgroupDeploymentStatusParameters,
  DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentParameters,
  DeviceManagementGetOperationStatusParameters,
  DeviceManagementListOperationStatusesParameters,
  DeviceManagementStartLogCollectionParameters,
  DeviceManagementGetLogCollectionParameters,
  DeviceManagementListLogCollectionsParameters,
  DeviceManagementGetLogCollectionDetailedStatusParameters,
  DeviceManagementListHealthOfDevicesParameters,
} from "./parameters";
import {
  DeviceUpdateListUpdates200Response,
  DeviceUpdateListUpdatesdefaultResponse,
  DeviceUpdateImportUpdate200Response,
  DeviceUpdateImportUpdate202Response,
  DeviceUpdateImportUpdatedefaultResponse,
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
  DeviceUpdateListOperationStatuses200Response,
  DeviceUpdateListOperationStatusesdefaultResponse,
  DeviceUpdateGetOperationStatus200Response,
  DeviceUpdateGetOperationStatus304Response,
  DeviceUpdateGetOperationStatusdefaultResponse,
  DeviceManagementListDeviceClasses200Response,
  DeviceManagementListDeviceClassesdefaultResponse,
  DeviceManagementGetDeviceClass200Response,
  DeviceManagementGetDeviceClassdefaultResponse,
  DeviceManagementUpdateDeviceClass200Response,
  DeviceManagementUpdateDeviceClassdefaultResponse,
  DeviceManagementDeleteDeviceClass204Response,
  DeviceManagementDeleteDeviceClassdefaultResponse,
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
  DeviceManagementListGroups200Response,
  DeviceManagementListGroupsdefaultResponse,
  DeviceManagementGetGroup200Response,
  DeviceManagementGetGroupdefaultResponse,
  DeviceManagementDeleteGroup204Response,
  DeviceManagementDeleteGroupdefaultResponse,
  DeviceManagementGetUpdateComplianceForGroup200Response,
  DeviceManagementGetUpdateComplianceForGroupdefaultResponse,
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
  DeviceManagementListDeviceClassSubgroupsForGroup200Response,
  DeviceManagementListDeviceClassSubgroupsForGroupdefaultResponse,
  DeviceManagementGetDeviceClassSubgroup200Response,
  DeviceManagementGetDeviceClassSubgroupdefaultResponse,
  DeviceManagementDeleteDeviceClassSubgroup204Response,
  DeviceManagementDeleteDeviceClassSubgroupdefaultResponse,
  DeviceManagementGetDeviceClassSubgroupUpdateCompliance200Response,
  DeviceManagementGetDeviceClassSubgroupUpdateCompliancedefaultResponse,
  DeviceManagementGetBestUpdatesForDeviceClassSubgroup200Response,
  DeviceManagementGetBestUpdatesForDeviceClassSubgroupdefaultResponse,
  DeviceManagementListDeploymentsForDeviceClassSubgroup200Response,
  DeviceManagementListDeploymentsForDeviceClassSubgroupdefaultResponse,
  DeviceManagementGetDeploymentForDeviceClassSubgroup200Response,
  DeviceManagementGetDeploymentForDeviceClassSubgroupdefaultResponse,
  DeviceManagementDeleteDeploymentForDeviceClassSubgroup204Response,
  DeviceManagementDeleteDeploymentForDeviceClassSubgroupdefaultResponse,
  DeviceManagementStopDeployment200Response,
  DeviceManagementStopDeploymentdefaultResponse,
  DeviceManagementRetryDeployment200Response,
  DeviceManagementRetryDeploymentdefaultResponse,
  DeviceManagementGetDeviceClassSubgroupDeploymentStatus200Response,
  DeviceManagementGetDeviceClassSubgroupDeploymentStatusdefaultResponse,
  DeviceManagementListDeviceStatesForDeviceClassSubgroupDeployment200Response,
  DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentdefaultResponse,
  DeviceManagementGetOperationStatus200Response,
  DeviceManagementGetOperationStatus304Response,
  DeviceManagementGetOperationStatusdefaultResponse,
  DeviceManagementListOperationStatuses200Response,
  DeviceManagementListOperationStatusesdefaultResponse,
  DeviceManagementStartLogCollection201Response,
  DeviceManagementStartLogCollectiondefaultResponse,
  DeviceManagementGetLogCollection200Response,
  DeviceManagementGetLogCollectiondefaultResponse,
  DeviceManagementListLogCollections200Response,
  DeviceManagementListLogCollectionsdefaultResponse,
  DeviceManagementGetLogCollectionDetailedStatus200Response,
  DeviceManagementGetLogCollectionDetailedStatusdefaultResponse,
  DeviceManagementListHealthOfDevices200Response,
  DeviceManagementListHealthOfDevicesdefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface DeviceUpdateListUpdates {
  /** Get a list of all updates that have been imported to Device Update for IoT Hub. */
  get(
    options?: DeviceUpdateListUpdatesParameters
  ): StreamableMethod<DeviceUpdateListUpdates200Response | DeviceUpdateListUpdatesdefaultResponse>;
}

export interface DeviceUpdateImportUpdate {
  /** Import new update version. This is a long-running-operation; use Operation-Location response header value to check for operation status. */
  post(
    options: DeviceUpdateImportUpdateParameters
  ): StreamableMethod<
    | DeviceUpdateImportUpdate200Response
    | DeviceUpdateImportUpdate202Response
    | DeviceUpdateImportUpdatedefaultResponse
  >;
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
  /** Delete a specific update version. This is a long-running-operation; use Operation-Location response header value to check for operation status. */
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

export interface DeviceUpdateListOperationStatuses {
  /** Get a list of all import update operations. Completed operations are kept for 7 days before auto-deleted. Delete operations are not returned by this API version. */
  get(
    options?: DeviceUpdateListOperationStatusesParameters
  ): StreamableMethod<
    DeviceUpdateListOperationStatuses200Response | DeviceUpdateListOperationStatusesdefaultResponse
  >;
}

export interface DeviceUpdateGetOperationStatus {
  /** Retrieve operation status. */
  get(
    options?: DeviceUpdateGetOperationStatusParameters
  ): StreamableMethod<
    | DeviceUpdateGetOperationStatus200Response
    | DeviceUpdateGetOperationStatus304Response
    | DeviceUpdateGetOperationStatusdefaultResponse
  >;
}

export interface DeviceManagementListDeviceClasses {
  /** Gets a list of all device classes (sets of devices compatible with the same updates based on the model Id and compat properties reported in the Device Update PnP interface in IoT Hub) for all devices connected to Device Update for IoT Hub. */
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
  /** Update device class details. */
  patch(
    options: DeviceManagementUpdateDeviceClassParameters
  ): StreamableMethod<
    DeviceManagementUpdateDeviceClass200Response | DeviceManagementUpdateDeviceClassdefaultResponse
  >;
  /** Deletes a device class. Device classes are created automatically when Device Update-enabled devices are connected to the hub but are not automatically cleaned up since they are referenced by DeviceClassSubgroups. If the user has deleted all DeviceClassSubgroups for a device class they can also delete the device class to remove the records from the system and to stop checking the compatibility of this device class with new updates. If a device is ever reconnected for this device class it will be re-created. */
  delete(
    options?: DeviceManagementDeleteDeviceClassParameters
  ): StreamableMethod<
    DeviceManagementDeleteDeviceClass204Response | DeviceManagementDeleteDeviceClassdefaultResponse
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
}

export interface DeviceManagementImportDevices {
  /** Import existing devices from IoT Hub. This is a long-running-operation; use Operation-Location response header value to check for operation status. */
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

export interface DeviceManagementListGroups {
  /** Gets a list of all device groups.  The $default group will always be returned first. */
  get(
    options?: DeviceManagementListGroupsParameters
  ): StreamableMethod<
    DeviceManagementListGroups200Response | DeviceManagementListGroupsdefaultResponse
  >;
}

export interface DeviceManagementGetGroup {
  /** Gets the device group properties. */
  get(
    options?: DeviceManagementGetGroupParameters
  ): StreamableMethod<
    DeviceManagementGetGroup200Response | DeviceManagementGetGroupdefaultResponse
  >;
  /** Deletes a device group. This group is automatically created when a Device Update-enabled device is connected to the hub and reports its properties. Groups, subgroups, and deployments are not automatically cleaned up but are retained for history purposes. Users can call this method to delete a group if they do not need to retain any of the history of the group and no longer need it. If a device is ever connected again for this group after the group was deleted it will be automatically re-created but there will be no history. */
  delete(
    options?: DeviceManagementDeleteGroupParameters
  ): StreamableMethod<
    DeviceManagementDeleteGroup204Response | DeviceManagementDeleteGroupdefaultResponse
  >;
}

export interface DeviceManagementGetUpdateComplianceForGroup {
  /** Get device group update compliance information such as how many devices are on their latest update, how many need new updates, and how many are in progress on receiving a new update. */
  get(
    options?: DeviceManagementGetUpdateComplianceForGroupParameters
  ): StreamableMethod<
    | DeviceManagementGetUpdateComplianceForGroup200Response
    | DeviceManagementGetUpdateComplianceForGroupdefaultResponse
  >;
}

export interface DeviceManagementListBestUpdatesForGroup {
  /** Get the best available updates for a device group and a count of how many devices need each update. */
  get(
    options?: DeviceManagementListBestUpdatesForGroupParameters
  ): StreamableMethod<
    | DeviceManagementListBestUpdatesForGroup200Response
    | DeviceManagementListBestUpdatesForGroupdefaultResponse
  >;
}

export interface DeviceManagementListDeploymentsForGroup {
  /** Gets a list of deployments for a device group. */
  get(
    options?: DeviceManagementListDeploymentsForGroupParameters
  ): StreamableMethod<
    | DeviceManagementListDeploymentsForGroup200Response
    | DeviceManagementListDeploymentsForGroupdefaultResponse
  >;
}

export interface DeviceManagementGetDeployment {
  /** Gets the deployment properties. */
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

export interface DeviceManagementListDeviceClassSubgroupsForGroup {
  /** Get the device class subgroups for the group. A device class subgroup is the set of devices within the group that share the same device class. All devices within the same device class are compatible with the same updates. */
  get(
    options?: DeviceManagementListDeviceClassSubgroupsForGroupParameters
  ): StreamableMethod<
    | DeviceManagementListDeviceClassSubgroupsForGroup200Response
    | DeviceManagementListDeviceClassSubgroupsForGroupdefaultResponse
  >;
}

export interface DeviceManagementGetDeviceClassSubgroup {
  /** Gets device class subgroup details. A device class subgroup is the set of devices within the group that share the same device class. All devices within the same device class are compatible with the same updates. */
  get(
    options?: DeviceManagementGetDeviceClassSubgroupParameters
  ): StreamableMethod<
    | DeviceManagementGetDeviceClassSubgroup200Response
    | DeviceManagementGetDeviceClassSubgroupdefaultResponse
  >;
  /** Deletes a device class subgroup. This subgroup is automatically created when a Device Update-enabled device is connected to the hub and reports its properties. Groups, subgroups, and deployments are not automatically cleaned up but are retained for history purposes. Users can call this method to delete a subgroup if they do not need to retain any of the history of the subgroup and no longer need it. If a device is ever connected again for this subgroup after the subgroup was deleted it will be automatically re-created but there will be no history. */
  delete(
    options?: DeviceManagementDeleteDeviceClassSubgroupParameters
  ): StreamableMethod<
    | DeviceManagementDeleteDeviceClassSubgroup204Response
    | DeviceManagementDeleteDeviceClassSubgroupdefaultResponse
  >;
}

export interface DeviceManagementGetDeviceClassSubgroupUpdateCompliance {
  /** Get device class subgroup update compliance information such as how many devices are on their latest update, how many need new updates, and how many are in progress on receiving a new update. */
  get(
    options?: DeviceManagementGetDeviceClassSubgroupUpdateComplianceParameters
  ): StreamableMethod<
    | DeviceManagementGetDeviceClassSubgroupUpdateCompliance200Response
    | DeviceManagementGetDeviceClassSubgroupUpdateCompliancedefaultResponse
  >;
}

export interface DeviceManagementGetBestUpdatesForDeviceClassSubgroup {
  /** Get the best available update for a device class subgroup and a count of how many devices need this update. */
  get(
    options?: DeviceManagementGetBestUpdatesForDeviceClassSubgroupParameters
  ): StreamableMethod<
    | DeviceManagementGetBestUpdatesForDeviceClassSubgroup200Response
    | DeviceManagementGetBestUpdatesForDeviceClassSubgroupdefaultResponse
  >;
}

export interface DeviceManagementListDeploymentsForDeviceClassSubgroup {
  /** Gets a list of deployments for a device class subgroup. */
  get(
    options?: DeviceManagementListDeploymentsForDeviceClassSubgroupParameters
  ): StreamableMethod<
    | DeviceManagementListDeploymentsForDeviceClassSubgroup200Response
    | DeviceManagementListDeploymentsForDeviceClassSubgroupdefaultResponse
  >;
}

export interface DeviceManagementGetDeploymentForDeviceClassSubgroup {
  /** Gets the deployment properties. */
  get(
    options?: DeviceManagementGetDeploymentForDeviceClassSubgroupParameters
  ): StreamableMethod<
    | DeviceManagementGetDeploymentForDeviceClassSubgroup200Response
    | DeviceManagementGetDeploymentForDeviceClassSubgroupdefaultResponse
  >;
  /** Deletes a device class subgroup deployment. */
  delete(
    options?: DeviceManagementDeleteDeploymentForDeviceClassSubgroupParameters
  ): StreamableMethod<
    | DeviceManagementDeleteDeploymentForDeviceClassSubgroup204Response
    | DeviceManagementDeleteDeploymentForDeviceClassSubgroupdefaultResponse
  >;
}

export interface DeviceManagementStopDeployment {
  /** Stops a deployment. */
  post(
    options?: DeviceManagementStopDeploymentParameters
  ): StreamableMethod<
    DeviceManagementStopDeployment200Response | DeviceManagementStopDeploymentdefaultResponse
  >;
}

export interface DeviceManagementRetryDeployment {
  /** Retries a deployment with failed devices. */
  post(
    options?: DeviceManagementRetryDeploymentParameters
  ): StreamableMethod<
    DeviceManagementRetryDeployment200Response | DeviceManagementRetryDeploymentdefaultResponse
  >;
}

export interface DeviceManagementGetDeviceClassSubgroupDeploymentStatus {
  /** Gets the status of a deployment including a breakdown of how many devices in the deployment are in progress, completed, or failed. */
  get(
    options?: DeviceManagementGetDeviceClassSubgroupDeploymentStatusParameters
  ): StreamableMethod<
    | DeviceManagementGetDeviceClassSubgroupDeploymentStatus200Response
    | DeviceManagementGetDeviceClassSubgroupDeploymentStatusdefaultResponse
  >;
}

export interface DeviceManagementListDeviceStatesForDeviceClassSubgroupDeployment {
  /** Gets a list of devices in a deployment along with their state. Useful for getting a list of failed devices. */
  get(
    options?: DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentParameters
  ): StreamableMethod<
    | DeviceManagementListDeviceStatesForDeviceClassSubgroupDeployment200Response
    | DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentdefaultResponse
  >;
}

export interface DeviceManagementGetOperationStatus {
  /** Retrieve operation status. */
  get(
    options?: DeviceManagementGetOperationStatusParameters
  ): StreamableMethod<
    | DeviceManagementGetOperationStatus200Response
    | DeviceManagementGetOperationStatus304Response
    | DeviceManagementGetOperationStatusdefaultResponse
  >;
}

export interface DeviceManagementListOperationStatuses {
  /** Get a list of all device import operations. Completed operations are kept for 7 days before auto-deleted. */
  get(
    options?: DeviceManagementListOperationStatusesParameters
  ): StreamableMethod<
    | DeviceManagementListOperationStatuses200Response
    | DeviceManagementListOperationStatusesdefaultResponse
  >;
}

export interface DeviceManagementStartLogCollection {
  /** Start the device diagnostics log collection on specified devices. */
  put(
    options: DeviceManagementStartLogCollectionParameters
  ): StreamableMethod<
    | DeviceManagementStartLogCollection201Response
    | DeviceManagementStartLogCollectiondefaultResponse
  >;
  /** Get the device diagnostics log collection */
  get(
    options?: DeviceManagementGetLogCollectionParameters
  ): StreamableMethod<
    DeviceManagementGetLogCollection200Response | DeviceManagementGetLogCollectiondefaultResponse
  >;
}

export interface DeviceManagementListLogCollections {
  /** Get all device diagnostics log collections */
  get(
    options?: DeviceManagementListLogCollectionsParameters
  ): StreamableMethod<
    | DeviceManagementListLogCollections200Response
    | DeviceManagementListLogCollectionsdefaultResponse
  >;
}

export interface DeviceManagementGetLogCollectionDetailedStatus {
  /** Get log collection with detailed status */
  get(
    options?: DeviceManagementGetLogCollectionDetailedStatusParameters
  ): StreamableMethod<
    | DeviceManagementGetLogCollectionDetailedStatus200Response
    | DeviceManagementGetLogCollectionDetailedStatusdefaultResponse
  >;
}

export interface DeviceManagementListHealthOfDevices {
  /** Get list of device health */
  get(
    options: DeviceManagementListHealthOfDevicesParameters
  ): StreamableMethod<
    | DeviceManagementListHealthOfDevices200Response
    | DeviceManagementListHealthOfDevicesdefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/deviceUpdate/\{instanceId\}/updates' has methods for the following verbs: get */
  (path: "/deviceUpdate/{instanceId}/updates", instanceId: string): DeviceUpdateListUpdates;
  /** Resource for '/deviceUpdate/\{instanceId\}/updates:import' has methods for the following verbs: post */
  (path: "/deviceUpdate/{instanceId}/updates:import", instanceId: string): DeviceUpdateImportUpdate;
  /** Resource for '/deviceUpdate/\{instanceId\}/updates/providers/\{provider\}/names/\{name\}/versions/\{version\}' has methods for the following verbs: get, delete */
  (
    path: "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}",
    instanceId: string,
    provider: string,
    name: string,
    version: string
  ): DeviceUpdateGetUpdate;
  /** Resource for '/deviceUpdate/\{instanceId\}/updates/providers' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/updates/providers",
    instanceId: string
  ): DeviceUpdateListProviders;
  /** Resource for '/deviceUpdate/\{instanceId\}/updates/providers/\{provider\}/names' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/updates/providers/{provider}/names",
    instanceId: string,
    provider: string
  ): DeviceUpdateListNames;
  /** Resource for '/deviceUpdate/\{instanceId\}/updates/providers/\{provider\}/names/\{name\}/versions' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions",
    instanceId: string,
    provider: string,
    name: string
  ): DeviceUpdateListVersions;
  /** Resource for '/deviceUpdate/\{instanceId\}/updates/providers/\{provider\}/names/\{name\}/versions/\{version\}/files' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files",
    instanceId: string,
    provider: string,
    name: string,
    version: string
  ): DeviceUpdateListFiles;
  /** Resource for '/deviceUpdate/\{instanceId\}/updates/providers/\{provider\}/names/\{name\}/versions/\{version\}/files/\{fileId\}' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files/{fileId}",
    instanceId: string,
    provider: string,
    name: string,
    version: string,
    fileId: string
  ): DeviceUpdateGetFile;
  /** Resource for '/deviceUpdate/\{instanceId\}/updates/operations' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/updates/operations",
    instanceId: string
  ): DeviceUpdateListOperationStatuses;
  /** Resource for '/deviceUpdate/\{instanceId\}/updates/operations/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/updates/operations/{operationId}",
    instanceId: string,
    operationId: string
  ): DeviceUpdateGetOperationStatus;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/deviceClasses' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/deviceClasses",
    instanceId: string
  ): DeviceManagementListDeviceClasses;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/deviceClasses/\{deviceClassId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/deviceUpdate/{instanceId}/management/deviceClasses/{deviceClassId}",
    instanceId: string,
    deviceClassId: string
  ): DeviceManagementGetDeviceClass;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/deviceClasses/\{deviceClassId\}/installableUpdates' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/deviceClasses/{deviceClassId}/installableUpdates",
    instanceId: string,
    deviceClassId: string
  ): DeviceManagementListInstallableUpdatesForDeviceClass;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/devices' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/devices",
    instanceId: string
  ): DeviceManagementListDevices;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/devices:import' has methods for the following verbs: post */
  (
    path: "/deviceUpdate/{instanceId}/management/devices:import",
    instanceId: string
  ): DeviceManagementImportDevices;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/devices/\{deviceId\}' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/devices/{deviceId}",
    instanceId: string,
    deviceId: string
  ): DeviceManagementGetDevice;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/devices/\{deviceId\}/modules/\{moduleId\}' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/devices/{deviceId}/modules/{moduleId}",
    instanceId: string,
    deviceId: string,
    moduleId: string
  ): DeviceManagementGetDeviceModule;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/updateCompliance' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/updateCompliance",
    instanceId: string
  ): DeviceManagementGetUpdateCompliance;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/groups' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/groups",
    instanceId: string
  ): DeviceManagementListGroups;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/groups/\{groupId\}' has methods for the following verbs: get, delete */
  (
    path: "/deviceUpdate/{instanceId}/management/groups/{groupId}",
    instanceId: string,
    groupId: string
  ): DeviceManagementGetGroup;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/groups/\{groupId\}/updateCompliance' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/groups/{groupId}/updateCompliance",
    instanceId: string,
    groupId: string
  ): DeviceManagementGetUpdateComplianceForGroup;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/groups/\{groupId\}/bestUpdates' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/groups/{groupId}/bestUpdates",
    instanceId: string,
    groupId: string
  ): DeviceManagementListBestUpdatesForGroup;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/groups/\{groupId\}/deployments' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/groups/{groupId}/deployments",
    instanceId: string,
    groupId: string
  ): DeviceManagementListDeploymentsForGroup;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/groups/\{groupId\}/deployments/\{deploymentId\}' has methods for the following verbs: get, put, delete */
  (
    path: "/deviceUpdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}",
    instanceId: string,
    groupId: string,
    deploymentId: string
  ): DeviceManagementGetDeployment;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/groups/\{groupId\}/deployments/\{deploymentId\}/status' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}/status",
    instanceId: string,
    groupId: string,
    deploymentId: string
  ): DeviceManagementGetDeploymentStatus;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/groups/\{groupId\}/deviceClassSubgroups' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups",
    instanceId: string,
    groupId: string
  ): DeviceManagementListDeviceClassSubgroupsForGroup;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/groups/\{groupId\}/deviceClassSubgroups/\{deviceClassId\}' has methods for the following verbs: get, delete */
  (
    path: "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}",
    instanceId: string,
    groupId: string,
    deviceClassId: string
  ): DeviceManagementGetDeviceClassSubgroup;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/groups/\{groupId\}/deviceClassSubgroups/\{deviceClassId\}/updateCompliance' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/updateCompliance",
    instanceId: string,
    groupId: string,
    deviceClassId: string
  ): DeviceManagementGetDeviceClassSubgroupUpdateCompliance;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/groups/\{groupId\}/deviceClassSubgroups/\{deviceClassId\}/bestUpdates' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/bestUpdates",
    instanceId: string,
    groupId: string,
    deviceClassId: string
  ): DeviceManagementGetBestUpdatesForDeviceClassSubgroup;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/groups/\{groupId\}/deviceClassSubgroups/\{deviceClassId\}/deployments' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments",
    instanceId: string,
    groupId: string,
    deviceClassId: string
  ): DeviceManagementListDeploymentsForDeviceClassSubgroup;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/groups/\{groupId\}/deviceClassSubgroups/\{deviceClassId\}/deployments/\{deploymentId\}' has methods for the following verbs: get, delete */
  (
    path: "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}",
    instanceId: string,
    groupId: string,
    deviceClassId: string,
    deploymentId: string
  ): DeviceManagementGetDeploymentForDeviceClassSubgroup;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/groups/\{groupId\}/deviceClassSubgroups/\{deviceClassId\}/deployments/\{deploymentId\}:cancel' has methods for the following verbs: post */
  (
    path: "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}:cancel",
    instanceId: string,
    groupId: string,
    deviceClassId: string,
    deploymentId: string
  ): DeviceManagementStopDeployment;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/groups/\{groupId\}/deviceClassSubgroups/\{deviceClassId\}/deployments/\{deploymentId\}:retry' has methods for the following verbs: post */
  (
    path: "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}:retry",
    instanceId: string,
    groupId: string,
    deviceClassId: string,
    deploymentId: string
  ): DeviceManagementRetryDeployment;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/groups/\{groupId\}/deviceClassSubgroups/\{deviceClassId\}/deployments/\{deploymentId\}/status' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}/status",
    instanceId: string,
    groupId: string,
    deviceClassId: string,
    deploymentId: string
  ): DeviceManagementGetDeviceClassSubgroupDeploymentStatus;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/groups/\{groupId\}/deviceClassSubgroups/\{deviceClassId\}/deployments/\{deploymentId\}/devicestates' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}/devicestates",
    instanceId: string,
    groupId: string,
    deviceClassId: string,
    deploymentId: string
  ): DeviceManagementListDeviceStatesForDeviceClassSubgroupDeployment;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/operations/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/operations/{operationId}",
    instanceId: string,
    operationId: string
  ): DeviceManagementGetOperationStatus;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/operations' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/operations",
    instanceId: string
  ): DeviceManagementListOperationStatuses;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/deviceDiagnostics/logCollections/\{operationId\}' has methods for the following verbs: put, get */
  (
    path: "/deviceUpdate/{instanceId}/management/deviceDiagnostics/logCollections/{operationId}",
    instanceId: string,
    operationId: string
  ): DeviceManagementStartLogCollection;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/deviceDiagnostics/logCollections' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/deviceDiagnostics/logCollections",
    instanceId: string
  ): DeviceManagementListLogCollections;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/deviceDiagnostics/logCollections/\{operationId\}/detailedStatus' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/deviceDiagnostics/logCollections/{operationId}/detailedStatus",
    instanceId: string,
    operationId: string
  ): DeviceManagementGetLogCollectionDetailedStatus;
  /** Resource for '/deviceUpdate/\{instanceId\}/management/deviceDiagnostics/deviceHealth' has methods for the following verbs: get */
  (
    path: "/deviceUpdate/{instanceId}/management/deviceDiagnostics/deviceHealth",
    instanceId: string
  ): DeviceManagementListHealthOfDevices;
}

export type DeviceUpdateClient = Client & {
  path: Routes;
};
