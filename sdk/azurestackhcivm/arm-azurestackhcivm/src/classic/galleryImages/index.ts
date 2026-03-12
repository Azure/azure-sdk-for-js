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
} from "../../api/galleryImages/operations.js";
import {
  GalleryImagesListAllOptionalParams,
  GalleryImagesListByResourceGroupOptionalParams,
  GalleryImagesDeleteOptionalParams,
  GalleryImagesUpdateOptionalParams,
  GalleryImagesCreateOrUpdateOptionalParams,
  GalleryImagesGetOptionalParams,
} from "../../api/galleryImages/options.js";
import { GalleryImage, GalleryImageTagsUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GalleryImages operations. */
export interface GalleryImagesOperations {
  /** Lists all of the gallery images in the specified subscription. Use the nextLink property in the response to get the next page of gallery images. */
  listAll: (
    options?: GalleryImagesListAllOptionalParams,
  ) => PagedAsyncIterableIterator<GalleryImage>;
  /** Lists all of the gallery images in the specified resource group. Use the nextLink property in the response to get the next page of gallery images. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: GalleryImagesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<GalleryImage>;
  /** The operation to delete a gallery image. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    galleryImageName: string,
    options?: GalleryImagesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to update a gallery image. */
  update: (
    resourceGroupName: string,
    galleryImageName: string,
    properties: GalleryImageTagsUpdate,
    options?: GalleryImagesUpdateOptionalParams,
  ) => PollerLike<OperationState<GalleryImage>, GalleryImage>;
  /** The operation to create or update a gallery image. Please note some properties can be set only during gallery image creation. */
  createOrUpdate: (
    resourceGroupName: string,
    galleryImageName: string,
    resource: GalleryImage,
    options?: GalleryImagesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<GalleryImage>, GalleryImage>;
  /** Gets a gallery image */
  get: (
    resourceGroupName: string,
    galleryImageName: string,
    options?: GalleryImagesGetOptionalParams,
  ) => Promise<GalleryImage>;
}

function _getGalleryImages(context: AzureStackHCIVMManagementContext) {
  return {
    listAll: (options?: GalleryImagesListAllOptionalParams) => listAll(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: GalleryImagesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      galleryImageName: string,
      options?: GalleryImagesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, galleryImageName, options),
    update: (
      resourceGroupName: string,
      galleryImageName: string,
      properties: GalleryImageTagsUpdate,
      options?: GalleryImagesUpdateOptionalParams,
    ) => update(context, resourceGroupName, galleryImageName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      galleryImageName: string,
      resource: GalleryImage,
      options?: GalleryImagesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, galleryImageName, resource, options),
    get: (
      resourceGroupName: string,
      galleryImageName: string,
      options?: GalleryImagesGetOptionalParams,
    ) => get(context, resourceGroupName, galleryImageName, options),
  };
}

export function _getGalleryImagesOperations(
  context: AzureStackHCIVMManagementContext,
): GalleryImagesOperations {
  return {
    ..._getGalleryImages(context),
  };
}
