// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import { list, get } from "../../api/communityGalleryImages/operations.js";
import type {
  CommunityGalleryImagesListOptionalParams,
  CommunityGalleryImagesGetOptionalParams,
} from "../../api/communityGalleryImages/options.js";
import type { CommunityGalleryImage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CommunityGalleryImages operations. */
export interface CommunityGalleryImagesOperations {
  /** List community gallery images inside a gallery. */
  list: (
    location: string,
    publicGalleryName: string,
    options?: CommunityGalleryImagesListOptionalParams,
  ) => PagedAsyncIterableIterator<CommunityGalleryImage>;
  /** Get a community gallery image. */
  get: (
    location: string,
    publicGalleryName: string,
    galleryImageName: string,
    options?: CommunityGalleryImagesGetOptionalParams,
  ) => Promise<CommunityGalleryImage>;
}

function _getCommunityGalleryImages(context: ComputeContext) {
  return {
    list: (
      location: string,
      publicGalleryName: string,
      options?: CommunityGalleryImagesListOptionalParams,
    ) => list(context, location, publicGalleryName, options),
    get: (
      location: string,
      publicGalleryName: string,
      galleryImageName: string,
      options?: CommunityGalleryImagesGetOptionalParams,
    ) => get(context, location, publicGalleryName, galleryImageName, options),
  };
}

export function _getCommunityGalleryImagesOperations(
  context: ComputeContext,
): CommunityGalleryImagesOperations {
  return {
    ..._getCommunityGalleryImages(context),
  };
}
