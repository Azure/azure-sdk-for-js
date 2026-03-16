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
} from "../../api/dataTransferJobs/operations.js";
import type {
  DataTransferJobsCompleteOptionalParams,
  DataTransferJobsCancelOptionalParams,
  DataTransferJobsResumeOptionalParams,
  DataTransferJobsPauseOptionalParams,
  DataTransferJobsListByDatabaseAccountOptionalParams,
  DataTransferJobsCreateOptionalParams,
  DataTransferJobsGetOptionalParams,
} from "../../api/dataTransferJobs/options.js";
import type { DataTransferJobGetResults, CreateJobRequest } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DataTransferJobs operations. */
export interface DataTransferJobsOperations {
  /** Completes a Data Transfer Online Job. */
  complete: (
    resourceGroupName: string,
    accountName: string,
    jobName: string,
    options?: DataTransferJobsCompleteOptionalParams,
  ) => Promise<DataTransferJobGetResults>;
  /** Cancels a Data Transfer Job. */
  cancel: (
    resourceGroupName: string,
    accountName: string,
    jobName: string,
    options?: DataTransferJobsCancelOptionalParams,
  ) => Promise<DataTransferJobGetResults>;
  /** Resumes a Data Transfer Job. */
  resume: (
    resourceGroupName: string,
    accountName: string,
    jobName: string,
    options?: DataTransferJobsResumeOptionalParams,
  ) => Promise<DataTransferJobGetResults>;
  /** Pause a Data Transfer Job. */
  pause: (
    resourceGroupName: string,
    accountName: string,
    jobName: string,
    options?: DataTransferJobsPauseOptionalParams,
  ) => Promise<DataTransferJobGetResults>;
  /** Get a list of Data Transfer jobs. */
  listByDatabaseAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: DataTransferJobsListByDatabaseAccountOptionalParams,
  ) => PagedAsyncIterableIterator<DataTransferJobGetResults>;
  /** Creates a Data Transfer Job. */
  create: (
    resourceGroupName: string,
    accountName: string,
    jobName: string,
    jobCreateParameters: CreateJobRequest,
    options?: DataTransferJobsCreateOptionalParams,
  ) => Promise<DataTransferJobGetResults>;
  /** Get a Data Transfer Job. */
  get: (
    resourceGroupName: string,
    accountName: string,
    jobName: string,
    options?: DataTransferJobsGetOptionalParams,
  ) => Promise<DataTransferJobGetResults>;
}

function _getDataTransferJobs(context: CosmosDBManagementContext) {
  return {
    complete: (
      resourceGroupName: string,
      accountName: string,
      jobName: string,
      options?: DataTransferJobsCompleteOptionalParams,
    ) => complete(context, resourceGroupName, accountName, jobName, options),
    cancel: (
      resourceGroupName: string,
      accountName: string,
      jobName: string,
      options?: DataTransferJobsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, accountName, jobName, options),
    resume: (
      resourceGroupName: string,
      accountName: string,
      jobName: string,
      options?: DataTransferJobsResumeOptionalParams,
    ) => resume(context, resourceGroupName, accountName, jobName, options),
    pause: (
      resourceGroupName: string,
      accountName: string,
      jobName: string,
      options?: DataTransferJobsPauseOptionalParams,
    ) => pause(context, resourceGroupName, accountName, jobName, options),
    listByDatabaseAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: DataTransferJobsListByDatabaseAccountOptionalParams,
    ) => listByDatabaseAccount(context, resourceGroupName, accountName, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      jobName: string,
      jobCreateParameters: CreateJobRequest,
      options?: DataTransferJobsCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, jobName, jobCreateParameters, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      jobName: string,
      options?: DataTransferJobsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, jobName, options),
  };
}

export function _getDataTransferJobsOperations(
  context: CosmosDBManagementContext,
): DataTransferJobsOperations {
  return {
    ..._getDataTransferJobs(context),
  };
}
