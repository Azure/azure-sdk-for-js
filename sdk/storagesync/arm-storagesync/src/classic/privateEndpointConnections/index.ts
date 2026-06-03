// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftStorageSyncContext } from "../../api/microsoftStorageSyncContext.js";
import {
  listByStorageSyncService,
  $delete,
  create,
  get,
} from "../../api/privateEndpointConnections/operations.js";
import type {
  PrivateEndpointConnectionsListByStorageSyncServiceOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import type { PrivateEndpointConnection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** Get a PrivateEndpointConnection List. */
  listByStorageSyncService: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    options?: PrivateEndpointConnectionsListByStorageSyncServiceOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes the specified private endpoint connection associated with the storage sync service. */
  delete: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update the state of specified private endpoint connection associated with the storage sync service. */
  create: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** Gets the specified private endpoint connection associated with the storage sync service. */
  get: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnections(context: MicrosoftStorageSyncContext) {
  return {
    listByStorageSyncService: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      options?: PrivateEndpointConnectionsListByStorageSyncServiceOptionalParams,
    ) => listByStorageSyncService(context, resourceGroupName, storageSyncServiceName, options),
    delete: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        storageSyncServiceName,
        privateEndpointConnectionName,
        options,
      ),
    create: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      privateEndpointConnectionName: string,
      properties: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        storageSyncServiceName,
        privateEndpointConnectionName,
        properties,
        options,
      ),
    get: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        storageSyncServiceName,
        privateEndpointConnectionName,
        options,
      ),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: MicrosoftStorageSyncContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
