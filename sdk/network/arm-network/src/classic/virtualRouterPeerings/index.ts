// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/virtualRouterPeerings/operations.js";
import type {
  VirtualRouterPeeringsListOptionalParams,
  VirtualRouterPeeringsDeleteOptionalParams,
  VirtualRouterPeeringsCreateOrUpdateOptionalParams,
  VirtualRouterPeeringsGetOptionalParams,
} from "../../api/virtualRouterPeerings/options.js";
import type { VirtualRouterPeering } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualRouterPeerings operations. */
export interface VirtualRouterPeeringsOperations {
  /** Lists all Virtual Router Peerings in a Virtual Router resource. */
  list: (
    resourceGroupName: string,
    virtualRouterName: string,
    options?: VirtualRouterPeeringsListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualRouterPeering>;
  /** Deletes the specified peering from a Virtual Router. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualRouterName: string,
    peeringName: string,
    options?: VirtualRouterPeeringsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualRouterName: string,
    peeringName: string,
    options?: VirtualRouterPeeringsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualRouterName: string,
    peeringName: string,
    options?: VirtualRouterPeeringsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the specified Virtual Router Peering. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualRouterName: string,
    peeringName: string,
    parameters: VirtualRouterPeering,
    options?: VirtualRouterPeeringsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualRouterPeering>, VirtualRouterPeering>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualRouterName: string,
    peeringName: string,
    parameters: VirtualRouterPeering,
    options?: VirtualRouterPeeringsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualRouterPeering>, VirtualRouterPeering>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualRouterName: string,
    peeringName: string,
    parameters: VirtualRouterPeering,
    options?: VirtualRouterPeeringsCreateOrUpdateOptionalParams,
  ) => Promise<VirtualRouterPeering>;
  /** Gets the specified Virtual Router Peering. */
  get: (
    resourceGroupName: string,
    virtualRouterName: string,
    peeringName: string,
    options?: VirtualRouterPeeringsGetOptionalParams,
  ) => Promise<VirtualRouterPeering>;
}

function _getVirtualRouterPeerings(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      virtualRouterName: string,
      options?: VirtualRouterPeeringsListOptionalParams,
    ) => list(context, resourceGroupName, virtualRouterName, options),
    delete: (
      resourceGroupName: string,
      virtualRouterName: string,
      peeringName: string,
      options?: VirtualRouterPeeringsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualRouterName, peeringName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualRouterName: string,
      peeringName: string,
      options?: VirtualRouterPeeringsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, virtualRouterName, peeringName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualRouterName: string,
      peeringName: string,
      options?: VirtualRouterPeeringsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualRouterName, peeringName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualRouterName: string,
      peeringName: string,
      parameters: VirtualRouterPeering,
      options?: VirtualRouterPeeringsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        virtualRouterName,
        peeringName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualRouterName: string,
      peeringName: string,
      parameters: VirtualRouterPeering,
      options?: VirtualRouterPeeringsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualRouterName,
        peeringName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualRouterName: string,
      peeringName: string,
      parameters: VirtualRouterPeering,
      options?: VirtualRouterPeeringsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualRouterName,
        peeringName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualRouterName: string,
      peeringName: string,
      options?: VirtualRouterPeeringsGetOptionalParams,
    ) => get(context, resourceGroupName, virtualRouterName, peeringName, options),
  };
}

export function _getVirtualRouterPeeringsOperations(
  context: NetworkManagementContext,
): VirtualRouterPeeringsOperations {
  return {
    ..._getVirtualRouterPeerings(context),
  };
}
