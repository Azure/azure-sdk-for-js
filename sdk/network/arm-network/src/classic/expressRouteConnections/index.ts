// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  get,
  createOrUpdate,
} from "../../api/expressRouteConnections/operations.js";
import type {
  ExpressRouteConnectionsListOptionalParams,
  ExpressRouteConnectionsDeleteOptionalParams,
  ExpressRouteConnectionsGetOptionalParams,
  ExpressRouteConnectionsCreateOrUpdateOptionalParams,
} from "../../api/expressRouteConnections/options.js";
import type {
  ExpressRouteConnection,
  ExpressRouteConnectionList,
} from "../../models/microsoft/network/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExpressRouteConnections operations. */
export interface ExpressRouteConnectionsOperations {
  /** Lists ExpressRouteConnections. */
  list: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    options?: ExpressRouteConnectionsListOptionalParams,
  ) => Promise<ExpressRouteConnectionList>;
  /** Deletes a connection to a ExpressRoute circuit. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    connectionName: string,
    options?: ExpressRouteConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    connectionName: string,
    options?: ExpressRouteConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    connectionName: string,
    options?: ExpressRouteConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Gets the specified ExpressRouteConnection. */
  get: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    connectionName: string,
    options?: ExpressRouteConnectionsGetOptionalParams,
  ) => Promise<ExpressRouteConnection>;
  /** Creates a connection between an ExpressRoute gateway and an ExpressRoute circuit. */
  createOrUpdate: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    connectionName: string,
    putExpressRouteConnectionParameters: ExpressRouteConnection,
    options?: ExpressRouteConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExpressRouteConnection>, ExpressRouteConnection>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    connectionName: string,
    putExpressRouteConnectionParameters: ExpressRouteConnection,
    options?: ExpressRouteConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ExpressRouteConnection>, ExpressRouteConnection>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    connectionName: string,
    putExpressRouteConnectionParameters: ExpressRouteConnection,
    options?: ExpressRouteConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<ExpressRouteConnection>;
}

function _getExpressRouteConnections(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      options?: ExpressRouteConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, expressRouteGatewayName, options),
    delete: (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      connectionName: string,
      options?: ExpressRouteConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, expressRouteGatewayName, connectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      connectionName: string,
      options?: ExpressRouteConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        connectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      connectionName: string,
      options?: ExpressRouteConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        connectionName,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      connectionName: string,
      options?: ExpressRouteConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, expressRouteGatewayName, connectionName, options),
    createOrUpdate: (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      connectionName: string,
      putExpressRouteConnectionParameters: ExpressRouteConnection,
      options?: ExpressRouteConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        connectionName,
        putExpressRouteConnectionParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      connectionName: string,
      putExpressRouteConnectionParameters: ExpressRouteConnection,
      options?: ExpressRouteConnectionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        connectionName,
        putExpressRouteConnectionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      connectionName: string,
      putExpressRouteConnectionParameters: ExpressRouteConnection,
      options?: ExpressRouteConnectionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        connectionName,
        putExpressRouteConnectionParameters,
        options,
      );
    },
  };
}

export function _getExpressRouteConnectionsOperations(
  context: NetworkManagementContext,
): ExpressRouteConnectionsOperations {
  return {
    ..._getExpressRouteConnections(context),
  };
}
