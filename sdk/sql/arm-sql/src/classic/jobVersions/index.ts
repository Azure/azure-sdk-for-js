// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { listByJob, get } from "../../api/jobVersions/operations.js";
import type {
  JobVersionsListByJobOptionalParams,
  JobVersionsGetOptionalParams,
} from "../../api/jobVersions/options.js";
import type { JobVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a JobVersions operations. */
export interface JobVersionsOperations {
  /** Gets all versions of a job. */
  listByJob: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    options?: JobVersionsListByJobOptionalParams,
  ) => PagedAsyncIterableIterator<JobVersion>;
  /** Gets a job version. */
  get: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    jobVersion: number,
    options?: JobVersionsGetOptionalParams,
  ) => Promise<JobVersion>;
}

function _getJobVersions(context: SqlContext) {
  return {
    listByJob: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      options?: JobVersionsListByJobOptionalParams,
    ) => listByJob(context, resourceGroupName, serverName, jobAgentName, jobName, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      jobVersion: number,
      options?: JobVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, jobAgentName, jobName, jobVersion, options),
  };
}

export function _getJobVersionsOperations(context: SqlContext): JobVersionsOperations {
  return {
    ..._getJobVersions(context),
  };
}
