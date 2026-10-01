// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageCacheManagementContext } from "../../api/storageCacheManagementContext.js";
import {
  listByAmlFilesystem,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/autoImportJobs/operations.js";
import type {
  AutoImportJobsListByAmlFilesystemOptionalParams,
  AutoImportJobsDeleteOptionalParams,
  AutoImportJobsUpdateOptionalParams,
  AutoImportJobsCreateOrUpdateOptionalParams,
  AutoImportJobsGetOptionalParams,
} from "../../api/autoImportJobs/options.js";
import type { AutoImportJob, AutoImportJobUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AutoImportJobs operations. */
export interface AutoImportJobsOperations {
  /** Returns all the auto import jobs the user has access to under an AML File System. */
  listByAmlFilesystem: (
    resourceGroupName: string,
    amlFilesystemName: string,
    options?: AutoImportJobsListByAmlFilesystemOptionalParams,
  ) => PagedAsyncIterableIterator<AutoImportJob>;
  /** Schedules an auto import job for deletion. */
  delete: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoImportJobName: string,
    options?: AutoImportJobsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoImportJobName: string,
    options?: AutoImportJobsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoImportJobName: string,
    options?: AutoImportJobsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an auto import job instance. */
  update: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoImportJobName: string,
    autoImportJob: AutoImportJobUpdate,
    options?: AutoImportJobsUpdateOptionalParams,
  ) => PollerLike<OperationState<AutoImportJob>, AutoImportJob>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoImportJobName: string,
    autoImportJob: AutoImportJobUpdate,
    options?: AutoImportJobsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AutoImportJob>, AutoImportJob>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoImportJobName: string,
    autoImportJob: AutoImportJobUpdate,
    options?: AutoImportJobsUpdateOptionalParams,
  ) => Promise<AutoImportJob>;
  /** Create or update an auto import job. */
  createOrUpdate: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoImportJobName: string,
    autoImportJob: AutoImportJob,
    options?: AutoImportJobsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AutoImportJob>, AutoImportJob>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoImportJobName: string,
    autoImportJob: AutoImportJob,
    options?: AutoImportJobsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AutoImportJob>, AutoImportJob>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoImportJobName: string,
    autoImportJob: AutoImportJob,
    options?: AutoImportJobsCreateOrUpdateOptionalParams,
  ) => Promise<AutoImportJob>;
  /** Returns an auto import job. */
  get: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoImportJobName: string,
    options?: AutoImportJobsGetOptionalParams,
  ) => Promise<AutoImportJob>;
}

function _getAutoImportJobs(context: StorageCacheManagementContext) {
  return {
    listByAmlFilesystem: (
      resourceGroupName: string,
      amlFilesystemName: string,
      options?: AutoImportJobsListByAmlFilesystemOptionalParams,
    ) => listByAmlFilesystem(context, resourceGroupName, amlFilesystemName, options),
    delete: (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoImportJobName: string,
      options?: AutoImportJobsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, amlFilesystemName, autoImportJobName, options),
    beginDelete: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoImportJobName: string,
      options?: AutoImportJobsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoImportJobName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoImportJobName: string,
      options?: AutoImportJobsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoImportJobName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoImportJobName: string,
      autoImportJob: AutoImportJobUpdate,
      options?: AutoImportJobsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoImportJobName,
        autoImportJob,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoImportJobName: string,
      autoImportJob: AutoImportJobUpdate,
      options?: AutoImportJobsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoImportJobName,
        autoImportJob,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoImportJobName: string,
      autoImportJob: AutoImportJobUpdate,
      options?: AutoImportJobsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoImportJobName,
        autoImportJob,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoImportJobName: string,
      autoImportJob: AutoImportJob,
      options?: AutoImportJobsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoImportJobName,
        autoImportJob,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoImportJobName: string,
      autoImportJob: AutoImportJob,
      options?: AutoImportJobsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoImportJobName,
        autoImportJob,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoImportJobName: string,
      autoImportJob: AutoImportJob,
      options?: AutoImportJobsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoImportJobName,
        autoImportJob,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoImportJobName: string,
      options?: AutoImportJobsGetOptionalParams,
    ) => get(context, resourceGroupName, amlFilesystemName, autoImportJobName, options),
  };
}

export function _getAutoImportJobsOperations(
  context: StorageCacheManagementContext,
): AutoImportJobsOperations {
  return {
    ..._getAutoImportJobs(context),
  };
}
