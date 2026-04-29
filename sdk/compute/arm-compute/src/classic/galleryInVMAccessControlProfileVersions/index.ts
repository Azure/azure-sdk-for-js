// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  listByGalleryInVMAccessControlProfile,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/galleryInVMAccessControlProfileVersions/operations.js";
import type {
  GalleryInVMAccessControlProfileVersionsListByGalleryInVMAccessControlProfileOptionalParams,
  GalleryInVMAccessControlProfileVersionsDeleteOptionalParams,
  GalleryInVMAccessControlProfileVersionsUpdateOptionalParams,
  GalleryInVMAccessControlProfileVersionsCreateOrUpdateOptionalParams,
  GalleryInVMAccessControlProfileVersionsGetOptionalParams,
} from "../../api/galleryInVMAccessControlProfileVersions/options.js";
import type {
  GalleryInVMAccessControlProfileVersion,
  GalleryInVMAccessControlProfileVersionUpdate,
} from "../../models/computeGallery/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GalleryInVMAccessControlProfileVersions operations. */
export interface GalleryInVMAccessControlProfileVersionsOperations {
  /** List gallery inVMAccessControlProfile versions in a gallery inVMAccessControlProfile */
  listByGalleryInVMAccessControlProfile: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    options?: GalleryInVMAccessControlProfileVersionsListByGalleryInVMAccessControlProfileOptionalParams,
  ) => PagedAsyncIterableIterator<GalleryInVMAccessControlProfileVersion>;
  /** Delete a gallery inVMAccessControlProfile version. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    inVMAccessControlProfileVersionName: string,
    options?: GalleryInVMAccessControlProfileVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    inVMAccessControlProfileVersionName: string,
    options?: GalleryInVMAccessControlProfileVersionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    inVMAccessControlProfileVersionName: string,
    options?: GalleryInVMAccessControlProfileVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a gallery inVMAccessControlProfile version. */
  update: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    inVMAccessControlProfileVersionName: string,
    galleryInVMAccessControlProfileVersion: GalleryInVMAccessControlProfileVersionUpdate,
    options?: GalleryInVMAccessControlProfileVersionsUpdateOptionalParams,
  ) => PollerLike<
    OperationState<GalleryInVMAccessControlProfileVersion>,
    GalleryInVMAccessControlProfileVersion
  >;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    inVMAccessControlProfileVersionName: string,
    galleryInVMAccessControlProfileVersion: GalleryInVMAccessControlProfileVersionUpdate,
    options?: GalleryInVMAccessControlProfileVersionsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<GalleryInVMAccessControlProfileVersion>,
      GalleryInVMAccessControlProfileVersion
    >
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    inVMAccessControlProfileVersionName: string,
    galleryInVMAccessControlProfileVersion: GalleryInVMAccessControlProfileVersionUpdate,
    options?: GalleryInVMAccessControlProfileVersionsUpdateOptionalParams,
  ) => Promise<GalleryInVMAccessControlProfileVersion>;
  /** Create or update a gallery inVMAccessControlProfile version. */
  createOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    inVMAccessControlProfileVersionName: string,
    galleryInVMAccessControlProfileVersion: GalleryInVMAccessControlProfileVersion,
    options?: GalleryInVMAccessControlProfileVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<GalleryInVMAccessControlProfileVersion>,
    GalleryInVMAccessControlProfileVersion
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    inVMAccessControlProfileVersionName: string,
    galleryInVMAccessControlProfileVersion: GalleryInVMAccessControlProfileVersion,
    options?: GalleryInVMAccessControlProfileVersionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<GalleryInVMAccessControlProfileVersion>,
      GalleryInVMAccessControlProfileVersion
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    inVMAccessControlProfileVersionName: string,
    galleryInVMAccessControlProfileVersion: GalleryInVMAccessControlProfileVersion,
    options?: GalleryInVMAccessControlProfileVersionsCreateOrUpdateOptionalParams,
  ) => Promise<GalleryInVMAccessControlProfileVersion>;
  /** Retrieves information about a gallery inVMAccessControlProfile version. */
  get: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    inVMAccessControlProfileVersionName: string,
    options?: GalleryInVMAccessControlProfileVersionsGetOptionalParams,
  ) => Promise<GalleryInVMAccessControlProfileVersion>;
}

function _getGalleryInVMAccessControlProfileVersions(context: ComputeManagementContext) {
  return {
    listByGalleryInVMAccessControlProfile: (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      options?: GalleryInVMAccessControlProfileVersionsListByGalleryInVMAccessControlProfileOptionalParams,
    ) =>
      listByGalleryInVMAccessControlProfile(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      inVMAccessControlProfileVersionName: string,
      options?: GalleryInVMAccessControlProfileVersionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        inVMAccessControlProfileVersionName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      inVMAccessControlProfileVersionName: string,
      options?: GalleryInVMAccessControlProfileVersionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        inVMAccessControlProfileVersionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      inVMAccessControlProfileVersionName: string,
      options?: GalleryInVMAccessControlProfileVersionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        inVMAccessControlProfileVersionName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      inVMAccessControlProfileVersionName: string,
      galleryInVMAccessControlProfileVersion: GalleryInVMAccessControlProfileVersionUpdate,
      options?: GalleryInVMAccessControlProfileVersionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        inVMAccessControlProfileVersionName,
        galleryInVMAccessControlProfileVersion,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      inVMAccessControlProfileVersionName: string,
      galleryInVMAccessControlProfileVersion: GalleryInVMAccessControlProfileVersionUpdate,
      options?: GalleryInVMAccessControlProfileVersionsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        inVMAccessControlProfileVersionName,
        galleryInVMAccessControlProfileVersion,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      inVMAccessControlProfileVersionName: string,
      galleryInVMAccessControlProfileVersion: GalleryInVMAccessControlProfileVersionUpdate,
      options?: GalleryInVMAccessControlProfileVersionsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        inVMAccessControlProfileVersionName,
        galleryInVMAccessControlProfileVersion,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      inVMAccessControlProfileVersionName: string,
      galleryInVMAccessControlProfileVersion: GalleryInVMAccessControlProfileVersion,
      options?: GalleryInVMAccessControlProfileVersionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        inVMAccessControlProfileVersionName,
        galleryInVMAccessControlProfileVersion,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      inVMAccessControlProfileVersionName: string,
      galleryInVMAccessControlProfileVersion: GalleryInVMAccessControlProfileVersion,
      options?: GalleryInVMAccessControlProfileVersionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        inVMAccessControlProfileVersionName,
        galleryInVMAccessControlProfileVersion,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      inVMAccessControlProfileVersionName: string,
      galleryInVMAccessControlProfileVersion: GalleryInVMAccessControlProfileVersion,
      options?: GalleryInVMAccessControlProfileVersionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        inVMAccessControlProfileVersionName,
        galleryInVMAccessControlProfileVersion,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      inVMAccessControlProfileVersionName: string,
      options?: GalleryInVMAccessControlProfileVersionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        inVMAccessControlProfileVersionName,
        options,
      ),
  };
}

export function _getGalleryInVMAccessControlProfileVersionsOperations(
  context: ComputeManagementContext,
): GalleryInVMAccessControlProfileVersionsOperations {
  return {
    ..._getGalleryInVMAccessControlProfileVersions(context),
  };
}
