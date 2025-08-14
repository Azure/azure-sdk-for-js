// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementContext } from "../../api/azureStackHcivmManagementContext.js";
import {
  listAll,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/logicalNetworks/operations.js";
import {
  LogicalNetworksListAllOptionalParams,
  LogicalNetworksListByResourceGroupOptionalParams,
  LogicalNetworksDeleteOptionalParams,
  LogicalNetworksUpdateOptionalParams,
  LogicalNetworksCreateOrUpdateOptionalParams,
  LogicalNetworksGetOptionalParams,
} from "../../api/logicalNetworks/options.js";
import { LogicalNetwork, LogicalNetworksUpdateRequest } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LogicalNetworks operations. */
export interface LogicalNetworksOperations {
  /** Lists all of the logical networks in the specified subscription. Use the nextLink property in the response to get the next page of logical networks. */
  listAll: (
    options?: LogicalNetworksListAllOptionalParams,
  ) => PagedAsyncIterableIterator<LogicalNetwork>;
  /** Lists all of the logical networks in the specified resource group. Use the nextLink property in the response to get the next page of logical networks. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: LogicalNetworksListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<LogicalNetwork>;
  /** The operation to delete a logical network. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    logicalNetworkName: string,
    options?: LogicalNetworksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to update a logical network. */
  update: (
    resourceGroupName: string,
    logicalNetworkName: string,
    properties: LogicalNetworksUpdateRequest,
    options?: LogicalNetworksUpdateOptionalParams,
  ) => PollerLike<OperationState<LogicalNetwork>, LogicalNetwork>;
  /** The operation to create or update a logical network. Please note some properties can be set only during logical network creation. */
  createOrUpdate: (
    resourceGroupName: string,
    logicalNetworkName: string,
    resource: LogicalNetwork,
    options?: LogicalNetworksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<LogicalNetwork>, LogicalNetwork>;
  /** The operation to get a logical network. */
  get: (
    resourceGroupName: string,
    logicalNetworkName: string,
    options?: LogicalNetworksGetOptionalParams,
  ) => Promise<LogicalNetwork>;
}

function _getLogicalNetworks(context: AzureStackHCIVMManagementContext) {
  return {
    listAll: (options?: LogicalNetworksListAllOptionalParams) => listAll(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: LogicalNetworksListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      logicalNetworkName: string,
      options?: LogicalNetworksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, logicalNetworkName, options),
    update: (
      resourceGroupName: string,
      logicalNetworkName: string,
      properties: LogicalNetworksUpdateRequest,
      options?: LogicalNetworksUpdateOptionalParams,
    ) => update(context, resourceGroupName, logicalNetworkName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      logicalNetworkName: string,
      resource: LogicalNetwork,
      options?: LogicalNetworksCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, logicalNetworkName, resource, options),
    get: (
      resourceGroupName: string,
      logicalNetworkName: string,
      options?: LogicalNetworksGetOptionalParams,
    ) => get(context, resourceGroupName, logicalNetworkName, options),
  };
}

export function _getLogicalNetworksOperations(
  context: AzureStackHCIVMManagementContext,
): LogicalNetworksOperations {
  return {
    ..._getLogicalNetworks(context),
  };
}
