// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryManagementContext } from "../../api/containerRegistryManagementContext.js";
import { list, $delete, update, create, get } from "../../api/replications/operations.js";
import type {
  ReplicationsListOptionalParams,
  ReplicationsDeleteOptionalParams,
  ReplicationsUpdateOptionalParams,
  ReplicationsCreateOptionalParams,
  ReplicationsGetOptionalParams,
} from "../../api/replications/options.js";
import type { Replication, ReplicationUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Replications operations. */
export interface ReplicationsOperations {
  /** Lists all the replications for the specified container registry. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: ReplicationsListOptionalParams,
  ) => PagedAsyncIterableIterator<Replication>;
  /** Deletes a replication from a container registry. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    replicationName: string,
    options?: ReplicationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a replication for a container registry with the specified parameters. */
  update: (
    resourceGroupName: string,
    registryName: string,
    replicationName: string,
    replicationUpdateParameters: ReplicationUpdateParameters,
    options?: ReplicationsUpdateOptionalParams,
  ) => PollerLike<OperationState<Replication>, Replication>;
  /** Creates a replication for a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    replicationName: string,
    replication: Replication,
    options?: ReplicationsCreateOptionalParams,
  ) => PollerLike<OperationState<Replication>, Replication>;
  /** Gets the properties of the specified replication. */
  get: (
    resourceGroupName: string,
    registryName: string,
    replicationName: string,
    options?: ReplicationsGetOptionalParams,
  ) => Promise<Replication>;
}

function _getReplications(context: ContainerRegistryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      registryName: string,
      options?: ReplicationsListOptionalParams,
    ) => list(context, resourceGroupName, registryName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      replicationName: string,
      options?: ReplicationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, replicationName, options),
    update: (
      resourceGroupName: string,
      registryName: string,
      replicationName: string,
      replicationUpdateParameters: ReplicationUpdateParameters,
      options?: ReplicationsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        registryName,
        replicationName,
        replicationUpdateParameters,
        options,
      ),
    create: (
      resourceGroupName: string,
      registryName: string,
      replicationName: string,
      replication: Replication,
      options?: ReplicationsCreateOptionalParams,
    ) => create(context, resourceGroupName, registryName, replicationName, replication, options),
    get: (
      resourceGroupName: string,
      registryName: string,
      replicationName: string,
      options?: ReplicationsGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, replicationName, options),
  };
}

export function _getReplicationsOperations(
  context: ContainerRegistryManagementContext,
): ReplicationsOperations {
  return {
    ..._getReplications(context),
  };
}
