// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverContext } from "../../api/storageMoverContext.js";
import { list, get } from "../../api/jobRuns/operations.js";
import { JobRunsListOptionalParams, JobRunsGetOptionalParams } from "../../api/jobRuns/options.js";
import { JobRun } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a JobRuns operations. */
export interface JobRunsOperations {
  /** Lists all Job Runs in a Job Definition. */
  list: (
    resourceGroupName: string,
    storageMoverName: string,
    projectName: string,
    jobDefinitionName: string,
    options?: JobRunsListOptionalParams,
  ) => PagedAsyncIterableIterator<JobRun>;
  /** Gets a Job Run resource. */
  get: (
    resourceGroupName: string,
    storageMoverName: string,
    projectName: string,
    jobDefinitionName: string,
    jobRunName: string,
    options?: JobRunsGetOptionalParams,
  ) => Promise<JobRun>;
}

function _getJobRuns(context: StorageMoverContext) {
  return {
    list: (
      resourceGroupName: string,
      storageMoverName: string,
      projectName: string,
      jobDefinitionName: string,
      options?: JobRunsListOptionalParams,
    ) =>
      list(context, resourceGroupName, storageMoverName, projectName, jobDefinitionName, options),
    get: (
      resourceGroupName: string,
      storageMoverName: string,
      projectName: string,
      jobDefinitionName: string,
      jobRunName: string,
      options?: JobRunsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        storageMoverName,
        projectName,
        jobDefinitionName,
        jobRunName,
        options,
      ),
  };
}

export function _getJobRunsOperations(context: StorageMoverContext): JobRunsOperations {
  return {
    ..._getJobRuns(context),
  };
}
