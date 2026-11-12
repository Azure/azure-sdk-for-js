// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIVMManagementContext } from "../../api/azureStackHcivmManagementContext.js";
import {
  listAll,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/virtualNetworks/operations.js";
import type {
  VirtualNetworksListAllOptionalParams,
  VirtualNetworksListByResourceGroupOptionalParams,
  VirtualNetworksDeleteOptionalParams,
  VirtualNetworksUpdateTagsOptionalParams,
  VirtualNetworksCreateOrUpdateOptionalParams,
  VirtualNetworksGetOptionalParams,
} from "../../api/virtualNetworks/options.js";
import type { VirtualNetwork, VirtualNetworkTagsUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualNetworks operations. */
export interface VirtualNetworksOperations {
  /** Lists all of the virtual networks in the specified subscription. Use the nextLink property in the response to get the next page of virtualNetwork networks. */
  listAll: (
    options?: VirtualNetworksListAllOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetwork>;
  /** Lists all of the virtual networks in the specified resource group. Use the nextLink property in the response to get the next page of virtualNetwork networks. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: VirtualNetworksListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetwork>;
  /** The operation to delete a virtual network. */
  delete: (
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: VirtualNetworksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a virtual network tags. */
  updateTags: (
    resourceGroupName: string,
    virtualNetworkName: string,
    properties: VirtualNetworkTagsUpdate,
    options?: VirtualNetworksUpdateTagsOptionalParams,
  ) => PollerLike<OperationState<VirtualNetwork>, VirtualNetwork>;
  /** The operation to create or update a virtual network. Please note some properties can be set only during virtualNetwork network creation. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualNetworkName: string,
    resource: VirtualNetwork,
    options?: VirtualNetworksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualNetwork>, VirtualNetwork>;
  /** The operation to get a virtual network. */
  get: (
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: VirtualNetworksGetOptionalParams,
  ) => Promise<VirtualNetwork>;
}

function _getVirtualNetworks(context: AzureStackHCIVMManagementContext) {
  return {
    listAll: (options?: VirtualNetworksListAllOptionalParams) => listAll(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: VirtualNetworksListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      virtualNetworkName: string,
      options?: VirtualNetworksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualNetworkName, options),
    updateTags: (
      resourceGroupName: string,
      virtualNetworkName: string,
      properties: VirtualNetworkTagsUpdate,
      options?: VirtualNetworksUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, virtualNetworkName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      virtualNetworkName: string,
      resource: VirtualNetwork,
      options?: VirtualNetworksCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, virtualNetworkName, resource, options),
    get: (
      resourceGroupName: string,
      virtualNetworkName: string,
      options?: VirtualNetworksGetOptionalParams,
    ) => get(context, resourceGroupName, virtualNetworkName, options),
  };
}

export function _getVirtualNetworksOperations(
  context: AzureStackHCIVMManagementContext,
): VirtualNetworksOperations {
  return {
    ..._getVirtualNetworks(context),
  };
}
