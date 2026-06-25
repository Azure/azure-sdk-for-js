// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/edgeMachineGpuJobs/operations.js";
import {
  EdgeMachineGpuJobsListOptionalParams,
  EdgeMachineGpuJobsDeleteOptionalParams,
  EdgeMachineGpuJobsCreateOrUpdateOptionalParams,
  EdgeMachineGpuJobsGetOptionalParams,
} from "../../api/edgeMachineGpuJobs/options.js";
import { EdgeMachineGpuJob } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeMachineGpuJobs operations. */
export interface EdgeMachineGpuJobsOperations {
  /** List EdgeMachineGpuJob resources by EdgeMachineGpu. */
  list: (
    resourceGroupName: string,
    edgeMachineName: string,
    gpuName: string,
    options?: EdgeMachineGpuJobsListOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeMachineGpuJob>;
  /** Delete a specific GPU Job on an Edge Machine GPU. */
  delete: (
    resourceGroupName: string,
    edgeMachineName: string,
    gpuName: string,
    jobsName: string,
    options?: EdgeMachineGpuJobsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    edgeMachineName: string,
    gpuName: string,
    jobsName: string,
    options?: EdgeMachineGpuJobsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    gpuName: string,
    jobsName: string,
    options?: EdgeMachineGpuJobsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a GPU Job on an Edge Machine GPU. */
  createOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    gpuName: string,
    jobsName: string,
    resource: EdgeMachineGpuJob,
    options?: EdgeMachineGpuJobsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeMachineGpuJob>, EdgeMachineGpuJob>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    gpuName: string,
    jobsName: string,
    resource: EdgeMachineGpuJob,
    options?: EdgeMachineGpuJobsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EdgeMachineGpuJob>, EdgeMachineGpuJob>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    gpuName: string,
    jobsName: string,
    resource: EdgeMachineGpuJob,
    options?: EdgeMachineGpuJobsCreateOrUpdateOptionalParams,
  ) => Promise<EdgeMachineGpuJob>;
  /** Get a specific GPU Job on an Edge Machine GPU. */
  get: (
    resourceGroupName: string,
    edgeMachineName: string,
    gpuName: string,
    jobsName: string,
    options?: EdgeMachineGpuJobsGetOptionalParams,
  ) => Promise<EdgeMachineGpuJob>;
}

function _getEdgeMachineGpuJobs(context: AzureStackHCIContext) {
  return {
    list: (
      resourceGroupName: string,
      edgeMachineName: string,
      gpuName: string,
      options?: EdgeMachineGpuJobsListOptionalParams,
    ) => list(context, resourceGroupName, edgeMachineName, gpuName, options),
    delete: (
      resourceGroupName: string,
      edgeMachineName: string,
      gpuName: string,
      jobsName: string,
      options?: EdgeMachineGpuJobsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, edgeMachineName, gpuName, jobsName, options),
    beginDelete: async (
      resourceGroupName: string,
      edgeMachineName: string,
      gpuName: string,
      jobsName: string,
      options?: EdgeMachineGpuJobsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        edgeMachineName,
        gpuName,
        jobsName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      gpuName: string,
      jobsName: string,
      options?: EdgeMachineGpuJobsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, edgeMachineName, gpuName, jobsName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      edgeMachineName: string,
      gpuName: string,
      jobsName: string,
      resource: EdgeMachineGpuJob,
      options?: EdgeMachineGpuJobsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        gpuName,
        jobsName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      edgeMachineName: string,
      gpuName: string,
      jobsName: string,
      resource: EdgeMachineGpuJob,
      options?: EdgeMachineGpuJobsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        gpuName,
        jobsName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      gpuName: string,
      jobsName: string,
      resource: EdgeMachineGpuJob,
      options?: EdgeMachineGpuJobsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        gpuName,
        jobsName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      edgeMachineName: string,
      gpuName: string,
      jobsName: string,
      options?: EdgeMachineGpuJobsGetOptionalParams,
    ) => get(context, resourceGroupName, edgeMachineName, gpuName, jobsName, options),
  };
}

export function _getEdgeMachineGpuJobsOperations(
  context: AzureStackHCIContext,
): EdgeMachineGpuJobsOperations {
  return {
    ..._getEdgeMachineGpuJobs(context),
  };
}
