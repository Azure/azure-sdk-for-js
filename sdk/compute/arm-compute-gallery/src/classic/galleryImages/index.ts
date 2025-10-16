// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  listByGallery,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/galleryImages/operations.js";
import type {
  GalleryImagesListByGalleryOptionalParams,
  GalleryImagesDeleteOptionalParams,
  GalleryImagesUpdateOptionalParams,
  GalleryImagesCreateOrUpdateOptionalParams,
  GalleryImagesGetOptionalParams,
} from "../../api/galleryImages/options.js";
import type { GalleryImage, GalleryImageUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GalleryImages operations. */
export interface GalleryImagesOperations {
  /** List gallery image definitions in a gallery. */
  listByGallery: (
    resourceGroupName: string,
    galleryName: string,
    options?: GalleryImagesListByGalleryOptionalParams,
  ) => PagedAsyncIterableIterator<GalleryImage>;
  /** Delete a gallery image. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    options?: GalleryImagesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a gallery image definition. */
  update: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImage: GalleryImageUpdate,
    options?: GalleryImagesUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a gallery image definition. */
  createOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImage: GalleryImage,
    options?: GalleryImagesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Retrieves information about a gallery image definition. */
  get: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    options?: GalleryImagesGetOptionalParams,
  ) => Promise<GalleryImage>;
}

function _getGalleryImages(context: ComputeManagementContext) {
  return {
    listByGallery: (
      resourceGroupName: string,
      galleryName: string,
      options?: GalleryImagesListByGalleryOptionalParams,
    ) => listByGallery(context, resourceGroupName, galleryName, options),
    delete: (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      options?: GalleryImagesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, galleryName, galleryImageName, options),
    update: (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImage: GalleryImageUpdate,
      options?: GalleryImagesUpdateOptionalParams,
    ) => update(context, resourceGroupName, galleryName, galleryImageName, galleryImage, options),
    createOrUpdate: (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImage: GalleryImage,
      options?: GalleryImagesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImage,
        options,
      ),
    get: (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      options?: GalleryImagesGetOptionalParams,
    ) => get(context, resourceGroupName, galleryName, galleryImageName, options),
  };
}

export function _getGalleryImagesOperations(
  context: ComputeManagementContext,
): GalleryImagesOperations {
  return {
    ..._getGalleryImages(context),
  };
}
