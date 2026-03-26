// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
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
import type {
  TagsObject,
  PublicIpDdosProtectionStatusResult,
  VirtualNetwork,
  IPAddressAvailabilityResult,
  VirtualNetworkUsage,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualNetworks operations. */
export interface VirtualNetworksOperations {
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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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
