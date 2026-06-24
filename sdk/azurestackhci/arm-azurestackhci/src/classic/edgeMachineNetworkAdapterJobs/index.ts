// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  $delete,
  createOrUpdate,
  list,
  get,
} from "../../api/edgeMachineNetworkAdapterJobs/operations.js";
import {
  EdgeMachineNetworkAdapterJobsDeleteOptionalParams,
  EdgeMachineNetworkAdapterJobsCreateOrUpdateOptionalParams,
  EdgeMachineNetworkAdapterJobsListOptionalParams,
  EdgeMachineNetworkAdapterJobsGetOptionalParams,
} from "../../api/edgeMachineNetworkAdapterJobs/options.js";
import { EdgeMachineNetworkAdapterJob } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeMachineNetworkAdapterJobs operations. */
export interface EdgeMachineNetworkAdapterJobsOperations {
  /** Delete a network adapter job. */
  delete: (
    resourceGroupName: string,
    edgeMachineName: string,
    networkAdapterName: string,
    jobName: string,
    options?: EdgeMachineNetworkAdapterJobsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    edgeMachineName: string,
    networkAdapterName: string,
    jobName: string,
    options?: EdgeMachineNetworkAdapterJobsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    networkAdapterName: string,
    jobName: string,
    options?: EdgeMachineNetworkAdapterJobsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a network adapter job. */
  createOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    networkAdapterName: string,
    jobName: string,
    resource: EdgeMachineNetworkAdapterJob,
    options?: EdgeMachineNetworkAdapterJobsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeMachineNetworkAdapterJob>, EdgeMachineNetworkAdapterJob>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    networkAdapterName: string,
    jobName: string,
    resource: EdgeMachineNetworkAdapterJob,
    options?: EdgeMachineNetworkAdapterJobsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<EdgeMachineNetworkAdapterJob>, EdgeMachineNetworkAdapterJob>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    networkAdapterName: string,
    jobName: string,
    resource: EdgeMachineNetworkAdapterJob,
    options?: EdgeMachineNetworkAdapterJobsCreateOrUpdateOptionalParams,
  ) => Promise<EdgeMachineNetworkAdapterJob>;
  /** List all jobs for a network adapter. */
  list: (
    resourceGroupName: string,
    edgeMachineName: string,
    networkAdapterName: string,
    options?: EdgeMachineNetworkAdapterJobsListOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeMachineNetworkAdapterJob>;
  /** Get a specific network adapter job. */
  get: (
    resourceGroupName: string,
    edgeMachineName: string,
    networkAdapterName: string,
    jobName: string,
    options?: EdgeMachineNetworkAdapterJobsGetOptionalParams,
  ) => Promise<EdgeMachineNetworkAdapterJob>;
}

function _getEdgeMachineNetworkAdapterJobs(context: AzureStackHCIContext) {
  return {
    delete: (
      resourceGroupName: string,
      edgeMachineName: string,
      networkAdapterName: string,
      jobName: string,
      options?: EdgeMachineNetworkAdapterJobsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, edgeMachineName, networkAdapterName, jobName, options),
    beginDelete: async (
      resourceGroupName: string,
      edgeMachineName: string,
      networkAdapterName: string,
      jobName: string,
      options?: EdgeMachineNetworkAdapterJobsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        edgeMachineName,
        networkAdapterName,
        jobName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      networkAdapterName: string,
      jobName: string,
      options?: EdgeMachineNetworkAdapterJobsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        edgeMachineName,
        networkAdapterName,
        jobName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      edgeMachineName: string,
      networkAdapterName: string,
      jobName: string,
      resource: EdgeMachineNetworkAdapterJob,
      options?: EdgeMachineNetworkAdapterJobsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        networkAdapterName,
        jobName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      edgeMachineName: string,
      networkAdapterName: string,
      jobName: string,
      resource: EdgeMachineNetworkAdapterJob,
      options?: EdgeMachineNetworkAdapterJobsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        networkAdapterName,
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
      networkAdapterName: string,
      jobName: string,
      resource: EdgeMachineNetworkAdapterJob,
      options?: EdgeMachineNetworkAdapterJobsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        networkAdapterName,
        jobName,
        resource,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      edgeMachineName: string,
      networkAdapterName: string,
      options?: EdgeMachineNetworkAdapterJobsListOptionalParams,
    ) => list(context, resourceGroupName, edgeMachineName, networkAdapterName, options),
    get: (
      resourceGroupName: string,
      edgeMachineName: string,
      networkAdapterName: string,
      jobName: string,
      options?: EdgeMachineNetworkAdapterJobsGetOptionalParams,
    ) => get(context, resourceGroupName, edgeMachineName, networkAdapterName, jobName, options),
  };
}

export function _getEdgeMachineNetworkAdapterJobsOperations(
  context: AzureStackHCIContext,
): EdgeMachineNetworkAdapterJobsOperations {
  return {
    ..._getEdgeMachineNetworkAdapterJobs(context),
  };
}
