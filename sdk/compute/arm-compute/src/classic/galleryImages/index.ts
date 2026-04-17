// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
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
import type { GalleryImage, GalleryImageUpdate } from "../../models/computeGallery/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    options?: GalleryImagesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    options?: GalleryImagesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a gallery image definition. */
  update: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImage: GalleryImageUpdate,
    options?: GalleryImagesUpdateOptionalParams,
  ) => PollerLike<OperationState<GalleryImage>, GalleryImage>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImage: GalleryImageUpdate,
    options?: GalleryImagesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GalleryImage>, GalleryImage>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImage: GalleryImageUpdate,
    options?: GalleryImagesUpdateOptionalParams,
  ) => Promise<GalleryImage>;
  /** Create or update a gallery image definition. */
  createOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImage: GalleryImage,
    options?: GalleryImagesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<GalleryImage>, GalleryImage>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImage: GalleryImage,
    options?: GalleryImagesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GalleryImage>, GalleryImage>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImage: GalleryImage,
    options?: GalleryImagesCreateOrUpdateOptionalParams,
  ) => Promise<GalleryImage>;
  /** Retrieves information about a gallery image definition. */
  get: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    options?: GalleryImagesGetOptionalParams,
  ) => Promise<GalleryImage>;
}

function _getGalleryImages(context: ComputeContext) {
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
    beginDelete: async (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      options?: GalleryImagesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, galleryName, galleryImageName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      options?: GalleryImagesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, galleryName, galleryImageName, options);
    },
    update: (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImage: GalleryImageUpdate,
      options?: GalleryImagesUpdateOptionalParams,
    ) => update(context, resourceGroupName, galleryName, galleryImageName, galleryImage, options),
    beginUpdate: async (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImage: GalleryImageUpdate,
      options?: GalleryImagesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImage,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImage: GalleryImageUpdate,
      options?: GalleryImagesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImage,
        options,
      );
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImage: GalleryImage,
      options?: GalleryImagesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImage,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImage: GalleryImage,
      options?: GalleryImagesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImage,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      options?: GalleryImagesGetOptionalParams,
    ) => get(context, resourceGroupName, galleryName, galleryImageName, options),
  };
}

export function _getGalleryImagesOperations(context: ComputeContext): GalleryImagesOperations {
  return {
    ..._getGalleryImages(context),
  };
}
