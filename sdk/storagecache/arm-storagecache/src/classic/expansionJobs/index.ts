// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementContext } from "../../api/storageCacheManagementContext.js";
import {
  listByAmlFilesystem,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/expansionJobs/operations.js";
import {
  ExpansionJobsListByAmlFilesystemOptionalParams,
  ExpansionJobsDeleteOptionalParams,
  ExpansionJobsUpdateOptionalParams,
  ExpansionJobsCreateOrUpdateOptionalParams,
  ExpansionJobsGetOptionalParams,
} from "../../api/expansionJobs/options.js";
import { ExpansionJob, ExpansionJobUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExpansionJobs operations. */
export interface ExpansionJobsOperations {
  /** Returns all the expansion jobs the user has access to under an AML File System. */
  listByAmlFilesystem: (
    resourceGroupName: string,
    amlFilesystemName: string,
    options?: ExpansionJobsListByAmlFilesystemOptionalParams,
  ) => PagedAsyncIterableIterator<ExpansionJob>;
  /** Schedules an expansion job for deletion. */
  delete: (
    resourceGroupName: string,
    amlFilesystemName: string,
    expansionJobName: string,
    options?: ExpansionJobsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    amlFilesystemName: string,
    expansionJobName: string,
    options?: ExpansionJobsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    amlFilesystemName: string,
    expansionJobName: string,
    options?: ExpansionJobsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an expansion job instance. */
  update: (
    resourceGroupName: string,
    amlFilesystemName: string,
    expansionJobName: string,
    expansionJob: ExpansionJobUpdate,
    options?: ExpansionJobsUpdateOptionalParams,
  ) => PollerLike<OperationState<ExpansionJob>, ExpansionJob>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    amlFilesystemName: string,
    expansionJobName: string,
    expansionJob: ExpansionJobUpdate,
    options?: ExpansionJobsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ExpansionJob>, ExpansionJob>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    amlFilesystemName: string,
    expansionJobName: string,
    expansionJob: ExpansionJobUpdate,
    options?: ExpansionJobsUpdateOptionalParams,
  ) => Promise<ExpansionJob>;
  /** Create or update an expansion job. */
  createOrUpdate: (
    resourceGroupName: string,
    amlFilesystemName: string,
    expansionJobName: string,
    expansionJob: ExpansionJob,
    options?: ExpansionJobsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExpansionJob>, ExpansionJob>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    amlFilesystemName: string,
    expansionJobName: string,
    expansionJob: ExpansionJob,
    options?: ExpansionJobsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ExpansionJob>, ExpansionJob>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    amlFilesystemName: string,
    expansionJobName: string,
    expansionJob: ExpansionJob,
    options?: ExpansionJobsCreateOrUpdateOptionalParams,
  ) => Promise<ExpansionJob>;
  /** Returns an expansion job. */
  get: (
    resourceGroupName: string,
    amlFilesystemName: string,
    expansionJobName: string,
    options?: ExpansionJobsGetOptionalParams,
  ) => Promise<ExpansionJob>;
}

function _getExpansionJobs(context: StorageCacheManagementContext) {
  return {
    listByAmlFilesystem: (
      resourceGroupName: string,
      amlFilesystemName: string,
      options?: ExpansionJobsListByAmlFilesystemOptionalParams,
    ) => listByAmlFilesystem(context, resourceGroupName, amlFilesystemName, options),
    delete: (
      resourceGroupName: string,
      amlFilesystemName: string,
      expansionJobName: string,
      options?: ExpansionJobsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, amlFilesystemName, expansionJobName, options),
    beginDelete: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      expansionJobName: string,
      options?: ExpansionJobsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        amlFilesystemName,
        expansionJobName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      expansionJobName: string,
      options?: ExpansionJobsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        amlFilesystemName,
        expansionJobName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      amlFilesystemName: string,
      expansionJobName: string,
      expansionJob: ExpansionJobUpdate,
      options?: ExpansionJobsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        amlFilesystemName,
        expansionJobName,
        expansionJob,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      expansionJobName: string,
      expansionJob: ExpansionJobUpdate,
      options?: ExpansionJobsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        amlFilesystemName,
        expansionJobName,
        expansionJob,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      expansionJobName: string,
      expansionJob: ExpansionJobUpdate,
      options?: ExpansionJobsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        amlFilesystemName,
        expansionJobName,
        expansionJob,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      amlFilesystemName: string,
      expansionJobName: string,
      expansionJob: ExpansionJob,
      options?: ExpansionJobsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        amlFilesystemName,
        expansionJobName,
        expansionJob,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      expansionJobName: string,
      expansionJob: ExpansionJob,
      options?: ExpansionJobsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        amlFilesystemName,
        expansionJobName,
        expansionJob,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      expansionJobName: string,
      expansionJob: ExpansionJob,
      options?: ExpansionJobsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        amlFilesystemName,
        expansionJobName,
        expansionJob,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      amlFilesystemName: string,
      expansionJobName: string,
      options?: ExpansionJobsGetOptionalParams,
    ) => get(context, resourceGroupName, amlFilesystemName, expansionJobName, options),
  };
}

export function _getExpansionJobsOperations(
  context: StorageCacheManagementContext,
): ExpansionJobsOperations {
  return {
    ..._getExpansionJobs(context),
  };
}
