// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import {
  listByResource,
  $delete,
  update,
  get,
} from "../../api/privateEndpointConnections/operations.js";
import type {
  PrivateEndpointConnectionsListByResourceOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import type {
  PrivateEndpointConnection,
  PrivateEndpointConnectionsParentType,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** Get all private endpoint connections under a topic, domain, or partner namespace or namespace. */
  listByResource: (
    resourceGroupName: string,
    parentType: PrivateEndpointConnectionsParentType,
    parentName: string,
    options?: PrivateEndpointConnectionsListByResourceOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Delete a specific private endpoint connection under a topic, domain, or partner namespace or namespace. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    parentType: PrivateEndpointConnectionsParentType,
    parentName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    parentType: PrivateEndpointConnectionsParentType,
    parentName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    parentType: PrivateEndpointConnectionsParentType,
    parentName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a specific private endpoint connection under a topic, domain or partner namespace. */
  update: (
    resourceGroupName: string,
    parentType: PrivateEndpointConnectionsParentType,
    parentName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnection: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    parentType: PrivateEndpointConnectionsParentType,
    parentName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnection: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    parentType: PrivateEndpointConnectionsParentType,
    parentName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnection: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsUpdateOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Get a specific private endpoint connection under a topic, domain, or partner namespace or namespace. */
  get: (
    resourceGroupName: string,
    parentType: PrivateEndpointConnectionsParentType,
    parentName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnections(context: EventGridManagementContext) {
  return {
    listByResource: (
      resourceGroupName: string,
      parentType: PrivateEndpointConnectionsParentType,
      parentName: string,
      options?: PrivateEndpointConnectionsListByResourceOptionalParams,
    ) => listByResource(context, resourceGroupName, parentType, parentName, options),
    delete: (
      resourceGroupName: string,
      parentType: PrivateEndpointConnectionsParentType,
      parentName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        parentType,
        parentName,
        privateEndpointConnectionName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      parentType: PrivateEndpointConnectionsParentType,
      parentName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        parentType,
        parentName,
        privateEndpointConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      parentType: PrivateEndpointConnectionsParentType,
      parentName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        parentType,
        parentName,
        privateEndpointConnectionName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      parentType: PrivateEndpointConnectionsParentType,
      parentName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnection: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        parentType,
        parentName,
        privateEndpointConnectionName,
        privateEndpointConnection,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      parentType: PrivateEndpointConnectionsParentType,
      parentName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnection: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        parentType,
        parentName,
        privateEndpointConnectionName,
        privateEndpointConnection,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      parentType: PrivateEndpointConnectionsParentType,
      parentName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnection: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        parentType,
        parentName,
        privateEndpointConnectionName,
        privateEndpointConnection,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      parentType: PrivateEndpointConnectionsParentType,
      parentName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        parentType,
        parentName,
        privateEndpointConnectionName,
        options,
      ),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: EventGridManagementContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
