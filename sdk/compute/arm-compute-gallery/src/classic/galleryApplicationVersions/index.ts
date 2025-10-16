// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  listByGalleryApplication,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/galleryApplicationVersions/operations.js";
import type {
  GalleryApplicationVersionsListByGalleryApplicationOptionalParams,
  GalleryApplicationVersionsDeleteOptionalParams,
  GalleryApplicationVersionsUpdateOptionalParams,
  GalleryApplicationVersionsCreateOrUpdateOptionalParams,
  GalleryApplicationVersionsGetOptionalParams,
} from "../../api/galleryApplicationVersions/options.js";
import type {
  GalleryApplicationVersion,
  GalleryApplicationVersionUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GalleryApplicationVersions operations. */
export interface GalleryApplicationVersionsOperations {
  /** List gallery Application Versions in a gallery Application Definition. */
  listByGalleryApplication: (
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    options?: GalleryApplicationVersionsListByGalleryApplicationOptionalParams,
  ) => PagedAsyncIterableIterator<GalleryApplicationVersion>;
  /** Delete a gallery Application Version. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    galleryApplicationVersionName: string,
    options?: GalleryApplicationVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a gallery Application Version. */
  update: (
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    galleryApplicationVersionName: string,
    galleryApplicationVersion: GalleryApplicationVersionUpdate,
    options?: GalleryApplicationVersionsUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a gallery Application Version. */
  createOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    galleryApplicationVersionName: string,
    galleryApplicationVersion: GalleryApplicationVersion,
    options?: GalleryApplicationVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Retrieves information about a gallery Application Version. */
  get: (
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    galleryApplicationVersionName: string,
    options?: GalleryApplicationVersionsGetOptionalParams,
  ) => Promise<GalleryApplicationVersion>;
}

function _getGalleryApplicationVersions(context: ComputeManagementContext) {
  return {
    listByGalleryApplication: (
      resourceGroupName: string,
      galleryName: string,
      galleryApplicationName: string,
      options?: GalleryApplicationVersionsListByGalleryApplicationOptionalParams,
    ) =>
      listByGalleryApplication(
        context,
        resourceGroupName,
        galleryName,
        galleryApplicationName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      galleryName: string,
      galleryApplicationName: string,
      galleryApplicationVersionName: string,
      options?: GalleryApplicationVersionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        galleryName,
        galleryApplicationName,
        galleryApplicationVersionName,
        options,
      ),
    update: (
      resourceGroupName: string,
      galleryName: string,
      galleryApplicationName: string,
      galleryApplicationVersionName: string,
      galleryApplicationVersion: GalleryApplicationVersionUpdate,
      options?: GalleryApplicationVersionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        galleryName,
        galleryApplicationName,
        galleryApplicationVersionName,
        galleryApplicationVersion,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      galleryName: string,
      galleryApplicationName: string,
      galleryApplicationVersionName: string,
      galleryApplicationVersion: GalleryApplicationVersion,
      options?: GalleryApplicationVersionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        galleryApplicationName,
        galleryApplicationVersionName,
        galleryApplicationVersion,
        options,
      ),
    get: (
      resourceGroupName: string,
      galleryName: string,
      galleryApplicationName: string,
      galleryApplicationVersionName: string,
      options?: GalleryApplicationVersionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        galleryName,
        galleryApplicationName,
        galleryApplicationVersionName,
        options,
      ),
  };
}

export function _getGalleryApplicationVersionsOperations(
  context: ComputeManagementContext,
): GalleryApplicationVersionsOperations {
  return {
    ..._getGalleryApplicationVersions(context),
  };
}
