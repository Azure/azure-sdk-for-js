// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/expressRouteCircuitConnections/operations.js";
import type {
  ExpressRouteCircuitConnectionsListOptionalParams,
  ExpressRouteCircuitConnectionsDeleteOptionalParams,
  ExpressRouteCircuitConnectionsCreateOrUpdateOptionalParams,
  ExpressRouteCircuitConnectionsGetOptionalParams,
} from "../../api/expressRouteCircuitConnections/options.js";
import type { ExpressRouteCircuitConnection } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExpressRouteCircuitConnections operations. */
export interface ExpressRouteCircuitConnectionsOperations {
  /** Gets all global reach connections associated with a private peering in an express route circuit. */
  list: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    options?: ExpressRouteCircuitConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRouteCircuitConnection>;
  /** Deletes the specified Express Route Circuit Connection from the specified express route circuit. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    connectionName: string,
    options?: ExpressRouteCircuitConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    connectionName: string,
    options?: ExpressRouteCircuitConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    connectionName: string,
    options?: ExpressRouteCircuitConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a Express Route Circuit Connection in the specified express route circuits. */
  createOrUpdate: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    connectionName: string,
    expressRouteCircuitConnectionParameters: ExpressRouteCircuitConnection,
    options?: ExpressRouteCircuitConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExpressRouteCircuitConnection>, ExpressRouteCircuitConnection>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    connectionName: string,
    expressRouteCircuitConnectionParameters: ExpressRouteCircuitConnection,
    options?: ExpressRouteCircuitConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ExpressRouteCircuitConnection>, ExpressRouteCircuitConnection>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    connectionName: string,
    expressRouteCircuitConnectionParameters: ExpressRouteCircuitConnection,
    options?: ExpressRouteCircuitConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<ExpressRouteCircuitConnection>;
  /** Gets the specified Express Route Circuit Connection from the specified express route circuit. */
  get: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    connectionName: string,
    options?: ExpressRouteCircuitConnectionsGetOptionalParams,
  ) => Promise<ExpressRouteCircuitConnection>;
}

function _getExpressRouteCircuitConnections(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      options?: ExpressRouteCircuitConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, circuitName, peeringName, options),
    delete: (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      connectionName: string,
      options?: ExpressRouteCircuitConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, circuitName, peeringName, connectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      connectionName: string,
      options?: ExpressRouteCircuitConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        circuitName,
        peeringName,
        connectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      connectionName: string,
      options?: ExpressRouteCircuitConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        circuitName,
        peeringName,
        connectionName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      connectionName: string,
      expressRouteCircuitConnectionParameters: ExpressRouteCircuitConnection,
      options?: ExpressRouteCircuitConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        circuitName,
        peeringName,
        connectionName,
        expressRouteCircuitConnectionParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      connectionName: string,
      expressRouteCircuitConnectionParameters: ExpressRouteCircuitConnection,
      options?: ExpressRouteCircuitConnectionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        circuitName,
        peeringName,
        connectionName,
        expressRouteCircuitConnectionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      connectionName: string,
      expressRouteCircuitConnectionParameters: ExpressRouteCircuitConnection,
      options?: ExpressRouteCircuitConnectionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        circuitName,
        peeringName,
        connectionName,
        expressRouteCircuitConnectionParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      connectionName: string,
      options?: ExpressRouteCircuitConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, circuitName, peeringName, connectionName, options),
  };
}

export function _getExpressRouteCircuitConnectionsOperations(
  context: NetworkManagementContext,
): ExpressRouteCircuitConnectionsOperations {
  return {
    ..._getExpressRouteCircuitConnections(context),
  };
}
