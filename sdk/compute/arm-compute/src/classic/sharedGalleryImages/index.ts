// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementContext } from "../../api/computeManagementContext.js";
import { list, get } from "../../api/sharedGalleryImages/operations.js";
import {
  SharedGalleryImagesListOptionalParams,
  SharedGalleryImagesGetOptionalParams,
} from "../../api/sharedGalleryImages/options.js";
import { SharedGalleryImage } from "../../models/computeGallery/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SharedGalleryImages operations. */
export interface SharedGalleryImagesOperations {
  /** List shared gallery images by subscription id or tenant id. */
  list: (
    location: string,
    galleryUniqueName: string,
    options?: SharedGalleryImagesListOptionalParams,
  ) => PagedAsyncIterableIterator<SharedGalleryImage>;
  /** Get a shared gallery image by subscription id or tenant id. */
  get: (
    location: string,
    galleryUniqueName: string,
    galleryImageName: string,
    options?: SharedGalleryImagesGetOptionalParams,
  ) => Promise<SharedGalleryImage>;
}

function _getSharedGalleryImages(context: ComputeManagementContext) {
  return {
    list: (
      location: string,
      galleryUniqueName: string,
      options?: SharedGalleryImagesListOptionalParams,
    ) => list(context, location, galleryUniqueName, options),
    get: (
      location: string,
      galleryUniqueName: string,
      galleryImageName: string,
      options?: SharedGalleryImagesGetOptionalParams,
    ) => get(context, location, galleryUniqueName, galleryImageName, options),
  };
}

export function _getSharedGalleryImagesOperations(
  context: ComputeManagementContext,
): SharedGalleryImagesOperations {
  return {
    ..._getSharedGalleryImages(context),
  };
}
