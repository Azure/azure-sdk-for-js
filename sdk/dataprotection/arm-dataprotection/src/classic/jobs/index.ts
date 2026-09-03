// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { list, get } from "../../api/jobs/operations.js";
import type { JobsListOptionalParams, JobsGetOptionalParams } from "../../api/jobs/options.js";
import type { AzureBackupJobResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Jobs operations. */
export interface JobsOperations {
  /** Returns list of jobs belonging to a backup vault */
  list: (
    resourceGroupName: string,
    vaultName: string,
    options?: JobsListOptionalParams,
  ) => PagedAsyncIterableIterator<AzureBackupJobResource>;
  /** Gets a job with id in a backup vault */
  get: (
    resourceGroupName: string,
    vaultName: string,
    jobId: string,
    options?: JobsGetOptionalParams,
  ) => Promise<AzureBackupJobResource>;
}

function _getJobs(context: DataProtectionContext) {
  return {
    list: (resourceGroupName: string, vaultName: string, options?: JobsListOptionalParams) =>
      list(context, resourceGroupName, vaultName, options),
    get: (
      resourceGroupName: string,
      vaultName: string,
      jobId: string,
      options?: JobsGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, jobId, options),
  };
}

export function _getJobsOperations(context: DataProtectionContext): JobsOperations {
  return {
    ..._getJobs(context),
  };
}
