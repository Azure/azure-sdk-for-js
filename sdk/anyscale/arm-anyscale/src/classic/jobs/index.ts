// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformContext } from "../../api/platformContext.js";
import {
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/jobs/operations.js";
import type {
  JobsListByResourceGroupOptionalParams,
  JobsDeleteOptionalParams,
  JobsUpdateOptionalParams,
  JobsCreateOrUpdateOptionalParams,
  JobsGetOptionalParams,
} from "../../api/jobs/options.js";
import type { Job, JobUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Jobs operations. */
export interface JobsOperations {
  /** Lists jobs in a project. */
  listByResourceGroup: (
    resourceGroupName: string,
    cloudName: string,
    projectName: string,
    options?: JobsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Job>;
  /** Deletes a job. */
  delete: (
    resourceGroupName: string,
    cloudName: string,
    projectName: string,
    jobName: string,
    options?: JobsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a job. */
  update: (
    resourceGroupName: string,
    cloudName: string,
    projectName: string,
    jobName: string,
    properties: JobUpdate,
    options?: JobsUpdateOptionalParams,
  ) => Promise<Job>;
  /** Creates or updates a job. */
  createOrUpdate: (
    resourceGroupName: string,
    cloudName: string,
    projectName: string,
    jobName: string,
    resource: Job,
    options?: JobsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Job>, Job>;
  /** Gets a job. */
  get: (
    resourceGroupName: string,
    cloudName: string,
    projectName: string,
    jobName: string,
    options?: JobsGetOptionalParams,
  ) => Promise<Job>;
}

function _getJobs(context: PlatformContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      cloudName: string,
      projectName: string,
      options?: JobsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, cloudName, projectName, options),
    delete: (
      resourceGroupName: string,
      cloudName: string,
      projectName: string,
      jobName: string,
      options?: JobsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cloudName, projectName, jobName, options),
    update: (
      resourceGroupName: string,
      cloudName: string,
      projectName: string,
      jobName: string,
      properties: JobUpdate,
      options?: JobsUpdateOptionalParams,
    ) => update(context, resourceGroupName, cloudName, projectName, jobName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      cloudName: string,
      projectName: string,
      jobName: string,
      resource: Job,
      options?: JobsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        cloudName,
        projectName,
        jobName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      cloudName: string,
      projectName: string,
      jobName: string,
      options?: JobsGetOptionalParams,
    ) => get(context, resourceGroupName, cloudName, projectName, jobName, options),
  };
}

export function _getJobsOperations(context: PlatformContext): JobsOperations {
  return {
    ..._getJobs(context),
  };
}
