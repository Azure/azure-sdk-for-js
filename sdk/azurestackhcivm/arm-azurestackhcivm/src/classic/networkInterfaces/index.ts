// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  listAll,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/networkInterfaces/operations.js";
import {
  NetworkInterfacesListAllOptionalParams,
  NetworkInterfacesListByResourceGroupOptionalParams,
  NetworkInterfacesDeleteOptionalParams,
  NetworkInterfacesUpdateOptionalParams,
  NetworkInterfacesCreateOrUpdateOptionalParams,
  NetworkInterfacesGetOptionalParams,
} from "../../api/networkInterfaces/options.js";
import { NetworkInterface, NetworkInterfacesUpdateRequest } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkInterfaces operations. */
export interface NetworkInterfacesOperations {
  /** Lists all of the network interfaces in the specified subscription. Use the nextLink property in the response to get the next page of network interfaces. */
  listAll: (
    options?: NetworkInterfacesListAllOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkInterface>;
  /** Lists all of the network interfaces in the specified resource group. Use the nextLink property in the response to get the next page of network interfaces. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NetworkInterfacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkInterface>;
  /** The operation to delete a network interface. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to update a network interface. */
  update: (
    resourceGroupName: string,
    networkInterfaceName: string,
    properties: NetworkInterfacesUpdateRequest,
    options?: NetworkInterfacesUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkInterface>, NetworkInterface>;
  /** The operation to create or update a network interface. Please note some properties can be set only during network interface creation. */
  createOrUpdate: (
    resourceGroupName: string,
    networkInterfaceName: string,
    resource: NetworkInterface,
    options?: NetworkInterfacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkInterface>, NetworkInterface>;
  /** Gets a network interface */
  get: (
    resourceGroupName: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesGetOptionalParams,
  ) => Promise<NetworkInterface>;
}

function _getNetworkInterfaces(context: AzureStackHCIContext) {
  return {
    listAll: (options?: NetworkInterfacesListAllOptionalParams) => listAll(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NetworkInterfacesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkInterfaceName, options),
    update: (
      resourceGroupName: string,
      networkInterfaceName: string,
      properties: NetworkInterfacesUpdateRequest,
      options?: NetworkInterfacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkInterfaceName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      networkInterfaceName: string,
      resource: NetworkInterface,
      options?: NetworkInterfacesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, networkInterfaceName, resource, options),
    get: (
      resourceGroupName: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesGetOptionalParams,
    ) => get(context, resourceGroupName, networkInterfaceName, options),
  };
}

export function _getNetworkInterfacesOperations(
  context: AzureStackHCIContext,
): NetworkInterfacesOperations {
  return {
    ..._getNetworkInterfaces(context),
  };
}
