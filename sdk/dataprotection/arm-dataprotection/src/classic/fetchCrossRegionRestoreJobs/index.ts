// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { list } from "../../api/fetchCrossRegionRestoreJobs/operations.js";
import type { FetchCrossRegionRestoreJobsListOptionalParams } from "../../api/fetchCrossRegionRestoreJobs/options.js";
import type { AzureBackupJobResource, CrossRegionRestoreJobsRequest } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a FetchCrossRegionRestoreJobs operations. */
export interface FetchCrossRegionRestoreJobsOperations {
  /** Fetches list of Cross Region Restore job belonging to the vault */
  list: (
    resourceGroupName: string,
    location: string,
    parameters: CrossRegionRestoreJobsRequest,
    options?: FetchCrossRegionRestoreJobsListOptionalParams,
  ) => PagedAsyncIterableIterator<AzureBackupJobResource>;
}

function _getFetchCrossRegionRestoreJobs(context: DataProtectionContext) {
  return {
    list: (
      resourceGroupName: string,
      location: string,
      parameters: CrossRegionRestoreJobsRequest,
      options?: FetchCrossRegionRestoreJobsListOptionalParams,
    ) => list(context, resourceGroupName, location, parameters, options),
  };
}

export function _getFetchCrossRegionRestoreJobsOperations(
  context: DataProtectionContext,
): FetchCrossRegionRestoreJobsOperations {
  return {
    ..._getFetchCrossRegionRestoreJobs(context),
  };
}
