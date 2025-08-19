// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementContext } from "../../api/azureStackHcivmManagementContext.js";
import {
  listAll,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/networkSecurityGroups/operations.js";
import {
  NetworkSecurityGroupsListAllOptionalParams,
  NetworkSecurityGroupsListByResourceGroupOptionalParams,
  NetworkSecurityGroupsDeleteOptionalParams,
  NetworkSecurityGroupsUpdateTagsOptionalParams,
  NetworkSecurityGroupsCreateOrUpdateOptionalParams,
  NetworkSecurityGroupsGetOptionalParams,
} from "../../api/networkSecurityGroups/options.js";
import { NetworkSecurityGroup, NetworkSecurityGroupTagsUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkSecurityGroups operations. */
export interface NetworkSecurityGroupsOperations {
  /** Gets all network security groups in a subscription. */
  listAll: (
    options?: NetworkSecurityGroupsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityGroup>;
  /** Gets all network security groups in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NetworkSecurityGroupsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityGroup>;
  /** Deletes the specified network security group. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    options?: NetworkSecurityGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a network security group tags. */
  updateTags: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    properties: NetworkSecurityGroupTagsUpdate,
    options?: NetworkSecurityGroupsUpdateTagsOptionalParams,
  ) => PollerLike<OperationState<NetworkSecurityGroup>, NetworkSecurityGroup>;
  /** Creates or updates a network security group in the specified resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    resource: NetworkSecurityGroup,
    options?: NetworkSecurityGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkSecurityGroup>, NetworkSecurityGroup>;
  /** Gets the specified network security group. */
  get: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    options?: NetworkSecurityGroupsGetOptionalParams,
  ) => Promise<NetworkSecurityGroup>;
}

function _getNetworkSecurityGroups(context: AzureStackHCIVMManagementContext) {
  return {
    listAll: (options?: NetworkSecurityGroupsListAllOptionalParams) => listAll(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NetworkSecurityGroupsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      options?: NetworkSecurityGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkSecurityGroupName, options),
    updateTags: (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      properties: NetworkSecurityGroupTagsUpdate,
      options?: NetworkSecurityGroupsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, networkSecurityGroupName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      resource: NetworkSecurityGroup,
      options?: NetworkSecurityGroupsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, networkSecurityGroupName, resource, options),
    get: (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      options?: NetworkSecurityGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, networkSecurityGroupName, options),
  };
}

export function _getNetworkSecurityGroupsOperations(
  context: AzureStackHCIVMManagementContext,
): NetworkSecurityGroupsOperations {
  return {
    ..._getNetworkSecurityGroups(context),
  };
}
