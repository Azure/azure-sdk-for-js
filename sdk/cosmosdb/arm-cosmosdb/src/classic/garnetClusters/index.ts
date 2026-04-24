// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createUpdate,
  get,
} from "../../api/garnetClusters/operations.js";
import type {
  GarnetClustersListBySubscriptionOptionalParams,
  GarnetClustersListByResourceGroupOptionalParams,
  GarnetClustersDeleteOptionalParams,
  GarnetClustersUpdateOptionalParams,
  GarnetClustersCreateUpdateOptionalParams,
  GarnetClustersGetOptionalParams,
} from "../../api/garnetClusters/options.js";
import type { GarnetClusterResource, GarnetClusterResourcePatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GarnetClusters operations. */
export interface GarnetClustersOperations {
  /** List all Garnet clusters in this subscription. */
  listBySubscription: (
    options?: GarnetClustersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<GarnetClusterResource>;
  /** List all Garnet clusters in this resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: GarnetClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<GarnetClusterResource>;
  /** Deletes a Garnet cluster. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    options?: GarnetClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    options?: GarnetClustersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: GarnetClustersDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates some of the properties of a garnet cluster. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    body: GarnetClusterResourcePatch,
    options?: GarnetClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<GarnetClusterResource>, GarnetClusterResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    body: GarnetClusterResourcePatch,
    options?: GarnetClustersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GarnetClusterResource>, GarnetClusterResource>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    body: GarnetClusterResourcePatch,
    options?: GarnetClustersUpdateOptionalParams,
  ) => Promise<GarnetClusterResource>;
  /** Create or update a Garnet cache cluster. When updating, you must specify all writable properties. */
  createUpdate: (
    resourceGroupName: string,
    clusterName: string,
    body: GarnetClusterResource,
    options?: GarnetClustersCreateUpdateOptionalParams,
  ) => PollerLike<OperationState<GarnetClusterResource>, GarnetClusterResource>;
  /** @deprecated use createUpdate instead */
  beginCreateUpdate: (
    resourceGroupName: string,
    clusterName: string,
    body: GarnetClusterResource,
    options?: GarnetClustersCreateUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GarnetClusterResource>, GarnetClusterResource>>;
  /** @deprecated use createUpdate instead */
  beginCreateUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    body: GarnetClusterResource,
    options?: GarnetClustersCreateUpdateOptionalParams,
  ) => Promise<GarnetClusterResource>;
  /** Get the properties of a Garnet cache cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: GarnetClustersGetOptionalParams,
  ) => Promise<GarnetClusterResource>;
}

function _getGarnetClusters(context: CosmosDBManagementContext) {
  return {
    listBySubscription: (options?: GarnetClustersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: GarnetClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      options?: GarnetClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      options?: GarnetClustersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: GarnetClustersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, options);
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      body: GarnetClusterResourcePatch,
      options?: GarnetClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      body: GarnetClusterResourcePatch,
      options?: GarnetClustersUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, clusterName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      body: GarnetClusterResourcePatch,
      options?: GarnetClustersUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, clusterName, body, options);
    },
    createUpdate: (
      resourceGroupName: string,
      clusterName: string,
      body: GarnetClusterResource,
      options?: GarnetClustersCreateUpdateOptionalParams,
    ) => createUpdate(context, resourceGroupName, clusterName, body, options),
    beginCreateUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      body: GarnetClusterResource,
      options?: GarnetClustersCreateUpdateOptionalParams,
    ) => {
      const poller = createUpdate(context, resourceGroupName, clusterName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      body: GarnetClusterResource,
      options?: GarnetClustersCreateUpdateOptionalParams,
    ) => {
      return await createUpdate(context, resourceGroupName, clusterName, body, options);
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      options?: GarnetClustersGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, options),
  };
}

export function _getGarnetClustersOperations(
  context: CosmosDBManagementContext,
): GarnetClustersOperations {
  return {
    ..._getGarnetClusters(context),
  };
}
