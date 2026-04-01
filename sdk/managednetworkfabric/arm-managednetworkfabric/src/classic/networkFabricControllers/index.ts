// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkFabricControllerName: string,
    options?: NetworkFabricControllersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkFabricControllerName: string,
    options?: NetworkFabricControllersDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates are currently not supported for the Network Fabric Controller resource. */
  update: (
    resourceGroupName: string,
    networkFabricControllerName: string,
    body: NetworkFabricControllerPatch,
    options?: NetworkFabricControllersUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkFabricController>, NetworkFabricController>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    networkFabricControllerName: string,
    body: NetworkFabricControllerPatch,
    options?: NetworkFabricControllersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkFabricController>, NetworkFabricController>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    networkFabricControllerName: string,
    body: NetworkFabricControllerPatch,
    options?: NetworkFabricControllersUpdateOptionalParams,
  ) => Promise<NetworkFabricController>;
  /** Creates a Network Fabric Controller. */
  create: (
    resourceGroupName: string,
    networkFabricControllerName: string,
    body: NetworkFabricController,
    options?: NetworkFabricControllersCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkFabricController>, NetworkFabricController>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    networkFabricControllerName: string,
    body: NetworkFabricController,
    options?: NetworkFabricControllersCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkFabricController>, NetworkFabricController>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    networkFabricControllerName: string,
    body: NetworkFabricController,
    options?: NetworkFabricControllersCreateOptionalParams,
  ) => Promise<NetworkFabricController>;
  /** Shows the provisioning status of Network Fabric Controller. */
  get: (
    resourceGroupName: string,
    networkFabricControllerName: string,
    options?: NetworkFabricControllersGetOptionalParams,
  ) => Promise<NetworkFabricController>;
}

function _getNetworkFabricControllers(context: AzureNetworkFabricManagementServiceAPIContext) {
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
    beginDelete: async (
      resourceGroupName: string,
      networkFabricControllerName: string,
      options?: NetworkFabricControllersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkFabricControllerName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkFabricControllerName: string,
      options?: NetworkFabricControllersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkFabricControllerName, options);
    },
    update: (
      resourceGroupName: string,
      networkFabricControllerName: string,
      body: NetworkFabricControllerPatch,
      options?: NetworkFabricControllersUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkFabricControllerName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      networkFabricControllerName: string,
      body: NetworkFabricControllerPatch,
      options?: NetworkFabricControllersUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, networkFabricControllerName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      networkFabricControllerName: string,
      body: NetworkFabricControllerPatch,
      options?: NetworkFabricControllersUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, networkFabricControllerName, body, options);
    },
    create: (
      resourceGroupName: string,
      networkFabricControllerName: string,
      body: NetworkFabricController,
      options?: NetworkFabricControllersCreateOptionalParams,
    ) => create(context, resourceGroupName, networkFabricControllerName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      networkFabricControllerName: string,
      body: NetworkFabricController,
      options?: NetworkFabricControllersCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, networkFabricControllerName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      networkFabricControllerName: string,
      body: NetworkFabricController,
      options?: NetworkFabricControllersCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, networkFabricControllerName, body, options);
    },
    get: (
      resourceGroupName: string,
      networkFabricControllerName: string,
      options?: NetworkFabricControllersGetOptionalParams,
    ) => get(context, resourceGroupName, networkFabricControllerName, options),
  };
}

export function _getNetworkFabricControllersOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): NetworkFabricControllersOperations {
  return {
    ..._getNetworkFabricControllers(context),
  };
}
