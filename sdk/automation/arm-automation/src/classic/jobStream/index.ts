// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { listByJob, get } from "../../api/jobStream/operations.js";
import type {
  JobStreamListByJobOptionalParams,
  JobStreamGetOptionalParams,
} from "../../api/jobStream/options.js";
import type { JobStream } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a JobStream operations. */
export interface JobStreamOperations {
  /** Retrieve a list of jobs streams identified by job name. */
  listByJob: (
    resourceGroupName: string,
    automationAccountName: string,
    jobName: string,
    options?: JobStreamListByJobOptionalParams,
  ) => PagedAsyncIterableIterator<JobStream>;
  /** Retrieve the job stream identified by job stream id. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    jobName: string,
    jobStreamId: string,
    options?: JobStreamGetOptionalParams,
  ) => Promise<JobStream>;
}

function _getJobStream(context: AutomationContext) {
  return {
    listByJob: (
      resourceGroupName: string,
      automationAccountName: string,
      jobName: string,
      options?: JobStreamListByJobOptionalParams,
    ) => listByJob(context, resourceGroupName, automationAccountName, jobName, options),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      jobName: string,
      jobStreamId: string,
      options?: JobStreamGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, jobName, jobStreamId, options),
  };
}

export function _getJobStreamOperations(context: AutomationContext): JobStreamOperations {
  return {
    ..._getJobStream(context),
  };
}
