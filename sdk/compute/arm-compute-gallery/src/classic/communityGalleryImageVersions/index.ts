// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import { list, get } from "../../api/communityGalleryImageVersions/operations.js";
import type {
  CommunityGalleryImageVersionsListOptionalParams,
  CommunityGalleryImageVersionsGetOptionalParams,
} from "../../api/communityGalleryImageVersions/options.js";
import type { CommunityGalleryImageVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CommunityGalleryImageVersions operations. */
export interface CommunityGalleryImageVersionsOperations {
  /** List community gallery image versions inside an image. */
  list: (
    location: string,
    publicGalleryName: string,
    galleryImageName: string,
    options?: CommunityGalleryImageVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<CommunityGalleryImageVersion>;
  /** Get a community gallery image version. */
  get: (
    location: string,
    publicGalleryName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    options?: CommunityGalleryImageVersionsGetOptionalParams,
  ) => Promise<CommunityGalleryImageVersion>;
}

function _getCommunityGalleryImageVersions(context: ComputeManagementContext) {
  return {
    list: (
      location: string,
      publicGalleryName: string,
      galleryImageName: string,
      options?: CommunityGalleryImageVersionsListOptionalParams,
    ) => list(context, location, publicGalleryName, galleryImageName, options),
    get: (
      location: string,
      publicGalleryName: string,
      galleryImageName: string,
      galleryImageVersionName: string,
      options?: CommunityGalleryImageVersionsGetOptionalParams,
    ) =>
      get(context, location, publicGalleryName, galleryImageName, galleryImageVersionName, options),
  };
}

export function _getCommunityGalleryImageVersionsOperations(
  context: ComputeManagementContext,
): CommunityGalleryImageVersionsOperations {
  return {
    ..._getCommunityGalleryImageVersions(context),
  };
}
