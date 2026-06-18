// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrivateLinkScopesContext } from "../../api/privateLinkScopesContext.js";
import {
  listByPrivateLinkScope,
  $delete,
  createOrUpdate,
  get,
} from "../../api/privateEndpointConnections/operations.js";
import {
  PrivateEndpointConnectionsListByPrivateLinkScopeOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import {
  PrivateEndpointConnection,
  PrivateEndpointConnectionListResult,
} from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** Gets all private endpoint connections on a private link scope. */
  listByPrivateLinkScope: (
    resourceGroupName: string,
    scopeName: string,
    options?: PrivateEndpointConnectionsListByPrivateLinkScopeOptionalParams,
  ) => Promise<PrivateEndpointConnectionListResult>;
  /** Deletes a private endpoint connection with a given name. */
  delete: (
    resourceGroupName: string,
    scopeName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Approve or reject a private endpoint connection with a given name. */
  createOrUpdate: (
    resourceGroupName: string,
    scopeName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    scopeName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    scopeName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Gets a private endpoint connection. */
  get: (
    resourceGroupName: string,
    scopeName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnections(context: PrivateLinkScopesContext) {
  return {
    listByPrivateLinkScope: (
      resourceGroupName: string,
      scopeName: string,
      options?: PrivateEndpointConnectionsListByPrivateLinkScopeOptionalParams,
    ) => listByPrivateLinkScope(context, resourceGroupName, scopeName, options),
    delete: (
      resourceGroupName: string,
      scopeName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, scopeName, privateEndpointConnectionName, options),
    createOrUpdate: (
      resourceGroupName: string,
      scopeName: string,
      privateEndpointConnectionName: string,
      properties: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        scopeName,
        privateEndpointConnectionName,
        properties,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      scopeName: string,
      privateEndpointConnectionName: string,
      properties: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        scopeName,
        privateEndpointConnectionName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      scopeName: string,
      privateEndpointConnectionName: string,
      properties: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        scopeName,
        privateEndpointConnectionName,
        properties,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      scopeName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, scopeName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: PrivateLinkScopesContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
