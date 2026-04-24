// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/privateEndpointConnections/operations.js";
import type {
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import type { ArmPrivateEndpointConnection } from "../../models/models.js";
import type { PrivateEndpointConnection } from "../../models/privateLinksAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** Gets all private endpoint connections for a private link. Returns the list of private endpoints that are connected or in the process of connecting to this private link. */
  list: (
    resourceGroupName: string,
    options?: PrivateEndpointConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes the specified private endpoint connection associated with the private link. This operation will disconnect the private endpoint and remove the connection configuration. */
  delete: (
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the state of specified private endpoint connection associated with the private link. This operation is typically used to approve or reject pending private endpoint connections. */
  createOrUpdate: (
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnection: ArmPrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnection: ArmPrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnection: ArmPrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Gets the specified private endpoint connection associated with the private link. Returns the connection details, status, and configuration for a specific private endpoint. */
  get: (
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnections(context: SecurityCenterContext) {
  return {
    list: (resourceGroupName: string, options?: PrivateEndpointConnectionsListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, privateEndpointConnectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, privateEndpointConnectionName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, privateEndpointConnectionName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnection: ArmPrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        privateEndpointConnectionName,
        privateEndpointConnection,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnection: ArmPrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        privateEndpointConnectionName,
        privateEndpointConnection,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnection: ArmPrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        privateEndpointConnectionName,
        privateEndpointConnection,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: SecurityCenterContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
