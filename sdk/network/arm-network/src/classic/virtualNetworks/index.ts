// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  moveIpConfigurations,
  listDdosProtectionStatus,
  listUsage,
  checkIPAddressAvailability,
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/virtualNetworks/operations.js";
import type {
  VirtualNetworksMoveIpConfigurationsOptionalParams,
  VirtualNetworksListDdosProtectionStatusOptionalParams,
  VirtualNetworksListUsageOptionalParams,
  VirtualNetworksCheckIPAddressAvailabilityOptionalParams,
  VirtualNetworksListAllOptionalParams,
  VirtualNetworksListOptionalParams,
  VirtualNetworksDeleteOptionalParams,
  VirtualNetworksUpdateTagsOptionalParams,
  VirtualNetworksCreateOrUpdateOptionalParams,
  VirtualNetworksGetOptionalParams,
} from "../../api/virtualNetworks/options.js";
import type { VirtualNetwork } from "../../models/common/models.js";
import type {
  TagsObject,
  PublicIpDdosProtectionStatusResult,
  IPAddressAvailabilityResult,
  VirtualNetworkUsage,
  MoveIpConfigurationsRequest,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualNetworks operations. */
export interface VirtualNetworksOperations {
  /** Move IP configurations from one virtual network to another. */
  moveIpConfigurations: (
    resourceGroupName: string,
    virtualNetworkName: string,
    body: MoveIpConfigurationsRequest,
    options?: VirtualNetworksMoveIpConfigurationsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use moveIpConfigurations instead */
  beginMoveIpConfigurations: (
    resourceGroupName: string,
    virtualNetworkName: string,
    body: MoveIpConfigurationsRequest,
    options?: VirtualNetworksMoveIpConfigurationsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use moveIpConfigurations instead */
  beginMoveIpConfigurationsAndWait: (
    resourceGroupName: string,
    virtualNetworkName: string,
    body: MoveIpConfigurationsRequest,
    options?: VirtualNetworksMoveIpConfigurationsOptionalParams,
  ) => Promise<void>;
  /** Gets the Ddos Protection Status of all IP Addresses under the Virtual Network */
  listDdosProtectionStatus: (
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: VirtualNetworksListDdosProtectionStatusOptionalParams,
  ) => PagedAsyncIterableIterator<PublicIpDdosProtectionStatusResult>;
  /** @deprecated use listDdosProtectionStatus instead */
  beginListDdosProtectionStatusAndWait: (
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: VirtualNetworksListDdosProtectionStatusOptionalParams,
  ) => PagedAsyncIterableIterator<PublicIpDdosProtectionStatusResult>;
  /** Lists usage stats. */
  listUsage: (
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: VirtualNetworksListUsageOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetworkUsage>;
  /** Checks whether a private IP address is available for use. */
  checkIPAddressAvailability: (
    resourceGroupName: string,
    virtualNetworkName: string,
    ipAddress: string,
    options?: VirtualNetworksCheckIPAddressAvailabilityOptionalParams,
  ) => Promise<IPAddressAvailabilityResult>;
  /** Gets all virtual networks in a subscription. */
  listAll: (
    options?: VirtualNetworksListAllOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetwork>;
  /** Gets all virtual networks in a resource group. */
  list: (
    resourceGroupName: string,
    options?: VirtualNetworksListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetwork>;
  /** Deletes the specified virtual network. */
  delete: (
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: VirtualNetworksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: VirtualNetworksDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: VirtualNetworksDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a virtual network tags. */
  updateTags: (
    resourceGroupName: string,
    virtualNetworkName: string,
    parameters: TagsObject,
    options?: VirtualNetworksUpdateTagsOptionalParams,
  ) => Promise<VirtualNetwork>;
  /** Creates or updates a virtual network in the specified resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualNetworkName: string,
    parameters: VirtualNetwork,
    options?: VirtualNetworksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualNetwork>, VirtualNetwork>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualNetworkName: string,
    parameters: VirtualNetwork,
    options?: VirtualNetworksCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualNetwork>, VirtualNetwork>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualNetworkName: string,
    parameters: VirtualNetwork,
    options?: VirtualNetworksCreateOrUpdateOptionalParams,
  ) => Promise<VirtualNetwork>;
  /** Gets the specified virtual network by resource group. */
  get: (
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: VirtualNetworksGetOptionalParams,
  ) => Promise<VirtualNetwork>;
}

function _getVirtualNetworks(context: NetworkManagementContext) {
  return {
    moveIpConfigurations: (
      resourceGroupName: string,
      virtualNetworkName: string,
      body: MoveIpConfigurationsRequest,
      options?: VirtualNetworksMoveIpConfigurationsOptionalParams,
    ) => moveIpConfigurations(context, resourceGroupName, virtualNetworkName, body, options),
    beginMoveIpConfigurations: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      body: MoveIpConfigurationsRequest,
      options?: VirtualNetworksMoveIpConfigurationsOptionalParams,
    ) => {
      const poller = moveIpConfigurations(
        context,
        resourceGroupName,
        virtualNetworkName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMoveIpConfigurationsAndWait: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      body: MoveIpConfigurationsRequest,
      options?: VirtualNetworksMoveIpConfigurationsOptionalParams,
    ) => {
      return await moveIpConfigurations(
        context,
        resourceGroupName,
        virtualNetworkName,
        body,
        options,
      );
    },
    listDdosProtectionStatus: (
      resourceGroupName: string,
      virtualNetworkName: string,
      options?: VirtualNetworksListDdosProtectionStatusOptionalParams,
    ) => listDdosProtectionStatus(context, resourceGroupName, virtualNetworkName, options),
    beginListDdosProtectionStatusAndWait: (
      resourceGroupName: string,
      virtualNetworkName: string,
      options?: VirtualNetworksListDdosProtectionStatusOptionalParams,
    ) => {
      return listDdosProtectionStatus(context, resourceGroupName, virtualNetworkName, options);
    },
    listUsage: (
      resourceGroupName: string,
      virtualNetworkName: string,
      options?: VirtualNetworksListUsageOptionalParams,
    ) => listUsage(context, resourceGroupName, virtualNetworkName, options),
    checkIPAddressAvailability: (
      resourceGroupName: string,
      virtualNetworkName: string,
      ipAddress: string,
      options?: VirtualNetworksCheckIPAddressAvailabilityOptionalParams,
    ) =>
      checkIPAddressAvailability(
        context,
        resourceGroupName,
        virtualNetworkName,
        ipAddress,
        options,
      ),
    listAll: (options?: VirtualNetworksListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: VirtualNetworksListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      virtualNetworkName: string,
      options?: VirtualNetworksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualNetworkName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      options?: VirtualNetworksDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, virtualNetworkName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      options?: VirtualNetworksDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualNetworkName, options);
    },
    updateTags: (
      resourceGroupName: string,
      virtualNetworkName: string,
      parameters: TagsObject,
      options?: VirtualNetworksUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, virtualNetworkName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      virtualNetworkName: string,
      parameters: VirtualNetwork,
      options?: VirtualNetworksCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, virtualNetworkName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      parameters: VirtualNetwork,
      options?: VirtualNetworksCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      parameters: VirtualNetwork,
      options?: VirtualNetworksCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualNetworkName: string,
      options?: VirtualNetworksGetOptionalParams,
    ) => get(context, resourceGroupName, virtualNetworkName, options),
  };
}

export function _getVirtualNetworksOperations(
  context: NetworkManagementContext,
): VirtualNetworksOperations {
  return {
    ..._getVirtualNetworks(context),
  };
}
