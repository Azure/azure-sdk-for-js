// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementContext } from "../../api/keyVaultManagementContext.js";
import {
  listByResource,
  $delete,
  put,
  get,
} from "../../api/mhsmPrivateEndpointConnections/operations.js";
import {
  MhsmPrivateEndpointConnectionsListByResourceOptionalParams,
  MhsmPrivateEndpointConnectionsDeleteOptionalParams,
  MhsmPrivateEndpointConnectionsPutOptionalParams,
  MhsmPrivateEndpointConnectionsGetOptionalParams,
} from "../../api/mhsmPrivateEndpointConnections/options.js";
import { MhsmPrivateEndpointConnection } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MhsmPrivateEndpointConnections operations. */
export interface MhsmPrivateEndpointConnectionsOperations {
  /** The List operation gets information about the private endpoint connections associated with the managed HSM Pool. */
  listByResource: (
    resourceGroupName: string,
    name: string,
    options?: MhsmPrivateEndpointConnectionsListByResourceOptionalParams,
  ) => PagedAsyncIterableIterator<MhsmPrivateEndpointConnection>;
  /** Deletes the specified private endpoint connection associated with the managed hsm pool. */
  delete: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    options?: MhsmPrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<MhsmPrivateEndpointConnection>, MhsmPrivateEndpointConnection>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    options?: MhsmPrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MhsmPrivateEndpointConnection>, MhsmPrivateEndpointConnection>
  >;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    options?: MhsmPrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<MhsmPrivateEndpointConnection>;
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
    beginDelete: async (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      options?: MhsmPrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      options?: MhsmPrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        options,
      );
    },
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
