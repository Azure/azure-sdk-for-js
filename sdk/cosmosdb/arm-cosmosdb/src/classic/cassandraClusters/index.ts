// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import {
  status,
  start,
  deallocate,
  invokeCommand,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createUpdate,
  get,
} from "../../api/cassandraClusters/operations.js";
import type {
  CassandraClustersStatusOptionalParams,
  CassandraClustersStartOptionalParams,
  CassandraClustersDeallocateOptionalParams,
  CassandraClustersInvokeCommandOptionalParams,
  CassandraClustersListBySubscriptionOptionalParams,
  CassandraClustersListByResourceGroupOptionalParams,
  CassandraClustersDeleteOptionalParams,
  CassandraClustersUpdateOptionalParams,
  CassandraClustersCreateUpdateOptionalParams,
  CassandraClustersGetOptionalParams,
} from "../../api/cassandraClusters/options.js";
import type {
  ClusterResource,
  CommandPostBody,
  CommandOutput,
  CassandraClusterPublicStatus,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CassandraClusters operations. */
export interface CassandraClustersOperations {
  /** Gets the CPU, memory, and disk usage statistics for each Cassandra node in a cluster. */
  status: (
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraClustersStatusOptionalParams,
  ) => Promise<CassandraClusterPublicStatus>;
  /** Start the Managed Cassandra Cluster and Associated Data Centers. Start will start the host virtual machine of this cluster with reserved data disk. This won't do anything on an already running cluster. Use Deallocate to deallocate the cluster. */
  start: (
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraClustersStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraClustersStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraClustersStartOptionalParams,
  ) => Promise<void>;
  /** Deallocate the Managed Cassandra Cluster and Associated Data Centers. Deallocation will deallocate the host virtual machine of this cluster, and reserved the data disk. This won't do anything on an already deallocated cluster. Use Start to restart the cluster. */
  deallocate: (
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraClustersDeallocateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deallocate instead */
  beginDeallocate: (
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraClustersDeallocateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deallocate instead */
  beginDeallocateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraClustersDeallocateOptionalParams,
  ) => Promise<void>;
  /** Invoke a command like nodetool for cassandra maintenance */
  invokeCommand: (
    resourceGroupName: string,
    clusterName: string,
    body: CommandPostBody,
    options?: CassandraClustersInvokeCommandOptionalParams,
  ) => PollerLike<OperationState<CommandOutput>, CommandOutput>;
  /** @deprecated use invokeCommand instead */
  beginInvokeCommand: (
    resourceGroupName: string,
    clusterName: string,
    body: CommandPostBody,
    options?: CassandraClustersInvokeCommandOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CommandOutput>, CommandOutput>>;
  /** @deprecated use invokeCommand instead */
  beginInvokeCommandAndWait: (
    resourceGroupName: string,
    clusterName: string,
    body: CommandPostBody,
    options?: CassandraClustersInvokeCommandOptionalParams,
  ) => Promise<CommandOutput>;
  /** List all managed Cassandra clusters in this subscription. */
  listBySubscription: (
    options?: CassandraClustersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ClusterResource>;
  /** List all managed Cassandra clusters in this resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CassandraClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ClusterResource>;
  /** Deletes a managed Cassandra cluster. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraClustersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraClustersDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates some of the properties of a managed Cassandra cluster. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    body: ClusterResource,
    options?: CassandraClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<ClusterResource>, ClusterResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    body: ClusterResource,
    options?: CassandraClustersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ClusterResource>, ClusterResource>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    body: ClusterResource,
    options?: CassandraClustersUpdateOptionalParams,
  ) => Promise<ClusterResource>;
  /** Create or update a managed Cassandra cluster. When updating, you must specify all writable properties. To update only some properties, use PATCH. */
  createUpdate: (
    resourceGroupName: string,
    clusterName: string,
    body: ClusterResource,
    options?: CassandraClustersCreateUpdateOptionalParams,
  ) => PollerLike<OperationState<ClusterResource>, ClusterResource>;
  /** @deprecated use createUpdate instead */
  beginCreateUpdate: (
    resourceGroupName: string,
    clusterName: string,
    body: ClusterResource,
    options?: CassandraClustersCreateUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ClusterResource>, ClusterResource>>;
  /** @deprecated use createUpdate instead */
  beginCreateUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    body: ClusterResource,
    options?: CassandraClustersCreateUpdateOptionalParams,
  ) => Promise<ClusterResource>;
  /** Get the properties of a managed Cassandra cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraClustersGetOptionalParams,
  ) => Promise<ClusterResource>;
}

function _getCassandraClusters(context: CosmosDBManagementContext) {
  return {
    status: (
      resourceGroupName: string,
      clusterName: string,
      options?: CassandraClustersStatusOptionalParams,
    ) => status(context, resourceGroupName, clusterName, options),
    start: (
      resourceGroupName: string,
      clusterName: string,
      options?: CassandraClustersStartOptionalParams,
    ) => start(context, resourceGroupName, clusterName, options),
    beginStart: async (
      resourceGroupName: string,
      clusterName: string,
      options?: CassandraClustersStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: CassandraClustersStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, clusterName, options);
    },
    deallocate: (
      resourceGroupName: string,
      clusterName: string,
      options?: CassandraClustersDeallocateOptionalParams,
    ) => deallocate(context, resourceGroupName, clusterName, options),
    beginDeallocate: async (
      resourceGroupName: string,
      clusterName: string,
      options?: CassandraClustersDeallocateOptionalParams,
    ) => {
      const poller = deallocate(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeallocateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: CassandraClustersDeallocateOptionalParams,
    ) => {
      return await deallocate(context, resourceGroupName, clusterName, options);
    },
    invokeCommand: (
      resourceGroupName: string,
      clusterName: string,
      body: CommandPostBody,
      options?: CassandraClustersInvokeCommandOptionalParams,
    ) => invokeCommand(context, resourceGroupName, clusterName, body, options),
    beginInvokeCommand: async (
      resourceGroupName: string,
      clusterName: string,
      body: CommandPostBody,
      options?: CassandraClustersInvokeCommandOptionalParams,
    ) => {
      const poller = invokeCommand(context, resourceGroupName, clusterName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginInvokeCommandAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      body: CommandPostBody,
      options?: CassandraClustersInvokeCommandOptionalParams,
    ) => {
      return await invokeCommand(context, resourceGroupName, clusterName, body, options);
    },
    listBySubscription: (options?: CassandraClustersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CassandraClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      options?: CassandraClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      options?: CassandraClustersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: CassandraClustersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, options);
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      body: ClusterResource,
      options?: CassandraClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      body: ClusterResource,
      options?: CassandraClustersUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, clusterName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      body: ClusterResource,
      options?: CassandraClustersUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, clusterName, body, options);
    },
    createUpdate: (
      resourceGroupName: string,
      clusterName: string,
      body: ClusterResource,
      options?: CassandraClustersCreateUpdateOptionalParams,
    ) => createUpdate(context, resourceGroupName, clusterName, body, options),
    beginCreateUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      body: ClusterResource,
      options?: CassandraClustersCreateUpdateOptionalParams,
    ) => {
      const poller = createUpdate(context, resourceGroupName, clusterName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      body: ClusterResource,
      options?: CassandraClustersCreateUpdateOptionalParams,
    ) => {
      return await createUpdate(context, resourceGroupName, clusterName, body, options);
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      options?: CassandraClustersGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, options),
  };
}

export function _getCassandraClustersOperations(
  context: CosmosDBManagementContext,
): CassandraClustersOperations {
  return {
    ..._getCassandraClusters(context),
  };
}
