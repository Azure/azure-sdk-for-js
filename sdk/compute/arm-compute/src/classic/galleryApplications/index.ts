// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
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
import type {
  GalleryApplication,
  GalleryApplicationUpdate,
} from "../../models/computeGallery/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    options?: GalleryApplicationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    options?: GalleryApplicationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a gallery Application Definition. */
  update: (
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    galleryApplication: GalleryApplicationUpdate,
    options?: GalleryApplicationsUpdateOptionalParams,
  ) => PollerLike<OperationState<GalleryApplication>, GalleryApplication>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    galleryApplication: GalleryApplicationUpdate,
    options?: GalleryApplicationsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GalleryApplication>, GalleryApplication>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    galleryApplication: GalleryApplicationUpdate,
    options?: GalleryApplicationsUpdateOptionalParams,
  ) => Promise<GalleryApplication>;
  /** Create or update a gallery Application Definition. */
  createOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    galleryApplication: GalleryApplication,
    options?: GalleryApplicationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<GalleryApplication>, GalleryApplication>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    galleryApplication: GalleryApplication,
    options?: GalleryApplicationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GalleryApplication>, GalleryApplication>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    galleryApplication: GalleryApplication,
    options?: GalleryApplicationsCreateOrUpdateOptionalParams,
  ) => Promise<GalleryApplication>;
  /** Retrieves information about a gallery Application Definition. */
  get: (
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    options?: GalleryApplicationsGetOptionalParams,
  ) => Promise<GalleryApplication>;
}

function _getGalleryApplications(context: ComputeContext) {
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
    beginDelete: async (
      resourceGroupName: string,
      galleryName: string,
      galleryApplicationName: string,
      options?: GalleryApplicationsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        galleryName,
        galleryApplicationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      galleryApplicationName: string,
      options?: GalleryApplicationsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        galleryName,
        galleryApplicationName,
        options,
      );
    },
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
    beginUpdate: async (
      resourceGroupName: string,
      galleryName: string,
      galleryApplicationName: string,
      galleryApplication: GalleryApplicationUpdate,
      options?: GalleryApplicationsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        galleryName,
        galleryApplicationName,
        galleryApplication,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      galleryApplicationName: string,
      galleryApplication: GalleryApplicationUpdate,
      options?: GalleryApplicationsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        galleryName,
        galleryApplicationName,
        galleryApplication,
        options,
      );
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      galleryName: string,
      galleryApplicationName: string,
      galleryApplication: GalleryApplication,
      options?: GalleryApplicationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        galleryApplicationName,
        galleryApplication,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      galleryApplicationName: string,
      galleryApplication: GalleryApplication,
      options?: GalleryApplicationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        galleryApplicationName,
        galleryApplication,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      galleryName: string,
      galleryApplicationName: string,
      options?: GalleryApplicationsGetOptionalParams,
    ) => get(context, resourceGroupName, galleryName, galleryApplicationName, options),
  };
}

export function _getGalleryApplicationsOperations(
  context: ComputeContext,
): GalleryApplicationsOperations {
  return {
    ..._getGalleryApplications(context),
  };
}
