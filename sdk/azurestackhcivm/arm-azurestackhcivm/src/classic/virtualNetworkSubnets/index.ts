// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIVMManagementContext } from "../../api/azureStackHcivmManagementContext.js";
import {
  listByVirtualNetwork,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/virtualNetworkSubnets/operations.js";
import type {
  VirtualNetworkSubnetsListByVirtualNetworkOptionalParams,
  VirtualNetworkSubnetsDeleteOptionalParams,
  VirtualNetworkSubnetsUpdateOptionalParams,
  VirtualNetworkSubnetsCreateOrUpdateOptionalParams,
  VirtualNetworkSubnetsGetOptionalParams,
} from "../../api/virtualNetworkSubnets/options.js";
import type {
  VirtualNetworkSubnet,
  VirtualNetworkSubnetUpdateRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualNetworkSubnets operations. */
export interface VirtualNetworkSubnetsOperations {
  /** Lists all of the virtual network subnets in a  virtual network. */
  listByVirtualNetwork: (
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: VirtualNetworkSubnetsListByVirtualNetworkOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetworkSubnet>;
  /** The operation to delete a virtual network. */
  delete: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    options?: VirtualNetworkSubnetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to update a virtual network subnet. */
  update: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    properties: VirtualNetworkSubnetUpdateRequest,
    options?: VirtualNetworkSubnetsUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkSubnet>, VirtualNetworkSubnet>;
  /** The operation to create or update a virtual network subnet. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    resource: VirtualNetworkSubnet,
    options?: VirtualNetworkSubnetsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkSubnet>, VirtualNetworkSubnet>;
  /** The operation to get a virtual network subnet. */
  get: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    options?: VirtualNetworkSubnetsGetOptionalParams,
  ) => Promise<VirtualNetworkSubnet>;
}

function _getVirtualNetworkSubnets(context: AzureStackHCIVMManagementContext) {
  return {
    listByVirtualNetwork: (
      resourceGroupName: string,
      virtualNetworkName: string,
      options?: VirtualNetworkSubnetsListByVirtualNetworkOptionalParams,
    ) => listByVirtualNetwork(context, resourceGroupName, virtualNetworkName, options),
    delete: (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      options?: VirtualNetworkSubnetsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualNetworkName, subnetName, options),
    update: (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      properties: VirtualNetworkSubnetUpdateRequest,
      options?: VirtualNetworkSubnetsUpdateOptionalParams,
    ) => update(context, resourceGroupName, virtualNetworkName, subnetName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      resource: VirtualNetworkSubnet,
      options?: VirtualNetworkSubnetsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, virtualNetworkName, subnetName, resource, options),
    get: (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      options?: VirtualNetworkSubnetsGetOptionalParams,
    ) => get(context, resourceGroupName, virtualNetworkName, subnetName, options),
  };
}

export function _getVirtualNetworkSubnetsOperations(
  context: AzureStackHCIVMManagementContext,
): VirtualNetworkSubnetsOperations {
  return {
    ..._getVirtualNetworkSubnets(context),
  };
}
