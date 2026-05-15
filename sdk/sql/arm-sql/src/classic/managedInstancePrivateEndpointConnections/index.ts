// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByManagedInstance,
  $delete,
  createOrUpdate,
  get,
} from "../../api/managedInstancePrivateEndpointConnections/operations.js";
import {
  ManagedInstancePrivateEndpointConnectionsListByManagedInstanceOptionalParams,
  ManagedInstancePrivateEndpointConnectionsDeleteOptionalParams,
  ManagedInstancePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ManagedInstancePrivateEndpointConnectionsGetOptionalParams,
} from "../../api/managedInstancePrivateEndpointConnections/options.js";
import { ManagedInstancePrivateEndpointConnection } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedInstancePrivateEndpointConnections operations. */
export interface ManagedInstancePrivateEndpointConnectionsOperations {
  /** Gets all private endpoint connections on a server. */
  listByManagedInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancePrivateEndpointConnectionsListByManagedInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedInstancePrivateEndpointConnection>;
  /** Deletes a private endpoint connection with a given name. */
  delete: (
    resourceGroupName: string,
    managedInstanceName: string,
    privateEndpointConnectionName: string,
    options?: ManagedInstancePrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    managedInstanceName: string,
    privateEndpointConnectionName: string,
    options?: ManagedInstancePrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    privateEndpointConnectionName: string,
    options?: ManagedInstancePrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Approve or reject a private endpoint connection with a given name. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    privateEndpointConnectionName: string,
    parameters: ManagedInstancePrivateEndpointConnection,
    options?: ManagedInstancePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<ManagedInstancePrivateEndpointConnection>,
    ManagedInstancePrivateEndpointConnection
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    privateEndpointConnectionName: string,
    parameters: ManagedInstancePrivateEndpointConnection,
    options?: ManagedInstancePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ManagedInstancePrivateEndpointConnection>,
      ManagedInstancePrivateEndpointConnection
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    privateEndpointConnectionName: string,
    parameters: ManagedInstancePrivateEndpointConnection,
    options?: ManagedInstancePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<ManagedInstancePrivateEndpointConnection>;
  /** Gets a private endpoint connection. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    privateEndpointConnectionName: string,
    options?: ManagedInstancePrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<ManagedInstancePrivateEndpointConnection>;
}

function _getManagedInstancePrivateEndpointConnections(context: SqlManagementContext) {
  return {
    listByManagedInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancePrivateEndpointConnectionsListByManagedInstanceOptionalParams,
    ) => listByManagedInstance(context, resourceGroupName, managedInstanceName, options),
    delete: (
      resourceGroupName: string,
      managedInstanceName: string,
      privateEndpointConnectionName: string,
      options?: ManagedInstancePrivateEndpointConnectionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        managedInstanceName,
        privateEndpointConnectionName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      managedInstanceName: string,
      privateEndpointConnectionName: string,
      options?: ManagedInstancePrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        managedInstanceName,
        privateEndpointConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      privateEndpointConnectionName: string,
      options?: ManagedInstancePrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        managedInstanceName,
        privateEndpointConnectionName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      privateEndpointConnectionName: string,
      parameters: ManagedInstancePrivateEndpointConnection,
      options?: ManagedInstancePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        privateEndpointConnectionName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      privateEndpointConnectionName: string,
      parameters: ManagedInstancePrivateEndpointConnection,
      options?: ManagedInstancePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        privateEndpointConnectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      privateEndpointConnectionName: string,
      parameters: ManagedInstancePrivateEndpointConnection,
      options?: ManagedInstancePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        privateEndpointConnectionName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      privateEndpointConnectionName: string,
      options?: ManagedInstancePrivateEndpointConnectionsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, managedInstanceName, privateEndpointConnectionName, options),
  };
}

export function _getManagedInstancePrivateEndpointConnectionsOperations(
  context: SqlManagementContext,
): ManagedInstancePrivateEndpointConnectionsOperations {
  return {
    ..._getManagedInstancePrivateEndpointConnections(context),
  };
}
