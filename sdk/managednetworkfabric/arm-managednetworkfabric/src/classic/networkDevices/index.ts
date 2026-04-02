// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
import {
  resyncCertificates,
  resyncPasswords,
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
  NetworkDevicesResyncCertificatesOptionalParams,
  NetworkDevicesResyncPasswordsOptionalParams,
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
  OperationStatusResult,
  NetworkDevice,
  NetworkDevicePatchParameters,
  RebootProperties,
  NetworkDeviceRefreshConfigurationResponse,
  UpdateDeviceAdministrativeState,
  NetworkDeviceUpdateAdministrativeStateResponse,
  NetworkDeviceUpgradeRequest,
  NetworkDeviceUpgradeResponse,
  DeviceRoCommand,
  CommonPostActionResponseForDeviceROCommandsOperationStatusResult,
  DeviceRwCommand,
  NetworkDeviceRunRwCommandResponse,
  NetworkDeviceResyncPasswordsResponse,
  NetworkFabricResyncCertificatesResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkDevices operations. */
export interface NetworkDevicesOperations {
  /** Updates the Network Device to use the latest certificates. Does not generate new certificates. Allows network devices missed during a previous certificate rotation to be brought back into sync. */
  resyncCertificates: (
    resourceGroupName: string,
    networkDeviceName: string,
    options?: NetworkDevicesResyncCertificatesOptionalParams,
  ) => PollerLike<
    OperationState<NetworkFabricResyncCertificatesResponse>,
    NetworkFabricResyncCertificatesResponse
  >;
  /** @deprecated use resyncCertificates instead */
  beginResyncCertificates: (
    resourceGroupName: string,
    networkDeviceName: string,
    options?: NetworkDevicesResyncCertificatesOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkFabricResyncCertificatesResponse>,
      NetworkFabricResyncCertificatesResponse
    >
  >;
  /** @deprecated use resyncCertificates instead */
  beginResyncCertificatesAndWait: (
    resourceGroupName: string,
    networkDeviceName: string,
    options?: NetworkDevicesResyncCertificatesOptionalParams,
  ) => Promise<NetworkFabricResyncCertificatesResponse>;
  /** Updates the Network Device to use the latest passwords. Does not generate new passwords. Allows network devices missed during a previous password rotation to be brought back into sync. */
  resyncPasswords: (
    resourceGroupName: string,
    networkDeviceName: string,
    options?: NetworkDevicesResyncPasswordsOptionalParams,
  ) => PollerLike<
    OperationState<NetworkDeviceResyncPasswordsResponse>,
    NetworkDeviceResyncPasswordsResponse
  >;
  /** @deprecated use resyncPasswords instead */
  beginResyncPasswords: (
    resourceGroupName: string,
    networkDeviceName: string,
    options?: NetworkDevicesResyncPasswordsOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkDeviceResyncPasswordsResponse>,
      NetworkDeviceResyncPasswordsResponse
    >
  >;
  /** @deprecated use resyncPasswords instead */
  beginResyncPasswordsAndWait: (
    resourceGroupName: string,
    networkDeviceName: string,
    options?: NetworkDevicesResyncPasswordsOptionalParams,
  ) => Promise<NetworkDeviceResyncPasswordsResponse>;
  /** Run the RW Command on the Network Device. */
  runRwCommand: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: DeviceRwCommand,
    options?: NetworkDevicesRunRwCommandOptionalParams,
  ) => PollerLike<
    OperationState<NetworkDeviceRunRwCommandResponse>,
    NetworkDeviceRunRwCommandResponse
  >;
  /** @deprecated use runRwCommand instead */
  beginRunRwCommand: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: DeviceRwCommand,
    options?: NetworkDevicesRunRwCommandOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkDeviceRunRwCommandResponse>,
      NetworkDeviceRunRwCommandResponse
    >
  >;
  /** @deprecated use runRwCommand instead */
  beginRunRwCommandAndWait: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: DeviceRwCommand,
    options?: NetworkDevicesRunRwCommandOptionalParams,
  ) => Promise<NetworkDeviceRunRwCommandResponse>;
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
  /** @deprecated use runRoCommand instead */
  beginRunRoCommand: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: DeviceRoCommand,
    options?: NetworkDevicesRunRoCommandOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CommonPostActionResponseForDeviceROCommandsOperationStatusResult>,
      CommonPostActionResponseForDeviceROCommandsOperationStatusResult
    >
  >;
  /** @deprecated use runRoCommand instead */
  beginRunRoCommandAndWait: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: DeviceRoCommand,
    options?: NetworkDevicesRunRoCommandOptionalParams,
  ) => Promise<CommonPostActionResponseForDeviceROCommandsOperationStatusResult>;
  /** Upgrades the version of the Network Device. */
  upgrade: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: NetworkDeviceUpgradeRequest,
    options?: NetworkDevicesUpgradeOptionalParams,
  ) => PollerLike<OperationState<NetworkDeviceUpgradeResponse>, NetworkDeviceUpgradeResponse>;
  /** @deprecated use upgrade instead */
  beginUpgrade: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: NetworkDeviceUpgradeRequest,
    options?: NetworkDevicesUpgradeOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<NetworkDeviceUpgradeResponse>, NetworkDeviceUpgradeResponse>
  >;
  /** @deprecated use upgrade instead */
  beginUpgradeAndWait: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: NetworkDeviceUpgradeRequest,
    options?: NetworkDevicesUpgradeOptionalParams,
  ) => Promise<NetworkDeviceUpgradeResponse>;
  /** Updates the Administrative state of the Network Device. */
  updateAdministrativeState: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: UpdateDeviceAdministrativeState,
    options?: NetworkDevicesUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<NetworkDeviceUpdateAdministrativeStateResponse>,
    NetworkDeviceUpdateAdministrativeStateResponse
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeState: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: UpdateDeviceAdministrativeState,
    options?: NetworkDevicesUpdateAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkDeviceUpdateAdministrativeStateResponse>,
      NetworkDeviceUpdateAdministrativeStateResponse
    >
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeStateAndWait: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: UpdateDeviceAdministrativeState,
    options?: NetworkDevicesUpdateAdministrativeStateOptionalParams,
  ) => Promise<NetworkDeviceUpdateAdministrativeStateResponse>;
  /** Refreshes the configuration the Network Device. */
  refreshConfiguration: (
    resourceGroupName: string,
    networkDeviceName: string,
    options?: NetworkDevicesRefreshConfigurationOptionalParams,
  ) => PollerLike<
    OperationState<NetworkDeviceRefreshConfigurationResponse>,
    NetworkDeviceRefreshConfigurationResponse
  >;
  /** @deprecated use refreshConfiguration instead */
  beginRefreshConfiguration: (
    resourceGroupName: string,
    networkDeviceName: string,
    options?: NetworkDevicesRefreshConfigurationOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkDeviceRefreshConfigurationResponse>,
      NetworkDeviceRefreshConfigurationResponse
    >
  >;
  /** @deprecated use refreshConfiguration instead */
  beginRefreshConfigurationAndWait: (
    resourceGroupName: string,
    networkDeviceName: string,
    options?: NetworkDevicesRefreshConfigurationOptionalParams,
  ) => Promise<NetworkDeviceRefreshConfigurationResponse>;
  /** Reboot the Network Device. */
  reboot: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: RebootProperties,
    options?: NetworkDevicesRebootOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use reboot instead */
  beginReboot: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: RebootProperties,
    options?: NetworkDevicesRebootOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use reboot instead */
  beginRebootAndWait: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: RebootProperties,
    options?: NetworkDevicesRebootOptionalParams,
  ) => Promise<OperationStatusResult>;
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkDeviceName: string,
    options?: NetworkDevicesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkDeviceName: string,
    options?: NetworkDevicesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update certain properties of the Network Device resource. */
  update: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: NetworkDevicePatchParameters,
    options?: NetworkDevicesUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkDevice>, NetworkDevice>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: NetworkDevicePatchParameters,
    options?: NetworkDevicesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkDevice>, NetworkDevice>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: NetworkDevicePatchParameters,
    options?: NetworkDevicesUpdateOptionalParams,
  ) => Promise<NetworkDevice>;
  /** Create a Network Device resource */
  create: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: NetworkDevice,
    options?: NetworkDevicesCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkDevice>, NetworkDevice>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: NetworkDevice,
    options?: NetworkDevicesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkDevice>, NetworkDevice>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    networkDeviceName: string,
    body: NetworkDevice,
    options?: NetworkDevicesCreateOptionalParams,
  ) => Promise<NetworkDevice>;
  /** Gets the Network Device resource details. */
  get: (
    resourceGroupName: string,
    networkDeviceName: string,
    options?: NetworkDevicesGetOptionalParams,
  ) => Promise<NetworkDevice>;
}

function _getNetworkDevices(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    resyncCertificates: (
      resourceGroupName: string,
      networkDeviceName: string,
      options?: NetworkDevicesResyncCertificatesOptionalParams,
    ) => resyncCertificates(context, resourceGroupName, networkDeviceName, options),
    beginResyncCertificates: async (
      resourceGroupName: string,
      networkDeviceName: string,
      options?: NetworkDevicesResyncCertificatesOptionalParams,
    ) => {
      const poller = resyncCertificates(context, resourceGroupName, networkDeviceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResyncCertificatesAndWait: async (
      resourceGroupName: string,
      networkDeviceName: string,
      options?: NetworkDevicesResyncCertificatesOptionalParams,
    ) => {
      return await resyncCertificates(context, resourceGroupName, networkDeviceName, options);
    },
    resyncPasswords: (
      resourceGroupName: string,
      networkDeviceName: string,
      options?: NetworkDevicesResyncPasswordsOptionalParams,
    ) => resyncPasswords(context, resourceGroupName, networkDeviceName, options),
    beginResyncPasswords: async (
      resourceGroupName: string,
      networkDeviceName: string,
      options?: NetworkDevicesResyncPasswordsOptionalParams,
    ) => {
      const poller = resyncPasswords(context, resourceGroupName, networkDeviceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResyncPasswordsAndWait: async (
      resourceGroupName: string,
      networkDeviceName: string,
      options?: NetworkDevicesResyncPasswordsOptionalParams,
    ) => {
      return await resyncPasswords(context, resourceGroupName, networkDeviceName, options);
    },
    runRwCommand: (
      resourceGroupName: string,
      networkDeviceName: string,
      body: DeviceRwCommand,
      options?: NetworkDevicesRunRwCommandOptionalParams,
    ) => runRwCommand(context, resourceGroupName, networkDeviceName, body, options),
    beginRunRwCommand: async (
      resourceGroupName: string,
      networkDeviceName: string,
      body: DeviceRwCommand,
      options?: NetworkDevicesRunRwCommandOptionalParams,
    ) => {
      const poller = runRwCommand(context, resourceGroupName, networkDeviceName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRunRwCommandAndWait: async (
      resourceGroupName: string,
      networkDeviceName: string,
      body: DeviceRwCommand,
      options?: NetworkDevicesRunRwCommandOptionalParams,
    ) => {
      return await runRwCommand(context, resourceGroupName, networkDeviceName, body, options);
    },
    runRoCommand: (
      resourceGroupName: string,
      networkDeviceName: string,
      body: DeviceRoCommand,
      options?: NetworkDevicesRunRoCommandOptionalParams,
    ) => runRoCommand(context, resourceGroupName, networkDeviceName, body, options),
    beginRunRoCommand: async (
      resourceGroupName: string,
      networkDeviceName: string,
      body: DeviceRoCommand,
      options?: NetworkDevicesRunRoCommandOptionalParams,
    ) => {
      const poller = runRoCommand(context, resourceGroupName, networkDeviceName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRunRoCommandAndWait: async (
      resourceGroupName: string,
      networkDeviceName: string,
      body: DeviceRoCommand,
      options?: NetworkDevicesRunRoCommandOptionalParams,
    ) => {
      return await runRoCommand(context, resourceGroupName, networkDeviceName, body, options);
    },
    upgrade: (
      resourceGroupName: string,
      networkDeviceName: string,
      body: NetworkDeviceUpgradeRequest,
      options?: NetworkDevicesUpgradeOptionalParams,
    ) => upgrade(context, resourceGroupName, networkDeviceName, body, options),
    beginUpgrade: async (
      resourceGroupName: string,
      networkDeviceName: string,
      body: NetworkDeviceUpgradeRequest,
      options?: NetworkDevicesUpgradeOptionalParams,
    ) => {
      const poller = upgrade(context, resourceGroupName, networkDeviceName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpgradeAndWait: async (
      resourceGroupName: string,
      networkDeviceName: string,
      body: NetworkDeviceUpgradeRequest,
      options?: NetworkDevicesUpgradeOptionalParams,
    ) => {
      return await upgrade(context, resourceGroupName, networkDeviceName, body, options);
    },
    updateAdministrativeState: (
      resourceGroupName: string,
      networkDeviceName: string,
      body: UpdateDeviceAdministrativeState,
      options?: NetworkDevicesUpdateAdministrativeStateOptionalParams,
    ) => updateAdministrativeState(context, resourceGroupName, networkDeviceName, body, options),
    beginUpdateAdministrativeState: async (
      resourceGroupName: string,
      networkDeviceName: string,
      body: UpdateDeviceAdministrativeState,
      options?: NetworkDevicesUpdateAdministrativeStateOptionalParams,
    ) => {
      const poller = updateAdministrativeState(
        context,
        resourceGroupName,
        networkDeviceName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAdministrativeStateAndWait: async (
      resourceGroupName: string,
      networkDeviceName: string,
      body: UpdateDeviceAdministrativeState,
      options?: NetworkDevicesUpdateAdministrativeStateOptionalParams,
    ) => {
      return await updateAdministrativeState(
        context,
        resourceGroupName,
        networkDeviceName,
        body,
        options,
      );
    },
    refreshConfiguration: (
      resourceGroupName: string,
      networkDeviceName: string,
      options?: NetworkDevicesRefreshConfigurationOptionalParams,
    ) => refreshConfiguration(context, resourceGroupName, networkDeviceName, options),
    beginRefreshConfiguration: async (
      resourceGroupName: string,
      networkDeviceName: string,
      options?: NetworkDevicesRefreshConfigurationOptionalParams,
    ) => {
      const poller = refreshConfiguration(context, resourceGroupName, networkDeviceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshConfigurationAndWait: async (
      resourceGroupName: string,
      networkDeviceName: string,
      options?: NetworkDevicesRefreshConfigurationOptionalParams,
    ) => {
      return await refreshConfiguration(context, resourceGroupName, networkDeviceName, options);
    },
    reboot: (
      resourceGroupName: string,
      networkDeviceName: string,
      body: RebootProperties,
      options?: NetworkDevicesRebootOptionalParams,
    ) => reboot(context, resourceGroupName, networkDeviceName, body, options),
    beginReboot: async (
      resourceGroupName: string,
      networkDeviceName: string,
      body: RebootProperties,
      options?: NetworkDevicesRebootOptionalParams,
    ) => {
      const poller = reboot(context, resourceGroupName, networkDeviceName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRebootAndWait: async (
      resourceGroupName: string,
      networkDeviceName: string,
      body: RebootProperties,
      options?: NetworkDevicesRebootOptionalParams,
    ) => {
      return await reboot(context, resourceGroupName, networkDeviceName, body, options);
    },
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
    beginDelete: async (
      resourceGroupName: string,
      networkDeviceName: string,
      options?: NetworkDevicesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkDeviceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkDeviceName: string,
      options?: NetworkDevicesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkDeviceName, options);
    },
    update: (
      resourceGroupName: string,
      networkDeviceName: string,
      body: NetworkDevicePatchParameters,
      options?: NetworkDevicesUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkDeviceName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      networkDeviceName: string,
      body: NetworkDevicePatchParameters,
      options?: NetworkDevicesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, networkDeviceName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      networkDeviceName: string,
      body: NetworkDevicePatchParameters,
      options?: NetworkDevicesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, networkDeviceName, body, options);
    },
    create: (
      resourceGroupName: string,
      networkDeviceName: string,
      body: NetworkDevice,
      options?: NetworkDevicesCreateOptionalParams,
    ) => create(context, resourceGroupName, networkDeviceName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      networkDeviceName: string,
      body: NetworkDevice,
      options?: NetworkDevicesCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, networkDeviceName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      networkDeviceName: string,
      body: NetworkDevice,
      options?: NetworkDevicesCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, networkDeviceName, body, options);
    },
    get: (
      resourceGroupName: string,
      networkDeviceName: string,
      options?: NetworkDevicesGetOptionalParams,
    ) => get(context, resourceGroupName, networkDeviceName, options),
  };
}

export function _getNetworkDevicesOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): NetworkDevicesOperations {
  return {
    ..._getNetworkDevices(context),
  };
}
