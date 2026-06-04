// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
import {
  updateAdministrativeState,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/networkMonitors/operations.js";
import type {
  NetworkMonitorsUpdateAdministrativeStateOptionalParams,
  NetworkMonitorsListBySubscriptionOptionalParams,
  NetworkMonitorsListByResourceGroupOptionalParams,
  NetworkMonitorsDeleteOptionalParams,
  NetworkMonitorsUpdateOptionalParams,
  NetworkMonitorsCreateOptionalParams,
  NetworkMonitorsGetOptionalParams,
} from "../../api/networkMonitors/options.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForDeviceUpdate,
  NetworkMonitor,
  NetworkMonitorPatch,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkMonitors operations. */
export interface NetworkMonitorsOperations {
  /** Enables isolation domain across the fabric or on specified racks. */
  updateAdministrativeState: (
    resourceGroupName: string,
    networkMonitorName: string,
    body: UpdateAdministrativeState,
    options?: NetworkMonitorsUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForDeviceUpdate>,
    CommonPostActionResponseForDeviceUpdate
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeState: (
    resourceGroupName: string,
    networkMonitorName: string,
    body: UpdateAdministrativeState,
    options?: NetworkMonitorsUpdateAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CommonPostActionResponseForDeviceUpdate>,
      CommonPostActionResponseForDeviceUpdate
    >
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeStateAndWait: (
    resourceGroupName: string,
    networkMonitorName: string,
    body: UpdateAdministrativeState,
    options?: NetworkMonitorsUpdateAdministrativeStateOptionalParams,
  ) => Promise<CommonPostActionResponseForDeviceUpdate>;
  /** Displays NetworkMonitors list by subscription GET method. */
  listBySubscription: (
    options?: NetworkMonitorsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkMonitor>;
  /** Displays NetworkMonitors list by resource group GET method. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NetworkMonitorsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkMonitor>;
  /** Deletes layer 2 connectivity between compute nodes by managed by named NetworkMonitor name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkMonitorName: string,
    options?: NetworkMonitorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkMonitorName: string,
    options?: NetworkMonitorsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkMonitorName: string,
    options?: NetworkMonitorsDeleteOptionalParams,
  ) => Promise<void>;
  /** API to update certain properties of the NetworkMonitor resource. */
  update: (
    resourceGroupName: string,
    networkMonitorName: string,
    body: NetworkMonitorPatch,
    options?: NetworkMonitorsUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkMonitor>, NetworkMonitor>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    networkMonitorName: string,
    body: NetworkMonitorPatch,
    options?: NetworkMonitorsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkMonitor>, NetworkMonitor>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    networkMonitorName: string,
    body: NetworkMonitorPatch,
    options?: NetworkMonitorsUpdateOptionalParams,
  ) => Promise<NetworkMonitor>;
  /** Creates NetworkMonitor resource. */
  create: (
    resourceGroupName: string,
    networkMonitorName: string,
    body: NetworkMonitor,
    options?: NetworkMonitorsCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkMonitor>, NetworkMonitor>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    networkMonitorName: string,
    body: NetworkMonitor,
    options?: NetworkMonitorsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkMonitor>, NetworkMonitor>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    networkMonitorName: string,
    body: NetworkMonitor,
    options?: NetworkMonitorsCreateOptionalParams,
  ) => Promise<NetworkMonitor>;
  /** Implements NetworkMonitor GET method. */
  get: (
    resourceGroupName: string,
    networkMonitorName: string,
    options?: NetworkMonitorsGetOptionalParams,
  ) => Promise<NetworkMonitor>;
}

function _getNetworkMonitors(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    updateAdministrativeState: (
      resourceGroupName: string,
      networkMonitorName: string,
      body: UpdateAdministrativeState,
      options?: NetworkMonitorsUpdateAdministrativeStateOptionalParams,
    ) => updateAdministrativeState(context, resourceGroupName, networkMonitorName, body, options),
    beginUpdateAdministrativeState: async (
      resourceGroupName: string,
      networkMonitorName: string,
      body: UpdateAdministrativeState,
      options?: NetworkMonitorsUpdateAdministrativeStateOptionalParams,
    ) => {
      const poller = updateAdministrativeState(
        context,
        resourceGroupName,
        networkMonitorName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAdministrativeStateAndWait: async (
      resourceGroupName: string,
      networkMonitorName: string,
      body: UpdateAdministrativeState,
      options?: NetworkMonitorsUpdateAdministrativeStateOptionalParams,
    ) => {
      return await updateAdministrativeState(
        context,
        resourceGroupName,
        networkMonitorName,
        body,
        options,
      );
    },
    listBySubscription: (options?: NetworkMonitorsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NetworkMonitorsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkMonitorName: string,
      options?: NetworkMonitorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkMonitorName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkMonitorName: string,
      options?: NetworkMonitorsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkMonitorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkMonitorName: string,
      options?: NetworkMonitorsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkMonitorName, options);
    },
    update: (
      resourceGroupName: string,
      networkMonitorName: string,
      body: NetworkMonitorPatch,
      options?: NetworkMonitorsUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkMonitorName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      networkMonitorName: string,
      body: NetworkMonitorPatch,
      options?: NetworkMonitorsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, networkMonitorName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      networkMonitorName: string,
      body: NetworkMonitorPatch,
      options?: NetworkMonitorsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, networkMonitorName, body, options);
    },
    create: (
      resourceGroupName: string,
      networkMonitorName: string,
      body: NetworkMonitor,
      options?: NetworkMonitorsCreateOptionalParams,
    ) => create(context, resourceGroupName, networkMonitorName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      networkMonitorName: string,
      body: NetworkMonitor,
      options?: NetworkMonitorsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, networkMonitorName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      networkMonitorName: string,
      body: NetworkMonitor,
      options?: NetworkMonitorsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, networkMonitorName, body, options);
    },
    get: (
      resourceGroupName: string,
      networkMonitorName: string,
      options?: NetworkMonitorsGetOptionalParams,
    ) => get(context, resourceGroupName, networkMonitorName, options),
  };
}

export function _getNetworkMonitorsOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): NetworkMonitorsOperations {
  return {
    ..._getNetworkMonitors(context),
  };
}
