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
} from "../../api/natGateways/operations.js";
import type {
  NatGatewaysListAllOptionalParams,
  NatGatewaysListByResourceGroupOptionalParams,
  NatGatewaysDeleteOptionalParams,
  NatGatewaysUpdateTagsOptionalParams,
  NatGatewaysCreateOrUpdateOptionalParams,
  NatGatewaysGetOptionalParams,
} from "../../api/natGateways/options.js";
import type { NatGateway, NatGatewayTagsUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NatGateways operations. */
export interface NatGatewaysOperations {
  /** Lists all of the natGateways in the specified subscription. Use the nextLink property in the response to get the next page of NatGateway. */
  listAll: (options?: NatGatewaysListAllOptionalParams) => PagedAsyncIterableIterator<NatGateway>;
  /** Lists all of the natGateways in the specified resource group. Use the nextLink property in the response to get the next page of NatGateway. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NatGatewaysListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NatGateway>;
  /** The operation to delete a natGateway. */
  delete: (
    resourceGroupName: string,
    natGatewayName: string,
    options?: NatGatewaysDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a natGateway tags. */
  updateTags: (
    resourceGroupName: string,
    natGatewayName: string,
    properties: NatGatewayTagsUpdate,
    options?: NatGatewaysUpdateTagsOptionalParams,
  ) => PollerLike<OperationState<NatGateway>, NatGateway>;
  /** The operation to create or update a natGateway. Please note some properties can be set only during NatGateway creation. */
  createOrUpdate: (
    resourceGroupName: string,
    natGatewayName: string,
    resource: NatGateway,
    options?: NatGatewaysCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NatGateway>, NatGateway>;
  /** The operation to get a natGateway. */
  get: (
    resourceGroupName: string,
    natGatewayName: string,
    options?: NatGatewaysGetOptionalParams,
  ) => Promise<NatGateway>;
}

function _getNatGateways(context: AzureStackHCIVMManagementContext) {
  return {
    listAll: (options?: NatGatewaysListAllOptionalParams) => listAll(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NatGatewaysListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      natGatewayName: string,
      options?: NatGatewaysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, natGatewayName, options),
    updateTags: (
      resourceGroupName: string,
      natGatewayName: string,
      properties: NatGatewayTagsUpdate,
      options?: NatGatewaysUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, natGatewayName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      natGatewayName: string,
      resource: NatGateway,
      options?: NatGatewaysCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, natGatewayName, resource, options),
    get: (
      resourceGroupName: string,
      natGatewayName: string,
      options?: NatGatewaysGetOptionalParams,
    ) => get(context, resourceGroupName, natGatewayName, options),
  };
}

export function _getNatGatewaysOperations(
  context: AzureStackHCIVMManagementContext,
): NatGatewaysOperations {
  return {
    ..._getNatGateways(context),
  };
}
