// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  listByGallery,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/galleryInVMAccessControlProfiles/operations.js";
import type {
  GalleryInVMAccessControlProfilesListByGalleryOptionalParams,
  GalleryInVMAccessControlProfilesDeleteOptionalParams,
  GalleryInVMAccessControlProfilesUpdateOptionalParams,
  GalleryInVMAccessControlProfilesCreateOrUpdateOptionalParams,
  GalleryInVMAccessControlProfilesGetOptionalParams,
} from "../../api/galleryInVMAccessControlProfiles/options.js";
import type {
  GalleryInVMAccessControlProfile,
  GalleryInVMAccessControlProfileUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GalleryInVMAccessControlProfiles operations. */
export interface GalleryInVMAccessControlProfilesOperations {
  /** List gallery inVMAccessControlProfiles in a gallery. */
  listByGallery: (
    resourceGroupName: string,
    galleryName: string,
    options?: GalleryInVMAccessControlProfilesListByGalleryOptionalParams,
  ) => PagedAsyncIterableIterator<GalleryInVMAccessControlProfile>;
  /** Delete a gallery inVMAccessControlProfile. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    options?: GalleryInVMAccessControlProfilesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a gallery inVMAccessControlProfile. */
  update: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    galleryInVMAccessControlProfile: GalleryInVMAccessControlProfileUpdate,
    options?: GalleryInVMAccessControlProfilesUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a gallery inVMAccessControlProfile. */
  createOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    galleryInVMAccessControlProfile: GalleryInVMAccessControlProfile,
    options?: GalleryInVMAccessControlProfilesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Retrieves information about a gallery inVMAccessControlProfile. */
  get: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    options?: GalleryInVMAccessControlProfilesGetOptionalParams,
  ) => Promise<GalleryInVMAccessControlProfile>;
}

function _getGalleryInVMAccessControlProfiles(context: ComputeManagementContext) {
  return {
    listByGallery: (
      resourceGroupName: string,
      galleryName: string,
      options?: GalleryInVMAccessControlProfilesListByGalleryOptionalParams,
    ) => listByGallery(context, resourceGroupName, galleryName, options),
    delete: (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      options?: GalleryInVMAccessControlProfilesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, galleryName, inVMAccessControlProfileName, options),
    update: (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      galleryInVMAccessControlProfile: GalleryInVMAccessControlProfileUpdate,
      options?: GalleryInVMAccessControlProfilesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        galleryInVMAccessControlProfile,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      galleryInVMAccessControlProfile: GalleryInVMAccessControlProfile,
      options?: GalleryInVMAccessControlProfilesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        galleryInVMAccessControlProfile,
        options,
      ),
    get: (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      options?: GalleryInVMAccessControlProfilesGetOptionalParams,
    ) => get(context, resourceGroupName, galleryName, inVMAccessControlProfileName, options),
  };
}

export function _getGalleryInVMAccessControlProfilesOperations(
  context: ComputeManagementContext,
): GalleryInVMAccessControlProfilesOperations {
  return {
    ..._getGalleryInVMAccessControlProfiles(context),
  };
}
