// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  listByGalleryImage,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/galleryImageVersions/operations.js";
import type {
  GalleryImageVersionsListByGalleryImageOptionalParams,
  GalleryImageVersionsDeleteOptionalParams,
  GalleryImageVersionsUpdateOptionalParams,
  GalleryImageVersionsCreateOrUpdateOptionalParams,
  GalleryImageVersionsGetOptionalParams,
} from "../../api/galleryImageVersions/options.js";
import type {
  GalleryImageVersion,
  GalleryImageVersionUpdate,
} from "../../models/computeGallery/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GalleryImageVersions operations. */
export interface GalleryImageVersionsOperations {
  /** List gallery image versions in a gallery image definition. */
  listByGalleryImage: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    options?: GalleryImageVersionsListByGalleryImageOptionalParams,
  ) => PagedAsyncIterableIterator<GalleryImageVersion>;
  /** Delete a gallery image version. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    options?: GalleryImageVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    options?: GalleryImageVersionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    options?: GalleryImageVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a gallery image version. */
  update: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    galleryImageVersion: GalleryImageVersionUpdate,
    options?: GalleryImageVersionsUpdateOptionalParams,
  ) => PollerLike<OperationState<GalleryImageVersion>, GalleryImageVersion>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    galleryImageVersion: GalleryImageVersionUpdate,
    options?: GalleryImageVersionsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GalleryImageVersion>, GalleryImageVersion>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    galleryImageVersion: GalleryImageVersionUpdate,
    options?: GalleryImageVersionsUpdateOptionalParams,
  ) => Promise<GalleryImageVersion>;
  /** Create or update a gallery image version. */
  createOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    galleryImageVersion: GalleryImageVersion,
    options?: GalleryImageVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<GalleryImageVersion>, GalleryImageVersion>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    galleryImageVersion: GalleryImageVersion,
    options?: GalleryImageVersionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GalleryImageVersion>, GalleryImageVersion>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    galleryImageVersion: GalleryImageVersion,
    options?: GalleryImageVersionsCreateOrUpdateOptionalParams,
  ) => Promise<GalleryImageVersion>;
  /** Retrieves information about a gallery image version. */
  get: (
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    options?: GalleryImageVersionsGetOptionalParams,
  ) => Promise<GalleryImageVersion>;
}

function _getGalleryImageVersions(context: ComputeManagementContext) {
  return {
    listByGalleryImage: (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      options?: GalleryImageVersionsListByGalleryImageOptionalParams,
    ) => listByGalleryImage(context, resourceGroupName, galleryName, galleryImageName, options),
    delete: (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImageVersionName: string,
      options?: GalleryImageVersionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImageVersionName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImageVersionName: string,
      options?: GalleryImageVersionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImageVersionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImageVersionName: string,
      options?: GalleryImageVersionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImageVersionName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImageVersionName: string,
      galleryImageVersion: GalleryImageVersionUpdate,
      options?: GalleryImageVersionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImageVersionName,
        galleryImageVersion,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImageVersionName: string,
      galleryImageVersion: GalleryImageVersionUpdate,
      options?: GalleryImageVersionsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImageVersionName,
        galleryImageVersion,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImageVersionName: string,
      galleryImageVersion: GalleryImageVersionUpdate,
      options?: GalleryImageVersionsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImageVersionName,
        galleryImageVersion,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImageVersionName: string,
      galleryImageVersion: GalleryImageVersion,
      options?: GalleryImageVersionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImageVersionName,
        galleryImageVersion,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImageVersionName: string,
      galleryImageVersion: GalleryImageVersion,
      options?: GalleryImageVersionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImageVersionName,
        galleryImageVersion,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImageVersionName: string,
      galleryImageVersion: GalleryImageVersion,
      options?: GalleryImageVersionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImageVersionName,
        galleryImageVersion,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      galleryName: string,
      galleryImageName: string,
      galleryImageVersionName: string,
      options?: GalleryImageVersionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImageVersionName,
        options,
      ),
  };
}

export function _getGalleryImageVersionsOperations(
  context: ComputeManagementContext,
): GalleryImageVersionsOperations {
  return {
    ..._getGalleryImageVersions(context),
  };
}
