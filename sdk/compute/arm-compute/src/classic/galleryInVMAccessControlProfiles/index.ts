// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  listByGallery,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/galleryInVMAccessControlProfiles/operations.js";
import type {
  GalleryInVMAccessControlProfilesListByGalleryOptionalParams,
  GalleryInVMAccessControlProfilesDeleteOptionalParams,
  GalleryInVMAccessControlProfilesUpdateOptionalParams,
  GalleryInVMAccessControlProfilesCreateOrUpdateOptionalParams,
  GalleryInVMAccessControlProfilesGetOptionalParams,
} from "../../api/galleryInVMAccessControlProfiles/options.js";
import type {
  GalleryInVMAccessControlProfile,
  GalleryInVMAccessControlProfileUpdate,
} from "../../models/computeGallery/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GalleryInVMAccessControlProfiles operations. */
export interface GalleryInVMAccessControlProfilesOperations {
  /** List gallery inVMAccessControlProfiles in a gallery. */
  listByGallery: (
    resourceGroupName: string,
    galleryName: string,
    options?: GalleryInVMAccessControlProfilesListByGalleryOptionalParams,
  ) => PagedAsyncIterableIterator<GalleryInVMAccessControlProfile>;
  /** Delete a gallery inVMAccessControlProfile. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    options?: GalleryInVMAccessControlProfilesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    options?: GalleryInVMAccessControlProfilesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    options?: GalleryInVMAccessControlProfilesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a gallery inVMAccessControlProfile. */
  update: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    galleryInVMAccessControlProfile: GalleryInVMAccessControlProfileUpdate,
    options?: GalleryInVMAccessControlProfilesUpdateOptionalParams,
  ) => PollerLike<OperationState<GalleryInVMAccessControlProfile>, GalleryInVMAccessControlProfile>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    galleryInVMAccessControlProfile: GalleryInVMAccessControlProfileUpdate,
    options?: GalleryInVMAccessControlProfilesUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<GalleryInVMAccessControlProfile>,
      GalleryInVMAccessControlProfile
    >
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    galleryInVMAccessControlProfile: GalleryInVMAccessControlProfileUpdate,
    options?: GalleryInVMAccessControlProfilesUpdateOptionalParams,
  ) => Promise<GalleryInVMAccessControlProfile>;
  /** Create or update a gallery inVMAccessControlProfile. */
  createOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    galleryInVMAccessControlProfile: GalleryInVMAccessControlProfile,
    options?: GalleryInVMAccessControlProfilesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<GalleryInVMAccessControlProfile>, GalleryInVMAccessControlProfile>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    galleryInVMAccessControlProfile: GalleryInVMAccessControlProfile,
    options?: GalleryInVMAccessControlProfilesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<GalleryInVMAccessControlProfile>,
      GalleryInVMAccessControlProfile
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    galleryInVMAccessControlProfile: GalleryInVMAccessControlProfile,
    options?: GalleryInVMAccessControlProfilesCreateOrUpdateOptionalParams,
  ) => Promise<GalleryInVMAccessControlProfile>;
  /** Retrieves information about a gallery inVMAccessControlProfile. */
  get: (
    resourceGroupName: string,
    galleryName: string,
    inVMAccessControlProfileName: string,
    options?: GalleryInVMAccessControlProfilesGetOptionalParams,
  ) => Promise<GalleryInVMAccessControlProfile>;
}

function _getGalleryInVMAccessControlProfiles(context: ComputeContext) {
  return {
    listByGallery: (
      resourceGroupName: string,
      galleryName: string,
      options?: GalleryInVMAccessControlProfilesListByGalleryOptionalParams,
    ) => listByGallery(context, resourceGroupName, galleryName, options),
    delete: (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      options?: GalleryInVMAccessControlProfilesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, galleryName, inVMAccessControlProfileName, options),
    beginDelete: async (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      options?: GalleryInVMAccessControlProfilesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      options?: GalleryInVMAccessControlProfilesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      galleryInVMAccessControlProfile: GalleryInVMAccessControlProfileUpdate,
      options?: GalleryInVMAccessControlProfilesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        galleryInVMAccessControlProfile,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      galleryInVMAccessControlProfile: GalleryInVMAccessControlProfileUpdate,
      options?: GalleryInVMAccessControlProfilesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        galleryInVMAccessControlProfile,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      galleryInVMAccessControlProfile: GalleryInVMAccessControlProfileUpdate,
      options?: GalleryInVMAccessControlProfilesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        galleryInVMAccessControlProfile,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      galleryInVMAccessControlProfile: GalleryInVMAccessControlProfile,
      options?: GalleryInVMAccessControlProfilesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        galleryInVMAccessControlProfile,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      galleryInVMAccessControlProfile: GalleryInVMAccessControlProfile,
      options?: GalleryInVMAccessControlProfilesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        galleryInVMAccessControlProfile,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      galleryInVMAccessControlProfile: GalleryInVMAccessControlProfile,
      options?: GalleryInVMAccessControlProfilesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        galleryInVMAccessControlProfile,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      galleryName: string,
      inVMAccessControlProfileName: string,
      options?: GalleryInVMAccessControlProfilesGetOptionalParams,
    ) => get(context, resourceGroupName, galleryName, inVMAccessControlProfileName, options),
  };
}

export function _getGalleryInVMAccessControlProfilesOperations(
  context: ComputeContext,
): GalleryInVMAccessControlProfilesOperations {
  return {
    ..._getGalleryInVMAccessControlProfiles(context),
  };
}
