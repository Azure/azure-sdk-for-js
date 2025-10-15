// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  listByGalleryImage,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/galleryImageVersions/operations.js";
import type {
  GalleryImageVersionsListByGalleryImageOptionalParams,
  GalleryImageVersionsDeleteOptionalParams,
  GalleryImageVersionsUpdateOptionalParams,
  GalleryImageVersionsCreateOrUpdateOptionalParams,
  GalleryImageVersionsGetOptionalParams,
} from "../../api/galleryImageVersions/options.js";
import type { GalleryImageVersion, GalleryImageVersionUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GalleryImageVersions operations. */
export interface GalleryImageVersionsOperations {
  /** List gallery image versions in a gallery image definition. */
  listByGalleryImage: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    options?: GalleryImageVersionsListByGalleryImageOptionalParams,
  ) => PagedAsyncIterableIterator<GalleryImageVersion>;
  /** Delete a gallery image version. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    options?: GalleryImageVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a gallery image version. */
  update: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    galleryImageVersion: GalleryImageVersionUpdate,
    options?: GalleryImageVersionsUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a gallery image version. */
  createOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    galleryImageVersion: GalleryImageVersion,
    options?: GalleryImageVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Retrieves information about a gallery image version. */
  get: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    options?: GalleryImageVersionsGetOptionalParams,
  ) => Promise<GalleryImageVersion>;
}

function _getGalleryImageVersions(context: ComputeContext) {
  return {
    listByGalleryImage: (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      options?: GalleryImageVersionsListByGalleryImageOptionalParams,
    ) => listByGalleryImage(context, resourceGroupName, galleryName, galleryImageName, options),
    delete: (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImageVersionName: string,
      options?: GalleryImageVersionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImageVersionName,
        options,
      ),
    update: (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImageVersionName: string,
      galleryImageVersion: GalleryImageVersionUpdate,
      options?: GalleryImageVersionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImageVersionName,
        galleryImageVersion,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImageVersionName: string,
      galleryImageVersion: GalleryImageVersion,
      options?: GalleryImageVersionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImageVersionName,
        galleryImageVersion,
        options,
      ),
    get: (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImageVersionName: string,
      options?: GalleryImageVersionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImageVersionName,
        options,
      ),
  };
}

export function _getGalleryImageVersionsOperations(
  context: ComputeContext,
): GalleryImageVersionsOperations {
  return {
    ..._getGalleryImageVersions(context),
  };
}
