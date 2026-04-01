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
} from "../../api/networkRacks/operations.js";
import type {
  NetworkRacksListBySubscriptionOptionalParams,
  NetworkRacksListByResourceGroupOptionalParams,
  NetworkRacksDeleteOptionalParams,
  NetworkRacksUpdateOptionalParams,
  NetworkRacksCreateOptionalParams,
  NetworkRacksGetOptionalParams,
} from "../../api/networkRacks/options.js";
import type { NetworkRack, NetworkRackPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkRacks operations. */
export interface NetworkRacksOperations {
  /** List all Network Rack resources in the given subscription */
  listBySubscription: (
    options?: NetworkRacksListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkRack>;
  /** List all Network Rack resources in the given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NetworkRacksListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkRack>;
  /** Delete Network Rack resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkRackName: string,
    options?: NetworkRacksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkRackName: string,
    options?: NetworkRacksDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkRackName: string,
    options?: NetworkRacksDeleteOptionalParams,
  ) => Promise<void>;
  /** Update certain properties of the Network Rack resource. */
  update: (
    resourceGroupName: string,
    networkRackName: string,
    body: NetworkRackPatch,
    options?: NetworkRacksUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkRack>, NetworkRack>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    networkRackName: string,
    body: NetworkRackPatch,
    options?: NetworkRacksUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkRack>, NetworkRack>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    networkRackName: string,
    body: NetworkRackPatch,
    options?: NetworkRacksUpdateOptionalParams,
  ) => Promise<NetworkRack>;
  /** Create Network Rack resource. */
  create: (
    resourceGroupName: string,
    networkRackName: string,
    body: NetworkRack,
    options?: NetworkRacksCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkRack>, NetworkRack>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    networkRackName: string,
    body: NetworkRack,
    options?: NetworkRacksCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkRack>, NetworkRack>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    networkRackName: string,
    body: NetworkRack,
    options?: NetworkRacksCreateOptionalParams,
  ) => Promise<NetworkRack>;
  /** Get Network Rack resource details. */
  get: (
    resourceGroupName: string,
    networkRackName: string,
    options?: NetworkRacksGetOptionalParams,
  ) => Promise<NetworkRack>;
}

function _getNetworkRacks(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    listBySubscription: (options?: NetworkRacksListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NetworkRacksListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkRackName: string,
      options?: NetworkRacksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkRackName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkRackName: string,
      options?: NetworkRacksDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkRackName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkRackName: string,
      options?: NetworkRacksDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkRackName, options);
    },
    update: (
      resourceGroupName: string,
      networkRackName: string,
      body: NetworkRackPatch,
      options?: NetworkRacksUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkRackName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      networkRackName: string,
      body: NetworkRackPatch,
      options?: NetworkRacksUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, networkRackName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      networkRackName: string,
      body: NetworkRackPatch,
      options?: NetworkRacksUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, networkRackName, body, options);
    },
    create: (
      resourceGroupName: string,
      networkRackName: string,
      body: NetworkRack,
      options?: NetworkRacksCreateOptionalParams,
    ) => create(context, resourceGroupName, networkRackName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      networkRackName: string,
      body: NetworkRack,
      options?: NetworkRacksCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, networkRackName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      networkRackName: string,
      body: NetworkRack,
      options?: NetworkRacksCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, networkRackName, body, options);
    },
    get: (
      resourceGroupName: string,
      networkRackName: string,
      options?: NetworkRacksGetOptionalParams,
    ) => get(context, resourceGroupName, networkRackName, options),
  };
}

export function _getNetworkRacksOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): NetworkRacksOperations {
  return {
    ..._getNetworkRacks(context),
  };
}
