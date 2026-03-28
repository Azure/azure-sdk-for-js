// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/virtualWans/operations.js";
import type {
  VirtualWansListOptionalParams,
  VirtualWansListByResourceGroupOptionalParams,
  VirtualWansDeleteOptionalParams,
  VirtualWansUpdateTagsOptionalParams,
  VirtualWansCreateOrUpdateOptionalParams,
  VirtualWansGetOptionalParams,
} from "../../api/virtualWans/options.js";
import type { TagsObject, VirtualWAN } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualWans operations. */
export interface VirtualWansOperations {
  /** Lists all the VirtualWANs in a subscription. */
  list: (options?: VirtualWansListOptionalParams) => PagedAsyncIterableIterator<VirtualWAN>;
  /** Lists all the VirtualWANs in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: VirtualWansListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualWAN>;
  /** Deletes a VirtualWAN. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualWANName: string,
    options?: VirtualWansDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualWANName: string,
    options?: VirtualWansDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualWANName: string,
    options?: VirtualWansDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a VirtualWAN tags. */
  updateTags: (
    resourceGroupName: string,
    virtualWANName: string,
    wanParameters: TagsObject,
    options?: VirtualWansUpdateTagsOptionalParams,
  ) => Promise<VirtualWAN>;
  /** Creates a VirtualWAN resource if it doesn't exist else updates the existing VirtualWAN. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualWANName: string,
    wanParameters: VirtualWAN,
    options?: VirtualWansCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualWAN>, VirtualWAN>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualWANName: string,
    wanParameters: VirtualWAN,
    options?: VirtualWansCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualWAN>, VirtualWAN>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualWANName: string,
    wanParameters: VirtualWAN,
    options?: VirtualWansCreateOrUpdateOptionalParams,
  ) => Promise<VirtualWAN>;
  /** Retrieves the details of a VirtualWAN. */
  get: (
    resourceGroupName: string,
    virtualWANName: string,
    options?: VirtualWansGetOptionalParams,
  ) => Promise<VirtualWAN>;
}

function _getVirtualWans(context: NetworkManagementContext) {
  return {
    list: (options?: VirtualWansListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: VirtualWansListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      virtualWANName: string,
      options?: VirtualWansDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualWANName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualWANName: string,
      options?: VirtualWansDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, virtualWANName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualWANName: string,
      options?: VirtualWansDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualWANName, options);
    },
    updateTags: (
      resourceGroupName: string,
      virtualWANName: string,
      wanParameters: TagsObject,
      options?: VirtualWansUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, virtualWANName, wanParameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      virtualWANName: string,
      wanParameters: VirtualWAN,
      options?: VirtualWansCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, virtualWANName, wanParameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualWANName: string,
      wanParameters: VirtualWAN,
      options?: VirtualWansCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualWANName,
        wanParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualWANName: string,
      wanParameters: VirtualWAN,
      options?: VirtualWansCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualWANName,
        wanParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualWANName: string,
      options?: VirtualWansGetOptionalParams,
    ) => get(context, resourceGroupName, virtualWANName, options),
  };
}

export function _getVirtualWansOperations(
  context: NetworkManagementContext,
): VirtualWansOperations {
  return {
    ..._getVirtualWans(context),
  };
}
