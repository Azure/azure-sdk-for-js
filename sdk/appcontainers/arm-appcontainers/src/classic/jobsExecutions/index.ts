// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { list } from "../../api/jobsExecutions/operations.js";
import { JobsExecutionsListOptionalParams } from "../../api/jobsExecutions/options.js";
import { JobExecution } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a JobsExecutions operations. */
export interface JobsExecutionsOperations {
  /** Get a Container Apps Job's executions */
  list: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsExecutionsListOptionalParams,
  ) => PagedAsyncIterableIterator<JobExecution>;
}

function _getJobsExecutions(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      jobName: string,
      options?: JobsExecutionsListOptionalParams,
    ) => list(context, resourceGroupName, jobName, options),
  };
}

export function _getJobsExecutionsOperations(
  context: ContainerAppsAPIContext,
): JobsExecutionsOperations {
  return {
    ..._getJobsExecutions(context),
  };
}
