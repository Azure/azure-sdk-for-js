// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByJobExecution, get } from "../../api/jobStepExecutions/operations.js";
import type {
  JobStepExecutionsListByJobExecutionOptionalParams,
  JobStepExecutionsGetOptionalParams,
} from "../../api/jobStepExecutions/options.js";
import type { JobExecution } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a JobStepExecutions operations. */
export interface JobStepExecutionsOperations {
  /** Lists the step executions of a job execution. */
  listByJobExecution: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    jobExecutionId: string,
    options?: JobStepExecutionsListByJobExecutionOptionalParams,
  ) => PagedAsyncIterableIterator<JobExecution>;
  /** Gets a step execution of a job execution. */
  get: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    jobExecutionId: string,
    stepName: string,
    options?: JobStepExecutionsGetOptionalParams,
  ) => Promise<JobExecution>;
}

function _getJobStepExecutions(context: SqlManagementContext) {
  return {
    listByJobExecution: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      jobExecutionId: string,
      options?: JobStepExecutionsListByJobExecutionOptionalParams,
    ) =>
      listByJobExecution(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        jobName,
        jobExecutionId,
        options,
      ),
    get: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      jobExecutionId: string,
      stepName: string,
      options?: JobStepExecutionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        jobName,
        jobExecutionId,
        stepName,
        options,
      ),
  };
}

export function _getJobStepExecutionsOperations(
  context: SqlManagementContext,
): JobStepExecutionsOperations {
  return {
    ..._getJobStepExecutions(context),
  };
}
