// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  listByGalleryScript,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/galleryScriptVersions/operations.js";
import type {
  GalleryScriptVersionsListByGalleryScriptOptionalParams,
  GalleryScriptVersionsDeleteOptionalParams,
  GalleryScriptVersionsUpdateOptionalParams,
  GalleryScriptVersionsCreateOrUpdateOptionalParams,
  GalleryScriptVersionsGetOptionalParams,
} from "../../api/galleryScriptVersions/options.js";
import type {
  GalleryScriptVersion,
  GalleryScriptVersionUpdate,
} from "../../models/computeGallery/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GalleryScriptVersions operations. */
export interface GalleryScriptVersionsOperations {
  /** List gallery Script Versions in a gallery Script Definition. */
  listByGalleryScript: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    options?: GalleryScriptVersionsListByGalleryScriptOptionalParams,
  ) => PagedAsyncIterableIterator<GalleryScriptVersion>;
  /** Delete a gallery Script Version. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    galleryScriptVersionName: string,
    options?: GalleryScriptVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    galleryScriptVersionName: string,
    options?: GalleryScriptVersionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    galleryScriptVersionName: string,
    options?: GalleryScriptVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a gallery Script Version. */
  update: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    galleryScriptVersionName: string,
    galleryScriptVersion: GalleryScriptVersionUpdate,
    options?: GalleryScriptVersionsUpdateOptionalParams,
  ) => PollerLike<OperationState<GalleryScriptVersion>, GalleryScriptVersion>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    galleryScriptVersionName: string,
    galleryScriptVersion: GalleryScriptVersionUpdate,
    options?: GalleryScriptVersionsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GalleryScriptVersion>, GalleryScriptVersion>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    galleryScriptVersionName: string,
    galleryScriptVersion: GalleryScriptVersionUpdate,
    options?: GalleryScriptVersionsUpdateOptionalParams,
  ) => Promise<GalleryScriptVersion>;
  /** Create or update a gallery Script Version. */
  createOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    galleryScriptVersionName: string,
    galleryScriptVersion: GalleryScriptVersion,
    options?: GalleryScriptVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<GalleryScriptVersion>, GalleryScriptVersion>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    galleryScriptVersionName: string,
    galleryScriptVersion: GalleryScriptVersion,
    options?: GalleryScriptVersionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GalleryScriptVersion>, GalleryScriptVersion>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    galleryScriptVersionName: string,
    galleryScriptVersion: GalleryScriptVersion,
    options?: GalleryScriptVersionsCreateOrUpdateOptionalParams,
  ) => Promise<GalleryScriptVersion>;
  /** Custom ArmResourceRead operation template with CloudError as Error */
  get: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    galleryScriptVersionName: string,
    options?: GalleryScriptVersionsGetOptionalParams,
  ) => Promise<GalleryScriptVersion>;
}

function _getGalleryScriptVersions(context: ComputeContext) {
  return {
    listByGalleryScript: (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      options?: GalleryScriptVersionsListByGalleryScriptOptionalParams,
    ) => listByGalleryScript(context, resourceGroupName, galleryName, galleryScriptName, options),
    delete: (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      galleryScriptVersionName: string,
      options?: GalleryScriptVersionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        galleryName,
        galleryScriptName,
        galleryScriptVersionName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      galleryScriptVersionName: string,
      options?: GalleryScriptVersionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        galleryName,
        galleryScriptName,
        galleryScriptVersionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      galleryScriptVersionName: string,
      options?: GalleryScriptVersionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        galleryName,
        galleryScriptName,
        galleryScriptVersionName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      galleryScriptVersionName: string,
      galleryScriptVersion: GalleryScriptVersionUpdate,
      options?: GalleryScriptVersionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        galleryName,
        galleryScriptName,
        galleryScriptVersionName,
        galleryScriptVersion,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      galleryScriptVersionName: string,
      galleryScriptVersion: GalleryScriptVersionUpdate,
      options?: GalleryScriptVersionsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        galleryName,
        galleryScriptName,
        galleryScriptVersionName,
        galleryScriptVersion,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      galleryScriptVersionName: string,
      galleryScriptVersion: GalleryScriptVersionUpdate,
      options?: GalleryScriptVersionsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        galleryName,
        galleryScriptName,
        galleryScriptVersionName,
        galleryScriptVersion,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      galleryScriptVersionName: string,
      galleryScriptVersion: GalleryScriptVersion,
      options?: GalleryScriptVersionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        galleryScriptName,
        galleryScriptVersionName,
        galleryScriptVersion,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      galleryScriptVersionName: string,
      galleryScriptVersion: GalleryScriptVersion,
      options?: GalleryScriptVersionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        galleryScriptName,
        galleryScriptVersionName,
        galleryScriptVersion,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      galleryScriptVersionName: string,
      galleryScriptVersion: GalleryScriptVersion,
      options?: GalleryScriptVersionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        galleryScriptName,
        galleryScriptVersionName,
        galleryScriptVersion,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      galleryScriptVersionName: string,
      options?: GalleryScriptVersionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        galleryName,
        galleryScriptName,
        galleryScriptVersionName,
        options,
      ),
  };
}

export function _getGalleryScriptVersionsOperations(
  context: ComputeContext,
): GalleryScriptVersionsOperations {
  return {
    ..._getGalleryScriptVersions(context),
  };
}
