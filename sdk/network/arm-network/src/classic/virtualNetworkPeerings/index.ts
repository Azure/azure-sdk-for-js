// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/virtualNetworkPeerings/operations.js";
import type {
  VirtualNetworkPeeringsListOptionalParams,
  VirtualNetworkPeeringsDeleteOptionalParams,
  VirtualNetworkPeeringsCreateOrUpdateOptionalParams,
  VirtualNetworkPeeringsGetOptionalParams,
} from "../../api/virtualNetworkPeerings/options.js";
import type { VirtualNetworkPeering } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualNetworkPeerings operations. */
export interface VirtualNetworkPeeringsOperations {
  /** Gets all virtual network peerings in a virtual network. */
  list: (
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: VirtualNetworkPeeringsListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetworkPeering>;
  /** Deletes the specified virtual network peering. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualNetworkName: string,
    virtualNetworkPeeringName: string,
    options?: VirtualNetworkPeeringsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualNetworkName: string,
    virtualNetworkPeeringName: string,
    options?: VirtualNetworkPeeringsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualNetworkName: string,
    virtualNetworkPeeringName: string,
    options?: VirtualNetworkPeeringsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a peering in the specified virtual network. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualNetworkName: string,
    virtualNetworkPeeringName: string,
    virtualNetworkPeeringParameters: VirtualNetworkPeering,
    options?: VirtualNetworkPeeringsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkPeering>, VirtualNetworkPeering>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualNetworkName: string,
    virtualNetworkPeeringName: string,
    virtualNetworkPeeringParameters: VirtualNetworkPeering,
    options?: VirtualNetworkPeeringsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualNetworkPeering>, VirtualNetworkPeering>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualNetworkName: string,
    virtualNetworkPeeringName: string,
    virtualNetworkPeeringParameters: VirtualNetworkPeering,
    options?: VirtualNetworkPeeringsCreateOrUpdateOptionalParams,
  ) => Promise<VirtualNetworkPeering>;
  /** Gets the specified virtual network peering. */
  get: (
    resourceGroupName: string,
    virtualNetworkName: string,
    virtualNetworkPeeringName: string,
    options?: VirtualNetworkPeeringsGetOptionalParams,
  ) => Promise<VirtualNetworkPeering>;
}

function _getVirtualNetworkPeerings(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      virtualNetworkName: string,
      options?: VirtualNetworkPeeringsListOptionalParams,
    ) => list(context, resourceGroupName, virtualNetworkName, options),
    delete: (
      resourceGroupName: string,
      virtualNetworkName: string,
      virtualNetworkPeeringName: string,
      options?: VirtualNetworkPeeringsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, virtualNetworkName, virtualNetworkPeeringName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      virtualNetworkPeeringName: string,
      options?: VirtualNetworkPeeringsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        virtualNetworkName,
        virtualNetworkPeeringName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      virtualNetworkPeeringName: string,
      options?: VirtualNetworkPeeringsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        virtualNetworkName,
        virtualNetworkPeeringName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualNetworkName: string,
      virtualNetworkPeeringName: string,
      virtualNetworkPeeringParameters: VirtualNetworkPeering,
      options?: VirtualNetworkPeeringsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkName,
        virtualNetworkPeeringName,
        virtualNetworkPeeringParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      virtualNetworkPeeringName: string,
      virtualNetworkPeeringParameters: VirtualNetworkPeering,
      options?: VirtualNetworkPeeringsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkName,
        virtualNetworkPeeringName,
        virtualNetworkPeeringParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      virtualNetworkPeeringName: string,
      virtualNetworkPeeringParameters: VirtualNetworkPeering,
      options?: VirtualNetworkPeeringsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkName,
        virtualNetworkPeeringName,
        virtualNetworkPeeringParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualNetworkName: string,
      virtualNetworkPeeringName: string,
      options?: VirtualNetworkPeeringsGetOptionalParams,
    ) => get(context, resourceGroupName, virtualNetworkName, virtualNetworkPeeringName, options),
  };
}

export function _getVirtualNetworkPeeringsOperations(
  context: NetworkManagementContext,
): VirtualNetworkPeeringsOperations {
  return {
    ..._getVirtualNetworkPeerings(context),
  };
}
