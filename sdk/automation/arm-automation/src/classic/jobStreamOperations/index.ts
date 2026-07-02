// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { listByJob, get } from "../../api/jobStreamOperations/operations.js";
import type {
  JobStreamOperationsListByJobOptionalParams,
  JobStreamOperationsGetOptionalParams,
} from "../../api/jobStreamOperations/options.js";
import type { JobStream } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a JobStreamOperations operations. */
export interface JobStreamOperationsOperations {
  /** Retrieve a list of jobs streams identified by job name. */
  listByJob: (
    resourceGroupName: string,
    automationAccountName: string,
    jobName: string,
    options?: JobStreamOperationsListByJobOptionalParams,
  ) => PagedAsyncIterableIterator<JobStream>;
  /** Retrieve the job stream identified by job stream id. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    jobName: string,
    jobStreamId: string,
    options?: JobStreamOperationsGetOptionalParams,
  ) => Promise<JobStream>;
}

function _getJobStreamOperations(context: AutomationContext) {
  return {
    listByJob: (
      resourceGroupName: string,
      automationAccountName: string,
      jobName: string,
      options?: JobStreamOperationsListByJobOptionalParams,
    ) => listByJob(context, resourceGroupName, automationAccountName, jobName, options),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      jobName: string,
      jobStreamId: string,
      options?: JobStreamOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, jobName, jobStreamId, options),
  };
}

export function _getJobStreamOperationsOperations(
  context: AutomationContext,
): JobStreamOperationsOperations {
  return {
    ..._getJobStreamOperations(context),
  };
}
