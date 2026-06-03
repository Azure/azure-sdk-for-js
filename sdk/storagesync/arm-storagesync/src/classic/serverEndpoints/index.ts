// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftStorageSyncContext } from "../../api/microsoftStorageSyncContext.js";
import {
  recallAction,
  listBySyncGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/serverEndpoints/operations.js";
import type {
  ServerEndpointsRecallActionOptionalParams,
  ServerEndpointsListBySyncGroupOptionalParams,
  ServerEndpointsDeleteOptionalParams,
  ServerEndpointsUpdateOptionalParams,
  ServerEndpointsCreateOptionalParams,
  ServerEndpointsGetOptionalParams,
} from "../../api/serverEndpoints/options.js";
import type {
  ServerEndpoint,
  ServerEndpointCreateParameters,
  RecallActionParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

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
  /** Patch a given ServerEndpoint. */
  update: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    serverEndpointName: string,
    options?: ServerEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<ServerEndpoint>, ServerEndpoint>;
  /** Create a new ServerEndpoint. */
  create: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    serverEndpointName: string,
    parameters: ServerEndpointCreateParameters,
    options?: ServerEndpointsCreateOptionalParams,
  ) => PollerLike<OperationState<ServerEndpoint>, ServerEndpoint>;
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
