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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    options?: WebPubSubReplicasRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    options?: WebPubSubReplicasRestartOptionalParams,
  ) => Promise<void>;
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
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    parameters: Replica,
    options?: WebPubSubReplicasUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Replica>, Replica>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    parameters: Replica,
    options?: WebPubSubReplicasUpdateOptionalParams,
  ) => Promise<Replica>;
  /** Create or update a replica. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    parameters: Replica,
    options?: WebPubSubReplicasCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Replica>, Replica>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    parameters: Replica,
    options?: WebPubSubReplicasCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Replica>, Replica>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    parameters: Replica,
    options?: WebPubSubReplicasCreateOrUpdateOptionalParams,
  ) => Promise<Replica>;
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
    beginRestart: async (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      options?: WebPubSubReplicasRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, resourceName, replicaName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      options?: WebPubSubReplicasRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, resourceName, replicaName, options);
    },
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
    beginUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      parameters: Replica,
      options?: WebPubSubReplicasUpdateOptionalParams,
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
      options?: WebPubSubReplicasUpdateOptionalParams,
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
      options?: WebPubSubReplicasCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, replicaName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      parameters: Replica,
      options?: WebPubSubReplicasCreateOrUpdateOptionalParams,
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
      options?: WebPubSubReplicasCreateOrUpdateOptionalParams,
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
