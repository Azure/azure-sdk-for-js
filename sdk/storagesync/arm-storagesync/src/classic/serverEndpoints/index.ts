// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSyncContext } from "../../api/microsoftStorageSyncContext.js";
import {
  recallAction,
  listBySyncGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/serverEndpoints/operations.js";
import {
  ServerEndpointsRecallActionOptionalParams,
  ServerEndpointsListBySyncGroupOptionalParams,
  ServerEndpointsDeleteOptionalParams,
  ServerEndpointsUpdateOptionalParams,
  ServerEndpointsCreateOptionalParams,
  ServerEndpointsGetOptionalParams,
} from "../../api/serverEndpoints/options.js";
import {
  ServerEndpoint,
  ServerEndpointCreateParameters,
  RecallActionParameters,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServerEndpoints operations. */
export interface ServerEndpointsOperations {
  /** Recall a server endpoint. */
  recallAction: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    serverEndpointName: string,
    parameters: RecallActionParameters,
    options?: ServerEndpointsRecallActionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use recallAction instead */
  beginRecallAction: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    serverEndpointName: string,
    parameters: RecallActionParameters,
    options?: ServerEndpointsRecallActionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use recallAction instead */
  beginRecallActionAndWait: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    serverEndpointName: string,
    parameters: RecallActionParameters,
    options?: ServerEndpointsRecallActionOptionalParams,
  ) => Promise<void>;
  /** Get a ServerEndpoint list. */
  listBySyncGroup: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    options?: ServerEndpointsListBySyncGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ServerEndpoint>;
  /** Delete a given ServerEndpoint. */
  delete: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    serverEndpointName: string,
    options?: ServerEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    serverEndpointName: string,
    options?: ServerEndpointsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    serverEndpointName: string,
    options?: ServerEndpointsDeleteOptionalParams,
  ) => Promise<void>;
  /** Patch a given ServerEndpoint. */
  update: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    serverEndpointName: string,
    options?: ServerEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<ServerEndpoint>, ServerEndpoint>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    serverEndpointName: string,
    options?: ServerEndpointsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServerEndpoint>, ServerEndpoint>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    serverEndpointName: string,
    options?: ServerEndpointsUpdateOptionalParams,
  ) => Promise<ServerEndpoint>;
  /** Create a new ServerEndpoint. */
  create: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    serverEndpointName: string,
    parameters: ServerEndpointCreateParameters,
    options?: ServerEndpointsCreateOptionalParams,
  ) => PollerLike<OperationState<ServerEndpoint>, ServerEndpoint>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    serverEndpointName: string,
    parameters: ServerEndpointCreateParameters,
    options?: ServerEndpointsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServerEndpoint>, ServerEndpoint>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    serverEndpointName: string,
    parameters: ServerEndpointCreateParameters,
    options?: ServerEndpointsCreateOptionalParams,
  ) => Promise<ServerEndpoint>;
  /** Get a ServerEndpoint. */
  get: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    serverEndpointName: string,
    options?: ServerEndpointsGetOptionalParams,
  ) => Promise<ServerEndpoint>;
}

function _getServerEndpoints(context: MicrosoftStorageSyncContext) {
  return {
    recallAction: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      serverEndpointName: string,
      parameters: RecallActionParameters,
      options?: ServerEndpointsRecallActionOptionalParams,
    ) =>
      recallAction(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        serverEndpointName,
        parameters,
        options,
      ),
    beginRecallAction: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      serverEndpointName: string,
      parameters: RecallActionParameters,
      options?: ServerEndpointsRecallActionOptionalParams,
    ) => {
      const poller = recallAction(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        serverEndpointName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRecallActionAndWait: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      serverEndpointName: string,
      parameters: RecallActionParameters,
      options?: ServerEndpointsRecallActionOptionalParams,
    ) => {
      return await recallAction(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        serverEndpointName,
        parameters,
        options,
      );
    },
    listBySyncGroup: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      options?: ServerEndpointsListBySyncGroupOptionalParams,
    ) =>
      listBySyncGroup(context, resourceGroupName, storageSyncServiceName, syncGroupName, options),
    delete: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      serverEndpointName: string,
      options?: ServerEndpointsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        serverEndpointName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      serverEndpointName: string,
      options?: ServerEndpointsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        serverEndpointName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      serverEndpointName: string,
      options?: ServerEndpointsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        serverEndpointName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      serverEndpointName: string,
      options?: ServerEndpointsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        serverEndpointName,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      serverEndpointName: string,
      options?: ServerEndpointsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        serverEndpointName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      serverEndpointName: string,
      options?: ServerEndpointsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        serverEndpointName,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      serverEndpointName: string,
      parameters: ServerEndpointCreateParameters,
      options?: ServerEndpointsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        serverEndpointName,
        parameters,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      serverEndpointName: string,
      parameters: ServerEndpointCreateParameters,
      options?: ServerEndpointsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        serverEndpointName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      serverEndpointName: string,
      parameters: ServerEndpointCreateParameters,
      options?: ServerEndpointsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        serverEndpointName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      serverEndpointName: string,
      options?: ServerEndpointsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        serverEndpointName,
        options,
      ),
  };
}

export function _getServerEndpointsOperations(
  context: MicrosoftStorageSyncContext,
): ServerEndpointsOperations {
  return {
    ..._getServerEndpoints(context),
  };
}
