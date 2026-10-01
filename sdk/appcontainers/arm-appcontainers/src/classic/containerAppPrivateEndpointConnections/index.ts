// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/containerAppPrivateEndpointConnections/operations.js";
import type {
  ContainerAppPrivateEndpointConnectionsListOptionalParams,
  ContainerAppPrivateEndpointConnectionsDeleteOptionalParams,
  ContainerAppPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ContainerAppPrivateEndpointConnectionsGetOptionalParams,
} from "../../api/containerAppPrivateEndpointConnections/options.js";
import type { PrivateEndpointConnection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ContainerAppPrivateEndpointConnections operations. */
export interface ContainerAppPrivateEndpointConnectionsOperations {
  /** Lists all private endpoint connections associated with a Container App. */
  list: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppPrivateEndpointConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes the specified private endpoint connection associated with a Container App. */
  delete: (
    resourceGroupName: string,
    containerAppName: string,
    privateEndpointConnectionName: string,
    options?: ContainerAppPrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    containerAppName: string,
    privateEndpointConnectionName: string,
    options?: ContainerAppPrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    containerAppName: string,
    privateEndpointConnectionName: string,
    options?: ContainerAppPrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a private endpoint connection or updates its connection state for a Container App. */
  createOrUpdate: (
    resourceGroupName: string,
    containerAppName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnectionEnvelope: PrivateEndpointConnection,
    options?: ContainerAppPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    containerAppName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnectionEnvelope: PrivateEndpointConnection,
    options?: ContainerAppPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    containerAppName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnectionEnvelope: PrivateEndpointConnection,
    options?: ContainerAppPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Gets the details of a private endpoint connection associated with a Container App. */
  get: (
    resourceGroupName: string,
    containerAppName: string,
    privateEndpointConnectionName: string,
    options?: ContainerAppPrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getContainerAppPrivateEndpointConnections(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppPrivateEndpointConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, containerAppName, options),
    delete: (
      resourceGroupName: string,
      containerAppName: string,
      privateEndpointConnectionName: string,
      options?: ContainerAppPrivateEndpointConnectionsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, containerAppName, privateEndpointConnectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      containerAppName: string,
      privateEndpointConnectionName: string,
      options?: ContainerAppPrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        containerAppName,
        privateEndpointConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      containerAppName: string,
      privateEndpointConnectionName: string,
      options?: ContainerAppPrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        containerAppName,
        privateEndpointConnectionName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      containerAppName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnectionEnvelope: PrivateEndpointConnection,
      options?: ContainerAppPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        containerAppName,
        privateEndpointConnectionName,
        privateEndpointConnectionEnvelope,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      containerAppName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnectionEnvelope: PrivateEndpointConnection,
      options?: ContainerAppPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        containerAppName,
        privateEndpointConnectionName,
        privateEndpointConnectionEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      containerAppName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnectionEnvelope: PrivateEndpointConnection,
      options?: ContainerAppPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        containerAppName,
        privateEndpointConnectionName,
        privateEndpointConnectionEnvelope,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      containerAppName: string,
      privateEndpointConnectionName: string,
      options?: ContainerAppPrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, containerAppName, privateEndpointConnectionName, options),
  };
}

export function _getContainerAppPrivateEndpointConnectionsOperations(
  context: ContainerAppsAPIContext,
): ContainerAppPrivateEndpointConnectionsOperations {
  return {
    ..._getContainerAppPrivateEndpointConnections(context),
  };
}
