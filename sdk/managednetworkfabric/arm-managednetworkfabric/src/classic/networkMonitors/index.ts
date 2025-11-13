// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext } from "../../api/managedNetworkFabricContext.js";
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
  /** API to update certain properties of the NetworkMonitor resource. */
  update: (
    resourceGroupName: string,
    networkMonitorName: string,
    properties: NetworkMonitorPatch,
    options?: NetworkMonitorsUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkMonitor>, NetworkMonitor>;
  /** Creates NetworkMonitor resource. */
  create: (
    resourceGroupName: string,
    networkMonitorName: string,
    resource: NetworkMonitor,
    options?: NetworkMonitorsCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkMonitor>, NetworkMonitor>;
  /** Implements NetworkMonitor GET method. */
  get: (
    resourceGroupName: string,
    networkMonitorName: string,
    options?: NetworkMonitorsGetOptionalParams,
  ) => Promise<NetworkMonitor>;
}

function _getNetworkMonitors(context: ManagedNetworkFabricContext) {
  return {
    updateAdministrativeState: (
      resourceGroupName: string,
      networkMonitorName: string,
      body: UpdateAdministrativeState,
      options?: NetworkMonitorsUpdateAdministrativeStateOptionalParams,
    ) => updateAdministrativeState(context, resourceGroupName, networkMonitorName, body, options),
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
    update: (
      resourceGroupName: string,
      networkMonitorName: string,
      properties: NetworkMonitorPatch,
      options?: NetworkMonitorsUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkMonitorName, properties, options),
    create: (
      resourceGroupName: string,
      networkMonitorName: string,
      resource: NetworkMonitor,
      options?: NetworkMonitorsCreateOptionalParams,
    ) => create(context, resourceGroupName, networkMonitorName, resource, options),
    get: (
      resourceGroupName: string,
      networkMonitorName: string,
      options?: NetworkMonitorsGetOptionalParams,
    ) => get(context, resourceGroupName, networkMonitorName, options),
  };
}

export function _getNetworkMonitorsOperations(
  context: ManagedNetworkFabricContext,
): NetworkMonitorsOperations {
  return {
    ..._getNetworkMonitors(context),
  };
}
