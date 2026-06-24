// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBForPostgreSQLContext } from "../../api/cosmosDBForPostgreSQLContext.js";
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
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use stop instead */
  beginStop: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersStopOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use stop instead */
  beginStopAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersStopOptionalParams,
  ) => Promise<void>;
  /** Starts stopped compute on all cluster nodes. */
  start: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersStartOptionalParams,
  ) => Promise<void>;
  /** Restarts all nodes in the cluster. */
  restart: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersRestartOptionalParams,
  ) => Promise<void>;
  /** Promotes read replica cluster to an independent read-write cluster. */
  promoteReadReplica: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersPromoteReadReplicaOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use promoteReadReplica instead */
  beginPromoteReadReplica: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersPromoteReadReplicaOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use promoteReadReplica instead */
  beginPromoteReadReplicaAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersPromoteReadReplicaOptionalParams,
  ) => Promise<void>;
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
  /** Updates an existing cluster. The request body can contain one or several properties from the cluster definition. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterForUpdate,
    options?: ClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterForUpdate,
    options?: ClustersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Cluster>, Cluster>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterForUpdate,
    options?: ClustersUpdateOptionalParams,
  ) => Promise<Cluster>;
  /** Creates a new cluster with servers. */
  create: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Cluster,
    options?: ClustersCreateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Cluster,
    options?: ClustersCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Cluster>, Cluster>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Cluster,
    options?: ClustersCreateOptionalParams,
  ) => Promise<Cluster>;
  /** Gets information about a cluster such as compute and storage configuration and cluster lifecycle metadata such as cluster creation date and time. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersGetOptionalParams,
  ) => Promise<Cluster>;
}

function _getClusters(context: CosmosDBForPostgreSQLContext) {
  return {
    checkNameAvailability: (
      nameAvailabilityRequest: NameAvailabilityRequest,
      options?: ClustersCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, nameAvailabilityRequest, options),
    stop: (resourceGroupName: string, clusterName: string, options?: ClustersStopOptionalParams) =>
      stop(context, resourceGroupName, clusterName, options),
    beginStop: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersStopOptionalParams,
    ) => {
      const poller = stop(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersStopOptionalParams,
    ) => {
      return await stop(context, resourceGroupName, clusterName, options);
    },
    start: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersStartOptionalParams,
    ) => start(context, resourceGroupName, clusterName, options),
    beginStart: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, clusterName, options);
    },
    restart: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersRestartOptionalParams,
    ) => restart(context, resourceGroupName, clusterName, options),
    beginRestart: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, clusterName, options);
    },
    promoteReadReplica: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersPromoteReadReplicaOptionalParams,
    ) => promoteReadReplica(context, resourceGroupName, clusterName, options),
    beginPromoteReadReplica: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersPromoteReadReplicaOptionalParams,
    ) => {
      const poller = promoteReadReplica(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPromoteReadReplicaAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersPromoteReadReplicaOptionalParams,
    ) => {
      return await promoteReadReplica(context, resourceGroupName, clusterName, options);
    },
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
      parameters: ClusterForUpdate,
      options?: ClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterForUpdate,
      options?: ClustersUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, clusterName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterForUpdate,
      options?: ClustersUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, clusterName, parameters, options);
    },
    create: (
      resourceGroupName: string,
      clusterName: string,
      parameters: Cluster,
      options?: ClustersCreateOptionalParams,
    ) => create(context, resourceGroupName, clusterName, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: Cluster,
      options?: ClustersCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, clusterName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: Cluster,
      options?: ClustersCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, clusterName, parameters, options);
    },
    get: (resourceGroupName: string, clusterName: string, options?: ClustersGetOptionalParams) =>
      get(context, resourceGroupName, clusterName, options),
  };
}

export function _getClustersOperations(context: CosmosDBForPostgreSQLContext): ClustersOperations {
  return {
    ..._getClusters(context),
  };
}
