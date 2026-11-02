// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/externalCacheConnections/operations.js";
import type {
  ExternalCacheConnectionsListBySubscriptionOptionalParams,
  ExternalCacheConnectionsListByResourceGroupOptionalParams,
  ExternalCacheConnectionsDeleteOptionalParams,
  ExternalCacheConnectionsUpdateOptionalParams,
  ExternalCacheConnectionsCreateOrUpdateOptionalParams,
  ExternalCacheConnectionsGetOptionalParams,
} from "../../api/externalCacheConnections/options.js";
import type {
  ExternalCacheConnection,
  ExternalCacheConnectionTagsUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExternalCacheConnections operations. */
export interface ExternalCacheConnectionsOperations {
  /** List all External Cache Connections in the subscription */
  listBySubscription: (
    options?: ExternalCacheConnectionsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ExternalCacheConnection>;
  /** List all External Cache Connections in the resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ExternalCacheConnectionsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ExternalCacheConnection>;
  /** Delete the specified External Cache Connection */
  delete: (
    resourceGroupName: string,
    externalCacheConnectionName: string,
    options?: ExternalCacheConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch the specified External Cache Connection */
  update: (
    resourceGroupName: string,
    externalCacheConnectionName: string,
    properties: ExternalCacheConnectionTagsUpdate,
    options?: ExternalCacheConnectionsUpdateOptionalParams,
  ) => PollerLike<OperationState<ExternalCacheConnection>, ExternalCacheConnection>;
  /** Create or update the specified External Cache Connection */
  createOrUpdate: (
    resourceGroupName: string,
    externalCacheConnectionName: string,
    resource: ExternalCacheConnection,
    options?: ExternalCacheConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExternalCacheConnection>, ExternalCacheConnection>;
  /** Get the External Cache Connection */
  get: (
    resourceGroupName: string,
    externalCacheConnectionName: string,
    options?: ExternalCacheConnectionsGetOptionalParams,
  ) => Promise<ExternalCacheConnection>;
}

function _getExternalCacheConnections(context: NetAppManagementContext) {
  return {
    listBySubscription: (options?: ExternalCacheConnectionsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ExternalCacheConnectionsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      externalCacheConnectionName: string,
      options?: ExternalCacheConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, externalCacheConnectionName, options),
    update: (
      resourceGroupName: string,
      externalCacheConnectionName: string,
      properties: ExternalCacheConnectionTagsUpdate,
      options?: ExternalCacheConnectionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, externalCacheConnectionName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      externalCacheConnectionName: string,
      resource: ExternalCacheConnection,
      options?: ExternalCacheConnectionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, externalCacheConnectionName, resource, options),
    get: (
      resourceGroupName: string,
      externalCacheConnectionName: string,
      options?: ExternalCacheConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, externalCacheConnectionName, options),
  };
}

export function _getExternalCacheConnectionsOperations(
  context: NetAppManagementContext,
): ExternalCacheConnectionsOperations {
  return {
    ..._getExternalCacheConnections(context),
  };
}
