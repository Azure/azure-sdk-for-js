// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SignalRManagementContext } from "../../api/signalRManagementContext.js";
import {
  list,
  $delete,
  update,
  get,
} from "../../api/signalRPrivateEndpointConnections/operations.js";
import type {
  SignalRPrivateEndpointConnectionsListOptionalParams,
  SignalRPrivateEndpointConnectionsDeleteOptionalParams,
  SignalRPrivateEndpointConnectionsUpdateOptionalParams,
  SignalRPrivateEndpointConnectionsGetOptionalParams,
} from "../../api/signalRPrivateEndpointConnections/options.js";
import type { PrivateEndpointConnection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SignalRPrivateEndpointConnections operations. */
export interface SignalRPrivateEndpointConnectionsOperations {
  /** List private endpoint connections */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: SignalRPrivateEndpointConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Delete the specified private endpoint connection */
  delete: (
    privateEndpointConnectionName: string,
    resourceGroupName: string,
    resourceName: string,
    options?: SignalRPrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update the state of specified private endpoint connection */
  update: (
    privateEndpointConnectionName: string,
    resourceGroupName: string,
    resourceName: string,
    parameters: PrivateEndpointConnection,
    options?: SignalRPrivateEndpointConnectionsUpdateOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Get the specified private endpoint connection */
  get: (
    privateEndpointConnectionName: string,
    resourceGroupName: string,
    resourceName: string,
    options?: SignalRPrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getSignalRPrivateEndpointConnections(context: SignalRManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: SignalRPrivateEndpointConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    delete: (
      privateEndpointConnectionName: string,
      resourceGroupName: string,
      resourceName: string,
      options?: SignalRPrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, privateEndpointConnectionName, resourceGroupName, resourceName, options),
    update: (
      privateEndpointConnectionName: string,
      resourceGroupName: string,
      resourceName: string,
      parameters: PrivateEndpointConnection,
      options?: SignalRPrivateEndpointConnectionsUpdateOptionalParams,
    ) =>
      update(
        context,
        privateEndpointConnectionName,
        resourceGroupName,
        resourceName,
        parameters,
        options,
      ),
    get: (
      privateEndpointConnectionName: string,
      resourceGroupName: string,
      resourceName: string,
      options?: SignalRPrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, privateEndpointConnectionName, resourceGroupName, resourceName, options),
  };
}

export function _getSignalRPrivateEndpointConnectionsOperations(
  context: SignalRManagementContext,
): SignalRPrivateEndpointConnectionsOperations {
  return {
    ..._getSignalRPrivateEndpointConnections(context),
  };
}
