// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  $delete,
  createOrUpdate,
  list,
  get,
} from "../../api/edgeMachineDiskPrivilegedJobs/operations.js";
import {
  EdgeMachineDiskPrivilegedJobsDeleteOptionalParams,
  EdgeMachineDiskPrivilegedJobsCreateOrUpdateOptionalParams,
  EdgeMachineDiskPrivilegedJobsListOptionalParams,
  EdgeMachineDiskPrivilegedJobsGetOptionalParams,
} from "../../api/edgeMachineDiskPrivilegedJobs/options.js";
import { EdgeMachineDiskPrivilegedJob } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeMachineDiskPrivilegedJobs operations. */
export interface EdgeMachineDiskPrivilegedJobsOperations {
  /** Delete a privileged job. */
  delete: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    privilegedJobName: string,
    options?: EdgeMachineDiskPrivilegedJobsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    privilegedJobName: string,
    options?: EdgeMachineDiskPrivilegedJobsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    privilegedJobName: string,
    options?: EdgeMachineDiskPrivilegedJobsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a privileged job. */
  createOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    privilegedJobName: string,
    resource: EdgeMachineDiskPrivilegedJob,
    options?: EdgeMachineDiskPrivilegedJobsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeMachineDiskPrivilegedJob>, EdgeMachineDiskPrivilegedJob>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    privilegedJobName: string,
    resource: EdgeMachineDiskPrivilegedJob,
    options?: EdgeMachineDiskPrivilegedJobsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<EdgeMachineDiskPrivilegedJob>, EdgeMachineDiskPrivilegedJob>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    privilegedJobName: string,
    resource: EdgeMachineDiskPrivilegedJob,
    options?: EdgeMachineDiskPrivilegedJobsCreateOrUpdateOptionalParams,
  ) => Promise<EdgeMachineDiskPrivilegedJob>;
  /** List all privileged jobs for a disk. */
  list: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    options?: EdgeMachineDiskPrivilegedJobsListOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeMachineDiskPrivilegedJob>;
  /** Get a specific privileged job. */
  get: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    privilegedJobName: string,
    options?: EdgeMachineDiskPrivilegedJobsGetOptionalParams,
  ) => Promise<EdgeMachineDiskPrivilegedJob>;
}

function _getEdgeMachineDiskPrivilegedJobs(context: AzureStackHCIContext) {
  return {
    delete: (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      privilegedJobName: string,
      options?: EdgeMachineDiskPrivilegedJobsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, edgeMachineName, diskName, privilegedJobName, options),
    beginDelete: async (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      privilegedJobName: string,
      options?: EdgeMachineDiskPrivilegedJobsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        edgeMachineName,
        diskName,
        privilegedJobName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      privilegedJobName: string,
      options?: EdgeMachineDiskPrivilegedJobsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        edgeMachineName,
        diskName,
        privilegedJobName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      privilegedJobName: string,
      resource: EdgeMachineDiskPrivilegedJob,
      options?: EdgeMachineDiskPrivilegedJobsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        diskName,
        privilegedJobName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      privilegedJobName: string,
      resource: EdgeMachineDiskPrivilegedJob,
      options?: EdgeMachineDiskPrivilegedJobsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        diskName,
        privilegedJobName,
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
      privilegedJobName: string,
      resource: EdgeMachineDiskPrivilegedJob,
      options?: EdgeMachineDiskPrivilegedJobsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        diskName,
        privilegedJobName,
        resource,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      options?: EdgeMachineDiskPrivilegedJobsListOptionalParams,
    ) => list(context, resourceGroupName, edgeMachineName, diskName, options),
    get: (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      privilegedJobName: string,
      options?: EdgeMachineDiskPrivilegedJobsGetOptionalParams,
    ) => get(context, resourceGroupName, edgeMachineName, diskName, privilegedJobName, options),
  };
}

export function _getEdgeMachineDiskPrivilegedJobsOperations(
  context: AzureStackHCIContext,
): EdgeMachineDiskPrivilegedJobsOperations {
  return {
    ..._getEdgeMachineDiskPrivilegedJobs(context),
  };
}
