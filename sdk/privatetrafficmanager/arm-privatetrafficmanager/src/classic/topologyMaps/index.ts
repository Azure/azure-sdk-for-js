// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkContext } from "../../api/networkContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/topologyMaps/operations.js";
import type {
  TopologyMapsListBySubscriptionOptionalParams,
  TopologyMapsListByResourceGroupOptionalParams,
  TopologyMapsDeleteOptionalParams,
  TopologyMapsUpdateOptionalParams,
  TopologyMapsCreateOrUpdateOptionalParams,
  TopologyMapsGetOptionalParams,
} from "../../api/topologyMaps/options.js";
import type { TopologyMap, TopologyMapPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TopologyMaps operations. */
export interface TopologyMapsOperations {
  /** Lists all Topology Maps within a subscription. */
  listBySubscription: (
    options?: TopologyMapsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<TopologyMap>;
  /** Lists all Topology Maps within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: TopologyMapsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<TopologyMap>;
  /** Deletes a Topology Map. */
  delete: (
    resourceGroupName: string,
    topologyMapName: string,
    options?: TopologyMapsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a Topology Map. */
  update: (
    resourceGroupName: string,
    topologyMapName: string,
    properties: TopologyMapPatch,
    options?: TopologyMapsUpdateOptionalParams,
  ) => PollerLike<OperationState<TopologyMap>, TopologyMap>;
  /** Create or update a Topology Map. */
  createOrUpdate: (
    resourceGroupName: string,
    topologyMapName: string,
    resource: TopologyMap,
    options?: TopologyMapsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<TopologyMap>, TopologyMap>;
  /** Gets a Topology Map. */
  get: (
    resourceGroupName: string,
    topologyMapName: string,
    options?: TopologyMapsGetOptionalParams,
  ) => Promise<TopologyMap>;
}

function _getTopologyMaps(context: NetworkContext) {
  return {
    listBySubscription: (options?: TopologyMapsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: TopologyMapsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      topologyMapName: string,
      options?: TopologyMapsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, topologyMapName, options),
    update: (
      resourceGroupName: string,
      topologyMapName: string,
      properties: TopologyMapPatch,
      options?: TopologyMapsUpdateOptionalParams,
    ) => update(context, resourceGroupName, topologyMapName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      topologyMapName: string,
      resource: TopologyMap,
      options?: TopologyMapsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, topologyMapName, resource, options),
    get: (
      resourceGroupName: string,
      topologyMapName: string,
      options?: TopologyMapsGetOptionalParams,
    ) => get(context, resourceGroupName, topologyMapName, options),
  };
}

export function _getTopologyMapsOperations(context: NetworkContext): TopologyMapsOperations {
  return {
    ..._getTopologyMaps(context),
  };
}
