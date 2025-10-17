// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  listByGallery,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/galleryApplications/operations.js";
import type {
  GalleryApplicationsListByGalleryOptionalParams,
  GalleryApplicationsDeleteOptionalParams,
  GalleryApplicationsUpdateOptionalParams,
  GalleryApplicationsCreateOrUpdateOptionalParams,
  GalleryApplicationsGetOptionalParams,
} from "../../api/galleryApplications/options.js";
import type { GalleryApplication, GalleryApplicationUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GalleryApplications operations. */
export interface GalleryApplicationsOperations {
  /** List gallery Application Definitions in a gallery. */
  listByGallery: (
    resourceGroupName: string,
    galleryName: string,
    options?: GalleryApplicationsListByGalleryOptionalParams,
  ) => PagedAsyncIterableIterator<GalleryApplication>;
  /** Delete a gallery Application. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    options?: GalleryApplicationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a gallery Application Definition. */
  update: (
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    galleryApplication: GalleryApplicationUpdate,
    options?: GalleryApplicationsUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a gallery Application Definition. */
  createOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    galleryApplication: GalleryApplication,
    options?: GalleryApplicationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Retrieves information about a gallery Application Definition. */
  get: (
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    options?: GalleryApplicationsGetOptionalParams,
  ) => Promise<GalleryApplication>;
}

function _getGalleryApplications(context: ComputeManagementContext) {
  return {
    listByGallery: (
      resourceGroupName: string,
      galleryName: string,
      options?: GalleryApplicationsListByGalleryOptionalParams,
    ) => listByGallery(context, resourceGroupName, galleryName, options),
    delete: (
      resourceGroupName: string,
      galleryName: string,
      galleryApplicationName: string,
      options?: GalleryApplicationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, galleryName, galleryApplicationName, options),
    update: (
      resourceGroupName: string,
      galleryName: string,
      galleryApplicationName: string,
      galleryApplication: GalleryApplicationUpdate,
      options?: GalleryApplicationsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        galleryName,
        galleryApplicationName,
        galleryApplication,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      galleryName: string,
      galleryApplicationName: string,
      galleryApplication: GalleryApplication,
      options?: GalleryApplicationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        galleryApplicationName,
        galleryApplication,
        options,
      ),
    get: (
      resourceGroupName: string,
      galleryName: string,
      galleryApplicationName: string,
      options?: GalleryApplicationsGetOptionalParams,
    ) => get(context, resourceGroupName, galleryName, galleryApplicationName, options),
  };
}

export function _getGalleryApplicationsOperations(
  context: ComputeManagementContext,
): GalleryApplicationsOperations {
  return {
    ..._getGalleryApplications(context),
  };
}
