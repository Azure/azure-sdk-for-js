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
} from "../../api/marketplaceGalleryImages/operations.js";
import {
  MarketplaceGalleryImagesListAllOptionalParams,
  MarketplaceGalleryImagesListByResourceGroupOptionalParams,
  MarketplaceGalleryImagesDeleteOptionalParams,
  MarketplaceGalleryImagesUpdateOptionalParams,
  MarketplaceGalleryImagesCreateOrUpdateOptionalParams,
  MarketplaceGalleryImagesGetOptionalParams,
} from "../../api/marketplaceGalleryImages/options.js";
import { MarketplaceGalleryImage, MarketplaceGalleryImageTagsUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MarketplaceGalleryImages operations. */
export interface MarketplaceGalleryImagesOperations {
  /** Lists all of the marketplace gallery images in the specified subscription. Use the nextLink property in the response to get the next page of marketplace gallery images. */
  listAll: (
    options?: MarketplaceGalleryImagesListAllOptionalParams,
  ) => PagedAsyncIterableIterator<MarketplaceGalleryImage>;
  /** Lists all of the marketplace gallery images in the specified resource group. Use the nextLink property in the response to get the next page of marketplace gallery images. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: MarketplaceGalleryImagesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<MarketplaceGalleryImage>;
  /** The operation to delete a marketplace gallery image. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    marketplaceGalleryImageName: string,
    options?: MarketplaceGalleryImagesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to update a marketplace gallery image. */
  update: (
    resourceGroupName: string,
    marketplaceGalleryImageName: string,
    properties: MarketplaceGalleryImageTagsUpdate,
    options?: MarketplaceGalleryImagesUpdateOptionalParams,
  ) => PollerLike<OperationState<MarketplaceGalleryImage>, MarketplaceGalleryImage>;
  /** The operation to create or update a marketplace gallery image. Please note some properties can be set only during marketplace gallery image creation. */
  createOrUpdate: (
    resourceGroupName: string,
    marketplaceGalleryImageName: string,
    resource: MarketplaceGalleryImage,
    options?: MarketplaceGalleryImagesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MarketplaceGalleryImage>, MarketplaceGalleryImage>;
  /** Gets a marketplace gallery image */
  get: (
    resourceGroupName: string,
    marketplaceGalleryImageName: string,
    options?: MarketplaceGalleryImagesGetOptionalParams,
  ) => Promise<MarketplaceGalleryImage>;
}

function _getMarketplaceGalleryImages(context: AzureStackHCIContext) {
  return {
    listAll: (options?: MarketplaceGalleryImagesListAllOptionalParams) => listAll(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: MarketplaceGalleryImagesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      marketplaceGalleryImageName: string,
      options?: MarketplaceGalleryImagesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, marketplaceGalleryImageName, options),
    update: (
      resourceGroupName: string,
      marketplaceGalleryImageName: string,
      properties: MarketplaceGalleryImageTagsUpdate,
      options?: MarketplaceGalleryImagesUpdateOptionalParams,
    ) => update(context, resourceGroupName, marketplaceGalleryImageName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      marketplaceGalleryImageName: string,
      resource: MarketplaceGalleryImage,
      options?: MarketplaceGalleryImagesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, marketplaceGalleryImageName, resource, options),
    get: (
      resourceGroupName: string,
      marketplaceGalleryImageName: string,
      options?: MarketplaceGalleryImagesGetOptionalParams,
    ) => get(context, resourceGroupName, marketplaceGalleryImageName, options),
  };
}

export function _getMarketplaceGalleryImagesOperations(
  context: AzureStackHCIContext,
): MarketplaceGalleryImagesOperations {
  return {
    ..._getMarketplaceGalleryImages(context),
  };
}
