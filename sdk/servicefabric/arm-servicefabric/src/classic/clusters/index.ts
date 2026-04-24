// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagementContext } from "../../api/serviceFabricManagementContext.js";
import {
  listUpgradableVersions,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/clusters/operations.js";
import type {
  ClustersListUpgradableVersionsOptionalParams,
  ClustersListOptionalParams,
  ClustersListByResourceGroupOptionalParams,
  ClustersDeleteOptionalParams,
  ClustersUpdateOptionalParams,
  ClustersCreateOrUpdateOptionalParams,
  ClustersGetOptionalParams,
} from "../../api/clusters/options.js";
import type {
  Cluster,
  ClusterUpdateParameters,
  UpgradableVersionPathResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Clusters operations. */
export interface ClustersOperations {
  /** If a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version. */
  listUpgradableVersions: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersListUpgradableVersionsOptionalParams,
  ) => Promise<UpgradableVersionPathResult>;
  /** Gets all Service Fabric cluster resources created or in the process of being created in the subscription. */
  list: (options?: ClustersListOptionalParams) => PagedAsyncIterableIterator<Cluster>;
  /** Gets all Service Fabric cluster resources created or in the process of being created in the resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Cluster>;
  /** Delete a Service Fabric cluster resource with the specified name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the configuration of a Service Fabric cluster resource with the specified name. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterUpdateParameters,
    options?: ClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterUpdateParameters,
    options?: ClustersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Cluster>, Cluster>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterUpdateParameters,
    options?: ClustersUpdateOptionalParams,
  ) => Promise<Cluster>;
  /** Create or update a Service Fabric cluster resource with the specified name. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Cluster,
    options?: ClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Cluster,
    options?: ClustersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Cluster>, Cluster>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Cluster,
    options?: ClustersCreateOrUpdateOptionalParams,
  ) => Promise<Cluster>;
  /** Get a Service Fabric cluster resource created or in the process of being created in the specified resource group. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersGetOptionalParams,
  ) => Promise<Cluster>;
}

function _getClusters(context: ServiceFabricManagementContext) {
  return {
    listUpgradableVersions: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersListUpgradableVersionsOptionalParams,
    ) => listUpgradableVersions(context, resourceGroupName, clusterName, options),
    list: (options?: ClustersListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, options),
    update: (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterUpdateParameters,
      options?: ClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterUpdateParameters,
      options?: ClustersUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, clusterName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterUpdateParameters,
      options?: ClustersUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, clusterName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      parameters: Cluster,
      options?: ClustersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, clusterName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: Cluster,
      options?: ClustersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, clusterName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: Cluster,
      options?: ClustersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, clusterName, parameters, options);
    },
    get: (resourceGroupName: string, clusterName: string, options?: ClustersGetOptionalParams) =>
      get(context, resourceGroupName, clusterName, options),
  };
}

export function _getClustersOperations(
  context: ServiceFabricManagementContext,
): ClustersOperations {
  return {
    ..._getClusters(context),
  };
}
