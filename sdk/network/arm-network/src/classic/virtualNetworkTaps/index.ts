// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listAll,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/virtualNetworkTaps/operations.js";
import type {
  VirtualNetworkTapsListAllOptionalParams,
  VirtualNetworkTapsListByResourceGroupOptionalParams,
  VirtualNetworkTapsDeleteOptionalParams,
  VirtualNetworkTapsUpdateTagsOptionalParams,
  VirtualNetworkTapsCreateOrUpdateOptionalParams,
  VirtualNetworkTapsGetOptionalParams,
} from "../../api/virtualNetworkTaps/options.js";
import type { VirtualNetworkTap, TagsObject } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualNetworkTaps operations. */
export interface VirtualNetworkTapsOperations {
  /** Gets all the VirtualNetworkTaps in a subscription. */
  listAll: (
    options?: VirtualNetworkTapsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetworkTap>;
  /** Gets all the VirtualNetworkTaps in a subscription. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: VirtualNetworkTapsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetworkTap>;
  /** Delete a VirtualNetworkTap */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    tapName: string,
    options?: VirtualNetworkTapsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    tapName: string,
    options?: VirtualNetworkTapsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    tapName: string,
    options?: VirtualNetworkTapsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a VirtualNetworkTap */
  updateTags: (
    resourceGroupName: string,
    tapName: string,
    tapParameters: TagsObject,
    options?: VirtualNetworkTapsUpdateTagsOptionalParams,
  ) => Promise<VirtualNetworkTap>;
  /** Create a VirtualNetworkTap */
  createOrUpdate: (
    resourceGroupName: string,
    tapName: string,
    parameters: VirtualNetworkTap,
    options?: VirtualNetworkTapsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkTap>, VirtualNetworkTap>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    tapName: string,
    parameters: VirtualNetworkTap,
    options?: VirtualNetworkTapsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualNetworkTap>, VirtualNetworkTap>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    tapName: string,
    parameters: VirtualNetworkTap,
    options?: VirtualNetworkTapsCreateOrUpdateOptionalParams,
  ) => Promise<VirtualNetworkTap>;
  /** Get a VirtualNetworkTap */
  get: (
    resourceGroupName: string,
    tapName: string,
    options?: VirtualNetworkTapsGetOptionalParams,
  ) => Promise<VirtualNetworkTap>;
}

function _getVirtualNetworkTaps(context: NetworkManagementContext) {
  return {
    listAll: (options?: VirtualNetworkTapsListAllOptionalParams) => listAll(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: VirtualNetworkTapsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      tapName: string,
      options?: VirtualNetworkTapsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, tapName, options),
    beginDelete: async (
      resourceGroupName: string,
      tapName: string,
      options?: VirtualNetworkTapsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, tapName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      tapName: string,
      options?: VirtualNetworkTapsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, tapName, options);
    },
    updateTags: (
      resourceGroupName: string,
      tapName: string,
      tapParameters: TagsObject,
      options?: VirtualNetworkTapsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, tapName, tapParameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      tapName: string,
      parameters: VirtualNetworkTap,
      options?: VirtualNetworkTapsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, tapName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      tapName: string,
      parameters: VirtualNetworkTap,
      options?: VirtualNetworkTapsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, tapName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      tapName: string,
      parameters: VirtualNetworkTap,
      options?: VirtualNetworkTapsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, tapName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      tapName: string,
      options?: VirtualNetworkTapsGetOptionalParams,
    ) => get(context, resourceGroupName, tapName, options),
  };
}

export function _getVirtualNetworkTapsOperations(
  context: NetworkManagementContext,
): VirtualNetworkTapsOperations {
  return {
    ..._getVirtualNetworkTaps(context),
  };
}
