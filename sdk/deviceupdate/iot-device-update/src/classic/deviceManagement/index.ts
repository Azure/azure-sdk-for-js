// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceUpdateContext } from "../../api/deviceUpdateContext.js";
import {
  deleteDeploymentForDeviceClassSubgroup,
  deleteDeployment,
  listHealthOfDevices,
  getLogCollectionDetailedStatus,
  listLogCollections,
  getLogCollection,
  startLogCollection,
  listOperationStatuses,
  getOperationStatus,
  listDeviceStatesForDeviceClassSubgroupDeployment,
  getDeviceClassSubgroupDeploymentStatus,
  retryDeployment,
  stopDeployment,
  getDeploymentForDeviceClassSubgroup,
  listDeploymentsForDeviceClassSubgroup,
  getBestUpdatesForDeviceClassSubgroup,
  getDeviceClassSubgroupUpdateCompliance,
  deleteDeviceClassSubgroup,
  getDeviceClassSubgroup,
  listDeviceClassSubgroupsForGroup,
  getDeploymentStatus,
  createOrUpdateDeployment,
  getDeployment,
  listDeploymentsForGroup,
  listBestUpdatesForGroup,
  getUpdateComplianceForGroup,
  deleteGroup,
  getGroup,
  listGroups,
  getUpdateCompliance,
  getDeviceModule,
  getDevice,
  importDevices,
  listDevices,
  listInstallableUpdatesForDeviceClass,
  deleteDeviceClass,
  updateDeviceClass,
  getDeviceClass,
  listDeviceClasses,
} from "../../api/deviceManagement/operations.js";
import {
  DeviceManagementDeleteDeploymentForDeviceClassSubgroupOptionalParams,
  DeviceManagementDeleteDeploymentOptionalParams,
  DeviceManagementListHealthOfDevicesOptionalParams,
  DeviceManagementGetLogCollectionDetailedStatusOptionalParams,
  DeviceManagementListLogCollectionsOptionalParams,
  DeviceManagementGetLogCollectionOptionalParams,
  DeviceManagementStartLogCollectionOptionalParams,
  DeviceManagementListOperationStatusesOptionalParams,
  DeviceManagementGetOperationStatusOptionalParams,
  DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentOptionalParams,
  DeviceManagementGetDeviceClassSubgroupDeploymentStatusOptionalParams,
  DeviceManagementRetryDeploymentOptionalParams,
  DeviceManagementStopDeploymentOptionalParams,
  DeviceManagementGetDeploymentForDeviceClassSubgroupOptionalParams,
  DeviceManagementListDeploymentsForDeviceClassSubgroupOptionalParams,
  DeviceManagementGetBestUpdatesForDeviceClassSubgroupOptionalParams,
  DeviceManagementGetDeviceClassSubgroupUpdateComplianceOptionalParams,
  DeviceManagementDeleteDeviceClassSubgroupOptionalParams,
  DeviceManagementGetDeviceClassSubgroupOptionalParams,
  DeviceManagementListDeviceClassSubgroupsForGroupOptionalParams,
  DeviceManagementGetDeploymentStatusOptionalParams,
  DeviceManagementCreateOrUpdateDeploymentOptionalParams,
  DeviceManagementGetDeploymentOptionalParams,
  DeviceManagementListDeploymentsForGroupOptionalParams,
  DeviceManagementListBestUpdatesForGroupOptionalParams,
  DeviceManagementGetUpdateComplianceForGroupOptionalParams,
  DeviceManagementDeleteGroupOptionalParams,
  DeviceManagementGetGroupOptionalParams,
  DeviceManagementListGroupsOptionalParams,
  DeviceManagementGetUpdateComplianceOptionalParams,
  DeviceManagementGetDeviceModuleOptionalParams,
  DeviceManagementGetDeviceOptionalParams,
  DeviceManagementImportDevicesOptionalParams,
  DeviceManagementListDevicesOptionalParams,
  DeviceManagementListInstallableUpdatesForDeviceClassOptionalParams,
  DeviceManagementDeleteDeviceClassOptionalParams,
  DeviceManagementUpdateDeviceClassOptionalParams,
  DeviceManagementGetDeviceClassOptionalParams,
  DeviceManagementListDeviceClassesOptionalParams,
} from "../../api/deviceManagement/options.js";
import {
  UpdateInfo,
  DeviceClass,
  PatchBody,
  Device,
  DeviceOperation,
  UpdateCompliance,
  Group,
  DeviceClassSubgroupUpdatableDevices,
  Deployment,
  DeploymentStatus,
  DeviceClassSubgroupDeploymentStatus,
  DeviceClassSubgroup,
  DeploymentDeviceState,
  LogCollection,
  LogCollectionOperationDetailedStatus,
  DeviceHealth,
  ImportType,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DeviceManagement operations. */
export interface DeviceManagementOperations {
  /** Deletes a device class subgroup deployment. */
  deleteDeploymentForDeviceClassSubgroup: (
    groupId: string,
    deviceClassId: string,
    deploymentId: string,
    options?: DeviceManagementDeleteDeploymentForDeviceClassSubgroupOptionalParams,
  ) => Promise<void>;
  /** Deletes a deployment. */
  deleteDeployment: (
    groupId: string,
    deploymentId: string,
    options?: DeviceManagementDeleteDeploymentOptionalParams,
  ) => Promise<void>;
  /** Get list of device health */
  listHealthOfDevices: (
    filter: string,
    options?: DeviceManagementListHealthOfDevicesOptionalParams,
  ) => PagedAsyncIterableIterator<DeviceHealth>;
  /** Get log collection with detailed status */
  getLogCollectionDetailedStatus: (
    logCollectionId: string,
    options?: DeviceManagementGetLogCollectionDetailedStatusOptionalParams,
  ) => Promise<LogCollectionOperationDetailedStatus>;
  /** Get all device diagnostics log collections */
  listLogCollections: (
    options?: DeviceManagementListLogCollectionsOptionalParams,
  ) => PagedAsyncIterableIterator<LogCollection>;
  /** Get the device diagnostics log collection */
  getLogCollection: (
    logCollectionId: string,
    options?: DeviceManagementGetLogCollectionOptionalParams,
  ) => Promise<LogCollection>;
  /** Start the device diagnostics log collection on specified devices. */
  startLogCollection: (
    logCollectionId: string,
    logCollection: LogCollection,
    options?: DeviceManagementStartLogCollectionOptionalParams,
  ) => Promise<LogCollection>;
  /**
   * Get a list of all device import operations. Completed operations are kept for 7
   * days before auto-deleted.
   */
  listOperationStatuses: (
    options?: DeviceManagementListOperationStatusesOptionalParams,
  ) => PagedAsyncIterableIterator<DeviceOperation>;
  /** Retrieve operation status. */
  getOperationStatus: (
    operationId: string,
    options?: DeviceManagementGetOperationStatusOptionalParams,
  ) => Promise<DeviceOperation>;
  /**
   * Gets a list of devices in a deployment along with their state. Useful for
   * getting a list of failed devices.
   */
  listDeviceStatesForDeviceClassSubgroupDeployment: (
    groupId: string,
    deviceClassId: string,
    deploymentId: string,
    options?: DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentDeviceState>;
  /**
   * Gets the status of a deployment including a breakdown of how many devices in
   * the deployment are in progress, completed, or failed.
   */
  getDeviceClassSubgroupDeploymentStatus: (
    groupId: string,
    deviceClassId: string,
    deploymentId: string,
    options?: DeviceManagementGetDeviceClassSubgroupDeploymentStatusOptionalParams,
  ) => Promise<DeviceClassSubgroupDeploymentStatus>;
  /** Retries a deployment with failed devices. */
  retryDeployment: (
    groupId: string,
    deviceClassId: string,
    deploymentId: string,
    options?: DeviceManagementRetryDeploymentOptionalParams,
  ) => Promise<Deployment>;
  /** Stops a deployment. */
  stopDeployment: (
    groupId: string,
    deviceClassId: string,
    deploymentId: string,
    options?: DeviceManagementStopDeploymentOptionalParams,
  ) => Promise<Deployment>;
  /** Gets the deployment properties. */
  getDeploymentForDeviceClassSubgroup: (
    groupId: string,
    deviceClassId: string,
    deploymentId: string,
    options?: DeviceManagementGetDeploymentForDeviceClassSubgroupOptionalParams,
  ) => Promise<Deployment>;
  /** Gets a list of deployments for a device class subgroup. */
  listDeploymentsForDeviceClassSubgroup: (
    groupId: string,
    deviceClassId: string,
    options?: DeviceManagementListDeploymentsForDeviceClassSubgroupOptionalParams,
  ) => PagedAsyncIterableIterator<Deployment>;
  /**
   * Get the best available update for a device class subgroup and a count of how
   * many devices need this update.
   */
  getBestUpdatesForDeviceClassSubgroup: (
    groupId: string,
    deviceClassId: string,
    options?: DeviceManagementGetBestUpdatesForDeviceClassSubgroupOptionalParams,
  ) => Promise<DeviceClassSubgroupUpdatableDevices>;
  /**
   * Get device class subgroup update compliance information such as how many
   * devices are on their latest update, how many need new updates, and how many are
   * in progress on receiving a new update.
   */
  getDeviceClassSubgroupUpdateCompliance: (
    groupId: string,
    deviceClassId: string,
    options?: DeviceManagementGetDeviceClassSubgroupUpdateComplianceOptionalParams,
  ) => Promise<UpdateCompliance>;
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
  deleteDeviceClassSubgroup: (
    groupId: string,
    deviceClassId: string,
    options?: DeviceManagementDeleteDeviceClassSubgroupOptionalParams,
  ) => Promise<void>;
  /**
   * Gets device class subgroup details. A device class subgroup is the set of
   * devices within the group that share the same device class. All devices within
   * the same device class are compatible with the same updates.
   */
  getDeviceClassSubgroup: (
    groupId: string,
    deviceClassId: string,
    options?: DeviceManagementGetDeviceClassSubgroupOptionalParams,
  ) => Promise<DeviceClassSubgroup>;
  /**
   * Get the device class subgroups for the group. A device class subgroup is the
   * set of devices within the group that share the same device class. All devices
   * within the same device class are compatible with the same updates.
   */
  listDeviceClassSubgroupsForGroup: (
    groupId: string,
    options?: DeviceManagementListDeviceClassSubgroupsForGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DeviceClassSubgroup>;
  /**
   * Gets the status of a deployment including a breakdown of how many devices in
   * the deployment are in progress, completed, or failed.
   */
  getDeploymentStatus: (
    groupId: string,
    deploymentId: string,
    options?: DeviceManagementGetDeploymentStatusOptionalParams,
  ) => Promise<DeploymentStatus>;
  /** Creates or updates a deployment. */
  createOrUpdateDeployment: (
    groupId: string,
    deploymentId: string,
    deployment: Deployment,
    options?: DeviceManagementCreateOrUpdateDeploymentOptionalParams,
  ) => Promise<Deployment>;
  /** Gets the deployment properties. */
  getDeployment: (
    groupId: string,
    deploymentId: string,
    options?: DeviceManagementGetDeploymentOptionalParams,
  ) => Promise<Deployment>;
  /** Gets a list of deployments for a device group. */
  listDeploymentsForGroup: (
    groupId: string,
    options?: DeviceManagementListDeploymentsForGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Deployment>;
  /**
   * Get the best available updates for a device group and a count of how many
   * devices need each update.
   */
  listBestUpdatesForGroup: (
    groupId: string,
    options?: DeviceManagementListBestUpdatesForGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DeviceClassSubgroupUpdatableDevices>;
  /**
   * Get device group update compliance information such as how many devices are on
   * their latest update, how many need new updates, and how many are in progress on
   * receiving a new update.
   */
  getUpdateComplianceForGroup: (
    groupId: string,
    options?: DeviceManagementGetUpdateComplianceForGroupOptionalParams,
  ) => Promise<UpdateCompliance>;
  /**
   * Deletes a device group. This group is automatically created when a Device
   * Update-enabled device is connected to the hub and reports its properties.
   * Groups, subgroups, and deployments are not automatically cleaned up but are
   * retained for history purposes. Users can call this method to delete a group if
   * they do not need to retain any of the history of the group and no longer need
   * it. If a device is ever connected again for this group after the group was
   * deleted it will be automatically re-created but there will be no history.
   */
  deleteGroup: (
    groupId: string,
    options?: DeviceManagementDeleteGroupOptionalParams,
  ) => Promise<void>;
  /** Gets the device group properties. */
  getGroup: (groupId: string, options?: DeviceManagementGetGroupOptionalParams) => Promise<Group>;
  /**
   * Gets a list of all device groups.  The $default group will always be returned
   * first.
   */
  listGroups: (
    options?: DeviceManagementListGroupsOptionalParams,
  ) => PagedAsyncIterableIterator<Group>;
  /**
   * Gets the breakdown of how many devices are on their latest update, have new
   * updates available, or are in progress receiving new updates.
   */
  getUpdateCompliance: (
    options?: DeviceManagementGetUpdateComplianceOptionalParams,
  ) => Promise<UpdateCompliance>;
  /**
   * Gets the device module properties and latest deployment status for a device
   * module connected to Device Update for IoT Hub.
   */
  getDeviceModule: (
    deviceId: string,
    moduleId: string,
    options?: DeviceManagementGetDeviceModuleOptionalParams,
  ) => Promise<Device>;
  /**
   * Gets the device properties and latest deployment status for a device connected
   * to Device Update for IoT Hub.
   */
  getDevice: (
    deviceId: string,
    options?: DeviceManagementGetDeviceOptionalParams,
  ) => Promise<Device>;
  /**
   * Import existing devices from IoT Hub. This is a long-running-operation; use
   * Operation-Location response header value to check for operation status.
   */
  importDevices: (
    importType: ImportType,
    options?: DeviceManagementImportDevicesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Gets a list of devices connected to Device Update for IoT Hub. */
  listDevices: (
    options?: DeviceManagementListDevicesOptionalParams,
  ) => PagedAsyncIterableIterator<Device>;
  /** Gets a list of installable updates for a device class. */
  listInstallableUpdatesForDeviceClass: (
    deviceClassId: string,
    options?: DeviceManagementListInstallableUpdatesForDeviceClassOptionalParams,
  ) => PagedAsyncIterableIterator<UpdateInfo>;
  /**
   * Deletes a device class. Device classes are created automatically when Device
   * Update-enabled devices are connected to the hub but are not automatically
   * cleaned up since they are referenced by DeviceClassSubgroups. If the user has
   * deleted all DeviceClassSubgroups for a device class they can also delete the
   * device class to remove the records from the system and to stop checking the
   * compatibility of this device class with new updates. If a device is ever
   * reconnected for this device class it will be re-created.
   */
  deleteDeviceClass: (
    deviceClassId: string,
    options?: DeviceManagementDeleteDeviceClassOptionalParams,
  ) => Promise<void>;
  /** Update device class details. */
  updateDeviceClass: (
    deviceClassId: string,
    deviceClassPatch: PatchBody,
    options?: DeviceManagementUpdateDeviceClassOptionalParams,
  ) => Promise<DeviceClass>;
  /** Gets the properties of a device class. */
  getDeviceClass: (
    deviceClassId: string,
    options?: DeviceManagementGetDeviceClassOptionalParams,
  ) => Promise<DeviceClass>;
  /**
   * Gets a list of all device classes (sets of devices compatible with the same
   * updates based on the model Id and compat properties reported in the Device
   * Update PnP interface in IoT Hub) for all devices connected to Device Update for
   * IoT Hub.
   */
  listDeviceClasses: (
    options?: DeviceManagementListDeviceClassesOptionalParams,
  ) => PagedAsyncIterableIterator<DeviceClass>;
}

function _getDeviceManagement(context: DeviceUpdateContext) {
  return {
    deleteDeploymentForDeviceClassSubgroup: (
      groupId: string,
      deviceClassId: string,
      deploymentId: string,
      options?: DeviceManagementDeleteDeploymentForDeviceClassSubgroupOptionalParams,
    ) =>
      deleteDeploymentForDeviceClassSubgroup(
        context,
        groupId,
        deviceClassId,
        deploymentId,
        options,
      ),
    deleteDeployment: (
      groupId: string,
      deploymentId: string,
      options?: DeviceManagementDeleteDeploymentOptionalParams,
    ) => deleteDeployment(context, groupId, deploymentId, options),
    listHealthOfDevices: (
      filter: string,
      options?: DeviceManagementListHealthOfDevicesOptionalParams,
    ) => listHealthOfDevices(context, filter, options),
    getLogCollectionDetailedStatus: (
      logCollectionId: string,
      options?: DeviceManagementGetLogCollectionDetailedStatusOptionalParams,
    ) => getLogCollectionDetailedStatus(context, logCollectionId, options),
    listLogCollections: (options?: DeviceManagementListLogCollectionsOptionalParams) =>
      listLogCollections(context, options),
    getLogCollection: (
      logCollectionId: string,
      options?: DeviceManagementGetLogCollectionOptionalParams,
    ) => getLogCollection(context, logCollectionId, options),
    startLogCollection: (
      logCollectionId: string,
      logCollection: LogCollection,
      options?: DeviceManagementStartLogCollectionOptionalParams,
    ) => startLogCollection(context, logCollectionId, logCollection, options),
    listOperationStatuses: (options?: DeviceManagementListOperationStatusesOptionalParams) =>
      listOperationStatuses(context, options),
    getOperationStatus: (
      operationId: string,
      options?: DeviceManagementGetOperationStatusOptionalParams,
    ) => getOperationStatus(context, operationId, options),
    listDeviceStatesForDeviceClassSubgroupDeployment: (
      groupId: string,
      deviceClassId: string,
      deploymentId: string,
      options?: DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentOptionalParams,
    ) =>
      listDeviceStatesForDeviceClassSubgroupDeployment(
        context,
        groupId,
        deviceClassId,
        deploymentId,
        options,
      ),
    getDeviceClassSubgroupDeploymentStatus: (
      groupId: string,
      deviceClassId: string,
      deploymentId: string,
      options?: DeviceManagementGetDeviceClassSubgroupDeploymentStatusOptionalParams,
    ) =>
      getDeviceClassSubgroupDeploymentStatus(
        context,
        groupId,
        deviceClassId,
        deploymentId,
        options,
      ),
    retryDeployment: (
      groupId: string,
      deviceClassId: string,
      deploymentId: string,
      options?: DeviceManagementRetryDeploymentOptionalParams,
    ) => retryDeployment(context, groupId, deviceClassId, deploymentId, options),
    stopDeployment: (
      groupId: string,
      deviceClassId: string,
      deploymentId: string,
      options?: DeviceManagementStopDeploymentOptionalParams,
    ) => stopDeployment(context, groupId, deviceClassId, deploymentId, options),
    getDeploymentForDeviceClassSubgroup: (
      groupId: string,
      deviceClassId: string,
      deploymentId: string,
      options?: DeviceManagementGetDeploymentForDeviceClassSubgroupOptionalParams,
    ) =>
      getDeploymentForDeviceClassSubgroup(context, groupId, deviceClassId, deploymentId, options),
    listDeploymentsForDeviceClassSubgroup: (
      groupId: string,
      deviceClassId: string,
      options?: DeviceManagementListDeploymentsForDeviceClassSubgroupOptionalParams,
    ) => listDeploymentsForDeviceClassSubgroup(context, groupId, deviceClassId, options),
    getBestUpdatesForDeviceClassSubgroup: (
      groupId: string,
      deviceClassId: string,
      options?: DeviceManagementGetBestUpdatesForDeviceClassSubgroupOptionalParams,
    ) => getBestUpdatesForDeviceClassSubgroup(context, groupId, deviceClassId, options),
    getDeviceClassSubgroupUpdateCompliance: (
      groupId: string,
      deviceClassId: string,
      options?: DeviceManagementGetDeviceClassSubgroupUpdateComplianceOptionalParams,
    ) => getDeviceClassSubgroupUpdateCompliance(context, groupId, deviceClassId, options),
    deleteDeviceClassSubgroup: (
      groupId: string,
      deviceClassId: string,
      options?: DeviceManagementDeleteDeviceClassSubgroupOptionalParams,
    ) => deleteDeviceClassSubgroup(context, groupId, deviceClassId, options),
    getDeviceClassSubgroup: (
      groupId: string,
      deviceClassId: string,
      options?: DeviceManagementGetDeviceClassSubgroupOptionalParams,
    ) => getDeviceClassSubgroup(context, groupId, deviceClassId, options),
    listDeviceClassSubgroupsForGroup: (
      groupId: string,
      options?: DeviceManagementListDeviceClassSubgroupsForGroupOptionalParams,
    ) => listDeviceClassSubgroupsForGroup(context, groupId, options),
    getDeploymentStatus: (
      groupId: string,
      deploymentId: string,
      options?: DeviceManagementGetDeploymentStatusOptionalParams,
    ) => getDeploymentStatus(context, groupId, deploymentId, options),
    createOrUpdateDeployment: (
      groupId: string,
      deploymentId: string,
      deployment: Deployment,
      options?: DeviceManagementCreateOrUpdateDeploymentOptionalParams,
    ) => createOrUpdateDeployment(context, groupId, deploymentId, deployment, options),
    getDeployment: (
      groupId: string,
      deploymentId: string,
      options?: DeviceManagementGetDeploymentOptionalParams,
    ) => getDeployment(context, groupId, deploymentId, options),
    listDeploymentsForGroup: (
      groupId: string,
      options?: DeviceManagementListDeploymentsForGroupOptionalParams,
    ) => listDeploymentsForGroup(context, groupId, options),
    listBestUpdatesForGroup: (
      groupId: string,
      options?: DeviceManagementListBestUpdatesForGroupOptionalParams,
    ) => listBestUpdatesForGroup(context, groupId, options),
    getUpdateComplianceForGroup: (
      groupId: string,
      options?: DeviceManagementGetUpdateComplianceForGroupOptionalParams,
    ) => getUpdateComplianceForGroup(context, groupId, options),
    deleteGroup: (groupId: string, options?: DeviceManagementDeleteGroupOptionalParams) =>
      deleteGroup(context, groupId, options),
    getGroup: (groupId: string, options?: DeviceManagementGetGroupOptionalParams) =>
      getGroup(context, groupId, options),
    listGroups: (options?: DeviceManagementListGroupsOptionalParams) =>
      listGroups(context, options),
    getUpdateCompliance: (options?: DeviceManagementGetUpdateComplianceOptionalParams) =>
      getUpdateCompliance(context, options),
    getDeviceModule: (
      deviceId: string,
      moduleId: string,
      options?: DeviceManagementGetDeviceModuleOptionalParams,
    ) => getDeviceModule(context, deviceId, moduleId, options),
    getDevice: (deviceId: string, options?: DeviceManagementGetDeviceOptionalParams) =>
      getDevice(context, deviceId, options),
    importDevices: (
      importType: ImportType,
      options?: DeviceManagementImportDevicesOptionalParams,
    ) => importDevices(context, importType, options),
    listDevices: (options?: DeviceManagementListDevicesOptionalParams) =>
      listDevices(context, options),
    listInstallableUpdatesForDeviceClass: (
      deviceClassId: string,
      options?: DeviceManagementListInstallableUpdatesForDeviceClassOptionalParams,
    ) => listInstallableUpdatesForDeviceClass(context, deviceClassId, options),
    deleteDeviceClass: (
      deviceClassId: string,
      options?: DeviceManagementDeleteDeviceClassOptionalParams,
    ) => deleteDeviceClass(context, deviceClassId, options),
    updateDeviceClass: (
      deviceClassId: string,
      deviceClassPatch: PatchBody,
      options?: DeviceManagementUpdateDeviceClassOptionalParams,
    ) => updateDeviceClass(context, deviceClassId, deviceClassPatch, options),
    getDeviceClass: (
      deviceClassId: string,
      options?: DeviceManagementGetDeviceClassOptionalParams,
    ) => getDeviceClass(context, deviceClassId, options),
    listDeviceClasses: (options?: DeviceManagementListDeviceClassesOptionalParams) =>
      listDeviceClasses(context, options),
  };
}

export function _getDeviceManagementOperations(
  context: DeviceUpdateContext,
): DeviceManagementOperations {
  return {
    ..._getDeviceManagement(context),
  };
}
