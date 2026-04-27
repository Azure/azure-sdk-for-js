// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import {
  $delete,
  update,
  createOrUpdate,
  list,
  get,
} from "../../api/horizonDbReplicas/operations.js";
import type {
  HorizonDbReplicasDeleteOptionalParams,
  HorizonDbReplicasUpdateOptionalParams,
  HorizonDbReplicasCreateOrUpdateOptionalParams,
  HorizonDbReplicasListOptionalParams,
  HorizonDbReplicasGetOptionalParams,
} from "../../api/horizonDbReplicas/options.js";
import type { HorizonDbReplica, HorizonDbReplicaForPatchUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a HorizonDbReplicas operations. */
export interface HorizonDbReplicasOperations {
  /** Deletes a HorizonDb replica. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    replicaName: string,
    options?: HorizonDbReplicasDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    replicaName: string,
    options?: HorizonDbReplicasDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    replicaName: string,
    options?: HorizonDbReplicasDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing HorizonDb replica (e.g., role). */
  update: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    replicaName: string,
    properties: HorizonDbReplicaForPatchUpdate,
    options?: HorizonDbReplicasUpdateOptionalParams,
  ) => PollerLike<OperationState<HorizonDbReplica>, HorizonDbReplica>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    replicaName: string,
    properties: HorizonDbReplicaForPatchUpdate,
    options?: HorizonDbReplicasUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<HorizonDbReplica>, HorizonDbReplica>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    replicaName: string,
    properties: HorizonDbReplicaForPatchUpdate,
    options?: HorizonDbReplicasUpdateOptionalParams,
  ) => Promise<HorizonDbReplica>;
  /** Creates a new HorizonDb replica or updates an existing replica. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    replicaName: string,
    resource: HorizonDbReplica,
    options?: HorizonDbReplicasCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<HorizonDbReplica>, HorizonDbReplica>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    replicaName: string,
    resource: HorizonDbReplica,
    options?: HorizonDbReplicasCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<HorizonDbReplica>, HorizonDbReplica>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    replicaName: string,
    resource: HorizonDbReplica,
    options?: HorizonDbReplicasCreateOrUpdateOptionalParams,
  ) => Promise<HorizonDbReplica>;
  /** Lists all HorizonDb replicas in a pool. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    options?: HorizonDbReplicasListOptionalParams,
  ) => PagedAsyncIterableIterator<HorizonDbReplica>;
  /** Gets information about a HorizonDb replica. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    replicaName: string,
    options?: HorizonDbReplicasGetOptionalParams,
  ) => Promise<HorizonDbReplica>;
}

function _getHorizonDbReplicas(context: HorizonDbContext) {
  return {
    delete: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      replicaName: string,
      options?: HorizonDbReplicasDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, poolName, replicaName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      replicaName: string,
      options?: HorizonDbReplicasDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        replicaName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      replicaName: string,
      options?: HorizonDbReplicasDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, poolName, replicaName, options);
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      replicaName: string,
      properties: HorizonDbReplicaForPatchUpdate,
      options?: HorizonDbReplicasUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, clusterName, poolName, replicaName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      replicaName: string,
      properties: HorizonDbReplicaForPatchUpdate,
      options?: HorizonDbReplicasUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        replicaName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      replicaName: string,
      properties: HorizonDbReplicaForPatchUpdate,
      options?: HorizonDbReplicasUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        replicaName,
        properties,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      replicaName: string,
      resource: HorizonDbReplica,
      options?: HorizonDbReplicasCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        replicaName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      replicaName: string,
      resource: HorizonDbReplica,
      options?: HorizonDbReplicasCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        replicaName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      replicaName: string,
      resource: HorizonDbReplica,
      options?: HorizonDbReplicasCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        replicaName,
        resource,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      options?: HorizonDbReplicasListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, poolName, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      replicaName: string,
      options?: HorizonDbReplicasGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, poolName, replicaName, options),
  };
}

export function _getHorizonDbReplicasOperations(
  context: HorizonDbContext,
): HorizonDbReplicasOperations {
  return {
    ..._getHorizonDbReplicas(context),
  };
}
