// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPIContext } from "../../api/relayAPIContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/privateEndpointConnections/operations.js";
import {
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import { PrivateEndpointConnection } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** Gets the available PrivateEndpointConnections within a namespace. */
  list: (
    resourceGroupName: string,
    namespaceName: string,
    options?: PrivateEndpointConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes an existing namespace. This operation also removes all associated resources under the namespace. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates PrivateEndpointConnections of service namespace. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    privateEndpointConnectionName: string,
    parameters: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Gets a description for the specified Private Endpoint Connection name. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnections(context: RelayAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      namespaceName: string,
      options?: PrivateEndpointConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, privateEndpointConnectionName, options),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      privateEndpointConnectionName: string,
      parameters: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        privateEndpointConnectionName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: RelayAPIContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
