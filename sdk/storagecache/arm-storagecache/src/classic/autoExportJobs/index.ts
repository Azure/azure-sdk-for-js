// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageCacheManagementContext } from "../../api/storageCacheManagementContext.js";
import {
  listByAmlFilesystem,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/autoExportJobs/operations.js";
import type {
  AutoExportJobsListByAmlFilesystemOptionalParams,
  AutoExportJobsDeleteOptionalParams,
  AutoExportJobsUpdateOptionalParams,
  AutoExportJobsCreateOrUpdateOptionalParams,
  AutoExportJobsGetOptionalParams,
} from "../../api/autoExportJobs/options.js";
import type { AutoExportJob, AutoExportJobUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AutoExportJobs operations. */
export interface AutoExportJobsOperations {
  /** Returns all the auto export jobs the user has access to under an AML File System. */
  listByAmlFilesystem: (
    resourceGroupName: string,
    amlFilesystemName: string,
    options?: AutoExportJobsListByAmlFilesystemOptionalParams,
  ) => PagedAsyncIterableIterator<AutoExportJob>;
  /** Schedules an auto export job for deletion. */
  delete: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoExportJobName: string,
    options?: AutoExportJobsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoExportJobName: string,
    options?: AutoExportJobsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoExportJobName: string,
    options?: AutoExportJobsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an auto export job instance. */
  update: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoExportJobName: string,
    autoExportJob: AutoExportJobUpdate,
    options?: AutoExportJobsUpdateOptionalParams,
  ) => PollerLike<OperationState<AutoExportJob>, AutoExportJob>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoExportJobName: string,
    autoExportJob: AutoExportJobUpdate,
    options?: AutoExportJobsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AutoExportJob>, AutoExportJob>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoExportJobName: string,
    autoExportJob: AutoExportJobUpdate,
    options?: AutoExportJobsUpdateOptionalParams,
  ) => Promise<AutoExportJob>;
  /** Create or update an auto export job. */
  createOrUpdate: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoExportJobName: string,
    autoExportJob: AutoExportJob,
    options?: AutoExportJobsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AutoExportJob>, AutoExportJob>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoExportJobName: string,
    autoExportJob: AutoExportJob,
    options?: AutoExportJobsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AutoExportJob>, AutoExportJob>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoExportJobName: string,
    autoExportJob: AutoExportJob,
    options?: AutoExportJobsCreateOrUpdateOptionalParams,
  ) => Promise<AutoExportJob>;
  /** Returns an auto export job. */
  get: (
    resourceGroupName: string,
    amlFilesystemName: string,
    autoExportJobName: string,
    options?: AutoExportJobsGetOptionalParams,
  ) => Promise<AutoExportJob>;
}

function _getAutoExportJobs(context: StorageCacheManagementContext) {
  return {
    listByAmlFilesystem: (
      resourceGroupName: string,
      amlFilesystemName: string,
      options?: AutoExportJobsListByAmlFilesystemOptionalParams,
    ) => listByAmlFilesystem(context, resourceGroupName, amlFilesystemName, options),
    delete: (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoExportJobName: string,
      options?: AutoExportJobsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, amlFilesystemName, autoExportJobName, options),
    beginDelete: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoExportJobName: string,
      options?: AutoExportJobsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoExportJobName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoExportJobName: string,
      options?: AutoExportJobsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoExportJobName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoExportJobName: string,
      autoExportJob: AutoExportJobUpdate,
      options?: AutoExportJobsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoExportJobName,
        autoExportJob,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoExportJobName: string,
      autoExportJob: AutoExportJobUpdate,
      options?: AutoExportJobsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoExportJobName,
        autoExportJob,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoExportJobName: string,
      autoExportJob: AutoExportJobUpdate,
      options?: AutoExportJobsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoExportJobName,
        autoExportJob,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoExportJobName: string,
      autoExportJob: AutoExportJob,
      options?: AutoExportJobsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoExportJobName,
        autoExportJob,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoExportJobName: string,
      autoExportJob: AutoExportJob,
      options?: AutoExportJobsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoExportJobName,
        autoExportJob,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoExportJobName: string,
      autoExportJob: AutoExportJob,
      options?: AutoExportJobsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoExportJobName,
        autoExportJob,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      amlFilesystemName: string,
      autoExportJobName: string,
      options?: AutoExportJobsGetOptionalParams,
    ) => get(context, resourceGroupName, amlFilesystemName, autoExportJobName, options),
  };
}

export function _getAutoExportJobsOperations(
  context: StorageCacheManagementContext,
): AutoExportJobsOperations {
  return {
    ..._getAutoExportJobs(context),
  };
}
