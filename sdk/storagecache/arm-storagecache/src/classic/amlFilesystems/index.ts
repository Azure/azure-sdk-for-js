// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageCacheManagementContext } from "../../api/storageCacheManagementContext.js";
import {
  cancelArchive,
  archive,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/amlFilesystems/operations.js";
import type {
  AmlFilesystemsCancelArchiveOptionalParams,
  AmlFilesystemsArchiveOptionalParams,
  AmlFilesystemsListOptionalParams,
  AmlFilesystemsListByResourceGroupOptionalParams,
  AmlFilesystemsDeleteOptionalParams,
  AmlFilesystemsUpdateOptionalParams,
  AmlFilesystemsCreateOrUpdateOptionalParams,
  AmlFilesystemsGetOptionalParams,
} from "../../api/amlFilesystems/options.js";
import type { AmlFilesystem, AmlFilesystemUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AmlFilesystems operations. */
export interface AmlFilesystemsOperations {
  /** Cancel archiving data from the AML file system. */
  cancelArchive: (
    resourceGroupName: string,
    amlFilesystemName: string,
    options?: AmlFilesystemsCancelArchiveOptionalParams,
  ) => Promise<void>;
  /** Archive data from the AML file system. */
  archive: (
    resourceGroupName: string,
    amlFilesystemName: string,
    options?: AmlFilesystemsArchiveOptionalParams,
  ) => Promise<void>;
  /** Returns all AML file systems the user has access to under a subscription. */
  list: (options?: AmlFilesystemsListOptionalParams) => PagedAsyncIterableIterator<AmlFilesystem>;
  /** Returns all AML file systems the user has access to under a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AmlFilesystemsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AmlFilesystem>;
  /** Schedules an AML file system for deletion. */
  delete: (
    resourceGroupName: string,
    amlFilesystemName: string,
    options?: AmlFilesystemsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    amlFilesystemName: string,
    options?: AmlFilesystemsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    amlFilesystemName: string,
    options?: AmlFilesystemsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an AML file system instance. */
  update: (
    resourceGroupName: string,
    amlFilesystemName: string,
    amlFilesystem: AmlFilesystemUpdate,
    options?: AmlFilesystemsUpdateOptionalParams,
  ) => PollerLike<OperationState<AmlFilesystem>, AmlFilesystem>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    amlFilesystemName: string,
    amlFilesystem: AmlFilesystemUpdate,
    options?: AmlFilesystemsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AmlFilesystem>, AmlFilesystem>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    amlFilesystemName: string,
    amlFilesystem: AmlFilesystemUpdate,
    options?: AmlFilesystemsUpdateOptionalParams,
  ) => Promise<AmlFilesystem>;
  /** Create or update an AML file system. */
  createOrUpdate: (
    resourceGroupName: string,
    amlFilesystemName: string,
    amlFilesystem: AmlFilesystem,
    options?: AmlFilesystemsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AmlFilesystem>, AmlFilesystem>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    amlFilesystemName: string,
    amlFilesystem: AmlFilesystem,
    options?: AmlFilesystemsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AmlFilesystem>, AmlFilesystem>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    amlFilesystemName: string,
    amlFilesystem: AmlFilesystem,
    options?: AmlFilesystemsCreateOrUpdateOptionalParams,
  ) => Promise<AmlFilesystem>;
  /** Returns an AML file system. */
  get: (
    resourceGroupName: string,
    amlFilesystemName: string,
    options?: AmlFilesystemsGetOptionalParams,
  ) => Promise<AmlFilesystem>;
}

function _getAmlFilesystems(context: StorageCacheManagementContext) {
  return {
    cancelArchive: (
      resourceGroupName: string,
      amlFilesystemName: string,
      options?: AmlFilesystemsCancelArchiveOptionalParams,
    ) => cancelArchive(context, resourceGroupName, amlFilesystemName, options),
    archive: (
      resourceGroupName: string,
      amlFilesystemName: string,
      options?: AmlFilesystemsArchiveOptionalParams,
    ) => archive(context, resourceGroupName, amlFilesystemName, options),
    list: (options?: AmlFilesystemsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AmlFilesystemsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      amlFilesystemName: string,
      options?: AmlFilesystemsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, amlFilesystemName, options),
    beginDelete: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      options?: AmlFilesystemsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, amlFilesystemName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      options?: AmlFilesystemsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, amlFilesystemName, options);
    },
    update: (
      resourceGroupName: string,
      amlFilesystemName: string,
      amlFilesystem: AmlFilesystemUpdate,
      options?: AmlFilesystemsUpdateOptionalParams,
    ) => update(context, resourceGroupName, amlFilesystemName, amlFilesystem, options),
    beginUpdate: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      amlFilesystem: AmlFilesystemUpdate,
      options?: AmlFilesystemsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, amlFilesystemName, amlFilesystem, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      amlFilesystem: AmlFilesystemUpdate,
      options?: AmlFilesystemsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, amlFilesystemName, amlFilesystem, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      amlFilesystemName: string,
      amlFilesystem: AmlFilesystem,
      options?: AmlFilesystemsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, amlFilesystemName, amlFilesystem, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      amlFilesystem: AmlFilesystem,
      options?: AmlFilesystemsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        amlFilesystemName,
        amlFilesystem,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      amlFilesystem: AmlFilesystem,
      options?: AmlFilesystemsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        amlFilesystemName,
        amlFilesystem,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      amlFilesystemName: string,
      options?: AmlFilesystemsGetOptionalParams,
    ) => get(context, resourceGroupName, amlFilesystemName, options),
  };
}

export function _getAmlFilesystemsOperations(
  context: StorageCacheManagementContext,
): AmlFilesystemsOperations {
  return {
    ..._getAmlFilesystems(context),
  };
}
