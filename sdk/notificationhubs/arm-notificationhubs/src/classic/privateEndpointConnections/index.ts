// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NotificationHubsManagementContext } from "../../api/notificationHubsManagementContext.js";
import {
  listGroupIds,
  getGroupId,
  list,
  $delete,
  update,
  get,
} from "../../api/privateEndpointConnections/operations.js";
import type {
  PrivateEndpointConnectionsListGroupIdsOptionalParams,
  PrivateEndpointConnectionsGetGroupIdOptionalParams,
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import type {
  PrivateEndpointConnectionResource,
  PrivateLinkResource,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /**
   * Even though this namespace requires subscription id, resource group and namespace name, it returns a constant payload (for a given namespacE) every time it's called.
   * That's why we don't send it to the sibling RP, but process it directly in the scale unit that received the request.
   */
  listGroupIds: (
    resourceGroupName: string,
    namespaceName: string,
    options?: PrivateEndpointConnectionsListGroupIdsOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
  /**
   * Even though this namespace requires subscription id, resource group and namespace name, it returns a constant payload (for a given namespacE) every time it's called.
   * That's why we don't send it to the sibling RP, but process it directly in the scale unit that received the request.
   */
  getGroupId: (
    resourceGroupName: string,
    namespaceName: string,
    subResourceName: string,
    options?: PrivateEndpointConnectionsGetGroupIdOptionalParams,
  ) => Promise<PrivateLinkResource>;
  /**
   * Returns all Private Endpoint Connections that belong to the given Notification Hubs namespace.
   * This is a public API that can be called directly by Notification Hubs users.
   */
  list: (
    resourceGroupName: string,
    namespaceName: string,
    options?: PrivateEndpointConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnectionResource>;
  /**
   * Deletes the Private Endpoint Connection.
   * This is a public API that can be called directly by Notification Hubs users.
   */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /**
   * Approves or rejects Private Endpoint Connection.
   * This is a public API that can be called directly by Notification Hubs users.
   */
  update: (
    resourceGroupName: string,
    namespaceName: string,
    privateEndpointConnectionName: string,
    parameters: PrivateEndpointConnectionResource,
    options?: PrivateEndpointConnectionsUpdateOptionalParams,
  ) => PollerLike<
    OperationState<PrivateEndpointConnectionResource>,
    PrivateEndpointConnectionResource
  >;
  /**
   * Returns a Private Endpoint Connection with a given name.
   * This is a public API that can be called directly by Notification Hubs users.
   */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnectionResource>;
}

function _getPrivateEndpointConnections(context: NotificationHubsManagementContext) {
  return {
    listGroupIds: (
      resourceGroupName: string,
      namespaceName: string,
      options?: PrivateEndpointConnectionsListGroupIdsOptionalParams,
    ) => listGroupIds(context, resourceGroupName, namespaceName, options),
    getGroupId: (
      resourceGroupName: string,
      namespaceName: string,
      subResourceName: string,
      options?: PrivateEndpointConnectionsGetGroupIdOptionalParams,
    ) => getGroupId(context, resourceGroupName, namespaceName, subResourceName, options),
    list: (
      resourceGroupName: string,
      namespaceName: string,
      options?: PrivateEndpointConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, privateEndpointConnectionName, options),
    update: (
      resourceGroupName: string,
      namespaceName: string,
      privateEndpointConnectionName: string,
      parameters: PrivateEndpointConnectionResource,
      options?: PrivateEndpointConnectionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        namespaceName,
        privateEndpointConnectionName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: NotificationHubsManagementContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
