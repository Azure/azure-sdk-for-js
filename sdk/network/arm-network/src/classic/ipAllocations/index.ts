// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/ipAllocations/operations.js";
import {
  IpAllocationsListOptionalParams,
  IpAllocationsListByResourceGroupOptionalParams,
  IpAllocationsDeleteOptionalParams,
  IpAllocationsUpdateTagsOptionalParams,
  IpAllocationsCreateOrUpdateOptionalParams,
  IpAllocationsGetOptionalParams,
} from "../../api/ipAllocations/options.js";
import { TagsObject, IpAllocation } from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IpAllocations operations. */
export interface IpAllocationsOperations {
  /** Gets all IpAllocations in a subscription. */
  list: (options?: IpAllocationsListOptionalParams) => PagedAsyncIterableIterator<IpAllocation>;
  /** Gets all IpAllocations in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: IpAllocationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<IpAllocation>;
  /** Deletes the specified IpAllocation. */
  delete: (
    resourceGroupName: string,
    ipAllocationName: string,
    options?: IpAllocationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    ipAllocationName: string,
    options?: IpAllocationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    ipAllocationName: string,
    options?: IpAllocationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a IpAllocation tags. */
  updateTags: (
    resourceGroupName: string,
    ipAllocationName: string,
    parameters: TagsObject,
    options?: IpAllocationsUpdateTagsOptionalParams,
  ) => Promise<IpAllocation>;
  /** Creates or updates an IpAllocation in the specified resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    ipAllocationName: string,
    parameters: IpAllocation,
    options?: IpAllocationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<IpAllocation>, IpAllocation>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    ipAllocationName: string,
    parameters: IpAllocation,
    options?: IpAllocationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<IpAllocation>, IpAllocation>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    ipAllocationName: string,
    parameters: IpAllocation,
    options?: IpAllocationsCreateOrUpdateOptionalParams,
  ) => Promise<IpAllocation>;
  /** Gets the specified IpAllocation by resource group. */
  get: (
    resourceGroupName: string,
    ipAllocationName: string,
    options?: IpAllocationsGetOptionalParams,
  ) => Promise<IpAllocation>;
}

function _getIpAllocations(context: NetworkManagementContext) {
  return {
    list: (options?: IpAllocationsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: IpAllocationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      ipAllocationName: string,
      options?: IpAllocationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, ipAllocationName, options),
    beginDelete: async (
      resourceGroupName: string,
      ipAllocationName: string,
      options?: IpAllocationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, ipAllocationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      ipAllocationName: string,
      options?: IpAllocationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, ipAllocationName, options);
    },
    updateTags: (
      resourceGroupName: string,
      ipAllocationName: string,
      parameters: TagsObject,
      options?: IpAllocationsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, ipAllocationName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      ipAllocationName: string,
      parameters: IpAllocation,
      options?: IpAllocationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, ipAllocationName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      ipAllocationName: string,
      parameters: IpAllocation,
      options?: IpAllocationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        ipAllocationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      ipAllocationName: string,
      parameters: IpAllocation,
      options?: IpAllocationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        ipAllocationName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      ipAllocationName: string,
      options?: IpAllocationsGetOptionalParams,
    ) => get(context, resourceGroupName, ipAllocationName, options),
  };
}

export function _getIpAllocationsOperations(
  context: NetworkManagementContext,
): IpAllocationsOperations {
  return {
    ..._getIpAllocations(context),
  };
}
