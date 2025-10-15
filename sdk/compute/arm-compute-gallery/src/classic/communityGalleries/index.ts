// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import { get } from "../../api/communityGalleries/operations.js";
import type { CommunityGalleriesGetOptionalParams } from "../../api/communityGalleries/options.js";
import type { CommunityGallery } from "../../models/models.js";

/** Interface representing a CommunityGalleries operations. */
export interface CommunityGalleriesOperations {
  /** Get a community gallery by gallery public name. */
  get: (
    location: string,
    publicGalleryName: string,
    options?: CommunityGalleriesGetOptionalParams,
  ) => Promise<CommunityGallery>;
}

function _getCommunityGalleries(context: ComputeContext) {
  return {
    get: (
      location: string,
      publicGalleryName: string,
      options?: CommunityGalleriesGetOptionalParams,
    ) => get(context, location, publicGalleryName, options),
  };
}

export function _getCommunityGalleriesOperations(
  context: ComputeContext,
): CommunityGalleriesOperations {
  return {
    ..._getCommunityGalleries(context),
  };
}
