// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebPubSubManagementContext } from "../../api/webPubSubManagementContext.js";
import {
  restart,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/webPubSubReplicas/operations.js";
import type {
  WebPubSubReplicasRestartOptionalParams,
  WebPubSubReplicasListOptionalParams,
  WebPubSubReplicasDeleteOptionalParams,
  WebPubSubReplicasUpdateOptionalParams,
  WebPubSubReplicasCreateOrUpdateOptionalParams,
  WebPubSubReplicasGetOptionalParams,
} from "../../api/webPubSubReplicas/options.js";
import type { Replica } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WebPubSubReplicas operations. */
export interface WebPubSubReplicasOperations {
  /** Operation to restart a replica. */
  restart: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    options?: WebPubSubReplicasRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List all replicas belong to this resource */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubReplicasListOptionalParams,
  ) => PagedAsyncIterableIterator<Replica>;
  /** Operation to delete a replica. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    options?: WebPubSubReplicasDeleteOptionalParams,
  ) => Promise<void>;
  /** Operation to update an exiting replica. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    parameters: Replica,
    options?: WebPubSubReplicasUpdateOptionalParams,
  ) => PollerLike<OperationState<Replica>, Replica>;
  /** Create or update a replica. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    parameters: Replica,
    options?: WebPubSubReplicasCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Replica>, Replica>;
  /** Get the replica and its properties. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    options?: WebPubSubReplicasGetOptionalParams,
  ) => Promise<Replica>;
}

function _getWebPubSubReplicas(context: WebPubSubManagementContext) {
  return {
    restart: (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      options?: WebPubSubReplicasRestartOptionalParams,
    ) => restart(context, resourceGroupName, resourceName, replicaName, options),
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubReplicasListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      options?: WebPubSubReplicasDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, replicaName, options),
    update: (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      parameters: Replica,
      options?: WebPubSubReplicasUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, replicaName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      parameters: Replica,
      options?: WebPubSubReplicasCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, replicaName, parameters, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      options?: WebPubSubReplicasGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, replicaName, options),
  };
}

export function _getWebPubSubReplicasOperations(
  context: WebPubSubManagementContext,
): WebPubSubReplicasOperations {
  return {
    ..._getWebPubSubReplicas(context),
  };
}
