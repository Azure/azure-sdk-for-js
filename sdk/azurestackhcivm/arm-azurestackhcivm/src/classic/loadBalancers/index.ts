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
} from "../../api/loadBalancers/operations.js";
import type {
  LoadBalancersListAllOptionalParams,
  LoadBalancersListByResourceGroupOptionalParams,
  LoadBalancersDeleteOptionalParams,
  LoadBalancersUpdateTagsOptionalParams,
  LoadBalancersCreateOrUpdateOptionalParams,
  LoadBalancersGetOptionalParams,
} from "../../api/loadBalancers/options.js";
import type { LoadBalancer, LoadBalancerTagsUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LoadBalancers operations. */
export interface LoadBalancersOperations {
  /** Lists all of the loadBalancers in the specified subscription. Use the nextLink property in the response to get the next page of LoadBalancer. */
  listAll: (
    options?: LoadBalancersListAllOptionalParams,
  ) => PagedAsyncIterableIterator<LoadBalancer>;
  /** Lists all of the loadBalancers in the specified resource group. Use the nextLink property in the response to get the next page of LoadBalancer. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: LoadBalancersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<LoadBalancer>;
  /** The operation to delete a loadBalancer. */
  delete: (
    resourceGroupName: string,
    loadBalancerName: string,
    options?: LoadBalancersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a loadBalancer tags. */
  updateTags: (
    resourceGroupName: string,
    loadBalancerName: string,
    properties: LoadBalancerTagsUpdate,
    options?: LoadBalancersUpdateTagsOptionalParams,
  ) => PollerLike<OperationState<LoadBalancer>, LoadBalancer>;
  /** The operation to create or update a loadBalancer. Please note some properties can be set only during LoadBalancer creation. */
  createOrUpdate: (
    resourceGroupName: string,
    loadBalancerName: string,
    resource: LoadBalancer,
    options?: LoadBalancersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<LoadBalancer>, LoadBalancer>;
  /** The operation to get a loadBalancer. */
  get: (
    resourceGroupName: string,
    loadBalancerName: string,
    options?: LoadBalancersGetOptionalParams,
  ) => Promise<LoadBalancer>;
}

function _getLoadBalancers(context: AzureStackHCIVMManagementContext) {
  return {
    listAll: (options?: LoadBalancersListAllOptionalParams) => listAll(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: LoadBalancersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      loadBalancerName: string,
      options?: LoadBalancersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, loadBalancerName, options),
    updateTags: (
      resourceGroupName: string,
      loadBalancerName: string,
      properties: LoadBalancerTagsUpdate,
      options?: LoadBalancersUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, loadBalancerName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      loadBalancerName: string,
      resource: LoadBalancer,
      options?: LoadBalancersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, loadBalancerName, resource, options),
    get: (
      resourceGroupName: string,
      loadBalancerName: string,
      options?: LoadBalancersGetOptionalParams,
    ) => get(context, resourceGroupName, loadBalancerName, options),
  };
}

export function _getLoadBalancersOperations(
  context: AzureStackHCIVMManagementContext,
): LoadBalancersOperations {
  return {
    ..._getLoadBalancers(context),
  };
}
