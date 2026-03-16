// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/clusterJobs/operations.js";
import type {
  ClusterJobsListOptionalParams,
  ClusterJobsDeleteOptionalParams,
  ClusterJobsCreateOrUpdateOptionalParams,
  ClusterJobsGetOptionalParams,
} from "../../api/clusterJobs/options.js";
import type { ClusterJob } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ClusterJobs operations. */
export interface ClusterJobsOperations {
  /** List ClusterJob resources by Clusters */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClusterJobsListOptionalParams,
  ) => PagedAsyncIterableIterator<ClusterJob>;
  /** Delete a ClusterJob */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    jobsName: string,
    options?: ClusterJobsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    jobsName: string,
    options?: ClusterJobsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    jobsName: string,
    options?: ClusterJobsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a ClusterJob */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    jobsName: string,
    resource: ClusterJob,
    options?: ClusterJobsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ClusterJob>, ClusterJob>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    jobsName: string,
    resource: ClusterJob,
    options?: ClusterJobsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ClusterJob>, ClusterJob>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    jobsName: string,
    resource: ClusterJob,
    options?: ClusterJobsCreateOrUpdateOptionalParams,
  ) => Promise<ClusterJob>;
  /** Get a ClusterJob */
  get: (
    resourceGroupName: string,
    clusterName: string,
    jobsName: string,
    options?: ClusterJobsGetOptionalParams,
  ) => Promise<ClusterJob>;
}

function _getClusterJobs(context: AzureStackHCIContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClusterJobsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      jobsName: string,
      options?: ClusterJobsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, jobsName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      jobsName: string,
      options?: ClusterJobsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, jobsName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      jobsName: string,
      options?: ClusterJobsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, jobsName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      jobsName: string,
      resource: ClusterJob,
      options?: ClusterJobsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, clusterName, jobsName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      jobsName: string,
      resource: ClusterJob,
      options?: ClusterJobsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        jobsName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      jobsName: string,
      resource: ClusterJob,
      options?: ClusterJobsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        jobsName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      jobsName: string,
      options?: ClusterJobsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, jobsName, options),
  };
}

export function _getClusterJobsOperations(context: AzureStackHCIContext): ClusterJobsOperations {
  return {
    ..._getClusterJobs(context),
  };
}
