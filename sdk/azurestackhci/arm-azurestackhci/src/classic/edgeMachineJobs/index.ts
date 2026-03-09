// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/edgeMachineJobs/operations.js";
import type {
  EdgeMachineJobsListOptionalParams,
  EdgeMachineJobsDeleteOptionalParams,
  EdgeMachineJobsCreateOrUpdateOptionalParams,
  EdgeMachineJobsGetOptionalParams,
} from "../../api/edgeMachineJobs/options.js";
import type { EdgeMachineJob } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeMachineJobs operations. */
export interface EdgeMachineJobsOperations {
  /** List EdgeMachineJob resources by EdgeMachines */
  list: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachineJobsListOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeMachineJob>;
  /** Delete a EdgeMachineJob */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    edgeMachineName: string,
    jobsName: string,
    options?: EdgeMachineJobsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    edgeMachineName: string,
    jobsName: string,
    options?: EdgeMachineJobsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    jobsName: string,
    options?: EdgeMachineJobsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a EdgeMachineJob */
  createOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    jobsName: string,
    resource: EdgeMachineJob,
    options?: EdgeMachineJobsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeMachineJob>, EdgeMachineJob>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    jobsName: string,
    resource: EdgeMachineJob,
    options?: EdgeMachineJobsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EdgeMachineJob>, EdgeMachineJob>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    jobsName: string,
    resource: EdgeMachineJob,
    options?: EdgeMachineJobsCreateOrUpdateOptionalParams,
  ) => Promise<EdgeMachineJob>;
  /** Get a EdgeMachineJob */
  get: (
    resourceGroupName: string,
    edgeMachineName: string,
    jobsName: string,
    options?: EdgeMachineJobsGetOptionalParams,
  ) => Promise<EdgeMachineJob>;
}

function _getEdgeMachineJobs(context: AzureStackHCIContext) {
  return {
    list: (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachineJobsListOptionalParams,
    ) => list(context, resourceGroupName, edgeMachineName, options),
    delete: (
      resourceGroupName: string,
      edgeMachineName: string,
      jobsName: string,
      options?: EdgeMachineJobsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, edgeMachineName, jobsName, options),
    beginDelete: async (
      resourceGroupName: string,
      edgeMachineName: string,
      jobsName: string,
      options?: EdgeMachineJobsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, edgeMachineName, jobsName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      jobsName: string,
      options?: EdgeMachineJobsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, edgeMachineName, jobsName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      edgeMachineName: string,
      jobsName: string,
      resource: EdgeMachineJob,
      options?: EdgeMachineJobsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, edgeMachineName, jobsName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      edgeMachineName: string,
      jobsName: string,
      resource: EdgeMachineJob,
      options?: EdgeMachineJobsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
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
      jobsName: string,
      resource: EdgeMachineJob,
      options?: EdgeMachineJobsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        jobsName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      edgeMachineName: string,
      jobsName: string,
      options?: EdgeMachineJobsGetOptionalParams,
    ) => get(context, resourceGroupName, edgeMachineName, jobsName, options),
  };
}

export function _getEdgeMachineJobsOperations(
  context: AzureStackHCIContext,
): EdgeMachineJobsOperations {
  return {
    ..._getEdgeMachineJobs(context),
  };
}
