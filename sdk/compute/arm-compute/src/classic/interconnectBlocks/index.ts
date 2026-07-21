// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/interconnectBlocks/operations.js";
import type {
  InterconnectBlocksListBySubscriptionOptionalParams,
  InterconnectBlocksListByResourceGroupOptionalParams,
  InterconnectBlocksDeleteOptionalParams,
  InterconnectBlocksUpdateOptionalParams,
  InterconnectBlocksCreateOrUpdateOptionalParams,
  InterconnectBlocksGetOptionalParams,
} from "../../api/interconnectBlocks/options.js";
import type { InterconnectBlock, InterconnectBlockUpdate } from "../../models/compute/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a InterconnectBlocks operations. */
export interface InterconnectBlocksOperations {
  /** Lists all of the Interconnect Blocks in the subscription. Use the nextLink property in the response to get the next page of Interconnect Blocks. */
  listBySubscription: (
    options?: InterconnectBlocksListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<InterconnectBlock>;
  /** Lists all of the Interconnect Blocks in the specified resource group. Use the nextLink property in the response to get the next page of Interconnect Blocks. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: InterconnectBlocksListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<InterconnectBlock>;
  /** Deletes an Interconnect Block. The operation is only allowed when there are no virtual machines or VMSS VM instances associated with the Interconnect Block. */
  delete: (
    resourceGroupName: string,
    interconnectBlockName: string,
    options?: InterconnectBlocksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    interconnectBlockName: string,
    options?: InterconnectBlocksDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    interconnectBlockName: string,
    options?: InterconnectBlocksDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an Interconnect Block. When updating an Interconnect Block, only tags and sku.capacity may be modified. */
  update: (
    resourceGroupName: string,
    interconnectBlockName: string,
    properties: InterconnectBlockUpdate,
    options?: InterconnectBlocksUpdateOptionalParams,
  ) => PollerLike<OperationState<InterconnectBlock>, InterconnectBlock>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    interconnectBlockName: string,
    properties: InterconnectBlockUpdate,
    options?: InterconnectBlocksUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InterconnectBlock>, InterconnectBlock>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    interconnectBlockName: string,
    properties: InterconnectBlockUpdate,
    options?: InterconnectBlocksUpdateOptionalParams,
  ) => Promise<InterconnectBlock>;
  /** Creates or updates an Interconnect Block. When updating an Interconnect Block, only tags and sku.capacity may be modified. */
  createOrUpdate: (
    resourceGroupName: string,
    interconnectBlockName: string,
    resource: InterconnectBlock,
    options?: InterconnectBlocksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<InterconnectBlock>, InterconnectBlock>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    interconnectBlockName: string,
    resource: InterconnectBlock,
    options?: InterconnectBlocksCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InterconnectBlock>, InterconnectBlock>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    interconnectBlockName: string,
    resource: InterconnectBlock,
    options?: InterconnectBlocksCreateOrUpdateOptionalParams,
  ) => Promise<InterconnectBlock>;
  /** Retrieves information about an Interconnect Block. */
  get: (
    resourceGroupName: string,
    interconnectBlockName: string,
    options?: InterconnectBlocksGetOptionalParams,
  ) => Promise<InterconnectBlock>;
}

function _getInterconnectBlocks(context: ComputeManagementContext) {
  return {
    listBySubscription: (options?: InterconnectBlocksListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: InterconnectBlocksListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      interconnectBlockName: string,
      options?: InterconnectBlocksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, interconnectBlockName, options),
    beginDelete: async (
      resourceGroupName: string,
      interconnectBlockName: string,
      options?: InterconnectBlocksDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, interconnectBlockName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      interconnectBlockName: string,
      options?: InterconnectBlocksDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, interconnectBlockName, options);
    },
    update: (
      resourceGroupName: string,
      interconnectBlockName: string,
      properties: InterconnectBlockUpdate,
      options?: InterconnectBlocksUpdateOptionalParams,
    ) => update(context, resourceGroupName, interconnectBlockName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      interconnectBlockName: string,
      properties: InterconnectBlockUpdate,
      options?: InterconnectBlocksUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, interconnectBlockName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      interconnectBlockName: string,
      properties: InterconnectBlockUpdate,
      options?: InterconnectBlocksUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, interconnectBlockName, properties, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      interconnectBlockName: string,
      resource: InterconnectBlock,
      options?: InterconnectBlocksCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, interconnectBlockName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      interconnectBlockName: string,
      resource: InterconnectBlock,
      options?: InterconnectBlocksCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        interconnectBlockName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      interconnectBlockName: string,
      resource: InterconnectBlock,
      options?: InterconnectBlocksCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        interconnectBlockName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      interconnectBlockName: string,
      options?: InterconnectBlocksGetOptionalParams,
    ) => get(context, resourceGroupName, interconnectBlockName, options),
  };
}

export function _getInterconnectBlocksOperations(
  context: ComputeManagementContext,
): InterconnectBlocksOperations {
  return {
    ..._getInterconnectBlocks(context),
  };
}
