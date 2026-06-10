// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SignalRManagementContext } from "../../api/signalRManagementContext.js";
import {
  restart,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/signalRReplicas/operations.js";
import type {
  SignalRReplicasRestartOptionalParams,
  SignalRReplicasListOptionalParams,
  SignalRReplicasDeleteOptionalParams,
  SignalRReplicasUpdateOptionalParams,
  SignalRReplicasCreateOrUpdateOptionalParams,
  SignalRReplicasGetOptionalParams,
} from "../../api/signalRReplicas/options.js";
import type { Replica } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SignalRReplicas operations. */
export interface SignalRReplicasOperations {
  /** Operation to restart a replica. */
  restart: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    options?: SignalRReplicasRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List all replicas belong to this resource */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: SignalRReplicasListOptionalParams,
  ) => PagedAsyncIterableIterator<Replica>;
  /** Operation to delete a replica. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    options?: SignalRReplicasDeleteOptionalParams,
  ) => Promise<void>;
  /** Operation to update an exiting replica. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    parameters: Replica,
    options?: SignalRReplicasUpdateOptionalParams,
  ) => PollerLike<OperationState<Replica>, Replica>;
  /** Create or update a replica. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    parameters: Replica,
    options?: SignalRReplicasCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Replica>, Replica>;
  /** Get the replica and its properties. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    options?: SignalRReplicasGetOptionalParams,
  ) => Promise<Replica>;
}

function _getSignalRReplicas(context: SignalRManagementContext) {
  return {
    restart: (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      options?: SignalRReplicasRestartOptionalParams,
    ) => restart(context, resourceGroupName, resourceName, replicaName, options),
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: SignalRReplicasListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      options?: SignalRReplicasDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, replicaName, options),
    update: (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      parameters: Replica,
      options?: SignalRReplicasUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, replicaName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      parameters: Replica,
      options?: SignalRReplicasCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, replicaName, parameters, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      options?: SignalRReplicasGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, replicaName, options),
  };
}

export function _getSignalRReplicasOperations(
  context: SignalRManagementContext,
): SignalRReplicasOperations {
  return {
    ..._getSignalRReplicas(context),
  };
}
