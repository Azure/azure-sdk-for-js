// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  gallerySharingProfileUpdate,
  listByArtifactName,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/galleries/operations.js";
import type {
  GalleriesGallerySharingProfileUpdateOptionalParams,
  GalleriesListByArtifactNameOptionalParams,
  GalleriesListOptionalParams,
  GalleriesListByResourceGroupOptionalParams,
  GalleriesDeleteOptionalParams,
  GalleriesUpdateOptionalParams,
  GalleriesCreateOrUpdateOptionalParams,
  GalleriesGetOptionalParams,
} from "../../api/galleries/options.js";
import type {
  Gallery,
  GalleryUpdate,
  GallerySoftDeletedResource,
  SharingUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Galleries operations. */
export interface GalleriesOperations {
  /** Update sharing profile of a gallery. */
  gallerySharingProfileUpdate: (
    resourceGroupName: string,
    galleryName: string,
    sharingUpdate: SharingUpdate,
    options?: GalleriesGallerySharingProfileUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List soft-deleted resources of an artifact in the gallery, such as soft-deleted gallery image version of an image. */
  listByArtifactName: (
    resourceGroupName: string,
    galleryName: string,
    artifactType: string,
    artifactName: string,
    options?: GalleriesListByArtifactNameOptionalParams,
  ) => PagedAsyncIterableIterator<GallerySoftDeletedResource>;
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
  /** Update a Shared Image Gallery. */
  update: (
    resourceGroupName: string,
    galleryName: string,
    gallery: GalleryUpdate,
    options?: GalleriesUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a Shared Image Gallery. */
  createOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    gallery: Gallery,
    options?: GalleriesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Retrieves information about a Shared Image Gallery. */
  get: (
    resourceGroupName: string,
    galleryName: string,
    options?: GalleriesGetOptionalParams,
  ) => Promise<Gallery>;
}

function _getGalleries(context: ComputeContext) {
  return {
    gallerySharingProfileUpdate: (
      resourceGroupName: string,
      galleryName: string,
      sharingUpdate: SharingUpdate,
      options?: GalleriesGallerySharingProfileUpdateOptionalParams,
    ) =>
      gallerySharingProfileUpdate(context, resourceGroupName, galleryName, sharingUpdate, options),
    listByArtifactName: (
      resourceGroupName: string,
      galleryName: string,
      artifactType: string,
      artifactName: string,
      options?: GalleriesListByArtifactNameOptionalParams,
    ) =>
      listByArtifactName(
        context,
        resourceGroupName,
        galleryName,
        artifactType,
        artifactName,
        options,
      ),
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
    update: (
      resourceGroupName: string,
      galleryName: string,
      gallery: GalleryUpdate,
      options?: GalleriesUpdateOptionalParams,
    ) => update(context, resourceGroupName, galleryName, gallery, options),
    createOrUpdate: (
      resourceGroupName: string,
      galleryName: string,
      gallery: Gallery,
      options?: GalleriesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, galleryName, gallery, options),
    get: (resourceGroupName: string, galleryName: string, options?: GalleriesGetOptionalParams) =>
      get(context, resourceGroupName, galleryName, options),
  };
}

export function _getGalleriesOperations(context: ComputeContext): GalleriesOperations {
  return {
    ..._getGalleries(context),
  };
}
