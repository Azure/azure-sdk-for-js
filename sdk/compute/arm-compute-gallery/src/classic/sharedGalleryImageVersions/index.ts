// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import { list, get } from "../../api/sharedGalleryImageVersions/operations.js";
import type {
  SharedGalleryImageVersionsListOptionalParams,
  SharedGalleryImageVersionsGetOptionalParams,
} from "../../api/sharedGalleryImageVersions/options.js";
import type { SharedGalleryImageVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SharedGalleryImageVersions operations. */
export interface SharedGalleryImageVersionsOperations {
  /** List shared gallery image versions by subscription id or tenant id. */
  list: (
    location: string,
    galleryUniqueName: string,
    galleryImageName: string,
    options?: SharedGalleryImageVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<SharedGalleryImageVersion>;
  /** Get a shared gallery image version by subscription id or tenant id. */
  get: (
    location: string,
    galleryUniqueName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    options?: SharedGalleryImageVersionsGetOptionalParams,
  ) => Promise<SharedGalleryImageVersion>;
}

function _getSharedGalleryImageVersions(context: ComputeContext) {
  return {
    list: (
      location: string,
      galleryUniqueName: string,
      galleryImageName: string,
      options?: SharedGalleryImageVersionsListOptionalParams,
    ) => list(context, location, galleryUniqueName, galleryImageName, options),
    get: (
      location: string,
      galleryUniqueName: string,
      galleryImageName: string,
      galleryImageVersionName: string,
      options?: SharedGalleryImageVersionsGetOptionalParams,
    ) =>
      get(context, location, galleryUniqueName, galleryImageName, galleryImageVersionName, options),
  };
}

export function _getSharedGalleryImageVersionsOperations(
  context: ComputeContext,
): SharedGalleryImageVersionsOperations {
  return {
    ..._getSharedGalleryImageVersions(context),
  };
}
