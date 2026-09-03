// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  listByResourceGroup,
  list,
  listBySiteSlot,
  getBySiteSlot,
  listBySite,
  getBySite,
} from "../../api/resourceHealthMetadata/operations.js";
import type {
  ResourceHealthMetadataListByResourceGroupOptionalParams,
  ResourceHealthMetadataListOptionalParams,
  ResourceHealthMetadataListBySiteSlotOptionalParams,
  ResourceHealthMetadataGetBySiteSlotOptionalParams,
  ResourceHealthMetadataListBySiteOptionalParams,
  ResourceHealthMetadataGetBySiteOptionalParams,
} from "../../api/resourceHealthMetadata/options.js";
import type { ResourceHealthMetadata } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ResourceHealthMetadata operations. */
export interface ResourceHealthMetadataOperations {
  /** Description for List all ResourceHealthMetadata for all sites in the resource group in the subscription. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ResourceHealthMetadataListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceHealthMetadata>;
  /** Description for List all ResourceHealthMetadata for all sites in the subscription. */
  list: (
    options?: ResourceHealthMetadataListOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceHealthMetadata>;
  /** Description for Gets the category of ResourceHealthMetadata to use for the given site as a collection */
  listBySiteSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: ResourceHealthMetadataListBySiteSlotOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceHealthMetadata>;
  /** Description for Gets the category of ResourceHealthMetadata to use for the given site */
  getBySiteSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: ResourceHealthMetadataGetBySiteSlotOptionalParams,
  ) => Promise<ResourceHealthMetadata>;
  /** Description for Gets the category of ResourceHealthMetadata to use for the given site as a collection */
  listBySite: (
    resourceGroupName: string,
    name: string,
    options?: ResourceHealthMetadataListBySiteOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceHealthMetadata>;
  /** Description for Gets the category of ResourceHealthMetadata to use for the given site */
  getBySite: (
    resourceGroupName: string,
    name: string,
    options?: ResourceHealthMetadataGetBySiteOptionalParams,
  ) => Promise<ResourceHealthMetadata>;
}

function _getResourceHealthMetadata(context: WebSiteManagementContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ResourceHealthMetadataListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    list: (options?: ResourceHealthMetadataListOptionalParams) => list(context, options),
    listBySiteSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: ResourceHealthMetadataListBySiteSlotOptionalParams,
    ) => listBySiteSlot(context, resourceGroupName, name, slot, options),
    getBySiteSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: ResourceHealthMetadataGetBySiteSlotOptionalParams,
    ) => getBySiteSlot(context, resourceGroupName, name, slot, options),
    listBySite: (
      resourceGroupName: string,
      name: string,
      options?: ResourceHealthMetadataListBySiteOptionalParams,
    ) => listBySite(context, resourceGroupName, name, options),
    getBySite: (
      resourceGroupName: string,
      name: string,
      options?: ResourceHealthMetadataGetBySiteOptionalParams,
    ) => getBySite(context, resourceGroupName, name, options),
  };
}

export function _getResourceHealthMetadataOperations(
  context: WebSiteManagementContext,
): ResourceHealthMetadataOperations {
  return {
    ..._getResourceHealthMetadata(context),
  };
}
