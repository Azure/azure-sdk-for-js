// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import { listByTarget, get } from "../../api/jobs/operations.js";
import { JobsListByTargetOptionalParams, JobsGetOptionalParams } from "../../api/jobs/options.js";
import { Job } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Jobs operations. */
export interface JobsOperations {
  /** List Jobs by parent resource */
  listByTarget: (
    resourceUri: string,
    options?: JobsListByTargetOptionalParams,
  ) => PagedAsyncIterableIterator<Job>;
  /** Get a Job resource */
  get: (resourceUri: string, jobName: string, options?: JobsGetOptionalParams) => Promise<Job>;
}

function _getJobs(context: WorkloadOrchestrationManagementContext) {
  return {
    listByTarget: (resourceUri: string, options?: JobsListByTargetOptionalParams) =>
      listByTarget(context, resourceUri, options),
    get: (resourceUri: string, jobName: string, options?: JobsGetOptionalParams) =>
      get(context, resourceUri, jobName, options),
  };
}

export function _getJobsOperations(
  context: WorkloadOrchestrationManagementContext,
): JobsOperations {
  return {
    ..._getJobs(context),
  };
}
