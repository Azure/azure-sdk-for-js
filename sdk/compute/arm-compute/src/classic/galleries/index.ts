// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/galleries/operations.js";
import type {
  GalleriesListOptionalParams,
  GalleriesListByResourceGroupOptionalParams,
  GalleriesDeleteOptionalParams,
  GalleriesUpdateOptionalParams,
  GalleriesCreateOrUpdateOptionalParams,
  GalleriesGetOptionalParams,
} from "../../api/galleries/options.js";
import type { Gallery, GalleryUpdate } from "../../models/computeGallery/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Galleries operations. */
export interface GalleriesOperations {
  /** List galleries under a subscription. */
  list: (options?: GalleriesListOptionalParams) => PagedAsyncIterableIterator<Gallery>;
  /** List galleries under a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: GalleriesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Gallery>;
  /** Delete a Shared Image Gallery. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    galleryName: string,
    options?: GalleriesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    galleryName: string,
    options?: GalleriesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    galleryName: string,
    options?: GalleriesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a Shared Image Gallery. */
  update: (
    resourceGroupName: string,
    galleryName: string,
    gallery: GalleryUpdate,
    options?: GalleriesUpdateOptionalParams,
  ) => PollerLike<OperationState<Gallery>, Gallery>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    galleryName: string,
    gallery: GalleryUpdate,
    options?: GalleriesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Gallery>, Gallery>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    galleryName: string,
    gallery: GalleryUpdate,
    options?: GalleriesUpdateOptionalParams,
  ) => Promise<Gallery>;
  /** Create or update a Shared Image Gallery. */
  createOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    gallery: Gallery,
    options?: GalleriesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Gallery>, Gallery>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    gallery: Gallery,
    options?: GalleriesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Gallery>, Gallery>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    galleryName: string,
    gallery: Gallery,
    options?: GalleriesCreateOrUpdateOptionalParams,
  ) => Promise<Gallery>;
  /** Retrieves information about a Shared Image Gallery. */
  get: (
    resourceGroupName: string,
    galleryName: string,
    options?: GalleriesGetOptionalParams,
  ) => Promise<Gallery>;
}

function _getGalleries(context: ComputeManagementContext) {
  return {
    list: (options?: GalleriesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: GalleriesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      galleryName: string,
      options?: GalleriesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, galleryName, options),
    beginDelete: async (
      resourceGroupName: string,
      galleryName: string,
      options?: GalleriesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, galleryName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      options?: GalleriesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, galleryName, options);
    },
    update: (
      resourceGroupName: string,
      galleryName: string,
      gallery: GalleryUpdate,
      options?: GalleriesUpdateOptionalParams,
    ) => update(context, resourceGroupName, galleryName, gallery, options),
    beginUpdate: async (
      resourceGroupName: string,
      galleryName: string,
      gallery: GalleryUpdate,
      options?: GalleriesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, galleryName, gallery, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      gallery: GalleryUpdate,
      options?: GalleriesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, galleryName, gallery, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      galleryName: string,
      gallery: Gallery,
      options?: GalleriesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, galleryName, gallery, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      galleryName: string,
      gallery: Gallery,
      options?: GalleriesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, galleryName, gallery, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      gallery: Gallery,
      options?: GalleriesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, galleryName, gallery, options);
    },
    get: (resourceGroupName: string, galleryName: string, options?: GalleriesGetOptionalParams) =>
      get(context, resourceGroupName, galleryName, options),
  };
}

export function _getGalleriesOperations(context: ComputeManagementContext): GalleriesOperations {
  return {
    ..._getGalleries(context),
  };
}
