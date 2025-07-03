// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { Cluster, ClusterUpdate, ClusterZoneList } from "../../models/models.js";
import {
  ClustersListZonesOptionalParams,
  ClustersDeleteOptionalParams,
  ClustersUpdateOptionalParams,
  ClustersCreateOrUpdateOptionalParams,
  ClustersGetOptionalParams,
  ClustersListOptionalParams,
} from "../../api/clusters/options.js";
import {
  listZones,
  $delete,
  update,
  createOrUpdate,
  get,
  list,
} from "../../api/clusters/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Clusters operations. */
export interface ClustersOperations {
  /** List hosts by zone in a cluster */
  listZones: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    options?: ClustersListZonesOptionalParams,
  ) => Promise<ClusterZoneList>;
  /** Delete a Cluster */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    options?: ClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Cluster */
  update: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    clusterUpdate: ClusterUpdate,
    options?: ClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** Create a Cluster */
  createOrUpdate: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    cluster: Cluster,
    options?: ClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** Get a Cluster */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    options?: ClustersGetOptionalParams,
  ) => Promise<Cluster>;
  /** List Cluster resources by PrivateCloud */
  list: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: ClustersListOptionalParams,
  ) => PagedAsyncIterableIterator<Cluster>;
}

function _getClusters(context: AzureVMwareSolutionAPIContext) {
  return {
    listZones: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      options?: ClustersListZonesOptionalParams,
    ) => listZones(context, apiVersion, resourceGroupName, privateCloudName, clusterName, options),
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      options?: ClustersDeleteOptionalParams,
    ) => $delete(context, apiVersion, resourceGroupName, privateCloudName, clusterName, options),
    update: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      clusterUpdate: ClusterUpdate,
      options?: ClustersUpdateOptionalParams,
    ) =>
      update(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        clusterName,
        clusterUpdate,
        options,
      ),
    createOrUpdate: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      cluster: Cluster,
      options?: ClustersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        clusterName,
        cluster,
        options,
      ),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      options?: ClustersGetOptionalParams,
    ) => get(context, apiVersion, resourceGroupName, privateCloudName, clusterName, options),
    list: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: ClustersListOptionalParams,
    ) => list(context, apiVersion, resourceGroupName, privateCloudName, options),
  };
}

export function _getClustersOperations(context: AzureVMwareSolutionAPIContext): ClustersOperations {
  return {
    ..._getClusters(context),
  };
}
