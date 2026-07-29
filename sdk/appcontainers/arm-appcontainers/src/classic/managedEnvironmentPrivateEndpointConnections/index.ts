// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/managedEnvironmentPrivateEndpointConnections/operations.js";
import {
  ManagedEnvironmentPrivateEndpointConnectionsListOptionalParams,
  ManagedEnvironmentPrivateEndpointConnectionsDeleteOptionalParams,
  ManagedEnvironmentPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ManagedEnvironmentPrivateEndpointConnectionsGetOptionalParams,
} from "../../api/managedEnvironmentPrivateEndpointConnections/options.js";
import { PrivateEndpointConnection } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedEnvironmentPrivateEndpointConnections operations. */
export interface ManagedEnvironmentPrivateEndpointConnectionsOperations {
  /** List private endpoint connections for a given managed environment. */
  list: (
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentPrivateEndpointConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Delete a private endpoint connection for a given managed environment. */
  delete: (
    resourceGroupName: string,
    environmentName: string,
    privateEndpointConnectionName: string,
    options?: ManagedEnvironmentPrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    environmentName: string,
    privateEndpointConnectionName: string,
    options?: ManagedEnvironmentPrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    environmentName: string,
    privateEndpointConnectionName: string,
    options?: ManagedEnvironmentPrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the state of a private endpoint connection for a given managed environment. */
  createOrUpdate: (
    resourceGroupName: string,
    environmentName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnectionEnvelope: PrivateEndpointConnection,
    options?: ManagedEnvironmentPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    environmentName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnectionEnvelope: PrivateEndpointConnection,
    options?: ManagedEnvironmentPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    environmentName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnectionEnvelope: PrivateEndpointConnection,
    options?: ManagedEnvironmentPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Get a private endpoint connection for a given managed environment. */
  get: (
    resourceGroupName: string,
    environmentName: string,
    privateEndpointConnectionName: string,
    options?: ManagedEnvironmentPrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getManagedEnvironmentPrivateEndpointConnections(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      environmentName: string,
      options?: ManagedEnvironmentPrivateEndpointConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, environmentName, options),
    delete: (
      resourceGroupName: string,
      environmentName: string,
      privateEndpointConnectionName: string,
      options?: ManagedEnvironmentPrivateEndpointConnectionsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, environmentName, privateEndpointConnectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      environmentName: string,
      privateEndpointConnectionName: string,
      options?: ManagedEnvironmentPrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        environmentName,
        privateEndpointConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      environmentName: string,
      privateEndpointConnectionName: string,
      options?: ManagedEnvironmentPrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        environmentName,
        privateEndpointConnectionName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      environmentName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnectionEnvelope: PrivateEndpointConnection,
      options?: ManagedEnvironmentPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        environmentName,
        privateEndpointConnectionName,
        privateEndpointConnectionEnvelope,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      environmentName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnectionEnvelope: PrivateEndpointConnection,
      options?: ManagedEnvironmentPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        environmentName,
        privateEndpointConnectionName,
        privateEndpointConnectionEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      environmentName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnectionEnvelope: PrivateEndpointConnection,
      options?: ManagedEnvironmentPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        environmentName,
        privateEndpointConnectionName,
        privateEndpointConnectionEnvelope,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      environmentName: string,
      privateEndpointConnectionName: string,
      options?: ManagedEnvironmentPrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, environmentName, privateEndpointConnectionName, options),
  };
}

export function _getManagedEnvironmentPrivateEndpointConnectionsOperations(
  context: ContainerAppsAPIContext,
): ManagedEnvironmentPrivateEndpointConnectionsOperations {
  return {
    ..._getManagedEnvironmentPrivateEndpointConnections(context),
  };
}
