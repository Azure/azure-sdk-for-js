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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    options?: SignalRReplicasRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    options?: SignalRReplicasRestartOptionalParams,
  ) => Promise<void>;
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
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    parameters: Replica,
    options?: SignalRReplicasUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Replica>, Replica>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    parameters: Replica,
    options?: SignalRReplicasUpdateOptionalParams,
  ) => Promise<Replica>;
  /** Create or update a replica. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    parameters: Replica,
    options?: SignalRReplicasCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Replica>, Replica>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    parameters: Replica,
    options?: SignalRReplicasCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Replica>, Replica>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    parameters: Replica,
    options?: SignalRReplicasCreateOrUpdateOptionalParams,
  ) => Promise<Replica>;
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
    beginRestart: async (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      options?: SignalRReplicasRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, resourceName, replicaName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      options?: SignalRReplicasRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, resourceName, replicaName, options);
    },
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
    beginUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      parameters: Replica,
      options?: SignalRReplicasUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        resourceName,
        replicaName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      parameters: Replica,
      options?: SignalRReplicasUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        resourceName,
        replicaName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      parameters: Replica,
      options?: SignalRReplicasCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, replicaName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      parameters: Replica,
      options?: SignalRReplicasCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        replicaName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      parameters: Replica,
      options?: SignalRReplicasCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        replicaName,
        parameters,
        options,
      );
    },
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
