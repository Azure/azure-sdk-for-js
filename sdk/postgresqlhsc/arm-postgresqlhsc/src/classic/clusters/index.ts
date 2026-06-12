// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DBforPostgreSQLContext } from "../../api/dBforPostgreSQLContext.js";
import {
  checkNameAvailability,
  stop,
  start,
  restart,
  promoteReadReplica,
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/clusters/operations.js";
import {
  ClustersCheckNameAvailabilityOptionalParams,
  ClustersStopOptionalParams,
  ClustersStartOptionalParams,
  ClustersRestartOptionalParams,
  ClustersPromoteReadReplicaOptionalParams,
  ClustersListOptionalParams,
  ClustersListByResourceGroupOptionalParams,
  ClustersDeleteOptionalParams,
  ClustersUpdateOptionalParams,
  ClustersCreateOptionalParams,
  ClustersGetOptionalParams,
} from "../../api/clusters/options.js";
import {
  Cluster,
  ClusterForUpdate,
  NameAvailabilityRequest,
  NameAvailability,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Clusters operations. */
export interface ClustersOperations {
  /** Checks availability of a cluster name. Cluster names should be globally unique; at least 3 characters and at most 40 characters long; they must only contain lowercase letters, numbers, and hyphens; and must not start or end with a hyphen. */
  checkNameAvailability: (
    nameAvailabilityRequest: NameAvailabilityRequest,
    options?: ClustersCheckNameAvailabilityOptionalParams,
  ) => Promise<NameAvailability>;
  /** Stops compute on all cluster nodes. */
  stop: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Starts stopped compute on all cluster nodes. */
  start: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Restarts all nodes in the cluster. */
  restart: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Promotes read replica cluster to an independent read-write cluster. */
  promoteReadReplica: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersPromoteReadReplicaOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Lists all clusters in a subscription. */
  list: (options?: ClustersListOptionalParams) => PagedAsyncIterableIterator<Cluster>;
  /** Lists all clusters in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Cluster>;
  /** Deletes a cluster together with servers in it. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an existing cluster. The request body can contain one or several properties from the cluster definition. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterForUpdate,
    options?: ClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** Creates a new cluster with servers. */
  create: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Cluster,
    options?: ClustersCreateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** Gets information about a cluster such as compute and storage configuration and cluster lifecycle metadata such as cluster creation date and time. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersGetOptionalParams,
  ) => Promise<Cluster>;
}

function _getClusters(context: DBforPostgreSQLContext) {
  return {
    checkNameAvailability: (
      nameAvailabilityRequest: NameAvailabilityRequest,
      options?: ClustersCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, nameAvailabilityRequest, options),
    stop: (resourceGroupName: string, clusterName: string, options?: ClustersStopOptionalParams) =>
      stop(context, resourceGroupName, clusterName, options),
    start: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersStartOptionalParams,
    ) => start(context, resourceGroupName, clusterName, options),
    restart: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersRestartOptionalParams,
    ) => restart(context, resourceGroupName, clusterName, options),
    promoteReadReplica: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersPromoteReadReplicaOptionalParams,
    ) => promoteReadReplica(context, resourceGroupName, clusterName, options),
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
      parameters: ClusterForUpdate,
      options?: ClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, parameters, options),
    create: (
      resourceGroupName: string,
      clusterName: string,
      parameters: Cluster,
      options?: ClustersCreateOptionalParams,
    ) => create(context, resourceGroupName, clusterName, parameters, options),
    get: (resourceGroupName: string, clusterName: string, options?: ClustersGetOptionalParams) =>
      get(context, resourceGroupName, clusterName, options),
  };
}

export function _getClustersOperations(context: DBforPostgreSQLContext): ClustersOperations {
  return {
    ..._getClusters(context),
  };
}
