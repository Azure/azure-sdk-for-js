// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { $delete, createOrUpdate, list, get } from "../../api/edgeMachineDiskJobs/operations.js";
import {
  EdgeMachineDiskJobsDeleteOptionalParams,
  EdgeMachineDiskJobsCreateOrUpdateOptionalParams,
  EdgeMachineDiskJobsListOptionalParams,
  EdgeMachineDiskJobsGetOptionalParams,
} from "../../api/edgeMachineDiskJobs/options.js";
import { EdgeMachineDiskJob } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeMachineDiskJobs operations. */
export interface EdgeMachineDiskJobsOperations {
  /** Delete a disk job. */
  delete: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    jobName: string,
    options?: EdgeMachineDiskJobsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    jobName: string,
    options?: EdgeMachineDiskJobsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    jobName: string,
    options?: EdgeMachineDiskJobsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a disk job. */
  createOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    jobName: string,
    resource: EdgeMachineDiskJob,
    options?: EdgeMachineDiskJobsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeMachineDiskJob>, EdgeMachineDiskJob>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    jobName: string,
    resource: EdgeMachineDiskJob,
    options?: EdgeMachineDiskJobsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EdgeMachineDiskJob>, EdgeMachineDiskJob>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    jobName: string,
    resource: EdgeMachineDiskJob,
    options?: EdgeMachineDiskJobsCreateOrUpdateOptionalParams,
  ) => Promise<EdgeMachineDiskJob>;
  /** List all jobs for a disk. */
  list: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    options?: EdgeMachineDiskJobsListOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeMachineDiskJob>;
  /** Get a specific disk job. */
  get: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    jobName: string,
    options?: EdgeMachineDiskJobsGetOptionalParams,
  ) => Promise<EdgeMachineDiskJob>;
}

function _getEdgeMachineDiskJobs(context: AzureStackHCIContext) {
  return {
    delete: (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      jobName: string,
      options?: EdgeMachineDiskJobsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, edgeMachineName, diskName, jobName, options),
    beginDelete: async (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      jobName: string,
      options?: EdgeMachineDiskJobsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        edgeMachineName,
        diskName,
        jobName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      jobName: string,
      options?: EdgeMachineDiskJobsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, edgeMachineName, diskName, jobName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      jobName: string,
      resource: EdgeMachineDiskJob,
      options?: EdgeMachineDiskJobsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        diskName,
        jobName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      jobName: string,
      resource: EdgeMachineDiskJob,
      options?: EdgeMachineDiskJobsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        diskName,
        jobName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      jobName: string,
      resource: EdgeMachineDiskJob,
      options?: EdgeMachineDiskJobsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        diskName,
        jobName,
        resource,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      options?: EdgeMachineDiskJobsListOptionalParams,
    ) => list(context, resourceGroupName, edgeMachineName, diskName, options),
    get: (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      jobName: string,
      options?: EdgeMachineDiskJobsGetOptionalParams,
    ) => get(context, resourceGroupName, edgeMachineName, diskName, jobName, options),
  };
}

export function _getEdgeMachineDiskJobsOperations(
  context: AzureStackHCIContext,
): EdgeMachineDiskJobsOperations {
  return {
    ..._getEdgeMachineDiskJobs(context),
  };
}
