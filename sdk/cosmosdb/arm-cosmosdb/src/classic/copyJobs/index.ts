// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import {
  complete,
  cancel,
  resume,
  pause,
  listByDatabaseAccount,
  create,
  get,
} from "../../api/copyJobs/operations.js";
import type {
  CopyJobsCompleteOptionalParams,
  CopyJobsCancelOptionalParams,
  CopyJobsResumeOptionalParams,
  CopyJobsPauseOptionalParams,
  CopyJobsListByDatabaseAccountOptionalParams,
  CopyJobsCreateOptionalParams,
  CopyJobsGetOptionalParams,
} from "../../api/copyJobs/options.js";
import type { CopyJobGetResults } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CopyJobs operations. */
export interface CopyJobsOperations {
  /** Completes an Online Copy Job. */
  complete: (
    resourceGroupName: string,
    accountName: string,
    jobName: string,
    options?: CopyJobsCompleteOptionalParams,
  ) => Promise<CopyJobGetResults>;
  /** Cancels a Copy Job. */
  cancel: (
    resourceGroupName: string,
    accountName: string,
    jobName: string,
    options?: CopyJobsCancelOptionalParams,
  ) => Promise<CopyJobGetResults>;
  /** Resumes a Copy Job. */
  resume: (
    resourceGroupName: string,
    accountName: string,
    jobName: string,
    options?: CopyJobsResumeOptionalParams,
  ) => Promise<CopyJobGetResults>;
  /** Pause a Copy Job. */
  pause: (
    resourceGroupName: string,
    accountName: string,
    jobName: string,
    options?: CopyJobsPauseOptionalParams,
  ) => Promise<CopyJobGetResults>;
  /** Get a list of Copy jobs. */
  listByDatabaseAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: CopyJobsListByDatabaseAccountOptionalParams,
  ) => PagedAsyncIterableIterator<CopyJobGetResults>;
  /** Creates a Copy Job. */
  create: (
    resourceGroupName: string,
    accountName: string,
    jobName: string,
    jobCreateParameters: CopyJobGetResults,
    options?: CopyJobsCreateOptionalParams,
  ) => Promise<CopyJobGetResults>;
  /** Get a Copy Job. */
  get: (
    resourceGroupName: string,
    accountName: string,
    jobName: string,
    options?: CopyJobsGetOptionalParams,
  ) => Promise<CopyJobGetResults>;
}

function _getCopyJobs(context: CosmosDBManagementContext) {
  return {
    complete: (
      resourceGroupName: string,
      accountName: string,
      jobName: string,
      options?: CopyJobsCompleteOptionalParams,
    ) => complete(context, resourceGroupName, accountName, jobName, options),
    cancel: (
      resourceGroupName: string,
      accountName: string,
      jobName: string,
      options?: CopyJobsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, accountName, jobName, options),
    resume: (
      resourceGroupName: string,
      accountName: string,
      jobName: string,
      options?: CopyJobsResumeOptionalParams,
    ) => resume(context, resourceGroupName, accountName, jobName, options),
    pause: (
      resourceGroupName: string,
      accountName: string,
      jobName: string,
      options?: CopyJobsPauseOptionalParams,
    ) => pause(context, resourceGroupName, accountName, jobName, options),
    listByDatabaseAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: CopyJobsListByDatabaseAccountOptionalParams,
    ) => listByDatabaseAccount(context, resourceGroupName, accountName, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      jobName: string,
      jobCreateParameters: CopyJobGetResults,
      options?: CopyJobsCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, jobName, jobCreateParameters, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      jobName: string,
      options?: CopyJobsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, jobName, options),
  };
}

export function _getCopyJobsOperations(context: CosmosDBManagementContext): CopyJobsOperations {
  return {
    ..._getCopyJobs(context),
  };
}
