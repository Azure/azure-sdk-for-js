// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext } from "../../api/managedNetworkFabricContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/networkFabricControllers/operations.js";
import type {
  NetworkFabricControllersListBySubscriptionOptionalParams,
  NetworkFabricControllersListByResourceGroupOptionalParams,
  NetworkFabricControllersDeleteOptionalParams,
  NetworkFabricControllersUpdateOptionalParams,
  NetworkFabricControllersCreateOptionalParams,
  NetworkFabricControllersGetOptionalParams,
} from "../../api/networkFabricControllers/options.js";
import type { NetworkFabricController, NetworkFabricControllerPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkFabricControllers operations. */
export interface NetworkFabricControllersOperations {
  /** Lists all the NetworkFabricControllers by subscription. */
  listBySubscription: (
    options?: NetworkFabricControllersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkFabricController>;
  /** Lists all the NetworkFabricControllers thats available in the resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NetworkFabricControllersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkFabricController>;
  /** Deletes the Network Fabric Controller resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkFabricControllerName: string,
    options?: NetworkFabricControllersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates are currently not supported for the Network Fabric Controller resource. */
  update: (
    resourceGroupName: string,
    networkFabricControllerName: string,
    properties: NetworkFabricControllerPatch,
    options?: NetworkFabricControllersUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkFabricController>, NetworkFabricController>;
  /** Creates a Network Fabric Controller. */
  create: (
    resourceGroupName: string,
    networkFabricControllerName: string,
    resource: NetworkFabricController,
    options?: NetworkFabricControllersCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkFabricController>, NetworkFabricController>;
  /** Shows the provisioning status of Network Fabric Controller. */
  get: (
    resourceGroupName: string,
    networkFabricControllerName: string,
    options?: NetworkFabricControllersGetOptionalParams,
  ) => Promise<NetworkFabricController>;
}

function _getNetworkFabricControllers(context: ManagedNetworkFabricContext) {
  return {
    listBySubscription: (options?: NetworkFabricControllersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NetworkFabricControllersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkFabricControllerName: string,
      options?: NetworkFabricControllersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkFabricControllerName, options),
    update: (
      resourceGroupName: string,
      networkFabricControllerName: string,
      properties: NetworkFabricControllerPatch,
      options?: NetworkFabricControllersUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkFabricControllerName, properties, options),
    create: (
      resourceGroupName: string,
      networkFabricControllerName: string,
      resource: NetworkFabricController,
      options?: NetworkFabricControllersCreateOptionalParams,
    ) => create(context, resourceGroupName, networkFabricControllerName, resource, options),
    get: (
      resourceGroupName: string,
      networkFabricControllerName: string,
      options?: NetworkFabricControllersGetOptionalParams,
    ) => get(context, resourceGroupName, networkFabricControllerName, options),
  };
}

export function _getNetworkFabricControllersOperations(
  context: ManagedNetworkFabricContext,
): NetworkFabricControllersOperations {
  return {
    ..._getNetworkFabricControllers(context),
  };
}
