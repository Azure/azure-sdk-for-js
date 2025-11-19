// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext } from "../../api/managedNetworkFabricContext.js";
import {
  runRwCommand,
  runRoCommand,
  upgrade,
  updateAdministrativeState,
  refreshConfiguration,
  reboot,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/networkDevices/operations.js";
import type {
  NetworkDevicesRunRwCommandOptionalParams,
  NetworkDevicesRunRoCommandOptionalParams,
  NetworkDevicesUpgradeOptionalParams,
  NetworkDevicesUpdateAdministrativeStateOptionalParams,
  NetworkDevicesRefreshConfigurationOptionalParams,
  NetworkDevicesRebootOptionalParams,
  NetworkDevicesListBySubscriptionOptionalParams,
  NetworkDevicesListByResourceGroupOptionalParams,
  NetworkDevicesDeleteOptionalParams,
  NetworkDevicesUpdateOptionalParams,
  NetworkDevicesCreateOptionalParams,
  NetworkDevicesGetOptionalParams,
} from "../../api/networkDevices/options.js";
import type {
  CommonPostActionResponseForStateUpdate,
  NetworkDevice,
  NetworkDevicePatchParameters,
  RebootProperties,
  UpdateDeviceAdministrativeState,
  UpdateVersion,
  DeviceRoCommand,
  CommonPostActionResponseForDeviceROCommandsOperationStatusResult,
  DeviceRwCommand,
  CommonPostActionResponseForDeviceRWCommands,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkDevices operations. */
export interface NetworkDevicesOperations {
  /** Run the RW Command on the Network Device. */
  runRwCommand: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: DeviceRwCommand,
    options?: NetworkDevicesRunRwCommandOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForDeviceRWCommands>,
    CommonPostActionResponseForDeviceRWCommands
  >;
  /** Run the RO Command on the Network Device. */
  runRoCommand: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: DeviceRoCommand,
    options?: NetworkDevicesRunRoCommandOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForDeviceROCommandsOperationStatusResult>,
    CommonPostActionResponseForDeviceROCommandsOperationStatusResult
  >;
  /** Upgrades the version of the Network Device. */
  upgrade: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: UpdateVersion,
    options?: NetworkDevicesUpgradeOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** Updates the Administrative state of the Network Device. */
  updateAdministrativeState: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: UpdateDeviceAdministrativeState,
    options?: NetworkDevicesUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** Refreshes the configuration the Network Device. */
  refreshConfiguration: (
    resourceGroupName: string,
    networkDeviceName: string,
    options?: NetworkDevicesRefreshConfigurationOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** Reboot the Network Device. */
  reboot: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: RebootProperties,
    options?: NetworkDevicesRebootOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** List all the Network Device resources in a given subscription. */
  listBySubscription: (
    options?: NetworkDevicesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkDevice>;
  /** List all the Network Device resources in a given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NetworkDevicesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkDevice>;
  /** Delete the Network Device resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkDeviceName: string,
    options?: NetworkDevicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update certain properties of the Network Device resource. */
  update: (
    resourceGroupName: string,
    networkDeviceName: string,
    properties: NetworkDevicePatchParameters,
    options?: NetworkDevicesUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkDevice>, NetworkDevice>;
  /** Create a Network Device resource */
  create: (
    resourceGroupName: string,
    networkDeviceName: string,
    resource: NetworkDevice,
    options?: NetworkDevicesCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkDevice>, NetworkDevice>;
  /** Gets the Network Device resource details. */
  get: (
    resourceGroupName: string,
    networkDeviceName: string,
    options?: NetworkDevicesGetOptionalParams,
  ) => Promise<NetworkDevice>;
}

function _getNetworkDevices(context: ManagedNetworkFabricContext) {
  return {
    runRwCommand: (
      resourceGroupName: string,
      networkDeviceName: string,
      body: DeviceRwCommand,
      options?: NetworkDevicesRunRwCommandOptionalParams,
    ) => runRwCommand(context, resourceGroupName, networkDeviceName, body, options),
    runRoCommand: (
      resourceGroupName: string,
      networkDeviceName: string,
      body: DeviceRoCommand,
      options?: NetworkDevicesRunRoCommandOptionalParams,
    ) => runRoCommand(context, resourceGroupName, networkDeviceName, body, options),
    upgrade: (
      resourceGroupName: string,
      networkDeviceName: string,
      body: UpdateVersion,
      options?: NetworkDevicesUpgradeOptionalParams,
    ) => upgrade(context, resourceGroupName, networkDeviceName, body, options),
    updateAdministrativeState: (
      resourceGroupName: string,
      networkDeviceName: string,
      body: UpdateDeviceAdministrativeState,
      options?: NetworkDevicesUpdateAdministrativeStateOptionalParams,
    ) => updateAdministrativeState(context, resourceGroupName, networkDeviceName, body, options),
    refreshConfiguration: (
      resourceGroupName: string,
      networkDeviceName: string,
      options?: NetworkDevicesRefreshConfigurationOptionalParams,
    ) => refreshConfiguration(context, resourceGroupName, networkDeviceName, options),
    reboot: (
      resourceGroupName: string,
      networkDeviceName: string,
      body: RebootProperties,
      options?: NetworkDevicesRebootOptionalParams,
    ) => reboot(context, resourceGroupName, networkDeviceName, body, options),
    listBySubscription: (options?: NetworkDevicesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NetworkDevicesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkDeviceName: string,
      options?: NetworkDevicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkDeviceName, options),
    update: (
      resourceGroupName: string,
      networkDeviceName: string,
      properties: NetworkDevicePatchParameters,
      options?: NetworkDevicesUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkDeviceName, properties, options),
    create: (
      resourceGroupName: string,
      networkDeviceName: string,
      resource: NetworkDevice,
      options?: NetworkDevicesCreateOptionalParams,
    ) => create(context, resourceGroupName, networkDeviceName, resource, options),
    get: (
      resourceGroupName: string,
      networkDeviceName: string,
      options?: NetworkDevicesGetOptionalParams,
    ) => get(context, resourceGroupName, networkDeviceName, options),
  };
}

export function _getNetworkDevicesOperations(
  context: ManagedNetworkFabricContext,
): NetworkDevicesOperations {
  return {
    ..._getNetworkDevices(context),
  };
}
