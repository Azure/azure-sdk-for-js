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
  /** Update certain properties of the Network Rack resource. */
  update: (
    resourceGroupName: string,
    networkRackName: string,
    properties: NetworkRackPatch,
    options?: NetworkRacksUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkRack>, NetworkRack>;
  /** Create Network Rack resource. */
  create: (
    resourceGroupName: string,
    networkRackName: string,
    resource: NetworkRack,
    options?: NetworkRacksCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkRack>, NetworkRack>;
  /** Get Network Rack resource details. */
  get: (
    resourceGroupName: string,
    networkRackName: string,
    options?: NetworkRacksGetOptionalParams,
  ) => Promise<NetworkRack>;
}

function _getNetworkRacks(context: ManagedNetworkFabricContext) {
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
    update: (
      resourceGroupName: string,
      networkRackName: string,
      properties: NetworkRackPatch,
      options?: NetworkRacksUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkRackName, properties, options),
    create: (
      resourceGroupName: string,
      networkRackName: string,
      resource: NetworkRack,
      options?: NetworkRacksCreateOptionalParams,
    ) => create(context, resourceGroupName, networkRackName, resource, options),
    get: (
      resourceGroupName: string,
      networkRackName: string,
      options?: NetworkRacksGetOptionalParams,
    ) => get(context, resourceGroupName, networkRackName, options),
  };
}

export function _getNetworkRacksOperations(
  context: ManagedNetworkFabricContext,
): NetworkRacksOperations {
  return {
    ..._getNetworkRacks(context),
  };
}
