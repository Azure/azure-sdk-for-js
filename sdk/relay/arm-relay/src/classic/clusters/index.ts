// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RelayAPIContext } from "../../api/relayAPIContext.js";
import {
  listAvailableClusterRegion,
  listSkus,
  listNamespaces,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/clusters/operations.js";
import type {
  ClustersListAvailableClusterRegionOptionalParams,
  ClustersListSkusOptionalParams,
  ClustersListNamespacesOptionalParams,
  ClustersListBySubscriptionOptionalParams,
  ClustersListByResourceGroupOptionalParams,
  ClustersDeleteOptionalParams,
  ClustersUpdateOptionalParams,
  ClustersCreateOrUpdateOptionalParams,
  ClustersGetOptionalParams,
} from "../../api/clusters/options.js";
import type {
  RelayCluster,
  RelayClusterUpdate,
  RelayNamespaceIdListResult,
  RelayClusterSkuListResult,
  AvailableRelayClustersList,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Clusters operations. */
export interface ClustersOperations {
  /** Lists regions containing available pre-provisioned Relay clusters. */
  listAvailableClusterRegion: (
    options?: ClustersListAvailableClusterRegionOptionalParams,
  ) => Promise<AvailableRelayClustersList>;
  /** Lists SKUs supported by a Relay cluster. */
  listSkus: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersListSkusOptionalParams,
  ) => Promise<RelayClusterSkuListResult>;
  /** Lists Relay namespace resource IDs assigned to a Relay cluster. */
  listNamespaces: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersListNamespacesOptionalParams,
  ) => Promise<RelayNamespaceIdListResult>;
  /** Lists Relay clusters in a subscription. */
  listBySubscription: (
    options?: ClustersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<RelayCluster>;
  /** Lists Relay clusters in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<RelayCluster>;
  /** Deletes a Relay cluster. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates mutable properties of a Relay cluster. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    properties: RelayClusterUpdate,
    options?: ClustersUpdateOptionalParams,
  ) => Promise<RelayCluster>;
  /** Creates or updates a Relay cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    resource: RelayCluster,
    options?: ClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<RelayCluster>, RelayCluster>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    resource: RelayCluster,
    options?: ClustersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RelayCluster>, RelayCluster>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    resource: RelayCluster,
    options?: ClustersCreateOrUpdateOptionalParams,
  ) => Promise<RelayCluster>;
  /** Gets a Relay cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersGetOptionalParams,
  ) => Promise<RelayCluster>;
}
function _getClusters(context: RelayAPIContext) {
  return {
    listAvailableClusterRegion: (options?: ClustersListAvailableClusterRegionOptionalParams) =>
      listAvailableClusterRegion(context, options),
    listSkus: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersListSkusOptionalParams,
    ) => listSkus(context, resourceGroupName, clusterName, options),
    listNamespaces: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersListNamespacesOptionalParams,
    ) => listNamespaces(context, resourceGroupName, clusterName, options),
    listBySubscription: (options?: ClustersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, options);
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      properties: RelayClusterUpdate,
      options?: ClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      resource: RelayCluster,
      options?: ClustersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, clusterName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      resource: RelayCluster,
      options?: ClustersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, clusterName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      resource: RelayCluster,
      options?: ClustersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, clusterName, resource, options);
    },
    get: (resourceGroupName: string, clusterName: string, options?: ClustersGetOptionalParams) =>
      get(context, resourceGroupName, clusterName, options),
  };
}
export function _getClustersOperations(context: RelayAPIContext): ClustersOperations {
  return {
    ..._getClusters(context),
  };
}
