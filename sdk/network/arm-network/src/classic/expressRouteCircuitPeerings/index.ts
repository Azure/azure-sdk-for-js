// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/expressRouteCircuitPeerings/operations.js";
import type {
  ExpressRouteCircuitPeeringsListOptionalParams,
  ExpressRouteCircuitPeeringsDeleteOptionalParams,
  ExpressRouteCircuitPeeringsCreateOrUpdateOptionalParams,
  ExpressRouteCircuitPeeringsGetOptionalParams,
} from "../../api/expressRouteCircuitPeerings/options.js";
import type { ExpressRouteCircuitPeering } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExpressRouteCircuitPeerings operations. */
export interface ExpressRouteCircuitPeeringsOperations {
  /** Gets all peerings in a specified express route circuit. */
  list: (
    resourceGroupName: string,
    circuitName: string,
    options?: ExpressRouteCircuitPeeringsListOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRouteCircuitPeering>;
  /** Deletes the specified peering from the specified express route circuit. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    options?: ExpressRouteCircuitPeeringsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    options?: ExpressRouteCircuitPeeringsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    options?: ExpressRouteCircuitPeeringsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a peering in the specified express route circuits. */
  createOrUpdate: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    peeringParameters: ExpressRouteCircuitPeering,
    options?: ExpressRouteCircuitPeeringsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExpressRouteCircuitPeering>, ExpressRouteCircuitPeering>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    peeringParameters: ExpressRouteCircuitPeering,
    options?: ExpressRouteCircuitPeeringsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ExpressRouteCircuitPeering>, ExpressRouteCircuitPeering>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    peeringParameters: ExpressRouteCircuitPeering,
    options?: ExpressRouteCircuitPeeringsCreateOrUpdateOptionalParams,
  ) => Promise<ExpressRouteCircuitPeering>;
  /** Gets the specified peering for the express route circuit. */
  get: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    options?: ExpressRouteCircuitPeeringsGetOptionalParams,
  ) => Promise<ExpressRouteCircuitPeering>;
}

function _getExpressRouteCircuitPeerings(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      circuitName: string,
      options?: ExpressRouteCircuitPeeringsListOptionalParams,
    ) => list(context, resourceGroupName, circuitName, options),
    delete: (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      options?: ExpressRouteCircuitPeeringsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, circuitName, peeringName, options),
    beginDelete: async (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      options?: ExpressRouteCircuitPeeringsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, circuitName, peeringName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      options?: ExpressRouteCircuitPeeringsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, circuitName, peeringName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      peeringParameters: ExpressRouteCircuitPeering,
      options?: ExpressRouteCircuitPeeringsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        circuitName,
        peeringName,
        peeringParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      peeringParameters: ExpressRouteCircuitPeering,
      options?: ExpressRouteCircuitPeeringsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        circuitName,
        peeringName,
        peeringParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      peeringParameters: ExpressRouteCircuitPeering,
      options?: ExpressRouteCircuitPeeringsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        circuitName,
        peeringName,
        peeringParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      options?: ExpressRouteCircuitPeeringsGetOptionalParams,
    ) => get(context, resourceGroupName, circuitName, peeringName, options),
  };
}

export function _getExpressRouteCircuitPeeringsOperations(
  context: NetworkManagementContext,
): ExpressRouteCircuitPeeringsOperations {
  return {
    ..._getExpressRouteCircuitPeerings(context),
  };
}
