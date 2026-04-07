// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  updateDnsServers,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/virtualClusters/operations.js";
import type {
  VirtualClustersUpdateDnsServersOptionalParams,
  VirtualClustersListOptionalParams,
  VirtualClustersListByResourceGroupOptionalParams,
  VirtualClustersDeleteOptionalParams,
  VirtualClustersUpdateOptionalParams,
  VirtualClustersCreateOrUpdateOptionalParams,
  VirtualClustersGetOptionalParams,
} from "../../api/virtualClusters/options.js";
import type {
  VirtualCluster,
  VirtualClusterUpdate,
  UpdateVirtualClusterDnsServersOperation,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualClusters operations. */
export interface VirtualClustersOperations {
  /** Synchronizes the DNS server settings used by the managed instances inside the given virtual cluster. */
  updateDnsServers: (
    resourceGroupName: string,
    virtualClusterName: string,
    options?: VirtualClustersUpdateDnsServersOptionalParams,
  ) => PollerLike<
    OperationState<UpdateVirtualClusterDnsServersOperation>,
    UpdateVirtualClusterDnsServersOperation
  >;
  /** @deprecated use updateDnsServers instead */
  beginUpdateDnsServers: (
    resourceGroupName: string,
    virtualClusterName: string,
    options?: VirtualClustersUpdateDnsServersOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<UpdateVirtualClusterDnsServersOperation>,
      UpdateVirtualClusterDnsServersOperation
    >
  >;
  /** @deprecated use updateDnsServers instead */
  beginUpdateDnsServersAndWait: (
    resourceGroupName: string,
    virtualClusterName: string,
    options?: VirtualClustersUpdateDnsServersOptionalParams,
  ) => Promise<UpdateVirtualClusterDnsServersOperation>;
  /** Gets a list of all virtualClusters in the subscription. */
  list: (options?: VirtualClustersListOptionalParams) => PagedAsyncIterableIterator<VirtualCluster>;
  /** Gets a list of virtual clusters in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: VirtualClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualCluster>;
  /** Deletes a virtual cluster. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualClusterName: string,
    options?: VirtualClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualClusterName: string,
    options?: VirtualClustersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualClusterName: string,
    options?: VirtualClustersDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing virtual cluster. */
  update: (
    resourceGroupName: string,
    virtualClusterName: string,
    parameters: VirtualClusterUpdate,
    options?: VirtualClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualCluster>, VirtualCluster>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    virtualClusterName: string,
    parameters: VirtualClusterUpdate,
    options?: VirtualClustersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualCluster>, VirtualCluster>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    virtualClusterName: string,
    parameters: VirtualClusterUpdate,
    options?: VirtualClustersUpdateOptionalParams,
  ) => Promise<VirtualCluster>;
  /** Creates virtual cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualClusterName: string,
    parameters: VirtualCluster,
    options?: VirtualClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualCluster>, VirtualCluster>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualClusterName: string,
    parameters: VirtualCluster,
    options?: VirtualClustersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualCluster>, VirtualCluster>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualClusterName: string,
    parameters: VirtualCluster,
    options?: VirtualClustersCreateOrUpdateOptionalParams,
  ) => Promise<VirtualCluster>;
  /** Gets a virtual cluster. */
  get: (
    resourceGroupName: string,
    virtualClusterName: string,
    options?: VirtualClustersGetOptionalParams,
  ) => Promise<VirtualCluster>;
}

function _getVirtualClusters(context: SqlContext) {
  return {
    updateDnsServers: (
      resourceGroupName: string,
      virtualClusterName: string,
      options?: VirtualClustersUpdateDnsServersOptionalParams,
    ) => updateDnsServers(context, resourceGroupName, virtualClusterName, options),
    beginUpdateDnsServers: async (
      resourceGroupName: string,
      virtualClusterName: string,
      options?: VirtualClustersUpdateDnsServersOptionalParams,
    ) => {
      const poller = updateDnsServers(context, resourceGroupName, virtualClusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateDnsServersAndWait: async (
      resourceGroupName: string,
      virtualClusterName: string,
      options?: VirtualClustersUpdateDnsServersOptionalParams,
    ) => {
      return await updateDnsServers(context, resourceGroupName, virtualClusterName, options);
    },
    list: (options?: VirtualClustersListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: VirtualClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      virtualClusterName: string,
      options?: VirtualClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualClusterName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualClusterName: string,
      options?: VirtualClustersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, virtualClusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualClusterName: string,
      options?: VirtualClustersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualClusterName, options);
    },
    update: (
      resourceGroupName: string,
      virtualClusterName: string,
      parameters: VirtualClusterUpdate,
      options?: VirtualClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, virtualClusterName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      virtualClusterName: string,
      parameters: VirtualClusterUpdate,
      options?: VirtualClustersUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, virtualClusterName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      virtualClusterName: string,
      parameters: VirtualClusterUpdate,
      options?: VirtualClustersUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, virtualClusterName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualClusterName: string,
      parameters: VirtualCluster,
      options?: VirtualClustersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, virtualClusterName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualClusterName: string,
      parameters: VirtualCluster,
      options?: VirtualClustersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualClusterName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualClusterName: string,
      parameters: VirtualCluster,
      options?: VirtualClustersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualClusterName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualClusterName: string,
      options?: VirtualClustersGetOptionalParams,
    ) => get(context, resourceGroupName, virtualClusterName, options),
  };
}

export function _getVirtualClustersOperations(context: SqlContext): VirtualClustersOperations {
  return {
    ..._getVirtualClusters(context),
  };
}
