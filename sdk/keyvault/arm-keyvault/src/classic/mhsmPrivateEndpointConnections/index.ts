// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyVaultManagementContext } from "../../api/keyVaultManagementContext.js";
import {
  listByResource,
  $delete,
  put,
  get,
} from "../../api/mhsmPrivateEndpointConnections/operations.js";
import type {
  MhsmPrivateEndpointConnectionsListByResourceOptionalParams,
  MhsmPrivateEndpointConnectionsDeleteOptionalParams,
  MhsmPrivateEndpointConnectionsPutOptionalParams,
  MhsmPrivateEndpointConnectionsGetOptionalParams,
} from "../../api/mhsmPrivateEndpointConnections/options.js";
import type { MhsmPrivateEndpointConnection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MhsmPrivateEndpointConnections operations. */
export interface MhsmPrivateEndpointConnectionsOperations {
  /** The List operation gets information about the private endpoint connections associated with the managed HSM Pool. */
  listByResource: (
    resourceGroupName: string,
    name: string,
    options?: MhsmPrivateEndpointConnectionsListByResourceOptionalParams,
  ) => PagedAsyncIterableIterator<MhsmPrivateEndpointConnection>;
  /** Deletes the specified private endpoint connection associated with the managed hsm pool. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    options?: MhsmPrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<MhsmPrivateEndpointConnection>, MhsmPrivateEndpointConnection>;
  /** Updates the specified private endpoint connection associated with the managed hsm pool. */
  put: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    properties: MhsmPrivateEndpointConnection,
    options?: MhsmPrivateEndpointConnectionsPutOptionalParams,
  ) => Promise<MhsmPrivateEndpointConnection>;
  /** Gets the specified private endpoint connection associated with the managed HSM Pool. */
  get: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    options?: MhsmPrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<MhsmPrivateEndpointConnection>;
}

function _getMhsmPrivateEndpointConnections(context: KeyVaultManagementContext) {
  return {
    listByResource: (
      resourceGroupName: string,
      name: string,
      options?: MhsmPrivateEndpointConnectionsListByResourceOptionalParams,
    ) => listByResource(context, resourceGroupName, name, options),
    delete: (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      options?: MhsmPrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, name, privateEndpointConnectionName, options),
    put: (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      properties: MhsmPrivateEndpointConnection,
      options?: MhsmPrivateEndpointConnectionsPutOptionalParams,
    ) => put(context, resourceGroupName, name, privateEndpointConnectionName, properties, options),
    get: (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      options?: MhsmPrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, name, privateEndpointConnectionName, options),
  };
}

export function _getMhsmPrivateEndpointConnectionsOperations(
  context: KeyVaultManagementContext,
): MhsmPrivateEndpointConnectionsOperations {
  return {
    ..._getMhsmPrivateEndpointConnections(context),
  };
}
