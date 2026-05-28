// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import {
  listPrivateEndpointConnections,
  deleteAPrivateEndpointConnection,
  getAPrivateEndpointConnection,
  getPrivateLinkResources,
  listAll,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/privateAccesses/operations.js";
import type {
  PrivateAccessesListPrivateEndpointConnectionsOptionalParams,
  PrivateAccessesDeleteAPrivateEndpointConnectionOptionalParams,
  PrivateAccessesGetAPrivateEndpointConnectionOptionalParams,
  PrivateAccessesGetPrivateLinkResourcesOptionalParams,
  PrivateAccessesListAllOptionalParams,
  PrivateAccessesListOptionalParams,
  PrivateAccessesDeleteOptionalParams,
  PrivateAccessesUpdateOptionalParams,
  PrivateAccessesCreateOrUpdateOptionalParams,
  PrivateAccessesGetOptionalParams,
} from "../../api/privateAccesses/options.js";
import type {
  PrivateAccess,
  PrivateEndpointConnection,
  PrivateAccessPatch,
  PrivateLinkResourceListResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateAccesses operations. */
export interface PrivateAccessesOperations {
  /** List information about private endpoint connections under a private access resource */
  listPrivateEndpointConnections: (
    resourceGroupName: string,
    privateAccessName: string,
    options?: PrivateAccessesListPrivateEndpointConnectionsOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes a private endpoint connection under a private access resource. */
  deleteAPrivateEndpointConnection: (
    resourceGroupName: string,
    privateAccessName: string,
    privateEndpointConnectionName: string,
    options?: PrivateAccessesDeleteAPrivateEndpointConnectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Gets information about a private endpoint connection under a private access resource. */
  getAPrivateEndpointConnection: (
    resourceGroupName: string,
    privateAccessName: string,
    privateEndpointConnectionName: string,
    options?: PrivateAccessesGetAPrivateEndpointConnectionOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Gets the private link resources possible under private access resource */
  getPrivateLinkResources: (
    resourceGroupName: string,
    privateAccessName: string,
    options?: PrivateAccessesGetPrivateLinkResourcesOptionalParams,
  ) => Promise<PrivateLinkResourceListResult>;
  /** Get a list of private access resources in a subscription. */
  listAll: (
    options?: PrivateAccessesListAllOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateAccess>;
  /** Get a list of private access resources in a resource group. */
  list: (
    resourceGroupName: string,
    options?: PrivateAccessesListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateAccess>;
  /** Delete a private access */
  delete: (
    resourceGroupName: string,
    privateAccessName: string,
    options?: PrivateAccessesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch a private access tags */
  update: (
    resourceGroupName: string,
    privateAccessName: string,
    properties: PrivateAccessPatch,
    options?: PrivateAccessesUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateAccess>, PrivateAccess>;
  /** Create or update a private access */
  createOrUpdate: (
    resourceGroupName: string,
    privateAccessName: string,
    resource: PrivateAccess,
    options?: PrivateAccessesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateAccess>, PrivateAccess>;
  /** Get a private access resource */
  get: (
    resourceGroupName: string,
    privateAccessName: string,
    options?: PrivateAccessesGetOptionalParams,
  ) => Promise<PrivateAccess>;
}

function _getPrivateAccesses(context: ChaosManagementContext) {
  return {
    listPrivateEndpointConnections: (
      resourceGroupName: string,
      privateAccessName: string,
      options?: PrivateAccessesListPrivateEndpointConnectionsOptionalParams,
    ) => listPrivateEndpointConnections(context, resourceGroupName, privateAccessName, options),
    deleteAPrivateEndpointConnection: (
      resourceGroupName: string,
      privateAccessName: string,
      privateEndpointConnectionName: string,
      options?: PrivateAccessesDeleteAPrivateEndpointConnectionOptionalParams,
    ) =>
      deleteAPrivateEndpointConnection(
        context,
        resourceGroupName,
        privateAccessName,
        privateEndpointConnectionName,
        options,
      ),
    getAPrivateEndpointConnection: (
      resourceGroupName: string,
      privateAccessName: string,
      privateEndpointConnectionName: string,
      options?: PrivateAccessesGetAPrivateEndpointConnectionOptionalParams,
    ) =>
      getAPrivateEndpointConnection(
        context,
        resourceGroupName,
        privateAccessName,
        privateEndpointConnectionName,
        options,
      ),
    getPrivateLinkResources: (
      resourceGroupName: string,
      privateAccessName: string,
      options?: PrivateAccessesGetPrivateLinkResourcesOptionalParams,
    ) => getPrivateLinkResources(context, resourceGroupName, privateAccessName, options),
    listAll: (options?: PrivateAccessesListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: PrivateAccessesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      privateAccessName: string,
      options?: PrivateAccessesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, privateAccessName, options),
    update: (
      resourceGroupName: string,
      privateAccessName: string,
      properties: PrivateAccessPatch,
      options?: PrivateAccessesUpdateOptionalParams,
    ) => update(context, resourceGroupName, privateAccessName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      privateAccessName: string,
      resource: PrivateAccess,
      options?: PrivateAccessesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, privateAccessName, resource, options),
    get: (
      resourceGroupName: string,
      privateAccessName: string,
      options?: PrivateAccessesGetOptionalParams,
    ) => get(context, resourceGroupName, privateAccessName, options),
  };
}

export function _getPrivateAccessesOperations(
  context: ChaosManagementContext,
): PrivateAccessesOperations {
  return {
    ..._getPrivateAccesses(context),
  };
}
