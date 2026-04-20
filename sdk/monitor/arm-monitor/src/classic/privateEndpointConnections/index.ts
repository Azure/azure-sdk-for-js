// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import {
  listByPrivateLinkScope,
  $delete,
  createOrUpdate,
  get,
} from "../../api/privateEndpointConnections/operations.js";
import type {
  PrivateEndpointConnectionsListByPrivateLinkScopeOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import type { MicrosoftPrivateLinkScopesPrivateEndpointConnection } from "../../models/microsoft/privateLinkScopes/models.js";
import type { PrivateEndpointConnection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** Gets all private endpoint connections on a private link scope. */
  listByPrivateLinkScope: (
    resourceGroupName: string,
    scopeName: string,
    options?: PrivateEndpointConnectionsListByPrivateLinkScopeOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes a private endpoint connection with a given name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    scopeName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    scopeName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
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
    parameters: MicrosoftPrivateLinkScopesPrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<MicrosoftPrivateLinkScopesPrivateEndpointConnection>,
    MicrosoftPrivateLinkScopesPrivateEndpointConnection
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    scopeName: string,
    privateEndpointConnectionName: string,
    parameters: MicrosoftPrivateLinkScopesPrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<MicrosoftPrivateLinkScopesPrivateEndpointConnection>,
      MicrosoftPrivateLinkScopesPrivateEndpointConnection
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    scopeName: string,
    privateEndpointConnectionName: string,
    parameters: MicrosoftPrivateLinkScopesPrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<MicrosoftPrivateLinkScopesPrivateEndpointConnection>;
  /** Gets a private endpoint connection. */
  get: (
    resourceGroupName: string,
    scopeName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<MicrosoftPrivateLinkScopesPrivateEndpointConnection>;
}

function _getPrivateEndpointConnections(context: MonitorContext) {
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
    beginDelete: async (
      resourceGroupName: string,
      scopeName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        scopeName,
        privateEndpointConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      scopeName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        scopeName,
        privateEndpointConnectionName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      scopeName: string,
      privateEndpointConnectionName: string,
      parameters: MicrosoftPrivateLinkScopesPrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        scopeName,
        privateEndpointConnectionName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      scopeName: string,
      privateEndpointConnectionName: string,
      parameters: MicrosoftPrivateLinkScopesPrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        scopeName,
        privateEndpointConnectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      scopeName: string,
      privateEndpointConnectionName: string,
      parameters: MicrosoftPrivateLinkScopesPrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        scopeName,
        privateEndpointConnectionName,
        parameters,
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
  context: MonitorContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
