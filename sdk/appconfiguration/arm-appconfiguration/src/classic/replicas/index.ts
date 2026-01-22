// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppConfigurationManagementContext } from "../../api/appConfigurationManagementContext.js";
import { listByConfigurationStore, $delete, create, get } from "../../api/replicas/operations.js";
import type {
  ReplicasListByConfigurationStoreOptionalParams,
  ReplicasDeleteOptionalParams,
  ReplicasCreateOptionalParams,
  ReplicasGetOptionalParams,
} from "../../api/replicas/options.js";
import type { Replica } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Replicas operations. */
export interface ReplicasOperations {
  /** Lists the replicas for a given configuration store. */
  listByConfigurationStore: (
    resourceGroupName: string,
    configStoreName: string,
    options?: ReplicasListByConfigurationStoreOptionalParams,
  ) => PagedAsyncIterableIterator<Replica>;
  /** Deletes a replica. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    configStoreName: string,
    replicaName: string,
    options?: ReplicasDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates a replica with the specified parameters. */
  create: (
    resourceGroupName: string,
    configStoreName: string,
    replicaName: string,
    replicaCreationParameters: Replica,
    options?: ReplicasCreateOptionalParams,
  ) => PollerLike<OperationState<Replica>, Replica>;
  /** Gets the properties of the specified replica. */
  get: (
    resourceGroupName: string,
    configStoreName: string,
    replicaName: string,
    options?: ReplicasGetOptionalParams,
  ) => Promise<Replica>;
}

function _getReplicas(context: AppConfigurationManagementContext) {
  return {
    listByConfigurationStore: (
      resourceGroupName: string,
      configStoreName: string,
      options?: ReplicasListByConfigurationStoreOptionalParams,
    ) => listByConfigurationStore(context, resourceGroupName, configStoreName, options),
    delete: (
      resourceGroupName: string,
      configStoreName: string,
      replicaName: string,
      options?: ReplicasDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, configStoreName, replicaName, options),
    create: (
      resourceGroupName: string,
      configStoreName: string,
      replicaName: string,
      replicaCreationParameters: Replica,
      options?: ReplicasCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        configStoreName,
        replicaName,
        replicaCreationParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      configStoreName: string,
      replicaName: string,
      options?: ReplicasGetOptionalParams,
    ) => get(context, resourceGroupName, configStoreName, replicaName, options),
  };
}

export function _getReplicasOperations(
  context: AppConfigurationManagementContext,
): ReplicasOperations {
  return {
    ..._getReplicas(context),
  };
}
