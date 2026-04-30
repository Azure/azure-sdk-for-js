// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import { update } from "../../api/gallerySharingProfile/operations.js";
import type { GallerySharingProfileUpdateOptionalParams } from "../../api/gallerySharingProfile/options.js";
import type { SharingUpdate } from "../../models/computeGallery/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GallerySharingProfile operations. */
export interface GallerySharingProfileOperations {
  /** Update sharing profile of a gallery. */
  update: (
    resourceGroupName: string,
    galleryName: string,
    sharingUpdate: SharingUpdate,
    options?: GallerySharingProfileUpdateOptionalParams,
  ) => PollerLike<OperationState<SharingUpdate>, SharingUpdate>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    galleryName: string,
    sharingUpdate: SharingUpdate,
    options?: GallerySharingProfileUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SharingUpdate>, SharingUpdate>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    galleryName: string,
    sharingUpdate: SharingUpdate,
    options?: GallerySharingProfileUpdateOptionalParams,
  ) => Promise<SharingUpdate>;
}

function _getGallerySharingProfile(context: ComputeManagementContext) {
  return {
    update: (
      resourceGroupName: string,
      galleryName: string,
      sharingUpdate: SharingUpdate,
      options?: GallerySharingProfileUpdateOptionalParams,
    ) => update(context, resourceGroupName, galleryName, sharingUpdate, options),
    beginUpdate: async (
      resourceGroupName: string,
      galleryName: string,
      sharingUpdate: SharingUpdate,
      options?: GallerySharingProfileUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, galleryName, sharingUpdate, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      sharingUpdate: SharingUpdate,
      options?: GallerySharingProfileUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, galleryName, sharingUpdate, options);
    },
  };
}

export function _getGallerySharingProfileOperations(
  context: ComputeManagementContext,
): GallerySharingProfileOperations {
  return {
    ..._getGallerySharingProfile(context),
  };
}
