// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import { list, get } from "../../api/sharedGalleries/operations.js";
import type {
  SharedGalleriesListOptionalParams,
  SharedGalleriesGetOptionalParams,
} from "../../api/sharedGalleries/options.js";
import type { SharedGallery } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SharedGalleries operations. */
export interface SharedGalleriesOperations {
  /** List shared galleries by subscription id or tenant id. */
  list: (
    location: string,
    options?: SharedGalleriesListOptionalParams,
  ) => PagedAsyncIterableIterator<SharedGallery>;
  /** Get a shared gallery by subscription id or tenant id. */
  get: (
    location: string,
    galleryUniqueName: string,
    options?: SharedGalleriesGetOptionalParams,
  ) => Promise<SharedGallery>;
}

function _getSharedGalleries(context: ComputeManagementContext) {
  return {
    list: (location: string, options?: SharedGalleriesListOptionalParams) =>
      list(context, location, options),
    get: (
      location: string,
      galleryUniqueName: string,
      options?: SharedGalleriesGetOptionalParams,
    ) => get(context, location, galleryUniqueName, options),
  };
}

export function _getSharedGalleriesOperations(
  context: ComputeManagementContext,
): SharedGalleriesOperations {
  return {
    ..._getSharedGalleries(context),
  };
}
