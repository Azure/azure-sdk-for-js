// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  listByGallery,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/galleryScripts/operations.js";
import type {
  GalleryScriptsListByGalleryOptionalParams,
  GalleryScriptsDeleteOptionalParams,
  GalleryScriptsUpdateOptionalParams,
  GalleryScriptsCreateOrUpdateOptionalParams,
  GalleryScriptsGetOptionalParams,
} from "../../api/galleryScripts/options.js";
import type { GalleryScript, GalleryScriptUpdate } from "../../models/computeGallery/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GalleryScripts operations. */
export interface GalleryScriptsOperations {
  /** List gallery Script Definitions in a gallery. */
  listByGallery: (
    resourceGroupName: string,
    galleryName: string,
    options?: GalleryScriptsListByGalleryOptionalParams,
  ) => PagedAsyncIterableIterator<GalleryScript>;
  /** Delete a gallery Script Definition. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    options?: GalleryScriptsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    options?: GalleryScriptsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    options?: GalleryScriptsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a gallery Script Definition. */
  update: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    galleryScript: GalleryScriptUpdate,
    options?: GalleryScriptsUpdateOptionalParams,
  ) => PollerLike<OperationState<GalleryScript>, GalleryScript>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    galleryScript: GalleryScriptUpdate,
    options?: GalleryScriptsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GalleryScript>, GalleryScript>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    galleryScript: GalleryScriptUpdate,
    options?: GalleryScriptsUpdateOptionalParams,
  ) => Promise<GalleryScript>;
  /** Create or update a Gallery Script Definition. Gallery scripts allow the storage, sharing and reuse of common scripts */
  createOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    galleryScript: GalleryScript,
    options?: GalleryScriptsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<GalleryScript>, GalleryScript>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    galleryScript: GalleryScript,
    options?: GalleryScriptsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GalleryScript>, GalleryScript>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    galleryScript: GalleryScript,
    options?: GalleryScriptsCreateOrUpdateOptionalParams,
  ) => Promise<GalleryScript>;
  /** Retrieves information about a gallery script definition. */
  get: (
    resourceGroupName: string,
    galleryName: string,
    galleryScriptName: string,
    options?: GalleryScriptsGetOptionalParams,
  ) => Promise<GalleryScript>;
}

function _getGalleryScripts(context: ComputeContext) {
  return {
    listByGallery: (
      resourceGroupName: string,
      galleryName: string,
      options?: GalleryScriptsListByGalleryOptionalParams,
    ) => listByGallery(context, resourceGroupName, galleryName, options),
    delete: (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      options?: GalleryScriptsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, galleryName, galleryScriptName, options),
    beginDelete: async (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      options?: GalleryScriptsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, galleryName, galleryScriptName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      options?: GalleryScriptsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, galleryName, galleryScriptName, options);
    },
    update: (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      galleryScript: GalleryScriptUpdate,
      options?: GalleryScriptsUpdateOptionalParams,
    ) => update(context, resourceGroupName, galleryName, galleryScriptName, galleryScript, options),
    beginUpdate: async (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      galleryScript: GalleryScriptUpdate,
      options?: GalleryScriptsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        galleryName,
        galleryScriptName,
        galleryScript,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      galleryScript: GalleryScriptUpdate,
      options?: GalleryScriptsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        galleryName,
        galleryScriptName,
        galleryScript,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      galleryScript: GalleryScript,
      options?: GalleryScriptsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        galleryScriptName,
        galleryScript,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      galleryScript: GalleryScript,
      options?: GalleryScriptsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        galleryScriptName,
        galleryScript,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      galleryScript: GalleryScript,
      options?: GalleryScriptsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        galleryName,
        galleryScriptName,
        galleryScript,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      galleryName: string,
      galleryScriptName: string,
      options?: GalleryScriptsGetOptionalParams,
    ) => get(context, resourceGroupName, galleryName, galleryScriptName, options),
  };
}

export function _getGalleryScriptsOperations(context: ComputeContext): GalleryScriptsOperations {
  return {
    ..._getGalleryScripts(context),
  };
}
