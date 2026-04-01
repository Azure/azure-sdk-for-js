// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
import {
  resyncPasswords,
  updateAdministrativeState,
  upgrade,
  refreshConfiguration,
  reboot,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/networkBootstrapDevices/operations.js";
import type {
  NetworkBootstrapDevicesResyncPasswordsOptionalParams,
  NetworkBootstrapDevicesUpdateAdministrativeStateOptionalParams,
  NetworkBootstrapDevicesUpgradeOptionalParams,
  NetworkBootstrapDevicesRefreshConfigurationOptionalParams,
  NetworkBootstrapDevicesRebootOptionalParams,
  NetworkBootstrapDevicesListBySubscriptionOptionalParams,
  NetworkBootstrapDevicesListByResourceGroupOptionalParams,
  NetworkBootstrapDevicesDeleteOptionalParams,
  NetworkBootstrapDevicesUpdateOptionalParams,
  NetworkBootstrapDevicesCreateOptionalParams,
  NetworkBootstrapDevicesGetOptionalParams,
} from "../../api/networkBootstrapDevices/options.js";
import type {
  UpdateDeviceAdministrativeState,
  UpdateVersion,
  NetworkBootstrapDevice,
  NetworkBootstrapDevicePatch,
  NetworkBootstrapDeviceRebootResponse,
  NetworkBootstrapDeviceRefreshConfigurationResponse,
  NetworkBootstrapDeviceUpgradeResponse,
  NetworkBootstrapDeviceUpdateAdministrativeStateResponse,
  NetworkBootstrapDeviceResyncPasswordsResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkBootstrapDevices operations. */
export interface NetworkBootstrapDevicesOperations {
  /** Updates the Network Bootstrap Device to use the latest passwords. Does not generate new passwords. Allows network bootstrap devices missed during a previous password rotation to be brought back into sync. */
  resyncPasswords: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    options?: NetworkBootstrapDevicesResyncPasswordsOptionalParams,
  ) => PollerLike<
    OperationState<NetworkBootstrapDeviceResyncPasswordsResponse>,
    NetworkBootstrapDeviceResyncPasswordsResponse
  >;
  /** @deprecated use resyncPasswords instead */
  beginResyncPasswords: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    options?: NetworkBootstrapDevicesResyncPasswordsOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkBootstrapDeviceResyncPasswordsResponse>,
      NetworkBootstrapDeviceResyncPasswordsResponse
    >
  >;
  /** @deprecated use resyncPasswords instead */
  beginResyncPasswordsAndWait: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    options?: NetworkBootstrapDevicesResyncPasswordsOptionalParams,
  ) => Promise<NetworkBootstrapDeviceResyncPasswordsResponse>;
  /** Updates the Administrative state of the Network Bootstrap Device. */
  updateAdministrativeState: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    body: UpdateDeviceAdministrativeState,
    options?: NetworkBootstrapDevicesUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<NetworkBootstrapDeviceUpdateAdministrativeStateResponse>,
    NetworkBootstrapDeviceUpdateAdministrativeStateResponse
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeState: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    body: UpdateDeviceAdministrativeState,
    options?: NetworkBootstrapDevicesUpdateAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkBootstrapDeviceUpdateAdministrativeStateResponse>,
      NetworkBootstrapDeviceUpdateAdministrativeStateResponse
    >
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeStateAndWait: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    body: UpdateDeviceAdministrativeState,
    options?: NetworkBootstrapDevicesUpdateAdministrativeStateOptionalParams,
  ) => Promise<NetworkBootstrapDeviceUpdateAdministrativeStateResponse>;
  /** Upgrades the version of the Network Bootstrap Device. */
  upgrade: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    body: UpdateVersion,
    options?: NetworkBootstrapDevicesUpgradeOptionalParams,
  ) => PollerLike<
    OperationState<NetworkBootstrapDeviceUpgradeResponse>,
    NetworkBootstrapDeviceUpgradeResponse
  >;
  /** @deprecated use upgrade instead */
  beginUpgrade: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    body: UpdateVersion,
    options?: NetworkBootstrapDevicesUpgradeOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkBootstrapDeviceUpgradeResponse>,
      NetworkBootstrapDeviceUpgradeResponse
    >
  >;
  /** @deprecated use upgrade instead */
  beginUpgradeAndWait: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    body: UpdateVersion,
    options?: NetworkBootstrapDevicesUpgradeOptionalParams,
  ) => Promise<NetworkBootstrapDeviceUpgradeResponse>;
  /** Refreshes the configuration of Network Bootstrap Device. */
  refreshConfiguration: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    options?: NetworkBootstrapDevicesRefreshConfigurationOptionalParams,
  ) => PollerLike<
    OperationState<NetworkBootstrapDeviceRefreshConfigurationResponse>,
    NetworkBootstrapDeviceRefreshConfigurationResponse
  >;
  /** @deprecated use refreshConfiguration instead */
  beginRefreshConfiguration: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    options?: NetworkBootstrapDevicesRefreshConfigurationOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkBootstrapDeviceRefreshConfigurationResponse>,
      NetworkBootstrapDeviceRefreshConfigurationResponse
    >
  >;
  /** @deprecated use refreshConfiguration instead */
  beginRefreshConfigurationAndWait: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    options?: NetworkBootstrapDevicesRefreshConfigurationOptionalParams,
  ) => Promise<NetworkBootstrapDeviceRefreshConfigurationResponse>;
  /** Reboot the Network Bootstrap Device. */
  reboot: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    options?: NetworkBootstrapDevicesRebootOptionalParams,
  ) => PollerLike<
    OperationState<NetworkBootstrapDeviceRebootResponse>,
    NetworkBootstrapDeviceRebootResponse
  >;
  /** @deprecated use reboot instead */
  beginReboot: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    options?: NetworkBootstrapDevicesRebootOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkBootstrapDeviceRebootResponse>,
      NetworkBootstrapDeviceRebootResponse
    >
  >;
  /** @deprecated use reboot instead */
  beginRebootAndWait: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    options?: NetworkBootstrapDevicesRebootOptionalParams,
  ) => Promise<NetworkBootstrapDeviceRebootResponse>;
  /** List all the Network Bootstrap Device resources in a given subscription. */
  listBySubscription: (
    options?: NetworkBootstrapDevicesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkBootstrapDevice>;
  /** Lists all the Network Bootstrap Device resources in a given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NetworkBootstrapDevicesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkBootstrapDevice>;
  /** Deletes a Network Bootstrap Device resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    options?: NetworkBootstrapDevicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    options?: NetworkBootstrapDevicesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    options?: NetworkBootstrapDevicesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update certain properties of the Network Bootstrap Device resource. */
  update: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    body: NetworkBootstrapDevicePatch,
    options?: NetworkBootstrapDevicesUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkBootstrapDevice>, NetworkBootstrapDevice>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    body: NetworkBootstrapDevicePatch,
    options?: NetworkBootstrapDevicesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkBootstrapDevice>, NetworkBootstrapDevice>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    body: NetworkBootstrapDevicePatch,
    options?: NetworkBootstrapDevicesUpdateOptionalParams,
  ) => Promise<NetworkBootstrapDevice>;
  /** Creates a Network Bootstrap Device resource */
  create: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    body: NetworkBootstrapDevice,
    options?: NetworkBootstrapDevicesCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkBootstrapDevice>, NetworkBootstrapDevice>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    body: NetworkBootstrapDevice,
    options?: NetworkBootstrapDevicesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkBootstrapDevice>, NetworkBootstrapDevice>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    body: NetworkBootstrapDevice,
    options?: NetworkBootstrapDevicesCreateOptionalParams,
  ) => Promise<NetworkBootstrapDevice>;
  /** Gets a Network Bootstrap Device resource details. */
  get: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    options?: NetworkBootstrapDevicesGetOptionalParams,
  ) => Promise<NetworkBootstrapDevice>;
}

function _getNetworkBootstrapDevices(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    resyncPasswords: (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      options?: NetworkBootstrapDevicesResyncPasswordsOptionalParams,
    ) => resyncPasswords(context, resourceGroupName, networkBootstrapDeviceName, options),
    beginResyncPasswords: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      options?: NetworkBootstrapDevicesResyncPasswordsOptionalParams,
    ) => {
      const poller = resyncPasswords(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResyncPasswordsAndWait: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      options?: NetworkBootstrapDevicesResyncPasswordsOptionalParams,
    ) => {
      return await resyncPasswords(context, resourceGroupName, networkBootstrapDeviceName, options);
    },
    updateAdministrativeState: (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      body: UpdateDeviceAdministrativeState,
      options?: NetworkBootstrapDevicesUpdateAdministrativeStateOptionalParams,
    ) =>
      updateAdministrativeState(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        body,
        options,
      ),
    beginUpdateAdministrativeState: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      body: UpdateDeviceAdministrativeState,
      options?: NetworkBootstrapDevicesUpdateAdministrativeStateOptionalParams,
    ) => {
      const poller = updateAdministrativeState(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAdministrativeStateAndWait: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      body: UpdateDeviceAdministrativeState,
      options?: NetworkBootstrapDevicesUpdateAdministrativeStateOptionalParams,
    ) => {
      return await updateAdministrativeState(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        body,
        options,
      );
    },
    upgrade: (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      body: UpdateVersion,
      options?: NetworkBootstrapDevicesUpgradeOptionalParams,
    ) => upgrade(context, resourceGroupName, networkBootstrapDeviceName, body, options),
    beginUpgrade: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      body: UpdateVersion,
      options?: NetworkBootstrapDevicesUpgradeOptionalParams,
    ) => {
      const poller = upgrade(context, resourceGroupName, networkBootstrapDeviceName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpgradeAndWait: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      body: UpdateVersion,
      options?: NetworkBootstrapDevicesUpgradeOptionalParams,
    ) => {
      return await upgrade(context, resourceGroupName, networkBootstrapDeviceName, body, options);
    },
    refreshConfiguration: (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      options?: NetworkBootstrapDevicesRefreshConfigurationOptionalParams,
    ) => refreshConfiguration(context, resourceGroupName, networkBootstrapDeviceName, options),
    beginRefreshConfiguration: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      options?: NetworkBootstrapDevicesRefreshConfigurationOptionalParams,
    ) => {
      const poller = refreshConfiguration(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshConfigurationAndWait: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      options?: NetworkBootstrapDevicesRefreshConfigurationOptionalParams,
    ) => {
      return await refreshConfiguration(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        options,
      );
    },
    reboot: (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      options?: NetworkBootstrapDevicesRebootOptionalParams,
    ) => reboot(context, resourceGroupName, networkBootstrapDeviceName, options),
    beginReboot: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      options?: NetworkBootstrapDevicesRebootOptionalParams,
    ) => {
      const poller = reboot(context, resourceGroupName, networkBootstrapDeviceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRebootAndWait: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      options?: NetworkBootstrapDevicesRebootOptionalParams,
    ) => {
      return await reboot(context, resourceGroupName, networkBootstrapDeviceName, options);
    },
    listBySubscription: (options?: NetworkBootstrapDevicesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NetworkBootstrapDevicesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      options?: NetworkBootstrapDevicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkBootstrapDeviceName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      options?: NetworkBootstrapDevicesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkBootstrapDeviceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      options?: NetworkBootstrapDevicesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkBootstrapDeviceName, options);
    },
    update: (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      body: NetworkBootstrapDevicePatch,
      options?: NetworkBootstrapDevicesUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkBootstrapDeviceName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      body: NetworkBootstrapDevicePatch,
      options?: NetworkBootstrapDevicesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, networkBootstrapDeviceName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      body: NetworkBootstrapDevicePatch,
      options?: NetworkBootstrapDevicesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, networkBootstrapDeviceName, body, options);
    },
    create: (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      body: NetworkBootstrapDevice,
      options?: NetworkBootstrapDevicesCreateOptionalParams,
    ) => create(context, resourceGroupName, networkBootstrapDeviceName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      body: NetworkBootstrapDevice,
      options?: NetworkBootstrapDevicesCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, networkBootstrapDeviceName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      body: NetworkBootstrapDevice,
      options?: NetworkBootstrapDevicesCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, networkBootstrapDeviceName, body, options);
    },
    get: (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      options?: NetworkBootstrapDevicesGetOptionalParams,
    ) => get(context, resourceGroupName, networkBootstrapDeviceName, options),
  };
}

export function _getNetworkBootstrapDevicesOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): NetworkBootstrapDevicesOperations {
  return {
    ..._getNetworkBootstrapDevices(context),
  };
}
