// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext } from "../../api/azureSiteRecoveryManagementServiceAPIContext.js";
import { JobModel } from "../../models/models.js";
import { JobListOptionalParams, JobGetOptionalParams } from "../../api/job/options.js";
import { list, get } from "../../api/job/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Job operations. */
export interface JobOperations {
  /** Gets the list of jobs in the given vault. */
  list: (
    resourceGroupName: string,
    vaultName: string,
    options?: JobListOptionalParams,
  ) => PagedAsyncIterableIterator<JobModel>;
  /** Gets the details of the job. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    jobName: string,
    options?: JobGetOptionalParams,
  ) => Promise<JobModel>;
}

function _getJob(context: AzureSiteRecoveryManagementServiceAPIContext) {
  return {
    list: (resourceGroupName: string, vaultName: string, options?: JobListOptionalParams) =>
      list(context, resourceGroupName, vaultName, options),
    get: (
      resourceGroupName: string,
      vaultName: string,
      jobName: string,
      options?: JobGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, jobName, options),
  };
}

export function _getJobOperations(
  context: AzureSiteRecoveryManagementServiceAPIContext,
): JobOperations {
  return {
    ..._getJob(context),
  };
}
