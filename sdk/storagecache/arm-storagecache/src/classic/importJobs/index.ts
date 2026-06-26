// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementContext } from "../../api/storageCacheManagementContext.js";
import {
  listByAmlFilesystem,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/importJobs/operations.js";
import {
  ImportJobsListByAmlFilesystemOptionalParams,
  ImportJobsDeleteOptionalParams,
  ImportJobsUpdateOptionalParams,
  ImportJobsCreateOrUpdateOptionalParams,
  ImportJobsGetOptionalParams,
} from "../../api/importJobs/options.js";
import { ImportJob, ImportJobUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ImportJobs operations. */
export interface ImportJobsOperations {
  /** Returns all import jobs the user has access to under an AML File System. */
  listByAmlFilesystem: (
    resourceGroupName: string,
    amlFilesystemName: string,
    options?: ImportJobsListByAmlFilesystemOptionalParams,
  ) => PagedAsyncIterableIterator<ImportJob>;
  /** Schedules an import job for deletion. */
  delete: (
    resourceGroupName: string,
    amlFilesystemName: string,
    importJobName: string,
    options?: ImportJobsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    amlFilesystemName: string,
    importJobName: string,
    options?: ImportJobsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    amlFilesystemName: string,
    importJobName: string,
    options?: ImportJobsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an import job instance. */
  update: (
    resourceGroupName: string,
    amlFilesystemName: string,
    importJobName: string,
    importJob: ImportJobUpdate,
    options?: ImportJobsUpdateOptionalParams,
  ) => PollerLike<OperationState<ImportJob>, ImportJob>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    amlFilesystemName: string,
    importJobName: string,
    importJob: ImportJobUpdate,
    options?: ImportJobsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ImportJob>, ImportJob>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    amlFilesystemName: string,
    importJobName: string,
    importJob: ImportJobUpdate,
    options?: ImportJobsUpdateOptionalParams,
  ) => Promise<ImportJob>;
  /** Create or update an import job. */
  createOrUpdate: (
    resourceGroupName: string,
    amlFilesystemName: string,
    importJobName: string,
    importJob: ImportJob,
    options?: ImportJobsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ImportJob>, ImportJob>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    amlFilesystemName: string,
    importJobName: string,
    importJob: ImportJob,
    options?: ImportJobsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ImportJob>, ImportJob>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    amlFilesystemName: string,
    importJobName: string,
    importJob: ImportJob,
    options?: ImportJobsCreateOrUpdateOptionalParams,
  ) => Promise<ImportJob>;
  /** Returns an import job. */
  get: (
    resourceGroupName: string,
    amlFilesystemName: string,
    importJobName: string,
    options?: ImportJobsGetOptionalParams,
  ) => Promise<ImportJob>;
}

function _getImportJobs(context: StorageCacheManagementContext) {
  return {
    listByAmlFilesystem: (
      resourceGroupName: string,
      amlFilesystemName: string,
      options?: ImportJobsListByAmlFilesystemOptionalParams,
    ) => listByAmlFilesystem(context, resourceGroupName, amlFilesystemName, options),
    delete: (
      resourceGroupName: string,
      amlFilesystemName: string,
      importJobName: string,
      options?: ImportJobsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, amlFilesystemName, importJobName, options),
    beginDelete: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      importJobName: string,
      options?: ImportJobsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, amlFilesystemName, importJobName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      importJobName: string,
      options?: ImportJobsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, amlFilesystemName, importJobName, options);
    },
    update: (
      resourceGroupName: string,
      amlFilesystemName: string,
      importJobName: string,
      importJob: ImportJobUpdate,
      options?: ImportJobsUpdateOptionalParams,
    ) => update(context, resourceGroupName, amlFilesystemName, importJobName, importJob, options),
    beginUpdate: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      importJobName: string,
      importJob: ImportJobUpdate,
      options?: ImportJobsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        amlFilesystemName,
        importJobName,
        importJob,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      importJobName: string,
      importJob: ImportJobUpdate,
      options?: ImportJobsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        amlFilesystemName,
        importJobName,
        importJob,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      amlFilesystemName: string,
      importJobName: string,
      importJob: ImportJob,
      options?: ImportJobsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        amlFilesystemName,
        importJobName,
        importJob,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      importJobName: string,
      importJob: ImportJob,
      options?: ImportJobsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        amlFilesystemName,
        importJobName,
        importJob,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      importJobName: string,
      importJob: ImportJob,
      options?: ImportJobsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        amlFilesystemName,
        importJobName,
        importJob,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      amlFilesystemName: string,
      importJobName: string,
      options?: ImportJobsGetOptionalParams,
    ) => get(context, resourceGroupName, amlFilesystemName, importJobName, options),
  };
}

export function _getImportJobsOperations(
  context: StorageCacheManagementContext,
): ImportJobsOperations {
  return {
    ..._getImportJobs(context),
  };
}
