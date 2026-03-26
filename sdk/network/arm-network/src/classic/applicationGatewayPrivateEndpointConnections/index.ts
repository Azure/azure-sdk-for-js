// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  update,
  get,
} from "../../api/applicationGatewayPrivateEndpointConnections/operations.js";
import type {
  ApplicationGatewayPrivateEndpointConnectionsListOptionalParams,
  ApplicationGatewayPrivateEndpointConnectionsDeleteOptionalParams,
  ApplicationGatewayPrivateEndpointConnectionsUpdateOptionalParams,
  ApplicationGatewayPrivateEndpointConnectionsGetOptionalParams,
} from "../../api/applicationGatewayPrivateEndpointConnections/options.js";
import type { ApplicationGatewayPrivateEndpointConnection } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ApplicationGatewayPrivateEndpointConnections operations. */
export interface ApplicationGatewayPrivateEndpointConnectionsOperations {
  /** Lists all private endpoint connections on an application gateway. */
  list: (
    resourceGroupName: string,
    applicationGatewayName: string,
    options?: ApplicationGatewayPrivateEndpointConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationGatewayPrivateEndpointConnection>;
  /** Deletes the specified private endpoint connection on application gateway. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    applicationGatewayName: string,
    connectionName: string,
    options?: ApplicationGatewayPrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    applicationGatewayName: string,
    connectionName: string,
    options?: ApplicationGatewayPrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    applicationGatewayName: string,
    connectionName: string,
    options?: ApplicationGatewayPrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the specified private endpoint connection on application gateway. */
  update: (
    resourceGroupName: string,
    applicationGatewayName: string,
    connectionName: string,
    parameters: ApplicationGatewayPrivateEndpointConnection,
    options?: ApplicationGatewayPrivateEndpointConnectionsUpdateOptionalParams,
  ) => PollerLike<
    OperationState<ApplicationGatewayPrivateEndpointConnection>,
    ApplicationGatewayPrivateEndpointConnection
  >;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    applicationGatewayName: string,
    connectionName: string,
    parameters: ApplicationGatewayPrivateEndpointConnection,
    options?: ApplicationGatewayPrivateEndpointConnectionsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ApplicationGatewayPrivateEndpointConnection>,
      ApplicationGatewayPrivateEndpointConnection
    >
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    applicationGatewayName: string,
    connectionName: string,
    parameters: ApplicationGatewayPrivateEndpointConnection,
    options?: ApplicationGatewayPrivateEndpointConnectionsUpdateOptionalParams,
  ) => Promise<ApplicationGatewayPrivateEndpointConnection>;
  /** Gets the specified private endpoint connection on application gateway. */
  get: (
    resourceGroupName: string,
    applicationGatewayName: string,
    connectionName: string,
    options?: ApplicationGatewayPrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<ApplicationGatewayPrivateEndpointConnection>;
}

function _getApplicationGatewayPrivateEndpointConnections(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      applicationGatewayName: string,
      options?: ApplicationGatewayPrivateEndpointConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, applicationGatewayName, options),
    delete: (
      resourceGroupName: string,
      applicationGatewayName: string,
      connectionName: string,
      options?: ApplicationGatewayPrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, applicationGatewayName, connectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      applicationGatewayName: string,
      connectionName: string,
      options?: ApplicationGatewayPrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        applicationGatewayName,
        connectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      applicationGatewayName: string,
      connectionName: string,
      options?: ApplicationGatewayPrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        applicationGatewayName,
        connectionName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      applicationGatewayName: string,
      connectionName: string,
      parameters: ApplicationGatewayPrivateEndpointConnection,
      options?: ApplicationGatewayPrivateEndpointConnectionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        applicationGatewayName,
        connectionName,
        parameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      applicationGatewayName: string,
      connectionName: string,
      parameters: ApplicationGatewayPrivateEndpointConnection,
      options?: ApplicationGatewayPrivateEndpointConnectionsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        applicationGatewayName,
        connectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      applicationGatewayName: string,
      connectionName: string,
      parameters: ApplicationGatewayPrivateEndpointConnection,
      options?: ApplicationGatewayPrivateEndpointConnectionsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        applicationGatewayName,
        connectionName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      applicationGatewayName: string,
      connectionName: string,
      options?: ApplicationGatewayPrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, applicationGatewayName, connectionName, options),
  };
}

export function _getApplicationGatewayPrivateEndpointConnectionsOperations(
  context: NetworkManagementContext,
): ApplicationGatewayPrivateEndpointConnectionsOperations {
  return {
    ..._getApplicationGatewayPrivateEndpointConnections(context),
  };
}
