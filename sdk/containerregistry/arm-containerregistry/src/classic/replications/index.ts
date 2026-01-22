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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    registryName: string,
    replicationName: string,
    options?: ReplicationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    registryName: string,
    replicationName: string,
    options?: ReplicationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a replication for a container registry with the specified parameters. */
  update: (
    resourceGroupName: string,
    registryName: string,
    replicationName: string,
    replicationUpdateParameters: ReplicationUpdateParameters,
    options?: ReplicationsUpdateOptionalParams,
  ) => PollerLike<OperationState<Replication>, Replication>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    registryName: string,
    replicationName: string,
    replicationUpdateParameters: ReplicationUpdateParameters,
    options?: ReplicationsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Replication>, Replication>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    registryName: string,
    replicationName: string,
    replicationUpdateParameters: ReplicationUpdateParameters,
    options?: ReplicationsUpdateOptionalParams,
  ) => Promise<Replication>;
  /** Creates a replication for a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    replicationName: string,
    replication: Replication,
    options?: ReplicationsCreateOptionalParams,
  ) => PollerLike<OperationState<Replication>, Replication>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    registryName: string,
    replicationName: string,
    replication: Replication,
    options?: ReplicationsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Replication>, Replication>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    registryName: string,
    replicationName: string,
    replication: Replication,
    options?: ReplicationsCreateOptionalParams,
  ) => Promise<Replication>;
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
    beginDelete: async (
      resourceGroupName: string,
      registryName: string,
      replicationName: string,
      options?: ReplicationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, registryName, replicationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      registryName: string,
      replicationName: string,
      options?: ReplicationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, registryName, replicationName, options);
    },
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
    beginUpdate: async (
      resourceGroupName: string,
      registryName: string,
      replicationName: string,
      replicationUpdateParameters: ReplicationUpdateParameters,
      options?: ReplicationsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        registryName,
        replicationName,
        replicationUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      replicationName: string,
      replicationUpdateParameters: ReplicationUpdateParameters,
      options?: ReplicationsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        registryName,
        replicationName,
        replicationUpdateParameters,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      registryName: string,
      replicationName: string,
      replication: Replication,
      options?: ReplicationsCreateOptionalParams,
    ) => create(context, resourceGroupName, registryName, replicationName, replication, options),
    beginCreate: async (
      resourceGroupName: string,
      registryName: string,
      replicationName: string,
      replication: Replication,
      options?: ReplicationsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        registryName,
        replicationName,
        replication,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      replicationName: string,
      replication: Replication,
      options?: ReplicationsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        registryName,
        replicationName,
        replication,
        options,
      );
    },
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
