// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import { listByDevCenter, $delete, createOrUpdate, get } from "../../api/galleries/operations.js";
import type {
  GalleriesListByDevCenterOptionalParams,
  GalleriesDeleteOptionalParams,
  GalleriesCreateOrUpdateOptionalParams,
  GalleriesGetOptionalParams,
} from "../../api/galleries/options.js";
import type { Gallery } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Galleries operations. */
export interface GalleriesOperations {
  /** Lists galleries for a devcenter. */
  listByDevCenter: (
    resourceGroupName: string,
    devCenterName: string,
    options?: GalleriesListByDevCenterOptionalParams,
  ) => PagedAsyncIterableIterator<Gallery>;
  /** Deletes a gallery resource. */
  delete: (
    resourceGroupName: string,
    devCenterName: string,
    galleryName: string,
    options?: GalleriesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates a gallery. */
  createOrUpdate: (
    resourceGroupName: string,
    devCenterName: string,
    galleryName: string,
    body: Gallery,
    options?: GalleriesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Gallery>, Gallery>;
  /** Gets a gallery. */
  get: (
    resourceGroupName: string,
    devCenterName: string,
    galleryName: string,
    options?: GalleriesGetOptionalParams,
  ) => Promise<Gallery>;
}

function _getGalleries(context: DevCenterContext) {
  return {
    listByDevCenter: (
      resourceGroupName: string,
      devCenterName: string,
      options?: GalleriesListByDevCenterOptionalParams,
    ) => listByDevCenter(context, resourceGroupName, devCenterName, options),
    delete: (
      resourceGroupName: string,
      devCenterName: string,
      galleryName: string,
      options?: GalleriesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, devCenterName, galleryName, options),
    createOrUpdate: (
      resourceGroupName: string,
      devCenterName: string,
      galleryName: string,
      body: Gallery,
      options?: GalleriesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, devCenterName, galleryName, body, options),
    get: (
      resourceGroupName: string,
      devCenterName: string,
      galleryName: string,
      options?: GalleriesGetOptionalParams,
    ) => get(context, resourceGroupName, devCenterName, galleryName, options),
  };
}

export function _getGalleriesOperations(context: DevCenterContext): GalleriesOperations {
  return {
    ..._getGalleries(context),
  };
}
