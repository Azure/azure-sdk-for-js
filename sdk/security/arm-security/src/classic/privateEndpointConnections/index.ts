// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenterContext } from "../../api/securityCenterContext.js";
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
import { PrivateEndpointConnection } from "../../models/privateLinksAPI/models.js";
import { PrivateLinkParameters } from "../../models/securityManagementClient/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** Gets all private endpoint connections for a private link. Returns the list of private endpoints that are connected or in the process of connecting to this private link. */
  list: (
    resourceGroupName: string,
    privateLinkName: PrivateLinkParameters,
    options?: PrivateEndpointConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes the specified private endpoint connection associated with the private link. This operation will disconnect the private endpoint and remove the connection configuration. */
  delete: (
    resourceGroupName: string,
    privateLinkName: PrivateLinkParameters,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    privateLinkName: PrivateLinkParameters,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    privateLinkName: PrivateLinkParameters,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the state of specified private endpoint connection associated with the private link. This operation is typically used to approve or reject pending private endpoint connections. */
  createOrUpdate: (
    resourceGroupName: string,
    privateLinkName: PrivateLinkParameters,
    privateEndpointConnectionName: string,
    privateEndpointConnection: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    privateLinkName: PrivateLinkParameters,
    privateEndpointConnectionName: string,
    privateEndpointConnection: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    privateLinkName: PrivateLinkParameters,
    privateEndpointConnectionName: string,
    privateEndpointConnection: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Gets the specified private endpoint connection associated with the private link. Returns the connection details, status, and configuration for a specific private endpoint. */
  get: (
    resourceGroupName: string,
    privateLinkName: PrivateLinkParameters,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnections(context: SecurityCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      privateLinkName: PrivateLinkParameters,
      options?: PrivateEndpointConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, privateLinkName, options),
    delete: (
      resourceGroupName: string,
      privateLinkName: PrivateLinkParameters,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, privateLinkName, privateEndpointConnectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      privateLinkName: PrivateLinkParameters,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        privateLinkName,
        privateEndpointConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      privateLinkName: PrivateLinkParameters,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        privateLinkName,
        privateEndpointConnectionName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      privateLinkName: PrivateLinkParameters,
      privateEndpointConnectionName: string,
      privateEndpointConnection: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        privateLinkName,
        privateEndpointConnectionName,
        privateEndpointConnection,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      privateLinkName: PrivateLinkParameters,
      privateEndpointConnectionName: string,
      privateEndpointConnection: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        privateLinkName,
        privateEndpointConnectionName,
        privateEndpointConnection,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      privateLinkName: PrivateLinkParameters,
      privateEndpointConnectionName: string,
      privateEndpointConnection: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        privateLinkName,
        privateEndpointConnectionName,
        privateEndpointConnection,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      privateLinkName: PrivateLinkParameters,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, privateLinkName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: SecurityCenterContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
