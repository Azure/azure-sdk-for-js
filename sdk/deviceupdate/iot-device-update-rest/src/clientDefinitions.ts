// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DeviceUpdateListUpdatesParameters,
  DeviceUpdateGetUpdateParameters,
  DeviceUpdateDeleteUpdateParameters,
  DeviceUpdateImportUpdateParameters,
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
  DeviceManagementListLogCollectionsParameters,
  DeviceManagementGetLogCollectionParameters,
  DeviceManagementStartLogCollectionParameters,
  DeviceManagementGetLogCollectionDetailedStatusParameters,
  DeviceManagementListHealthOfDevicesParameters,
  InstanceManagementGetLimitsParameters,
} from "./parameters";
import {
  DeviceUpdateListUpdates200Response,
  DeviceUpdateListUpdatesDefaultResponse,
  DeviceUpdateGetUpdate200Response,
  DeviceUpdateGetUpdateDefaultResponse,
  DeviceUpdateDeleteUpdate202Response,
  DeviceUpdateDeleteUpdateDefaultResponse,
  DeviceUpdateImportUpdate202Response,
  DeviceUpdateImportUpdateDefaultResponse,
  DeviceUpdateListProviders200Response,
  DeviceUpdateListProvidersDefaultResponse,
  DeviceUpdateListNames200Response,
  DeviceUpdateListNamesDefaultResponse,
  DeviceUpdateListVersions200Response,
  DeviceUpdateListVersionsDefaultResponse,
  DeviceUpdateListFiles200Response,
  DeviceUpdateListFilesDefaultResponse,
  DeviceUpdateGetFile200Response,
  DeviceUpdateGetFileDefaultResponse,
  DeviceUpdateListOperationStatuses200Response,
  DeviceUpdateListOperationStatusesDefaultResponse,
  DeviceUpdateGetOperationStatus200Response,
  DeviceUpdateGetOperationStatusDefaultResponse,
  DeviceManagementListDeviceClasses200Response,
  DeviceManagementListDeviceClassesDefaultResponse,
  DeviceManagementGetDeviceClass200Response,
  DeviceManagementGetDeviceClassDefaultResponse,
  DeviceManagementUpdateDeviceClass200Response,
  DeviceManagementUpdateDeviceClassDefaultResponse,
  DeviceManagementDeleteDeviceClass204Response,
  DeviceManagementDeleteDeviceClassDefaultResponse,
  DeviceManagementListInstallableUpdatesForDeviceClass200Response,
  DeviceManagementListInstallableUpdatesForDeviceClassDefaultResponse,
  DeviceManagementListDevices200Response,
  DeviceManagementListDevicesDefaultResponse,
  DeviceManagementImportDevices202Response,
  DeviceManagementImportDevicesDefaultResponse,
  DeviceManagementGetDevice200Response,
  DeviceManagementGetDeviceDefaultResponse,
  DeviceManagementGetDeviceModule200Response,
  DeviceManagementGetDeviceModuleDefaultResponse,
  DeviceManagementGetUpdateCompliance200Response,
  DeviceManagementGetUpdateComplianceDefaultResponse,
  DeviceManagementListGroups200Response,
  DeviceManagementListGroupsDefaultResponse,
  DeviceManagementGetGroup200Response,
  DeviceManagementGetGroupDefaultResponse,
  DeviceManagementDeleteGroup204Response,
  DeviceManagementDeleteGroupDefaultResponse,
  DeviceManagementGetUpdateComplianceForGroup200Response,
  DeviceManagementGetUpdateComplianceForGroupDefaultResponse,
  DeviceManagementListBestUpdatesForGroup200Response,
  DeviceManagementListBestUpdatesForGroupDefaultResponse,
  DeviceManagementListDeploymentsForGroup200Response,
  DeviceManagementListDeploymentsForGroupDefaultResponse,
  DeviceManagementGetDeployment200Response,
  DeviceManagementGetDeploymentDefaultResponse,
  DeviceManagementCreateOrUpdateDeployment200Response,
  DeviceManagementCreateOrUpdateDeployment201Response,
  DeviceManagementCreateOrUpdateDeploymentDefaultResponse,
  DeviceManagementDeleteDeployment204Response,
  DeviceManagementDeleteDeploymentDefaultResponse,
  DeviceManagementGetDeploymentStatus200Response,
  DeviceManagementGetDeploymentStatusDefaultResponse,
  DeviceManagementListDeviceClassSubgroupsForGroup200Response,
  DeviceManagementListDeviceClassSubgroupsForGroupDefaultResponse,
  DeviceManagementGetDeviceClassSubgroup200Response,
  DeviceManagementGetDeviceClassSubgroupDefaultResponse,
  DeviceManagementDeleteDeviceClassSubgroup204Response,
  DeviceManagementDeleteDeviceClassSubgroupDefaultResponse,
  DeviceManagementGetDeviceClassSubgroupUpdateCompliance200Response,
  DeviceManagementGetDeviceClassSubgroupUpdateComplianceDefaultResponse,
  DeviceManagementGetBestUpdatesForDeviceClassSubgroup200Response,
  DeviceManagementGetBestUpdatesForDeviceClassSubgroupDefaultResponse,
  DeviceManagementListDeploymentsForDeviceClassSubgroup200Response,
  DeviceManagementListDeploymentsForDeviceClassSubgroupDefaultResponse,
  DeviceManagementGetDeploymentForDeviceClassSubgroup200Response,
  DeviceManagementGetDeploymentForDeviceClassSubgroupDefaultResponse,
  DeviceManagementDeleteDeploymentForDeviceClassSubgroup204Response,
  DeviceManagementDeleteDeploymentForDeviceClassSubgroupDefaultResponse,
  DeviceManagementStopDeployment200Response,
  DeviceManagementStopDeploymentDefaultResponse,
  DeviceManagementRetryDeployment200Response,
  DeviceManagementRetryDeploymentDefaultResponse,
  DeviceManagementGetDeviceClassSubgroupDeploymentStatus200Response,
  DeviceManagementGetDeviceClassSubgroupDeploymentStatusDefaultResponse,
  DeviceManagementListDeviceStatesForDeviceClassSubgroupDeployment200Response,
  DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentDefaultResponse,
  DeviceManagementGetOperationStatus200Response,
  DeviceManagementGetOperationStatusDefaultResponse,
  DeviceManagementListOperationStatuses200Response,
  DeviceManagementListOperationStatusesDefaultResponse,
  DeviceManagementListLogCollections200Response,
  DeviceManagementListLogCollectionsDefaultResponse,
  DeviceManagementGetLogCollection200Response,
  DeviceManagementGetLogCollectionDefaultResponse,
  DeviceManagementStartLogCollection201Response,
  DeviceManagementStartLogCollectionDefaultResponse,
  DeviceManagementGetLogCollectionDetailedStatus200Response,
  DeviceManagementGetLogCollectionDetailedStatusDefaultResponse,
  DeviceManagementListHealthOfDevices200Response,
  DeviceManagementListHealthOfDevicesDefaultResponse,
  InstanceManagementGetLimits200Response,
  InstanceManagementGetLimitsDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface DeviceUpdateListUpdates {
  /** Get a list of all updates that have been imported to Device Update for IoT Hub. */
  get(
    options?: DeviceUpdateListUpdatesParameters
  ): StreamableMethod<
    DeviceUpdateListUpdates200Response | DeviceUpdateListUpdatesDefaultResponse
  >;
}

export interface DeviceUpdateGetUpdate {
  /** Get a specific update version. */
  get(
    options?: DeviceUpdateGetUpdateParameters
  ): StreamableMethod<
    DeviceUpdateGetUpdate200Response | DeviceUpdateGetUpdateDefaultResponse
  >;
  /**
   * Delete a specific update version. This is a long-running-operation; use
   * Operation-Location response header value to check for operation status.
   */
  delete(
    options?: DeviceUpdateDeleteUpdateParameters
  ): StreamableMethod<
    | DeviceUpdateDeleteUpdate202Response
    | DeviceUpdateDeleteUpdateDefaultResponse
  >;
}

export interface DeviceUpdateImportUpdate {
  /**
   * Import new update version. This is a long-running-operation; use
   * Operation-Location response header value to check for operation status.
   */
  post(
    options: DeviceUpdateImportUpdateParameters
  ): StreamableMethod<
    | DeviceUpdateImportUpdate202Response
    | DeviceUpdateImportUpdateDefaultResponse
  >;
}

export interface DeviceUpdateListProviders {
  /** Get a list of all update providers that have been imported to Device Update for IoT Hub. */
  get(
    options?: DeviceUpdateListProvidersParameters
  ): StreamableMethod<
    | DeviceUpdateListProviders200Response
    | DeviceUpdateListProvidersDefaultResponse
  >;
}

export interface DeviceUpdateListNames {
  /** Get a list of all update names that match the specified provider. */
  get(
    options?: DeviceUpdateListNamesParameters
  ): StreamableMethod<
    DeviceUpdateListNames200Response | DeviceUpdateListNamesDefaultResponse
  >;
}

export interface DeviceUpdateListVersions {
  /** Get a list of all update versions that match the specified provider and name. */
  get(
    options?: DeviceUpdateListVersionsParameters
  ): StreamableMethod<
    | DeviceUpdateListVersions200Response
    | DeviceUpdateListVersionsDefaultResponse
  >;
}

export interface DeviceUpdateListFiles {
  /** Get a list of all update file identifiers for the specified version. */
  get(
    options?: DeviceUpdateListFilesParameters
  ): StreamableMethod<
    DeviceUpdateListFiles200Response | DeviceUpdateListFilesDefaultResponse
  >;
}

export interface DeviceUpdateGetFile {
  /** Get a specific update file from the version. */
  get(
    options?: DeviceUpdateGetFileParameters
  ): StreamableMethod<
    DeviceUpdateGetFile200Response | DeviceUpdateGetFileDefaultResponse
  >;
}

export interface DeviceUpdateListOperationStatuses {
  /**
   * Get a list of all import update operations. Completed operations are kept for 7
   * days before auto-deleted. Delete operations are not returned by this API
   * version.
   */
  get(
    options?: DeviceUpdateListOperationStatusesParameters
  ): StreamableMethod<
    | DeviceUpdateListOperationStatuses200Response
    | DeviceUpdateListOperationStatusesDefaultResponse
  >;
}

export interface DeviceUpdateGetOperationStatus {
  /** Retrieve operation status. */
  get(
    options?: DeviceUpdateGetOperationStatusParameters
  ): StreamableMethod<
    | DeviceUpdateGetOperationStatus200Response
    | DeviceUpdateGetOperationStatusDefaultResponse
  >;
}

export interface DeviceManagementListDeviceClasses {
  /**
   * Gets a list of all device classes (sets of devices compatible with the same
   * updates based on the model Id and compat properties reported in the Device
   * Update PnP interface in IoT Hub) for all devices connected to Device Update for
   * IoT Hub.
   */
  get(
    options?: DeviceManagementListDeviceClassesParameters
  ): StreamableMethod<
    | DeviceManagementListDeviceClasses200Response
    | DeviceManagementListDeviceClassesDefaultResponse
  >;
}

export interface DeviceManagementGetDeviceClass {
  /** Gets the properties of a device class. */
  get(
    options?: DeviceManagementGetDeviceClassParameters
  ): StreamableMethod<
    | DeviceManagementGetDeviceClass200Response
    | DeviceManagementGetDeviceClassDefaultResponse
  >;
  /** Update device class details. */
  patch(
    options: DeviceManagementUpdateDeviceClassParameters
  ): StreamableMethod<
    | DeviceManagementUpdateDeviceClass200Response
    | DeviceManagementUpdateDeviceClassDefaultResponse
  >;
  /**
   * Deletes a device class. Device classes are created automatically when Device
   * Update-enabled devices are connected to the hub but are not automatically
   * cleaned up since they are referenced by DeviceClassSubgroups. If the user has
   * deleted all DeviceClassSubgroups for a device class they can also delete the
   * device class to remove the records from the system and to stop checking the
   * compatibility of this device class with new updates. If a device is ever
   * reconnected for this device class it will be re-created.
   */
  delete(
    options?: DeviceManagementDeleteDeviceClassParameters
  ): StreamableMethod<
    | DeviceManagementDeleteDeviceClass204Response
    | DeviceManagementDeleteDeviceClassDefaultResponse
  >;
}

export interface DeviceManagementListInstallableUpdatesForDeviceClass {
  /** Gets a list of installable updates for a device class. */
  get(
    options?: DeviceManagementListInstallableUpdatesForDeviceClassParameters
  ): StreamableMethod<
    | DeviceManagementListInstallableUpdatesForDeviceClass200Response
    | DeviceManagementListInstallableUpdatesForDeviceClassDefaultResponse
  >;
}

export interface DeviceManagementListDevices {
  /** Gets a list of devices connected to Device Update for IoT Hub. */
  get(
    options?: DeviceManagementListDevicesParameters
  ): StreamableMethod<
    | DeviceManagementListDevices200Response
    | DeviceManagementListDevicesDefaultResponse
  >;
}

export interface DeviceManagementImportDevices {
  /**
   * Import existing devices from IoT Hub. This is a long-running-operation; use
   * Operation-Location response header value to check for operation status.
   */
  post(
    options: DeviceManagementImportDevicesParameters
  ): StreamableMethod<
    | DeviceManagementImportDevices202Response
    | DeviceManagementImportDevicesDefaultResponse
  >;
}

export interface DeviceManagementGetDevice {
  /**
   * Gets the device properties and latest deployment status for a device connected
   * to Device Update for IoT Hub.
   */
  get(
    options?: DeviceManagementGetDeviceParameters
  ): StreamableMethod<
    | DeviceManagementGetDevice200Response
    | DeviceManagementGetDeviceDefaultResponse
  >;
}

export interface DeviceManagementGetDeviceModule {
  /**
   * Gets the device module properties and latest deployment status for a device
   * module connected to Device Update for IoT Hub.
   */
  get(
    options?: DeviceManagementGetDeviceModuleParameters
  ): StreamableMethod<
    | DeviceManagementGetDeviceModule200Response
    | DeviceManagementGetDeviceModuleDefaultResponse
  >;
}

export interface DeviceManagementGetUpdateCompliance {
  /**
   * Gets the breakdown of how many devices are on their latest update, have new
   * updates available, or are in progress receiving new updates.
   */
  get(
    options?: DeviceManagementGetUpdateComplianceParameters
  ): StreamableMethod<
    | DeviceManagementGetUpdateCompliance200Response
    | DeviceManagementGetUpdateComplianceDefaultResponse
  >;
}

export interface DeviceManagementListGroups {
  /** Gets a list of all device groups.  The $default group will always be returned first. */
  get(
    options?: DeviceManagementListGroupsParameters
  ): StreamableMethod<
    | DeviceManagementListGroups200Response
    | DeviceManagementListGroupsDefaultResponse
  >;
}

export interface DeviceManagementGetGroup {
  /** Gets the device group properties. */
  get(
    options?: DeviceManagementGetGroupParameters
  ): StreamableMethod<
    | DeviceManagementGetGroup200Response
    | DeviceManagementGetGroupDefaultResponse
  >;
  /**
   * Deletes a device group. This group is automatically created when a Device
   * Update-enabled device is connected to the hub and reports its properties.
   * Groups, subgroups, and deployments are not automatically cleaned up but are
   * retained for history purposes. Users can call this method to delete a group if
   * they do not need to retain any of the history of the group and no longer need
   * it. If a device is ever connected again for this group after the group was
   * deleted it will be automatically re-created but there will be no history.
   */
  delete(
    options?: DeviceManagementDeleteGroupParameters
  ): StreamableMethod<
    | DeviceManagementDeleteGroup204Response
    | DeviceManagementDeleteGroupDefaultResponse
  >;
}

export interface DeviceManagementGetUpdateComplianceForGroup {
  /**
   * Get device group update compliance information such as how many devices are on
   * their latest update, how many need new updates, and how many are in progress on
   * receiving a new update.
   */
  get(
    options?: DeviceManagementGetUpdateComplianceForGroupParameters
  ): StreamableMethod<
    | DeviceManagementGetUpdateComplianceForGroup200Response
    | DeviceManagementGetUpdateComplianceForGroupDefaultResponse
  >;
}

export interface DeviceManagementListBestUpdatesForGroup {
  /**
   * Get the best available updates for a device group and a count of how many
   * devices need each update.
   */
  get(
    options?: DeviceManagementListBestUpdatesForGroupParameters
  ): StreamableMethod<
    | DeviceManagementListBestUpdatesForGroup200Response
    | DeviceManagementListBestUpdatesForGroupDefaultResponse
  >;
}

export interface DeviceManagementListDeploymentsForGroup {
  /** Gets a list of deployments for a device group. */
  get(
    options?: DeviceManagementListDeploymentsForGroupParameters
  ): StreamableMethod<
    | DeviceManagementListDeploymentsForGroup200Response
    | DeviceManagementListDeploymentsForGroupDefaultResponse
  >;
}

export interface DeviceManagementGetDeployment {
  /** Gets the deployment properties. */
  get(
    options?: DeviceManagementGetDeploymentParameters
  ): StreamableMethod<
    | DeviceManagementGetDeployment200Response
    | DeviceManagementGetDeploymentDefaultResponse
  >;
  /** Creates or updates a deployment. */
  put(
    options: DeviceManagementCreateOrUpdateDeploymentParameters
  ): StreamableMethod<
    | DeviceManagementCreateOrUpdateDeployment200Response
    | DeviceManagementCreateOrUpdateDeployment201Response
    | DeviceManagementCreateOrUpdateDeploymentDefaultResponse
  >;
  /** Deletes a deployment. */
  delete(
    options?: DeviceManagementDeleteDeploymentParameters
  ): StreamableMethod<
    | DeviceManagementDeleteDeployment204Response
    | DeviceManagementDeleteDeploymentDefaultResponse
  >;
}

export interface DeviceManagementGetDeploymentStatus {
  /**
   * Gets the status of a deployment including a breakdown of how many devices in
   * the deployment are in progress, completed, or failed.
   */
  get(
    options?: DeviceManagementGetDeploymentStatusParameters
  ): StreamableMethod<
    | DeviceManagementGetDeploymentStatus200Response
    | DeviceManagementGetDeploymentStatusDefaultResponse
  >;
}

export interface DeviceManagementListDeviceClassSubgroupsForGroup {
  /**
   * Get the device class subgroups for the group. A device class subgroup is the
   * set of devices within the group that share the same device class. All devices
   * within the same device class are compatible with the same updates.
   */
  get(
    options?: DeviceManagementListDeviceClassSubgroupsForGroupParameters
  ): StreamableMethod<
    | DeviceManagementListDeviceClassSubgroupsForGroup200Response
    | DeviceManagementListDeviceClassSubgroupsForGroupDefaultResponse
  >;
}

export interface DeviceManagementGetDeviceClassSubgroup {
  /**
   * Gets device class subgroup details. A device class subgroup is the set of
   * devices within the group that share the same device class. All devices within
   * the same device class are compatible with the same updates.
   */
  get(
    options?: DeviceManagementGetDeviceClassSubgroupParameters
  ): StreamableMethod<
    | DeviceManagementGetDeviceClassSubgroup200Response
    | DeviceManagementGetDeviceClassSubgroupDefaultResponse
  >;
  /**
   * Deletes a device class subgroup. This subgroup is automatically created when a
   * Device Update-enabled device is connected to the hub and reports its
   * properties. Groups, subgroups, and deployments are not automatically cleaned up
   * but are retained for history purposes. Users can call this method to delete a
   * subgroup if they do not need to retain any of the history of the subgroup and
   * no longer need it. If a device is ever connected again for this subgroup after
   * the subgroup was deleted it will be automatically re-created but there will be
   * no history.
   */
  delete(
    options?: DeviceManagementDeleteDeviceClassSubgroupParameters
  ): StreamableMethod<
    | DeviceManagementDeleteDeviceClassSubgroup204Response
    | DeviceManagementDeleteDeviceClassSubgroupDefaultResponse
  >;
}

export interface DeviceManagementGetDeviceClassSubgroupUpdateCompliance {
  /**
   * Get device class subgroup update compliance information such as how many
   * devices are on their latest update, how many need new updates, and how many are
   * in progress on receiving a new update.
   */
  get(
    options?: DeviceManagementGetDeviceClassSubgroupUpdateComplianceParameters
  ): StreamableMethod<
    | DeviceManagementGetDeviceClassSubgroupUpdateCompliance200Response
    | DeviceManagementGetDeviceClassSubgroupUpdateComplianceDefaultResponse
  >;
}

export interface DeviceManagementGetBestUpdatesForDeviceClassSubgroup {
  /**
   * Get the best available update for a device class subgroup and a count of how
   * many devices need this update.
   */
  get(
    options?: DeviceManagementGetBestUpdatesForDeviceClassSubgroupParameters
  ): StreamableMethod<
    | DeviceManagementGetBestUpdatesForDeviceClassSubgroup200Response
    | DeviceManagementGetBestUpdatesForDeviceClassSubgroupDefaultResponse
  >;
}

export interface DeviceManagementListDeploymentsForDeviceClassSubgroup {
  /** Gets a list of deployments for a device class subgroup. */
  get(
    options?: DeviceManagementListDeploymentsForDeviceClassSubgroupParameters
  ): StreamableMethod<
    | DeviceManagementListDeploymentsForDeviceClassSubgroup200Response
    | DeviceManagementListDeploymentsForDeviceClassSubgroupDefaultResponse
  >;
}

export interface DeviceManagementGetDeploymentForDeviceClassSubgroup {
  /** Gets the deployment properties. */
  get(
    options?: DeviceManagementGetDeploymentForDeviceClassSubgroupParameters
  ): StreamableMethod<
    | DeviceManagementGetDeploymentForDeviceClassSubgroup200Response
    | DeviceManagementGetDeploymentForDeviceClassSubgroupDefaultResponse
  >;
  /** Deletes a device class subgroup deployment. */
  delete(
    options?: DeviceManagementDeleteDeploymentForDeviceClassSubgroupParameters
  ): StreamableMethod<
    | DeviceManagementDeleteDeploymentForDeviceClassSubgroup204Response
    | DeviceManagementDeleteDeploymentForDeviceClassSubgroupDefaultResponse
  >;
}

export interface DeviceManagementStopDeployment {
  /** Stops a deployment. */
  post(
    options?: DeviceManagementStopDeploymentParameters
  ): StreamableMethod<
    | DeviceManagementStopDeployment200Response
    | DeviceManagementStopDeploymentDefaultResponse
  >;
}

export interface DeviceManagementRetryDeployment {
  /** Retries a deployment with failed devices. */
  post(
    options?: DeviceManagementRetryDeploymentParameters
  ): StreamableMethod<
    | DeviceManagementRetryDeployment200Response
    | DeviceManagementRetryDeploymentDefaultResponse
  >;
}

export interface DeviceManagementGetDeviceClassSubgroupDeploymentStatus {
  /**
   * Gets the status of a deployment including a breakdown of how many devices in
   * the deployment are in progress, completed, or failed.
   */
  get(
    options?: DeviceManagementGetDeviceClassSubgroupDeploymentStatusParameters
  ): StreamableMethod<
    | DeviceManagementGetDeviceClassSubgroupDeploymentStatus200Response
    | DeviceManagementGetDeviceClassSubgroupDeploymentStatusDefaultResponse
  >;
}

export interface DeviceManagementListDeviceStatesForDeviceClassSubgroupDeployment {
  /**
   * Gets a list of devices in a deployment along with their state. Useful for
   * getting a list of failed devices.
   */
  get(
    options?: DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentParameters
  ): StreamableMethod<
    | DeviceManagementListDeviceStatesForDeviceClassSubgroupDeployment200Response
    | DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentDefaultResponse
  >;
}

export interface DeviceManagementGetOperationStatus {
  /** Retrieve operation status. */
  get(
    options?: DeviceManagementGetOperationStatusParameters
  ): StreamableMethod<
    | DeviceManagementGetOperationStatus200Response
    | DeviceManagementGetOperationStatusDefaultResponse
  >;
}

export interface DeviceManagementListOperationStatuses {
  /** Get a list of all device import operations. Completed operations are kept for 7 days before auto-deleted. */
  get(
    options?: DeviceManagementListOperationStatusesParameters
  ): StreamableMethod<
    | DeviceManagementListOperationStatuses200Response
    | DeviceManagementListOperationStatusesDefaultResponse
  >;
}

export interface DeviceManagementListLogCollections {
  /** Get all device diagnostics log collections */
  get(
    options?: DeviceManagementListLogCollectionsParameters
  ): StreamableMethod<
    | DeviceManagementListLogCollections200Response
    | DeviceManagementListLogCollectionsDefaultResponse
  >;
}

export interface DeviceManagementGetLogCollection {
  /** Get the device diagnostics log collection */
  get(
    options?: DeviceManagementGetLogCollectionParameters
  ): StreamableMethod<
    | DeviceManagementGetLogCollection200Response
    | DeviceManagementGetLogCollectionDefaultResponse
  >;
  /** Start the device diagnostics log collection on specified devices. */
  put(
    options: DeviceManagementStartLogCollectionParameters
  ): StreamableMethod<
    | DeviceManagementStartLogCollection201Response
    | DeviceManagementStartLogCollectionDefaultResponse
  >;
}

export interface DeviceManagementGetLogCollectionDetailedStatus {
  /** Get log collection with detailed status */
  get(
    options?: DeviceManagementGetLogCollectionDetailedStatusParameters
  ): StreamableMethod<
    | DeviceManagementGetLogCollectionDetailedStatus200Response
    | DeviceManagementGetLogCollectionDetailedStatusDefaultResponse
  >;
}

export interface DeviceManagementListHealthOfDevices {
  /** Get list of device health */
  get(
    options?: DeviceManagementListHealthOfDevicesParameters
  ): StreamableMethod<
    | DeviceManagementListHealthOfDevices200Response
    | DeviceManagementListHealthOfDevicesDefaultResponse
  >;
}

export interface InstanceManagementGetLimits {
  /**
   * Gets the instance limits for active deployments, devices, device classes, and
   * groups.
   */
  get(
    options?: InstanceManagementGetLimitsParameters
  ): StreamableMethod<
    | InstanceManagementGetLimits200Response
    | InstanceManagementGetLimitsDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/updates' has methods for the following verbs: get */
  (path: "/updates"): DeviceUpdateListUpdates;
  /** Resource for '/updates/providers/\{provider\}/names/\{name\}/versions/\{version\}' has methods for the following verbs: get, delete */
  (
    path: "/updates/providers/{provider}/names/{name}/versions/{version}",
    provider: string,
    name: string,
    version: string
  ): DeviceUpdateGetUpdate;
  /** Resource for '/updates:import' has methods for the following verbs: post */
  (path: "/updates:import"): DeviceUpdateImportUpdate;
  /** Resource for '/updates/providers' has methods for the following verbs: get */
  (path: "/updates/providers"): DeviceUpdateListProviders;
  /** Resource for '/updates/providers/\{provider\}/names' has methods for the following verbs: get */
  (
    path: "/updates/providers/{provider}/names",
    provider: string
  ): DeviceUpdateListNames;
  /** Resource for '/updates/providers/\{provider\}/names/\{name\}/versions' has methods for the following verbs: get */
  (
    path: "/updates/providers/{provider}/names/{name}/versions",
    provider: string,
    name: string
  ): DeviceUpdateListVersions;
  /** Resource for '/updates/providers/\{provider\}/names/\{name\}/versions/\{version\}/files' has methods for the following verbs: get */
  (
    path: "/updates/providers/{provider}/names/{name}/versions/{version}/files",
    provider: string,
    name: string,
    version: string
  ): DeviceUpdateListFiles;
  /** Resource for '/updates/providers/\{provider\}/names/\{name\}/versions/\{version\}/files/\{fileId\}' has methods for the following verbs: get */
  (
    path: "/updates/providers/{provider}/names/{name}/versions/{version}/files/{fileId}",
    provider: string,
    name: string,
    version: string,
    fileId: string
  ): DeviceUpdateGetFile;
  /** Resource for '/updates/operations' has methods for the following verbs: get */
  (path: "/updates/operations"): DeviceUpdateListOperationStatuses;
  /** Resource for '/updates/operations/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/updates/operations/{operationId}",
    operationId: string
  ): DeviceUpdateGetOperationStatus;
  /** Resource for '/management/deviceClasses' has methods for the following verbs: get */
  (path: "/management/deviceClasses"): DeviceManagementListDeviceClasses;
  /** Resource for '/management/deviceClasses/\{deviceClassId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/management/deviceClasses/{deviceClassId}",
    deviceClassId: string
  ): DeviceManagementGetDeviceClass;
  /** Resource for '/management/deviceClasses/\{deviceClassId\}/installableUpdates' has methods for the following verbs: get */
  (
    path: "/management/deviceClasses/{deviceClassId}/installableUpdates",
    deviceClassId: string
  ): DeviceManagementListInstallableUpdatesForDeviceClass;
  /** Resource for '/management/devices' has methods for the following verbs: get */
  (path: "/management/devices"): DeviceManagementListDevices;
  /** Resource for '/management/devices:import' has methods for the following verbs: post */
  (path: "/management/devices:import"): DeviceManagementImportDevices;
  /** Resource for '/management/devices/\{deviceId\}' has methods for the following verbs: get */
  (
    path: "/management/devices/{deviceId}",
    deviceId: string
  ): DeviceManagementGetDevice;
  /** Resource for '/management/devices/\{deviceId\}/modules/\{moduleId\}' has methods for the following verbs: get */
  (
    path: "/management/devices/{deviceId}/modules/{moduleId}",
    deviceId: string,
    moduleId: string
  ): DeviceManagementGetDeviceModule;
  /** Resource for '/management/updateCompliance' has methods for the following verbs: get */
  (path: "/management/updateCompliance"): DeviceManagementGetUpdateCompliance;
  /** Resource for '/management/groups' has methods for the following verbs: get */
  (path: "/management/groups"): DeviceManagementListGroups;
  /** Resource for '/management/groups/\{groupId\}' has methods for the following verbs: get, delete */
  (
    path: "/management/groups/{groupId}",
    groupId: string
  ): DeviceManagementGetGroup;
  /** Resource for '/management/groups/\{groupId\}/updateCompliance' has methods for the following verbs: get */
  (
    path: "/management/groups/{groupId}/updateCompliance",
    groupId: string
  ): DeviceManagementGetUpdateComplianceForGroup;
  /** Resource for '/management/groups/\{groupId\}/bestUpdates' has methods for the following verbs: get */
  (
    path: "/management/groups/{groupId}/bestUpdates",
    groupId: string
  ): DeviceManagementListBestUpdatesForGroup;
  /** Resource for '/management/groups/\{groupId\}/deployments' has methods for the following verbs: get */
  (
    path: "/management/groups/{groupId}/deployments",
    groupId: string
  ): DeviceManagementListDeploymentsForGroup;
  /** Resource for '/management/groups/\{groupId\}/deployments/\{deploymentId\}' has methods for the following verbs: get, put, delete */
  (
    path: "/management/groups/{groupId}/deployments/{deploymentId}",
    groupId: string,
    deploymentId: string
  ): DeviceManagementGetDeployment;
  /** Resource for '/management/groups/\{groupId\}/deployments/\{deploymentId\}/status' has methods for the following verbs: get */
  (
    path: "/management/groups/{groupId}/deployments/{deploymentId}/status",
    groupId: string,
    deploymentId: string
  ): DeviceManagementGetDeploymentStatus;
  /** Resource for '/management/groups/\{groupId\}/deviceClassSubgroups' has methods for the following verbs: get */
  (
    path: "/management/groups/{groupId}/deviceClassSubgroups",
    groupId: string
  ): DeviceManagementListDeviceClassSubgroupsForGroup;
  /** Resource for '/management/groups/\{groupId\}/deviceClassSubgroups/\{deviceClassId\}' has methods for the following verbs: get, delete */
  (
    path: "/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}",
    groupId: string,
    deviceClassId: string
  ): DeviceManagementGetDeviceClassSubgroup;
  /** Resource for '/management/groups/\{groupId\}/deviceClassSubgroups/\{deviceClassId\}/updateCompliance' has methods for the following verbs: get */
  (
    path: "/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/updateCompliance",
    groupId: string,
    deviceClassId: string
  ): DeviceManagementGetDeviceClassSubgroupUpdateCompliance;
  /** Resource for '/management/groups/\{groupId\}/deviceClassSubgroups/\{deviceClassId\}/bestUpdates' has methods for the following verbs: get */
  (
    path: "/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/bestUpdates",
    groupId: string,
    deviceClassId: string
  ): DeviceManagementGetBestUpdatesForDeviceClassSubgroup;
  /** Resource for '/management/groups/\{groupId\}/deviceClassSubgroups/\{deviceClassId\}/deployments' has methods for the following verbs: get */
  (
    path: "/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments",
    groupId: string,
    deviceClassId: string
  ): DeviceManagementListDeploymentsForDeviceClassSubgroup;
  /** Resource for '/management/groups/\{groupId\}/deviceClassSubgroups/\{deviceClassId\}/deployments/\{deploymentId\}' has methods for the following verbs: get, delete */
  (
    path: "/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}",
    groupId: string,
    deviceClassId: string,
    deploymentId: string
  ): DeviceManagementGetDeploymentForDeviceClassSubgroup;
  /** Resource for '/management/groups/\{groupId\}/deviceClassSubgroups/\{deviceClassId\}/deployments/\{deploymentId\}:cancel' has methods for the following verbs: post */
  (
    path: "/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}:cancel",
    groupId: string,
    deviceClassId: string,
    deploymentId: string
  ): DeviceManagementStopDeployment;
  /** Resource for '/management/groups/\{groupId\}/deviceClassSubgroups/\{deviceClassId\}/deployments/\{deploymentId\}:retry' has methods for the following verbs: post */
  (
    path: "/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}:retry",
    groupId: string,
    deviceClassId: string,
    deploymentId: string
  ): DeviceManagementRetryDeployment;
  /** Resource for '/management/groups/\{groupId\}/deviceClassSubgroups/\{deviceClassId\}/deployments/\{deploymentId\}/status' has methods for the following verbs: get */
  (
    path: "/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}/status",
    groupId: string,
    deviceClassId: string,
    deploymentId: string
  ): DeviceManagementGetDeviceClassSubgroupDeploymentStatus;
  /** Resource for '/management/groups/\{groupId\}/deviceClassSubgroups/\{deviceClassId\}/deployments/\{deploymentId\}/devicestates' has methods for the following verbs: get */
  (
    path: "/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}/devicestates",
    groupId: string,
    deviceClassId: string,
    deploymentId: string
  ): DeviceManagementListDeviceStatesForDeviceClassSubgroupDeployment;
  /** Resource for '/management/operations/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/management/operations/{operationId}",
    operationId: string
  ): DeviceManagementGetOperationStatus;
  /** Resource for '/management/operations' has methods for the following verbs: get */
  (path: "/management/operations"): DeviceManagementListOperationStatuses;
  /** Resource for '/management/deviceDiagnostics/logCollections' has methods for the following verbs: get */
  (
    path: "/management/deviceDiagnostics/logCollections"
  ): DeviceManagementListLogCollections;
  /** Resource for '/management/deviceDiagnostics/logCollections/\{operationId\}' has methods for the following verbs: get, put */
  (
    path: "/management/deviceDiagnostics/logCollections/{operationId}",
    operationId: string
  ): DeviceManagementGetLogCollection;
  /** Resource for '/management/deviceDiagnostics/logCollections/\{operationId\}/detailedStatus' has methods for the following verbs: get */
  (
    path: "/management/deviceDiagnostics/logCollections/{operationId}/detailedStatus",
    operationId: string
  ): DeviceManagementGetLogCollectionDetailedStatus;
  /** Resource for '/management/deviceDiagnostics/deviceHealth' has methods for the following verbs: get */
  (
    path: "/management/deviceDiagnostics/deviceHealth"
  ): DeviceManagementListHealthOfDevices;
  /** Resource for '/limits' has methods for the following verbs: get */
  (path: "/limits"): InstanceManagementGetLimits;
}

export type DeviceUpdateClient = Client & {
  path: Routes;
};
