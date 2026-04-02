// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  createOrUpdate,
  get,
  $delete,
  list,
} from "../../api/expressRouteCrossConnectionPeerings/operations.js";
import type {
  ExpressRouteCrossConnectionPeeringsCreateOrUpdateOptionalParams,
  ExpressRouteCrossConnectionPeeringsGetOptionalParams,
  ExpressRouteCrossConnectionPeeringsDeleteOptionalParams,
  ExpressRouteCrossConnectionPeeringsListOptionalParams,
} from "../../api/expressRouteCrossConnectionPeerings/options.js";
import type { ExpressRouteCrossConnectionPeering } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExpressRouteCrossConnectionPeerings operations. */
export interface ExpressRouteCrossConnectionPeeringsOperations {
  /** Creates or updates a peering in the specified ExpressRouteCrossConnection. */
  createOrUpdate: (
    resourceGroupName: string,
    crossConnectionName: string,
    peeringName: string,
    peeringParameters: ExpressRouteCrossConnectionPeering,
    options?: ExpressRouteCrossConnectionPeeringsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<ExpressRouteCrossConnectionPeering>,
    ExpressRouteCrossConnectionPeering
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    crossConnectionName: string,
    peeringName: string,
    peeringParameters: ExpressRouteCrossConnectionPeering,
    options?: ExpressRouteCrossConnectionPeeringsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExpressRouteCrossConnectionPeering>,
      ExpressRouteCrossConnectionPeering
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    crossConnectionName: string,
    peeringName: string,
    peeringParameters: ExpressRouteCrossConnectionPeering,
    options?: ExpressRouteCrossConnectionPeeringsCreateOrUpdateOptionalParams,
  ) => Promise<ExpressRouteCrossConnectionPeering>;
  /** Gets the specified peering for the ExpressRouteCrossConnection. */
  get: (
    resourceGroupName: string,
    crossConnectionName: string,
    peeringName: string,
    options?: ExpressRouteCrossConnectionPeeringsGetOptionalParams,
  ) => Promise<ExpressRouteCrossConnectionPeering>;
  /** Deletes the specified peering from the ExpressRouteCrossConnection. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    crossConnectionName: string,
    peeringName: string,
    options?: ExpressRouteCrossConnectionPeeringsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    crossConnectionName: string,
    peeringName: string,
    options?: ExpressRouteCrossConnectionPeeringsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    crossConnectionName: string,
    peeringName: string,
    options?: ExpressRouteCrossConnectionPeeringsDeleteOptionalParams,
  ) => Promise<void>;
  /** Gets all peerings in a specified ExpressRouteCrossConnection. */
  list: (
    resourceGroupName: string,
    crossConnectionName: string,
    options?: ExpressRouteCrossConnectionPeeringsListOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRouteCrossConnectionPeering>;
}

function _getExpressRouteCrossConnectionPeerings(context: NetworkManagementContext) {
  return {
    createOrUpdate: (
      resourceGroupName: string,
      crossConnectionName: string,
      peeringName: string,
      peeringParameters: ExpressRouteCrossConnectionPeering,
      options?: ExpressRouteCrossConnectionPeeringsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        crossConnectionName,
        peeringName,
        peeringParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      crossConnectionName: string,
      peeringName: string,
      peeringParameters: ExpressRouteCrossConnectionPeering,
      options?: ExpressRouteCrossConnectionPeeringsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        crossConnectionName,
        peeringName,
        peeringParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      crossConnectionName: string,
      peeringName: string,
      peeringParameters: ExpressRouteCrossConnectionPeering,
      options?: ExpressRouteCrossConnectionPeeringsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        crossConnectionName,
        peeringName,
        peeringParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      crossConnectionName: string,
      peeringName: string,
      options?: ExpressRouteCrossConnectionPeeringsGetOptionalParams,
    ) => get(context, resourceGroupName, crossConnectionName, peeringName, options),
    delete: (
      resourceGroupName: string,
      crossConnectionName: string,
      peeringName: string,
      options?: ExpressRouteCrossConnectionPeeringsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, crossConnectionName, peeringName, options),
    beginDelete: async (
      resourceGroupName: string,
      crossConnectionName: string,
      peeringName: string,
      options?: ExpressRouteCrossConnectionPeeringsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, crossConnectionName, peeringName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      crossConnectionName: string,
      peeringName: string,
      options?: ExpressRouteCrossConnectionPeeringsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, crossConnectionName, peeringName, options);
    },
    list: (
      resourceGroupName: string,
      crossConnectionName: string,
      options?: ExpressRouteCrossConnectionPeeringsListOptionalParams,
    ) => list(context, resourceGroupName, crossConnectionName, options),
  };
}

export function _getExpressRouteCrossConnectionPeeringsOperations(
  context: NetworkManagementContext,
): ExpressRouteCrossConnectionPeeringsOperations {
  return {
    ..._getExpressRouteCrossConnectionPeerings(context),
  };
}
