// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OnlineExperimentationContext } from "../../api/onlineExperimentationContext.js";
import { PrivateEndpointConnection } from "../../models/models.js";
import {
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import {
  list,
  $delete,
  update,
  get,
} from "../../api/privateEndpointConnections/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** Gets all the private endpoint connections configured on an online experimentation workspace resource. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: PrivateEndpointConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes private endpoint connection for an online experimentation workspace resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates private endpoint connection status (Approval/Rejected) for an online experimentation workspace resource. This gets invoked by resource admin. */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    privateEndpointConnectionName: string,
    resource: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsUpdateOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Gets the private endpoint connection details for an online experimentation workspace resource. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnections(context: OnlineExperimentationContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: PrivateEndpointConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        workspaceName,
        privateEndpointConnectionName,
        options,
      ),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      privateEndpointConnectionName: string,
      resource: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        workspaceName,
        privateEndpointConnectionName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        workspaceName,
        privateEndpointConnectionName,
        options,
      ),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: OnlineExperimentationContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
