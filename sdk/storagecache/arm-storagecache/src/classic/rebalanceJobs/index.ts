// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageCacheManagementContext } from "../../api/storageCacheManagementContext.js";
import { listByAmlFilesystem, $delete, update, get } from "../../api/rebalanceJobs/operations.js";
import type {
  RebalanceJobsListByAmlFilesystemOptionalParams,
  RebalanceJobsDeleteOptionalParams,
  RebalanceJobsUpdateOptionalParams,
  RebalanceJobsGetOptionalParams,
} from "../../api/rebalanceJobs/options.js";
import type { RebalanceJob, RebalanceJobUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RebalanceJobs operations. */
export interface RebalanceJobsOperations {
  /** Returns all the rebalance jobs the user has access to under an AML File System. */
  listByAmlFilesystem: (
    resourceGroupName: string,
    amlFilesystemName: string,
    options?: RebalanceJobsListByAmlFilesystemOptionalParams,
  ) => PagedAsyncIterableIterator<RebalanceJob>;
  /** Schedules a rebalance job for deletion. */
  delete: (
    resourceGroupName: string,
    amlFilesystemName: string,
    rebalanceJobName: string,
    options?: RebalanceJobsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    amlFilesystemName: string,
    rebalanceJobName: string,
    options?: RebalanceJobsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    amlFilesystemName: string,
    rebalanceJobName: string,
    options?: RebalanceJobsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a rebalance job instance. */
  update: (
    resourceGroupName: string,
    amlFilesystemName: string,
    rebalanceJobName: string,
    properties: RebalanceJobUpdate,
    options?: RebalanceJobsUpdateOptionalParams,
  ) => PollerLike<OperationState<RebalanceJob>, RebalanceJob>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    amlFilesystemName: string,
    rebalanceJobName: string,
    properties: RebalanceJobUpdate,
    options?: RebalanceJobsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RebalanceJob>, RebalanceJob>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    amlFilesystemName: string,
    rebalanceJobName: string,
    properties: RebalanceJobUpdate,
    options?: RebalanceJobsUpdateOptionalParams,
  ) => Promise<RebalanceJob>;
  /** Returns a rebalance job. */
  get: (
    resourceGroupName: string,
    amlFilesystemName: string,
    rebalanceJobName: string,
    options?: RebalanceJobsGetOptionalParams,
  ) => Promise<RebalanceJob>;
}

function _getRebalanceJobs(context: StorageCacheManagementContext) {
  return {
    listByAmlFilesystem: (
      resourceGroupName: string,
      amlFilesystemName: string,
      options?: RebalanceJobsListByAmlFilesystemOptionalParams,
    ) => listByAmlFilesystem(context, resourceGroupName, amlFilesystemName, options),
    delete: (
      resourceGroupName: string,
      amlFilesystemName: string,
      rebalanceJobName: string,
      options?: RebalanceJobsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, amlFilesystemName, rebalanceJobName, options),
    beginDelete: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      rebalanceJobName: string,
      options?: RebalanceJobsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        amlFilesystemName,
        rebalanceJobName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      rebalanceJobName: string,
      options?: RebalanceJobsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        amlFilesystemName,
        rebalanceJobName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      amlFilesystemName: string,
      rebalanceJobName: string,
      properties: RebalanceJobUpdate,
      options?: RebalanceJobsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, amlFilesystemName, rebalanceJobName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      rebalanceJobName: string,
      properties: RebalanceJobUpdate,
      options?: RebalanceJobsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        amlFilesystemName,
        rebalanceJobName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      amlFilesystemName: string,
      rebalanceJobName: string,
      properties: RebalanceJobUpdate,
      options?: RebalanceJobsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        amlFilesystemName,
        rebalanceJobName,
        properties,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      amlFilesystemName: string,
      rebalanceJobName: string,
      options?: RebalanceJobsGetOptionalParams,
    ) => get(context, resourceGroupName, amlFilesystemName, rebalanceJobName, options),
  };
}

export function _getRebalanceJobsOperations(
  context: StorageCacheManagementContext,
): RebalanceJobsOperations {
  return {
    ..._getRebalanceJobs(context),
  };
}
