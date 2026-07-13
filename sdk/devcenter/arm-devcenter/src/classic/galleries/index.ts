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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    devCenterName: string,
    galleryName: string,
    options?: GalleriesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    devCenterName: string,
    galleryName: string,
    options?: GalleriesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a gallery. */
  createOrUpdate: (
    resourceGroupName: string,
    devCenterName: string,
    galleryName: string,
    body: Gallery,
    options?: GalleriesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Gallery>, Gallery>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    devCenterName: string,
    galleryName: string,
    body: Gallery,
    options?: GalleriesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Gallery>, Gallery>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    devCenterName: string,
    galleryName: string,
    body: Gallery,
    options?: GalleriesCreateOrUpdateOptionalParams,
  ) => Promise<Gallery>;
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
    beginDelete: async (
      resourceGroupName: string,
      devCenterName: string,
      galleryName: string,
      options?: GalleriesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, devCenterName, galleryName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      devCenterName: string,
      galleryName: string,
      options?: GalleriesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, devCenterName, galleryName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      devCenterName: string,
      galleryName: string,
      body: Gallery,
      options?: GalleriesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, devCenterName, galleryName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      devCenterName: string,
      galleryName: string,
      body: Gallery,
      options?: GalleriesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        devCenterName,
        galleryName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      devCenterName: string,
      galleryName: string,
      body: Gallery,
      options?: GalleriesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        devCenterName,
        galleryName,
        body,
        options,
      );
    },
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
